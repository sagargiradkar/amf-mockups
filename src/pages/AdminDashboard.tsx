// src/pages/admin/AdminDashboard.tsx
import { AdminLayout } from "../components/layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import {
    Users,
    FileText,
    MapPin,
    Wrench,
    TrendingUp,
    AlertCircle,
} from "lucide-react";

export default function AdminDashboard() {
    const navigate = useNavigate();

    const stats = [
        {
            label: "Total Users",
            value: "1,234",
            icon: Users,
            color: "bg-blue-500",
            path: "/admin/users",
        },
        {
            label: "Documents",
            value: "5,678",
            icon: FileText,
            color: "bg-green-500",
            path: "/admin/documents",
        },
        {
            label: "Customer Locations",
            value: "456",
            icon: MapPin,
            color: "bg-purple-500",
            path: "/admin/customer-locations",
        },
        {
            label: "Machines",
            value: "2,890",
            icon: Wrench,
            color: "bg-orange-500",
            path: "/admin/machine-provision",
        },
    ];

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <p className="text-muted-foreground mt-1">
                        Overview of system statistics and quick actions
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <button
                                key={stat.label}
                                onClick={() => navigate(stat.path)}
                                className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all text-left"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color}`}
                                    >
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>
                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                </div>
                                <div className="text-2xl font-bold">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-muted-foreground mt-1">
                                    {stat.label}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">
                        Quick Actions
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <button
                            onClick={() => navigate("/admin/users")}
                            className="flex items-center gap-3 rounded-lg border border-border p-4 hover:bg-accent transition-colors text-left"
                        >
                            <Users className="h-5 w-5 text-destructive" />
                            <div>
                                <div className="font-medium">Manage Users</div>
                                <div className="text-xs text-muted-foreground">
                                    Add, edit, or remove users
                                </div>
                            </div>
                        </button>
                        <button
                            onClick={() => navigate("/admin/documents")}
                            className="flex items-center gap-3 rounded-lg border border-border p-4 hover:bg-accent transition-colors text-left"
                        >
                            <FileText className="h-5 w-5 text-destructive" />
                            <div>
                                <div className="font-medium">
                                    Manage Documents
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Upload or organize documents
                                </div>
                            </div>
                        </button>
                        <button
                            onClick={() => navigate("/admin/customer-locations")}
                            className="flex items-center gap-3 rounded-lg border border-border p-4 hover:bg-accent transition-colors text-left"
                        >
                            <MapPin className="h-5 w-5 text-destructive" />
                            <div>
                                <div className="font-medium">
                                    Customer Locations
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    View all customer locations
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">
                        Recent Activity
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3 pb-4 border-b border-border last:border-b-0">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-medium">
                                    New user registered
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    demo@ithena.ai joined the platform
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    2 hours ago
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 pb-4 border-b border-border last:border-b-0">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                                <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-medium">
                                    Document uploaded
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Service Manual v2.0 added to library
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    5 hours ago
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900">
                                <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-medium">
                                    System maintenance scheduled
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Maintenance window: Dec 20, 2025 2:00 AM
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    1 day ago
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
