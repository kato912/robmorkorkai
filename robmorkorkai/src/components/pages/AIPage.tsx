import React, { useState, useEffect } from "react";
import AIMobileView from "../ai/AIMobileView";
import AIDesktopView from "../ai/AIDesktopView";

// เอาออกไปให้ Aidesktop / Aimobile -> components/ai
export interface AIViewProps {
    query: string; // ข้อมูลที่ user search
    setQuery: (q: string) => void; // update ค่า query
    showResults: boolean; // บอกว่ากด search {true = หาแล้ว , false = ยังไม่หา}
    handleSearch: () => void; // update search ค่า
    results: any[]; // AI results เก็บ to Array
    isLoggedIn: boolean; // login/logout status
}

const AIPage: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
        localStorage.getItem("isLoggedIn") === "true"
    );

    // useEffect เพื่อคอยเช็คสถานะเผื่อมีการเปลี่ยนแปลง
    useEffect(() => {
        const checkAuth = () => {
            setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
        };

        // ตรวจสอบสถานะทุกครั้งที่หน้าแอปถูกโฟกัส หรือมีการเปลี่ยนหน้า
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    const [query, setQuery] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState<any[]>([]);

    const handleSearch = () => {
        if (query.trim()) {
            setShowResults(true);
            setResults([]);//เอาคำตอบของ AI ใส่ตรงนี้นะจ๊ะ
        }
    };

    const commonProps = {
        query,
        setQuery,
        showResults,
        handleSearch,
        results,
        isLoggedIn
    };

    return (
        <>
            <div className="d-lg-none">
                <AIMobileView {...commonProps} />
            </div>
            <div className="d-none d-lg-block">
                <AIDesktopView {...commonProps} />
            </div>
        </>
    );
};

export default AIPage;