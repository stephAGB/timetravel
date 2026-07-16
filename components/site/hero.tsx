import { ArrowRight, Sparkles, ChevronDown } from "lucide-react"
import { GridBackground } from "./grid-background"

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 pt-16 text-center"
    >
      <GridBackground />

      {/* floating portal ring */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[14%] left-1/2 -translate-x-1/2 animate-float-slow"
      >
        <div className="relative grid place-items-center">
          <div className="size-40 rounded-full border border-primary/30 md:size-56" />
          <div className="absolute size-40 rounded-full border border-accent/20 [animation:pulse-ring_3s_ease-out_infinite] md:size-56" />
          <div className="absolute size-24 rounded-full bg-primary/10 blur-2xl md:size-32" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl animate-fade-up">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 backdrop-blur">
          <Sparkles className="size-3.5 text-primary" />
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Fondée en 2087 · Opérateur temporel agréé
          </span>
        </div>

        <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
          Explorez le passé,
          <br />
          <span className="text-primary text-glow">façonnez l&apos;avenir.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          Un tourisme temporel de luxe conçu pour le voyageur exigeant. Traversez les millénaires
          avec des chrono-guides d&apos;exception, zéro paradoxe et un billet retour garanti.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#destinations"
            className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-7 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 neon-border sm:w-auto"
          >
            Explorer les destinations
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#booking"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border bg-card/40 px-7 text-sm font-semibold text-foreground backdrop-blur transition-all hover:border-primary/50 hover:bg-card sm:w-auto"
          >
            Réserver une timeline
          </a>
        </div>
      </div>

      <a
        href="#agency"
        aria-label="Défiler pour en savoir plus"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted-foreground transition-colors hover:text-primary"
      >
        <ChevronDown className="size-6 animate-bounce" />
      </a>
    </section>
  )
}
