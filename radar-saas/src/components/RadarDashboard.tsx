"use client";

import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Bot,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Compass,
  FileCheck2,
  Gauge,
  Globe2,
  LineChart,
  Megaphone,
  Menu,
  MessageSquareReply,
  Network,
  Radar,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  alpha,
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CssBaseline,
  Divider,
  IconButton,
  LinearProgress,
  List,
  ListItemButton,
  ListItemIcon,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  Tooltip,
  Toolbar,
  Typography
} from "@mui/material";
import {
  activityEvents,
  approvals,
  nextActions,
  radarModules,
  signalBands,
  type RadarModule,
  type RadarStatus
} from "@/lib/radar-data";
import { radarTheme } from "@/theme/radarTheme";

const drawerWidth = 288;

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

const statusTone: Record<
  RadarStatus,
  { label: string; color: "default" | "primary" | "success" | "warning" | "error" }
> = {
  clear: { label: "Clear", color: "default" },
  watch: { label: "Watch", color: "warning" },
  risk: { label: "Risk", color: "error" },
  growth: { label: "Growth", color: "success" }
};

const priorityTone: Record<
  RadarModule["priority"],
  { color: "success" | "warning" | "error"; label: string }
> = {
  High: { color: "error", label: "High priority" },
  Medium: { color: "warning", label: "Medium priority" },
  Low: { color: "success", label: "Low priority" }
};

const quickFilters = ["All", "Needs attention", "Ready to approve", "Growth", "Risks"];

const liveSignalEvents: Array<{
  title: string;
  detail: string;
  module: string;
  tone: RadarStatus;
  source: string;
}> = [
  {
    title: "New Google review detected",
    detail: "A 2-star review mentions refund timing and needs approval before reply.",
    module: "Reviews",
    tone: "risk",
    source: "Google Business Profile"
  },
  {
    title: "AI answer changed",
    detail: "The brand now appears in 5 of 12 tracked buyer questions.",
    module: "AI Visibility",
    tone: "growth",
    source: "AI prompt monitor"
  },
  {
    title: "Ranking movement found",
    detail: "A priority service page moved into the first-page watch zone.",
    module: "Search",
    tone: "growth",
    source: "Search scan"
  },
  {
    title: "Creator risk cleared",
    detail: "Two creators passed brand-safety checks for the rising topic.",
    module: "Influencers",
    tone: "clear",
    source: "Creator monitor"
  },
  {
    title: "Competitor mention increased",
    detail: "A competitor appeared again in comparison-style AI answers.",
    module: "Competitors",
    tone: "watch",
    source: "Share of voice"
  }
];

const liveSignalChecks = [
  "AI prompts",
  "Reviews",
  "Google positions",
  "Local listings",
  "Social mentions",
  "Backlinks"
];

function useLiveSignals() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => setTick((current) => current + 1), 3500);
    return () => window.clearInterval(interval);
  }, []);

  return useMemo(() => {
    const activeEvent = liveSignalEvents[tick % liveSignalEvents.length];
    const scanProgress = 42 + ((tick * 13) % 54);
    const checksCompleted = 1284 + tick * 11;
    const queueDelta = tick % 3 === 0 ? 1 : 0;
    const signalLabel = liveSignalChecks[tick % liveSignalChecks.length];

    return {
      activeEvent,
      checksCompleted,
      queueDelta,
      scanProgress,
      signalLabel,
      lastUpdated: tick === 0 ? "Starting live scan" : `Updated ${Math.min(tick * 4, 60)}s ago`
    };
  }, [tick]);
}

const workspaceRoutes = {
  executive: "/",
  search: "/search",
  ai: "/ai-visibility",
  reputation: "/reputation",
  reviews: "/reviews",
  local: "/local",
  social: "/social",
  influencer: "/influencers",
  trend: "/trends",
  authority: "/authority",
  competitor: "/competitors",
  funnel: "/funnel"
} as const;

const moduleById = Object.fromEntries(radarModules.map((module) => [module.id, module])) as Record<
  RadarModule["id"],
  RadarModule
>;

const navGroups = [
  {
    label: "COMMAND",
    items: [
      { label: "Overview", href: "/", icon: Gauge, count: "91" },
      { label: "Approvals", href: "/approvals", icon: CheckCircle2, count: "4" },
      { label: "Activity", href: "/activity", icon: Activity, count: "24" },
      { label: "Reports", href: "/reports", icon: BarChart3, count: "8" }
    ]
  },
  {
    label: "VISIBILITY",
    items: [
      { label: "Search", href: workspaceRoutes.search, icon: Globe2, count: "84" },
      { label: "AI Visibility", href: workspaceRoutes.ai, icon: Bot, count: "72" },
      { label: "Local Presence", href: workspaceRoutes.local, icon: Building2, count: "88" },
      { label: "Authority", href: workspaceRoutes.authority, icon: Network, count: "70" }
    ]
  },
  {
    label: "TRUST",
    items: [
      { label: "Reputation", href: workspaceRoutes.reputation, icon: ShieldCheck, count: "68" },
      { label: "Reviews", href: workspaceRoutes.reviews, icon: MessageSquareReply, count: "79" }
    ]
  },
  {
    label: "GROWTH",
    items: [
      { label: "Social", href: workspaceRoutes.social, icon: Megaphone, count: "76" },
      { label: "Influencers", href: workspaceRoutes.influencer, icon: Users, count: "63" },
      { label: "Trends", href: workspaceRoutes.trend, icon: TrendingUp, count: "81" },
      { label: "Competitors", href: workspaceRoutes.competitor, icon: Target, count: "74" },
      { label: "Funnel", href: workspaceRoutes.funnel, icon: LineChart, count: "86" }
    ]
  },
  {
    label: "OPERATIONS",
    items: [
      { label: "Calendar", href: "/calendar", icon: CalendarDays, count: "6" },
      { label: "Settings", href: "/settings", icon: Compass, count: "" }
    ]
  }
];

