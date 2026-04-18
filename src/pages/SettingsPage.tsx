import { useCallback, useEffect, useId, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

/** Figma node 21:356 — Intelligence / Recent context */
const imgUser =
  'https://www.figma.com/api/mcp/asset/fb05fb57-5b8e-4a8f-a7de-a56ddcbf2849'
const imgUsageSparkle =
  'https://www.figma.com/api/mcp/asset/0b26063d-b262-4530-b4b8-813d2c25dd74'
const imgOptionsDots =
  'https://www.figma.com/api/mcp/asset/c3698677-04a0-4785-9ddd-52c4ce3a5891'
const imgEdit =
  'https://www.figma.com/api/mcp/asset/2942ae87-7b96-4360-9021-b4a849c3dbcf'
const imgSearch =
  'https://www.figma.com/api/mcp/asset/07a14779-9d0f-4656-9746-c3c766a58932'
const imgNavHome =
  'https://www.figma.com/api/mcp/asset/f8159318-98f5-4a10-b23a-f31f75ab63d2'
const imgNavApps =
  'https://www.figma.com/api/mcp/asset/2f0e5483-ac22-4b91-b8e3-e37f972705eb'
const imgNavGraph =
  'https://www.figma.com/api/mcp/asset/7855d582-3072-4873-b03d-5ef445275ad5'
const imgNavSettings =
  'https://www.figma.com/api/mcp/asset/cb903a54-72f1-4f23-92c3-c40fa0a0ccf6'

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
  const { pathname } = useLocation()
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
                  className="relative inline-flex min-h-9 min-w-9 shrink-0 items-center justify-center rounded-full text-[#bbcabf] transition-colors hover:text-[#e5e2e1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4edea3]"
                  aria-label="Connectors — manage integrations"
                >
                  <img
                    alt=""
                    className="h-0.5 w-8 max-w-none object-contain opacity-90"
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

      <nav
        className="acta-nav-fixed flex h-20 items-center justify-between bg-[rgba(19,19,19,0.9)] px-8 backdrop-blur-[12px]"
        aria-label="Primary"
      >
        <Link to="/" className="flex items-center justify-center p-3">
          <img alt="" className="h-[18px] w-4" src={imgNavHome} />
        </Link>
        <Link
          to="/tasks"
          className="flex items-center justify-center p-3"
          aria-current={pathname === '/tasks' ? 'page' : undefined}
        >
          <img
            alt=""
            className={`size-[19.3px] ${pathname === '/tasks' ? 'drop-shadow-[0_0_10px_rgba(78,222,163,0.85)]' : ''}`}
            src={imgNavApps}
          />
        </Link>
        <Link to="/graph" className="flex items-center justify-center p-3">
          <img alt="" className="h-[23px] w-6" src={imgNavGraph} />
        </Link>
        <Link
          to="/settings"
          className="flex items-center justify-center p-3"
          aria-current="page"
        >
          <img
            alt=""
            className="h-5 w-[20.1px] drop-shadow-[0_0_10px_rgba(78,222,163,0.85)]"
            src={imgNavSettings}
          />
        </Link>
      </nav>
    </div>
  )
}
