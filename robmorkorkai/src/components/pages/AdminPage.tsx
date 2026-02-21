import React, { useState, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { ShopDetailModal, EditShopModal, theme } from "../admin/AdminComponents";
import { AdminDesktop } from "../admin/AdminDesktop";
import { AdminMobile } from "../admin/AdminMobile";
import type { TabType } from "../admin/types";
import type { Shop } from "../../types/shop";

interface AdminPageProps {
    shops: Shop[];
    onUpdateShop: (shop: Shop) => void;
    onDeleteShop: (id: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ shops, onUpdateShop, onDeleteShop }) => {
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState<TabType>("overview");
    
    // UI State
    const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
    const [editingShop, setEditingShop] = useState<Shop | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

    // Logic
    const categories = ["all", ...new Set(shops.map(s => s.category))];
    const filteredStores = useMemo(() => {
        return shops.filter(shop => {
            const ownerName = shop.owner || ""; // เผื่อร้านไหนไม่มีชื่อเจ้าของ
            const matchesSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase()) || ownerName.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "all" || shop.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [shops, searchQuery, selectedCategory]);

    // calculate stats for overview
    const stats = {
        totalStores: shops.length,
        totalReviews: shops.reduce((sum, shop) => sum + (shop.reviewCount || 0), 0), 
        totalUsers: 2451, // mock data
    };

    // Actions
    const handleDeleteStore = (id: string) => { 
        if (window.confirm("ยืนยันการลบร้านค้านี้?")) { 
            onDeleteShop(id);
            setSelectedShop(null); 
        } 
    };
    
    const handleSaveEdit = (updatedShop: Shop) => { 
        onUpdateShop(updatedShop);
        setEditingShop(null); 
    };

    // Common Props Bundle
    const viewProps = {
        activeTab, setActiveTab,
        storeRequests: filteredStores.map(shop => ({
            ...shop,
            status: "active"
        })),
        filteredStores: filteredStores.map(shop => ({
            ...shop,
            status: "active"
        })),
        searchQuery, setSearchQuery,
        selectedCategory, setSelectedCategory,
        categories,
        isFilterDropdownOpen, setIsFilterDropdownOpen,
        stats,
        onDelete: handleDeleteStore,
        onViewDetail: (shop: any) => setSelectedShop(shop as Shop),
        onEdit: (shop: any) => setEditingShop(shop as Shop),
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
                    onDelete={handleDeleteStore}
                    onEdit={(shop: Shop) => { setEditingShop(shop); setSelectedShop(null); }}
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