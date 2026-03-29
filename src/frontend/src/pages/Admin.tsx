import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, LogIn, Shield, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type {
  ChatbotRule,
  FAQ as FAQType,
  Feedback,
  Helpline,
  IncidentReport,
  Law,
  Resource,
  Story,
} from "../backend";

function formatDate(ts: bigint) {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Admin() {
  const { actor } = useActor();
  const { login, identity } = useInternetIdentity();
  const qc = useQueryClient();

  const { data: isAdmin, isLoading: checkingAdmin } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: () => actor!.isCallerAdmin(),
    enabled: !!actor && !!identity,
  });

  if (!identity) {
    return (
      <div className="py-16 px-4 max-w-md mx-auto text-center">
        <Shield
          className="w-16 h-16 mx-auto mb-4"
          style={{ color: "#F3A0A8" }}
        />
        <h1 className="text-2xl font-bold mb-2" style={{ color: "#2B1236" }}>
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mb-6">
          Please login with Internet Identity to access the admin panel.
        </p>
        <Button onClick={login} className="gap-2">
          <LogIn className="w-4 h-4" /> Login with Internet Identity
        </Button>
      </div>
    );
  }

  if (checkingAdmin)
    return (
      <div className="py-16 text-center text-muted-foreground">
        Verifying admin access…
      </div>
    );

  if (!isAdmin) {
    return (
      <div className="py-16 px-4 max-w-md mx-auto text-center">
        <Shield className="w-16 h-16 mx-auto mb-4 text-red-400" />
        <h1 className="text-2xl font-bold mb-2" style={{ color: "#2B1236" }}>
          Access Denied
        </h1>
        <p className="text-muted-foreground">
          You do not have admin privileges for this application.
        </p>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold" style={{ color: "#2B1236" }}>
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage all content for the empowerHER platform
        </p>
      </div>
      <Tabs defaultValue="stories">
        <TabsList className="flex flex-wrap h-auto gap-1 mb-6">
          <TabsTrigger value="stories">Stories</TabsTrigger>
          <TabsTrigger value="incidents">Incident Reports</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="laws">Laws</TabsTrigger>
          <TabsTrigger value="helplines">Helplines</TabsTrigger>
          <TabsTrigger value="chatbot">Chatbot Rules</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="stories">
          <StoriesTab actor={actor} qc={qc} />
        </TabsContent>
        <TabsContent value="incidents">
          <IncidentsTab actor={actor} qc={qc} />
        </TabsContent>
        <TabsContent value="feedback">
          <FeedbackTab actor={actor} />
        </TabsContent>
        <TabsContent value="laws">
          <LawsTab actor={actor} qc={qc} />
        </TabsContent>
        <TabsContent value="helplines">
          <HelplinesTab actor={actor} qc={qc} />
        </TabsContent>
        <TabsContent value="chatbot">
          <ChatbotTab actor={actor} qc={qc} />
        </TabsContent>
        <TabsContent value="faqs">
          <FAQTab actor={actor} qc={qc} />
        </TabsContent>
        <TabsContent value="resources">
          <ResourcesTab actor={actor} qc={qc} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StoriesTab({ actor, qc }: { actor: any; qc: any }) {
  const { data: stories = [] } = useQuery({
    queryKey: ["adminStories"],
    queryFn: () => actor?.getAllStories(),
    enabled: !!actor,
  });
  const approve = useMutation({
    mutationFn: (id: bigint) => actor!.approveStory(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adminStories"] });
      toast.success("Story approved");
    },
  });
  const del = useMutation({
    mutationFn: (id: bigint) => actor!.deleteStory(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adminStories"] });
      toast.success("Story deleted");
    },
  });
  return (
    <div className="space-y-3">
      <h2 className="font-bold text-lg" style={{ color: "#2B1236" }}>
        Anonymous Stories ({stories.length})
      </h2>
      {stories.map((s: Story) => (
        <div key={String(s.id)} className="rounded-xl border p-4 bg-white">
          <div className="flex items-center justify-between mb-2">
            <Badge variant={s.isApproved ? "default" : "secondary"}>
              {s.isApproved ? "Approved" : "Pending"}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {formatDate(s.timestamp)}
            </span>
          </div>
          <p className="text-sm mb-3 line-clamp-3">{s.content}</p>
          <div className="flex gap-2">
            {!s.isApproved && (
              <Button
                size="sm"
                onClick={() => approve.mutate(s.id)}
                className="gap-1"
              >
                <Check className="w-3 h-3" /> Approve
              </Button>
            )}
            <Button
              size="sm"
              variant="destructive"
              onClick={() => del.mutate(s.id)}
              className="gap-1"
            >
              <Trash2 className="w-3 h-3" /> Delete
            </Button>
          </div>
        </div>
      ))}
      {stories.length === 0 && (
        <p className="text-muted-foreground">No stories yet.</p>
      )}
    </div>
  );
}

function IncidentsTab({ actor, qc }: { actor: any; qc: any }) {
  const { data: incidents = [] } = useQuery({
    queryKey: ["adminIncidents"],
    queryFn: () => actor?.getAllIncidentReports(),
    enabled: !!actor,
  });
  const update = useMutation({
    mutationFn: ({ id, status }: { id: bigint; status: string }) =>
      actor!.updateIncidentStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adminIncidents"] });
      toast.success("Status updated");
    },
  });
  return (
    <div className="space-y-3">
      <h2 className="font-bold text-lg" style={{ color: "#2B1236" }}>
        Incident Reports ({incidents.length})
      </h2>
      {incidents.map((r: IncidentReport) => (
        <div key={String(r.id)} className="rounded-xl border p-4 bg-white">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-sm">{r.incidentType}</span>
            <Badge variant={r.status === "reviewed" ? "default" : "secondary"}>
              {r.status}
            </Badge>
          </div>
          {r.location && (
            <p className="text-xs text-muted-foreground mb-1">
              📍 {r.location}
            </p>
          )}
          <p className="text-sm mb-3">{r.description}</p>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => update.mutate({ id: r.id, status: "reviewed" })}
              disabled={r.status === "reviewed"}
            >
              Mark Reviewed
            </Button>
          </div>
        </div>
      ))}
      {incidents.length === 0 && (
        <p className="text-muted-foreground">No reports yet.</p>
      )}
    </div>
  );
}

