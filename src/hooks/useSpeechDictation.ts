import { useEffect, useRef, useState } from 'react'

function getSpeechRecognition(): SpeechRecognitionConstructor | undefined {
  if (typeof window === 'undefined') return undefined
  return window.SpeechRecognition ?? window.webkitSpeechRecognition
}

export type SpeechDictationStatus = 'idle' | 'listening' | 'unsupported' | 'denied'

export type UseSpeechDictationOptions = {
  /** After this many milliseconds with no speech results, `onSilence` runs (while listening). */
  silenceMs?: number
  onSilence?: () => void
}

export function useSpeechDictation(active: boolean, options?: UseSpeechDictationOptions) {
  const [finalText, setFinalText] = useState('')
  const [interimText, setInterimText] = useState('')
  const [status, setStatus] = useState<SpeechDictationStatus>('idle')
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const activeRef = useRef(active)
  const optionsRef = useRef(options)

  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    optionsRef.current = options
  }, [options])

  const clearSilenceTimer = () => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current)
      silenceTimerRef.current = null
    }
  }

  useEffect(() => {
    activeRef.current = active

    if (!active) {
      clearSilenceTimer()
      const rec = recognitionRef.current
      recognitionRef.current = null
      if (rec) {
        rec.onend = null
        rec.stop()
      }
      queueMicrotask(() => {
        setInterimText('')
        setStatus('idle')
      })
      return
    }

    const Ctor = getSpeechRecognition()
    if (!Ctor) {
      clearSilenceTimer()
      queueMicrotask(() => {
        setStatus('unsupported')
      })
      return
    }

    const scheduleSilence = () => {
      clearSilenceTimer()
      const opts = optionsRef.current
      const silenceMs = opts?.silenceMs ?? 4000
      if (!opts?.onSilence || silenceMs <= 0) return
      silenceTimerRef.current = setTimeout(() => {
        silenceTimerRef.current = null
        optionsRef.current?.onSilence?.()
      }, silenceMs)
    }

    const recognition = new Ctor()
    recognitionRef.current = recognition
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang =
      typeof navigator !== 'undefined' && navigator.language ? navigator.language : 'en-US'

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      scheduleSilence()
      let interim = ''
      let chunk = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        const piece = result[0]?.transcript ?? ''
        if (result.isFinal) {
          chunk += piece
        } else {
          interim += piece
        }
      }
      if (chunk) {
        setFinalText((prev) => prev + chunk)
      }
      setInterimText(interim)
    }

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === 'no-speech' || event.error === 'aborted') return
      if (event.error === 'not-allowed') {
        clearSilenceTimer()
        setStatus('denied')
        recognition.onend = null
        recognitionRef.current = null
        try {
          recognition.stop()
        } catch {
          /* ignore */
        }
      }
    }

    recognition.onend = () => {
      if (!activeRef.current || recognitionRef.current !== recognition) return
      window.setTimeout(() => {
        try {
          recognition.start()
        } catch {
          /* already running */
        }
      }, 120)
    }

    queueMicrotask(() => {
      setStatus('listening')
    })

    try {
      recognition.start()
      scheduleSilence()
    } catch {
      clearSilenceTimer()
      queueMicrotask(() => {
        setStatus('unsupported')
      })
    }

    return () => {
      clearSilenceTimer()
      recognition.onend = null
      recognitionRef.current = null
      try {
        recognition.stop()
      } catch {
        /* ignore */
      }
    }
  }, [active])

  return { finalText, interimText, status }
}
