import React, { useState, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { mockStoreRequests, type ShopRequest, type StoreStatus } from "../../data/mockAdminData";
import { ShopDetailModal, EditShopModal, theme } from "../admin/AdminComponents";
import { AdminDesktop } from "../admin/AdminDesktop";
import { AdminMobile } from "../admin/AdminMobile";
import type { TabType } from "../admin/types";

export const AdminPage: React.FC = () => {
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState<TabType>("overview");
    const [storeRequests, setStoreRequests] = useState<ShopRequest[]>(mockStoreRequests);
    
    // UI State
    const [selectedShop, setSelectedShop] = useState<ShopRequest | null>(null);
    const [editingShop, setEditingShop] = useState<ShopRequest | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

    // Logic
    const categories = ["all", ...new Set(storeRequests.map(s => s.category))];
    const filteredStores = useMemo(() => {
        return storeRequests.filter(shop => {
            const matchesSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase()) || shop.owner.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "all" || shop.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [storeRequests, searchQuery, selectedCategory]);

    const stats = {
        totalStores: storeRequests.length,
        pendingStores: storeRequests.filter((s) => s.status === "pending").length,
        totalReviews: 1284,
        totalUsers: 2451,
    };

    // Actions
    const handleApproveStore = (id: string) => { if (window.confirm("ยืนยันการอนุมัติ?")) { setStoreRequests(prev => prev.map(s => s.id === id ? { ...s, status: "approved" as StoreStatus } : s)); setSelectedShop(null); } };
    const handleRejectStore = (id: string) => { if (window.confirm("ปฏิเสธคำขอ?")) { setStoreRequests(prev => prev.map(s => s.id === id ? { ...s, status: "rejected" as StoreStatus } : s)); setSelectedShop(null); } };
    const handleDeleteStore = (id: string) => { if (window.confirm("ยืนยันการลบ?")) { setStoreRequests(prev => prev.filter(s => s.id !== id)); setSelectedShop(null); } };
    const handleSaveEdit = (updatedShop: ShopRequest) => { setStoreRequests(prev => prev.map(s => s.id === updatedShop.id ? updatedShop : s)); setEditingShop(null); };

    // Common Props Bundle
    const viewProps = {
        activeTab, setActiveTab,
        storeRequests, filteredStores,
        searchQuery, setSearchQuery,
        selectedCategory, setSelectedCategory,
        categories,
        isFilterDropdownOpen, setIsFilterDropdownOpen,
        stats,
        onApprove: handleApproveStore,
        onReject: handleRejectStore,
        onDelete: handleDeleteStore,
        onViewDetail: setSelectedShop,
        onEdit: setEditingShop,
        logout
    };

    return (
        <div className="font-sans" style={{ backgroundColor: theme.bgMain }}>
            {/* Desktop View */}
            <AdminDesktop {...viewProps} />

            {/* Mobile View */}
            <AdminMobile {...viewProps} />

            {/* Shared Modals */}
            {selectedShop && (
                <ShopDetailModal 
                    shop={selectedShop} 
                    onClose={() => setSelectedShop(null)} 
                    onApprove={handleApproveStore} 
                    onReject={handleRejectStore} 
                    onDelete={handleDeleteStore}
                    onEdit={(shop: ShopRequest) => { setEditingShop(shop); setSelectedShop(null); }}
                />
            )}
            {editingShop && (
                <EditShopModal 
                    shop={editingShop} 
                    onClose={() => setEditingShop(null)} 
                    onSave={handleSaveEdit} 
                />
            )}
        </div>
    );
};