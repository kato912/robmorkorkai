import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react";
import HomeMobileView from "../home/HomeMobileView";
import HomeDesktopView from "../home/HomeDesktopView";
import { ZONES as zones, CATEGORIES as categories } from "../../utils/constants";
import { useShops } from "../../hooks/useShops";
import "./HomePage.css";

export interface HomeViewProps {
    selectedZone: string | null;
    setSelectedZone: (id: string | null) => void;
    selectedCategory: string | null;
    setSelectedCategory: (id: string | null) => void;
    filteredShops: any[];
    zone: typeof zones;
    categorie: typeof categories;
    searchQuery: string;
    setSearchQuery: (text: string) => void;
    handleSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

// ฟังก์ชันลบอักขระพิเศษ สระ วรรณยุกต์ (สำหรับเทียบ zone)
const cleanText = (text: string): string => {
    if (!text) return "";
    // ลบสระเสริม วรรณยุกต์ อักษร
    return text
        .normalize("NFD")
        .replace(/[\u0E31\u0E33\u0E34-\u0E3A\u0E47-\u0E4E]/g, "") // Thai diacritics
        .toLowerCase()
        .trim();
};

// Manual mapping ระหว่าง ID กับ Label (ถ้าจำเป็นต้องกำหนดเอง)
const ZONE_ID_MAP: Record<string, string[]> = {
    "lang-mor": ["หลังมอ"],
    "nai-mor": ["ในมอ"],
    "muang": ["เมือง"],
    "khlong-san": ["คลองซัน"],
    // เพิ่มเติมตามต้องการ
};

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    // ดึง State และ Data ทั้งหมดมาจาก Custom Hook
    const {
        shops, filteredShops, isLoading, error,
        selectedZone, setSelectedZone,
        selectedCategory, setSelectedCategory,
        searchQuery, setSearchQuery
    } = useShops();

    // ฟังก์ชันกด Enter เพื่อค้นหา
    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchQuery.trim() !== "") {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    // คำนวณจำนวนร้านต่อโซน (ต้องมาก่อน early returns)
    // นับจาก shops (ข้อมูลดิบทั้งหมด) ไม่ใช่ filteredShops เพื่อแสดงตัวเลขครบถ้วน
    const zonesWithCount = useMemo(() => {
        return zones.map(z => {
            const count = shops.filter(shop => {
                const shopZone = shop.zone || "";
                const zoneId = z.id;
                const zoneLabel = z.label.replace('📍', '').trim();

                // Logic 1: ตรวจสอบ ID ตรง
                if (cleanText(shopZone) === cleanText(zoneId)) return true;

                // Logic 2: ตรวจสอบ Label ตรง (หลังจากลบหมุด)
                if (cleanText(shopZone) === cleanText(zoneLabel)) return true;

                // Logic 3: ตรวจสอบ Manual Map
                const mappedLabels = ZONE_ID_MAP[zoneId] || [];
                if (mappedLabels.some(label => cleanText(shopZone) === cleanText(label))) {
                    return true;
                }

                // Logic 4: เทียบ cleanText (เพื่อจับคู่ที่สะกดผิด)
                const cleanShopZone = cleanText(shopZone);
                const cleanZoneId = cleanText(zoneId);
                const cleanZoneLabel = cleanText(zoneLabel);

                return cleanShopZone === cleanZoneId ||
                    cleanShopZone === cleanZoneLabel ||
                    cleanShopZone.includes(cleanZoneId) ||
                    cleanZoneId.includes(cleanShopZone);
            }).length;
            return { ...z, count };
        });
    }, [shops]);

    // จัดการหน้า Loading & Error
    if (isLoading) {
        return (
            <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-white">
                <Loader2 size={48} className="text-dark mb-3 animate-spin" />
                <h5 className="fw-bold text-dark">กำลังโหลดร้านค้ารอบ มข...</h5>
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } } .animate-spin { animation: spin 1s linear infinite; }`}</style>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
                <div className="text-center p-5 bg-white rounded-4 shadow-sm border error-modal">
                    <div className="bg-danger bg-opacity-10 text-danger rounded-circle d-inline-flex p-3 mb-4">
                        <AlertCircle size={40} />
                    </div>
                    <h4 className="fw-bold text-dark mb-2">เกิดข้อผิดพลาด</h4>
                    <p className="text-muted mb-4">{error}</p>
                    <button onClick={() => window.location.reload()} className="btn btn-dark rounded-pill px-4">ลองใหม่อีกครั้ง</button>
                </div>
            </div>
        );
    }

    // รวบรวม Props เพื่อส่งให้ View Component
    const viewProps: HomeViewProps = {
        selectedZone, setSelectedZone,
        selectedCategory, setSelectedCategory,
        filteredShops,
        zone: zonesWithCount,
        categorie: categories,
        searchQuery, setSearchQuery, handleSearch
    };

    return (
        <>
            <div className="d-lg-none">
                <HomeMobileView {...viewProps} />
            </div>
            <div className="d-none d-lg-block">
                <HomeDesktopView {...viewProps} />
            </div>
        </>
    );
};

export default HomePage;