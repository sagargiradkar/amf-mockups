// src/pages/HistoricalContentPage.tsx
import { useMemo } from "react";
import { Layout } from "../components/layout/Layout";
import { Folder, FileText, PlayCircle } from "lucide-react";

// Example mock data – replace with real data
type HistoricalItem = {
  id: string;
  name: string;
  type: "folder" | "file";
  extension?: string; // "pdf" | "html" | "mp4" | "txt" | etc.
  path?: string;
};

const rawItems: HistoricalItem[] = [
  // folders
  { id: "f1", name: "I1-Training", type: "folder" },
  { id: "f2", name: "B-CBT", type: "folder" },
  { id: "f3", name: "C-VBT", type: "folder" },

  // files (example)
  { id: "i1", name: "Basic Computer Based Training", type: "file", extension: "html", path: "/historical/i1/index.html" },
  { id: "i2", name: "Basic Video Based Training", type: "file", extension: "mp4", path: "/historical/i2/training.mp4" },
  { id: "i3", name: "Manual 2015", type: "file", extension: "pdf", path: "/historical/i3/manual.pdf" },
  { id: "i4", name: "Notes", type: "file", extension: "txt", path: "/historical/i4/notes.txt" },

  // things that will be filtered out
  { id: "x1", name: "Thumbs.db", type: "file", extension: "db" },
  { id: "x2", name: "Some.doc", type: "file", extension: "doc" },
];

const ALLOWED_EXTENSIONS = ["pdf", "html", "mp4", "txt"] as const;

// Names to hide completely (example per your note)
const EXCLUDED_NAMES = [
  "Thumbs",
  "01-Ingredient Handling",
  "Flour Application & Recycling System",
  "AMF Method Client Tutorial Package",
  "Interactive AMFMethod Training",
];

export default function HistoricalContentPage() {
  // Filter and transform according to rules
  const visibleItems = useMemo(() => {
    return rawItems.filter((item) => {
      // 1. Hide some specific folders/files by name fragment
      if (EXCLUDED_NAMES.some((n) => item.name.includes(n))) return false;

      // 2. Only allow certain file types for files
      if (item.type === "file") {
        if (!item.extension) return false;
        if (!ALLOWED_EXTENSIONS.includes(item.extension as any)) return false;
      }

      return true;
    });
  }, []);

  return (
    <Layout>
      <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide">
            Historical Content
          </h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            All historical information organized like today, but only showing folders and items that contain usable content.
          </p>
        </div>

        {/* Rules description block */}
        {/* <div className="mb-8 rounded-xl border border-border bg-card p-4 sm:p-6 text-sm text-muted-foreground space-y-2">
          <p className="font-semibold text-foreground">
            Display Rules
          </p>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              Do not show .doc, .db, Thumb files or specific system/training folders that do not contain user-facing content.
            </li>
            <li>
              Only show pdf, html, mp4, or txt files.
            </li>
            <li>
              In I1-Training, show C-VBT but label it as <span className="font-semibold">Basic Video Based Training</span>.
            </li>
            <li>
              In I1-Training, show B-CBT but label it as{" "}
              <span className="font-semibold">Basic Computer Based Training</span> and surface only{" "}
              <span className="font-mono">index.html</span> to make it obvious what to click to launch the training.
            </li>
          </ol>
        </div> */}

        {/* Content list */}
        <div className="space-y-3">
          {visibleItems.map((item) => {
            const isTrainingFolder = item.type === "folder" && ["B-CBT", "C-VBT"].includes(item.name);
            let displayName = item.name;

            if (isTrainingFolder) {
              if (item.name === "B-CBT") displayName = "Basic Computer Based Training";
              if (item.name === "C-VBT") displayName = "Basic Video Based Training";
            }

            const icon =
              item.type === "folder" ? (
                <Folder className="h-5 w-5 text-blue-600" />
              ) : item.extension === "mp4" ? (
                <PlayCircle className="h-5 w-5 text-green-600" />
              ) : (
                <FileText className="h-5 w-5 text-muted-foreground" />
              );

            const href =
              item.type === "file" && item.path
                ? item.path
                : undefined;

            return (
              <a
                key={item.id}
                href={href}
                target={href ? "_blank" : undefined}
                rel={href ? "noreferrer" : undefined}
                className="flex items-center justify-between rounded-lg border border-border bg-card p-3 sm:p-4 transition-colors hover:bg-accent cursor-pointer"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  {icon}
                  <div>
                    <p className="text-sm sm:text-base font-medium">
                      {displayName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.type === "folder"
                        ? "Folder"
                        : (item.extension || "").toUpperCase() + " file"}
                    </p>
                  </div>
                </div>
                {href && (
                  <span className="text-xs sm:text-sm font-medium text-destructive">
                    Open
                  </span>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
