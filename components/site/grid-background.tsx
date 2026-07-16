export function GridBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* animated perspective grid */}
      <div className="absolute inset-0 grid-fade opacity-60">
        <div
          className="absolute inset-0 animate-[grid-pan_4s_linear_infinite]"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklch, var(--primary) 22%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--primary) 22%, transparent) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* radial glows */}
      <div className="absolute left-1/2 top-1/3 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute right-[12%] top-[18%] h-72 w-72 rounded-full bg-accent/10 blur-[100px]" />

      {/* vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background" />
    </div>
  )
}
