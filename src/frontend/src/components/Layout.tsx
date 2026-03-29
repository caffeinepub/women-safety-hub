import { SOSModal } from "@/components/SOSModal";
import { useLang } from "@/context/LanguageContext";
import { Link, useRouterState } from "@tanstack/react-router";
import { AlertTriangle, Menu, Phone, Shield, X } from "lucide-react";
import { useState } from "react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

export function Header() {
  const routerState = useRouterState();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sosOpen, setSosOpen] = useState(false);
  const { t, toggleLang } = useLang();

  const navLinks = [
    { to: "/", label: t.home },
    { to: "/laws", label: t.laws },
    { to: "/helpline", label: t.helpline },
    { to: "/chatbot", label: t.chatbot },
    { to: "/safety-tips", label: t.safetyTips },
    { to: "/quiz", label: t.quiz },
    { to: "/stories", label: t.stories },
    { to: "/resources", label: t.resources },
    { to: "/faq", label: t.faq },
    { to: "/feedback", label: t.feedback },
  ];

  return (
    <>
      <header className="header-gradient sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center gap-2.5 flex-shrink-0"
              data-ocid="nav.link"
            >
              <div
                className="rounded-xl p-1.5"
                style={{ background: "rgba(243,160,168,0.2)" }}
              >
                <Shield className="w-6 h-6" style={{ color: "#F3A0A8" }} />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                empower<span style={{ color: "#F3A0A8" }}>HER</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5 flex-wrap">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid="nav.link"
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                    routerState.location.pathname === link.to
                      ? "text-white bg-white/15"
                      : "text-white/75 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              <button
                type="button"
                onClick={toggleLang}
                className="text-white/70 hover:text-white text-xs font-medium px-2 py-1 rounded border border-white/20 hover:border-white/40 transition-all"
              >
                {t.langToggle}
              </button>
              <button
                type="button"
                onClick={() => setSosOpen(true)}
                className="btn-pink flex items-center gap-1.5 text-sm"
                style={{
                  background: "linear-gradient(135deg, #e74c3c, #c0392b)",
                }}
                data-ocid="nav.sos_button"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                {t.emergencyHelp}
              </button>
            </div>

            <button
              type="button"
              className="lg:hidden text-white p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          {menuOpen && (
            <div className="lg:hidden pb-4 pt-2 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    routerState.location.pathname === link.to
                      ? "text-white bg-white/15"
                      : "text-white/75 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={toggleLang}
                  className="text-white/70 text-xs font-medium px-3 py-2 rounded border border-white/20"
                >
                  {t.langToggle}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSosOpen(true);
                    setMenuOpen(false);
                  }}
                  className="btn-pink flex-1 flex items-center justify-center gap-1.5 text-sm"
                  style={{
                    background: "linear-gradient(135deg, #e74c3c, #c0392b)",
                  }}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {t.emergencyHelp}
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Floating SOS Button */}
      <button
        type="button"
        onClick={() => setSosOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full text-white font-bold text-sm shadow-2xl flex items-center justify-center animate-pulse"
        style={{ background: "linear-gradient(135deg, #e74c3c, #c0392b)" }}
        aria-label="SOS Emergency"
        data-ocid="sos.floating_button"
      >
        {t.sos}
      </button>

      <SOSModal open={sosOpen} onClose={() => setSosOpen(false)} />
    </>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLang();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const navLinks = [
    { to: "/", label: t.home },
    { to: "/laws", label: t.laws },
    { to: "/helpline", label: t.helpline },
    { to: "/chatbot", label: t.chatbot },
    { to: "/feedback", label: t.feedback },
  ];

  return (
    <footer className="footer-gradient text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5" style={{ color: "#F3A0A8" }} />
              <span className="font-bold text-lg">
                empower<span style={{ color: "#F3A0A8" }}>HER</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Empowering women with knowledge, safety, and support.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/50 mb-4">
              Pages
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/50 mb-4">
              Resources
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link
                  to="/safety-tips"
                  className="hover:text-white transition-colors"
                >
                  Safety Tips
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="hover:text-white transition-colors">
                  Rights Quiz
                </Link>
              </li>
              <li>
                <Link
                  to="/stories"
                  className="hover:text-white transition-colors"
                >
                  Stories
                </Link>
              </li>
              <li>
                <Link
                  to="/incident-report"
                  className="hover:text-white transition-colors"
                >
                  Report Incident
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/50 mb-4">
              Connect
            </h4>
            <div className="flex items-center gap-2 text-sm text-white/70 mb-4">
              <Phone className="w-4 h-4" style={{ color: "#F3A0A8" }} />
              <span>Women Helpline: 1091</span>
            </div>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <SiFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter/X"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <SiX className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-white/50">
          <span>© {year} empowerHER. All rights reserved.</span>
          <span>
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              style={{ color: "#F3A0A8" }}
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
