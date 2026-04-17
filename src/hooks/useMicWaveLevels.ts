import { useEffect, useRef, useState } from 'react'

const BAR_COUNT = 7

function createAudioContext(): AudioContext {
  const w = window as unknown as { webkitAudioContext?: typeof AudioContext }
  const Ctor = window.AudioContext ?? w.webkitAudioContext
  if (!Ctor) {
    throw new Error('AudioContext not supported')
  }
  return new Ctor()
}

/**
 * While `active`, opens a mic stream and returns per-band levels in [~0.12, 1] for visualizing a
 * waveform. Returns `null` when inactive or if the mic cannot be opened (caller may fall back to CSS).
 */
export function useMicWaveLevels(active: boolean) {
  const [levels, setLevels] = useState<number[] | null>(null)
  const smoothedRef = useRef<number[]>(Array(BAR_COUNT).fill(0.18))
  const rafRef = useRef(0)
  const lastEmitRef = useRef(0)

  useEffect(() => {
    if (!active) {
      smoothedRef.current = Array(BAR_COUNT).fill(0.18)
      queueMicrotask(() => {
        setLevels(null)
      })
      return
    }

    let cancelled = false
    let stream: MediaStream | null = null
    let ctx: AudioContext | null = null

    const start = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          queueMicrotask(() => setLevels(null))
          return
        }
        stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop())
          return
        }

        ctx = createAudioContext()
        await ctx.resume()

        const source = ctx.createMediaStreamSource(stream)
        const analyser = ctx.createAnalyser()
        analyser.fftSize = 512
        analyser.smoothingTimeConstant = 0.72
        source.connect(analyser)

        const bufferLength = analyser.frequencyBinCount
        const data = new Uint8Array(bufferLength)

        const tick = (time: number) => {
          if (cancelled) return
          analyser.getByteFrequencyData(data)

          const slice = Math.max(1, Math.floor(bufferLength / BAR_COUNT))
          for (let b = 0; b < BAR_COUNT; b++) {
            let sum = 0
            const startIdx = b * slice
            const endIdx = Math.min(startIdx + slice, bufferLength)
            for (let i = startIdx; i < endIdx; i++) {
              sum += data[i] ?? 0
            }
            const raw = sum / (endIdx - startIdx) / 255
            const boosted = Math.min(1, raw ** 0.62 * 2.35 + 0.06)
            const prev = smoothedRef.current[b] ?? 0.18
            smoothedRef.current[b] = prev * 0.42 + boosted * 0.58
          }

          if (time - lastEmitRef.current >= 32) {
            lastEmitRef.current = time
            setLevels([...smoothedRef.current])
          }

          rafRef.current = requestAnimationFrame(tick)
        }

        rafRef.current = requestAnimationFrame(tick)
      } catch {
        if (!cancelled) {
          queueMicrotask(() => setLevels(null))
        }
      }
    }

    void start()

    return () => {
      cancelled = true
      cancelAnimationFrame(rafRef.current)
      stream?.getTracks().forEach((t) => t.stop())
      void ctx?.close()
      smoothedRef.current = Array(BAR_COUNT).fill(0.18)
    }
  }, [active])

  return levels
}
