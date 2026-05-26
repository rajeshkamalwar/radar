import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bot,
  Building2,
  CheckCircle2,
  CircleDot,
  Compass,
  Gauge,
  Globe2,
  LineChart,
  Megaphone,
  MessageSquareReply,
  Network,
  Radar,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users
} from "lucide-react";
import {
  activityEvents,
  approvals,
  nextActions,
  radarModules,
  signalBands,
  type RadarModule,
  type RadarStatus
} from "@/lib/radar-data";

const iconMap = {
  executive: Gauge,
  search: Globe2,
  ai: Bot,
  reputation: ShieldCheck,
  reviews: MessageSquareReply,
  local: Building2,
  social: Megaphone,
  influencer: Users,
  trend: TrendingUp,
  authority: Network,
  competitor: Target,
  funnel: LineChart
};

const statusLabels: Record<RadarStatus, string> = {
  clear: "Clear",
  watch: "Watch",
  risk: "Risk",
  growth: "Growth"
};

const statusClasses: Record<RadarStatus, string> = {
  clear: "bg-stone-100 text-stone-700 ring-stone-200",
  watch: "bg-amber-50 text-amber-800 ring-amber-200",
  risk: "bg-red-50 text-red-800 ring-red-200",
  growth: "bg-emerald-50 text-emerald-800 ring-emerald-200"
};

