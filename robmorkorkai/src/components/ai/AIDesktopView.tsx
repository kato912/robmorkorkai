import React from "react";
// import { MapPin, Search, Bot, Sparkles, LogIn } from "lucide-react";
import { Search, Bot, Sparkles } from "lucide-react";
import { AIResultCard } from "./AIResultCard";
import { TopNavbar } from "../layout/TopNavbar";
import type { AIViewProps } from "../pages/AIPage";

//from aipage
const AIDesktopView: React.FC<AIViewProps> = ({ 
    query, 
    setQuery, 
    showResults, 
    handleSearch, 
    results, 
    isLoggedIn 
}) => {
    return (
        <div className="bg-light min-vh-100">
            {/* Navbar */}
            <TopNavbar activePage="ai" isLoggedIn={isLoggedIn} showSearchBar={true} />

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">

                        {/* Header Title */}
                        <div className="text-center mb-5">
                            <div className="d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-circle mb-3 shadow-sm" style={{ width: 64, height: 64 }}>
                                <Bot size={32} />
                            </div>
                            <h2 className="fw-bold text-dark">AI Helper</h2>
                            <p className="text-secondary">ให้ AI ช่วยเลือกร้านที่ใช่ที่สุดสำหรับคุณในวันนี้</p>
                        </div>

                        {/* Input Card */}
                        <div className="card border-0 shadow-sm p-4 rounded-4 mb-5">
                            <label className="fw-bold text-dark mb-2">💬 บอกความต้องการของคุณ</label>
                            <textarea
                                className="form-control bg-light border-0 rounded-4 p-3 mb-3"
                                rows={4}
                                style={{ resize: 'none' }}
                                placeholder="ตัวอย่าง: หาร้านคาเฟ่โซนกังสดาล บรรยากาศเงียบๆ มีที่จอดรถ อยากไปนั่งอ่านหนังสือสอบ..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <div className="d-flex justify-content-end">
                                <button onClick={handleSearch} className="btn btn-primary rounded-pill px-5 py-2 fw-bold d-flex align-items-center gap-2 shadow-sm">
                                    <Search size={18} /> ค้นหาด้วย AI
                                </button>
                            </div>
                        </div>

                        {/* Results */}
                        {showResults && (
                            <div className="animate-fade-in">
                                <div className="d-flex align-items-center gap-2 mb-4">
                                    <Sparkles className="text-warning" size={24} />
                                    <h4 className="fw-bold m-0 text-dark">ผลลัพธ์ที่แนะนำ</h4>
                                </div>

                                <div className="row g-4">
                                    {results.map((item) => (
                                        <div className="col-md-6" key={item.id}>
                                            <AIResultCard result={item} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIDesktopView;