// src/components/layout/AdminLayout.tsx
import { Link, useLocation } from "react-router-dom";
import {
	Users,
	UserCog,
	MapPin,
	FileText,
	Wrench,
	DollarSign,
	Upload,
	Settings,
	Shield,
} from "lucide-react";
import { Header } from "./Header";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

interface AdminLayoutProps {
	children: React.ReactNode;
}

const adminMenuItems = [
	{
		section: "Administration",
		items: [
			{ path: "/admin/users", label: "Users", icon: Users },
			{ path: "/admin/roles", label: "Roles", icon: UserCog },
			{
				path: "/admin/customer-locations",
				label: "Customer Locations",
				icon: MapPin,
			},
			{ path: "/admin/documents", label: "Documents", icon: FileText },
			{
				path: "/admin/machine-provision",
				label: "Machine Provision",
				icon: Wrench,
			},
			{
				path: "/admin/price-markups",
				label: "Price Markups",
				icon: DollarSign,
			},
		],
	},
	{
		section: "Operations",
		items: [
			{
				path: "/admin/upload-models",
				label: "Upload Models",
				icon: Upload,
			},
		],
	},
	{
		section: "Configuration",
		items: [
			{ path: "/admin/settings", label: "Settings", icon: Settings },
			{
				path: "/admin/policy-center",
				label: "Policy Center",
				icon: Shield,
			},
		],
	},
];

export function AdminLayout({ children }: AdminLayoutProps) {
	const location = useLocation();

	const isActiveRoute = (path: string) => {
		return location.pathname === path;
	};

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<Navigation />
			<div className="flex">
				{/* Sidebar */}
				<aside className="w-56 border-r border-border bg-background min-h-[calc(100vh-96px)] sticky top-24">
					<div className="p-4">
						{/* Admin Panel Header */}
						<Link
							to="/admin"
							className="flex items-center gap-2 mb-6 p-3 rounded-lg hover:bg-accent transition-colors"
						>
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10">
								<Shield className="h-5 w-5 text-destructive" />
							</div>
							<div>
								<div className="text-sm font-bold">
									Admin Panel
								</div>
								<div className="text-xs text-muted-foreground">
									Manage all Admin Settings
								</div>
							</div>
						</Link>

						{/* Navigation Menu */}
						<nav className="space-y-6">
							{adminMenuItems.map((section) => (
								<div key={section.section}>
									<h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
										{section.section}
									</h3>
									<div className="space-y-0.5">
										{section.items.map((item) => {
											const Icon = item.icon;
											const isActive = isActiveRoute(
												item.path
											);
											return (
												<Link
													key={item.path}
													to={item.path}
													className={`flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-colors ${
														isActive
															? "bg-destructive/10 text-destructive"
															: "text-foreground hover:bg-accent"
													}`}
												>
													<Icon className="h-4 w-4" />
													<span>{item.label}</span>
												</Link>
											);
										})}
									</div>
								</div>
							))}
						</nav>
					</div>
				</aside>

				{/* Main Content */}
				<main className="flex-1 p-6">{children}</main>
			</div>
              <Footer />
		</div>
	);
}
