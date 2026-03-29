import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { useActor } from "@/hooks/useActor";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import type { FAQ as FAQType } from "../backend";

const FALLBACK: FAQType[] = [
  {
    id: "1",
    question: "What should I do if I face harassment at workplace?",
    answer:
      "File a complaint with the Internal Complaints Committee (ICC) under the POSH Act 2013. Every organization with 10+ employees must have an ICC.",
    category: "workplace",
  },
  {
    id: "2",
    question: "How can I file a complaint against domestic violence?",
    answer:
      "You can file a complaint under the DV Act 2005 at the nearest police station or approach a Protection Officer or Magistrate.",
    category: "domestic_violence",
  },
  {
    id: "3",
    question: "What is the punishment for dowry harassment?",
    answer:
      "Dowry demand is punishable under Section 304B IPC with imprisonment up to 7 years. Dowry death can lead to life imprisonment.",
    category: "legal",
  },
  {
    id: "4",
    question: "Can I file a complaint online?",
    answer:
      "Yes, many states offer online complaint filing. You can also use the National Cyber Crime Reporting Portal at cybercrime.gov.in for cyber crimes.",
    category: "general",
  },
  {
    id: "5",
    question: "What are my rights during police investigation?",
    answer:
      "You have the right to be informed about the progress, right to privacy, right to free legal aid, and right to be treated with dignity. Female officers should be present during questioning.",
    category: "legal",
  },
  {
    id: "6",
    question: "Where can I get free legal help?",
    answer:
      "Contact NALSA (National Legal Services Authority) at 15100 for free legal aid. Every district has a District Legal Services Authority providing free legal assistance.",
    category: "legal",
  },
];

const categoryLabels: Record<string, string> = {
  general: "General",
  legal: "Legal",
  workplace: "Workplace",
  domestic_violence: "Domestic Violence",
  cyber: "Cyber Safety",
};

export default function FAQ() {
  const { actor } = useActor();
  const [search, setSearch] = useState("");

  const { data: faqs } = useQuery({
    queryKey: ["faqs"],
    queryFn: () => actor!.getAllFAQs(),
    enabled: !!actor,
  });

  const allFaqs = faqs && faqs.length > 0 ? faqs : FALLBACK;
  const filtered = allFaqs.filter(
    (f) =>
      !search ||
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase()),
  );

  const grouped = filtered.reduce<Record<string, FAQType[]>>((acc, f) => {
    const cat = f.category || "general";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(f);
    return acc;
  }, {});

  return (
    <div className="py-8 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1
          className="text-3xl font-extrabold mb-2"
          style={{ color: "#2B1236" }}
        >
          Frequently Asked Questions
        </h1>
        <p className="text-muted-foreground">
          Find answers to common questions about women's safety and rights
        </p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search FAQs…"
          className="pl-10"
        />
      </div>

      {Object.keys(grouped).length === 0 && (
        <p className="text-center text-muted-foreground">No FAQs found.</p>
      )}

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-1">
            {categoryLabels[category] || category}
          </h2>
          <Accordion type="multiple" className="space-y-2">
            {items.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="rounded-xl border bg-white px-4"
              >
                <AccordionTrigger
                  className="text-sm font-medium text-left"
                  style={{ color: "#2B1236" }}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}
