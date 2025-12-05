// import { useState, useEffect } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { Layout } from "../layout/Layout";
// import { mockDocuments, mockMachines, mockPages } from "../../data/mockData";
// import {
// 	Search,
// 	Wrench,
// 	FileText,
// 	Link as LinkIcon,
// 	Package,
// } from "lucide-react";

// export default function SearchResultsPage() {
// 	const [searchParams, setSearchParams] = useSearchParams();
// 	const navigate = useNavigate();

// 	// URL query value, default empty = show all
// 	const urlQuery = searchParams.get("q") || "";
// 	const [searchTerm, setSearchTerm] = useState(urlQuery);

// 	// Keep input in sync when URL changes (back/forward, external link, etc.)
// 	useEffect(() => {
// 		setSearchTerm(urlQuery);
// 	}, [urlQuery]);

// 	// Normalized query used for filtering
// 	const query = urlQuery.trim().toLowerCase();

// 	// If query === "" -> behaves like "show everything"
// 	const searchMachines = mockMachines.filter((machine) => {
// 		if (!query) return true;
// 		return (
// 			machine.name.toLowerCase().includes(query) ||
// 			machine.serialNumber.toLowerCase().includes(query)
// 		);
// 	});

// 	const searchDocuments = mockDocuments.filter((doc) => {
// 		if (!query) return true;
// 		return (
// 			doc.filename.toLowerCase().includes(query) ||
// 			doc.serialNumber.toLowerCase().includes(query)
// 		);
// 	});

// 	const searchPages = mockPages.filter((page) => {
// 		if (!query) return true;
// 		return (
// 			page.title.toLowerCase().includes(query) ||
// 			page.url.toLowerCase().includes(query)
// 		);
// 	});

// 	const handleSearch = (e: React.FormEvent) => {
// 		e.preventDefault();
// 		const next = new URLSearchParams(searchParams);
// 		const value = searchTerm.trim();

// 		if (value) next.set("q", value);
// 		else next.delete("q"); // empty => remove param, show all

// 		setSearchParams(next);
// 	};

// 	const clearSearch = () => {
// 		setSearchTerm("");
// 		const next = new URLSearchParams(searchParams);
// 		next.delete("q");
// 		setSearchParams(next);
// 	};
// 	const visiblePages = searchPages.slice(0, 3);
// 	const visibleMachines = searchMachines.slice(0, 3);
// 	const visibleDocuments = searchDocuments.slice(0, 3);

// 	const totalResults =
// 		searchMachines.length + searchDocuments.length + searchPages.length;

// 	return (
// 		<Layout>
// 			<div className="p-6 max-w-6xl mx-auto">
// 				{/* Page Header */}
// 				<div className="mb-8 text-center">
// 					<h1 className="text-3xl font-bold uppercase tracking-wide mb-2">
// 						Search Results
// 					</h1>
// 					<p className="text-muted-foreground">
// 						{query ? (
// 							<>
// 								Search results for{" "}
// 								<span className="font-semibold">
// 									"{urlQuery}"
// 								</span>
// 							</>
// 						) : (
// 							"Showing all pages and content"
// 						)}
// 					</p>
// 				</div>

// 				{/* Search Bar */}
// 				<form onSubmit={handleSearch} className="mb-8">
// 					<div className="relative max-w-2xl mx-auto">
// 						<Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
// 						<input
// 							type="text"
// 							value={searchTerm}
// 							onChange={(e) => setSearchTerm(e.target.value)}
// 							placeholder="Search Parts, Machines, Orders, Documents, Pages..."
// 							className="h-14 w-full rounded-lg border-2 border-border bg-background pl-12 pr-32 text-base focus:border-destructive focus:outline-none focus:ring-2 focus:ring-destructive/20"
// 						/>
// 						<div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
// 							{searchTerm && (
// 								<button
// 									type="button"
// 									onClick={clearSearch}
// 									className="text-sm font-medium text-destructive hover:underline"
// 								>
// 									Clear Results
// 								</button>
// 							)}
// 							<button
// 								type="submit"
// 								className="rounded-md bg-destructive px-4 py-2 text-sm font-semibold text-white hover:bg-destructive/90"
// 							>
// 								Search
// 							</button>
// 						</div>
// 					</div>
// 				</form>

