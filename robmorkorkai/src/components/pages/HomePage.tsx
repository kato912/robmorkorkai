import React from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react";
import HomeMobileView from "../home/HomeMobileView";
import HomeDesktopView from "../home/HomeDesktopView";
import { ZONES as zones, CATEGORIES as categories } from "../../utils/constants";
import { useShops } from "../../hooks/useShops"; 

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

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    
    // ดึง State และ Data ทั้งหมดมาจาก Custom Hook
    const {
        filteredShops, isLoading, error,
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
                <div className="text-center p-5 bg-white rounded-4 shadow-sm border" style={{ maxWidth: '400px' }}>
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
        zone: zones,       
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