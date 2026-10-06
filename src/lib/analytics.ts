// Thin wrapper around Umami's tracker (loaded in the root layout only when UMAMI_SRC and
// UMAMI_ID are set). Every call is a no-op without it, so development and previews send nothing.
//
// Clicks call `track` from their own onClick rather than using data-umami-event attributes:
// for same-tab links Umami's attribute handler cancels the click and re-navigates itself,
// which would break the CV's `download` and the smooth in-page scrolling. Its requests use
// fetch keepalive, so an event still arrives when the click leaves the page.

type EventData = Record<string, string | number>;

declare global {
  interface Window {
    umami?: { track: (event: string, data?: EventData) => Promise<unknown> | void };
  }
}

// Events fired before the script has loaded (e.g. the first section in view) wait here.
const queue: [string, EventData | undefined][] = [];
let flushTimer: ReturnType<typeof setInterval> | undefined;

function flush() {
  if (!window.umami) return false;
  for (const [event, data] of queue.splice(0)) window.umami.track(event, data);
  return true;
}

export function track(event: string, data?: EventData) {
  if (typeof window === "undefined") return;
  if (window.umami) {
    window.umami.track(event, data);
    return;
  }
  queue.push([event, data]);
  if (flushTimer) return;
  // Give the script up to 10 s to arrive; after that (blocked or not configured) drop the queue.
  let tries = 0;
  flushTimer = setInterval(() => {
    if (flush() || ++tries > 20) {
      clearInterval(flushTimer);
      flushTimer = undefined;
      queue.length = 0;
    }
  }, 500);
}
