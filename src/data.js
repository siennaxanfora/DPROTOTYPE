export const ARCHETYPES = [
  "Skeptical",
  "Eloquent",
  "Sharp‑witted",
  "Angry",
  "Panicking",
  "Afraid of Scam",
  "Elderly/Slow‑paced",
  "Tech‑savvy",
  "Decision‑maker",
];

export const SAMPLE_SPIELS = [
  {
    id: "sp1",
    title: "Legitimacy + Calm Authority (Skeptical)",
    archetype: "Skeptical",
    openers: [
      "I hear your hesitation, and you’re right to verify. Give me 30 seconds to show you exactly who we are and why this matters.",
    ],
    body: `Here’s the verification you can check while we stay on the line: [Public page/link], case ID [####]. Once confirmed, we’ll secure your account and remove the conflicting software.`,
    closers: [
      "Does that verification match on your end? Great—let’s proceed step by step so you stay in control.",
    ],
  },
  {
    id: "sp2",
    title: "Empathy First, Boundary Next (Angry)",
    archetype: "Angry",
    openers: [
      "You’re frustrated—and that’s fair. My job is to solve this without wasting another minute.",
    ],
    body: `We’ll go fast, but you keep veto power. If anything sounds off, say stop and I’ll explain alternatives.`,
    closers: [
      "If we fix it in one pass today, would that make this call worth it?",
    ],
  },
];

export const SAMPLE_CALLS = [
  {
    id: "c1",
    title: "Skeptic to Yes in 3 Minutes",
    archetype: "Skeptical",
    duration: "23:14",
    agent: "Nirvana",
    highlights: [
      "Agent provides live-verification link at 01:42",
      "Client agrees to proceed at 03:12",
    ],
    audioUrl: "",
    transcript: `CLIENT: How do I know you’re legit?\nAGENT: Good question—open this link while we stay on the line…`,
  },
  {
    id: "c2",
    title: "De‑escalation with Time Box",
    archetype: "Angry",
    duration: "32:08",
    agent: "Ashley",
    highlights: ["Acknowledges emotion, sets 5‑minute fix window"],
    audioUrl: "",
    transcript: `AGENT: You’re right to be upset. Give me five minutes to fix the cause, not the symptom…`,
  },
];

export default { ARCHETYPES, SAMPLE_SPIELS, SAMPLE_CALLS }
