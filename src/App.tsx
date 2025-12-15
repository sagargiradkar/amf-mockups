import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext";
import MachinesPage from "./pages/MachinesPage";
import DocumentationPage from "./pages/DocumentationPage";
import MachineDetailsPage from "./pages/MachineDetailsPage";
import TrainingPage from "./pages/TrainingPage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchResultsPage from "./components/documentation/SearchResultsPage";
import NotificationsPage from "./pages/NotificationsPage";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import PartsPage from "./pages/PartsPage";
import DocDashboard from "./pages/DocDashboard";
import TrainDashboard from "./pages/TrainingDashboard";
import RegisterUpdatesPage from "./pages/RegisterUpdatesPage";
import RecentlyViewedPage from "./pages/RecentlyViewedPage";
import FavoritesPage from "./pages/FavoritesPage";
import HistoricalContentPage from "./pages/HistoricalContentPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDocuments from "./pages/AdminDocuments";
import AdminDocumentationPage from "./pages/AdminDocumentationPage";
import AdminCustomerLocations from "./components/documentation/AdminCustomerLocations";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 1,
			staleTime: 5 * 60 * 1000, // 5 minutes
		},
	},
});

const App = () => (
	<QueryClientProvider client={queryClient}>
		<ThemeProvider>
			<AuthProvider>
				<NotificationProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/parts" element={<PartsPage />} />
							<Route
								path="/machines"
								element={<MachinesPage />}
							/>
							{/* Documentation dashboard (4 cards screen) */}
							<Route
								path="/documentationdashboard"
								element={<DocDashboard />}
							/>

							{/* optional nested routes you linked from cards */}
							<Route
								path="/documentationdashboard"
								element={<div>Search Content</div>}
							/>
							<Route
								path="/documentationdashboard"
								element={<div>Register for Updates</div>}
							/>
							<Route
								path="/documentationdashboard"
								element={<div>Historical Content</div>}
							/>
							<Route
								path="/documentationdashboard"
								element={<div>Parts Documentation</div>}
							/>
							<Route
								path="/machines/:id"
								element={<MachineDetailsPage />}
							/>
							<Route
								path="/search"
								element={<SearchResultsPage />}
							/>
							<Route
								path="/documentation"
								element={<DocumentationPage />}
							/>
							<Route
								path="/documentation/:id"
								element={<DocumentationPage />}
							/>

							<Route
								path="/training"
								element={<TrainDashboard />}
							/>
							<Route
								path="/traning-content"
								element={<TrainingPage />}
							/>
							<Route
								path="/register-updates"
								element={<RegisterUpdatesPage />}
							/>
							<Route
								path="/recently-viewed"
								element={<RecentlyViewedPage />}
							/>
							<Route
								path="/favorites"
								element={<FavoritesPage />}
							/>
							<Route
								path="/historical-content"
								element={<HistoricalContentPage />}
							/>

							<Route path="/parts" element={<MachinesPage />} />
							<Route path="/service" element={<MachinesPage />} />
							<Route
								path="/notifications"
								element={<NotificationsPage />}
							/>
							<Route path="/cart" element={<CartPage />} />

							<Route path="*" element={<NotFoundPage />} />
							<Route path="/admin" element={<AdminDashboard />} />
							<Route
								path="/admin/documents"
								element={<AdminDocumentationPage />}
							/>
							{/* <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/roles" element={<AdminRoles />} />
                <Route path="/admin/customer-locations" element={<AdminCustomerLocations />} />
                <Route path="/admin/machine-provision" element={<AdminMachineProvision />} />
                <Route path="/admin/price-markups" element={<AdminPriceMarkups />} />
                <Route path="/admin/upload-models" element={<AdminUploadModels />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                <Route path="/admin/policy-center" element={<AdminPolicyCenter />} /> */}
							{/* <Route
								path="/admin/documentation"
								element={< />}
							/> */}
							<Route path="/admin/customer-locations" element={<AdminCustomerLocations />} />

						</Routes>
					</BrowserRouter>
				</NotificationProvider>
			</AuthProvider>
		</ThemeProvider>
	</QueryClientProvider>
);

export default App;
