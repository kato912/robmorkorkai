import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { ShopDetailModal, EditShopModal, theme } from "../admin/AdminComponents";
import { AdminDesktop } from "../admin/AdminDesktop";
import { AdminMobile } from "../admin/AdminMobile";
import type { TabType } from "../admin/types";
import type { Shop } from "../../types/shop";

/**
 * AdminPage
 * 
 * Main admin dashboard component that manages shop data and admin interface.
 * Handles fetching shops, users count, filtering, searching, and modal interactions.
 * Renders responsive views for both desktop and mobile layouts.
 * 
 * Key responsibilities:
 * - Fetch shops from API on mount
 * - Fetch total user count from stats API
 * - Manage tab navigation (overview/stores)
 * - Handle shop search and category filtering
 * - Manage modals for viewing and editing shops
 * - Handle shop deletion
 * - Pass props to desktop/mobile view components
 */
export const AdminPage: React.FC = () => {
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState<TabType>("overview");

    // ========== API/DATA STATE ==========
    const [shops, setShops] = useState<Shop[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalUsers, setTotalUsers] = useState(0);

    // ========== UI/MODAL STATE ==========
    const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
    const [editingShop, setEditingShop] = useState<Shop | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

    useEffect(() => {
        // ตรวจสอบ user info
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;
        console.log("📋 Current user:", user);
        console.log("📋 User role:", user?.role);
    }, []);

    /**
     * Fetch all shops from API endpoint
     * Sets shops state with fetched data or empty array on error
     * Shows loading state during fetch
     */
    const fetchShops = async () => {
        try {
            setIsLoading(true);
            console.log("🔄 ดึงข้อมูลร้านค้า...");
            const res = await api.get("/api/admin/shops");
            const data = res.data || [];
            console.log("✅ ดึงร้านค้าได้:", Array.isArray(data) ? data.length : 0, "ร้าน");
            setShops(Array.isArray(data) ? data : []);
        } catch (err: any) {
            console.error("❌ Fetch Error:", err.message);
            console.error("❌ Status:", err.response?.status);
            console.error("❌ Data:", err.response?.data);
            alert("ไม่สามารถดึงข้อมูลร้านค้าได้");
            setShops([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchShops();
    }, []);

    /**
     * Fetch total user count from admin stats API
     * Updates totalUsers state
     */
    const fetchUserCount = async () => {
        try {
            const res = await api.get("/api/admin/stats");
            setTotalUsers(res.data.totalUsers || 0);
        } catch (err) {
            console.error("Error fetching user count:", err);
            setTotalUsers(0);
        }
    };

    useEffect(() => {
        fetchUserCount();
    }, []);

    /**
     * Delete shop by ID with confirmation dialog
     * Removes shop from shops array on success
     * @param id - Shop ID to delete
     */
    const handleDeleteStore = async (id: string) => {
        if (!window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบร้านค้านี้?")) return;

        try {
            await api.delete(`/api/admin/shops/${id}`);
            setShops(prevShops => prevShops.filter(shop => shop.id !== id));
            setSelectedShop(null);
            alert("ลบร้านค้าเรียบร้อยแล้ว");
        } catch (err) {
            console.error("Delete Error:", err);
            alert("เกิดข้อผิดพลาดในการลบร้านค้า");
        }
    };

    /**
     * Update shop data via PUT request
     * Re-fetches shops after successful update
     * @param updatedShop - Shop object with updated values
     */
    const handleSaveEdit = async (updatedShop: Shop) => {
        try {
            const payload = {
                name: updatedShop.name,
                type: updatedShop.category,
                zone: updatedShop.zone,
                coverImage: updatedShop.coverImage,
                openHours: updatedShop.openHours,
            };

            const res = await api.put(`/api/admin/shops/${updatedShop.id}`, payload);
            const savedShop = res.data;

            const normalizedShop = {
                ...updatedShop,
                ...savedShop,
                category: savedShop.type || updatedShop.category,
            };

            setShops(prevShops => prevShops.map(shop =>
                shop.id === normalizedShop.id ? normalizedShop : shop
            ));

            setEditingShop(null);
            alert("บันทึกการแก้ไขเรียบร้อยแล้ว");

            // รีเฟตช์
            setTimeout(() => fetchShops(), 500);

        } catch (err: any) {
            console.error("Update Error:", err);
            alert(err.response?.data?.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        }
    };

    /**
     * Extract unique categories from shops for filter dropdown
     */
    const categories = ["all", ...new Set(shops.map(s => s.category || s.type || "ไม่ระบุหมวดหมู่"))];

    /**
     * Filter shops by search query and selected category
     * Memoized to prevent unnecessary recalculations on every render
     */
    const filteredStores = useMemo(() => {
        return shops.filter(shop => {
            const shopName = shop.name || "";
            const ownerName = shop.owner || "";
            const shopCategory = shop.category || shop.type || "ไม่ระบุหมวดหมู่";

            const matchesSearch = shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ownerName.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "all" || shopCategory === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [shops, searchQuery, selectedCategory]);

    /**
     * Calculate statistics from shops and user data
     * totalStores: Count of all shops
     * totalReviews: Sum of all review counts
     * totalUsers: Total user count from API
     */
    const stats = {
        totalStores: shops.length,
        totalReviews: shops.reduce((sum, shop) => sum + (shop.reviewCount || 0), 0),
        totalUsers: totalUsers,
    };

    /**
     * Combine all props needed for both desktop and mobile views
     * Includes state, handlers, and derived data (filtered stores, stats)
     */
    const viewProps = {
        activeTab, setActiveTab,
        storeRequests: filteredStores.map(shop => ({ ...shop, status: "active" })),
        filteredStores: filteredStores.map(shop => ({ ...shop, status: "active" })),
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

    if (isLoading) {
        return <div className="min-vh-100 d-flex justify-content-center align-items-center">กำลังโหลดข้อมูลแอดมิน...</div>;
    }

    // Render responsive layout with desktop/mobile views
    // Desktop view shows on large screens, mobile view shows on small screens
    // Both share the same shop modals for detail and edit operations
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