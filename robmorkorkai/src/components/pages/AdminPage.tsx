import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { ShopDetailModal, EditShopModal, theme } from "../admin/AdminComponents";
import { AdminDesktop } from "../admin/AdminDesktop";
import { AdminMobile } from "../admin/AdminMobile";
import type { TabType } from "../admin/types";
import type { Shop } from "../../types/shop";
import api from "../../services/api"; // 👈 1. ใช้ api แทน fetch เพื่อให้ส่ง Token อัตโนมัติ

export const AdminPage: React.FC = () => {
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState<TabType>("overview");

    const [shops, setShops] = useState<Shop[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
    const [editingShop, setEditingShop] = useState<Shop | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
    const [dashboardStats, setDashboardStats] = useState({ totalStores: 0, totalReviews: 0, totalUsers: 0 });

    // ดึงข้อมูลร้านค้า (GET)
    const fetchShops = async () => {
        try {
            setIsLoading(true);
            const res = await api.get("/api/admin/shops");
            setShops(res.data);
        } catch (err) {
            console.error("Fetch Error:", err);
            alert("ไม่สามารถดึงข้อมูลร้านค้าได้");
        } finally {
            setIsLoading(false);
        }
    };

    // ดึง stats (จำนวนร้าน ผู้ใช้ รีวิว)
    const fetchStats = async () => {
        try {
            const res = await api.get("/api/admin/stats");
            const { totalShops, totalUsers, totalReviews } = res.data;
            setDashboardStats({
                totalStores: totalShops,
                totalReviews: totalReviews,
                totalUsers: totalUsers
            });
        } catch (err) {
            console.error("Fetch Stats Error:", err);
        }
    };

    useEffect(() => {
        fetchShops();
        fetchStats();
    }, []);

    // ลบร้านค้า (DELETE)
    const handleDeleteStore = async (id: string) => {
        if (!window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบร้านค้านี้?")) return;

        try {
            // 👈 3. ใช้ api.delete ยิงไปที่ Admin Route
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
        }).map(shop => ({
            ...shop,
            image: shop.coverImage || shop.image || "data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\"%3E%3Crect fill=\"%23e5e7eb\" width=\"48\" height=\"48\"/%3E%3C/svg%3E"
        }));
    }, [shops, searchQuery, selectedCategory]);

    const stats = {
        totalStores: shops.length,
        totalReviews: shops.reduce((sum, shop) => sum + (shop.reviewCount || 0), 0),
        totalUsers: dashboardStats.totalUsers,
    };

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
        onEdit: async (shop: any) => {
            // ดึงข้อมูลเต็มร้านค้ารวมถึง images
            try {
                const res = await api.get(`/api/admin/shops/${shop.id}`);
                setEditingShop(res.data as Shop);
            } catch (err) {
                console.error("Error fetching shop details:", err);
                setEditingShop(shop as Shop);
            }
        },
        logout
    };

    if (isLoading) {
        return <div className="min-vh-100 d-flex justify-content-center align-items-center">กำลังโหลดข้อมูลแอดมิน...</div>;
    }

    return (
        <div className="font-sans" style={{ backgroundColor: theme.bgMain }}>
            <AdminDesktop {...viewProps} />
            <AdminMobile {...viewProps} />

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
