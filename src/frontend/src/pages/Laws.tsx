import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  Baby,
  BookOpen,
  DollarSign,
  Gavel,
  GraduationCap,
  Heart,
  Scale,
  Shield,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const LAWS = [
  {
    id: "pocso",
    icon: Shield,
    title: "POCSO Act, 2012",
    year: "2012",
    badge: "Child Protection",
    badgeColor: "bg-purple-100 text-purple-800",
    description:
      "Protection of Children from Sexual Offences Act provides comprehensive measures for the protection of children from sexual abuse and exploitation.",
    provisions: [
      "Defines sexual assault, sexual harassment, and pornography involving children",
      "Establishes Special Courts for speedy trial of offences",
      "Mandatory reporting by any person who has knowledge of such offence",
      "Child-friendly procedures for recording statements",
      "Stringent punishments including life imprisonment for aggravated offences",
    ],
  },
  {
    id: "dva",
    icon: Heart,
    title: "Domestic Violence Act, 2005",
    year: "2005",
    badge: "Domestic Safety",
    badgeColor: "bg-pink-100 text-pink-800",
    description:
      "Protection of Women from Domestic Violence Act covers physical, sexual, verbal, emotional, and economic abuse within households and live-in relationships.",
    provisions: [
      "Broad definition of domestic violence including emotional and economic abuse",
      "Right to reside in shared household",
      "Protection orders, residence orders, and monetary relief",
      "Appointment of Protection Officers in each district",
      "Fast-track courts for filing applications",
    ],
  },
  {
    id: "dowry",
    icon: Scale,
    title: "Anti-Dowry Law (Dowry Prohibition Act, 1961)",
    year: "1961",
    badge: "Anti-Dowry",
    badgeColor: "bg-orange-100 text-orange-800",
    description:
      "Prohibits the giving or taking of dowry in connection with marriage, with stringent penalties for violations.",
    provisions: [
      "Giving or taking dowry is punishable with up to 5 years imprisonment",
      "Dowry Prohibition Officers appointed by state governments",
      "Agreement to give or take dowry is void",
      "Any gifts given at the time of marriage must be listed",
      "Enhanced punishment under IPC Section 304B for dowry deaths",
    ],
  },
  {
    id: "posh",
    icon: Users,
    title: "POSH Act, 2013",
    year: "2013",
    badge: "Workplace Safety",
    badgeColor: "bg-blue-100 text-blue-800",
    description:
      "Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act mandates prevention and protection measures at workplaces.",
    provisions: [
      "Mandatory Internal Complaints Committee (ICC) for organizations with 10+ employees",
      "Local Complaints Committee for unorganized sector",
      "Employer duty to provide safe working environment",
      "Compensation and protection from retaliation for complainants",
      "Annual report submission to district officer",
    ],
  },
  {
    id: "ipc354",
    icon: Gavel,
    title: "IPC Section 354 \u2013 Outrage of Modesty",
    year: "1860",
    badge: "IPC",
    badgeColor: "bg-red-100 text-red-800",
    description:
      "Assault or criminal force to outrage modesty of a woman. Amended in 2013 to include stalking and voyeurism as specific offences.",
    provisions: [
      "Imprisonment not less than 1 year, may extend to 5 years",
      "354A: Sexual harassment and punishment for sexual harassment",
      "354B: Disrobing a woman \u2014 minimum 3 years imprisonment",
      "354C: Voyeurism \u2014 1 to 3 years for first conviction",
      "354D: Stalking \u2014 imprisonment up to 3 years for first offence",
    ],
  },
  {
    id: "ipc498a",
    icon: AlertCircle,
    title: "IPC Section 498A \u2013 Cruelty by Husband",
    year: "1983",
    badge: "IPC",
    badgeColor: "bg-red-100 text-red-800",
    description:
      "Deals with cruelty by husband or his relatives. Cognizable, non-bailable offence that can be registered at any police station.",
    provisions: [
      "Covers physical, mental, and emotional cruelty",
      "Imprisonment up to 3 years plus fine",
      "Cognizable and non-bailable offence",
      "Complaint can be filed by victim or her relative",
      "Magistrate has power to grant maintenance",
    ],
  },
  {
    id: "rape",
    icon: Shield,
    title: "Rape Laws (IPC Section 375/376)",
    year: "2013 (amended)",
    badge: "Criminal Law",
    badgeColor: "bg-red-100 text-red-800",
    description:
      "Comprehensive laws against rape, amended significantly after the Nirbhaya case in 2013 with stricter punishments and expanded definitions.",
    provisions: [
      "Expanded definition of rape beyond penetration",
      "Minimum 7 years imprisonment, may extend to life",
      "Death penalty for repeat offenders and gang rape",
      "Fast track courts for rape cases",
      "One-stop crisis centers for rape survivors",
    ],
  },
  {
    id: "rte",
    icon: GraduationCap,
    title: "Right to Education Act, 2009",
    year: "2009",
    badge: "Education",
    badgeColor: "bg-green-100 text-green-800",
    description:
      "Provides free and compulsory education to all children aged 6\u201314 years, with special provisions for girl child education.",
    provisions: [
      "Free and compulsory education for all children aged 6-14",
      "25% seats reserved for economically weaker sections",
      "No detention policy up to Class VIII",
      "Prohibition of corporal punishment and mental harassment",
      "Special training for out-of-school children",
    ],
  },
  {
    id: "equalpay",
    icon: DollarSign,
    title: "Equal Remuneration Act, 1976",
    year: "1976",
    badge: "Equal Pay",
    badgeColor: "bg-yellow-100 text-yellow-800",
    description:
      "Provides for payment of equal remuneration to men and women workers and prevents discrimination on grounds of sex.",
    provisions: [
      "Equal pay for equal work for both men and women",
      "No discrimination in recruitment and service conditions",
      "Employers required to maintain registers",
      "Advisory committees for promoting employment opportunities",
      "Fine and imprisonment for violations",
    ],
  },
  {
    id: "maternity",
    icon: Baby,
    title: "Maternity Benefit Act, 1961 (amended 2017)",
    year: "2017 (amended)",
    badge: "Maternity",
    badgeColor: "bg-teal-100 text-teal-800",
    description:
      "Regulates employment of women during maternity and provides maternity benefit and other related benefits.",
    provisions: [
      "26 weeks paid maternity leave for first two children",
      "12 weeks for third child and beyond",
      "12 weeks for adoptive mothers and commissioning mothers",
      "Work from home option after maternity leave",
      "Creche facility mandatory for establishments with 50+ employees",
    ],
  },
  {
    id: "bookmark",
    icon: BookOpen,
    title: "IPC Section 509 \u2013 Word, Gesture Insulting Modesty",
    year: "1860",
    badge: "IPC",
    badgeColor: "bg-red-100 text-red-800",
    description:
      "Punishes any word, sound, gesture, or object intended to insult the modesty of a woman or intrude on her privacy.",
    provisions: [
      "Simple imprisonment up to 3 years or fine or both",
      "Covers verbal, visual, and physical gestures",
      "Applicable in public spaces and online",
      "Complaint can be filed by the victim directly",
      "Amended in 2013 to increase punishment",
    ],
  },
];

