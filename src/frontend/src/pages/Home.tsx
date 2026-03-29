import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  BookOpen,
  Bot,
  ChevronRight,
  Heart,
  MessageCircle,
  Phone,
  Scale,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";

const HELPLINES = [
  { icon: Phone, label: "Police", number: "100" },
  { icon: AlertTriangle, label: "Women Helpline", number: "1091" },
  { icon: Heart, label: "National Emergency", number: "112" },
];

const LAWS = [
  {
    icon: Scale,
    title: "POCSO Act, 2012",
    description:
      "Protection of Children from Sexual Offences. Comprehensive measures for protection of children from sexual abuse and exploitation.",
  },
  {
    icon: Shield,
    title: "Domestic Violence Act, 2005",
    description:
      "Protection of Women from Domestic Violence. Covers physical, sexual, verbal, emotional, and economic abuse within households.",
  },
  {
    icon: BookOpen,
    title: "POSH Act, 2013",
    description:
      "Sexual Harassment of Women at Workplace. Mandates an Internal Complaints Committee for organizations with 10+ employees.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-bg relative min-h-[560px] flex items-center">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium mb-6"
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              <Shield className="w-4 h-4" style={{ color: "#F3A0A8" }} />
              Women Safety &amp; Empowerment Platform
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight mb-6">
              Your Safety,{" "}
              <span style={{ color: "#F3A0A8" }}>Your Rights,</span> Your
              Strength
            </h1>
            <p
              className="text-lg mb-8 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Access emergency helplines, know your legal rights, get instant AI
              support, and connect with a community that cares. You are never
              alone.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/helpline" data-ocid="home.primary_button">
                <button
                  type="button"
                  className="flex items-center gap-2 font-semibold px-7 py-3.5 rounded-xl text-sm transition-all duration-200 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #F3A0A8, #f07b87)",
                    color: "#2B1236",
                  }}
                >
                  <AlertTriangle className="w-4 h-4" />
                  GET IMMEDIATE HELP
                </button>
              </Link>
              <Link to="/laws" data-ocid="home.secondary_button">
                <button
                  type="button"
                  className="flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-xl text-sm border-2 hover:bg-white/10 transition-all duration-200"
                  style={{ borderColor: "rgba(255,255,255,0.4)" }}
                >
                  <BookOpen className="w-4 h-4" />
                  EXPLORE YOUR RIGHTS
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
        <div
          className="absolute right-0 top-0 w-96 h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #F3A0A8, transparent)",
          }}
        />
        <div
          className="absolute right-32 bottom-0 w-64 h-64 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #9c50c4, transparent)",
          }}
        />
      </section>

      {/* Emergency banner */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="emergency-banner rounded-2xl p-8"
          >
            <div className="text-center mb-6">
              <p
                className="text-sm uppercase tracking-widest font-semibold mb-1"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                24/7 Emergency Support
              </p>
              <h2 className="text-white text-2xl font-bold">
                Emergency Helplines
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {HELPLINES.map((h, i) => (
                <motion.div
                  key={h.number}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center p-4 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                  data-ocid={`home.helpline.item.${i + 1}`}
                >
                  <h.icon
                    className="w-8 h-8 mb-2"
                    style={{ color: "#F3A0A8" }}
                  />
                  <p
                    className="text-sm mb-1"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {h.label}
                  </p>
                  <a
                    href={`tel:${h.number}`}
                    className="text-3xl font-extrabold hover:scale-110 inline-block transition-transform"
                    style={{ color: "#F3A0A8" }}
                  >
                    {h.number}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Laws */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-2"
              style={{ color: "#F3A0A8" }}
            >
              Legal Protection
            </p>
            <h2 className="text-3xl font-bold" style={{ color: "#2B1236" }}>
              Know Your Laws
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              Understanding your legal rights is the first step toward
              empowerment and safety.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LAWS.map((law, i) => (
              <motion.div
                key={law.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="law-card bg-card rounded-2xl p-6 shadow-card transition-all duration-300"
                data-ocid={`home.laws.item.${i + 1}`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: "linear-gradient(135deg, #D7D3FF, #CFC8FF)",
                  }}
                >
                  <law.icon className="w-6 h-6" style={{ color: "#2B1236" }} />
                </div>
                <h3
                  className="font-bold text-base mb-2"
                  style={{ color: "#2B1236" }}
                >
                  {law.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {law.description}
                </p>
                <Link
                  to="/laws"
                  className="inline-flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all"
                  style={{ color: "#F3A0A8" }}
                >
                  Learn More <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/laws" data-ocid="home.laws.link">
              <button
                type="button"
                className="px-8 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #2B1236, #3A1A4C)",
                }}
              >
                View All Laws
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Chatbot + Feedback */}
      <section className="py-8 px-4 mb-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lavender-panel rounded-2xl p-8 flex flex-col items-start"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
              style={{ background: "rgba(255,255,255,0.5)" }}
            >
              <Bot className="w-8 h-8" style={{ color: "#2B1236" }} />
            </div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "rgba(43,18,54,0.6)" }}
            >
              AI Powered
            </p>
            <h3
              className="text-2xl font-bold mb-3"
              style={{ color: "#2B1236" }}
            >
              24/7 Safety Chatbot
            </h3>
            <p
              className="text-sm mb-6"
              style={{ color: "rgba(43,18,54,0.75)" }}
            >
              Get instant guidance on safety tips, emergency steps, and your
              legal rights. Our AI chatbot is available around the clock.
            </p>
            <Link to="/chatbot" data-ocid="home.chatbot.button">
              <button
                type="button"
                className="flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-xl text-white transition-all hover:scale-105 hover:shadow-lg"
                style={{ background: "#2B1236" }}
              >
                <MessageCircle className="w-4 h-4" />
                Start Chatting
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="peach-panel rounded-2xl p-8"
          >
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "rgba(43,18,54,0.6)" }}
            >
              Your Voice Matters
            </p>
            <h3
              className="text-2xl font-bold mb-3"
              style={{ color: "#2B1236" }}
            >
              Share Feedback
            </h3>
            <p
              className="text-sm mb-6"
              style={{ color: "rgba(43,18,54,0.75)" }}
            >
              Help us improve. Share your experience, report an incident, or
              suggest new features to make empowerHER better for everyone.
            </p>
            <Link to="/feedback" data-ocid="home.feedback.button">
              <button
                type="button"
                className="flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-xl text-white transition-all hover:scale-105 hover:shadow-lg"
                style={{ background: "#2B1236" }}
              >
                <Heart className="w-4 h-4" />
                Give Feedback
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