function Sidebar() {
  const pathname = usePathname();

  return (
    <Box
      component="aside"
      sx={{
        display: { xs: "none", lg: "flex" },
        flexDirection: "column",
        width: drawerWidth,
        flexShrink: 0,
        borderRight: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
        minHeight: "100vh",
        position: "fixed",
        inset: "0 auto 0 0",
        zIndex: 10
      }}
    >
      <Stack direction="row" spacing={1.5} sx={{ p: 3, alignItems: "center" }}>
        <Box
          sx={{
            width: 42,
            height: 42,
            display: "grid",
            placeItems: "center",
            borderRadius: 2,
            color: "primary.contrastText",
            background: "linear-gradient(135deg, #7367f0, #00bad1)"
          }}
        >
          <Radar size={23} />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ lineHeight: 1.1 }}>
            RADAR
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Brand growth command center
          </Typography>
        </Box>
      </Stack>

      <Divider />

      <Box sx={{ px: 2, py: 2, overflowY: "auto" }}>
        {navGroups.map((group) => (
          <Box key={group.label} sx={{ mb: 2.5 }}>
            <Typography variant="caption" sx={{ px: 1.5, fontWeight: 800, color: "text.secondary" }}>
              {group.label}
            </Typography>
            <List dense disablePadding sx={{ mt: 1 }}>
              {group.items.map((item) => {
                const Icon = item.icon;
                const selected =
                  item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <ListItemButton
                    key={item.href}
                    component={Link}
                    href={item.href}
                    selected={selected}
                    sx={{
                      minHeight: 42,
                      borderRadius: 2,
                      mb: 0.5,
                      color: selected ? "primary.contrastText" : "text.primary",
                      "&.Mui-selected": {
                        color: "primary.contrastText",
                        bgcolor: "primary.main",
                        boxShadow: "0 4px 12px rgba(115, 103, 240, 0.35)",
                        "&:hover": { bgcolor: "primary.main" }
                      }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 34, color: "inherit" }}>
                      <Icon size={18} />
                    </ListItemIcon>
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography variant="body2" noWrap sx={{ fontWeight: 700 }}>
                        {item.label}
                      </Typography>
                    </Box>
                    {item.count ? (
                      <Typography variant="caption" sx={{ fontWeight: 800 }}>
                        {item.count}
                      </Typography>
                    ) : null}
                  </ListItemButton>
                );
              })}
            </List>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function MetricCard({
  title,
  value,
  change,
  icon,
  color
}: {
  title: string;
  value: string;
  change: string;
  icon: ReactNode;
  color: string;
}) {
  return (
    <Card>
      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700 }}>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ mt: 1, fontWeight: 800 }}>
              {value}
            </Typography>
            <Typography variant="caption" color="success.main" sx={{ fontWeight: 800 }}>
              {change}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 46,
              height: 46,
              display: "grid",
              placeItems: "center",
              borderRadius: 2,
              color,
              bgcolor: alpha(color, 0.12)
            }}
          >
            {icon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

function PulseDot({ color = "#28c76f" }: { color?: string }) {
  return (
    <Box
      sx={{
        width: 9,
        height: 9,
        borderRadius: "50%",
        bgcolor: color,
        boxShadow: `0 0 0 6px ${alpha(color, 0.14)}`,
        animation: "radarPulse 1.8s ease-in-out infinite",
        "@keyframes radarPulse": {
          "0%": { transform: "scale(0.92)", boxShadow: `0 0 0 0 ${alpha(color, 0.28)}` },
          "70%": { transform: "scale(1)", boxShadow: `0 0 0 8px ${alpha(color, 0)}` },
          "100%": { transform: "scale(0.92)", boxShadow: `0 0 0 0 ${alpha(color, 0)}` }
        }
      }}
    />
  );
}

function RealtimeTopStatus() {
  const live = useLiveSignals();

  return (
    <Tooltip title={`${live.lastUpdated}. Currently checking ${live.signalLabel}.`}>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          px: 1.5,
          py: 0.8,
          borderRadius: 2,
          border: 1,
          borderColor: "divider",
          bgcolor: alpha("#28c76f", 0.08)
        }}
      >
        <PulseDot />
        <Typography variant="caption" sx={{ fontWeight: 900 }}>
          Live
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap>
          {live.signalLabel}
        </Typography>
      </Stack>
    </Tooltip>
  );
}

function LiveSignalStrip() {
  const live = useLiveSignals();
  const tone = statusTone[live.activeEvent.tone];

  const cards = [
    {
      label: "Latest signal",
      value: live.activeEvent.title,
      detail: live.activeEvent.detail,
      icon: <Activity size={20} />,
      color: live.activeEvent.tone === "risk" ? "#ea5455" : "#28c76f"
    },
    {
      label: "Client queue",
      value: `${approvals.length + live.queueDelta} items`,
      detail: "Waiting for review, edits, or approval",
      icon: <FileCheck2 size={20} />,
      color: "#ff9f43"
    },
    {
      label: "Checks completed",
      value: live.checksCompleted.toLocaleString(),
      detail: live.lastUpdated,
      icon: <CheckCircle2 size={20} />,
      color: "#00bad1"
    }
  ];

  return (
    <Card>
      <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
        <Box
          sx={{
            p: 3,
            display: "grid",
            gridTemplateColumns: { xs: "minmax(0, 1fr)", lg: "1.05fr repeat(3, minmax(0, 1fr))" },
            gap: 2,
            alignItems: "stretch"
          }}
        >
          <Box
            sx={{
              p: 2.5,
              borderRadius: 2,
              color: "primary.contrastText",
              background: "linear-gradient(135deg, #28c76f, #00bad1)"
            }}
          >
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: 2,
                  bgcolor: alpha("#ffffff", 0.16)
                }}
              >
                <PulseDot color="#ffffff" />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="h6">Realtime monitor</Typography>
                <Typography variant="body2" sx={{ opacity: 0.86 }}>
                  Live signals from search, AI, reviews, local, social, and authority checks.
                </Typography>
              </Box>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={live.scanProgress}
              sx={{
                mt: 2.5,
                height: 8,
                borderRadius: 99,
                bgcolor: alpha("#ffffff", 0.2),
                "& .MuiLinearProgress-bar": {
                  bgcolor: "#ffffff",
                  borderRadius: 99
                }
              }}
            />
            <Stack direction="row" spacing={1} sx={{ mt: 1.5, alignItems: "center", flexWrap: "wrap", gap: 1 }}>
              <Chip label={live.signalLabel} size="small" sx={{ color: "white", bgcolor: alpha("#ffffff", 0.18) }} />
              <Chip label={live.lastUpdated} size="small" sx={{ color: "white", bgcolor: alpha("#ffffff", 0.18) }} />
            </Stack>
          </Box>

          {cards.map((item) => (
            <Paper key={item.label} variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    display: "grid",
                    placeItems: "center",
                    borderRadius: 2,
                    color: item.color,
                    bgcolor: alpha(item.color, 0.12),
                    flexShrink: 0
                  }}
                >
                  {item.icon}
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>
                      {item.label}
                    </Typography>
                    {item.label === "Latest signal" ? <Chip label={tone.label} color={tone.color} size="small" /> : null}
                  </Stack>
                  <Typography variant="body2" sx={{ mt: 0.5, fontWeight: 900, overflowWrap: "anywhere" }}>
                    {item.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.75 }}>
                    {item.detail}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

