/** Pass with `navigate('/', { state: ACTIVATE_MIC_ON_HOME })` to open the Home mic after navigation. */
export const ACTIVATE_MIC_ON_HOME = { activateMic: true } as const

export type ActivateMicLocationState = { activateMic?: boolean } | null

export function shouldActivateMicFromNav(
  state: unknown,
): state is { activateMic: true } {
  return (
    typeof state === 'object' &&
    state !== null &&
    'activateMic' in state &&
    (state as { activateMic?: boolean }).activateMic === true
  )
}