// 				{/* Results Summary (always visible, even with empty query) */}
// 				<div className="mb-6 grid grid-cols-5 gap-4">
// 					{/* Machines */}
// 					<div className="rounded-lg border border-border bg-card p-4 text-center">
// 						<div className="mb-2 flex items-center justify-center">
// 							<div className="rounded-full bg-blue-100 p-3">
// 								<Wrench className="h-6 w-6 text-blue-600" />
// 							</div>
// 						</div>
// 						<div className="text-sm font-medium text-muted-foreground uppercase">
// 							Machines
// 						</div>
// 						<div className="text-2xl font-bold">
// 							{searchMachines.length}
// 						</div>
// 					</div>

// 					{/* Parts (still static for now) */}
// 					<div className="rounded-lg border border-border bg-card p-4 text-center">
// 						<div className="mb-2 flex items-center justify-center">
// 							<div className="rounded-full bg-green-100 p-3">
// 								<Package className="h-6 w-6 text-green-600" />
// 							</div>
// 						</div>
// 						<div className="text-sm font-medium text-muted-foreground uppercase">
// 							Parts
// 						</div>
// 						<div className="text-2xl font-bold">0</div>
// 					</div>

// 					{/* Pages */}
// 					<div className="rounded-lg border border-border bg-card p-4 text-center">
// 						<div className="mb-2 flex items-center justify-center">
// 							<div className="rounded-full bg-purple-100 p-3">
// 								<LinkIcon className="h-6 w-6 text-purple-600" />
// 							</div>
// 						</div>
// 						<div className="text-sm font-medium text-muted-foreground uppercase">
// 							Pages
// 						</div>
// 						<div className="text-2xl font-bold">
// 							{searchPages.length}
// 						</div>
// 					</div>

// 					{/* Documents */}
// 					<div className="rounded-lg border border-border bg-card p-4 text-center">
// 						<div className="mb-2 flex items-center justify-center">
// 							<div className="rounded-full bg-blue-100 p-3">
// 								<FileText className="h-6 w-6 text-blue-600" />
// 							</div>
// 						</div>
// 						<div className="text-sm font-medium text-muted-foreground uppercase">
// 							Documents
// 						</div>
// 						<div className="text-2xl font-bold">
// 							{searchDocuments.length}
// 						</div>
// 					</div>

// 					{/* Orders (static) */}
// 					<div className="rounded-lg border border-border bg-card p-4 text-center">
// 						<div className="mb-2 flex items-center justify-center">
// 							<div className="rounded-full bg-yellow-100 p-3">
// 								<Package className="h-6 w-6 text-yellow-600" />
// 							</div>
// 						</div>
// 						<div className="text-sm font-medium text-muted-foreground uppercase">
// 							Orders
// 						</div>
// 						<div className="text-2xl font-bold">0</div>
// 					</div>
// 				</div>

// 				{/* Results Sections */}
// 				{totalResults === 0 ? (
// 					<div className="py-20 text-center">
// 						<Search className="mx-auto mb-4 h-16 w-16 text-muted-foreground/40" />
// 						<h3 className="mb-2 text-xl font-medium">
// 							No results found
// 						</h3>
// 						<p className="text-muted-foreground">
// 							Try adjusting your search terms or browse our
// 							categories
// 						</p>
// 					</div>
// 				) : (
// 					<div className="space-y-8">
// 						{/* Pages section first, like your screenshot */}
// 						{searchPages.length > 0 && (
// 							<div>
// 								<h2 className="mb-4 text-lg font-semibold uppercase tracking-wide">
// 									Pages
// 								</h2>
// 								<div className="space-y-2">
// 									{visiblePages.map((page) => (
// 										<div
// 											key={page.id}
// 											onClick={() => navigate(page.url)}
// 											className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent cursor-pointer"
// 										>
// 											<div className="flex items-center gap-4">
// 												<LinkIcon className="h-5 w-5 text-muted-foreground" />
// 												<div>
// 													<h3 className="font-medium">
// 														{page.title}
// 													</h3>
// 													<p className="text-sm text-muted-foreground">
// 														{page.url}
// 													</p>
// 												</div>
// 											</div>
// 											<button className="text-sm text-destructive font-medium hover:underline">
// 												Visit Page →
// 											</button>
// 										</div>
// 									))}
// 								</div>
// 							</div>
// 						)}

