import type { ShopRequest } from "../../data/mockAdminData";
export type TabType = "overview" | "stores";
export const adminTheme = {
    sidebarBg: "#111827",
    activeBlue: "#2563eb",
    textGray: "#9ca3af",
    bgMain: "#f3f4f6",
    cardBg: "#ffffff",
};

// Props สำหรับหน้า Desktop/Mobile
export interface AdminViewProps {
    activeTab: TabType;
    setActiveTab: (tab: TabType) => void;
    storeRequests: ShopRequest[];
    filteredStores: ShopRequest[];
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    selectedCategory: string;
    setSelectedCategory: (c: string) => void;
    categories: string[];
    isFilterDropdownOpen: boolean;
    setIsFilterDropdownOpen: (open: boolean) => void;
    stats: {
        totalStores: number;
        pendingStores: number;
        totalReviews: number;
        totalUsers: number;
    };
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
    onDelete: (id: string) => void;
    onViewDetail: (shop: ShopRequest) => void;
    onEdit: (shop: ShopRequest) => void;
    logout: () => void;
}