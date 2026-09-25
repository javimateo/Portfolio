export default function Footer() {
  return (
    <footer className="w-full px-6 pb-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-2 border-t border-white/10 pt-8 text-center font-mono text-xs text-foreground/40 sm:flex-row sm:justify-between sm:text-left">
        <p>© {new Date().getFullYear()} Javier Mateo</p>
        <p>Diseñado y construido con Next.js</p>
      </div>
    </footer>
  );
}