// 						{/* Machines Results */}
// 						{searchMachines.length > 0 && (
// 							<div>
// 								<h2 className="mb-4 text-lg font-semibold uppercase tracking-wide">
// 									Machines
// 								</h2>
// 								<div className="space-y-2">
// 									{visibleMachines.map((machine) => (
// 										<div
// 											key={machine.id}
// 											onClick={() =>
// 												navigate(
// 													`/machines/${machine.id}`
// 												)
// 											}
// 											className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent cursor-pointer"
// 										>
// 											<div className="flex items-center gap-4">
// 												<Wrench className="h-5 w-5 text-muted-foreground" />
// 												<div>
// 													<h3 className="font-medium">
// 														{machine.name}
// 													</h3>
// 													<p className="text-sm text-muted-foreground">
// 														SN:{" "}
// 														{machine.serialNumber}
// 													</p>
// 												</div>
// 											</div>
// 											<button className="text-sm text-destructive font-medium hover:underline">
// 												View Details →
// 											</button>
// 										</div>
// 									))}
// 								</div>
// 							</div>
// 						)}

// 						{/* Documents Results */}
// 						{searchDocuments.length > 0 && (
// 							<div>
// 								<h2 className="mb-4 text-lg font-semibold uppercase tracking-wide">
// 									Documents
// 								</h2>
// 								<div className="space-y-2">
// 									{visibleDocuments.map((doc) => (
// 										<div
// 											key={doc.id}
// 											className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent cursor-pointer"
// 										>
// 											<div className="flex items-center gap-4">
// 												<FileText className="h-5 w-5 text-muted-foreground" />
// 												<div>
// 													<div className="flex items-center gap-2">
// 														<h3 className="font-medium">
// 															{doc.filename}
// 														</h3>
// 														{doc.isNew && (
// 															<span className="rounded-full bg-destructive px-2 py-0.5 text-xs font-bold text-white">
// 																NEW
// 															</span>
// 														)}
// 													</div>
// 													<p className="text-sm text-muted-foreground">
// 														{doc.serialNumber} •{" "}
// 														{doc.category}
// 													</p>
// 												</div>
// 											</div>
// 											<button className="text-sm text-destructive font-medium hover:underline">
// 												View Document →
// 											</button>
// 										</div>
// 									))}
// 								</div>
// 							</div>
// 						)}
// 					</div>
// 				)}
// 			</div>
// 		</Layout>
// 	);
// }

import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { mockDocuments, mockMachines, mockPages } from "../../data/mockData";
import {
	Search,
	Wrench,
	FileText,
	Link as LinkIcon,
	Package,
} from "lucide-react";

