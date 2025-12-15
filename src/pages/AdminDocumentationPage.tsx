// src/pages/admin/AdminDocumentationPage.tsx
import { useState } from "react";
import { AdminLayout } from "../components/layout/AdminLayout";
import { DocumentTable } from "../components/documentation/DocumentTable";
import { CategoryTabs } from "../components/documentation/CategoryTabs";
import { SearchBar } from "../components/documentation/SearchBar";
import { mockDocuments, mockMachines, mockCustomers } from "../data/mockData";
import { DocumentCategory } from "../data/types/types";
import { X, MapPin, Filter, ExternalLink, Mail, FileText, Users, Wrench } from "lucide-react";
import { Button } from "../components/ui/Button";

// Mock locations data
const mockLocations = [
    {
        id: "1",
        customerId: "1",
        name: "Ditsch USA, LLC - Northland Blvd, Cincinnati",
        code: "LN-003538",
    },
    {
        id: "2",
        customerId: "2",
        name: "Mid South Baking - Bryan",
        code: "LN-0000360",
    },
    {
        id: "3",
        customerId: "3",
        name: "Flowers Bakeries - Atlanta",
        code: "LN-0001099",
    },
];

// Mock equipment data matching the screenshot
const mockEquipment = [
    {
        id: "1",
        customerId: "1",
        locationId: "1",
        customerName: "Ditsch USA, LLC",
        locationName: "Northland Blvd, Cincinnati",
        group: "Make-Up Systems",
        category: "Sheeting",
        model: "Bread Line",
        product: "Sheeting Line",
        productCode: "000000000",
        serialNumber: "24135-4000",
        recordCreated: "10/11/2024 8:40:13 PM",
        lastModified: "3/26/2025 8:40:40 PM",
    },
    {
        id: "2",
        customerId: "1",
        locationId: "1",
        customerName: "Ditsch USA, LLC",
        locationName: "Northland Blvd, Cincinnati",
        group: "Proofing & Baking Systems",
        category: "Baking",
        model: "Tunnel Ovens",
        product: "Den Boer Multibake-I Tunnel Oven",
        productCode: "000000000",
        serialNumber: "22144-5000",
        recordCreated: "3/8/2023 7:40:33 PM",
        lastModified: "3/14/2023 6:40:32 PM",
    },
    {
        id: "3",
        customerId: "1",
        locationId: "1",
        customerName: "Ditsch USA, LLC",
        locationName: "Northland Blvd, Cincinnati",
        group: "Proofing & Baking Systems",
        category: "Belt Proofer",
        model: "Multideck Belt Proofer",
        product: "Multi-Deck Belt Proofer",
        productCode: "000000000",
        serialNumber: "22144-4000",
        recordCreated: "3/22/2023 8:40:38 PM",
        lastModified: "3/22/2023 8:40:38 PM",
    },
    {
        id: "4",
        customerId: "2",
        locationId: "2",
        customerName: "Mid South Baking",
        locationName: "Bryan",
        group: "Make-Up Systems",
        category: "Dividing",
        model: "Divider Rounder",
        product: "Automatic Divider Rounder",
        productCode: "000000001",
        serialNumber: "25678-3000",
        recordCreated: "5/15/2024 10:20:15 AM",
        lastModified: "11/10/2024 3:45:22 PM",
    },
    {
        id: "5",
        customerId: "2",
        locationId: "2",
        customerName: "Mid South Baking",
        locationName: "Bryan",
        group: "Proofing & Baking Systems",
        category: "Proofing",
        model: "Box Proofer",
        product: "Enclosed Box Proofer",
        productCode: "000000002",
        serialNumber: "26789-2000",
        recordCreated: "6/20/2024 2:30:45 PM",
        lastModified: "12/05/2024 9:15:30 AM",
    },
    {
        id: "6",
        customerId: "3",
        locationId: "3",
        customerName: "Flowers Bakeries",
        locationName: "Atlanta",
        group: "Cooling & Packaging",
        category: "Cooling",
        model: "Spiral Cooler",
        product: "Multi-Tier Spiral Cooling Tower",
        productCode: "000000003",
        serialNumber: "27890-1000",
        recordCreated: "2/10/2024 11:45:00 AM",
        lastModified: "8/22/2024 4:20:18 PM",
    },
];

