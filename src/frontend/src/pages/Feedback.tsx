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
import { useAddFeedback } from "@/hooks/useQueries";
import { CheckCircle, Loader2, MessageSquare } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const FEEDBACK_TYPES = [
  { value: "general", label: "General Feedback" },
  { value: "incident", label: "Report Incident" },
  { value: "suggestion", label: "Suggestion" },
  { value: "other", label: "Other" },
];

export default function Feedback() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("general");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { mutateAsync, isPending, isError } = useAddFeedback();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutateAsync({
      name,
      email,
      message: `[${type.toUpperCase()}] ${message}`,
    });
    setSubmitted(true);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setType("general");
    setMessage("");
    setSubmitted(false);
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium mb-4"
            style={{
              background: "linear-gradient(135deg, #F7D0C7, #F3BEB6)",
              color: "#2B1236",
            }}
          >
            <MessageSquare className="w-4 h-4" />
            Your Voice Matters
          </div>
          <h1
            className="text-4xl font-extrabold mb-3"
            style={{ color: "#2B1236" }}
          >
            Share Feedback
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Help us make empowerHER better. Your feedback helps us improve
            support for women.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-3xl shadow-card overflow-hidden"
        >
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="p-8 space-y-5"
              data-ocid="feedback.modal"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="name"
                    className="text-sm font-semibold"
                    style={{ color: "#2B1236" }}
                  >
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Priya Sharma"
                    required
                    className="rounded-xl"
                    data-ocid="feedback.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold"
                    style={{ color: "#2B1236" }}
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="priya@example.com"
                    required
                    className="rounded-xl"
                    data-ocid="feedback.input"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label
                  className="text-sm font-semibold"
                  style={{ color: "#2B1236" }}
                >
                  Feedback Type
                </Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger
                    className="rounded-xl"
                    data-ocid="feedback.select"
                  >
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {FEEDBACK_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="message"
                  className="text-sm font-semibold"
                  style={{ color: "#2B1236" }}
                >
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your experience, suggestions, or report an incident..."
                  rows={5}
                  required
                  className="rounded-xl resize-none"
                  data-ocid="feedback.textarea"
                />
              </div>
              {isError && (
                <div
                  className="p-4 rounded-xl text-sm"
                  style={{
                    background: "#fff0f0",
                    color: "#c0392b",
                    border: "1px solid #f5c6cb",
                  }}
                  data-ocid="feedback.error_state"
                >
                  Something went wrong. Please try again.
                </div>
              )}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full rounded-xl py-3 text-white font-semibold text-sm"
                style={{
                  background: "linear-gradient(135deg, #2B1236, #3A1A4C)",
                }}
                data-ocid="feedback.submit_button"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Feedback"
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Your feedback is stored securely on the blockchain. We respect
                your privacy.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 text-center"
              data-ocid="feedback.success_state"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  background: "linear-gradient(135deg, #D7D3FF, #CFC8FF)",
                }}
              >
                <CheckCircle
                  className="w-10 h-10"
                  style={{ color: "#2B1236" }}
                />
              </div>
              <h2
                className="text-2xl font-bold mb-2"
                style={{ color: "#2B1236" }}
              >
                Thank You!
              </h2>
              <p className="text-muted-foreground mb-6">
                Your feedback has been submitted. We appreciate you helping us
                improve empowerHER.
              </p>
              <Button
                onClick={handleReset}
                className="rounded-xl px-8 font-semibold"
                style={{
                  background: "linear-gradient(135deg, #F3A0A8, #f07b87)",
                  color: "#2B1236",
                }}
                data-ocid="feedback.secondary_button"
              >
                Submit Another
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
