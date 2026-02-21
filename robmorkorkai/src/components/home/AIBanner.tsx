import React from "react";
import { Link } from "react-router-dom";
import { Bot, Sparkles, ArrowRight } from "lucide-react";

export const AIBanner: React.FC = () => {
    return (
        <Link to="/ai" className="text-decoration-none d-block">
            <div 
                className="card border shadow-sm rounded-4 overflow-hidden transition-all" 
                style={{ cursor: 'pointer' }}
                onMouseOver={(e) => e.currentTarget.classList.add('shadow')}
                onMouseOut={(e) => e.currentTarget.classList.remove('shadow')}
            >
                <div className="card-body p-4">
                    <div className="d-flex align-items-center gap-3 mb-3">
                        {/* Icon Box สีดำ */}
                        <div className="bg-dark rounded-3 p-2 d-flex align-items-center justify-content-center">
                            <Bot size={24} className="text-white" />
                        </div>

                        <div>
                            <div className="d-flex align-items-center gap-1 mb-1">
                                <Sparkles size={12} className="text-warning" />
                                <small className="text-warning fw-bolder text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.5px' }}>New</small>
                            </div>
                            <h6 className="fw-bold m-0 text-dark">AI Assistant</h6>
                        </div>
                    </div>
                    <p className="text-secondary small mb-3 lh-base">ไม่รู้จะกินอะไร? ให้ AI ช่วยแนะนำร้านที่ใช่สำหรับคุณ</p>
                    <div className="text-dark fw-bold small d-flex align-items-center gap-1">
                        ลองเลย <ArrowRight size={14} />
                    </div>
                </div>
            </div>
        </Link>
    );
};