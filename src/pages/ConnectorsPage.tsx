import { useState } from 'react'
import { Link } from 'react-router-dom'

const imgUser =
  'https://www.figma.com/api/mcp/asset/94be4414-cc9e-4d5c-b29e-04dae21dab43'
const imgSlack = 'https://www.figma.com/api/mcp/asset/7f8b54cb-075d-4394-abca-8b16e0f03f17'
const imgChevron = 'https://www.figma.com/api/mcp/asset/904401dc-d0df-4175-afc0-ae2c1345bd58'
const imgGmail = 'https://www.figma.com/api/mcp/asset/1ab1859c-8732-4318-8837-b75a2ae32e74'
const imgCalendar = 'https://www.figma.com/api/mcp/asset/4a208709-22c0-40a0-8352-8f33422f60ea'
const imgMessenger = 'https://www.figma.com/api/mcp/asset/b06135a3-b617-4549-b890-9f744d20ec7a'
const imgNotion = 'https://www.figma.com/api/mcp/asset/fd9b6a2f-bad3-4e30-9fb3-95fc69d45be4'
const imgSearch = 'https://www.figma.com/api/mcp/asset/218a2058-ddba-48e5-a9bc-f1535a58879b'
const imgNavHome = 'https://www.figma.com/api/mcp/asset/e80acde6-8a6f-4a8d-ad4f-e70b629f347b'
const imgNavApps = 'https://www.figma.com/api/mcp/asset/1eb49a59-c8af-4f3b-9ca2-d49626648a9a'
const imgNavGraph = 'https://www.figma.com/api/mcp/asset/3468b1d5-0351-412a-b66b-f7564dfae3fb'
const imgNavSettings = 'https://www.figma.com/api/mcp/asset/ade41d2d-7946-4074-9c9a-219671a3ba4e'

function Toggle({
  on,
  onChange,
}: {
  on: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="relative h-6 w-11 shrink-0 rounded-full transition-colors"
      style={{ backgroundColor: on ? '#4edea3' : '#353534' }}
    >
      <span
        className={`absolute top-0.5 size-5 rounded-full border bg-white transition-[left] ${
          on ? 'left-[22px] border-white' : 'left-0.5 border-[#d1d5db]'
        }`}
      />
    </button>
  )
}

