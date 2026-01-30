import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, MapPin } from "lucide-react";
import { AuthContent } from "./AuthContent";
const LoginMobileView: React.FC = () => {
    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            {/* Mobile Header (สีน้ำเงิน) */}
            <div className="p-4 pb-5 position-relative overflow-hidden text-center text-white"
                style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}>

                <Link to="/guest" className="position-absolute start-0 top-0 mt-5 ms-3 text-white text-decoration-none d-flex align-items-center">
                    <ChevronLeft /> กลับ
                </Link>

                <div className="d-inline-flex bg-white bg-opacity-25 p-3 rounded-4 mb-3 mt-4">
                    <MapPin size={32} />
                </div>
                <h1 className="h3 fw-bold m-0">robmorkorkai</h1>
                <p className="small text-white-50">ค้นหาร้านยอดฮิตรอบ มข.</p>
            </div>

            {/* White Card Area */}
            <div className="flex-grow-1 px-4" style={{ marginTop: "-2rem" }}>
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                    <AuthContent />
                </div>
            </div>
        </div>
    );
};

export default LoginMobileView;