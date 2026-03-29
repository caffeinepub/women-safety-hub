import { useActor } from "@/hooks/useActor";
import { useQuery } from "@tanstack/react-query";
import { Building2, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import type { Resource } from "../backend";

const FALLBACK: Resource[] = [
  {
    id: "1",
    name: "iCall Counseling",
    resourceType: "ngo",
    location: "Mumbai (Pan-India Online)",
    contact: "9152987821",
    description: "Free and confidential counseling services for women.",
  },
  {
    id: "2",
    name: "Majlis Legal Centre",
    resourceType: "legal",
    location: "Mumbai",
    contact: "022-23728080",
    description: "Free legal aid for women facing violence and discrimination.",
  },
  {
    id: "3",
    name: "Swadhar Greh",
    resourceType: "shelter",
    location: "Multiple Cities",
    contact: "1800-180-5555",
    description: "Shelter homes for women in difficult circumstances.",
  },
  {
    id: "4",
    name: "National Commission for Women",
    resourceType: "ngo",
    location: "New Delhi",
    contact: "7827170170",
    description: "Statutory body for safeguarding women's rights.",
  },
];

const typeLabels: Record<string, string> = {
  all: "All",
  shelter: "Shelter",
  ngo: "NGO",
  legal: "Legal Aid",
};
const typeColors: Record<string, string> = {
  shelter: "#e8e5ff",
  ngo: "#fce8f3",
  legal: "#fff3cd",
};

export default function Resources() {
  const { actor } = useActor();
  const [filter, setFilter] = useState("all");

  const { data: resources } = useQuery({
    queryKey: ["resources"],
    queryFn: () => actor!.getAllResources(),
    enabled: !!actor,
  });

  const list = (
    resources && resources.length > 0 ? resources : FALLBACK
  ).filter((r) => filter === "all" || r.resourceType === filter);

  return (
    <div className="py-8 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1
          className="text-3xl font-extrabold mb-2"
          style={{ color: "#2B1236" }}
        >
          Resource Directory
        </h1>
        <p className="text-muted-foreground">
          Shelters, NGOs, and legal aid organizations near you
        </p>
      </div>

      <div className="flex gap-2 flex-wrap justify-center mb-6">
        {Object.entries(typeLabels).map(([key, label]) => (
          <button
            type="button"
            key={key}
            onClick={() => setFilter(key)}
            className="px-4 py-1.5 rounded-full text-sm font-medium border transition-all"
            style={{
              background: filter === key ? "#2B1236" : "white",
              color: filter === key ? "white" : "#2B1236",
              borderColor: "#2B1236",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {list.map((r) => (
          <div
            key={r.id}
            className="rounded-2xl border p-5 transition-all hover:shadow-md"
            style={{ background: typeColors[r.resourceType] || "white" }}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold" style={{ color: "#2B1236" }}>
                {r.name}
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/70 font-medium capitalize">
                {r.resourceType}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {r.description}
            </p>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-3.5 h-3.5" style={{ color: "#F3A0A8" }} />
                <span>{r.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-3.5 h-3.5" style={{ color: "#F3A0A8" }} />
                <a
                  href={`tel:${r.contact}`}
                  className="font-medium hover:underline"
                  style={{ color: "#2B1236" }}
                >
                  {r.contact}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {list.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
          <p className="text-muted-foreground">
            No resources found for this category.
          </p>
        </div>
      )}
    </div>
  );
}
