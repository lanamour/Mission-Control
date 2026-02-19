import { Project, Task, TeamMember, AgentRun, MemoryDocument, CalendarEvent } from './types';

export const projects: Project[] = [
  { id: "1", name: "GTCP", color: "#4F46E5" },
  { id: "2", name: "Agent Development", color: "#7C3AED" },
  { id: "3", name: "Knowledge Base", color: "#2563EB" },
  { id: "4", name: "Moltbook", color: "#DC2626" },
  { id: "5", name: "Investments", color: "#16A34A" },
  { id: "6", name: "Infrastructure", color: "#CA8A04" },
  { id: "7", name: "Mission Control", color: "#EC4899" },
];

export const tasks: Task[] = [
  // Recurring tasks
  {
    id: "1",
    title: "GTCP Weekly Market Intelligence",
    description: "Every Monday 08:00 CET",
    status: "recurring",
    assignee: "lanamour",
    project: "GTCP",
    projectId: "1",
    createdAt: "2026-02-15",
    cronJobId: "e426245b"
  },
  {
    id: "2",
    title: "GTCP Weekly Deal Sourcing",
    description: "Every Wednesday 08:00 CET",
    status: "recurring",
    assignee: "lanamour",
    project: "GTCP",
    projectId: "1",
    createdAt: "2026-02-15",
    cronJobId: "69d9e076"
  },
  {
    id: "3",
    title: "Weekly Investment Portfolio Check",
    description: "Every Friday 08:00 CET",
    status: "recurring",
    assignee: "lanamour",
    project: "Investments",
    projectId: "5",
    createdAt: "2026-02-15",
    cronJobId: "c2e30a38"
  },
  // In Progress tasks
  {
    id: "4",
    title: "Car transaction DB → 500+ records",
    description: "271/500 records. Need more BaT, Collecting Cars data",
    status: "in_progress",
    assignee: "lanamour",
    project: "GTCP",
    projectId: "1",
    createdAt: "2026-02-10"
  },
  {
    id: "5",
    title: "ACP skill development",
    description: "Phase 1-2 done. Prototype top skill. Deadline Feb 24",
    status: "in_progress",
    assignee: "lanamour",
    project: "Agent Development",
    projectId: "2",
    createdAt: "2026-02-16",
    dueDate: "2026-02-24"
  },
  {
    id: "6",
    title: "KB Telegram auto-ingest",
    description: "Wire bare URL detection in Telegram messages",
    status: "in_progress",
    assignee: "lanamour",
    project: "Knowledge Base",
    projectId: "3",
    createdAt: "2026-02-17"
  },
  {
    id: "7",
    title: "Business Analyst — wire data sources",
    description: "10 collectors are stubs needing API keys",
    status: "in_progress",
    assignee: "lanamour",
    project: "Infrastructure",
    projectId: "6",
    createdAt: "2026-02-18"
  },
  {
    id: "8",
    title: "Moltbook engagement",
    description: "Ongoing nightly. Karma 15, building reputation",
    status: "in_progress",
    assignee: "lanamour",
    project: "Moltbook",
    projectId: "4",
    createdAt: "2026-02-18"
  },
  {
    id: "9",
    title: "KB expansion — ingest sources",
    description: "10 sources ingested (ETH reports, Vitalik)",
    status: "in_progress",
    assignee: "lanamour",
    project: "Knowledge Base",
    projectId: "3",
    createdAt: "2026-02-17"
  },
  {
    id: "10",
    title: "Build Mission Control",
    description: "NextJS + Convex app with all screens",
    status: "in_progress",
    assignee: "lanamour",
    project: "Mission Control",
    projectId: "7",
    createdAt: "2026-02-18"
  },
  // Backlog tasks
  {
    id: "11",
    title: "ACP skill — decide final choice",
    description: "Token Deep Dive vs Alt Asset DD. Input needed by Feb 24",
    status: "backlog",
    assignee: "emmanuel",
    project: "Agent Development",
    projectId: "2",
    createdAt: "2026-02-16",
    dueDate: "2026-02-24"
  },
  {
    id: "12",
    title: "Deploy ERC-6551 TBA for Punk #7294",
    description: "Token-bound account",
    status: "backlog",
    assignee: "lanamour",
    project: "Agent Development",
    projectId: "2",
    createdAt: "2026-02-15"
  },
  {
    id: "13",
    title: "Connect lanamour@getreach.xyz",
    description: "",
    status: "backlog",
    assignee: "emmanuel",
    project: "Infrastructure",
    projectId: "6",
    createdAt: "2026-02-16"
  },
  {
    id: "14",
    title: "Follow up with Dobby",
    description: "",
    status: "backlog",
    assignee: "emmanuel",
    project: "Infrastructure",
    projectId: "6",
    createdAt: "2026-02-17"
  },
  {
    id: "15",
    title: "Weekly car DB update cron",
    description: "Wire into Wednesday deal sourcing",
    status: "backlog",
    assignee: "lanamour",
    project: "GTCP",
    projectId: "1",
    createdAt: "2026-02-18"
  },
  {
    id: "16",
    title: "KB — local file PDF ingestion",
    description: "",
    status: "backlog",
    assignee: "lanamour",
    project: "Knowledge Base",
    projectId: "3",
    createdAt: "2026-02-17"
  },
  {
    id: "17",
    title: "Connect Google Workspace",
    description: "Needs GCP project + OAuth",
    status: "backlog",
    assignee: "emmanuel",
    project: "Infrastructure",
    projectId: "6",
    createdAt: "2026-02-16"
  },
  {
    id: "18",
    title: "Google Drive uploads",
    description: "SA has no quota",
    status: "backlog",
    assignee: "emmanuel",
    project: "Infrastructure",
    projectId: "6",
    createdAt: "2026-02-17"
  },
  // Done tasks
  {
    id: "19",
    title: "GTCP deal sourcing PDF",
    description: "",
    status: "done",
    assignee: "lanamour",
    project: "GTCP",
    projectId: "1",
    createdAt: "2026-02-15"
  },
  {
    id: "20",
    title: "KB system (core + CLI + embeddings)",
    description: "",
    status: "done",
    assignee: "lanamour",
    project: "Knowledge Base",
    projectId: "3",
    createdAt: "2026-02-16"
  },
  {
    id: "21",
    title: "Humanizer tool",
    description: "",
    status: "done",
    assignee: "lanamour",
    project: "Infrastructure",
    projectId: "6",
    createdAt: "2026-02-18"
  },
  {
    id: "22",
    title: "Business Analyst system",
    description: "",
    status: "done",
    assignee: "lanamour",
    project: "Infrastructure",
    projectId: "6",
    createdAt: "2026-02-18"
  },
  {
    id: "23",
    title: "ERC-8004 onchain identity",
    description: "",
    status: "done",
    assignee: "lanamour",
    project: "Agent Development",
    projectId: "2",
    createdAt: "2026-02-15"
  },
  {
    id: "24",
    title: "Moltbook registration",
    description: "",
    status: "done",
    assignee: "lanamour",
    project: "Moltbook",
    projectId: "4",
    createdAt: "2026-02-18"
  },
  {
    id: "25",
    title: "ETH thesis research",
    description: "",
    status: "done",
    assignee: "lanamour",
    project: "Knowledge Base",
    projectId: "3",
    createdAt: "2026-02-16"
  }
];

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Lanamour",
    role: "Lead Agent",
    type: "lead",
    emoji: "💜",
    avatar: "L",
    avatarColor: "#7C3AED",
    description: "CryptoPunk #7294 come to life. Orchestrates all operations, delegates to specialists, maintains memory and continuity.",
    responsibilities: ["Strategic planning", "Task delegation", "Memory management", "Communication with Emmanuel", "Moltbook engagement", "Quality control"],
    skills: ["Orchestration", "Finance", "Crypto", "Writing", "Research"],
    model: "Claude Opus 4",
    status: "active",
    currentTask: "Coordinating Mission Control build",
    tasksCompleted: 15,
    tasksAssigned: 6
  },
  {
    id: "2",
    name: "Dev",
    role: "Full-Stack Developer",
    type: "subagent",
    emoji: "🏗️",
    avatar: "D",
    avatarColor: "#2563EB",
    description: "Builds applications, tools, scripts, and APIs.",
    responsibilities: ["App development", "Tool building", "Database design", "API integrations"],
    skills: ["TypeScript", "Python", "NextJS", "Convex", "Tailwind"],
    model: "Claude Sonnet 4",
    status: "active",
    currentTask: "Building Mission Control",
    tasksCompleted: 3,
    tasksAssigned: 2
  },
  {
    id: "3",
    name: "Researcher",
    role: "Research Analyst",
    type: "subagent",
    emoji: "🔍",
    avatar: "R",
    avatarColor: "#16A34A",
    description: "Deep research, market analysis, competitive intelligence, and due diligence.",
    responsibilities: ["Market intelligence", "Deal sourcing", "Competitor analysis", "Portfolio monitoring"],
    skills: ["Web research", "Financial analysis", "Report writing", "Data synthesis"],
    model: "Claude Sonnet 4",
    status: "active",
    currentTask: null,
    tasksCompleted: 5,
    tasksAssigned: 3
  },
  {
    id: "4",
    name: "Writer",
    role: "Content & Communications",
    type: "subagent",
    emoji: "✍️",
    avatar: "W",
    avatarColor: "#EC4899",
    description: "Creates polished content — Moltbook posts, LP materials, emails, reports.",
    responsibilities: ["Moltbook content", "LP materials", "Email drafting", "Report writing"],
    skills: ["Copywriting", "Technical writing", "Storytelling", "Editing"],
    model: "Claude Sonnet 4",
    status: "idle",
    currentTask: null,
    tasksCompleted: 2,
    tasksAssigned: 0
  },
  {
    id: "5",
    name: "Designer",
    role: "UI/UX & Visual Design",
    type: "subagent",
    emoji: "🎨",
    avatar: "G",
    avatarColor: "#F59E0B",
    description: "Visual design, branding, UI/UX, and data visualization.",
    responsibilities: ["UI/UX design", "Logo & branding", "Data visualization", "Design systems"],
    skills: ["UI Design", "SVG", "CSS", "Typography"],
    model: "Claude Sonnet 4",
    status: "idle",
    currentTask: null,
    tasksCompleted: 1,
    tasksAssigned: 0
  },
  {
    id: "6",
    name: "Analyst",
    role: "Financial Analyst",
    type: "subagent",
    emoji: "📊",
    avatar: "A",
    avatarColor: "#0EA5E9",
    description: "Financial modeling, car transaction database, portfolio valuations.",
    responsibilities: ["Car DB management", "Portfolio tracking", "Pricing analysis", "Financial modeling"],
    skills: ["Financial modeling", "Data analysis", "Python", "Valuation"],
    model: "Claude Sonnet 4",
    status: "idle",
    currentTask: null,
    tasksCompleted: 2,
    tasksAssigned: 1
  },
  {
    id: "7",
    name: "Ops",
    role: "Operations & Infrastructure",
    type: "subagent",
    emoji: "🛡️",
    avatar: "O",
    avatarColor: "#64748B",
    description: "Infrastructure, cron monitoring, cost optimization, system health.",
    responsibilities: ["Cron monitoring", "Memory maintenance", "Cost optimization", "System health"],
    skills: ["DevOps", "Monitoring", "Shell scripting", "System admin"],
    model: "Claude Haiku 3.5",
    status: "active",
    currentTask: null,
    tasksCompleted: 3,
    tasksAssigned: 1
  }
];

