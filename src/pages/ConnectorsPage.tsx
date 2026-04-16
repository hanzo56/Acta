import type { ReactNode } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const imgUser =
  "https://www.figma.com/api/mcp/asset/94be4414-cc9e-4d5c-b29e-04dae21dab43";
const imgSlack =
  "https://www.figma.com/api/mcp/asset/7f8b54cb-075d-4394-abca-8b16e0f03f17";
const imgChevron =
  "https://www.figma.com/api/mcp/asset/904401dc-d0df-4175-afc0-ae2c1345bd58";
const imgGmail =
  "https://www.figma.com/api/mcp/asset/1ab1859c-8732-4318-8837-b75a2ae32e74";
const imgCalendar =
  "https://www.figma.com/api/mcp/asset/4a208709-22c0-40a0-8352-8f33422f60ea";
const imgOpenTable =
  "https://www.figma.com/api/mcp/asset/15cb743f-3903-41f2-a2a1-d44319c5e6ca";
const imgSearch =
  "https://www.figma.com/api/mcp/asset/218a2058-ddba-48e5-a9bc-f1535a58879b";
const imgNavHome =
  "https://www.figma.com/api/mcp/asset/e80acde6-8a6f-4a8d-ad4f-e70b629f347b";
const imgNavApps =
  "https://www.figma.com/api/mcp/asset/1eb49a59-c8af-4f3b-9ca2-d49626648a9a";
const imgNavGraph =
  "https://www.figma.com/api/mcp/asset/3468b1d5-0351-412a-b66b-f7564dfae3fb";
const imgNavSettings =
  "https://www.figma.com/api/mcp/asset/ade41d2d-7946-4074-9c9a-219671a3ba4e";

/** Simple Icons CDN — brand marks for connectors without Figma assets */
const iconInstagram = "https://cdn.simpleicons.org/instagram/E4405F";
const iconFacebook = "https://cdn.simpleicons.org/facebook/1877F2";
const iconMessages = "https://cdn.simpleicons.org/imessage/37EE52";

function LinkedInConnectorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-full max-h-full max-w-full"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#0A66C2"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

function ContactsConnectorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-full max-h-full max-w-full"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#4edea3"
        d="M9 8.25a2.75 2.75 0 115.5 0 2.75 2.75 0 01-5.5 0zm-1.62 3.62c.78-1.28 2.18-2.12 3.87-2.12 1.68 0 3.09.84 3.87 2.12.26.43.41.93.41 1.46V15H5.97v-1.67c0-.53.15-1.03.41-1.46z"
      />
      <path
        fill="#bbcabf"
        d="M14.5 5.25c0-.41.34-.75.75-.75h5c.41 0 .75.34.75.75v13.5c0 .41-.34.75-.75.75h-5a.75.75 0 01-.75-.75V5.25zm1.5 2.25h3.5V9h-3.5V7.5zm0 3h3.5v1.5h-3.5V10.5zm0 3h2.5V15H16v-1.5z"
      />
    </svg>
  );
}

/** Microsoft Outlook–style mark (inline SVG — no external CDN). */
function OutlookConnectorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-full max-h-full max-w-full"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#0078D4"
        d="M4.5 3h15A2.5 2.5 0 0122 5.5v13A2.5 2.5 0 0119.5 21h-15A2.5 2.5 0 012 18.5v-13A2.5 2.5 0 014.5 3z"
      />
      <path
        fill="#ffffff"
        d="M5.25 7.25 12 11.5l6.75-4.25V6.5L12 10.25 5.25 6.5v.75zm0 1.4V16.5h13.5V8.65L12 12.85 5.25 8.65z"
      />
    </svg>
  );
}

type ConnectorKey =
  | "slack"
  | "gmail"
  | "outlook"
  | "calendar"
  | "messages"
  | "openTable"
  | "instagram"
  | "facebook"
  | "linkedIn"
  | "contacts";

