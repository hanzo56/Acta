type ActaSettingsToggleProps = {
  enabled: boolean
  onChange: (next: boolean) => void
  id?: string
}

/**
 * Figma 9:22 — mint on / gray off, matches Profile “Agent insights” switch.
 */
export function ActaSettingsToggle({
  enabled,
  onChange,
  id,
}: ActaSettingsToggleProps) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`relative h-6 w-12 shrink-0 rounded-full p-1 shadow-[0px_0px_15px_0px_rgba(78,222,163,0.3)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4edea3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1c1b1b] ${
        enabled ? 'bg-[#4edea3]' : 'bg-[#353534]'
      }`}
    >
      <span
        className={`block size-4 rounded-full transition-transform ${
          enabled
            ? 'translate-x-6 bg-[#00422b]'
            : 'translate-x-0 bg-[#bbcabf]'
        }`}
      />
    </button>
  )
}