export function ConnectorsPage() {
  const [slack, setSlack] = useState(true)
  const [gmail, setGmail] = useState(true)
  const [calendar, setCalendar] = useState(true)
  const [messenger, setMessenger] = useState(false)
  const [notion, setNotion] = useState(true)

  return (
    <div className="acta-shell text-[#e5e2e1]">
      <header className="acta-header-fixed z-10 flex h-16 items-center justify-between bg-[#131313] px-6">
        <div className="size-8 overflow-hidden rounded-full bg-[#2a2a2a]">
          <img alt="" className="size-full object-cover" src={imgUser} />
        </div>
        <button type="button" className="rounded-full p-2">
          <img alt="Search" className="size-[18px]" src={imgSearch} />
        </button>
      </header>

      <main className="acta-main acta-main--inset-both max-w-[672px] px-6 pb-6">
        <div className="mb-10 flex flex-col gap-[7px]">
          <h1 className="text-[32px] font-bold leading-[48px] tracking-[-1.6px] text-[#e5e2e1]">
            Connectors
          </h1>
          <p className="max-w-md text-[15px] font-normal leading-[22.5px] text-[#bbcabf]">
            Manage third-party integrations to allow the Acta agent to monitor your communications and
            automate tasks.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <IntegrationRow
            name="Slack"
            status="ACTIVE CONNECTION"
            statusTone="active"
            icon={imgSlack}
            iconBox="h-[23px] w-6"
            toggled={slack}
            onToggle={setSlack}
            chevron={imgChevron}
          />
          <IntegrationRow
            name="Gmail"
            status="ACTIVE CONNECTION"
            statusTone="active"
            icon={imgGmail}
            iconBox="h-4 w-5"
            toggled={gmail}
            onToggle={setGmail}
            chevron={imgChevron}
          />
          <IntegrationRow
            name="Google Calendar"
            status="ACTIVE CONNECTION"
            statusTone="active"
            icon={imgCalendar}
            iconBox="h-5 w-[18px]"
            toggled={calendar}
            onToggle={setCalendar}
            chevron={imgChevron}
          />
          <IntegrationRow
            name="Messenger"
            status="DISCONNECTED"
            statusTone="disconnected"
            icon={imgMessenger}
            iconBox="size-5"
            toggled={messenger}
            onToggle={setMessenger}
            chevron={imgChevron}
          />
          <IntegrationRow
            name="Notion"
            status="ACTIVE CONNECTION"
            statusTone="active"
            icon={imgNotion}
            iconBox="size-[18px]"
            toggled={notion}
            onToggle={setNotion}
            chevron={imgChevron}
          />
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl bg-[#1c1b1b] px-8 pb-8 pt-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-[7px]">
              <h2 className="text-[20px] font-bold leading-7 text-[#e5e2e1]">{`Can't find your app?`}</h2>
              <p className="text-[15px] font-normal leading-[22.5px] text-[#bbcabf]">
                {`We're constantly adding new agentic connections. Request an integration or check our labs.`}
              </p>
            </div>
            <button
              type="button"
              className="rounded-xl bg-gradient-to-br from-[#4edea3] to-[#10b981] px-16 py-3 text-center shadow-[0px_0px_15px_0px_rgba(78,222,163,0.2)]"
            >
              <span className="text-[16px] font-bold leading-6 text-[#003824]">Request Connector</span>
            </button>
          </div>
        </div>
      </main>

      <nav
        className="acta-nav-fixed flex h-20 items-center justify-between bg-[rgba(19,19,19,0.9)] px-4 backdrop-blur-[12px]"
        aria-label="Primary"
      >
        <Link to="/" className="flex items-center justify-center p-3">
          <img alt="" className="h-[18px] w-4" src={imgNavHome} />
        </Link>
        <div className="flex items-center justify-center p-3">
          <img alt="" className="size-[19.3px]" src={imgNavApps} />
        </div>
        <Link to="/graph" className="flex items-center justify-center p-3">
          <img alt="" className="h-[23px] w-6" src={imgNavGraph} />
        </Link>
        <div className="flex items-center justify-center p-3">
          <img
            alt=""
            className="h-5 w-[20.1px] drop-shadow-[0_0_8px_rgba(78,222,163,0.9)]"
            src={imgNavSettings}
          />
        </div>
      </nav>
    </div>
  )
}

function IntegrationRow({
  name,
  status,
  statusTone,
  icon,
  iconBox,
  toggled,
  onToggle,
  chevron,
}: {
  name: string
  status: string
  statusTone: 'active' | 'disconnected'
  icon: string
  iconBox: string
  toggled: boolean
  onToggle: (v: boolean) => void
  chevron: string
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-[#1c1b1b] p-4">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-[rgba(60,74,66,0.1)] bg-[#0e0e0e] p-px">
          <div className={`relative ${iconBox}`}>
            <img alt="" className="absolute inset-0 size-full max-w-none object-contain" src={icon} />
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-[16px] font-semibold leading-6 text-[#e5e2e1]">{name}</p>
          <p
            className={`text-[11px] uppercase leading-[16.5px] tracking-[1.1px] ${
              statusTone === 'active' ? 'text-[#bbcabf]' : 'text-[#ffb4ab] opacity-60'
            }`}
          >
            {status}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-6">
        <Toggle on={toggled} onChange={onToggle} />
        <div className="relative h-3 w-[7.4px]">
          <img alt="" className="absolute inset-0 size-full max-w-none" src={chevron} />
        </div>
      </div>
    </div>
  )
}
