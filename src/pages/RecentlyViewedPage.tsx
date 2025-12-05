// src/pages/RecentlyViewedPage.tsx
import { Layout } from "../components/layout/Layout";
import { FileText, Clock } from "lucide-react";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import { useNavigate } from "react-router-dom";

export default function RecentlyViewedPage() {
  const { recentDocuments } = useRecentlyViewed();
  const navigate = useNavigate();

  const hasItems = recentDocuments.length > 0;

  return (
    <Layout>
      <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide">
            Recently Viewed Content
          </h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Documents you viewed recently.
          </p>
        </div>

        {/* Empty state */}
        {!hasItems && (
          <div className="rounded-xl border border-dashed border-border bg-muted/40 p-8 text-center">
            <Clock className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
            <h2 className="text-lg font-semibold mb-1">
              No recently viewed documents yet
            </h2>
            <p className="text-sm text-muted-foreground">
              When you open documents, they will appear here.
            </p>
          </div>
        )}

        {/* List */}
        {hasItems && (
          <div className="space-y-3">
            {recentDocuments.map((doc) => (
              <div
                key={doc.id}
                onClick={() => navigate(`/documentation/${doc.id}`)}
                className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">{doc.filename}</h3>
                    <p className="text-xs text-muted-foreground">
                      {doc.serialNumber} • {doc.category} •{" "}
                      {new Date(doc.viewedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <button
                  className="text-sm text-destructive font-medium hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/documentation/${doc.id}`);
                  }}
                >
                  View Document →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
