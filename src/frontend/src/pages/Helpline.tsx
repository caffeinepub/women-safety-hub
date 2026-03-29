import {
  AlertTriangle,
  Baby,
  Heart,
  MapPin,
  Monitor,
  Phone,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";

const CATEGORIES = [
  {
    id: "emergency",
    title: "Emergency Helplines",
    icon: AlertTriangle,
    dark: true,
    bgColor: "linear-gradient(135deg, #2B1236, #3A1A4C)",
    numbers: [
      {
        name: "Police",
        number: "100",
        available: "24/7",
        description: "Immediate police assistance",
      },
      {
        name: "Ambulance",
        number: "108",
        available: "24/7",
        description: "Medical emergency services",
      },
      {
        name: "Women Helpline",
        number: "1091",
        available: "24/7",
        description: "Dedicated women's helpline",
      },
      {
        name: "National Emergency",
        number: "112",
        available: "24/7",
        description: "Single emergency number",
      },
    ],
  },
  {
    id: "domestic",
    title: "Domestic Violence Support",
    icon: Heart,
    dark: false,
    bgColor: "linear-gradient(135deg, #F7D0C7, #F3BEB6)",
    numbers: [
      {
        name: "iCall (TISS)",
        number: "9152987821",
        available: "Mon\u2013Sat, 8am\u201310pm",
        description: "Psychosocial support & counseling",
      },
      {
        name: "Snehi",
        number: "044-24640050",
        available: "Daily, 8am\u201310pm",
        description: "Emotional support helpline",
      },
      {
        name: "NCW Helpline",
        number: "7827170170",
        available: "Mon\u2013Sat, 9am\u20135pm",
        description: "National Commission for Women",
      },
      {
        name: "Shakti Shalini",
        number: "10920",
        available: "24/7",
        description: "Domestic violence refuge & support",
      },
    ],
  },
  {
    id: "cyber",
    title: "Cyber Crime & Digital Safety",
    icon: Monitor,
    dark: false,
    bgColor: "linear-gradient(135deg, #D7D3FF, #CFC8FF)",
    numbers: [
      {
        name: "Cyber Crime Helpline",
        number: "1930",
        available: "24/7",
        description: "Report cybercrime & online fraud",
      },
      {
        name: "Cyber Crime Portal",
        number: "cybercrime.gov.in",
        available: "Online",
        description: "File online complaint",
      },
    ],
  },
  {
    id: "child",
    title: "Child & Youth Safety",
    icon: Baby,
    dark: false,
    bgColor: "linear-gradient(135deg, #fef3c7, #fde68a)",
    numbers: [
      {
        name: "Childline India",
        number: "1098",
        available: "24/7",
        description: "For children in distress",
      },
      {
        name: "POCSO e-Box",
        number: "pocsoebox-ncpcr.gov.in",
        available: "Online",
        description: "Report child sexual abuse",
      },
    ],
  },
  {
    id: "legal",
    title: "Legal Aid & Support",
    icon: Shield,
    dark: false,
    bgColor: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
    numbers: [
      {
        name: "NALSA Legal Aid",
        number: "15100",
        available: "Mon\u2013Fri, 10am\u20135pm",
        description: "Free legal services",
      },
      {
        name: "SC Legal Aid",
        number: "011-23073475",
        available: "Mon\u2013Fri, 10am\u20135pm",
        description: "Supreme Court legal aid",
      },
    ],
  },
];

const STATE_HELPLINES = [
  { state: "Delhi", number: "181" },
  { state: "Maharashtra", number: "103" },
  { state: "Karnataka", number: "181" },
  { state: "Tamil Nadu", number: "181" },
  { state: "Uttar Pradesh", number: "1090" },
  { state: "Rajasthan", number: "181" },
  { state: "Gujarat", number: "181" },
  { state: "West Bengal", number: "181" },
  { state: "Andhra Pradesh", number: "181" },
  { state: "Punjab", number: "181" },
  { state: "Haryana", number: "1091" },
  { state: "Kerala", number: "1056" },
];

export default function Helpline() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium mb-4"
            style={{
              background: "linear-gradient(135deg, #F7D0C7, #F3BEB6)",
              color: "#2B1236",
            }}
          >
            <Phone className="w-4 h-4" />
            Emergency Contacts
          </div>
          <h1
            className="text-4xl font-extrabold mb-3"
            style={{ color: "#2B1236" }}
          >
            Helpline Numbers
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Save these numbers. Share them. They could save a life. All
            helplines are free to call from any phone.
          </p>
        </motion.div>

        <div className="space-y-10">
          {CATEGORIES.map((cat, ci) => (
            <motion.section
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.05 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #D7D3FF, #CFC8FF)",
                  }}
                >
                  <cat.icon className="w-5 h-5" style={{ color: "#2B1236" }} />
                </div>
                <h2 className="text-xl font-bold" style={{ color: "#2B1236" }}>
                  {cat.title}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cat.numbers.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="helpline-card rounded-2xl p-5 transition-all duration-300"
                    style={{ background: cat.bgColor }}
                    data-ocid={`helpline.${cat.id}.item.${i + 1}`}
                  >
                    <p
                      className="text-sm font-semibold mb-1"
                      style={{
                        color: cat.dark
                          ? "rgba(255,255,255,0.7)"
                          : "rgba(43,18,54,0.7)",
                      }}
                    >
                      {item.name}
                    </p>
                    <a
                      href={
                        /^\d/.test(item.number)
                          ? `tel:${item.number}`
                          : `https://${item.number}`
                      }
                      target={/^\d/.test(item.number) ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="block text-2xl font-extrabold mb-2 hover:scale-105 inline-block transition-transform"
                      style={{ color: cat.dark ? "#F3A0A8" : "#2B1236" }}
                    >
                      {item.number}
                    </a>
                    <p
                      className="text-xs mb-2"
                      style={{
                        color: cat.dark
                          ? "rgba(255,255,255,0.55)"
                          : "rgba(43,18,54,0.6)",
                      }}
                    >
                      {item.description}
                    </p>
                    <div
                      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
                      style={{
                        background: cat.dark
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(43,18,54,0.1)",
                        color: cat.dark ? "white" : "#2B1236",
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                      {item.available}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #D7D3FF, #CFC8FF)",
              }}
            >
              <MapPin className="w-5 h-5" style={{ color: "#2B1236" }} />
            </div>
            <h2 className="text-xl font-bold" style={{ color: "#2B1236" }}>
              State-wise Women Helplines
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {STATE_HELPLINES.map((s, i) => (
              <motion.div
                key={s.state}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="bg-card rounded-xl p-4 shadow-card text-center helpline-card transition-all duration-300"
                data-ocid={`helpline.state.item.${i + 1}`}
              >
                <p className="text-xs text-muted-foreground mb-1">{s.state}</p>
                <a
                  href={`tel:${s.number}`}
                  className="text-xl font-extrabold block hover:scale-110 transition-transform"
                  style={{ color: "#2B1236" }}
                >
                  {s.number}
                </a>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