function FeedbackTab({ actor }: { actor: any }) {
  const { data: feedbacks = [] } = useQuery({
    queryKey: ["adminFeedback"],
    queryFn: () => actor?.getAllFeedback(),
    enabled: !!actor,
  });
  return (
    <div className="space-y-3">
      <h2 className="font-bold text-lg" style={{ color: "#2B1236" }}>
        User Feedback ({feedbacks.length})
      </h2>
      {feedbacks.map((f: Feedback) => (
        <div
          key={String(f.timestamp)}
          className="rounded-xl border p-4 bg-white"
        >
          <div className="flex justify-between mb-1">
            <span className="font-medium text-sm">{f.name}</span>
            <span className="text-xs text-muted-foreground">{f.email}</span>
          </div>
          <p className="text-sm">{f.message}</p>
        </div>
      ))}
      {feedbacks.length === 0 && (
        <p className="text-muted-foreground">No feedback yet.</p>
      )}
    </div>
  );
}

function LawsTab({ actor, qc }: { actor: any; qc: any }) {
  const { data: laws = [] } = useQuery({
    queryKey: ["adminLaws"],
    queryFn: () => actor?.getAllLaws(),
    enabled: !!actor,
  });
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
  });
  const add = useMutation({
    mutationFn: () =>
      actor!.addOrUpdateLaw(form.title, form.description, form.category),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adminLaws"] });
      setForm({ title: "", description: "", category: "" });
      toast.success("Law saved");
    },
  });
  const del = useMutation({
    mutationFn: (title: string) => actor!.deleteLaw(title),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adminLaws"] });
      toast.success("Law deleted");
    },
  });
  return (
    <div className="space-y-4">
      <h2 className="font-bold text-lg" style={{ color: "#2B1236" }}>
        Laws ({laws.length})
      </h2>
      <div className="rounded-xl border p-4 bg-white space-y-3">
        <h3 className="font-medium">Add / Update Law</h3>
        <Input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <Textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <Button
          onClick={() => add.mutate()}
          disabled={!form.title.trim() || !form.description.trim()}
        >
          Save Law
        </Button>
      </div>
      {laws.map((l: Law) => (
        <div
          key={l.title}
          className="rounded-xl border p-4 bg-white flex justify-between items-start gap-3"
        >
          <div>
            <p className="font-medium text-sm">{l.title}</p>
            <p className="text-xs text-muted-foreground">{l.category}</p>
          </div>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => del.mutate(l.title)}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      ))}
    </div>
  );
}

