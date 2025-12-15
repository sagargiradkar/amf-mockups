// src/pages/admin/AdminCustomerLocations.tsx
import { useState } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Search, Edit, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

// Dummy customer locations data
const mockCustomerLocations = [
    {
        id: "1",
        siteName: "",
        siteNumber: "LN-003043",
        customerNumber: "CUS-001283",
        siteAddress: "Avonmouth Way Bristol BS11 8DQ United Kingdom",
        userCount: 2,
    },
    {
        id: "2",
        siteName: "-",
        siteNumber: "LN-007301",
        customerNumber: "CUS-004971",
        siteAddress: "United Kingdom",
        userCount: 2,
    },
    {
        id: "3",
        siteName: "-TUCKER",
        siteNumber: "LN-003015",
        customerNumber: "CUS-000911",
        siteAddress: "AMF BAKING TCHNOLOGIES SYSTEMS 5359 ROYAL WOODS PARKWAY ...",
        userCount: 2,
    },
    {
        id: "4",
        siteName: "-Wittlich",
        siteNumber: "LN-008910",
        customerNumber: "CUS-003499",
        siteAddress: "Dr. Oetker-Strasse 54516 Wittlich Germany",
        userCount: 2,
    },
    {
        id: "5",
        siteName: "• Hydrotronic Services Ltd.-Victoria Island",
        siteNumber: "LN-004867",
        customerNumber: "CUS-004083",
        siteAddress: "19, Bola Street, Opp. Julius Berger Quarry, Lekki 5th Roundabout Vict..",
        userCount: 2,
    },
    {
        id: "6",
        siteName: "1000 Degrees Pizza Brookings-Brookings",
        siteNumber: "LN-005275",
        customerNumber: "CUS-004420",
        siteAddress: "770 22nd Ave S Brookings South Dakota 57006 Canada",
        userCount: 2,
    },
    {
        id: "7",
        siteName: "1000 Degrees Pizza Roseville - Roseville",
        siteNumber: "LN-005274",
        customerNumber: "CUS-004420",
        siteAddress: "32427 Gratiot Ave Roseville, Michigan 48066 USA",
        userCount: 2,
    },
    {
        id: "8",
        siteName: "1000 Sea Trading-Al Khomra",
        siteNumber: "LN-003868",
        customerNumber: "CUS-003194",
        siteAddress: "P.O. Box 28246 Al Khomra 21263 Saudi Arabia",
        userCount: 2,
    },
    {
        id: "9",
        siteName: "151 Foods, LLC-Bellmawr",
        siteNumber: "LN-004270",
        customerNumber: "CUS-003064",
        siteAddress: "151 Benigno Blvd Bellmawr, New Jersey 08031 USA",
        userCount: 2,
    },
    {
        id: "10",
        siteName: "155 Adam boulevard-Brantford",
        siteNumber: "LN-004099",
        customerNumber: "CUS-003485",
        siteAddress: "155 Adam Boulevard Brantford Ontario N3S 7X1 Canada",
        userCount: 2,
    },
    {
        id: "11",
        siteName: "A & V Bakers-Karachi",
        siteNumber: "LN-004556",
        customerNumber: "CUS-003863",
        siteAddress: "Plot No. R-754/1, Sector 11-C/1, North Karachi, Karachi Pakistan",
        userCount: 2,
    },
    {
        id: "12",
        siteName: "AAA Bakers-Lahore",
        siteNumber: "LN-006127",
        customerNumber: "CUS-005152",
        siteAddress: "20-KM, Ferozpur Road, Lahore Pakistan",
        userCount: 2,
    },
];

type SortField = "siteName" | "siteNumber" | "customerNumber" | "siteAddress" | "userCount";
type SortDirection = "asc" | "desc" | null;

