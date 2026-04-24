import { useCallback, useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'

import { AppBottomNav } from '../components/AppBottomNav'
import {
  ICON_DOTS_VERTICAL as imgOptionsDots,
  ICON_EDIT as imgEdit,
  ICON_SEARCH as imgSearch,
  ICON_SPARKLE as imgUsageSparkle,
  ICON_USER_AVATAR as imgUser,
} from '../assets/actaIconUrls'
const STORAGE_CONTACTS = 'acta.settings.favoriteContacts'
const STORAGE_TONE = 'acta.settings.toneStyle'

export type ToneStyleId = 'professional' | 'friendly' | 'detailed'

const TONE_OPTIONS: { id: ToneStyleId; label: string }[] = [
  { id: 'professional', label: 'Professional / Concise' },
  { id: 'friendly', label: 'Friendly / Personal' },
  { id: 'detailed', label: 'Detailed' },
]

export type FavoriteContact = {
  id: string
  firstName: string
  lastName: string
}

function loadContacts(): FavoriteContact[] {
  try {
    const raw = localStorage.getItem(STORAGE_CONTACTS)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (row): row is FavoriteContact =>
        typeof row === 'object' &&
        row !== null &&
        'id' in row &&
        'firstName' in row &&
        'lastName' in row &&
        typeof (row as FavoriteContact).id === 'string',
    )
  } catch {
    return []
  }
}

function saveContacts(contacts: FavoriteContact[]) {
  localStorage.setItem(STORAGE_CONTACTS, JSON.stringify(contacts))
}

function loadTone(): ToneStyleId {
  try {
    const raw = localStorage.getItem(STORAGE_TONE)
    if (raw === 'professional' || raw === 'friendly' || raw === 'detailed') return raw
  } catch {
    /* ignore */
  }
  return 'professional'
}

function saveTone(id: ToneStyleId) {
  localStorage.setItem(STORAGE_TONE, id)
}

function formatContactLine(contacts: FavoriteContact[]): string {
  if (contacts.length === 0) return 'No contacts yet — tap edit to add'
  return contacts
    .map((c) => {
      const f = c.firstName.trim()
      const l = c.lastName.trim()
      if (f && l) return `${f} ${l}`
      if (f) return f
      if (l) return l
      return 'Unnamed'
    })
    .join(', ')
}

