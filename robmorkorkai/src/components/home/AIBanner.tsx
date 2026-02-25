import React from "react";
import { Link } from "react-router-dom";
import { Bot, Sparkles, ArrowRight } from "lucide-react";

export const AIBanner: React.FC = () => {
    return (
        <Link to="/ai" className="text-decoration-none d-block mb-4">
            <div className="card border-0 shadow-sm rounded-4 text-white"
                style={{ background: 'linear-gradient(135deg, #7F1D1D 0%, #450A0A 100%)', transition: 'all 0.2s', cursor: 'pointer' }}
                onMouseOver={(e) => e.currentTarget.classList.add('shadow')}
                onMouseOut={(e) => e.currentTarget.classList.remove('shadow')}
            >
                <div className="card-body p-4">
                    <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="rounded-3 p-2 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                            <Bot size={24} className="text-white" />
                        </div>
                        <div>
                            <div className="d-flex align-items-center gap-1 mb-1">
                                <Sparkles size={12} className="text-warning" />
                                <small className="fw-bolder text-uppercase text-dark px-2 rounded-1" style={{ fontSize: '0.65rem', backgroundColor: '#FCD34D' }}>New</small>
                            </div>
                            <h6 className="fw-bold m-0 text-white">AI Assistant</h6>
                        </div>
                    </div>
                    <p className="small mb-3 lh-base" style={{ color: '#FECACA' }}>ไม่รู้จะกินอะไร? ให้ AI ช่วยแนะนำร้านที่ใช่สำหรับคุณ</p>
                    <div className="fw-bold small d-flex align-items-center gap-1" style={{ color: '#FCD34D' }}>
                        ลองเลย <ArrowRight size={14} />
                    </div>
                </div>
            </div>
        </Link>
    );
};