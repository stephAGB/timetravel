"use client"

import { useState } from "react"
import { CheckCircle2, Users, CalendarClock, Rocket, Loader2, ChevronDown } from "lucide-react"
import { destinations } from "@/lib/destinations"

type Status = "idle" | "validating" | "success"

export function BookingForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [form, setForm] = useState({
    destination: destinations[0].id,
    departure: "",
    ret: "",
    travelers: 2,
  })

  const update = (key: keyof typeof form, value: string | number) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (status === "success") setStatus("idle")
  }

  const validate = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("validating")
    setTimeout(() => setStatus("success"), 1600)
  }

  const fieldClass =
    "w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:bg-secondary"

  return (
    <section id="booking" className="relative mx-auto max-w-3xl scroll-mt-20 px-5 py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <span className="font-mono text-xs tracking-[0.2em] text-primary uppercase">/ Quai de départ</span>
        <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          Réservez votre timeline
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Verrouillez vos coordonnées temporelles. Notre réseau effectuera un contrôle de paradoxe
          avant de confirmer votre fenêtre de départ.
        </p>
      </div>

      <form
        onSubmit={validate}
        className="relative mt-12 overflow-hidden rounded-3xl border border-border bg-card/70 p-6 backdrop-blur md:p-8"
      >
        <div className="absolute -right-10 -top-10 size-40 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative grid gap-5">
          <div>
            <label htmlFor="destination" className="mb-2 block text-sm font-medium text-foreground">
              Ère de destination
            </label>
            <div className="relative">
              <select
                id="destination"
                value={form.destination}
                onChange={(e) => update("destination", e.target.value)}
                className={`${fieldClass} appearance-none pr-10`}
              >
                {destinations.map((d) => (
                  <option key={d.id} value={d.id} className="bg-card text-foreground">
                    {d.name} — {d.year}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="departure" className="mb-2 block text-sm font-medium text-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarClock className="size-4 text-primary" /> Départ temporel
                </span>
              </label>
              <input
                id="departure"
                type="date"
                required
                value={form.departure}
                onChange={(e) => update("departure", e.target.value)}
                className={`${fieldClass} [color-scheme:dark]`}
              />
            </div>
            <div>
              <label htmlFor="ret" className="mb-2 block text-sm font-medium text-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarClock className="size-4 text-primary" /> Fenêtre de retour
                </span>
              </label>
              <input
                id="ret"
                type="date"
                required
                value={form.ret}
                onChange={(e) => update("ret", e.target.value)}
                className={`${fieldClass} [color-scheme:dark]`}
              />
            </div>
          </div>

          <div>
            <label htmlFor="travelers" className="mb-2 block text-sm font-medium text-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Users className="size-4 text-primary" /> Voyageurs
              </span>
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => update("travelers", Math.max(1, form.travelers - 1))}
                className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-secondary/40 text-lg font-semibold text-foreground transition-colors hover:border-primary/50"
                aria-label="Réduire le nombre de voyageurs"
              >
                −
              </button>
              <div className="flex h-11 flex-1 items-center justify-center rounded-xl border border-border bg-secondary/40 font-mono text-sm font-semibold text-foreground">
                {form.travelers} {form.travelers === 1 ? "voyageur" : "voyageurs"}
              </div>
              <button
                type="button"
                onClick={() => update("travelers", Math.min(8, form.travelers + 1))}
                className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-secondary/40 text-lg font-semibold text-foreground transition-colors hover:border-primary/50"
                aria-label="Augmenter le nombre de voyageurs"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "validating"}
            className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 neon-border disabled:opacity-70"
          >
            {status === "validating" ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Analyse des paradoxes…
              </>
            ) : (
              <>
                <Rocket className="size-4" />
                Valider la timeline
              </>
            )}
          </button>

          {status === "success" && (
            <div className="flex items-start gap-3 rounded-xl border border-[oklch(0.75_0.16_150)]/40 bg-[oklch(0.75_0.16_150)]/10 p-4 [animation:fade-up_0.4s_ease-out]">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[oklch(0.8_0.16_150)]" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Aucun paradoxe détecté. Prêt pour le départ !
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Votre place pour l&apos;expédition {destinations.find((d) => d.id === form.destination)?.name}
                  {" "}est réservée provisoirement. Un chrono-concierge vous contactera pour confirmer.
                </p>
              </div>
            </div>
          )}
        </div>
      </form>
    </section>
  )
}
