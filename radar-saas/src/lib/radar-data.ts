export type RadarStatus = "clear" | "watch" | "risk" | "growth";

export type RadarModule = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  score: number;
  status: RadarStatus;
  signalCount: number;
  change: string;
  accent: string;
  owner: string;
  kpis: string[];
};

export type RadarAction = {
  title: string;
  module: string;
  impact: "High" | "Medium" | "Low";
  risk: "High" | "Medium" | "Low";
  automation: "Auto" | "Draft" | "Approval" | "Human";
  evidence: string;
};

export type RadarEvent = {
  time: string;
  title: string;
  detail: string;
  module: string;
  tone: RadarStatus;
};

export type ApprovalItem = {
  title: string;
  module: string;
  risk: "High" | "Medium" | "Low";
  owner: string;
  eta: string;
};

export const radarModules: RadarModule[] = [
  {
    id: "executive",
    name: "Executive Command",
    shortName: "Executive",
    description: "Board-level command view for risk, growth, proof, and pending decisions.",
    score: 91,
    status: "growth",
    signalCount: 421,
    change: "+8.4%",
    accent: "#3973d8",
    owner: "Leadership",
    kpis: ["Visibility index", "Risk index", "Growth opportunity"]
  },
  {
    id: "search",
    name: "Search",
    shortName: "Search",
    description: "SEO, Google positioning, SERP features, backlinks, and technical health.",
    score: 84,
    status: "growth",
    signalCount: 1842,
    change: "+12.7%",
    accent: "#20a66a",
    owner: "SEO",
    kpis: ["Organic visibility", "Indexation", "Share of search"]
  },
  {
    id: "ai",
    name: "AI Visibility",
    shortName: "AI",
    description: "ChatGPT, Google AI, Gemini, Perplexity, citations, and answer accuracy.",
    score: 72,
    status: "watch",
    signalCount: 316,
    change: "+4.1%",
    accent: "#7b5cc4",
    owner: "GEO",
    kpis: ["AI mentions", "Citation rate", "Answer accuracy"]
  },
  {
    id: "reputation",
    name: "Reputation",
    shortName: "Reputation",
    description: "ORM, public sentiment, crisis signals, negative results, and misinformation.",
    score: 68,
    status: "risk",
    signalCount: 92,
    change: "-3.2%",
    accent: "#c94b4b",
    owner: "Comms",
    kpis: ["Sentiment", "Risk velocity", "Resolution time"]
  },
  {
    id: "reviews",
    name: "Reviews",
    shortName: "Reviews",
    description: "Real-time reviews, auto-reply drafts, escalation, and rating intelligence.",
    score: 79,
    status: "watch",
    signalCount: 554,
    change: "+2.9%",
    accent: "#d7921e",
    owner: "CX",
    kpis: ["Rating", "Response rate", "Review velocity"]
  },
  {
    id: "local",
    name: "Local Presence",
    shortName: "Local",
    description: "Google Business Profile, map pack visibility, NAP, and locations.",
    score: 88,
    status: "growth",
    signalCount: 231,
    change: "+9.6%",
    accent: "#16858c",
    owner: "Local",
    kpis: ["Map pack", "GBP health", "Local actions"]
  },
  {
    id: "social",
    name: "Social",
    shortName: "Social",
    description: "Social listening, engagement, SMM workflows, comments, and share of voice.",
    score: 76,
    status: "watch",
    signalCount: 1290,
    change: "+6.8%",
    accent: "#3973d8",
    owner: "Social",
    kpis: ["Engagement", "Share of voice", "Response time"]
  },
  {
    id: "influencer",
    name: "Influencers",
    shortName: "Influencer",
    description: "Creator discovery, audience fit, brand safety, UGC, and campaign prediction.",
    score: 63,
    status: "watch",
    signalCount: 148,
    change: "+1.2%",
    accent: "#7b5cc4",
    owner: "Partnerships",
    kpis: ["Creator fit", "Brand safety", "Predicted ROI"]
  },
  {
    id: "trend",
    name: "Trends",
    shortName: "Trends",
    description: "Trend detection, virality prediction, content opportunities, and timing.",
    score: 81,
    status: "growth",
    signalCount: 388,
    change: "+15.4%",
    accent: "#20a66a",
    owner: "Growth",
    kpis: ["Momentum", "Virality probability", "Opportunity score"]
  },
  {
    id: "authority",
    name: "Authority",
    shortName: "Authority",
    description: "Backlinks, PR, entity trust, media mentions, and knowledge graph readiness.",
    score: 70,
    status: "watch",
    signalCount: 724,
    change: "+5.5%",
    accent: "#d7921e",
    owner: "PR",
    kpis: ["Referring domains", "Link quality", "Entity consistency"]
  },
  {
    id: "competitor",
    name: "Competitors",
    shortName: "Competitor",
    description: "Competitor visibility, campaigns, reviews, AI mentions, and backlinks.",
    score: 74,
    status: "watch",
    signalCount: 640,
    change: "+3.7%",
    accent: "#16858c",
    owner: "Strategy",
    kpis: ["Gap score", "Share of voice", "Content velocity"]
  },
  {
    id: "funnel",
    name: "Funnel Intelligence",
    shortName: "Funnel",
    description: "TOFU/MOFU/BOFU mapping, revenue prediction, lead intent, and ROI forecasts.",
    score: 86,
    status: "growth",
    signalCount: 204,
    change: "+10.2%",
    accent: "#20a66a",
    owner: "Revenue",
    kpis: ["BOFU gaps", "Lead intent", "Predicted pipeline"]
  }
];

