import React from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { AuthContent } from "./AuthContent";

interface Props {
    onLogin: () => void;
}

const StatBox: React.FC<{ number: string; label: string }> = ({ number, label }) => (
    <div className="bg-white bg-opacity-10 p-3 rounded-3">
        <div className="fs-3 fw-bold">{number}</div>
        <small className="text-white-50">{label}</small>
    </div>
);

const LoginDesktopView: React.FC<Props> = ({ onLogin }) => {
    return (
        <div className="row g-0 min-vh-100">

            <div
                className="col-6 d-flex flex-column justify-content-between p-5 text-white position-relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}
            >
                <div className="position-absolute top-0 start-0 w-100 h-100" style={{ pointerEvents: 'none' }}>
                    <div className="position-absolute bg-white opacity-10 rounded-circle" style={{ top: '5rem', left: '2rem', width: '16rem', height: '16rem', filter: 'blur(3rem)', opacity: 0.2 }}></div>
                    <div className="position-absolute bg-white opacity-10 rounded-circle" style={{ bottom: '5rem', right: '2rem', width: '24rem', height: '24rem', filter: 'blur(3rem)', opacity: 0.2 }}></div>
                </div>

                <Link to="/" className="d-flex align-items-center gap-2 text-white text-decoration-none position-relative z-1">
                    <MapPin size={32} />
                    <span className="fs-3 fw-bold">robmorkorkai</span>
                </Link>

                <div className="my-5 position-relative z-1">
                    <h1 className="display-4 fw-bold mb-3">ค้นหาร้านยอดฮิต<br />รอบ มข.</h1>
                    <p className="fs-5 text-white-50">แพลตฟอร์มค้นหาร้านอาหาร คาเฟ่ และธุรกิจรอบมหาวิทยาลัยขอนแก่น พร้อม AI Assistant ช่วยแนะนำ</p>
                </div>

                <div className="d-flex gap-3 position-relative z-1">
                    <StatBox number="500+" label="ร้านค้าที่ลงทะเบียน" />
                    <StatBox number="10K+" label="รีวิวจากนักศึกษา" />
                    <StatBox number="AI" label="ช่วยแนะนำร้าน" />
                </div>
            </div>

            <div className="col-6 d-flex align-items-center justify-content-center bg-white">
                <AuthContent onLogin={onLogin} />
            </div>
        </div>
    );
};

export default LoginDesktopView;