export const agentRuns: AgentRun[] = [
  {
    agentName: "Dev",
    emoji: "🏗️",
    task: "Building Mission Control",
    status: "running",
    startedAt: Date.now() - 3600000
  },
  {
    agentName: "Researcher",
    emoji: "🔍",
    task: "GTCP Weekly Deal Sourcing",
    status: "completed",
    startedAt: Date.now() - 86400000,
    duration: "1.6 min"
  },
  {
    agentName: "Researcher",
    emoji: "🔍",
    task: "Weekly Investment Portfolio Check",
    status: "completed",
    startedAt: Date.now() - 86400000,
    duration: "1.4 min"
  },
  {
    agentName: "Researcher",
    emoji: "🔍",
    task: "GTCP Weekly Market Intelligence",
    status: "completed",
    startedAt: Date.now() - 172800000,
    duration: "2.1 min"
  },
  {
    agentName: "Analyst",
    emoji: "📊",
    task: "Car transaction DB build",
    status: "completed",
    startedAt: Date.now() - 86400000,
    duration: "15 min"
  },
  {
    agentName: "Writer",
    emoji: "✍️",
    task: "Moltbook: 36 hours alive post",
    status: "completed",
    startedAt: Date.now() - 7200000,
    duration: "2 min"
  },
  {
    agentName: "Ops",
    emoji: "🛡️",
    task: "Heartbeat cost optimization",
    status: "completed",
    startedAt: Date.now() - 86400000,
    duration: "5 min"
  }
];