function CommandBrief() {
  const briefItems = [
    {
      title: "Top priority",
      value: "Sensitive review needs attention",
      detail: "Safety and refund concerns should be reviewed before any auto-reply.",
      icon: <AlertTriangle size={20} />,
      color: "#ea5455"
    },
    {
      title: "Ready to approve",
      value: "4 actions waiting",
      detail: "Review replies, search-friendly page details, and a creator shortlist.",
      icon: <FileCheck2 size={20} />,
      color: "#7367f0"
    },
    {
      title: "Best opportunity",
      value: "Buyer comparison page",
      detail: "Competitors are showing up when buyers ask AI tools who to choose.",
      icon: <TrendingUp size={20} />,
      color: "#28c76f"
    }
  ];

  return (
    <Card>
      <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
        <Box
          sx={{
            p: 3,
            display: "grid",
            gridTemplateColumns: { xs: "minmax(0, 1fr)", lg: "1.05fr repeat(3, minmax(0, 1fr))" },
            gap: 2,
            alignItems: "stretch"
          }}
        >
          <Box
            sx={{
              p: 2.5,
              borderRadius: 2,
              color: "primary.contrastText",
              background: "linear-gradient(135deg, #7367f0, #00bad1)"
            }}
          >
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: 2,
                  bgcolor: alpha("#ffffff", 0.16)
                }}
              >
                <Sparkles size={22} />
              </Box>
              <Box>
                <Typography variant="h6">Today&apos;s command brief</Typography>
                <Typography variant="body2" sx={{ opacity: 0.86 }}>
                  What the team should act on first.
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ mt: 2.5, flexWrap: "wrap", gap: 1 }}>
              <Chip label="1 risk" size="small" sx={{ color: "white", bgcolor: alpha("#ffffff", 0.18) }} />
              <Chip label="4 approvals" size="small" sx={{ color: "white", bgcolor: alpha("#ffffff", 0.18) }} />
              <Chip label="12 areas checked" size="small" sx={{ color: "white", bgcolor: alpha("#ffffff", 0.18) }} />
            </Stack>
          </Box>

          {briefItems.map((item) => (
            <Paper key={item.title} variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    display: "grid",
                    placeItems: "center",
                    borderRadius: 2,
                    color: item.color,
                    bgcolor: alpha(item.color, 0.12),
                    flexShrink: 0
                  }}
                >
                  {item.icon}
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5, fontWeight: 900 }}>
                    {item.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.75 }}>
                    {item.detail}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

function ModuleCard({ module }: { module: RadarModule }) {
  const Icon = iconMap[module.id as keyof typeof iconMap];
  const tone = statusTone[module.status];
  const priority = priorityTone[module.priority];

  return (
    <Card>
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start", justifyContent: "space-between" }}>
          <Stack direction="row" spacing={1.5} sx={{ minWidth: 0 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                display: "grid",
                placeItems: "center",
                borderRadius: 2,
                color: module.accent,
                bgcolor: alpha(module.accent, 0.12),
                flexShrink: 0
              }}
            >
              <Icon size={19} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, lineHeight: 1.25 }}>
                {module.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                Owner: {module.owner}
              </Typography>
            </Box>
          </Stack>
          <Stack spacing={0.75} sx={{ alignItems: "flex-end" }}>
            <Chip label={tone.label} color={tone.color} size="small" variant="outlined" />
            <Chip label={priority.label} color={priority.color} size="small" variant="filled" />
          </Stack>
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, minHeight: 42 }}>
          {module.description}
        </Typography>

        <Stack direction="row" sx={{ mt: 2, alignItems: "end", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 900 }}>
              {module.score}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Health score
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="body2" color="success.main" sx={{ fontWeight: 800 }}>
              {module.change}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {module.signalCount.toLocaleString()} checks
            </Typography>
          </Box>
        </Stack>

        <LinearProgress
          variant="determinate"
          value={module.score}
          sx={{
            mt: 2,
            height: 7,
            borderRadius: 99,
            bgcolor: alpha(module.accent, 0.14),
            "& .MuiLinearProgress-bar": {
              bgcolor: module.accent,
              borderRadius: 99
            }
          }}
        />

        <Stack direction="row" spacing={0.75} sx={{ mt: 2, flexWrap: "wrap", gap: 0.75 }}>
          {module.kpis.map((kpi) => (
            <Chip key={kpi} label={kpi} size="small" variant="outlined" />
          ))}
        </Stack>

        <Paper
          variant="outlined"
          sx={{
            mt: 2,
            p: 1.5,
            borderRadius: 2,
            bgcolor: alpha(module.accent, 0.05),
            borderColor: alpha(module.accent, 0.18)
          }}
        >
          <Stack direction="row" spacing={1.25} sx={{ alignItems: "center", minWidth: 0 }}>
            <Box sx={{ minWidth: 0, flexGrow: 1 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>
                Suggested next step
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.25, fontWeight: 800, overflowWrap: "anywhere" }}>
                {module.nextStep}
              </Typography>
            </Box>
            <ChevronRight size={18} style={{ flexShrink: 0 }} />
          </Stack>
        </Paper>
      </CardContent>
    </Card>
  );
}