function StatusBadge({ status }: { status: RadarStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusClasses[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}

function ModuleCard({ module }: { module: RadarModule }) {
  const Icon = iconMap[module.id as keyof typeof iconMap] ?? CircleDot;

  return (
    <article className="module-card">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="module-icon" style={{ color: module.accent }}>
            <Icon size={20} strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-ink">{module.name}</h3>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-stone-600">
              {module.description}
            </p>
          </div>
        </div>
        <StatusBadge status={module.status} />
      </div>

      <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <div className="text-3xl font-semibold text-ink">{module.score}</div>
          <div className="mt-1 text-xs font-medium text-stone-500">RADAR score</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-emerald-700">{module.change}</div>
          <div className="mt-1 text-xs text-stone-500">{module.signalCount.toLocaleString()} signals</div>
        </div>
      </div>

      <div className="mt-4 h-2 rounded-full bg-stone-100">
        <div
          className="h-2 rounded-full"
          style={{ width: `${module.score}%`, backgroundColor: module.accent }}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {module.kpis.map((kpi) => (
          <span key={kpi} className="rounded-full bg-white px-2.5 py-1 text-xs text-stone-600 ring-1 ring-stone-200">
            {kpi}
          </span>
        ))}
      </div>
    </article>
  );
}

function RadarPulse() {
  return (
    <div className="radar-visual" aria-label="RADAR signal map">
      <div className="radar-ring ring-one" />
      <div className="radar-ring ring-two" />
      <div className="radar-ring ring-three" />
      <div className="radar-cross horizontal" />
      <div className="radar-cross vertical" />
      <div className="radar-sweep" />
      <span className="signal-dot dot-one" />
      <span className="signal-dot dot-two" />
      <span className="signal-dot dot-three" />
      <span className="signal-dot dot-four" />
      <div className="radar-core">
        <Radar size={26} />
        <span>Live</span>
      </div>
    </div>
  );
}

export default function Home() {
  const executiveScore = radarModules[0]?.score ?? 0;
  const activeRisks = radarModules.filter((module) => module.status === "risk").length;
  const watchItems = radarModules.filter((module) => module.status === "watch").length;
  const growthItems = radarModules.filter((module) => module.status === "growth").length;

  return (
    <main className="min-h-screen bg-paper text-ink">
      <aside className="fixed inset-y-0 left-0 hidden w-20 border-r border-stone-200 bg-white/85 px-3 py-5 backdrop-blur xl:block">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-white">
          <Radar size={23} />
        </div>
        <nav className="mt-8 flex flex-col items-center gap-3">
          {[Gauge, Globe2, Bot, ShieldCheck, MessageSquareReply, Megaphone, BarChart3].map((Icon, index) => (
            <button key={index} className="nav-button" aria-label={`RADAR navigation ${index + 1}`}>
              <Icon size={19} />
            </button>
          ))}
        </nav>
      </aside>

      <section className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8 xl:pl-28">
        <header className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white px-5 py-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-normal text-ink">RADAR Command Center</h1>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200">
                Live signal scan
              </span>
            </div>
            <p className="mt-1 max-w-3xl text-sm text-stone-600">
              Reputation, Authority, Discovery, Analytics & Response across search, AI, social, reviews, local, creators, competitors, and funnel impact.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="primary-button">
              <Sparkles size={17} />
              Run scan
            </button>
            <button className="secondary-button">
              <CheckCircle2 size={17} />
              Approvals
            </button>
          </div>
        </header>

        <section className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-panel">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold uppercase text-stone-500">Enterprise visibility index</p>
                <div className="mt-3 flex flex-wrap items-end gap-4">
                  <div className="text-6xl font-semibold leading-none text-ink">{executiveScore}</div>
                  <div className="pb-1">
                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                      <TrendingUp size={17} />
                      +8.4% this cycle
                    </div>
                    <p className="mt-1 text-sm text-stone-600">
                      Growth signals are strong, but reputation risk needs response before it spreads.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="metric-tile">
                    <span>{growthItems}</span>
                    <p>growth radars</p>
                  </div>
                  <div className="metric-tile">
                    <span>{watchItems}</span>
                    <p>watch radars</p>
                  </div>
                  <div className="metric-tile">
                    <span>{activeRisks}</span>
                    <p>active risks</p>
                  </div>
                </div>
              </div>
              <RadarPulse />
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-panel">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold">Signal Balance</h2>
              <Activity size={18} className="text-stone-500" />
            </div>
            <div className="mt-5 space-y-4">
              {signalBands.map((band) => (
                <div key={band.label}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-stone-700">{band.label}</span>
                    <span className="font-semibold text-ink">{band.value}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-stone-100">
                    <div
                      className="h-2.5 rounded-full"
                      style={{ width: `${band.value}%`, backgroundColor: band.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[1fr_420px]">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Specialist Intelligence Centers</h2>
              <span className="text-sm text-stone-500">12 independent RADAR authorities</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
              {radarModules.map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-panel">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">Next Best Actions</h2>
                <Compass size={18} className="text-stone-500" />
              </div>
              <div className="mt-4 space-y-4">
                {nextActions.map((action) => (
                  <article key={action.title} className="action-row">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-semibold leading-5">{action.title}</h3>
                      <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-800">
                        {action.impact}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-stone-600">{action.evidence}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <span className="chip">{action.module}</span>
                      <span className="chip">Risk {action.risk}</span>
                      <span className="chip">{action.automation}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-panel">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">Approval Queue</h2>
                <CheckCircle2 size={18} className="text-stone-500" />
              </div>
              <div className="mt-4 space-y-3">
                {approvals.map((approval) => (
                  <article key={approval.title} className="approval-row">
                    <div>
                      <h3 className="text-sm font-semibold">{approval.title}</h3>
                      <p className="mt-1 text-xs text-stone-500">
                        {approval.module} · {approval.owner} · {approval.eta}
                      </p>
                    </div>
                    <span className={`risk-pill risk-${approval.risk.toLowerCase()}`}>
                      {approval.risk}
                    </span>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-panel">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">Work Ledger</h2>
                <AlertTriangle size={18} className="text-stone-500" />
              </div>
              <div className="mt-4 space-y-4">
                {activityEvents.map((event) => (
                  <article key={`${event.time}-${event.title}`} className="timeline-row">
                    <div className={`timeline-dot tone-${event.tone}`} />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-stone-500">{event.time}</span>
                        <span className="text-xs font-semibold text-stone-700">{event.module}</span>
                      </div>
                      <h3 className="mt-1 text-sm font-semibold">{event.title}</h3>
                      <p className="mt-1 text-xs leading-5 text-stone-600">{event.detail}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>
      </section>
    </main>
  );
}