function HelplinesTab({ actor, qc }: { actor: any; qc: any }) {
  const { data: helplines = [] } = useQuery({
    queryKey: ["adminHelplines"],
    queryFn: () => actor?.getAllHelplines(),
    enabled: !!actor,
  });
  const [form, setForm] = useState({ name: "", number: "", category: "" });
  const add = useMutation({
    mutationFn: () =>
      actor!.addOrUpdateHelpline(form.name, form.number, form.category),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adminHelplines"] });
      setForm({ name: "", number: "", category: "" });
      toast.success("Helpline saved");
    },
  });
  const del = useMutation({
    mutationFn: (name: string) => actor!.deleteHelpline(name),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adminHelplines"] });
      toast.success("Helpline deleted");
    },
  });
  return (
    <div className="space-y-4">
      <h2 className="font-bold text-lg" style={{ color: "#2B1236" }}>
        Helplines ({helplines.length})
      </h2>
      <div className="rounded-xl border p-4 bg-white space-y-3">
        <h3 className="font-medium">Add / Update Helpline</h3>
        <Input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          placeholder="Number"
          value={form.number}
          onChange={(e) => setForm({ ...form, number: e.target.value })}
        />
        <Input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <Button
          onClick={() => add.mutate()}
          disabled={!form.name.trim() || !form.number.trim()}
        >
          Save Helpline
        </Button>
      </div>
      {helplines.map((h: Helpline) => (
        <div
          key={h.name}
          className="rounded-xl border p-4 bg-white flex justify-between items-center"
        >
          <div>
            <p className="font-medium text-sm">
              {h.name} — {h.number}
            </p>
            <p className="text-xs text-muted-foreground">{h.category}</p>
          </div>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => del.mutate(h.name)}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      ))}
    </div>
  );
}

function ChatbotTab({ actor, qc }: { actor: any; qc: any }) {
  const { data: rules = [] } = useQuery({
    queryKey: ["adminChatbotRules"],
    queryFn: () => actor?.getAllChatbotRules(),
    enabled: !!actor,
  });
  const [form, setForm] = useState({ id: "", keywords: "", response: "" });
  const add = useMutation({
    mutationFn: () =>
      actor!.addOrUpdateChatbotRule(
        form.id,
        form.keywords.split(",").map((k: string) => k.trim()),
        form.response,
      ),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adminChatbotRules", "chatbotRules"] });
      setForm({ id: "", keywords: "", response: "" });
      toast.success("Rule saved");
    },
  });
  const del = useMutation({
    mutationFn: (id: string) => actor!.deleteChatbotRule(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adminChatbotRules", "chatbotRules"] });
      toast.success("Rule deleted");
    },
  });
  return (
    <div className="space-y-4">
      <h2 className="font-bold text-lg" style={{ color: "#2B1236" }}>
        Chatbot Rules ({rules.length})
      </h2>
      <div className="rounded-xl border p-4 bg-white space-y-3">
        <h3 className="font-medium">Add / Update Rule</h3>
        <Input
          placeholder="Rule ID (unique)"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
        />
        <Input
          placeholder="Keywords (comma-separated)"
          value={form.keywords}
          onChange={(e) => setForm({ ...form, keywords: e.target.value })}
        />
        <Textarea
          placeholder="Bot Response"
          value={form.response}
          onChange={(e) => setForm({ ...form, response: e.target.value })}
        />
        <Button
          onClick={() => add.mutate()}
          disabled={
            !form.id.trim() || !form.keywords.trim() || !form.response.trim()
          }
        >
          Save Rule
        </Button>
      </div>
      {rules.map((r: ChatbotRule) => (
        <div key={r.id} className="rounded-xl border p-4 bg-white">
          <div className="flex justify-between items-start mb-2">
            <p className="font-medium text-sm">{r.id}</p>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => del.mutate(r.id)}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mb-1">
            Keywords: {r.keywords.join(", ")}
          </p>
          <p className="text-sm line-clamp-2">{r.response}</p>
        </div>
      ))}
    </div>
  );
}