function SignalBalance() {
  return (
    <Card>
      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h6">Channel Health</Typography>
            <Typography variant="body2" color="text.secondary">
              A quick view of where the brand is strongest and weakest
            </Typography>
          </Box>
          <Activity size={20} />
        </Stack>
        <Stack spacing={2.2} sx={{ mt: 3 }}>
          {signalBands.map((band) => (
            <Box key={band.label}>
              <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {band.label}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 900 }}>
                  {band.value}
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={band.value}
                sx={{
                  mt: 1,
                  height: 8,
                  borderRadius: 99,
                  bgcolor: alpha(band.color, 0.14),
                  "& .MuiLinearProgress-bar": {
                    bgcolor: band.color,
                    borderRadius: 99
                  }
                }}
              />
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

function ActionsTable() {
  return (
    <Card>
      <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
        <Stack direction="row" sx={{ p: 3, alignItems: "center", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h6">Next Best Actions</Typography>
            <Typography variant="body2" color="text.secondary">
              Ranked by impact, risk, automation, and evidence
            </Typography>
          </Box>
          <Compass size={20} />
        </Stack>
        <Divider />
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Action</TableCell>
                <TableCell>Module</TableCell>
                <TableCell>Impact</TableCell>
                <TableCell>Risk</TableCell>
                <TableCell>Mode</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nextActions.map((action) => (
                <TableRow key={action.title} hover>
                  <TableCell sx={{ minWidth: 280 }}>
                    <Typography variant="body2" sx={{ fontWeight: 800 }}>
                      {action.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {action.evidence}
                    </Typography>
                  </TableCell>
                  <TableCell>{action.module}</TableCell>
                  <TableCell>
                    <Chip label={action.impact} color="success" size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={action.risk}
                      color={action.risk === "High" ? "error" : action.risk === "Medium" ? "warning" : "success"}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{action.automation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

function ApprovalQueue() {
  return (
    <Card>
      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h6">Approval Queue</Typography>
            <Typography variant="body2" color="text.secondary">
              Human review before public actions
            </Typography>
          </Box>
          <CheckCircle2 size={20} />
        </Stack>
        <Stack spacing={2} sx={{ mt: 2.5 }}>
          {approvals.map((approval) => (
            <Paper
              key={approval.title}
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2
              }}
            >
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 800 }}>
                  {approval.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {approval.module} / {approval.owner} / {approval.eta}
                </Typography>
              </Box>
              <Chip
                label={approval.risk}
                size="small"
                color={approval.risk === "High" ? "error" : approval.risk === "Medium" ? "warning" : "success"}
              />
            </Paper>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

function WorkLedger() {
  const live = useLiveSignals();
  const liveEvents = [
    {
      time: "Now",
      title: live.activeEvent.title,
      detail: live.activeEvent.detail,
      module: live.activeEvent.module,
      tone: live.activeEvent.tone
    },
    ...activityEvents
  ];

  return (
    <Card>
      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h6">Work Ledger</Typography>
            <Typography variant="body2" color="text.secondary">
              Live changes, detections, and escalations as they happen
            </Typography>
          </Box>
          <PulseDot color={statusTone[live.activeEvent.tone].color === "error" ? "#ea5455" : "#28c76f"} />
        </Stack>
        <Stack spacing={2.2} sx={{ mt: 2.5 }}>
          {liveEvents.map((event) => {
            const tone = statusTone[event.tone];

            return (
              <Stack key={`${event.time}-${event.title}`} direction="row" spacing={1.75}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    mt: 0.7,
                    borderRadius: "50%",
                    bgcolor: `${tone.color}.main`
                  }}
                />
                <Box>
                  <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap" }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>
                      {event.time}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>
                      {event.module}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ mt: 0.25, fontWeight: 800 }}>
                    {event.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {event.detail}
                  </Typography>
                </Box>
              </Stack>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
}

function TopBar() {
  return (
    <Toolbar
      sx={{
        minHeight: "72px !important",
        px: { xs: 2, md: 3 },
        width: "100%",
        maxWidth: "100%",
        gap: 1,
        overflow: "hidden",
        bgcolor: "background.paper",
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        boxShadow: "0 4px 18px rgba(47, 43, 61, 0.08)"
      }}
    >
      <IconButton sx={{ display: { lg: "none" }, mr: 1 }} aria-label="Open navigation">
        <Menu size={20} />
      </IconButton>
      <Stack direction="row" spacing={1.25} sx={{ flexGrow: 1, minWidth: 0, alignItems: "center", overflow: "hidden" }}>
        <Search size={19} style={{ flexShrink: 0 }} />
        <Typography variant="body2" color="text.secondary" noWrap sx={{ display: { xs: "none", sm: "block" } }}>
          Search brands, competitors, approvals, reviews, and growth areas
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ flexShrink: 0, alignItems: "center" }}>
        <RealtimeTopStatus />
        <Tooltip title="Notifications">
          <IconButton aria-label="Notifications">
            <Badge color="error" variant="dot">
              <Bell size={19} />
            </Badge>
          </IconButton>
        </Tooltip>
        <AvatarGroup max={3} sx={{ display: { xs: "none", md: "flex" }, mr: 0.5 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main", fontSize: 13 }}>RK</Avatar>
          <Avatar sx={{ width: 32, height: 32, bgcolor: "success.main", fontSize: 13 }}>SEO</Avatar>
          <Avatar sx={{ width: 32, height: 32, bgcolor: "warning.main", fontSize: 13 }}>CX</Avatar>
        </AvatarGroup>
        <Button variant="contained" startIcon={<Sparkles size={17} />} sx={{ display: { xs: "none", sm: "inline-flex" } }}>
          Run scan
        </Button>
        <Button variant="outlined" startIcon={<CheckCircle2 size={17} />} sx={{ display: { xs: "none", sm: "inline-flex" } }}>
          Approvals
        </Button>
      </Stack>
    </Toolbar>
  );
}

function RadarShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={radarTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <Sidebar />
        <Box sx={{ ml: { lg: `${drawerWidth}px` }, p: { xs: 2, md: 3 }, minWidth: 0, overflowX: "hidden" }}>
          <TopBar />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

const workspaceConfigs = {
  search: {
    moduleId: "search",
    title: "Search Workspace",
    subtitle: "Improve how people find the brand on Google and other search surfaces.",
    primaryAction: "Create search task",
    focus: ["Priority pages", "Ranking blockers", "Content gaps"]
  },
  "ai-visibility": {
    moduleId: "ai",
    title: "AI Visibility Workspace",
    subtitle: "Track whether AI tools mention the brand correctly and what sources they trust.",
    primaryAction: "Track prompt",
    focus: ["AI answers", "Competitor mentions", "Source accuracy"]
  },
  reputation: {
    moduleId: "reputation",
    title: "Reputation Workspace",
    subtitle: "Protect trust by watching public conversations, risks, and sensitive mentions.",
    primaryAction: "Open risk review",
    focus: ["Sensitive mentions", "Trust risks", "Response status"]
  },
  reviews: {
    moduleId: "reviews",
    title: "Review Workspace",
    subtitle: "Manage reviews, reply drafts, escalations, and customer feedback patterns.",
    primaryAction: "Draft replies",
    focus: ["New reviews", "Reply drafts", "Escalations"]
  },
  local: {
    moduleId: "local",
    title: "Local Presence Workspace",
    subtitle: "Keep locations, services, hours, and customer actions accurate everywhere.",
    primaryAction: "Check locations",
    focus: ["Locations", "Business details", "Local actions"]
  },
  social: {
    moduleId: "social",
    title: "Social Workspace",
    subtitle: "See which social conversations, posts, and audiences need attention.",
    primaryAction: "Plan posts",
    focus: ["Conversations", "Content ideas", "Audience response"]
  },
  influencers: {
    moduleId: "influencer",
    title: "Influencer Workspace",
    subtitle: "Find creators that fit the brand and avoid unsafe partnerships.",
    primaryAction: "Find creators",
    focus: ["Creator fit", "Brand safety", "Campaign pipeline"]
  },
  trends: {
    moduleId: "trend",
    title: "Trend Workspace",
    subtitle: "Spot topics early and decide when the brand should join the conversation.",
    primaryAction: "Review trends",
    focus: ["Rising topics", "Timing", "Content opportunities"]
  },
  authority: {
    moduleId: "authority",
    title: "Authority Workspace",
    subtitle: "Build trust through mentions, media, links, partners, and expert signals.",
    primaryAction: "Find opportunities",
    focus: ["Trusted mentions", "Partner links", "Media signals"]
  },
  competitors: {
    moduleId: "competitor",
    title: "Competitor Workspace",
    subtitle: "Understand where competitors are winning attention and how to respond.",
    primaryAction: "Compare competitors",
    focus: ["Visibility gaps", "AI mentions", "Review comparison"]
  },
  funnel: {
    moduleId: "funnel",
    title: "Funnel Workspace",
    subtitle: "Connect visibility work to leads, sales opportunities, and likely business impact.",
    primaryAction: "Plan buyer pages",
    focus: ["Buyer gaps", "Lead intent", "Sales opportunity"]
  }
} as const;

export type WorkspaceId = keyof typeof workspaceConfigs;

function WorkspaceInsights({ module }: { module: RadarModule }) {
  const tone = statusTone[module.status];
  const priority = priorityTone[module.priority];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "repeat(3, minmax(0, 1fr))" },
        gap: 3
      }}
    >
      <MetricCard
        title="Health Score"
        value={`${module.score}`}
        change={module.change}
        icon={<Gauge size={24} />}
        color={module.accent}
      />
      <MetricCard
        title="Checks Completed"
        value={module.signalCount.toLocaleString()}
        change="Fresh scan data"
        icon={<CheckCircle2 size={24} />}
        color="#28c76f"
      />
      <Card>
        <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}>
            <Chip label={tone.label} color={tone.color} size="small" variant="outlined" />
            <Chip label={priority.label} color={priority.color} size="small" />
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700 }}>
            Suggested next step
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, fontWeight: 900, overflowWrap: "anywhere" }}>
            {module.nextStep}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

function WorkspaceActionTable({ module }: { module: RadarModule }) {
  const rows = [
    {
      item: module.nextStep,
      owner: module.owner,
      status: "Needs review",
      impact: module.priority
    },
    {
      item: `Update ${module.name.toLowerCase()} report for leadership`,
      owner: "Strategy",
      status: "Drafted",
      impact: "Medium"
    },
    {
      item: `Add evidence to the next ${module.shortName.toLowerCase()} recommendation`,
      owner: "Analyst",
      status: "In progress",
      impact: "Low"
    }
  ];

  return (
    <Card>
      <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{ p: 3, alignItems: { xs: "stretch", sm: "center" }, justifyContent: "space-between" }}
        >
          <Box>
            <Typography variant="h6">Action Queue</Typography>
            <Typography variant="body2" color="text.secondary">
              Tasks, owners, and next steps for this workspace.
            </Typography>
          </Box>
          <Button variant="outlined" size="small" endIcon={<ChevronRight size={16} />}>
            View all
          </Button>
        </Stack>
        <Divider />
        <Box sx={{ display: { xs: "block", md: "none" }, p: 2 }}>
          <Stack spacing={1.25}>
            {rows.map((row) => (
              <Paper key={row.item} variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 900 }}>
                  {row.item}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap", gap: 1 }}>
                  <Chip label={row.owner} size="small" variant="outlined" />
                  <Chip label={row.status} size="small" variant="outlined" />
                  <Chip
                    label={row.impact}
                    size="small"
                    color={row.impact === "High" ? "error" : row.impact === "Medium" ? "warning" : "success"}
                  />
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Box>
        <TableContainer sx={{ display: { xs: "none", md: "block" } }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Impact</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.item} hover>
                  <TableCell sx={{ minWidth: 280 }}>
                    <Typography variant="body2" sx={{ fontWeight: 800 }}>
                      {row.item}
                    </Typography>
                  </TableCell>
                  <TableCell>{row.owner}</TableCell>
                  <TableCell>
                    <Chip label={row.status} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.impact}
                      size="small"
                      color={row.impact === "High" ? "error" : row.impact === "Medium" ? "warning" : "success"}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

export function RadarWorkspace({ workspaceId }: { workspaceId: WorkspaceId }) {
  const config = workspaceConfigs[workspaceId];
  const module = moduleById[config.moduleId];
  const Icon = iconMap[module.id as keyof typeof iconMap];

  return (
    <RadarShell>
      <Box sx={{ mt: 3 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ mb: 3, alignItems: { xs: "stretch", md: "center" }, justifyContent: "space-between" }}
        >
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: { xs: "flex-start", sm: "center" }, minWidth: 0 }}>
            <Box
              sx={{
                width: 52,
                height: 52,
                display: "grid",
                placeItems: "center",
                borderRadius: 2,
                color: module.accent,
                bgcolor: alpha(module.accent, 0.12),
                flexShrink: 0
              }}
            >
              <Icon size={24} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="h4" sx={{ fontSize: { xs: "1.75rem", md: "2.125rem" }, overflowWrap: "anywhere" }}>
                {config.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
                {config.subtitle}
              </Typography>
            </Box>
          </Stack>
          <Button variant="contained" startIcon={<Sparkles size={17} />} sx={{ width: { xs: "100%", md: "auto" } }}>
            {config.primaryAction}
          </Button>
        </Stack>

        <Box sx={{ mb: 3, display: "flex", flexWrap: "wrap", gap: 1 }}>
          {config.focus.map((item) => (
            <Chip key={item} label={item} color="primary" variant="outlined" />
          ))}
        </Box>

        <WorkspaceInsights module={module} />

        <Box
          sx={{
            mt: 3,
            display: "grid",
            gridTemplateColumns: { xs: "minmax(0, 1fr)", xl: "minmax(0, 1.15fr) minmax(340px, 0.85fr)" },
            gap: 3
          }}
        >
          <WorkspaceActionTable module={module} />
          <Stack spacing={3}>
            <ModuleCard module={module} />
            <WorkLedger />
          </Stack>
        </Box>
      </Box>
    </RadarShell>
  );
}

type ApprovalStatus = "Found" | "Drafted" | "Needs Approval" | "Approved" | "Published";

type ApprovalWorkflowItem = {
  id: string;
  status: ApprovalStatus;
  title: string;
  module: string;
  channel: string;
  risk: "High" | "Medium" | "Low";
  owner: string;
  due: string;
  impact: string;
  summary: string;
  aiDraft: string;
  evidence: string[];
  change: string;
  clientDecision: string;
  nextStep: string;
  timeline: Array<{ time: string; label: string; detail: string }>;
};

const approvalWorkflowItems: ApprovalWorkflowItem[] = [
  {
    id: "sensitive-review",
    status: "Needs Approval",
    title: "Sensitive review response",
    module: "Reputation",
    channel: "Google reviews",
    risk: "High",
    owner: "Comms",
    due: "2 hours",
    impact: "Protects trust before the concern spreads.",
    summary:
      "A low-rating review mentions safety, refund, and delivery concerns. The system drafted a calm response, but it should not publish without a human check.",
    aiDraft:
      "Acknowledge the customer concern, move the refund conversation to a private support channel, and ask the operations lead to verify the delivery record before any public promise.",
    evidence: [
      "Same concern appeared in two regions during the last 36 hours.",
      "Review includes refund language, which makes the reply higher risk.",
      "No matching support ticket has been linked yet."
    ],
    change: "Draft reply is ready, but publishing is locked until Comms approves it.",
    clientDecision: "Approve reply, request edits, or assign to support leadership.",
    nextStep: "Comms should review the exact wording before the customer response goes live.",
    timeline: [
      { time: "09:18", label: "Risk found", detail: "Review matched sensitive language rules." },
      { time: "09:22", label: "AI drafted", detail: "Reply created with refund-safe wording." },
      { time: "09:27", label: "Waiting", detail: "Human approval required before publishing." }
    ]
  },
  {
    id: "search-page-details",
    status: "Needs Approval",
    title: "Search-friendly page details",
    module: "Search",
    channel: "Website pages",
    risk: "Low",
    owner: "SEO Lead",
    due: "Today",
    impact: "Makes important pages easier for Google and AI tools to understand.",
    summary:
      "Important service pages are missing clear business details. The system prepared structured page improvements for the highest-value pages first.",
    aiDraft:
      "Add plain service descriptions, location coverage, FAQ answers, and business details to the pages that already attract qualified visitors.",
    evidence: [
      "Three priority pages are getting impressions but weak clicks.",
      "AI answers are citing competitors with clearer service explanations.",
      "Business details can be added without changing the visual design."
    ],
    change: "Page details are drafted and ready for SEO approval.",
    clientDecision: "Approve the update or request wording changes from the content owner.",
    nextStep: "Approve the safe page details, then schedule the next scan.",
    timeline: [
      { time: "08:52", label: "Ranking movement", detail: "A priority page moved from position 11 to 7." },
      { time: "09:04", label: "Gap detected", detail: "Missing business details were found on buyer pages." },
      { time: "09:16", label: "Draft ready", detail: "Page updates prepared for review." }
    ]
  },
  {
    id: "positive-review-replies",
    status: "Drafted",
    title: "Positive review replies",
    module: "Reviews",
    channel: "Google Business Profile",
    risk: "Low",
    owner: "CX Lead",
    due: "Today",
    impact: "Improves response rate without creating brand risk.",
    summary:
      "Several positive reviews can receive safe thank-you replies. These are low-risk drafts, but the client can still review tone before publishing.",
    aiDraft:
      "Thank each customer by theme, mention the relevant location or service, and invite them back without adding promotional claims.",
    evidence: [
      "Six positive reviews arrived since the last scan.",
      "No sensitive words or complaints were found.",
      "Replies follow the brand tone rules already approved."
    ],
    change: "Replies are drafted and grouped for one-click approval.",
    clientDecision: "Approve all safe replies or open the drafts for tone edits.",
    nextStep: "CX can approve the reply batch today.",
    timeline: [
      { time: "10:08", label: "Reviews found", detail: "Positive reviews grouped by location." },
      { time: "10:12", label: "Drafted", detail: "Safe replies created using brand tone rules." },
      { time: "10:14", label: "Queued", detail: "Batch is ready for CX review." }
    ]
  },
  {
    id: "ai-competitor-mention",
    status: "Found",
    title: "Competitor gained an AI mention",
    module: "AI Visibility",
    channel: "AI answers",
    risk: "Medium",
    owner: "GEO",
    due: "Tomorrow",
    impact: "Protects the brand when buyers ask AI tools who to choose.",
    summary:
      "A competitor appeared in buyer comparison answers where the brand was missing. The system found the source pattern behind the answer.",
    aiDraft:
      "Create a buyer comparison page and add clearer proof points to existing service pages so AI tools have trustworthy references to cite.",
    evidence: [
      "The competitor was mentioned in 5 of 12 tracked buyer questions.",
      "AI answers cited comparison content and review summaries.",
      "The brand has proof points, but they are scattered across pages."
    ],
    change: "Recommendation is ready, but content has not been drafted yet.",
    clientDecision: "Approve a content brief or assign strategy review.",
    nextStep: "GEO team should approve the comparison-page brief.",
    timeline: [
      { time: "09:40", label: "AI scan complete", detail: "Tracked buyer questions were checked." },
      { time: "09:45", label: "Gap found", detail: "Competitor appeared more often in choice questions." },
      { time: "09:51", label: "Recommendation", detail: "Comparison-page opportunity added to the queue." }
    ]
  },
  {
    id: "creator-shortlist",
    status: "Drafted",
    title: "Influencer shortlist",
    module: "Influencers",
    channel: "Creator campaigns",
    risk: "Medium",
    owner: "Partnerships",
    due: "Tomorrow",
    impact: "Turns a rising topic into a safer creator campaign.",
    summary:
      "The system found creators who match the audience for a rising topic, then filtered out accounts with brand-safety concerns.",
    aiDraft:
      "Shortlist eight creators, prioritize three with strong audience fit, and ask Partnerships to review past posts before outreach.",
    evidence: [
      "Topic momentum is up 15.4% in the current scan.",
      "Short-form video audiences match the campaign goal.",
      "Two creators were removed because recent posts conflicted with brand rules."
    ],
    change: "Creator shortlist is drafted, with brand-safety notes attached.",
    clientDecision: "Approve outreach shortlist or request a stricter brand-safety filter.",
    nextStep: "Partnerships should review the top three creators.",
    timeline: [
      { time: "08:27", label: "Trend found", detail: "Rising topic crossed campaign threshold." },
      { time: "08:44", label: "Creators matched", detail: "Audience fit and safety checks completed." },
      { time: "09:05", label: "Draft ready", detail: "Shortlist sent for partnership review." }
    ]
  },
  {
    id: "local-service-details",
    status: "Published",
    title: "Local service details updated",
    module: "Local Presence",
    channel: "Google Business Profile",
    risk: "Low",
    owner: "Local",
    due: "Done",
    impact: "Helps nearby customers find accurate services and contact details.",
    summary:
      "Approved service details were published to priority locations. The system will rescan listings and report any mismatches.",
    aiDraft:
      "Published service names, location coverage, and customer action details exactly as approved by the Local team.",
    evidence: [
      "Priority locations were missing service details.",
      "Published details match the approved source of truth.",
      "Next scan is scheduled to confirm listing consistency."
    ],
    change: "Approved updates are live.",
    clientDecision: "No action needed unless the next scan finds mismatches.",
    nextStep: "Watch the next local scan for listing consistency.",
    timeline: [
      { time: "Yesterday", label: "Approved", detail: "Local team approved the listing update." },
      { time: "08:10", label: "Published", detail: "Service details sent to priority locations." },
      { time: "08:18", label: "Monitoring", detail: "Next scan scheduled to confirm live listings." }
    ]
  }
];

const approvalStatusTone: Record<ApprovalStatus, { color: string; text: string }> = {
  Found: { color: "#00bad1", text: "New finding" },
  Drafted: { color: "#7367f0", text: "AI drafted" },
  "Needs Approval": { color: "#ff9f43", text: "Needs approval" },
  Approved: { color: "#28c76f", text: "Approved" },
  Published: { color: "#28c76f", text: "Published" }
};

const approvalFilters: Array<"All" | ApprovalStatus> = ["All", "Found", "Drafted", "Needs Approval", "Published"];

const riskChipColor: Record<ApprovalWorkflowItem["risk"], "success" | "warning" | "error"> = {
  High: "error",
  Medium: "warning",
  Low: "success"
};

function ApprovalSummaryStrip() {
  const summary = [
    { label: "Needs approval", value: approvalWorkflowItems.filter((item) => item.status === "Needs Approval").length, color: "#ff9f43" },
    { label: "AI drafts", value: approvalWorkflowItems.filter((item) => item.status === "Drafted").length, color: "#7367f0" },
    { label: "New findings", value: approvalWorkflowItems.filter((item) => item.status === "Found").length, color: "#00bad1" },
    { label: "Published", value: approvalWorkflowItems.filter((item) => item.status === "Published").length, color: "#28c76f" }
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" },
        gap: 2,
        mb: 3
      }}
    >
      {summary.map((item) => (
        <Card key={item.label}>
          <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
            <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", gap: 1.5 }}>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>
                  {item.label}
                </Typography>
                <Typography variant="h4" sx={{ mt: 0.75 }}>
                  {item.value}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: 2,
                  color: item.color,
                  bgcolor: alpha(item.color, 0.12),
                  flexShrink: 0
                }}
              >
                <FileCheck2 size={20} />
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

function ApprovalFilterBar({
  activeFilter,
  onChange
}: {
  activeFilter: "All" | ApprovalStatus;
  onChange: (filter: "All" | ApprovalStatus) => void;
}) {
  return (
    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
      {approvalFilters.map((filter) => {
        const selected = activeFilter === filter;
        const count = filter === "All" ? approvalWorkflowItems.length : approvalWorkflowItems.filter((item) => item.status === filter).length;

        return (
          <Button
            key={filter}
            size="small"
            variant={selected ? "contained" : "outlined"}
            onClick={() => onChange(filter)}
            sx={{ minWidth: 0 }}
          >
            {filter} {count}
          </Button>
        );
      })}
    </Stack>
  );
}

function ApprovalInboxList({
  items,
  selectedId,
  onSelect
}: {
  items: ApprovalWorkflowItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <Card>
      <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{ p: 3, alignItems: { xs: "stretch", sm: "center" }, justifyContent: "space-between" }}
        >
          <Box>
            <Typography variant="h6">Review Inbox</Typography>
            <Typography variant="body2" color="text.secondary">
              Every item shows the finding, draft, owner, risk, and next decision.
            </Typography>
          </Box>
          <Chip label={`${items.length} visible`} color="primary" variant="outlined" />
        </Stack>
        <Divider />
        <Stack spacing={0} sx={{ maxHeight: { lg: 720 }, overflowY: "auto" }}>
          {items.map((item) => {
            const selected = selectedId === item.id;
            const statusTone = approvalStatusTone[item.status];

            return (
              <Box
                key={item.id}
                component="button"
                type="button"
                onClick={() => onSelect(item.id)}
                sx={{
                  width: "100%",
                  p: 0,
                  border: 0,
                  borderBottom: 1,
                  borderColor: "divider",
                  bgcolor: selected ? alpha(statusTone.color, 0.08) : "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                  "&:hover": { bgcolor: alpha(statusTone.color, 0.06) }
                }}
              >
                <Box sx={{ p: 2.25 }}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ justifyContent: "space-between" }}>
                    <Stack direction="row" spacing={1.5} sx={{ minWidth: 0 }}>
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          display: "grid",
                          placeItems: "center",
                          borderRadius: 2,
                          color: statusTone.color,
                          bgcolor: alpha(statusTone.color, 0.12),
                          flexShrink: 0
                        }}
                      >
                        {item.status === "Found" ? <AlertTriangle size={20} /> : <FileCheck2 size={20} />}
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 900, overflowWrap: "anywhere" }}>
                          {item.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.35 }}>
                          {item.module} - {item.channel}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1, alignItems: "flex-start" }}>
                      <Chip label={statusTone.text} size="small" variant="outlined" sx={{ borderColor: statusTone.color, color: statusTone.color }} />
                      <Chip label={`${item.risk} risk`} size="small" color={riskChipColor[item.risk]} />
                    </Stack>
                  </Stack>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5, overflowWrap: "anywhere" }}>
                    {item.summary}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: "wrap", gap: 1 }}>
                    <Chip label={`Owner: ${item.owner}`} size="small" variant="outlined" />
                    <Chip label={`Due: ${item.due}`} size="small" variant="outlined" />
                    <Chip label={item.impact} size="small" variant="outlined" />
                  </Stack>
                </Box>
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
}

function ApprovalDetailPanel({ item }: { item: ApprovalWorkflowItem }) {
  const statusTone = approvalStatusTone[item.status];

  return (
    <Stack spacing={3}>
      <Card>
        <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}>
            <Chip label={statusTone.text} size="small" sx={{ color: statusTone.color, borderColor: statusTone.color }} variant="outlined" />
            <Chip label={`${item.risk} risk`} size="small" color={riskChipColor[item.risk]} />
            <Chip label={item.module} size="small" variant="outlined" />
          </Stack>

          <Typography variant="h5" sx={{ overflowWrap: "anywhere" }}>
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {item.summary}
          </Typography>

          <Box
            sx={{
              mt: 2.5,
              display: "grid",
              gridTemplateColumns: { xs: "minmax(0, 1fr)", sm: "repeat(2, minmax(0, 1fr))" },
              gap: 1.5
            }}
          >
            {[
              ["Owner", item.owner],
              ["Due", item.due],
              ["Channel", item.channel],
              ["Impact", item.impact]
            ].map(([label, value]) => (
              <Paper key={label} variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>
                  {label}
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.25, fontWeight: 800, overflowWrap: "anywhere" }}>
                  {value}
                </Typography>
              </Paper>
            ))}
          </Box>

          <Paper
            variant="outlined"
            sx={{
              mt: 2.5,
              p: 2,
              borderRadius: 2,
              bgcolor: alpha(statusTone.color, 0.05),
              borderColor: alpha(statusTone.color, 0.2)
            }}
          >
            <Typography variant="subtitle2">AI recommendation</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
              {item.aiDraft}
            </Typography>
          </Paper>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25} sx={{ mt: 2.5 }}>
            <Button variant="contained" startIcon={<CheckCircle2 size={17} />}>
              Approve
            </Button>
            <Button variant="outlined" startIcon={<MessageSquareReply size={17} />}>
              Request edits
            </Button>
            <Button variant="outlined" startIcon={<Users size={17} />}>
              Assign owner
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
          <Typography variant="h6">Evidence</Typography>
          <Stack spacing={1.25} sx={{ mt: 2 }}>
            {item.evidence.map((point) => (
              <Stack key={point} direction="row" spacing={1.25} sx={{ alignItems: "flex-start" }}>
                <CheckCircle2 size={17} color="#28c76f" style={{ marginTop: 2, flexShrink: 0 }} />
                <Typography variant="body2" color="text.secondary">
                  {point}
                </Typography>
              </Stack>
            ))}
          </Stack>
          <Divider sx={{ my: 2.5 }} />
          <Typography variant="subtitle2">What changed</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
            {item.change}
          </Typography>
          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            What the client decides
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
            {item.clientDecision}
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}

