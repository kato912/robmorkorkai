import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, LogIn, Coffee, BookOpen, Utensils, Wifi } from "lucide-react";

const suggestedPrompts = [
    { icon: Coffee, text: "หาคาเฟ่เงียบๆ ใกล้มอ มีปลั๊กไฟ" },
    { icon: BookOpen, text: "ที่นั่งอ่านหนังสือเปิดดึก ย่านกังสดาล" },
    { icon: Utensils, text: "ร้านอาหารราคานักศึกษา หลังมอ" },
    { icon: Wifi, text: "ร้านที่มี WiFi เร็ว เหมาะทำงานกลุ่ม" },
];

interface AIEmptyStateProps {
    onSend: (text: string) => void;
    isLoggedIn: boolean;
}

export const AIEmptyState: React.FC<AIEmptyStateProps> = ({ onSend, isLoggedIn }) => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center text-center mt-3 mt-lg-5 animate-fade-in px-3">
            <div className="bg-dark rounded-4 d-flex align-items-center justify-content-center mb-4 shadow-sm" style={{ width: '70px', height: '70px' }}>
                <Sparkles size={32} className="text-white" />
            </div>
            <h2 className="fw-bolder text-dark mb-2" style={{ letterSpacing: '-0.5px', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>หาร้านที่ใช่ ด้วย AI</h2>
            <p className="text-secondary mb-5" style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>บอกความต้องการของคุณเป็นภาษาธรรมชาติ<br className="d-none d-md-block"/> แล้วให้ AI ช่วยหาร้านที่เหมาะกับคุณที่สุด</p>

            {/* ปุ่มคำแนะนำ */}
            <div className="row g-3 w-100 mb-5" style={{ maxWidth: '600px' }}>
                {suggestedPrompts.map((prompt, i) => {
                    const Icon = prompt.icon;
                    return (
                        <div className="col-12 col-sm-6" key={i}>
                            <button 
                                onClick={() => onSend(prompt.text)}
                                className="btn btn-white w-100 bg-white border rounded-4 p-3 text-start d-flex align-items-center gap-3 transition-all hover-bg-light"
                                style={{ minHeight: '70px' }}
                            >
                                <Icon size={20} className="text-muted flex-shrink-0" />
                                <span className="text-secondary small fw-medium lh-sm">{prompt.text}</span>
                            </button>
                        </div>
                    );
                })}
            </div>

            {!isLoggedIn && (
                <div className="d-flex align-items-center gap-3 px-4 py-3 rounded-4 border bg-white shadow-sm">
                    <LogIn size={18} className="text-muted flex-shrink-0" />
                    <p className="m-0 text-secondary small text-start">
                        <Link to="/login" className="text-dark fw-bold text-decoration-underline border-dark me-1">เข้าสู่ระบบ</Link> 
                        เพื่อบันทึกผลการค้นหาและร้านโปรด
                    </p>
                </div>
            )}
        </div>
    );
};