function FAQTab({ actor, qc }: { actor: any; qc: any }) {
  const { data: faqs = [] } = useQuery({
    queryKey: ["adminFAQs"],
    queryFn: () => actor?.getAllFAQs(),
    enabled: !!actor,
  });
  const [form, setForm] = useState({
    id: "",
    question: "",
    answer: "",
    category: "",
  });
  const add = useMutation({
    mutationFn: () =>
      actor!.addOrUpdateFAQ(form.id, form.question, form.answer, form.category),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adminFAQs", "faqs"] });
      setForm({ id: "", question: "", answer: "", category: "" });
      toast.success("FAQ saved");
    },
  });
  const del = useMutation({
    mutationFn: (id: string) => actor!.deleteFAQ(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adminFAQs", "faqs"] });
      toast.success("FAQ deleted");
    },
  });
  return (
    <div className="space-y-4">
      <h2 className="font-bold text-lg" style={{ color: "#2B1236" }}>
        FAQs ({faqs.length})
      </h2>
      <div className="rounded-xl border p-4 bg-white space-y-3">
        <h3 className="font-medium">Add / Update FAQ</h3>
        <Input
          placeholder="ID (unique)"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
        />
        <Input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <Input
          placeholder="Question"
          value={form.question}
          onChange={(e) => setForm({ ...form, question: e.target.value })}
        />
        <Textarea
          placeholder="Answer"
          value={form.answer}
          onChange={(e) => setForm({ ...form, answer: e.target.value })}
        />
        <Button
          onClick={() => add.mutate()}
          disabled={
            !form.id.trim() || !form.question.trim() || !form.answer.trim()
          }
        >
          Save FAQ
        </Button>
      </div>
      {faqs.map((f: FAQType) => (
        <div key={f.id} className="rounded-xl border p-4 bg-white">
          <div className="flex justify-between items-start mb-1">
            <p className="font-medium text-sm">{f.question}</p>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => del.mutate(f.id)}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">{f.answer}</p>
        </div>
      ))}
    </div>
  );
}

function ResourcesTab({ actor, qc }: { actor: any; qc: any }) {
  const { data: resources = [] } = useQuery({
    queryKey: ["adminResources"],
    queryFn: () => actor?.getAllResources(),
    enabled: !!actor,
  });
  const [form, setForm] = useState({
    id: "",
    name: "",
    resourceType: "",
    location: "",
    contact: "",
    description: "",
  });
  const add = useMutation({
    mutationFn: () =>
      actor!.addOrUpdateResource(
        form.id,
        form.name,
        form.resourceType,
        form.location,
        form.contact,
        form.description,
      ),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adminResources", "resources"] });
      setForm({
        id: "",
        name: "",
        resourceType: "",
        location: "",
        contact: "",
        description: "",
      });
      toast.success("Resource saved");
    },
  });
  const del = useMutation({
    mutationFn: (id: string) => actor!.deleteResource(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adminResources", "resources"] });
      toast.success("Resource deleted");
    },
  });
  return (
    <div className="space-y-4">
      <h2 className="font-bold text-lg" style={{ color: "#2B1236" }}>
        Resources ({resources.length})
      </h2>
      <div className="rounded-xl border p-4 bg-white space-y-3">
        <h3 className="font-medium">Add / Update Resource</h3>
        <Input
          placeholder="ID"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
        />
        <Input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          placeholder="Type (shelter/ngo/legal)"
          value={form.resourceType}
          onChange={(e) => setForm({ ...form, resourceType: e.target.value })}
        />
        <Input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <Input
          placeholder="Contact"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
        />
        <Textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <Button
          onClick={() => add.mutate()}
          disabled={!form.id.trim() || !form.name.trim()}
        >
          Save Resource
        </Button>
      </div>
      {resources.map((r: Resource) => (
        <div
          key={r.id}
          className="rounded-xl border p-4 bg-white flex justify-between items-start"
        >
          <div>
            <p className="font-medium text-sm">{r.name}</p>
            <p className="text-xs text-muted-foreground">
              {r.resourceType} • {r.location}
            </p>
          </div>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => del.mutate(r.id)}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      ))}
    </div>
  );
}
