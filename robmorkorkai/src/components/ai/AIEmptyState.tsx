import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, LogIn, Coffee, BookOpen, Utensils, Wifi } from "lucide-react";
import '../../assets/css/AIStyles.css'

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

            <div className="rounded-4 d-flex align-items-center justify-content-center mb-4 shadow-sm" style={{ width: '70px', height: '70px', backgroundColor: '#2d2320', border: '1px solid #c9943a' }}>
                <Sparkles size={32} style={{ color: '#e8b94a' }} />
            </div>
            <h2 className="fw-bolder mb-2" style={{ letterSpacing: '-0.5px', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: '#f5ebe4' }}>หาร้านที่ใช่ ด้วย AI</h2>
            <p className="mb-5" style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)', color: '#9a8a7e' }}>บอกความต้องการของคุณเป็นภาษาธรรมชาติ<br className="d-none d-md-block"/> แล้วให้ AI ช่วยหาร้านที่เหมาะกับคุณที่สุด</p>

            {/* ปุ่มคำแนะนำ */}
            <div className="row g-3 w-100 mb-5" style={{ maxWidth: '600px' }}>
                {suggestedPrompts.map((prompt, i) => {
                    const Icon = prompt.icon;
                    return (
                        <div className="col-12 col-sm-6" key={i}>
                            <button 
                                onClick={() => onSend(prompt.text)}
                                className="btn w-100 rounded-4 p-3 text-start d-flex align-items-center gap-3 transition-all custom-prompt-btn"
                                style={{ minHeight: '70px' }}
                            >
                                <Icon size={20} className="flex-shrink-0" style={{ color: '#c9943a' }} />
                                <span className="small fw-medium lh-sm" style={{ color: '#f5ebe4' }}>{prompt.text}</span>
                            </button>
                        </div>
                    );
                })}
            </div>

            {!isLoggedIn && (
                <div className="d-flex align-items-center gap-3 px-4 py-3 rounded-4 shadow-sm" style={{ backgroundColor: '#2d2320', border: '1px dashed rgba(201, 148, 58, 0.4)' }}>
                    <LogIn size={18} className="flex-shrink-0" style={{ color: '#e8b94a' }} />
                    <p className="m-0 small text-start" style={{ color: '#9a8a7e' }}>
                        <Link to="/login" className="fw-bold text-decoration-underline me-1" style={{ color: '#c9943a' }}>เข้าสู่ระบบ</Link> 
                        เพื่อบันทึกผลการค้นหาและร้านโปรด
                    </p>
                </div>
            )}
        </div>
    );
};