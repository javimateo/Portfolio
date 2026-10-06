"use client";

import { useDictionary } from "@/i18n/LocaleProvider";

export default function Footer() {
  const { footer } = useDictionary();

  return (
    <footer className="w-full pb-10 sm:px-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-2 border-t border-white/10 pt-8 text-center font-mono text-xs text-foreground/40 sm:flex-row sm:justify-between sm:text-left">
        <p>© {new Date().getFullYear()} Javier Mateo</p>
        <p>{footer.builtWith}</p>
      </div>
    </footer>
  );
}
