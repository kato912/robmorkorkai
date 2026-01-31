import React from "react";
import { Link } from "react-router-dom";
import { Bot, Sparkles } from "lucide-react";

export const AIBanner: React.FC = () => {
    return (
        <Link to="/ai" className="text-decoration-none d-block">
            <div
                className="card border-0 text-white shadow-sm overflow-hidden"
                style={{ background: "linear-gradient(135deg, #0d6efd, #0dcaf0)" }}
            >
                <div className="card-body d-flex align-items-center gap-3">
                    {/* Icon Box */}
                    <div className="bg-white bg-opacity-25 p-3 rounded-3">
                        <Bot size={32} />
                    </div>

                    {/* Text Content */}
                    <div>
                        <div className="d-flex align-items-center gap-1 text-warning mb-1">
                            <Sparkles size={16} />
                            <small className="fw-bold">New Feature</small>
                        </div>
                        <h5 className="mb-0 fw-bold">AI Assistant</h5>
                        <small className="text-white-50">ไม่รู้จะกินอะไร? ให้ AI ช่วยเลือก</small>
                    </div>
                </div>
            </div>
        </Link>
    );
};