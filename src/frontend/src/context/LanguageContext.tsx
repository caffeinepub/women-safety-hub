import { type ReactNode, createContext, useContext, useState } from "react";

export type Lang = "en" | "hi";

type TranslationKeys = {
  home: string;
  laws: string;
  helpline: string;
  chatbot: string;
  feedback: string;
  safetyTips: string;
  quiz: string;
  stories: string;
  resources: string;
  faq: string;
  incidentReport: string;
  admin: string;
  emergencyHelp: string;
  sos: string;
  sosTitle: string;
  sosSubtitle: string;
  police: string;
  nationalEmergency: string;
  womenHelpline: string;
  ambulance: string;
  close: string;
  langToggle: string;
};

export const translations: Record<Lang, TranslationKeys> = {
  en: {
    home: "Home",
    laws: "Laws",
    helpline: "Helpline",
    chatbot: "Chatbot",
    feedback: "Feedback",
    safetyTips: "Safety Tips",
    quiz: "Rights Quiz",
    stories: "Stories",
    resources: "Resources",
    faq: "FAQ",
    incidentReport: "Report Incident",
    admin: "Admin",
    emergencyHelp: "EMERGENCY HELP",
    sos: "SOS",
    sosTitle: "Emergency Contacts",
    sosSubtitle: "Call immediately if you are in danger",
    police: "Police",
    nationalEmergency: "National Emergency",
    womenHelpline: "Women Helpline",
    ambulance: "Ambulance",
    close: "Close",
    langToggle: "हिंदी",
  },
  hi: {
    home: "होम",
    laws: "कानून",
    helpline: "हेल्पलाइन",
    chatbot: "चैटबॉट",
    feedback: "फीडबैक",
    safetyTips: "सुरक्षा सुझाव",
    quiz: "अधिकार प्रश्नोत्तरी",
    stories: "कहानियां",
    resources: "संसाधन",
    faq: "FAQ",
    incidentReport: "घटना रिपोर्ट",
    admin: "एडमिन",
    emergencyHelp: "आपातकालीन सहायता",
    sos: "SOS",
    sosTitle: "आपातकालीन संपर्क",
    sosSubtitle: "खतरे में होने पर तुरंत कॉल करें",
    police: "पुलिस",
    nationalEmergency: "राष्ट्रीय आपातकाल",
    womenHelpline: "महिला हेल्पलाइन",
    ambulance: "एम्बुलेंस",
    close: "बंद करें",
    langToggle: "English",
  },
};

type LanguageContextType = {
  lang: Lang;
  t: TranslationKeys;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const toggleLang = () => setLang((l) => (l === "en" ? "hi" : "en"));
  return (
    <LanguageContext.Provider
      value={{ lang, t: translations[lang], toggleLang }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
