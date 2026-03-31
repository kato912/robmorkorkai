import type { Shop } from "../../types/shop";
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
    storeRequests: Shop[];
    filteredStores: Shop[];
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    selectedCategory: string;
    setSelectedCategory: (c: string) => void;
    categories: string[];
    isFilterDropdownOpen: boolean;
    setIsFilterDropdownOpen: (open: boolean) => void;
    stats: {
        totalStores: number;
        totalReviews: number;
        totalUsers: number;
    };
    onDelete: (id: string) => void;
    onViewDetail: (shop: Shop) => void;
    onEdit: (shop: Shop) => void;
    onAddShop: () => void;
    logout: () => void;
}