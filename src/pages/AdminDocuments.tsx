// src/pages/admin/AdminDocuments.tsx
import { useState } from "react";
import { AdminLayout } from "../components/layout/AdminLayout";
import { Search, Plus, Trash2 } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function AdminDocuments() {
    const [activeTab, setActiveTab] = useState<"documents" | "categories">(
        "documents"
    );
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    // Mock data - replace with actual data
    const documents: any[] = [];

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Manage Documents</h1>
                    <p className="text-muted-foreground mt-1">
                        Admin can add or remove documents here.
                    </p>
                </div>

                {/* Tabs */}
                <div className="border-b border-border">
                    <nav className="flex gap-8">
                        <button
                            onClick={() => setActiveTab("documents")}
                            className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === "documents"
                                    ? "border-destructive text-destructive"
                                    : "border-transparent text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            Documents
                        </button>
                        <button
                            onClick={() => setActiveTab("categories")}
                            className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === "categories"
                                    ? "border-destructive text-destructive"
                                    : "border-transparent text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            Document Categories
                        </button>
                    </nav>
                </div>

                {/* Search and Actions */}
                <div className="flex items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search..."
                            className="w-full rounded-md border border-border bg-background pl-10 pr-4 py-2 text-sm focus:border-destructive focus:outline-none focus:ring-2 focus:ring-destructive/20"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            onClick={() => {
                                /* Add document logic */
                            }}
                            className="flex items-center gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Add Document
                        </Button>
                        <Button
                            onClick={() => {
                                /* Add category logic */
                            }}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Add Category
                        </Button>
                        <Button
                            onClick={() => {
                                /* Delete selected logic */
                            }}
                            variant="destructive"
                            disabled={selectedRows.length === 0}
                            className="flex items-center gap-2"
                        >
                            <Trash2 className="h-4 w-4" />
                            Delete Selected
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-lg border border-border bg-card shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-border bg-muted/50">
                                <tr>
                                    <th className="p-4 text-left">
                                        <input
                                            type="checkbox"
                                            className="rounded border-border"
                                        />
                                    </th>
                                    <th className="p-4 text-left text-sm font-semibold">
                                        Name
                                    </th>
                                    <th className="p-4 text-left text-sm font-semibold">
                                        Category
                                    </th>
                                    <th className="p-4 text-left text-sm font-semibold">
                                        Description
                                    </th>
                                    <th className="p-4 text-left text-sm font-semibold">
                                        Status
                                    </th>
                                    <th className="p-4 text-left text-sm font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="p-12 text-center text-muted-foreground"
                                        >
                                            No rows
                                        </td>
                                    </tr>
                                ) : (
                                    documents.map((doc) => (
                                        <tr
                                            key={doc.id}
                                            className="border-b border-border last:border-b-0 hover:bg-accent"
                                        >
                                            <td className="p-4">
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-border"
                                                />
                                            </td>
                                            <td className="p-4 text-sm">
                                                {doc.name}
                                            </td>
                                            <td className="p-4 text-sm">
                                                {doc.category}
                                            </td>
                                            <td className="p-4 text-sm">
                                                {doc.description}
                                            </td>
                                            <td className="p-4 text-sm">
                                                {doc.status}
                                            </td>
                                            <td className="p-4 text-sm">
                                                {/* Action buttons */}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between border-t border-border p-4">
                        <div className="text-sm text-muted-foreground">
                            0-0 of 0
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                                Rows per page:
                            </span>
                            <select className="rounded-md border border-border bg-background px-2 py-1 text-sm">
                                <option>10</option>
                                <option>25</option>
                                <option>50</option>
                            </select>
                            <button className="p-1 rounded hover:bg-accent disabled:opacity-50">
                                ‹
                            </button>
                            <button className="p-1 rounded hover:bg-accent disabled:opacity-50">
                                ›
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
