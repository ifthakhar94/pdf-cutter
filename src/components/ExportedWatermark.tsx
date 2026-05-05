type Props = {
  /** Larger label for popover previews. */
  large?: boolean
}

export function ExportedWatermark({ large }: Props) {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden rounded-sm"
      aria-hidden
    >
      <div className="absolute inset-0 bg-violet-700/30 dark:bg-violet-600/25" />
      <span
        className={`relative z-1 rotate-[-18deg] select-none font-bold uppercase tracking-widest text-white/95 ${large ? 'text-lg' : 'text-[9px]'} [text-shadow:0_1px_2px_rgb(0_0_0/75%)]`}
      >
        Exported
      </span>
    </div>
  )
}
