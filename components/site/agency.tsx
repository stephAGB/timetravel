import { ShieldCheck, Infinity as InfinityIcon, Globe2, Zap } from "lucide-react"

const metrics = [
  { icon: Globe2, value: "10k+", label: "Timelines visitées" },
  { icon: ShieldCheck, value: "0,00 %", label: "Taux de paradoxe" },
  { icon: InfinityIcon, value: "142", label: "Ères cartographiées" },
  { icon: Zap, value: "99,98 %", label: "Retours sécurisés" },
]

export function Agency() {
  return (
    <section id="agency" className="relative mx-auto max-w-7xl scroll-mt-20 px-5 py-24 md:px-8 md:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
            / Notre mission
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            Le temps est la destination ultime. Nous la rendons sûre.
          </h2>
          <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
            TimeTravel Agency a été pionnière du déplacement temporel stabilisé, transformant une
            impossibilité théorique en la forme de voyage la plus exclusive jamais proposée. Chaque
            périple est ancré par notre Réseau Chronos exclusif, garantissant que votre présence
            dans le passé laisse l&apos;histoire parfaitement intacte.
          </p>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Des sables de l&apos;Ancien Empire aux canyons néon du 22e siècle, nos conservateurs
            conçoivent chaque expédition autour du confort, de l&apos;émerveillement et d&apos;une
            intégrité causale absolue.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {["Chrono-guides certifiés", "Assurance paradoxe incluse", "Fenêtre de retour garantie"].map(
              (item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-foreground">
                  <span className="size-1.5 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
                  {item}
                </div>
              ),
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition-all hover:border-primary/50 hover:bg-card"
            >
              <div className="absolute -right-6 -top-6 size-20 rounded-full bg-primary/5 blur-2xl transition-opacity group-hover:bg-primary/15" />
              <m.icon className="size-6 text-primary" />
              <div className="mt-6 font-mono text-3xl font-bold text-foreground md:text-4xl">
                {m.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
