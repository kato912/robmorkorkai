import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Bot, Search, Sparkles } from "lucide-react";
import { AIResultCard } from "./AIResultCard";
import { BottomNav } from "../layout/BottomNav";
import type { AIViewProps } from "../pages/AIPage";

// form aipage
const AIMobileView: React.FC<AIViewProps> = ({ 
    query, 
    setQuery, 
    showResults, 
    handleSearch, 
    results, 
    isLoggedIn 
}) => {
    return (
        <div className="bg-light min-vh-100 pb-5">

            {/* Header Mobile */}
            <div className="bg-primary text-white p-3 shadow-sm sticky-top">
                <div className="d-flex align-items-center gap-3">
                    <Link to="/" className="text-white"><ChevronLeft size={24} /></Link>
                    <div className="d-flex align-items-center gap-2">
                        <Bot size={24} />
                        <h1 className="m-0 fs-5 fw-bold">AI Helper</h1>
                    </div>
                </div>
            </div>

            <div className="container py-4 px-3">
                {/* Instruction Card */}
                <div className="card border-0 shadow-sm mb-4 rounded-4">
                    <div className="card-body">
                        <div className="d-flex gap-3 mb-3">
                            <div className="bg-primary bg-opacity-10 p-2 rounded-3 text-primary">
                                <Bot size={24} />
                            </div>
                            <div>
                                <h6 className="fw-bold mb-1">บอกความต้องการของคุณ</h6>
                                <p className="text-muted small mb-0">เช่น "อยากได้ร้านกาแฟเงียบๆ มีปลั๊ก ไว้นั่งทำงานตอนดึก"</p>
                            </div>
                        </div>

                        <textarea
                            className="form-control bg-light border-0 mb-3 p-3 rounded-3"
                            rows={4}
                            placeholder="พิมพ์สิ่งที่ต้องการ..."
                            style={{ resize: 'none' }}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />

                        <button 
                            onClick={handleSearch} 
                            className="btn btn-primary w-100 rounded-pill py-2 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm"
                        >
                            <Search size={18} /> ค้นหาด้วย AI
                        </button>
                    </div>
                </div>

                {/* Results */}
                {showResults && (
                    <div className="animate-fade-in">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <Sparkles className="text-warning" size={20} />
                            <h6 className="fw-bold m-0 text-dark">AI แนะนำสำหรับคุณ:</h6>
                        </div>

                        <div className="d-flex flex-column gap-3 mb-5">
                            {results.length > 0 ? (
                                results.map((item) => (
                                    <AIResultCard key={item.id} result={item} />
                                ))
                            ) : (
                                <div className="text-center py-5 text-muted">
                                    <p>ยังไม่พบข้อมูลที่ตรงใจ ลองระบุรายละเอียดเพิ่มขึ้นดูนะ</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Nav */}
            <BottomNav activePage="ai" isLoggedIn={isLoggedIn} />
            
        </div>
    );
};

export default AIMobileView;