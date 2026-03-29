import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useActor } from "@/hooks/useActor";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle, RotateCcw, Trophy, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { QuizQuestion } from "../backend";

const FALLBACK_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "What is the national emergency number in India?",
    options: ["100", "112", "1091", "181"],
    correctIndex: 1n,
    explanation:
      "112 is the national emergency number connecting to police, ambulance, and fire services.",
  },
  {
    id: "q2",
    question: "Which act protects women at the workplace?",
    options: [
      "Dowry Prohibition Act",
      "POSH Act 2013",
      "IPC Section 498A",
      "POCSO Act",
    ],
    correctIndex: 1n,
    explanation:
      "The Sexual Harassment of Women at Workplace (POSH) Act 2013 protects women from harassment at work.",
  },
  {
    id: "q3",
    question: "What is the women helpline number?",
    options: ["100", "1091", "181", "1098"],
    correctIndex: 1n,
    explanation: "1091 is the dedicated Women Helpline number across India.",
  },
  {
    id: "q4",
    question: "Under which act is domestic violence addressed?",
    options: [
      "IPC Section 302",
      "Dowry Prohibition Act",
      "DV Act 2005",
      "RTI Act",
    ],
    correctIndex: 2n,
    explanation:
      "The Protection of Women from Domestic Violence Act 2005 addresses domestic violence.",
  },
  {
    id: "q5",
    question: "Can a woman file an FIR at any police station?",
    options: [
      "No, only in her jurisdiction",
      "Yes, anywhere in India",
      "Only with permission",
      "Only in metro cities",
    ],
    correctIndex: 1n,
    explanation:
      "As per Supreme Court guidelines, a woman can file an FIR at any police station regardless of jurisdiction.",
  },
];

export default function Quiz() {
  const { actor } = useActor();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);

  const { data: questions = FALLBACK_QUESTIONS } = useQuery({
    queryKey: ["quizQuestions"],
    queryFn: async () => {
      const q = await actor!.getAllQuizQuestions();
      return q.length > 0 ? q : FALLBACK_QUESTIONS;
    },
    enabled: !!actor,
  });

  const q = questions[current];
  const total = questions.length;

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === Number(q.correctIndex)) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= total) {
      setFinished(true);
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
    setAnswered(false);
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswered(false);
  };

  if (finished) {
    return (
      <div className="py-16 px-4 max-w-lg mx-auto text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <Trophy
            className="w-16 h-16 mx-auto mb-4"
            style={{ color: "#F3A0A8" }}
          />
          <h1
            className="text-3xl font-extrabold mb-2"
            style={{ color: "#2B1236" }}
          >
            Quiz Complete!
          </h1>
          <p className="text-muted-foreground mb-6">
            You scored{" "}
            <strong className="text-xl" style={{ color: "#2B1236" }}>
              {score}/{total}
            </strong>
          </p>
          <div
            className="rounded-2xl p-6 mb-6"
            style={{ background: score >= total * 0.7 ? "#d4edda" : "#fff3cd" }}
          >
            <p className="font-medium">
              {score >= total * 0.7
                ? "🎉 Excellent! You know your rights well."
                : "📚 Keep learning — knowledge is your best protection."}
            </p>
          </div>
          <Button onClick={restart} className="gap-2">
            <RotateCcw className="w-4 h-4" /> Try Again
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1
          className="text-3xl font-extrabold mb-2"
          style={{ color: "#2B1236" }}
        >
          Know Your Rights Quiz
        </h1>
        <p className="text-muted-foreground">
          Test your knowledge of women's legal rights in India
        </p>
      </div>

      <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Question {current + 1} of {total}
        </span>
        <span>Score: {score}</span>
      </div>
      <Progress value={((current + 1) / total) * 100} className="mb-6" />

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
        >
          <div
            className="rounded-2xl p-6 mb-4"
            style={{ background: "#faf9fd", border: "1px solid #e5e7eb" }}
          >
            <h2 className="text-lg font-bold mb-4" style={{ color: "#2B1236" }}>
              {q.question}
            </h2>
            <div className="grid gap-3">
              {q.options.map((opt, idx) => {
                let bg = "white";
                let border = "1px solid #e5e7eb";
                if (answered) {
                  if (idx === Number(q.correctIndex)) {
                    bg = "#d4edda";
                    border = "1px solid #28a745";
                  } else if (idx === selected) {
                    bg = "#f8d7da";
                    border = "1px solid #dc3545";
                  }
                }
                return (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => handleSelect(idx)}
                    className="flex items-center gap-3 p-4 rounded-xl text-left transition-all hover:shadow-sm"
                    style={{
                      background: bg,
                      border,
                      cursor: answered ? "default" : "pointer",
                    }}
                  >
                    {answered && idx === Number(q.correctIndex) && (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    )}
                    {answered &&
                      idx === selected &&
                      idx !== Number(q.correctIndex) && (
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      )}
                    {(!answered ||
                      (idx !== Number(q.correctIndex) && idx !== selected)) && (
                      <span
                        className="w-5 h-5 rounded-full border-2 flex-shrink-0"
                        style={{ borderColor: "#D7D3FF" }}
                      />
                    )}
                    <span className="text-sm font-medium">{opt}</span>
                  </button>
                );
              })}
            </div>
            {answered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl text-sm"
                style={{ background: "#e8e5ff", color: "#2B1236" }}
              >
                💡 {q.explanation}
              </motion.div>
            )}
          </div>
          {answered && (
            <Button
              onClick={handleNext}
              className="w-full"
              style={{
                background: "linear-gradient(135deg, #2B1236, #3A1A4C)",
                color: "white",
              }}
            >
              {current + 1 >= total ? "See Results" : "Next Question"}
            </Button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