export default function SearchResultsPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	// URL query value, default empty = show all
	const urlQuery = searchParams.get("q") || "";
	const [searchTerm, setSearchTerm] = useState(urlQuery);

	// Keep input in sync when URL changes (back/forward, external link, etc.)
	useEffect(() => {
		setSearchTerm(urlQuery);
	}, [urlQuery]);

	// Normalized query used for filtering
	const query = urlQuery.trim().toLowerCase();

	// If query === "" -> behaves like "show everything"
	const searchMachines = mockMachines.filter((machine) => {
		if (!query) return true;
		return (
			machine.name.toLowerCase().includes(query) ||
			machine.serialNumber.toLowerCase().includes(query)
		);
	});

	const searchDocuments = mockDocuments.filter((doc) => {
		if (!query) return true;
		return (
			doc.filename.toLowerCase().includes(query) ||
			doc.serialNumber.toLowerCase().includes(query) ||
			(doc.category && doc.category.toLowerCase().includes(query))
		);
	});

	const searchPages = mockPages.filter((page) => {
		if (!query) return true;
		return (
			page.title.toLowerCase().includes(query) ||
			page.url.toLowerCase().includes(query)
		);
	});

	// Per-document-type counts (from filtered documents)
	const countByType = (type: string) =>
		searchDocuments.filter(
			(doc) => doc.category?.toLowerCase() === type.toLowerCase()
		).length;

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		const next = new URLSearchParams(searchParams);
		const value = searchTerm.trim();

		if (value) next.set("q", value);
		else next.delete("q"); // empty => remove param, show all

		setSearchParams(next);
	};

	const clearSearch = () => {
		setSearchTerm("");
		const next = new URLSearchParams(searchParams);
		next.delete("q");
		setSearchParams(next);
	};

	// Limit visible items per section to 3
	const visiblePages = searchPages.slice(0, 3);
	const visibleMachines = searchMachines.slice(0, 3);
	const visibleDocuments = searchDocuments.slice(0, 3);

	const totalResults =
		searchMachines.length + searchDocuments.length + searchPages.length;

	return (
		<Layout>
			<div className="p-6 max-w-6xl mx-auto">
				{/* Page Header */}
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold uppercase tracking-wide mb-2">
						Search Results
					</h1>
					<p className="text-muted-foreground">
						{query ? (
							<>
								Search results for{" "}
								<span className="font-semibold">
									"{urlQuery}"
								</span>
							</>
						) : (
							"Showing all pages and content"
						)}
					</p>
				</div>

				{/* Search Bar */}
				<form onSubmit={handleSearch} className="mb-8">
					<div className="relative max-w-2xl mx-auto">
						<Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
						<input
							type="text"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder="Search Parts, Machines, Orders, Documents, Pages..."
							className="h-14 w-full rounded-lg border-2 border-border bg-background pl-12 pr-32 text-base focus:border-destructive focus:outline-none focus:ring-2 focus:ring-destructive/20"
						/>
						<div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
							{searchTerm && (
								<button
									type="button"
									onClick={clearSearch}
									className="text-sm font-medium text-destructive hover:underline"
								>
									Clear Results
								</button>
							)}
							<button
								type="submit"
								className="rounded-md bg-destructive px-4 py-2 text-sm font-semibold text-white hover:bg-destructive/90"
							>
								Search
							</button>
						</div>
					</div>
				</form>

				{/* Results Summary (top tiles) */}
				<div className="mb-6 grid grid-cols-5 gap-4">
					{/* Machines */}
					{/* <div className="rounded-lg border border-border bg-card p-4 text-center">
            <div className="mb-2 flex items-center justify-center">
              <div className="rounded-full bg-blue-100 p-3">
                <Wrench className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="text-sm font-medium text-muted-foreground uppercase">
              Machines
            </div>
            <div className="text-2xl font-bold">{searchMachines.length}</div>
          </div> */}

					{/* Parts */}
					{/* <div className="rounded-lg border border-border bg-card p-4 text-center">
            <div className="mb-2 flex items-center justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <Package className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="text-sm font-medium text-muted-foreground uppercase">
              Parts
            </div>
            <div className="text-2xl font-bold">0</div>
          </div> */}

					{/* Pages */}
					{/* <div className="rounded-lg border border-border bg-card p-4 text-center">
            <div className="mb-2 flex items-center justify-center">
              <div className="rounded-full bg-purple-100 p-3">
                <LinkIcon className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="text-sm font-medium text-muted-foreground uppercase">
              Pages
            </div>
            <div className="text-2xl font-bold">{searchPages.length}</div>
          </div> */}

					{/* Documents */}
					{/* <div className="rounded-lg border border-border bg-card p-4 text-center">
            <div className="mb-2 flex items-center justify-center">
              <div className="rounded-full bg-blue-100 p-3">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="text-sm font-medium text-muted-foreground uppercase">
              Documents
            </div>
            <div className="text-2xl font-bold">{searchDocuments.length}</div>
          </div> */}

					{/* Orders */}
					{/* <div className="rounded-lg border border-border bg-card p-4 text-center">
            <div className="mb-2 flex items-center justify-center">
              <div className="rounded-full bg-yellow-100 p-3">
                <Package className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="text-sm font-medium text-muted-foreground uppercase">
              Orders
            </div>
            <div className="text-2xl font-bold">0</div>
          </div> */}
				</div>

				{/* Extra document-type tiles */}
				<div className="mb-10 grid grid-cols-4 gap-4">
					{[
						"custom-documentation",
						"manuals",
						"mechanical-drawings",
						"electrical-drawings",
						"boms",
						"translations",
						"certificates",
						"training",
					].map((type) => (
						<div
							key={type}
							className="rounded-lg border border-border bg-card p-4 text-center"
						>
							<div className="mb-2 flex items-center justify-center">
								<div className="rounded-full bg-slate-100 p-3">
									<FileText className="h-6 w-6 text-slate-700" />
								</div>
							</div>
							<div className="text-xs font-medium text-muted-foreground uppercase">
								{type.replace("-", " ")}
							</div>
							<div className="text-2xl font-bold">
								{countByType(type)}
							</div>
						</div>
					))}
				</div>

				{/* Results Sections */}
				{totalResults === 0 ? (
					<div className="py-20 text-center">
						<Search className="mx-auto mb-4 h-16 w-16 text-muted-foreground/40" />
						<h3 className="mb-2 text-xl font-medium">
							No results found
						</h3>
						<p className="text-muted-foreground">
							Try adjusting your search terms or browse our
							categories
						</p>
					</div>
				) : (
					<div className="space-y-8">
						{/* Pages */}
						{/* {searchPages.length > 0 && (
              <div>
                <h2 className="mb-4 text-lg font-semibold uppercase tracking-wide">
                  Pages
                </h2>
                <div className="space-y-2">
                  {visiblePages.map((page) => (
                    <div
                      key={page.id}
                      onClick={() => navigate(page.url)}
                      className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <LinkIcon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h3 className="font-medium">{page.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {page.url}
                          </p>
                        </div>
                      </div>
                      <button className="text-sm text-destructive font-medium hover:underline">
                        Visit Page →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

						{/* Machines */}
						{searchMachines.length > 0 && (
							<div>
								<h2 className="mb-4 text-lg font-semibold uppercase tracking-wide">
									Machines
								</h2>
								<div className="space-y-2">
									{visibleMachines.map((machine) => (
										<div
											key={machine.id}
											onClick={() =>
												navigate(
													`/machines/${machine.id}`
												)
											}
											className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent cursor-pointer"
										>
											<div className="flex items-center gap-4">
												<Wrench className="h-5 w-5 text-muted-foreground" />
												<div>
													<h3 className="font-medium">
														{machine.name}
													</h3>
													<p className="text-sm text-muted-foreground">
														SN:{" "}
														{machine.serialNumber}
													</p>
												</div>
											</div>
											<button className="text-sm text-destructive font-medium hover:underline">
												View Details →
											</button>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Documents */}
						{searchDocuments.length > 0 && (
							<div>
								<h2 className="mb-4 text-lg font-semibold uppercase tracking-wide">
									Documents
								</h2>
								<div className="space-y-2">
									{visibleDocuments.map((doc) => (
										<div
											key={doc.id}
											// Click anywhere on the card
											onClick={() =>
												navigate(
													`/documentation/${doc.id}`
												)
											}
											className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent cursor-pointer"
										>
											<div className="flex items-center gap-4">
												<FileText className="h-5 w-5 text-muted-foreground" />
												<div>
													<div className="flex items-center gap-2">
														<h3 className="font-medium">
															{doc.filename}
														</h3>
														{doc.isNew && (
															<span className="rounded-full bg-destructive px-2 py-0.5 text-xs font-bold text-white">
																NEW
															</span>
														)}
													</div>
													<p className="text-sm text-muted-foreground">
														{doc.serialNumber} •{" "}
														{doc.category}
													</p>
												</div>
											</div>

											{/* Separate click just on the button (stops event bubbling if you want) */}
											<button
												className="text-sm text-destructive font-medium hover:underline"
												onClick={(e) => {
													e.stopPropagation();
													navigate(
														`/documentation/${doc.id}`
													);
												}}
											>
												View Document →
											</button>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</Layout>
	);
}
