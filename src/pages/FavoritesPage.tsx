// src/pages/FavoritesPage.tsx
import { Layout } from "../components/layout/Layout";
import { useFavorites } from "../hooks/useFavorites";
import { mockDocuments } from "../data/mockData";
import { FileText, HeartOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  // Join favorites ids with document data
  const favoriteDocs = mockDocuments.filter((doc) =>
    favorites.includes(doc.id)
  );

  const hasFavorites = favoriteDocs.length > 0;

  return (
    <Layout>
      <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide">
            Favorites
          </h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Quick access to documents you have marked as favorites.
          </p>
        </div>

        {/* Empty state */}
        {!hasFavorites && (
          <div className="rounded-xl border border-dashed border-border bg-muted/40 p-8 text-center">
            <HeartOff className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
            <h2 className="text-lg font-semibold mb-1">No favorites yet</h2>
            <p className="text-sm text-muted-foreground">
              Mark documents as favorites to see them listed here.
            </p>
          </div>
        )}

        {/* List of favorite documents */}
        {hasFavorites && (
          <div className="space-y-3">
            {favoriteDocs.map((doc) => (
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
                      {doc.serialNumber} • {doc.category}
                    </p>
                  </div>
                </div>

                <button
                  className="text-xs sm:text-sm text-destructive font-medium hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(doc.id); // remove from favorites
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