export const nextActions: RadarAction[] = [
  {
    title: "Create BOFU comparison page for high-intent competitor query",
    module: "Funnel Intelligence",
    impact: "High",
    risk: "Low",
    automation: "Draft",
    evidence: "Competitor owns 6 of 10 purchase-intent prompts and ranks in AI answers."
  },
  {
    title: "Add Organization, Product, FAQ, and Review schema to priority pages",
    module: "Search",
    impact: "High",
    risk: "Low",
    automation: "Approval",
    evidence: "Structured data coverage is missing on 42% of commercial pages."
  },
  {
    title: "Escalate three negative reviews mentioning fulfillment delays",
    module: "Reviews",
    impact: "Medium",
    risk: "Medium",
    automation: "Draft",
    evidence: "Same issue repeated across two regions in the last 36 hours."
  },
  {
    title: "Brief creator shortlist for upcoming category trend",
    module: "Influencers",
    impact: "Medium",
    risk: "Low",
    automation: "Draft",
    evidence: "Trend momentum is up 31% and audience overlap is strongest on short video."
  }
];

export const activityEvents: RadarEvent[] = [
  {
    time: "09:40",
    title: "AI mention detected",
    detail: "Brand appeared in 4 of 12 tracked ChatGPT-style comparison prompts.",
    module: "AI Visibility",
    tone: "growth"
  },
  {
    time: "09:18",
    title: "Review risk opened",
    detail: "A low-rating review triggered escalation because it mentioned safety and refund terms.",
    module: "Reviews",
    tone: "risk"
  },
  {
    time: "08:52",
    title: "SERP movement",
    detail: "Priority service page moved from position 11 to 7 for a BOFU keyword cluster.",
    module: "Search",
    tone: "growth"
  },
  {
    time: "08:27",
    title: "Trend opportunity",
    detail: "A category topic crossed the virality threshold for LinkedIn and YouTube Shorts.",
    module: "Trends",
    tone: "watch"
  }
];

export const approvals: ApprovalItem[] = [
  {
    title: "Publish 5-star Google review reply batch",
    module: "Reviews",
    risk: "Low",
    owner: "CX Lead",
    eta: "Today"
  },
  {
    title: "Approve schema changes for enterprise pages",
    module: "Search",
    risk: "Low",
    owner: "SEO Lead",
    eta: "Today"
  },
  {
    title: "Review response to negative press mention",
    module: "Reputation",
    risk: "High",
    owner: "Comms",
    eta: "2h"
  },
  {
    title: "Approve influencer shortlist",
    module: "Influencers",
    risk: "Medium",
    owner: "Partnerships",
    eta: "Tomorrow"
  }
];

export const signalBands = [
  { label: "Search", value: 84, color: "#20a66a" },
  { label: "AI", value: 72, color: "#7b5cc4" },
  { label: "Reputation", value: 68, color: "#c94b4b" },
  { label: "Reviews", value: 79, color: "#d7921e" },
  { label: "Local", value: 88, color: "#16858c" },
  { label: "Social", value: 76, color: "#3973d8" }
];
