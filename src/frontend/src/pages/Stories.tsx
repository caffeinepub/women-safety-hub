import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Clock, Heart, PenLine } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Story } from "../backend";

function formatDate(ts: bigint) {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Stories() {
  const { actor } = useActor();
  const qc = useQueryClient();
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [content, setContent] = useState("");

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["approvedStories"],
    queryFn: () => actor!.getApprovedStories(),
    enabled: !!actor,
  });

  const { mutate: submit, isPending } = useMutation({
    mutationFn: (text: string) => actor!.addStory(text),
    onSuccess: () => {
      setContent("");
      qc.invalidateQueries({ queryKey: ["approvedStories"] });
      toast.success("Story submitted for review. Thank you for sharing!");
    },
    onError: () => toast.error("Failed to submit. Please try again."),
  });

  const toggleExpand = (id: bigint) =>
    setExpanded((prev) => {
      const s = new Set(prev);
      const n = Number(id);
      s.has(n) ? s.delete(n) : s.add(n);
      return s;
    });

  return (
    <div className="py-8 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1
          className="text-3xl font-extrabold mb-2"
          style={{ color: "#2B1236" }}
        >
          Stories of Strength
        </h1>
        <p className="text-muted-foreground">
          Anonymous stories from women who found courage. Your story can inspire
          others.
        </p>
      </div>

      {isLoading && (
        <p className="text-center text-muted-foreground">Loading stories…</p>
      )}

      {!isLoading && stories.length === 0 && (
        <div
          className="text-center py-12 rounded-2xl border mb-8"
          style={{ background: "#faf9fd" }}
        >
          <Heart
            className="w-12 h-12 mx-auto mb-3"
            style={{ color: "#F3A0A8" }}
          />
          <p className="text-muted-foreground">
            No stories yet. Be the first to share yours.
          </p>
        </div>
      )}

      <div className="space-y-4 mb-10">
        {stories.map((story: Story) => {
          const isExp = expanded.has(Number(story.id));
          const preview = story.content.slice(0, 200);
          const hasMore = story.content.length > 200;
          return (
            <motion.div
              key={String(story.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl p-5 border"
              style={{ background: "white" }}
            >
              <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatDate(story.timestamp)}</span>
                <span
                  className="ml-auto text-xs px-2 py-0.5 rounded-full"
                  style={{ background: "#e8e5ff", color: "#2B1236" }}
                >
                  Anonymous
                </span>
              </div>
              <p className="text-sm leading-relaxed">
                {isExp ? story.content : preview}
                {!isExp && hasMore && "…"}
              </p>
              {hasMore && (
                <button
                  type="button"
                  onClick={() => toggleExpand(story.id)}
                  className="mt-2 text-xs font-medium"
                  style={{ color: "#2B1236" }}
                >
                  {isExp ? "Show less" : "Read more"}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="rounded-2xl border p-6" style={{ background: "#faf9fd" }}>
        <h2
          className="text-xl font-bold mb-2 flex items-center gap-2"
          style={{ color: "#2B1236" }}
        >
          <PenLine className="w-5 h-5" /> Share Your Story
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Your story will be reviewed before being published. No personal
          information required.
        </p>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your experience anonymously…"
          className="mb-4 min-h-[120px]"
        />
        <Button
          disabled={!content.trim() || isPending || !actor}
          onClick={() => submit(content.trim())}
          style={{
            background: "linear-gradient(135deg, #2B1236, #3A1A4C)",
            color: "white",
          }}
        >
          {isPending ? "Submitting…" : "Submit Anonymously"}
        </Button>
      </div>
    </div>
  );
}
