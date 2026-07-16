import { Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-10 md:flex-row md:px-8">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg border border-primary/40 bg-primary/10 text-primary">
            <Clock className="size-4" />
          </span>
          <span className="font-mono text-sm font-semibold tracking-[0.18em] text-foreground uppercase">
            TimeTravel<span className="text-primary">.</span>
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <a href="#destinations" className="transition-colors hover:text-foreground">Destinations</a>
          <a href="#agency" className="transition-colors hover:text-foreground">Agency</a>
          <a href="#booking" className="transition-colors hover:text-foreground">Book</a>
          <span className="transition-colors hover:text-foreground cursor-default">Paradox Policy</span>
        </nav>

        <p className="font-mono text-xs text-muted-foreground">
          © 2087 TimeTravel Agency · All timelines reserved
        </p>
      </div>
    </footer>
  )
}
