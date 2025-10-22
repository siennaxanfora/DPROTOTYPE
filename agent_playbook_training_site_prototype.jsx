import React, { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Download, Upload, Plus, Play, Pause, Filter, Search, Clipboard, Mic, Wand2, Sparkles } from "lucide-react";

// --- Demo Data --------------------------------------------------------------
const ARCHETYPES = [
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

const SAMPLE_SPIELS = [
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

const SAMPLE_CALLS = [
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

// --- Utilities -------------------------------------------------------------
const copy = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  } catch (e) {
    toast.error("Copy failed");
  }
};

const downloadJSON = (data, filename = "playbook.json") => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

// --- Main App --------------------------------------------------------------
export default function AgentPlaybookApp() {
  const [query, setQuery] = useState("");
  const [archetype, setArchetype] = useState("all");
  const [spiels, setSpiels] = useState(SAMPLE_SPIELS);
  const [calls, setCalls] = useState(SAMPLE_CALLS);

  const filteredSpiels = useMemo(() => {
    return spiels.filter((s) => {
      const matchesArch = archetype === "all" || s.archetype === archetype;
      const q = query.toLowerCase();
      const matchesQ = !q ||
        s.title.toLowerCase().includes(q) ||
        s.archetype.toLowerCase().includes(q) ||
        s.body.toLowerCase().includes(q) ||
        s.openers.some(o => o.toLowerCase().includes(q)) ||
        s.closers.some(c => c.toLowerCase().includes(q));
      return matchesArch && matchesQ;
    });
  }, [spiels, archetype, query]);

  const filteredCalls = useMemo(() => {
    return calls.filter((c) => {
      const matchesArch = archetype === "all" || c.archetype === archetype;
      const q = query.toLowerCase();
      const matchesQ = !q || c.title.toLowerCase().includes(q) || c.transcript.toLowerCase().includes(q) || c.agent.toLowerCase().includes(q);
      return matchesArch && matchesQ;
    });
  }, [calls, archetype, query]);

  const [newSpielOpen, setNewSpielOpen] = useState(false);
  const [form, setForm] = useState({ title: "", archetype: "Skeptical", opener: "", body: "", closer: "" });

  const addSpiel = () => {
    if (!form.title.trim()) { toast.error("Title required"); return; }
    const toAdd = { id: crypto.randomUUID(), title: form.title, archetype: form.archetype, openers: [form.opener], body: form.body, closers: [form.closer] };
    setSpiels((prev) => [toAdd, ...prev]);
    setNewSpielOpen(false);
    setForm({ title: "", archetype: form.archetype, opener: "", body: "", closer: "" });
    toast.success("Spiel added");
  };

  const exportAll = () => downloadJSON({ spiels, calls });

  const importFromFile = async (file) => {
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      if (json.spiels) setSpiels(json.spiels);
      if (json.calls) setCalls(json.calls);
      toast.success("Library imported");
    } catch {
      toast.error("Import failed");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden"><Filter className="h-5 w-5"/></Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-3">
                <Select value={archetype} onValueChange={(v) => setArchetype(v)}>
                  <SelectTrigger><SelectValue placeholder="Archetype" /></SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Client Type</SelectLabel>
                      <SelectItem value="all">All</SelectItem>
                      {ARCHETYPES.map(a => (<SelectItem key={a} value={a}>{a}</SelectItem>))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </SheetContent>
          </Sheet>

          <div className="font-semibold tracking-tight text-lg md:text-xl flex items-center gap-2">
            <Sparkles className="h-5 w-5"/> Agent Playbook
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <Select value={archetype} onValueChange={(v) => setArchetype(v)}>
                <SelectTrigger className="w-56"><SelectValue placeholder="Archetype" /></SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Client Type</SelectLabel>
                    <SelectItem value="all">All</SelectItem>
                    {ARCHETYPES.map(a => (<SelectItem key={a} value={a}>{a}</SelectItem>))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"/>
                <Input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search spiels, calls, transcripts…" className="pl-9"/>
              </div>
            </div>
            <Button variant="outline" onClick={exportAll}><Download className="h-4 w-4 mr-2"/>Export</Button>
            <label className="inline-flex items-center">
              <input type="file" accept="application/json" className="hidden" onChange={(e)=>{const f=e.target.files?.[0]; if(f) importFromFile(f);}} />
              <Button variant="outline"><Upload className="h-4 w-4 mr-2"/>Import</Button>
            </label>
            <Dialog open={newSpielOpen} onOpenChange={setNewSpielOpen}>
              <DialogTrigger asChild>
                <Button className=""><Plus className="h-4 w-4 mr-2"/>New Spiel</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Add a Spiel</DialogTitle>
                  <DialogDescription>Create an opener → body → closer for a client type.</DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                  <Input placeholder="Title" value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})}/>
                  <Select value={form.archetype} onValueChange={(v)=>setForm({...form, archetype:v})}>
                    <SelectTrigger><SelectValue placeholder="Archetype"/></SelectTrigger>
                    <SelectContent>
                      {ARCHETYPES.map(a => (<SelectItem key={a} value={a}>{a}</SelectItem>))}
                    </SelectContent>
                  </Select>
                  <Textarea placeholder="Opener" value={form.opener} onChange={(e)=>setForm({...form, opener:e.target.value})}/>
                  <Textarea placeholder="Body" value={form.body} onChange={(e)=>setForm({...form, body:e.target.value})}/>
                  <Textarea placeholder="Closer" value={form.closer} onChange={(e)=>setForm({...form, closer:e.target.value})}/>
                </div>
                <DialogFooter>
                  <Button onClick={addSpiel}><Plus className="h-4 w-4 mr-2"/>Add</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Tabs defaultValue="spiels" className="w-full">
          <TabsList className="mb-4 grid grid-cols-3 w-full">
            <TabsTrigger value="spiels">Spiels Library</TabsTrigger>
            <TabsTrigger value="calls">Best Calls Archive</TabsTrigger>
            <TabsTrigger value="builder">Script Builder</TabsTrigger>
          </TabsList>

          {/* Spiels */}
          <TabsContent value="spiels" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSpiels.map((s) => (
                <Card key={s.id} className="hover:shadow-md transition">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between gap-2">
                      <span className="truncate">{s.title}</span>
                      <Badge variant="secondary">{s.archetype}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <section>
                      <p className="text-xs uppercase text-neutral-500">Opener</p>
                      <div className="mt-1 bg-neutral-100 rounded p-2 text-sm leading-relaxed">{s.openers[0]}</div>
                      <div className="mt-2"><Button size="sm" variant="outline" onClick={()=>copy(s.openers[0])}><Clipboard className="h-4 w-4 mr-2"/>Copy</Button></div>
                    </section>
                    <section>
                      <p className="text-xs uppercase text-neutral-500">Body</p>
                      <div className="mt-1 bg-neutral-100 rounded p-2 text-sm leading-relaxed whitespace-pre-wrap">{s.body}</div>
                      <div className="mt-2"><Button size="sm" variant="outline" onClick={()=>copy(s.body)}><Clipboard className="h-4 w-4 mr-2"/>Copy</Button></div>
                    </section>
                    <section>
                      <p className="text-xs uppercase text-neutral-500">Closer</p>
                      <div className="mt-1 bg-neutral-100 rounded p-2 text-sm leading-relaxed">{s.closers[0]}</div>
                      <div className="mt-2"><Button size="sm" variant="outline" onClick={()=>copy(s.closers[0])}><Clipboard className="h-4 w-4 mr-2"/>Copy</Button></div>
                    </section>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Calls */}
          <TabsContent value="calls" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCalls.map((c)=> (
                <Card key={c.id} className="hover:shadow-md transition">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between gap-2">
                      <span className="truncate">{c.title}</span>
                      <Badge variant="secondary">{c.archetype}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm text-neutral-600">Agent: <b>{c.agent}</b> • Duration: {c.duration}</div>
                    <audio controls className="w-full">
                      <source src={c.audioUrl} type="audio/mpeg" />
                    </audio>
                    <div>
                      <p className="text-xs uppercase text-neutral-500">Highlights</p>
                      <ul className="list-disc pl-5 text-sm mt-1 space-y-1">
                        {c.highlights.map((h, i)=> <li key={i}>{h}</li>)}
                      </ul>
                    </div>
                    <details className="bg-neutral-100 rounded p-2">
                      <summary className="cursor-pointer text-sm font-medium">Transcript</summary>
                      <pre className="whitespace-pre-wrap text-sm mt-2">{c.transcript}</pre>
                    </details>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Builder */}
          <TabsContent value="builder">
            <Card>
              <CardHeader>
                <CardTitle>Script Builder</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Client Archetype</label>
                    <Select value={form.archetype} onValueChange={(v)=>setForm({...form, archetype:v})}>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="Select"/></SelectTrigger>
                      <SelectContent>
                        {ARCHETYPES.map(a => (<SelectItem key={a} value={a}>{a}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input className="mt-1" value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} placeholder="e.g., Calm Authority for Skeptics"/>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Opener</label>
                    <Textarea className="mt-1" rows={5} value={form.opener} onChange={(e)=>setForm({...form, opener:e.target.value})} placeholder="Empathize + Verification promise…"/>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Body</label>
                    <Textarea className="mt-1" rows={5} value={form.body} onChange={(e)=>setForm({...form, body:e.target.value})} placeholder="Step‑by‑step path, choices, time‑box…"/>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Closer</label>
                    <Textarea className="mt-1" rows={5} value={form.closer} onChange={(e)=>setForm({...form, closer:e.target.value})} placeholder="Clear next action + opt‑out safety…"/>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={addSpiel}><Plus className="h-4 w-4 mr-2"/>Save to Library</Button>
                  <Button variant="outline" onClick={()=>copy([form.opener, form.body, form.closer].filter(Boolean).join("\n\n"))}><Clipboard className="h-4 w-4 mr-2"/>Copy Draft</Button>
                </div>
                <div className="text-xs text-neutral-500">Tip: keep openers under 12 seconds; aim for a single clear verification step; time‑box promises (e.g., “5 minutes to fix root cause”).</div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer helpers */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader><CardTitle className="text-base">How to add a new call</CardTitle></CardHeader>
            <CardContent className="text-sm space-y-2">
              <ol className="list-decimal pl-5 space-y-1">
                <li>Upload MP3 to any public URL (e.g., your CDN/Drive with link access).</li>
                <li>Export transcript from Whisper/Otter.</li>
                <li>Click <b>Export</b> → edit JSON → <b>Import</b> back here, or extend this UI with an upload form.</li>
              </ol>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Tagging Guidelines</CardTitle></CardHeader>
            <CardContent className="text-sm space-y-1">
              <p>Use one primary archetype; add highlights with timestamps.</p>
              <p>Bold the turning‑point line in the transcript when publishing.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Export/Import</CardTitle></CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>All content can be exported as JSON for backup or migration to a CMS.</p>
              <p>This prototype stores data in memory; wire to an API/DB for production.</p>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t mt-8">
        <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-neutral-500 flex flex-wrap items-center gap-2">
          <span>© {new Date().getFullYear()} Agent Playbook</span>
          <span className="mx-2">•</span>
          <span>Training toolkit for call center conversion & de‑escalation</span>
        </div>
      </footer>
    </div>
  );
}