export default function Laws() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium mb-4"
            style={{
              background: "linear-gradient(135deg, #D7D3FF, #CFC8FF)",
              color: "#2B1236",
            }}
          >
            <Scale className="w-4 h-4" />
            Legal Rights &amp; Protections
          </div>
          <h1
            className="text-4xl font-extrabold mb-3"
            style={{ color: "#2B1236" }}
          >
            Know Your Laws
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Awareness of your legal rights is the most powerful tool. Here are
            the key laws protecting women in India.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {LAWS.map((law, i) => (
              <AccordionItem
                key={law.id}
                value={law.id}
                className="bg-card rounded-2xl shadow-card border-0 overflow-hidden"
                data-ocid={`laws.item.${i + 1}`}
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4 text-left">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "linear-gradient(135deg, #D7D3FF, #CFC8FF)",
                      }}
                    >
                      <law.icon
                        className="w-5 h-5"
                        style={{ color: "#2B1236" }}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="font-bold text-base"
                          style={{ color: "#2B1236" }}
                        >
                          {law.title}
                        </span>
                        <Badge
                          className={`text-xs font-medium px-2 py-0.5 rounded-full border-0 ${law.badgeColor}`}
                        >
                          {law.badge}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Enacted: {law.year}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {law.description}
                  </p>
                  <div>
                    <p
                      className="text-xs font-bold uppercase tracking-wider mb-3"
                      style={{ color: "#2B1236" }}
                    >
                      Key Provisions
                    </p>
                    <ul className="space-y-2">
                      {law.provisions.map((p, j) => (
                        <li
                          key={p.slice(0, 20)}
                          className="flex items-start gap-2 text-sm"
                        >
                          <span
                            className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5"
                            style={{
                              background:
                                "linear-gradient(135deg, #F3A0A8, #f07b87)",
                              color: "#2B1236",
                            }}
                          >
                            {j + 1}
                          </span>
                          <span className="text-foreground">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 p-5 rounded-2xl border text-sm text-muted-foreground"
          style={{ background: "#fff8f8", borderColor: "#F3A0A8" }}
        >
          <strong style={{ color: "#2B1236" }}>Disclaimer:</strong> This
          information is for educational purposes only. For legal advice
          specific to your situation, consult a qualified lawyer.
        </motion.div>
      </div>
    </div>
  );
}
