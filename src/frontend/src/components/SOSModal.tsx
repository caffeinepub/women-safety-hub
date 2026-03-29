import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLang } from "@/context/LanguageContext";
import { Phone } from "lucide-react";

const emergencyContacts = [
  { key: "police" as const, number: "100", color: "#e74c3c" },
  { key: "nationalEmergency" as const, number: "112", color: "#c0392b" },
  { key: "womenHelpline" as const, number: "1091", color: "#8e44ad" },
  { key: "ambulance" as const, number: "108", color: "#2980b9" },
];

export function SOSModal({
  open,
  onClose,
}: { open: boolean; onClose: () => void }) {
  const { t } = useLang();
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle
            className="text-xl font-bold"
            style={{ color: "#c0392b" }}
          >
            🚨 {t.sosTitle}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">{t.sosSubtitle}</p>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 mt-2">
          {emergencyContacts.map((c) => (
            <a
              key={c.number}
              href={`tel:${c.number}`}
              className="flex flex-col items-center justify-center gap-2 rounded-xl p-4 text-white font-bold transition-transform hover:scale-105"
              style={{ background: c.color }}
            >
              <Phone className="w-6 h-6" />
              <span className="text-lg">{c.number}</span>
              <span className="text-xs text-white/80 text-center">
                {t[c.key]}
              </span>
            </a>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