// Mock email subscribers data
const mockEmailSubscribers = [
    {
        id: "1",
        customerId: "1",
        locationId: "1",
        customerName: "Ditsch USA, LLC",
        locationName: "Northland Blvd, Cincinnati",
        emailAddress: "gary.gottenbusch@ditsch.com",
        receiveDocumentationUpdates: true,
        receiveTrainingUpdates: true,
        registeredForNotifications: "3/8/2023 7:40:33 PM",
        lastNotificationSent: "12/21/2024 12:18:10 AM",
    },
    {
        id: "2",
        customerId: "1",
        locationId: "1",
        customerName: "Ditsch USA, LLC",
        locationName: "Northland Blvd, Cincinnati",
        emailAddress: "Jeff.Gilkey@ditsch.com",
        receiveDocumentationUpdates: false,
        receiveTrainingUpdates: false,
        registeredForNotifications: "10/11/2024 8:40:13 PM",
        lastNotificationSent: "3/26/2025 8:40:40 PM",
    },
    {
        id: "3",
        customerId: "2",
        locationId: "2",
        customerName: "Mid South Baking",
        locationName: "Bryan",
        emailAddress: "john.smith@midsouthbaking.com",
        receiveDocumentationUpdates: true,
        receiveTrainingUpdates: true,
        registeredForNotifications: "5/15/2024 2:30:00 PM",
        lastNotificationSent: "12/10/2024 9:15:30 AM",
    },
    {
        id: "4",
        customerId: "2",
        locationId: "2",
        customerName: "Mid South Baking",
        locationName: "Bryan",
        emailAddress: "sarah.jones@midsouthbaking.com",
        receiveDocumentationUpdates: true,
        receiveTrainingUpdates: false,
        registeredForNotifications: "6/20/2024 11:45:22 AM",
        lastNotificationSent: "12/12/2024 3:22:18 PM",
    },
    {
        id: "5",
        customerId: "3",
        locationId: "3",
        customerName: "Flowers Bakeries",
        locationName: "Atlanta",
        emailAddress: "mike.wilson@flowers.com",
        receiveDocumentationUpdates: true,
        receiveTrainingUpdates: true,
        registeredForNotifications: "2/10/2024 8:15:30 AM",
        lastNotificationSent: "12/14/2024 7:45:12 AM",
    },
];

// Helper function to check if document is new (< 3 months old)
const isDocumentNew = (uploadDate: string): boolean => {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    const docDate = new Date(uploadDate);
    return docDate >= threeMonthsAgo;
};

type AdminTab = "documents" | "equipment" | "subscribers";

