"use client";

import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Bot,
  Building2,
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
import type { ReactNode } from "react";
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

function Sidebar() {
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

      <Box sx={{ px: 2, py: 2 }}>
        <Typography variant="caption" sx={{ px: 1.5, fontWeight: 800, color: "text.secondary" }}>
            GROWTH AREAS
        </Typography>
        <List dense disablePadding sx={{ mt: 1 }}>
          {radarModules.map((module) => {
            const Icon = iconMap[module.id as keyof typeof iconMap];
            const selected = module.id === "executive";

            return (
              <ListItemButton
                key={module.id}
                selected={selected}
                sx={{
                  minHeight: 42,
                  borderRadius: 2,
                  mb: 0.5,
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
                    {module.shortName}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ fontWeight: 800 }}>
                  {module.score}
                </Typography>
              </ListItemButton>
            );
          })}
        </List>
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
            gridTemplateColumns: { xs: "1fr", lg: "1.05fr repeat(3, minmax(0, 1fr))" },
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
          <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
            <Box sx={{ minWidth: 0, flexGrow: 1 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>
                Suggested next step
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.25, fontWeight: 800 }}>
                {module.nextStep}
              </Typography>
            </Box>
            <ChevronRight size={18} />
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
  return (
    <Card>
      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h6">Work Ledger</Typography>
            <Typography variant="body2" color="text.secondary">
              What changed, what was detected, and what was escalated
            </Typography>
          </Box>
          <AlertTriangle size={20} />
        </Stack>
        <Stack spacing={2.2} sx={{ mt: 2.5 }}>
          {activityEvents.map((event) => {
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
      <Stack direction="row" spacing={1.25} sx={{ flexGrow: 1, minWidth: 0, alignItems: "center" }}>
        <Search size={19} />
        <Typography variant="body2" color="text.secondary" noWrap>
          Search brands, competitors, approvals, reviews, and growth areas
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1}>
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
        <Button variant="contained" startIcon={<Sparkles size={17} />}>
          Run scan
        </Button>
        <Button variant="outlined" startIcon={<CheckCircle2 size={17} />} sx={{ display: { xs: "none", sm: "inline-flex" } }}>
          Approvals
        </Button>
      </Stack>
    </Toolbar>
  );
}

export function RadarDashboard() {
  const executiveScore = radarModules[0]?.score ?? 0;
  const activeRisks = radarModules.filter((module) => module.status === "risk").length;
  const watchItems = radarModules.filter((module) => module.status === "watch").length;
  const growthItems = radarModules.filter((module) => module.status === "growth").length;

  return (
    <ThemeProvider theme={radarTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <Sidebar />
        <Box sx={{ ml: { lg: `${drawerWidth}px` }, p: { xs: 2, md: 3 } }}>
          <TopBar />

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

            <Box
              sx={{
                mt: 3,
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
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
                        xs: "1fr",
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
                gridTemplateColumns: { xs: "1fr", xl: "minmax(0, 1.2fr) minmax(340px, 0.8fr)" },
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
        </Box>
      </Box>
    </ThemeProvider>
  );
}