export default function AdminCustomerLocations() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState<SortField | null>("siteName");
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            if (sortDirection === "asc") setSortDirection("desc");
            else if (sortDirection === "desc") {
                setSortDirection(null);
                setSortField(null);
            }
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const SortIcon = ({ field }: { field: SortField }) => {
        if (sortField !== field) {
            return <ChevronsUpDown className="h-4 w-4 text-muted-foreground/50" />;
        }
        if (sortDirection === "asc") {
            return <ChevronUp className="h-4 w-4 text-destructive" />;
        }
        return <ChevronDown className="h-4 w-4 text-destructive" />;
    };

    // Filter and sort data
    const filteredLocations = mockCustomerLocations.filter((location) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            location.siteName.toLowerCase().includes(searchLower) ||
            location.siteNumber.toLowerCase().includes(searchLower) ||
            location.customerNumber.toLowerCase().includes(searchLower) ||
            location.siteAddress.toLowerCase().includes(searchLower)
        );
    });

    const sortedLocations = [...filteredLocations].sort((a, b) => {
        if (!sortField || !sortDirection) return 0;

        let aValue: string | number = a[sortField];
        let bValue: string | number = b[sortField];

        if (sortField === "userCount") {
            aValue = a.userCount;
            bValue = b.userCount;
        } else {
            aValue = String(a[sortField]).toLowerCase();
            bValue = String(b[sortField]).toLowerCase();
        }

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
    });

    // Pagination
    const totalPages = Math.ceil(sortedLocations.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedLocations = sortedLocations.slice(startIndex, endIndex);

    const handleEdit = (id: string) => {
        console.log("Edit location:", id);
        // TODO: Implement edit functionality
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Manage Customer Locations</h1>
                    <p className="text-muted-foreground mt-1">
                        Admin can edit the details for customer locations here.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Reset to first page on search
                        }}
                        placeholder="Search..."
                        className="w-full rounded-md border border-border bg-background pl-10 pr-4 py-2 text-sm focus:border-destructive focus:outline-none focus:ring-2 focus:ring-destructive/20"
                    />
                </div>

                {/* Table */}
                <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-muted/50 border-b border-border">
                                <tr>
                                    <th
                                        className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-muted/80 transition-colors"
                                        onClick={() => handleSort("siteName")}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span>Site Name</span>
                                            <SortIcon field="siteName" />
                                        </div>
                                    </th>
                                    <th
                                        className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-muted/80 transition-colors"
                                        onClick={() => handleSort("siteNumber")}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span>Site Number</span>
                                            <SortIcon field="siteNumber" />
                                        </div>
                                    </th>
                                    <th
                                        className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-muted/80 transition-colors"
                                        onClick={() => handleSort("customerNumber")}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span>Customer Number</span>
                                            <SortIcon field="customerNumber" />
                                        </div>
                                    </th>
                                    <th
                                        className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-muted/80 transition-colors"
                                        onClick={() => handleSort("siteAddress")}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span>Site Address</span>
                                            <SortIcon field="siteAddress" />
                                        </div>
                                    </th>
                                    <th
                                        className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-muted/80 transition-colors"
                                        onClick={() => handleSort("userCount")}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span>User #</span>
                                            <SortIcon field="userCount" />
                                        </div>
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedLocations.length > 0 ? (
                                    paginatedLocations.map((location) => (
                                        <tr
                                            key={location.id}
                                            className="border-b border-border last:border-b-0 hover:bg-accent transition-colors"
                                        >
                                            <td className="px-4 py-3 text-sm">
                                                {location.siteName || "-"}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {location.siteNumber}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {location.customerNumber}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {location.siteAddress}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-center">
                                                {location.userCount}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                <button
                                                    onClick={() => handleEdit(location.id)}
                                                    className="p-2 hover:bg-muted rounded-md transition-colors text-destructive"
                                                    aria-label="Edit location"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-4 py-12 text-center text-muted-foreground"
                                        >
                                            No locations found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between border-t border-border px-4 py-3 bg-muted/20">
                        <div className="text-sm text-muted-foreground">
                            {startIndex + 1}-{Math.min(endIndex, sortedLocations.length)} of{" "}
                            {sortedLocations.length}
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                    Rows per page:
                                </span>
                                <select
                                    value={rowsPerPage}
                                    onChange={(e) => {
                                        setRowsPerPage(Number(e.target.value));
                                        setCurrentPage(1);
                                    }}
                                    className="rounded-md border border-border bg-background px-2 py-1 text-sm focus:border-destructive focus:outline-none focus:ring-2 focus:ring-destructive/20"
                                >
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    aria-label="Previous page"
                                >
                                    <ChevronDown className="h-4 w-4 rotate-90" />
                                </button>
                                <button
                                    onClick={() =>
                                        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                                    }
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    aria-label="Next page"
                                >
                                    <ChevronDown className="h-4 w-4 -rotate-90" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