export default function AdminDocumentationPage() {
    // Tab state
    const [activeTab, setActiveTab] = useState<AdminTab>("documents");

    // Customer/Location filters
    const [selectedCustomer, setSelectedCustomer] = useState<string>("");
    const [selectedLocation, setSelectedLocation] = useState<string>("");
    
    // Documents tab state
    const [selectedMachineId, setSelectedMachineId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<DocumentCategory>("manuals");

    // Equipment & Subscribers search
    const [equipmentSearchTerm, setEquipmentSearchTerm] = useState("");
    const [subscriberSearchTerm, setSubscriberSearchTerm] = useState("");

    const filteredLocations = mockLocations.filter(
        (loc) => !selectedCustomer || loc.customerId === selectedCustomer
    );

    // Filter documents
    const filteredDocuments = mockDocuments.filter((doc) => {
        const matchesCategory = doc.category === selectedCategory;
        const matchesMachine = !selectedMachineId || doc.machineId === selectedMachineId;
        const matchesSearch =
            searchTerm === "" ||
            doc.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCustomer = !selectedCustomer || doc.customerId === selectedCustomer;
        const matchesLocation = !selectedLocation || doc.locationId === selectedLocation;

        return (
            matchesCategory &&
            matchesMachine &&
            matchesSearch &&
            matchesCustomer &&
            matchesLocation
        );
    });

    // Filter equipment
    const filteredEquipment = mockEquipment.filter((equipment) => {
        const matchesCustomer = !selectedCustomer || equipment.customerId === selectedCustomer;
        const matchesLocation = !selectedLocation || equipment.locationId === selectedLocation;
        const matchesSearch =
            equipmentSearchTerm === "" ||
            equipment.group.toLowerCase().includes(equipmentSearchTerm.toLowerCase()) ||
            equipment.category.toLowerCase().includes(equipmentSearchTerm.toLowerCase()) ||
            equipment.model.toLowerCase().includes(equipmentSearchTerm.toLowerCase()) ||
            equipment.product.toLowerCase().includes(equipmentSearchTerm.toLowerCase()) ||
            equipment.serialNumber.toLowerCase().includes(equipmentSearchTerm.toLowerCase());

        return matchesCustomer && matchesLocation && matchesSearch;
    });

    // Filter email subscribers
    const filteredSubscribers = mockEmailSubscribers.filter((subscriber) => {
        const matchesCustomer = !selectedCustomer || subscriber.customerId === selectedCustomer;
        const matchesLocation = !selectedLocation || subscriber.locationId === selectedLocation;
        const matchesSearch =
            subscriberSearchTerm === "" ||
            subscriber.emailAddress.toLowerCase().includes(subscriberSearchTerm.toLowerCase()) ||
            subscriber.customerName.toLowerCase().includes(subscriberSearchTerm.toLowerCase()) ||
            subscriber.locationName.toLowerCase().includes(subscriberSearchTerm.toLowerCase());

        return matchesCustomer && matchesLocation && matchesSearch;
    });

    // Add isNew flag
    const documentsWithMetadata = filteredDocuments.map((doc) => ({
        ...doc,
        isFavorite: false,
        isNew: isDocumentNew(doc.uploadDate),
    }));

    const handleDownloadSelected = (documentIds: string[]) => {
        console.log("Downloading documents:", documentIds);
        alert(`Downloading ${documentIds.length} document(s)`);
    };

    return (
        <AdminLayout>
            <div className="space-y-6 p-3 sm:p-4 md:p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold">
                            Documentation - Admin Access
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Backdoor access to all customer documentation, equipment, and subscribers
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => window.open("/documentation", "_blank")}
                        className="hidden sm:flex items-center gap-2"
                    >
                        <ExternalLink className="h-4 w-4" />
                        View Customer Portal
                    </Button>
                </div>

                {/* Tabs */}
                <div className="border-b border-border">
                    <nav className="flex gap-6">
                        <button
                            onClick={() => setActiveTab("documents")}
                            className={`flex items-center gap-2 pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === "documents"
                                    ? "border-destructive text-destructive"
                                    : "border-transparent text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            <FileText className="h-4 w-4" />
                            Documents
                        </button>
                        <button
                            onClick={() => setActiveTab("equipment")}
                            className={`flex items-center gap-2 pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === "equipment"
                                    ? "border-destructive text-destructive"
                                    : "border-transparent text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            <Wrench className="h-4 w-4" />
                            Equipment
                            <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-muted">
                                {filteredEquipment.length}
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab("subscribers")}
                            className={`flex items-center gap-2 pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === "subscribers"
                                    ? "border-destructive text-destructive"
                                    : "border-transparent text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            <Mail className="h-4 w-4" />
                            Email Subscribers
                            <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-muted">
                                {filteredSubscribers.length}
                            </span>
                        </button>
                    </nav>
                </div>

                {/* Admin Filters Card */}
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950/20 p-4">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 shrink-0">
                            <Filter className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-yellow-800 dark:text-yellow-400 mb-1">
                                Admin Filters (Optional)
                            </h3>
                            <p className="text-xs text-yellow-700 dark:text-yellow-500">
                                {activeTab === "documents" && "By default, you can search ALL documents across ALL customers and locations."}
                                {activeTab === "equipment" && "By default, you can view ALL equipment across ALL customers and locations."}
                                {activeTab === "subscribers" && "By default, you can view ALL email subscribers across ALL customers and locations."}
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <label className="block text-xs font-medium mb-1.5 text-yellow-800 dark:text-yellow-400">
                                Customer
                            </label>
                            <select
                                value={selectedCustomer}
                                onChange={(e) => {
                                    setSelectedCustomer(e.target.value);
                                    setSelectedLocation("");
                                }}
                                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-destructive focus:outline-none focus:ring-2 focus:ring-destructive/20"
                            >
                                <option value="">All Customers</option>
                                {mockCustomers.map((customer) => (
                                    <option key={customer.id} value={customer.id}>
                                        {customer.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium mb-1.5 text-yellow-800 dark:text-yellow-400">
                                Location
                            </label>
                            <select
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                                disabled={!selectedCustomer}
                                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-destructive focus:outline-none focus:ring-2 focus:ring-destructive/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <option value="">All Locations</option>
                                {filteredLocations.map((location) => (
                                    <option key={location.id} value={location.id}>
                                        {location.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {activeTab === "documents" && (
                            <div>
                                <label className="block text-xs font-medium mb-1.5 text-yellow-800 dark:text-yellow-400">
                                    Machine
                                </label>
                                <select
                                    value={selectedMachineId || ""}
                                    onChange={(e) =>
                                        setSelectedMachineId(e.target.value === "" ? null : e.target.value)
                                    }
                                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-destructive focus:outline-none focus:ring-2 focus:ring-destructive/20"
                                >
                                    <option value="">All Machines</option>
                                    {mockMachines.map((machine) => (
                                        <option key={machine.id} value={machine.id}>
                                            {machine.name} ({machine.serialNumber})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    {(selectedCustomer || selectedLocation || selectedMachineId) && (
                        <div className="mt-3">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setSelectedCustomer("");
                                    setSelectedLocation("");
                                    setSelectedMachineId(null);
                                }}
                                className="text-xs"
                            >
                                Clear All Filters
                            </Button>
                        </div>
                    )}
                </div>

                {/* Documents Tab Content */}
                {activeTab === "documents" && (
                    <>
                        <div className="overflow-x-auto scrollbar-hide">
                            <CategoryTabs
                                selectedCategory={selectedCategory}
                                onCategoryChange={setSelectedCategory}
                            />
                        </div>

                        <div>
                            <SearchBar value={searchTerm} onChange={setSearchTerm} />
                        </div>

                        {(searchTerm || selectedCustomer || selectedLocation || selectedMachineId) && (
                            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                                <span className="text-muted-foreground">Active filters:</span>
                                {searchTerm && (
                                    <div className="flex items-center gap-1.5 rounded-full bg-muted px-2.5 sm:px-3 py-1.5">
                                        <span className="font-medium">Search: {searchTerm}</span>
                                        <button onClick={() => setSearchTerm("")} className="hover:text-destructive transition-colors">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                )}
                                {selectedCustomer && (
                                    <div className="flex items-center gap-1.5 rounded-full bg-muted px-2.5 sm:px-3 py-1.5">
                                        <span className="font-medium">Customer filtered</span>
                                        <button onClick={() => { setSelectedCustomer(""); setSelectedLocation(""); }} className="hover:text-destructive transition-colors">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                )}
                                {selectedLocation && (
                                    <div className="flex items-center gap-1.5 rounded-full bg-muted px-2.5 sm:px-3 py-1.5">
                                        <span className="font-medium">Location filtered</span>
                                        <button onClick={() => setSelectedLocation("")} className="hover:text-destructive transition-colors">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                )}
                                {selectedMachineId && (
                                    <div className="flex items-center gap-1.5 rounded-full bg-muted px-2.5 sm:px-3 py-1.5">
                                        <span className="font-medium">Machine filtered</span>
                                        <button onClick={() => setSelectedMachineId(null)} className="hover:text-destructive transition-colors">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="overflow-hidden">
                            <DocumentTable
                                documents={documentsWithMetadata}
                                onToggleFavorite={() => {}}
                                onDownloadSelected={handleDownloadSelected}
                                isAdminMode={true}
                            />
                        </div>

                        <div className="text-center text-xs sm:text-sm text-muted-foreground">
                            {documentsWithMetadata.length}{" "}
                            {documentsWithMetadata.length === 1 ? "document" : "documents"} found
                        </div>
                    </>
                )}

                {/* Equipment Tab Content */}
                {activeTab === "equipment" && (
                    <>
                        <div>
                            <SearchBar
                                value={equipmentSearchTerm}
                                onChange={setEquipmentSearchTerm}
                                placeholder="Search equipment by group, category, model, product, or serial number..."
                            />
                        </div>

                        <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-muted/50 border-b border-border">
                                        <tr>
                                            <th className="p-3 text-left font-semibold">Group</th>
                                            <th className="p-3 text-left font-semibold">Category</th>
                                            <th className="p-3 text-left font-semibold">Model</th>
                                            <th className="p-3 text-left font-semibold">Product</th>
                                            <th className="p-3 text-left font-semibold">Product Code</th>
                                            <th className="p-3 text-left font-semibold">Serial Number</th>
                                            <th className="p-3 text-left font-semibold">Record Created</th>
                                            <th className="p-3 text-left font-semibold">Last Modified</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredEquipment.length > 0 ? (
                                            filteredEquipment.map((equipment) => (
                                                <tr
                                                    key={equipment.id}
                                                    className="border-b border-border last:border-b-0 hover:bg-accent transition-colors"
                                                >
                                                    <td className="p-3">{equipment.group}</td>
                                                    <td className="p-3">{equipment.category}</td>
                                                    <td className="p-3">{equipment.model}</td>
                                                    <td className="p-3">{equipment.product}</td>
                                                    <td className="p-3 text-muted-foreground">{equipment.productCode}</td>
                                                    <td className="p-3 font-medium">{equipment.serialNumber}</td>
                                                    <td className="p-3 text-muted-foreground">{equipment.recordCreated}</td>
                                                    <td className="p-3 text-muted-foreground">{equipment.lastModified}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={8} className="p-12 text-center text-muted-foreground">
                                                    <Wrench className="h-12 w-12 mx-auto mb-3 text-muted-foreground/30" />
                                                    <p className="font-medium">No equipment found</p>
                                                    <p className="text-xs mt-1">Try adjusting your filters or search term</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="text-center text-xs sm:text-sm text-muted-foreground">
                            {filteredEquipment.length}{" "}
                            {filteredEquipment.length === 1 ? "equipment" : "equipment"} found
                        </div>
                    </>
                )}

                {/* Email Subscribers Tab Content */}
                {activeTab === "subscribers" && (
                    <>
                        <div>
                            <SearchBar
                                value={subscriberSearchTerm}
                                onChange={setSubscriberSearchTerm}
                                placeholder="Search subscribers by email, customer, or location..."
                            />
                        </div>

                        <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-muted/50 border-b border-border">
                                        <tr>
                                            <th className="p-3 text-left font-semibold">Email Address</th>
                                            <th className="p-3 text-left font-semibold">Receive Documentation Updates</th>
                                            <th className="p-3 text-left font-semibold">Receive Training Updates</th>
                                            <th className="p-3 text-left font-semibold">Registered for Notifications</th>
                                            <th className="p-3 text-left font-semibold">Last Notification Sent</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredSubscribers.length > 0 ? (
                                            filteredSubscribers.map((subscriber) => (
                                                <tr
                                                    key={subscriber.id}
                                                    className="border-b border-border last:border-b-0 hover:bg-accent transition-colors"
                                                >
                                                    <td className="p-3 font-medium">{subscriber.emailAddress}</td>
                                                    <td className="p-3">{subscriber.receiveDocumentationUpdates ? "True" : "False"}</td>
                                                    <td className="p-3">{subscriber.receiveTrainingUpdates ? "True" : "False"}</td>
                                                    <td className="p-3 text-muted-foreground">{subscriber.registeredForNotifications}</td>
                                                    <td className="p-3 text-muted-foreground">{subscriber.lastNotificationSent}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="p-12 text-center text-muted-foreground">
                                                    <Users className="h-12 w-12 mx-auto mb-3 text-muted-foreground/30" />
                                                    <p className="font-medium">No subscribers found</p>
                                                    <p className="text-xs mt-1">Try adjusting your filters or search term</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="text-center text-xs sm:text-sm text-muted-foreground">
                            {filteredSubscribers.length}{" "}
                            {filteredSubscribers.length === 1 ? "subscriber" : "subscribers"} found
                        </div>
                    </>
                )}

                {/* Admin Notice */}
                {/* <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/20 p-4">
                    <div className="flex gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 shrink-0">
                            <span className="text-white text-xs font-bold">i</span>
                        </div>
                        <div className="text-sm">
                            <p className="font-semibold text-blue-800 dark:text-blue-400 mb-1">
                                Admin Mode Active
                            </p>
                            <ul className="text-blue-700 dark:text-blue-500 text-xs space-y-1">
                                <li>✓ No LN filtering - View ALL data by default</li>
                                <li>✓ Optional filters available (customer, location, machine)</li>
                                <li>✗ Favorites feature disabled</li>
                                <li>✗ Recently viewed feature disabled</li>
                                <li>✗ Register for updates disabled</li>
                            </ul>
                        </div>
                    </div>
                </div> */}
            </div>
        </AdminLayout>
    );
}
