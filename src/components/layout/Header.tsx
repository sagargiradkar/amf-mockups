import { useState, useRef, useEffect } from "react";
import {
	Bell,
	Search,
	Menu,
	X,
	ShoppingCart,
	Mail,
	MapPin,
	ChevronDown,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useNotifications } from "../../context/NotificationContext";
import { useAuth } from "../../context/AuthContext";

// Sample site data - Replace with your actual data
const sites = [
	{
		id: 1,
		name: "C.H. Guenther and Son, Inc.",
		code: null,
	},
	{
		id: 2,
		name: "Mid South Baking-Bryan",
		code: "LN-0000360",
	},
	{
		id: 3,
		name: "Flowers Bakeries, Incorporated",
		code: null,
	},
	{
		id: 4,
		name: "Flowers Baking Company of Ogden, LLC-Ogden",
		code: "LN-0001099",
	},
	{
		id: 5,
		name: "C.H. Guenther Bakeries U.K.",
		code: null,
	},
	{
		id: 6,
		name: "C.H. Guenther Bakeries-Coventry",
		code: "LN-007578",
	},
	{
		id: 7,
		name: "Alpha Baking Company",
		code: null,
	},
];

export function Header() {
	const { unreadCount } = useNotifications();
	const { user } = useAuth();
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isSiteDropdownOpen, setIsSiteDropdownOpen] = useState(false);
	const [selectedSite, setSelectedSite] = useState(sites[1]); // Default to Mid South Baking
	const [cartCount] = useState(0);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsSiteDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchTerm.trim()) {
			navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
			setSearchTerm("");
			setIsSearchOpen(false);
			setIsMobileMenuOpen(false);
		}
	};

	const handleSiteChange = (site: (typeof sites)[0]) => {
		setSelectedSite(site);
		setIsSiteDropdownOpen(false);
	};

	return (
		<>
			<header className="sticky top-0 z-50 h-24 border-b border-border bg-background shadow-md">
				<div className="flex h-full items-center justify-between gap-2 px-4 sm:px-6">
					{/* Left Section - Logo */}
					<div className="flex items-center gap-2 sm:gap-3">
						{/* Mobile Menu Toggle */}
						<button
							onClick={() =>
								setIsMobileMenuOpen(!isMobileMenuOpen)
							}
							className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent lg:hidden"
							aria-label="Toggle menu"
						>
							{isMobileMenuOpen ? (
								<X className="h-6 w-6" />
							) : (
								<Menu className="h-6 w-6" />
							)}
						</button>

						{/* AMF Logo */}
						<Link
							to="/"
							className="flex items-center shrink-0"
						>
							<img
								src="/amf-logo.png"
								alt="AMF Bakery Systems"
								className="h-16 sm:h-20 w-auto object-contain hover:opacity-80 transition-opacity"
								onError={(e) => {
									e.currentTarget.style.display = "none";
									const fallback =
										document.createElement("div");
									fallback.className =
										"text-xl sm:text-2xl font-bold text-destructive";
									fallback.textContent = "AMF";
									e.currentTarget.parentElement?.appendChild(
										fallback
									);
								}}
							/>
						</Link>
					</div>

					{/* Center Search - Desktop */}
					<form
						onSubmit={handleSearch}
						className="hidden lg:flex relative w-full max-w-[600px]"
					>
						<input
							type="text"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder="Search Parts, Machines, Orders, Documents, Pages..."
							className="h-8 w-full rounded-full border border-border bg-background pl-5 pr-12 text-sm text-muted-foreground focus:border-destructive focus:outline-none focus:ring-2 focus:ring-destructive/20"
						/>
						<button
							type="submit"
							className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
							aria-label="Search"
						>
							<Search className="h-4 w-4" />
						</button>
					</form>

					{/* Right Section - Icons */}
					<div className="flex items-center gap-1 sm:gap-2">
						{/* Mobile Search Toggle */}
						<button
							onClick={() => setIsSearchOpen(!isSearchOpen)}
							className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent lg:hidden"
							aria-label="Search"
						>
							<Search className="h-5 w-5" />
						</button>

						{/* Cart Icon */}
						<button
							onClick={() => navigate("/cart")}
							className="relative flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-accent"
							aria-label="Shopping Cart"
						>
							<ShoppingCart className="h-5 w-5" />
							{cartCount > 0 && (
								<span className="absolute right-1 top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-white">
									{cartCount > 9 ? "9+" : cartCount}
								</span>
							)}
						</button>

						{/* Location Dropdown - Desktop */}
						<div
							className="hidden md:flex relative"
							ref={dropdownRef}
						>
							<button
								onClick={() =>
									setIsSiteDropdownOpen(!isSiteDropdownOpen)
								}
								className="flex items-center gap-2 h-10 rounded-md border border-border bg-background pl-3 pr-2 hover:bg-accent transition-colors"
							>
								<MapPin className="h-4 w-4 text-muted-foreground" />
								<span className="text-sm font-medium max-w-[180px] truncate">
									{selectedSite.name.length > 25
										? selectedSite.name.substring(0, 25) +
										  "..."
										: selectedSite.name}
								</span>
								<ChevronDown
									className={`h-4 w-4 text-muted-foreground transition-transform ${
										isSiteDropdownOpen ? "rotate-180" : ""
									}`}
								/>
							</button>

							{/* Dropdown Menu */}
							{isSiteDropdownOpen && (
								<div className="absolute right-0 top-12 w-80 rounded-md border border-border bg-background shadow-lg overflow-hidden z-50 animate-fade-in">
									<div className="px-4 py-3 border-b border-border bg-muted/50">
										<div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
											<MapPin className="h-4 w-4" />
											Select Site
										</div>
									</div>
									<div className="max-h-[400px] overflow-y-auto">
										{sites.map((site) => (
											<button
												key={site.id}
												onClick={() =>
													handleSiteChange(site)
												}
												className={`w-full px-4 py-3 text-left hover:bg-accent transition-colors border-b border-border last:border-b-0 ${
													selectedSite.id === site.id
														? "bg-accent"
														: ""
												}`}
											>
												<div className="font-semibold text-sm leading-tight">
													{site.name}
												</div>
												{site.code && (
													<div className="text-xs text-muted-foreground mt-1">
														{site.code}
													</div>
												)}
											</button>
										))}
									</div>
								</div>
							)}
						</div>

						{/* Notification Bell */}
						<button
							onClick={() => navigate("/notifications")}
							className="relative flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-accent"
							aria-label="Notifications"
						>
							<Bell className="h-5 w-5" />
							{unreadCount > 0 && (
								<span className="absolute right-1 top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-white">
									{unreadCount > 9 ? "9+" : unreadCount}
								</span>
							)}
						</button>

						{/* Email Icon */}
						<button
							onClick={() => navigate("/messages")}
							className="hidden sm:flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-accent"
							aria-label="Messages"
						>
							<Mail className="h-5 w-5" />
						</button>

						{/* Profile Avatar */}
						<button
							onClick={() => navigate("/profile")}
							className="flex h-9 w-9 items-center justify-center rounded-full bg-muted hover:bg-accent transition-colors font-semibold text-sm border border-border"
							aria-label="Profile"
						>
							{user?.name?.charAt(0).toUpperCase() || "U"}
						</button>
					</div>
				</div>

				{/* Mobile Search Bar */}
				{isSearchOpen && (
					<div className="border-t border-border bg-background p-3 lg:hidden animate-fade-in">
						<form onSubmit={handleSearch} className="relative">
							<input
								type="text"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								placeholder="Search Parts, Machines, Orders, Documents, Pages..."
								autoFocus
								className="h-11 w-full rounded-full border border-border bg-background pl-5 pr-12 text-sm text-muted-foreground focus:border-destructive focus:outline-none focus:ring-2 focus:ring-destructive/20"
							/>
							<button
								type="submit"
								className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
								aria-label="Search"
							>
								<Search className="h-4 w-4" />
							</button>
						</form>
					</div>
				)}
			</header>

			{/* Mobile Menu Overlay */}
			{isMobileMenuOpen && (
				<>
					{/* Backdrop */}
					<div
						className="fixed inset-0 z-40 bg-black/50 lg:hidden animate-fade-in"
						onClick={() => setIsMobileMenuOpen(false)}
					/>

					{/* Mobile Menu */}
					<div className="fixed left-0 top-16 z-40 h-[calc(100vh-64px)] w-72 border-r border-border bg-background shadow-xl lg:hidden animate-slide-in-left overflow-y-auto">
						<div className="flex h-full flex-col p-4">
							{/* User Info */}
							{user && (
								<div className="mb-6 flex items-center gap-3 rounded-md border border-border bg-muted/50 p-3">
									<div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive font-bold text-white">
										{user.name.charAt(0).toUpperCase()}
									</div>
									<div className="flex-1 min-w-0">
										<div className="font-semibold text-sm truncate">
											{user.name}
										</div>
										<div className="text-xs text-muted-foreground truncate">
											{user.email}
										</div>
									</div>
								</div>
							)}

							{/* Location Selector - Mobile */}
							<div className="mb-6 md:hidden">
								<label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
									<MapPin className="inline h-3 w-3 mr-1" />
									Select Site
								</label>
								<select
									value={selectedSite.id}
									onChange={(e) => {
										const site = sites.find(
											(s) =>
												s.id === Number(e.target.value)
										);
										if (site) setSelectedSite(site);
									}}
									className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:border-destructive focus:outline-none focus:ring-2 focus:ring-destructive/20"
								>
									{sites.map((site) => (
										<option key={site.id} value={site.id}>
											{site.name}{" "}
											{site.code ? `(${site.code})` : ""}
										</option>
									))}
								</select>
							</div>

							{/* Menu Items */}
							<nav className="flex-1 space-y-1">
								<Link
									to="/cart"
									onClick={() => setIsMobileMenuOpen(false)}
									className="flex h-11 items-center gap-3 rounded-md px-4 text-sm font-medium hover:bg-accent transition-colors"
								>
									<ShoppingCart className="h-5 w-5" />
									<span>Shopping Cart</span>
									{cartCount > 0 && (
										<span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-destructive px-1.5 text-xs font-bold text-white">
											{cartCount}
										</span>
									)}
								</Link>

								<Link
									to="/notifications"
									onClick={() => setIsMobileMenuOpen(false)}
									className="flex h-11 items-center gap-3 rounded-md px-4 text-sm font-medium hover:bg-accent transition-colors"
								>
									<Bell className="h-5 w-5" />
									<span>Notifications</span>
									{unreadCount > 0 && (
										<span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-destructive px-1.5 text-xs font-bold text-white">
											{unreadCount}
										</span>
									)}
								</Link>

								<Link
									to="/messages"
									onClick={() => setIsMobileMenuOpen(false)}
									className="flex h-11 items-center gap-3 rounded-md px-4 text-sm font-medium hover:bg-accent transition-colors"
								>
									<Mail className="h-5 w-5" />
									<span>Messages</span>
								</Link>

								<Link
									to="/profile"
									onClick={() => setIsMobileMenuOpen(false)}
									className="flex h-11 items-center gap-3 rounded-md px-4 text-sm font-medium hover:bg-accent transition-colors"
								>
									<svg
										className="h-5 w-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										/>
									</svg>
									<span>Profile</span>
								</Link>

								<div className="my-3 border-t border-border" />

								<Link
									to="/support"
									onClick={() => setIsMobileMenuOpen(false)}
									className="flex h-11 items-center gap-3 rounded-md px-4 text-sm font-medium hover:bg-accent transition-colors"
								>
									<svg
										className="h-5 w-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
										/>
									</svg>
									<span>Support</span>
								</Link>
							</nav>

							{/* Logout Button */}
							<button
								onClick={() => {
									setIsMobileMenuOpen(false);
									navigate("/");
								}}
								className="w-full rounded-md bg-destructive px-4 py-3 text-sm font-semibold text-white hover:bg-destructive/90 transition-colors"
							>
								Logout
							</button>
						</div>
					</div>
				</>
			)}
		</>
	);
}