function ApprovalActivityTrail({ item }: { item: ApprovalWorkflowItem }) {
  return (
    <Card>
      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Box>
            <Typography variant="h6">Activity Trail</Typography>
            <Typography variant="body2" color="text.secondary">
              Plain-language audit history for the selected item.
            </Typography>
          </Box>
          <Chip label={item.nextStep} size="small" color="primary" variant="outlined" sx={{ display: { xs: "none", md: "inline-flex" } }} />
        </Stack>
        <Stack spacing={2}>
          {item.timeline.map((event, index) => (
            <Stack key={`${event.time}-${event.label}`} direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: "50%",
                  color: index === item.timeline.length - 1 ? "primary.main" : "success.main",
                  bgcolor: alpha(index === item.timeline.length - 1 ? "#7367f0" : "#28c76f", 0.12),
                  flexShrink: 0
                }}
              >
                <Activity size={15} />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="body2" sx={{ fontWeight: 900 }}>
                  {event.label}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                  {event.time} - {event.detail}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

function ApprovalWorkflow() {
  const [activeFilter, setActiveFilter] = useState<"All" | ApprovalStatus>("All");
  const [selectedId, setSelectedId] = useState(approvalWorkflowItems[0].id);

  const filteredItems = useMemo(
    () =>
      activeFilter === "All"
        ? approvalWorkflowItems
        : approvalWorkflowItems.filter((item) => item.status === activeFilter),
    [activeFilter]
  );
  const selectedItem =
    filteredItems.find((item) => item.id === selectedId) ?? filteredItems[0] ?? approvalWorkflowItems[0];

  return (
    <Stack spacing={3}>
      <ApprovalSummaryStrip />
      <Card>
        <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={2}
            sx={{ alignItems: { xs: "stretch", lg: "center" }, justifyContent: "space-between" }}
          >
            <Box>
              <Typography variant="h6">Client Visibility Layer</Typography>
              <Typography variant="body2" color="text.secondary">
                A live view of what was found, what AI drafted, and what still needs a human decision.
              </Typography>
            </Box>
            <ApprovalFilterBar activeFilter={activeFilter} onChange={setActiveFilter} />
          </Stack>
        </CardContent>
      </Card>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "minmax(0, 1fr)", lg: "minmax(0, 0.95fr) minmax(420px, 0.75fr)" },
          gap: 3,
          alignItems: "start"
        }}
      >
        <ApprovalInboxList items={filteredItems} selectedId={selectedItem.id} onSelect={setSelectedId} />
        <ApprovalDetailPanel item={selectedItem} />
      </Box>

      <ApprovalActivityTrail item={selectedItem} />
    </Stack>
  );
}

