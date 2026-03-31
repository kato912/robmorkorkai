import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { ShopDetailModal, EditShopModal, theme } from "../admin/AdminComponents";
import { AdminDesktop } from "../admin/AdminDesktop";
import { AdminMobile } from "../admin/AdminMobile";
import type { TabType } from "../admin/types";
import type { Shop } from "../../types/shop";

export const AdminPage: React.FC = () => {
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState<TabType>("overview");

    // --- API State ---
    const [shops, setShops] = useState<Shop[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalUsers, setTotalUsers] = useState(0);

    // --- UI State ---
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

    // ดึงข้อมูลร้านค้า (GET)
    // ==========================================
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

    // ฟ้งข้อมูลจำนวนผู้ใช้
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

    // ลบร้านค้า (DELETE)
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

    // แก้ไขข้อมูลร้านค้า (PUT)
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

    // --- Logic กรองข้อมูลเพื่อแสดงบนตาราง ---
    const categories = ["all", ...new Set(shops.map(s => s.category || s.type || "ไม่ระบุหมวดหมู่"))];

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

    // --- สรุปตัวเลข Stats ---
    const stats = {
        totalStores: shops.length,
        totalReviews: shops.reduce((sum, shop) => sum + (shop.reviewCount || 0), 0),
        totalUsers: totalUsers,
    };

    // --- รวม Props ส่งให้ View ---
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