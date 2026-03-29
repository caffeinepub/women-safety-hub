import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Briefcase,
  Globe,
  Home,
  Plane,
  Printer,
  Smartphone,
  Zap,
} from "lucide-react";
import { useState } from "react";

const tips: Record<
  string,
  { icon: React.ReactNode; title: string; items: string[] }
> = {
  home: {
    icon: <Home className="w-4 h-4" />,
    title: "At Home",
    items: [
      "Keep emergency numbers (100, 112, 1091) saved and visible",
      "Install good quality locks on doors and windows",
      "Never open the door to strangers without verifying identity",
      "Share your daily schedule with a trusted person",
      "Keep a charged phone accessible at all times",
      "Know your neighbors — build a support network",
      "Have a safety plan: know exits and meeting points",
    ],
  },
  outside: {
    icon: <Globe className="w-4 h-4" />,
    title: "Outside",
    items: [
      "Stay in well-lit, populated areas especially at night",
      "Share your live location with a trusted contact",
      "Be aware of your surroundings — avoid distractions",
      "Trust your instincts: if something feels wrong, leave",
      "Prefer public transport or verified cabs over unknown rides",
      "Carry a personal alarm or whistle",
      "Walk confidently and maintain awareness",
    ],
  },
  online: {
    icon: <Smartphone className="w-4 h-4" />,
    title: "Online Safety",
    items: [
      "Use strong, unique passwords for all accounts",
      "Enable two-factor authentication everywhere",
      "Never share personal information with strangers online",
      "Report cyberbullying/harassment at cybercrime.gov.in or 1930",
      "Review privacy settings on social media regularly",
      "Avoid clicking suspicious links or downloading unknown files",
      "Be cautious about what you share publicly online",
    ],
  },
  selfDefense: {
    icon: <Zap className="w-4 h-4" />,
    title: "Self-Defense",
    items: [
      "Enroll in a basic self-defense class",
      "Carry legal personal safety items like a pepper spray (where permitted)",
      "Learn basic strikes: palm heel strike, elbow strike, knee strike",
      "Make noise — shout 'FIRE' or 'HELP' to attract attention",
      "Target vulnerable areas: eyes, nose, throat, groin if necessary",
      "Run away whenever possible — safety over confrontation",
      "Practice situational awareness daily",
    ],
  },
  travel: {
    icon: <Plane className="w-4 h-4" />,
    title: "Travel Safety",
    items: [
      "Research your destination before traveling",
      "Share itinerary with family or friends",
      "Keep copies of important documents separately",
      "Book verified accommodations and transportation",
      "Carry local emergency numbers of your destination",
      "Dress modestly and respectfully in new cultures",
      "Keep embassy/consulate contact handy when traveling abroad",
    ],
  },
  workplace: {
    icon: <Briefcase className="w-4 h-4" />,
    title: "Workplace",
    items: [
      "Know your company's POSH policy and ICC details",
      "Document any incidents: date, time, witnesses, messages",
      "Report harassment to ICC under the POSH Act 2013",
      "Keep HR contact and emergency numbers handy",
      "Trust colleagues you can rely on for support",
      "Avoid isolated areas or late-night work alone",
      "Use official communication channels for work discussions",
    ],
  },
};

const checklistItems = [
  "Emergency numbers saved on phone",
  "Trusted contact knows my daily schedule",
  "Self-defense basics learned",
  "Strong passwords on all accounts",
  "Know my legal rights",
  "Personal safety device (alarm/whistle) carried",
  "ICC contact at workplace known",
  "Safety app installed on phone",
  "Important documents backed up",
  "Neighbors/community network established",
];

export default function SafetyTips() {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setChecked((prev) => {
      const s = new Set(prev);
      s.has(i) ? s.delete(i) : s.add(i);
      return s;
    });

  return (
    <div className="py-8 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1
          className="text-3xl font-extrabold mb-2"
          style={{ color: "#2B1236" }}
        >
          Safety Tips & Guides
        </h1>
        <p className="text-muted-foreground">
          Practical safety advice for every situation
        </p>
      </div>

      <Tabs defaultValue="home" className="mb-10">
        <TabsList className="flex flex-wrap h-auto gap-1 mb-6">
          {Object.entries(tips).map(([key, val]) => (
            <TabsTrigger
              key={key}
              value={key}
              className="flex items-center gap-1.5"
            >
              {val.icon} {val.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(tips).map(([key, val]) => (
          <TabsContent key={key} value={key}>
            <div
              className="rounded-2xl border p-6"
              style={{ background: "#faf9fd" }}
            >
              <h2
                className="text-xl font-bold mb-4 flex items-center gap-2"
                style={{ color: "#2B1236" }}
              >
                {val.icon} {val.title}
              </h2>
              <ul className="space-y-3">
                {val.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span
                      className="mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                      style={{ background: "#F3A0A8", color: "#2B1236" }}
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="rounded-2xl border p-6" style={{ background: "#faf9fd" }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold" style={{ color: "#2B1236" }}>
            Personal Safety Checklist
          </h2>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg border"
          >
            <Printer className="w-4 h-4" /> Print
          </button>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {checked.size}/{checklistItems.length} completed
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="h-2 rounded-full transition-all"
            style={{
              width: `${(checked.size / checklistItems.length) * 100}%`,
              background: "linear-gradient(90deg, #F3A0A8, #f07b87)",
            }}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {checklistItems.map((item, i) => {
            const id = `checklist-item-${i}`;
            return (
              <div
                key={item}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${checked.has(i) ? "opacity-60" : ""}`}
                style={{ background: "white", border: "1px solid #e5e7eb" }}
                onClick={() => toggle(i)}
                onKeyDown={(e) => e.key === "Enter" && toggle(i)}
              >
                <Checkbox
                  id={id}
                  checked={checked.has(i)}
                  onCheckedChange={() => toggle(i)}
                />
                <label
                  htmlFor={id}
                  className={`text-sm cursor-pointer ${checked.has(i) ? "line-through text-muted-foreground" : ""}`}
                >
                  {item}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