export function SettingsPage() {
  const baseId = useId()
  const [contacts, setContacts] = useState<FavoriteContact[]>(loadContacts)
  const [toneStyle, setToneStyle] = useState<ToneStyleId>(loadTone)
  const [editingContacts, setEditingContacts] = useState(false)
  const [editingTone, setEditingTone] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  useEffect(() => {
    saveContacts(contacts)
  }, [contacts])

  useEffect(() => {
    saveTone(toneStyle)
  }, [toneStyle])

  const addContact = useCallback(() => {
    const f = firstName.trim()
    const l = lastName.trim()
    if (!f && !l) return
    setContacts((prev) => [
      ...prev,
      { id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, firstName: f, lastName: l },
    ])
    setFirstName('')
    setLastName('')
  }, [firstName, lastName])

  const removeContact = useCallback((id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id))
  }, [])

  const toneLabel = TONE_OPTIONS.find((o) => o.id === toneStyle)?.label ?? TONE_OPTIONS[0].label

  return (
    <div className="acta-shell bg-[#131313] text-[#e5e2e1]">
      <header className="acta-header-fixed z-10 flex h-16 items-center justify-between bg-[#131313] px-6">
        <div className="size-8 overflow-hidden rounded-full bg-[#2a2a2a]">
          <img alt="" className="size-full object-cover" src={imgUser} />
        </div>
        <button type="button" className="rounded-full p-2" aria-label="Search">
          <img alt="" className="size-[18px]" src={imgSearch} />
        </button>
      </header>

      <main className="acta-main acta-main--inset-both max-w-[672px] px-6 pb-10">
        <div className="flex flex-col gap-8 pt-2">
          <div className="flex flex-col gap-1 pb-2">
            <p className="text-[10px] font-normal uppercase leading-[15px] tracking-[2px] text-[#bbcabf]">
              INTELLIGENCE
            </p>
            <h1 className="text-[30px] font-semibold leading-9 tracking-[-0.75px] text-[#e5e2e1]">
              Recent context
            </h1>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-[rgba(60,74,66,0.1)] bg-[#1c1b1b] p-[17px]">
            <div className="flex items-center gap-3">
              <div className="relative size-[13px] shrink-0">
                <img alt="" className="absolute inset-0 size-full max-w-none" src={imgUsageSparkle} />
              </div>
              <span className="text-[12px] font-medium leading-4 text-[#bbcabf]">Usage</span>
            </div>
            <p className="text-[14px] font-semibold leading-5 text-[#e5e2e1]">
              Saved you ~12 min this week
            </p>
          </div>

          <div className="flex flex-col gap-9 pb-6">
            <div className="flex flex-col gap-4 rounded-2xl bg-[#1c1b1b] p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[14px] font-semibold leading-5 text-[rgba(229,226,225,0.9)]">
                  Active Parameters
                </h2>
                <Link
                  to="/connectors"
                  className="relative mt-0.5 inline-flex min-h-9 min-w-9 shrink-0 items-center justify-center rounded-full text-[#bbcabf] transition-colors hover:text-[#e5e2e1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4edea3]"
                  aria-label="Connectors — manage integrations"
                >
                  <img
                    alt=""
                    className="size-[15px] max-w-none object-contain opacity-90"
                    src={imgOptionsDots}
                  />
                </Link>
              </div>

              <div className="flex flex-col gap-2">
                {/* Connectors — navigates to Connectors page */}
                <Link
                  to="/connectors"
                  className="flex items-center justify-between gap-3 rounded-xl border border-[rgba(60,74,66,0.08)] bg-[#0e0e0e] p-4 transition-colors hover:bg-[#141414] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4edea3]"
                >
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase leading-[15px] tracking-[0.5px] text-[#bbcabf]">
                      CONNECTORS
                    </p>
                    <p className="mt-0.5 text-[14px] font-medium leading-5 text-[#e5e2e1]">
                      Manage app integrations
                    </p>
                  </div>
                  <span className="shrink-0 text-[#4edea3]" aria-hidden>
                    →
                  </span>
                </Link>

                {/* Meeting schedule — static */}
                <div className="flex items-center justify-between gap-3 rounded-xl bg-[#0e0e0e] p-4">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase leading-[15px] tracking-[0.5px] text-[#bbcabf]">
                      MEETING SCHEDULE
                    </p>
                    <p className="mt-0.5 truncate text-[14px] font-medium leading-5 text-[#e5e2e1]">
                      Evenings preferred
                    </p>
                  </div>
                  <button
                    type="button"
                    className="relative size-[14px] shrink-0 opacity-80 hover:opacity-100"
                    aria-label="Edit meeting schedule"
                  >
                    <img alt="" className="absolute inset-0 size-full max-w-none" src={imgEdit} />
                  </button>
                </div>

                {/* Favorite contacts — editable list */}
                <div className="rounded-xl bg-[#0e0e0e] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase leading-[15px] tracking-[0.5px] text-[#bbcabf]">
                        FAVORITE CONTACTS
                      </p>
                      <p
                        className={`mt-0.5 text-[14px] font-medium leading-5 ${contacts.length === 0 ? 'text-[rgba(187,202,191,0.65)]' : 'text-[#e5e2e1]'}`}
                      >
                        {formatContactLine(contacts)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingContacts((v) => !v)}
                      className="relative mt-0.5 size-[14px] shrink-0 opacity-80 hover:opacity-100"
                      aria-expanded={editingContacts}
                      aria-label={editingContacts ? 'Close contact editor' : 'Edit favorite contacts'}
                    >
                      <img alt="" className="absolute inset-0 size-full max-w-none" src={imgEdit} />
                    </button>
                  </div>

                  {editingContacts ? (
                    <div className="mt-4 flex flex-col gap-3 border-t border-[rgba(60,74,66,0.2)] pt-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                        <div className="flex-1">
                          <label
                            htmlFor={`${baseId}-fn`}
                            className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-[rgba(187,202,191,0.75)]"
                          >
                            First name
                          </label>
                          <input
                            id={`${baseId}-fn`}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First name"
                            className="w-full rounded-lg border border-[rgba(60,74,66,0.25)] bg-[#131313] px-3 py-2 text-[14px] text-[#e5e2e1] placeholder:text-[rgba(187,202,191,0.35)] focus:border-[#4edea3] focus:outline-none focus:ring-1 focus:ring-[#4edea3]"
                          />
                        </div>
                        <div className="flex-1">
                          <label
                            htmlFor={`${baseId}-ln`}
                            className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-[rgba(187,202,191,0.75)]"
                          >
                            Last name
                          </label>
                          <input
                            id={`${baseId}-ln`}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last name"
                            className="w-full rounded-lg border border-[rgba(60,74,66,0.25)] bg-[#131313] px-3 py-2 text-[14px] text-[#e5e2e1] placeholder:text-[rgba(187,202,191,0.35)] focus:border-[#4edea3] focus:outline-none focus:ring-1 focus:ring-[#4edea3]"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={addContact}
                          className="shrink-0 rounded-lg bg-[#4edea3] px-4 py-2 text-[14px] font-semibold text-[#003824] hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4edea3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e0e]"
                        >
                          Add
                        </button>
                      </div>

                      {contacts.length > 0 ? (
                        <ul className="flex flex-col gap-2" aria-label="Favorite contacts list">
                          {contacts.map((c) => (
                            <li
                              key={c.id}
                              className="flex items-center justify-between gap-2 rounded-lg border border-[rgba(60,74,66,0.15)] bg-[#131313] px-3 py-2"
                            >
                              <span className="text-[14px] text-[#e5e2e1]">
                                {[c.firstName.trim(), c.lastName.trim()].filter(Boolean).join(' ') ||
                                  'Unnamed'}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeContact(c.id)}
                                className="shrink-0 rounded px-2 py-1 text-[12px] font-medium text-[#ffb4ab] hover:bg-[rgba(255,180,171,0.08)]"
                                aria-label={`Remove ${c.firstName} ${c.lastName}`}
                              >
                                Remove
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                {/* Tone & style — editable options */}
                <div className="rounded-xl bg-[#0e0e0e] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase leading-[15px] tracking-[0.5px] text-[#bbcabf]">
                        TONE &amp; STYLE
                      </p>
                      <p className="mt-0.5 text-[14px] font-medium leading-5 text-[#e5e2e1]">
                        {toneLabel}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingTone((v) => !v)}
                      className="relative mt-0.5 size-[14px] shrink-0 opacity-80 hover:opacity-100"
                      aria-expanded={editingTone}
                      aria-label={editingTone ? 'Close tone options' : 'Edit tone and style'}
                    >
                      <img alt="" className="absolute inset-0 size-full max-w-none" src={imgEdit} />
                    </button>
                  </div>

                  {editingTone ? (
                    <fieldset className="mt-4 border-t border-[rgba(60,74,66,0.2)] pt-4">
                      <legend className="sr-only">Tone and style</legend>
                      <div className="flex flex-col gap-2">
                        {TONE_OPTIONS.map((opt) => (
                          <label
                            key={opt.id}
                            className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-[14px] transition-colors ${
                              toneStyle === opt.id
                                ? 'border-[#4edea3] bg-[rgba(78,222,163,0.12)] text-[#e5e2e1]'
                                : 'border-[rgba(60,74,66,0.2)] bg-[#131313] text-[#bbcabf] hover:border-[rgba(78,222,163,0.35)]'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`${baseId}-tone`}
                              value={opt.id}
                              checked={toneStyle === opt.id}
                              onChange={() => setToneStyle(opt.id)}
                              className="size-4 shrink-0 accent-[#4edea3]"
                            />
                            <span>{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  ) : null}
                </div>

                {/* Project anchor */}
                <div className="flex items-center justify-between gap-3 rounded-xl bg-[#0e0e0e] p-4">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase leading-[15px] tracking-[0.5px] text-[#bbcabf]">
                      PROJECT ANCHOR
                    </p>
                    <p className="mt-0.5 truncate text-[14px] font-medium leading-5 text-[#e5e2e1]">
                      Project Titan
                    </p>
                  </div>
                  <button
                    type="button"
                    className="relative size-[14px] shrink-0 opacity-80 hover:opacity-100"
                    aria-label="Edit project anchor"
                  >
                    <img alt="" className="absolute inset-0 size-full max-w-none" src={imgEdit} />
                  </button>
                </div>
              </div>
            </div>

            <p className="mx-auto max-w-[294px] text-center text-[12px] font-normal italic leading-[19.5px] text-[rgba(187,202,191,0.6)]">
              Context items are used to personalize your responses. You can modify or remove them at
              any time.
            </p>
          </div>
        </div>
      </main>

      <AppBottomNav settingsIconSrc="/nav-settings-active.png" largeSettingsIcon />
    </div>
  )
}
