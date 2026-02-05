import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const ProfileHeader: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-primary text-white px-4 py-3 shadow-sm sticky-top d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
                <button 
                    onClick={() => navigate(-1)} 
                    className="btn btn-link text-white p-0 d-flex align-items-center"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="h5 fw-bold m-0">โปรไฟล์</h1>
            </div>
            <div style={{ width: 24 }}></div> 
        </div>
    );
};