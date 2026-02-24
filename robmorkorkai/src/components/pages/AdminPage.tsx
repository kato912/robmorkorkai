import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
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

    // --- UI State ---
    const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
    const [editingShop, setEditingShop] = useState<Shop | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

    // ดึงข้อมูลร้านค้า (GET)
    // ==========================================
    const fetchShops = async () => {
        try {
            setIsLoading(true);
            const res = await fetch("http://localhost:3000/api/shops");
            const data = await res.json();
            setShops(data);
        } catch (err) {
            console.error("Fetch Error:", err);
            alert("ไม่สามารถดึงข้อมูลร้านค้าได้");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchShops();
    }, []);

    // ลบร้านค้า (DELETE)
    const handleDeleteStore = async (id: string) => {
        if (!window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบร้านค้านี้?")) return;

        try {
            const res = await fetch(`http://localhost:3000/api/shops/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                // อัปเดต State ลบร้านนั้นออก โดยไม่ต้อง fetch ใหม่
                setShops(prevShops => prevShops.filter(shop => shop.id !== id));
                setSelectedShop(null);
                alert("ลบร้านค้าเรียบร้อยแล้ว");
            } else {
                throw new Error("ลบไม่สำเร็จ");
            }
        } catch (err) {
            console.error("Delete Error:", err);
            alert("เกิดข้อผิดพลาดในการลบร้านค้า");
        }
    };

    // แก้ไขข้อมูลร้านค้า (PUT)
    const handleSaveEdit = async (updatedShop: Shop) => {
        try {
            const res = await fetch(`http://localhost:3000/api/shops/${updatedShop.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedShop)
            });

            if (res.ok) {
                const savedShop = await res.json();
                // อัปเดตข้อมูลร้านใน State ให้เป็นข้อมูลใหม่
                setShops(prevShops => prevShops.map(shop =>
                    shop.id === savedShop.id ? savedShop : shop
                ));
                setEditingShop(null);
                alert("บันทึกการแก้ไขเรียบร้อยแล้ว");
            } else {
                throw new Error("บันทึกไม่สำเร็จ");
            }
        } catch (err) {
            console.error("Update Error:", err);
            alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
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
        totalUsers: 2451, // mock data
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