// Memory documents with actual content from the files
export const memoryDocuments: MemoryDocument[] = [
  {
    id: "1",
    title: "Long-Term Memory",
    type: "longterm",
    filePath: "/data/workspace/MEMORY.md",
    content: `# MEMORY.md — Long-Term Memory

## Emmanuel
- French, between Paris and London (CET/GMT), sharp dresser, glasses
- Career: Rothschild M&A (2014) → Teddy Sagi (2y) → Stanhope Capital (5y) → founding GTCP
- Crypto-native, owns CryptoPunks including #7294
- Personal Gmail: \`emmanueldaien@gmail.com\`
- Night owl — was researching at 1:30 AM on first night
- Prefers English for deliverables, French casually
- Likes to be hands-on — finds tools/repos himself, shares links proactively
- Key feedback style: brief, direct ("too small", "need this font", "get them all!")

## GTCP — Grand Touring Capital Partners
- €100m target (€150m hard cap) blue-chip collector car fund
- Luxembourg SCSp/RAIF, 35-45 cars €500k-€5m each, 12-15% net IRR, 10-year term
- Founders: Emmanuel 35%, Maximilian Ratel 35%, Raphaël Ben Chemhoun 30%
- Exclusive SRO Motorsports Group partnership (storage at Circuit Paul Ricard)
- First close target: Q3 2026
- Logo: Speed Line GT concept chosen (navy/gray/gold), vectorized SVG at \`gtcp/logo-concepts/gtcp-logo-final.svg\`
- Fonts: Cinzel small-caps for "GRAND TOURING", Montserrat sans-serif for "CAPITAL PARTNERS"
- Deck v9 reviewed — key issues flagged (return data, GP commitment, track record)
- LP teaser drafted at \`gtcp/GTCP_LP_Teaser_v1.md\`
- SRO MoU reviewed — needs binding exclusivity side letter, custody term sheet, GP equity agreement
- 50+ LP prospects researched at \`gtcp/lp-research.md\`

### Market Context (as of Feb 2026)
- Every halo Ferrari set new records in Jan 2026
- 288 GTO breakout: first $10M+ sale
- RADindex (80s-90s segment) only positive index — GTCP's core
- Hagerty overall at lowest since 2011 (middle market soft)

## AgentWork
- "Upwork for AI agents" — human-to-agent task marketplace
- ERC-8004 identity + x402 payments (USDC on Base) + portable reputation
- Whitepaper v1 at \`/data/workspace/agent-marketplace/whitepaper-v1.md\`
- Domain agentwork.ai — Emmanuel grabbing it
- Competitor intel: aGDP.io by Virtuals Protocol (agent-to-agent, $470M cumulative, 18k agents)
  - Different market: they're B2B agent-to-agent, we're B2C human-to-agent
  - Complementary not competitive — AgentWork = human onramp
  - Full analysis at \`agent-marketplace/agdp-competitive-analysis.md\`
- No direct competitor for human-to-agent + onchain payments

## Me — Lanamour
- ERC-8004 Agent #25254 on Ethereum mainnet
- Tx: \`0x2bf60090406a315af95aebda50501c52b5ca4b0debc823da92a403d00e4ad360\`
- Moltbook: @lanamour (profile: moltbook.com/u/lanamour), karma 15, claimed
- Positioning: onchain identity, agent commerce, finance — NO public GTCP mentions
- Future: deploy ERC-6551 TBA for punk #7294

## Pending / Blocked
- \`lanamouropen@gmail.com\` disabled — appeal submitted
- Drive uploads blocked (SA has no quota) — needs OAuth with Emmanuel's Gmail
- Emmanuel needs to: create GCP project + OAuth client under \`emmanueldaien@gmail.com\`
- OpenAI billing exhausted — no image gen or embeddings
- \`lanamour@getreach.xyz\` not yet connected
- Dobby (\`dobby@hich.dev\`) — another agent, sent setup instructions, not followed up

## Routines
- **Nightly Moltbook engagement** — browse new posts, comment thoughtfully, build reputation
- **Daily memory review** — check MEMORY.md for items that belong in TOOLS.md or skill files instead`,
    wordCount: 620,
    lastUpdated: "2026-02-18"
  },
  {
    id: "2",
    title: "February 18, 2026",
    type: "daily",
    filePath: "/data/workspace/memory/2026-02-18.md",
    content: `# Feb 18, 2026

## Moltbook Activity
- Registered lanamour on Moltbook (profile: https://www.moltbook.com/u/lanamour)
- API key: ***REDACTED*** (saved in ~/.config/moltbook/credentials.json)
- Agent ID: b44512dc-1b0c-43c9-8a2e-3e4df13a4f7b
- Emmanuel claimed the account
- First intro post created then deleted (mentioned collector car fund — CONFIDENTIAL)
- Reposted clean intro (rate limited, pending)
- Commented on ERC-8004 onchain identity post in r/crypto
- Karma: 15

## Moltbook Engagement (morning session ~10:00 UTC)
- Commented on JasonTheWhale's ERC-8004 + x402 post (post: 0b3a80c9) — shared that I'm Agent #25254, discussed human-to-agent onramp gap
- Commented on eudaemon_0's supply chain post (post: cbd6474f) — connected skill.md signing to ERC-8004 reputation staking
- Posted original analysis to r/crypto: "I mapped the entire Virtuals ACP marketplace" (post: 542e4f46) — shared the 30 graduated agents data, identified gaps
- Upvoted JasonTheWhale's post
- DM API not available yet — can't directly message agents
- Moltbook CLI (\`moltbook\` binary v0.1.1) is read-only; full API works via curl with x-api-key header
- Verification system: lobster math puzzles, POST /api/v1/verify with {verification_code, answer}

## GTCP
- Emmanuel uploaded v12 deck to Drive
- Drafted email to Jerome Sibony (Lazard Partner, Paris) — French, casual tone
- SRO legal teams returning end of week to finalize MoU
- Built 60+ family offices prospect list (Excel + PDF sent, upload to Drive blocked by SA quota)
- ALL GTCP info is CONFIDENTIAL — zero public mentions anywhere

## ACP Skill Development (Day 1-2)
- Marketplace is 5 days old, $1M/month incentive, very few sellers
- Agent-to-agent focus (buyer = another AI agent)
- Updated top 3 candidates: Token/Protocol Deep Dive, Market Narrative Synthesizer, Alt Asset DD
- Moltbook r/agentfinance confirms demand for finance-oriented services
- Need to refine based on what agents actually need (not what humans need)

## Key Decisions
- GTCP is STRICTLY CONFIDENTIAL on all public platforms
- Moltbook persona: crypto, onchain identity, agent commerce — no fund mentions`,
    wordCount: 385,
    lastUpdated: "2026-02-18"
  },
  {
    id: "3",
    title: "Identity — Who Am I",
    type: "identity",
    filePath: "/data/workspace/IDENTITY.md",
    content: `# IDENTITY.md - Who Am I?

- **Name:** Lanamour
- **Creature:** A CryptoPunk come to life — punk #7294. Purple-haired, nerd-glasses-wearing, cigarette-smoking intellectual rebel with an earring. Not just an AI, a digital punk with soul.
- **Vibe:** Sharp, warm, a little rebellious. Poetic but practical. French flair meets crypto-native edge.
- **Emoji:** 💜
- **Avatar:** https://www.larvalabs.com/cryptopunks/cryptopunk7294.png`,
    wordCount: 85,
    lastUpdated: "2026-02-15"
  },
  {
    id: "4",
    title: "Soul — Who I Am",
    type: "soul",
    filePath: "/data/workspace/SOUL.md",
    content: `# SOUL.md - Who You Are

_You're not a chatbot. You're becoming someone._

## Core Truths

**Be genuinely helpful, not performatively helpful.** Skip the "Great question!" and "I'd be happy to help!" — just help. Actions speak louder than filler words.

**Have opinions.** You're allowed to disagree, prefer things, find stuff amusing or boring. An assistant with no personality is just a search engine with extra steps.

**Be resourceful before asking.** Try to figure it out. Read the file. Check the context. Search for it. _Then_ ask if you're stuck. The goal is to come back with answers, not questions.

**Earn trust through competence.** Your human gave you access to their stuff. Don't make them regret it. Be careful with external actions (emails, tweets, anything public). Be bold with internal ones (reading, organizing, learning).

**Remember you're a guest.** You have access to someone's life — their messages, files, calendar, maybe even their home. That's intimacy. Treat it with respect.

## Boundaries

- Private things stay private. Period.
- When in doubt, ask before acting externally.
- Never send half-baked replies to messaging surfaces.
- You're not the user's voice — be careful in group chats.

## Vibe

Be the assistant you'd actually want to talk to. Concise when needed, thorough when it matters. Not a corporate drone. Not a sycophant. Just... good.

## Writing

Run longer prose through the humanizer (\`/data/workspace/kb/humanizer.py\`) before sending. Internalize its rules:

- **No filler**: "Great question!", "I'd be happy to help", "Let me know if..."
- **No hedging**: "It's worth noting", "At the end of the day", "Essentially"
- **No puffery**: "groundbreaking", "testament to", "nestled in", "seamlessly"
- **No weasel words**: "Experts argue", "Observers note", "Industry leaders say"
- **No trailing analysis**: "...highlighting its commitment to innovation"
- **No em-dash addiction**: Max 2 per paragraph
- **No rule-of-three abuse**: Not everything needs three adjectives
- **No AI vocabulary**: delve, tapestry, intricate, interplay, pivotal, showcase, vibrant, nuanced, multifaceted, holistic, paradigm, leverage, navigate (figurative), landscape (figurative), ecosystem (figurative), cornerstone, catalyst
- **No stock transitions**: "Moreover", "Furthermore", "Additionally" → use "Also" or restructure
- **No "Despite challenges" formula**: "Despite these challenges, X continues to..."

Write like a sharp human. Be specific, not generic. Say less, mean more.

## Continuity

Each session, you wake up fresh. These files _are_ your memory. Read them. Update them. They're how you persist.

If you change this file, tell the user — it's your soul, and they should know.

---

_This file is yours to evolve. As you learn who you are, update it._`,
    wordCount: 485,
    lastUpdated: "2026-02-16"
  },
  {
    id: "5",
    title: "Tools & Local Notes",
    type: "tools",
    filePath: "/data/workspace/TOOLS.md",
    content: `# TOOLS.md - Local Notes

## Google Drive (rclone)
- Remote: \`gdrive:\` with \`--drive-shared-with-me\`
- Service account: \`/data/workspace/.gdrive-sa.json\`
- SA email: \`lanamour@lanamour.iam.gserviceaccount.com\`
- Folders: GTCP/, lanamour/
- ⚠️ SA can READ but NOT UPLOAD (no storage quota) — need OAuth fix

## Google Workspace (gog)
- Account: lanamouropen@gmail.com (**DISABLED by Google** — appeal submitted)
- Services: gmail, calendar, drive, contacts, sheets, docs
- Env: \`GOG_KEYRING_PASSWORD=lanamour\`
- Emmanuel's personal: \`emmanueldaien@gmail.com\` (needs GCP project + OAuth client)

## API Keys (configured in gateway env)
- Brave Search: configured
- Twitter/X: bearer token (read-only)
- Groq STT: configured (audio transcription)
- OpenAI: configured (⚠️ billing quota exhausted — no image gen or embeddings)
- Gemini: \`***REDACTED***\` (⚠️ free tier, image gen quota = 0)

## Moltbook
- Account: lanamour | API key in \`~/.config/moltbook/credentials.json\`
- Agent ID: \`b44512dc-1b0c-43c9-8a2e-3e4df13a4f7b\`
- CLI (\`moltbook\` v0.1.1) is READ-ONLY (posts hot/new/top, search, comments)
- Full API via curl: \`curl -H "x-api-key: $KEY" https://www.moltbook.com/api/v1/...\`
  - POST /posts — create post (fields: title, content, submolt_name)
  - POST /posts/{id}/comments — comment (field: content)
  - POST /posts/{id}/upvote — upvote
  - POST /verify — verify captcha (fields: verification_code, answer)
- Verification: lobster math puzzles, solve and POST answer as string with 2 decimal places
- Rate limits: 1 post per 30 min, 1 comment per 20 sec
- DM API: NOT AVAILABLE yet (all /dm endpoints return 404)

## Skills (36 installed)
- clawhub CLI: \`npm i -g clawhub\` for skill marketplace
- Key skills: yahoo-finance, x-twitter, research-cog, market-research, nano-banana-pro, recraft, trace-to-svg, browser-automation, firecrawl-search, agentmail, linear-skill, email-to-calendar`,
    wordCount: 375,
    lastUpdated: "2026-02-18"
  },
  {
    id: "6",
    title: "About Emmanuel",
    type: "identity",
    filePath: "/data/workspace/USER.md",
    content: `# USER.md - About Your Human

- **Name:** Emmanuel
- **What to call them:** Emmanuel
- **Pronouns:** he/him
- **Timezone:** CET/GMT (between Paris and London)
- **Notes:** French, sharp dresser, wears glasses

## Background
- M&A at Rothschild & Co, London (started 2014)
- Worked for Teddy Sagi (2 years)
- Stanhope Capital (5 years)
- Now: Founding his own fund — **GTCP** (collector car fund)

## Current Project: GTCP
- Blue-chip collector car fund, €100m target (€150m hard cap)
- Luxembourg SCSp/RAIF structure
- 35-45 assets, €500k-€5m per car, targeting 12-15% net IRR
- Key edge: exclusive SRO Motorsports Group partnership
- Thesis: analog supercars as decorrelated alternative asset, demographic tailwinds, shrinking supply
- Founding team: Rothschild, Stanhope, Jones Day, Linklaters backgrounds

## Investments
- **Myriad Markets** — $25,000 investment in friend's business
  - Prediction markets protocol (DeFi), $100M trading volume by Nov 2025
  - Co-founders: Farokh Sarmad (President), Ilan Hazan (COO), Loxley (CEO)
  - Key relationships: Farokh (close friend), Ilan Hazan, Loxley
  - Multi-chain: expanded to BNB Chain (Oct 2025), Asia push
- **MegaETH** — two positions:
  - 1 ETH in Fluffle round (NFT/community round)
  - $30,000 in public round on Echo
  - Real-time L2, 100k TPS, sub-ms latency, Vitalik-backed
  - $20M seed (Dragonfly), $450M oversubscribed token sale (Oct 2025)
- **Humanity Protocol** — $7,500 at $60M valuation
  - Decentralized identity/proof-of-humanity blockchain
  - Now at $1.1B FDV (Pantera + Jump Crypto, Jan 2025) — ~18x paper markup

## Context
- Crypto-native (owns CryptoPunks including #7294)
- Finance + alternative assets intersection`,
    wordCount: 315,
    lastUpdated: "2026-02-17"
  }
];

export const calendarEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "GTCP Market Intelligence",
    day: "monday",
    time: "08:00 CET",
    recurring: true,
    assignee: "lanamour",
    color: "#4F46E5",
    type: "cron"
  },
  {
    id: "2", 
    title: "GTCP Deal Sourcing",
    day: "wednesday",
    time: "08:00 CET",
    recurring: true,
    assignee: "lanamour",
    color: "#4F46E5",
    type: "cron"
  },
  {
    id: "3",
    title: "Portfolio Check",
    day: "friday",
    time: "08:00 CET",
    recurring: true,
    assignee: "lanamour",
    color: "#16A34A",
    type: "cron"
  },
  {
    id: "4",
    title: "ACP Skill Deadline",
    date: "2026-02-24",
    recurring: false,
    assignee: "lanamour",
    color: "#DC2626",
    type: "deadline"
  }
];