export function RadarApprovalsPage() {
  return (
    <RadarShell>
      <Box sx={{ mt: 3 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ mb: 3, alignItems: { xs: "stretch", md: "center" }, justifyContent: "space-between" }}
        >
          <Box>
            <Typography variant="h4">Approval Inbox</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
              See what the system found, what AI prepared, and what needs a human decision before anything goes live.
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<CheckCircle2 size={17} />}>
            Review waiting items
          </Button>
        </Stack>
        <ApprovalWorkflow />
      </Box>
    </RadarShell>
  );
}

const utilityPages = {
  activity: {
    title: "Activity",
    subtitle: "A timeline of scans, recommendations, approvals, and published changes.",
    icon: Activity
  },
  reports: {
    title: "Reports",
    subtitle: "Executive summaries, scheduled reports, and shareable client updates.",
    icon: BarChart3
  },
  calendar: {
    title: "Calendar",
    subtitle: "Content, review replies, reports, scans, and campaign deadlines in one place.",
    icon: CalendarDays
  },
  settings: {
    title: "Settings",
    subtitle: "Manage brand rules, integrations, notifications, users, and approval policies.",
    icon: Compass
  }
} as const;

export type UtilityPageId = keyof typeof utilityPages;

export function RadarUtilityPage({ pageId }: { pageId: UtilityPageId }) {
  const page = utilityPages[pageId];
  const Icon = page.icon;

  return (
    <RadarShell>
      <Box sx={{ mt: 3 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center", mb: 3 }}>
          <Box
            sx={{
              width: 52,
              height: 52,
              display: "grid",
              placeItems: "center",
              borderRadius: 2,
              color: "primary.main",
              bgcolor: alpha("#7367f0", 0.12)
            }}
          >
            <Icon size={24} />
          </Box>
          <Box>
            <Typography variant="h4">{page.title}</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
              {page.subtitle}
            </Typography>
          </Box>
        </Stack>
        <Card>
          <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
            <Typography variant="h6">Workspace foundation</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              This route is now part of the product shell. The next pass can turn it into a full Vuexy-style
              workspace with tables, drawers, filters, and saved views.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </RadarShell>
  );
}

export function RadarDashboard() {
  const executiveScore = radarModules[0]?.score ?? 0;
  const activeRisks = radarModules.filter((module) => module.status === "risk").length;
  const watchItems = radarModules.filter((module) => module.status === "watch").length;
  const growthItems = radarModules.filter((module) => module.status === "growth").length;

  return (
    <RadarShell>
          <Box sx={{ mt: 3 }}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              sx={{ mb: 3, alignItems: { xs: "stretch", md: "center" }, justifyContent: "space-between" }}
            >
              <Box>
                <Typography variant="h4">Command Center</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
                  One place to see how the brand is found, trusted, discussed, and chosen.
                </Typography>
              </Box>
              <Chip color="success" label="Live signal scan" />
            </Stack>

            <CommandBrief />
            <Box sx={{ mt: 3 }}>
              <LiveSignalStrip />
            </Box>

            <Box
              sx={{
                mt: 3,
                display: "grid",
                gridTemplateColumns: {
                  xs: "minmax(0, 1fr)",
                  sm: "repeat(2, minmax(0, 1fr))",
                  xl: "repeat(4, minmax(0, 1fr))"
                },
                gap: 3
              }}
            >
              <MetricCard
                title="Overall Visibility"
                value={`${executiveScore}`}
                change="+8.4% this cycle"
                icon={<Gauge size={24} />}
                color="#7367f0"
              />
              <MetricCard
                title="Growth Centers"
                value={`${growthItems}`}
                change="Momentum is building"
                icon={<TrendingUp size={24} />}
                color="#28c76f"
              />
              <MetricCard
                title="Watch Centers"
                value={`${watchItems}`}
                change="Needs monitoring"
                icon={<Activity size={24} />}
                color="#ff9f43"
              />
              <MetricCard
                title="Active Risks"
                value={`${activeRisks}`}
                change="Escalation open"
                icon={<AlertTriangle size={24} />}
                color="#ea5455"
              />
            </Box>

            <Box
              sx={{
                mt: 3,
                display: "block"
              }}
            >
              <Card>
                <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
                  <Stack direction="row" sx={{ mb: 2.5, alignItems: "center", justifyContent: "space-between" }}>
                    <Box>
                      <Typography variant="h6">Growth Areas</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Each area shows what is working, what needs attention, and what to do next.
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                      {quickFilters.map((filter, index) => (
                        <Chip
                          key={filter}
                          label={filter}
                          color={index === 0 ? "primary" : "default"}
                          variant={index === 0 ? "filled" : "outlined"}
                          size="small"
                        />
                      ))}
                    </Stack>
                  </Stack>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "minmax(0, 1fr)",
                        md: "repeat(2, minmax(0, 1fr))",
                        lg: "repeat(3, minmax(0, 1fr))"
                      },
                      gap: 2
                    }}
                  >
                    {radarModules.map((module) => (
                      <ModuleCard key={module.id} module={module} />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>

            <Box
              sx={{
                mt: 3,
                display: "grid",
                gridTemplateColumns: { xs: "minmax(0, 1fr)", xl: "minmax(0, 1.2fr) minmax(340px, 0.8fr)" },
                gap: 3
              }}
            >
              <ActionsTable />
              <Stack spacing={3}>
                <ApprovalQueue />
                <WorkLedger />
                <SignalBalance />
              </Stack>
            </Box>
          </Box>
    </RadarShell>
  );
}