const CONNECTORS_RAW: {
  key: ConnectorKey;
  name: string;
  icon: string | ReactNode;
  iconBox: string;
  defaultOn: boolean;
}[] = [
  {
    key: "calendar",
    name: "Calendar",
    icon: imgCalendar,
    iconBox: "h-5 w-[18px]",
    defaultOn: true,
  },
  {
    key: "contacts",
    name: "Contacts",
    icon: <ContactsConnectorIcon />,
    iconBox: "size-5",
    defaultOn: true,
  },
  {
    key: "facebook",
    name: "Facebook",
    icon: iconFacebook,
    iconBox: "size-5",
    defaultOn: false,
  },
  {
    key: "gmail",
    name: "Gmail",
    icon: imgGmail,
    iconBox: "h-4 w-5",
    defaultOn: true,
  },
  {
    key: "instagram",
    name: "Instagram",
    icon: iconInstagram,
    iconBox: "size-5",
    defaultOn: false,
  },
  {
    key: "linkedIn",
    name: "Linked In",
    icon: <LinkedInConnectorIcon />,
    iconBox: "size-5",
    defaultOn: false,
  },
  {
    key: "messages",
    name: "Messages",
    icon: iconMessages,
    iconBox: "size-5",
    defaultOn: false,
  },
  {
    key: "openTable",
    name: "OpenTable",
    icon: imgOpenTable,
    iconBox: "size-[18px]",
    defaultOn: true,
  },
  {
    key: "outlook",
    name: "Outlook",
    icon: <OutlookConnectorIcon />,
    iconBox: "h-5 w-5",
    defaultOn: false,
  },
  {
    key: "slack",
    name: "Slack",
    icon: imgSlack,
    iconBox: "h-[23px] w-6",
    defaultOn: true,
  },
];

const CONNECTORS = [...CONNECTORS_RAW].sort((a, b) =>
  a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
);

function initialToggles(): Record<ConnectorKey, boolean> {
  return Object.fromEntries(
    CONNECTORS.map((c) => [c.key, c.defaultOn]),
  ) as Record<ConnectorKey, boolean>;
}

function Toggle({
  on,
  onChange,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="relative h-6 w-11 shrink-0 rounded-full transition-colors"
      style={{ backgroundColor: on ? "#4edea3" : "#353534" }}
    >
      <span
        className={`absolute top-0.5 size-5 rounded-full border bg-white transition-[left] ${
          on ? "left-[22px] border-white" : "left-0.5 border-[#d1d5db]"
        }`}
      />
    </button>
  );
}

export function ConnectorsPage() {
  const [toggles, setToggles] = useState(initialToggles);

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
            Manage third-party integrations to allow the Acta agent to monitor
            your communications and automate tasks.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {CONNECTORS.map((c) => (
            <IntegrationRow
              key={c.key}
              name={c.name}
              icon={c.icon}
              iconBox={c.iconBox}
              toggled={toggles[c.key]}
              onToggle={(v) => setToggles((prev) => ({ ...prev, [c.key]: v }))}
              chevron={imgChevron}
            />
          ))}
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
              <span className="text-[16px] font-bold leading-6 text-[#003824]">
                Request Connector
              </span>
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
  );
}

function IntegrationRow({
  name,
  icon,
  iconBox,
  toggled,
  onToggle,
  chevron,
}: {
  name: string;
  icon: string | ReactNode;
  iconBox: string;
  toggled: boolean;
  onToggle: (v: boolean) => void;
  chevron: string;
}) {
  const status = toggled ? "Active Connection" : "Disconnected";
  const statusTone = toggled ? "active" : "disconnected";

  return (
    <div className="flex items-center justify-between rounded-xl bg-[#1c1b1b] p-4">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-[rgba(60,74,66,0.1)] bg-[#0e0e0e] p-px">
          <div
            className={`relative flex items-center justify-center ${iconBox} ${typeof icon === "string" ? "" : "text-[#e5e2e1]"}`}
          >
            {typeof icon === "string" ? (
              <img
                alt=""
                className="absolute inset-0 size-full max-w-none object-contain"
                src={icon}
              />
            ) : (
              icon
            )}
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-[16px] font-semibold leading-6 text-[#e5e2e1]">
            {name}
          </p>
          <p
            className={`text-[11px] uppercase leading-[16.5px] tracking-[1.1px] ${
              statusTone === "active"
                ? "text-[#bbcabf]"
                : "text-[#ffb4ab] opacity-60"
            }`}
          >
            {status}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-6">
        <Toggle on={toggled} onChange={onToggle} />
        <div className="relative h-3 w-[7.4px]">
          <img
            alt=""
            className="absolute inset-0 size-full max-w-none"
            src={chevron}
          />
        </div>
      </div>
    </div>
  );
}
