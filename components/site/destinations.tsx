"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { AlertTriangle, ArrowUpRight, Clock, MapPin, X, Calendar, Sparkles } from "lucide-react"
import { destinations, type Destination, type DangerLevel } from "@/lib/destinations"

const dangerStyles: Record<DangerLevel, string> = {
  Faible: "text-[oklch(0.75_0.16_150)] border-[oklch(0.75_0.16_150)]/40 bg-[oklch(0.75_0.16_150)]/10",
  Modéré: "text-[oklch(0.8_0.15_85)] border-[oklch(0.8_0.15_85)]/40 bg-[oklch(0.8_0.15_85)]/10",
  Élevé: "text-[oklch(0.7_0.2_25)] border-[oklch(0.7_0.2_25)]/40 bg-[oklch(0.7_0.2_25)]/10",
}

export function Destinations() {
  const [active, setActive] = useState<Destination | null>(null)

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null)
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [active])

  return (
    <section
      id="destinations"
      className="relative mx-auto max-w-7xl scroll-mt-20 px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-2xl text-center">
        <span className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
          / Timelines en vedette
        </span>
        <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          Choisissez votre ère
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Trois fenêtres méticuleusement sélectionnées sur l&apos;histoire et au-delà. Touchez une
          timeline pour afficher tous les détails de l&apos;expédition.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {destinations.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setActive(d)}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card text-left transition-all duration-500 hover:-translate-y-2 hover:border-primary/60 hover:neon-border"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={d.image || "/placeholder.svg"}
                alt={`${d.name}, ${d.year}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/20 to-transparent" />
              {/* shimmer sweep */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

              <div className="absolute left-4 top-4 flex items-center gap-2">
                <span className="rounded-full border border-primary/40 bg-background/70 px-3 py-1 font-mono text-xs text-primary backdrop-blur">
                  {d.year}
                </span>
              </div>
              <div className="absolute right-4 top-4">
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-mono text-[0.7rem] backdrop-blur ${dangerStyles[d.danger]}`}
                >
                  <AlertTriangle className="size-3" />
                  {d.danger}
                </span>
              </div>
            </div>

            <div className="p-6">
              <p className="font-mono text-xs tracking-widest text-primary uppercase">{d.era}</p>
              <h3 className="mt-1 text-2xl font-bold text-foreground">{d.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d.tagline}</p>

              <ul className="mt-4 space-y-1.5">
                {d.attractions.slice(0, 3).map((a) => (
                  <li key={a} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="size-3.5 shrink-0 text-primary" />
                    {a}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <span className="font-mono text-sm font-semibold text-foreground">{d.priceCredits}</span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Détails
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {active && <DestinationModal destination={active} onClose={() => setActive(null)} />}
    </section>
  )
}

function DestinationModal({
  destination: d,
  onClose,
}: {
  destination: Destination
  onClose: () => void
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Détails de l'expédition ${d.name}`}
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
    >
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm [animation:fade-up_0.2s_ease-out]"
        onClick={onClose}
      />

      <div className="relative z-10 max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-border bg-card shadow-2xl [animation:fade-up_0.35s_ease-out] sm:rounded-3xl">
        <div className="relative h-56 overflow-hidden sm:h-72">
          <Image
            src={d.image || "/placeholder.svg"}
            alt={`${d.name}, ${d.year}`}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur transition-colors hover:bg-background"
          >
            <X className="size-5" />
          </button>
          <div className="absolute bottom-4 left-5 right-5">
            <p className="font-mono text-xs tracking-widest text-primary uppercase">
              {d.era} · {d.year}
            </p>
            <h3 className="mt-1 text-3xl font-bold text-foreground">{d.name}</h3>
          </div>
        </div>

        <div className="p-5 sm:p-7">
          <div className="flex flex-wrap gap-3">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs ${dangerStyles[d.danger]}`}>
              <AlertTriangle className="size-3.5" />
              Danger {d.danger.toLowerCase()}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 font-mono text-xs text-muted-foreground">
              <Clock className="size-3.5 text-primary" />
              {d.duration}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 font-mono text-xs text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" />
              {d.priceCredits}
            </span>
          </div>

          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">{d.description}</p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {d.highlights.map((h) => (
              <div key={h.label} className="rounded-xl border border-border bg-secondary/50 p-3">
                <p className="font-mono text-[0.7rem] tracking-wider text-muted-foreground uppercase">
                  {h.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">{h.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <p className="font-mono text-xs tracking-widest text-primary uppercase">Attractions phares</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {d.attractions.map((a) => (
                <li
                  key={a}
                  className="flex items-center gap-2 rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground"
                >
                  <MapPin className="size-4 shrink-0 text-primary" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <a
            href="#booking"
            onClick={onClose}
            className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 neon-border"
          >
            <Calendar className="size-4" />
            Réserver cette timeline
          </a>
        </div>
      </div>
    </div>
  )
}
