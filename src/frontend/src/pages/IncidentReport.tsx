import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const incidentTypes = [
  "Physical",
  "Verbal",
  "Cyber",
  "Domestic",
  "Workplace",
  "Sexual",
  "Stalking",
  "Other",
];

export default function IncidentReport() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    description: "",
    location: "",
    incidentType: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      actor!.addIncidentReport(
        form.description,
        form.location,
        form.incidentType,
      ),
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: () => toast.error("Failed to submit. Please try again."),
  });

  if (submitted) {
    return (
      <div className="py-16 px-4 max-w-md mx-auto text-center">
        <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
        <h1 className="text-2xl font-bold mb-2" style={{ color: "#2B1236" }}>
          Report Submitted
        </h1>
        <p className="text-muted-foreground mb-6">
          Your incident report has been submitted securely. It will be reviewed
          by our team. You can also contact helplines for immediate support.
        </p>
        <div
          className="rounded-xl p-4 mb-6"
          style={{ background: "#faf9fd", border: "1px solid #e5e7eb" }}
        >
          <p className="text-sm font-medium mb-2">Need immediate help?</p>
          <p className="text-sm">
            📞 Women Helpline: <strong>1091</strong>
          </p>
          <p className="text-sm">
            📞 National Emergency: <strong>112</strong>
          </p>
        </div>
        <Button
          onClick={() => {
            setSubmitted(false);
            setForm({ description: "", location: "", incidentType: "" });
          }}
          variant="outline"
        >
          Submit Another Report
        </Button>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1
          className="text-3xl font-extrabold mb-2 flex items-center justify-center gap-2"
          style={{ color: "#2B1236" }}
        >
          <FileText className="w-7 h-7" /> Incident Report
        </h1>
        <p className="text-muted-foreground">
          Submit an incident report securely and anonymously. This helps
          document incidents for further action.
        </p>
      </div>

      <div className="rounded-2xl border p-6" style={{ background: "#faf9fd" }}>
        <div className="space-y-5">
          <div>
            <Label className="mb-1.5 block">Incident Type *</Label>
            <Select
              value={form.incidentType}
              onValueChange={(v) => setForm({ ...form, incidentType: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select incident type" />
              </SelectTrigger>
              <SelectContent>
                {incidentTypes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-1.5 block">Location (City/Area)</Label>
            <Input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="e.g. Sector 12, Noida or Mumbai Central"
            />
          </div>

          <div>
            <Label className="mb-1.5 block">Description *</Label>
            <Textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Describe what happened. Include as much detail as you feel comfortable sharing."
              className="min-h-[140px]"
            />
          </div>

          <div
            className="rounded-xl p-4 text-sm"
            style={{ background: "#e8e5ff", color: "#2B1236" }}
          >
            🔒 Your report is stored securely on the blockchain. No personal
            information is required.
          </div>

          <Button
            onClick={() => mutate()}
            disabled={
              !form.description.trim() ||
              !form.incidentType ||
              isPending ||
              !actor
            }
            className="w-full"
            style={{
              background: "linear-gradient(135deg, #2B1236, #3A1A4C)",
              color: "white",
            }}
          >
            {isPending ? "Submitting…" : "Submit Report"}
          </Button>
        </div>
      </div>
    </div>
  );
}
