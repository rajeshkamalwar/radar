export type RadarStatus = "clear" | "watch" | "risk" | "growth";

export type RadarModule = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  nextStep: string;
  priority: "High" | "Medium" | "Low";
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
    description: "A clear leadership view of what is improving, what needs attention, and what needs approval.",
    nextStep: "Review the open risk and approve the highest-impact action.",
    priority: "High",
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
    description: "Shows how easily people can find the brand on Google and what is holding rankings back.",
    nextStep: "Improve the most important service pages first.",
    priority: "High",
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
    description: "Tracks whether AI tools mention the brand correctly and whether competitors are showing up instead.",
    nextStep: "Add clearer answers to buyer questions AI tools already use.",
    priority: "High",
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
    description: "Watches what people are saying online and flags anything that could hurt trust.",
    nextStep: "Respond to the sensitive review before it spreads.",
    priority: "High",
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
    description: "Tracks customer reviews, drafts safe replies, and highlights reviews that need human care.",
    nextStep: "Approve safe replies and escalate the delivery-delay pattern.",
    priority: "Medium",
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
    description: "Helps local customers find the right locations, hours, services, and contact details.",
    nextStep: "Complete missing details for priority locations.",
    priority: "Medium",
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
    description: "Shows how the brand is performing on social channels and which conversations matter.",
    nextStep: "Turn the strongest search topic into social posts.",
    priority: "Medium",
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
    description: "Finds suitable creators and checks whether they are a safe fit for the brand.",
    nextStep: "Shortlist creators for the rising category topic.",
    priority: "Low",
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
    description: "Spots rising topics early and suggests when the brand should join the conversation.",
    nextStep: "Prepare content while the topic is still gaining speed.",
    priority: "Medium",
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
    description: "Measures whether trusted websites, media, and partners are strengthening the brand.",
    nextStep: "Recover lost mentions and build trusted references.",
    priority: "Medium",
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
    description: "Shows where competitors are winning attention and what the brand can do next.",
    nextStep: "Close the largest gap in buyer comparison searches.",
    priority: "Medium",
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
    description: "Connects visibility work to leads, sales opportunities, and likely business impact.",
    nextStep: "Create missing pages for visitors who are ready to buy.",
    priority: "High",
    score: 86,
    status: "growth",
    signalCount: 204,
    change: "+10.2%",
    accent: "#20a66a",
    owner: "Revenue",
    kpis: ["Buyer gaps", "Lead intent", "Sales opportunity"]
  }
];

export const nextActions: RadarAction[] = [
  {
    title: "Create a comparison page for buyers choosing between brands",
    module: "Funnel Intelligence",
    impact: "High",
    risk: "Low",
    automation: "Draft",
    evidence: "Competitors are appearing when buyers ask AI tools which brand to choose."
  },
  {
    title: "Make key pages easier for Google and AI tools to understand",
    module: "Search",
    impact: "High",
    risk: "Low",
    automation: "Approval",
    evidence: "Important product and service pages are missing machine-readable business details."
  },
  {
    title: "Escalate three negative reviews about delivery delays",
    module: "Reviews",
    impact: "Medium",
    risk: "Medium",
    automation: "Draft",
    evidence: "The same complaint appeared in two regions during the last 36 hours."
  },
  {
    title: "Prepare a creator shortlist for a rising topic",
    module: "Influencers",
    impact: "Medium",
    risk: "Low",
    automation: "Draft",
    evidence: "The topic is growing quickly and short video audiences match the brand best."
  }
];

export const activityEvents: RadarEvent[] = [
  {
    time: "09:40",
    title: "Brand appeared in AI answers",
    detail: "The brand showed up in 4 of 12 tracked buyer questions.",
    module: "AI Visibility",
    tone: "growth"
  },
  {
    time: "09:18",
    title: "Sensitive review needs attention",
    detail: "A low-rating review was flagged because it mentioned safety and refund concerns.",
    module: "Reviews",
    tone: "risk"
  },
  {
    time: "08:52",
    title: "Google ranking improved",
    detail: "A key service page moved from position 11 to 7 for a buyer-focused search.",
    module: "Search",
    tone: "growth"
  },
  {
    time: "08:27",
    title: "New content opportunity",
    detail: "A rising topic is now strong enough to consider for LinkedIn and YouTube Shorts.",
    module: "Trends",
    tone: "watch"
  }
];

export const approvals: ApprovalItem[] = [
  {
    title: "Publish replies to positive Google reviews",
    module: "Reviews",
    risk: "Low",
    owner: "CX Lead",
    eta: "Today"
  },
  {
    title: "Approve search-friendly page details",
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
