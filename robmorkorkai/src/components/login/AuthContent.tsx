import React from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

export const AuthContent: React.FC = () => {
    return (
        <div className="w-100" style={{ maxWidth: "400px" }}>
            {/* Title */}
            <div className="text-center mb-4">
                <div className="d-none d-lg-inline-flex bg-primary bg-opacity-10 p-3 rounded-4 mb-3">
                    <MapPin size={32} className="text-primary" />
                </div>
                <h2 className="fw-bold text-dark h4 h-lg-2">ยินดีต้อนรับ</h2> {/* h4 on mobile, h2 on desktop */}
                <p className="small text-muted">เข้าสู่ระบบด้วยบัญชี Google ของคุณ</p>
            </div>

            {/* Buttons */}
            <div className="d-grid gap-3">
                <button className="btn btn-outline-secondary py-3 d-flex align-items-center justify-content-center gap-2 fw-medium bg-white">
                    <GoogleIcon />
                    เข้าสู่ระบบด้วย Google
                </button>

                <div className="position-relative text-center my-2">
                    <hr className="text-muted opacity-25" />
                    <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small text-uppercase">หรือ</span>
                </div>

                <Link to="/guest" className="btn btn-light text-secondary fw-medium py-2">
                    ดูร้านค้าโดยไม่ต้องเข้าสู่ระบบ
                </Link>
            </div>

            {/* Tip Box */}
            <div className="mt-4 p-3 bg-primary bg-opacity-10 rounded-3 d-flex gap-3 align-items-start">
                <div className="bg-white p-1 rounded-2 text-primary d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '24px', height: '24px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold' }}>i</span>
                </div>
                <div>
                    <p className="mb-0 fw-bold text-primary small">แนะนำให้ใช้อีเมล @kkumail.com</p>
                    <p className="mb-0 text-primary small opacity-75" style={{ fontSize: '0.75rem' }}>เพื่อเข้าถึงฟีเจอร์พิเศษสำหรับนักศึกษา มข.</p>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-4 text-center px-4" style={{ fontSize: "0.75rem" }}>
                <span className="text-muted">การเข้าสู่ระบบแสดงว่าคุณยอมรับ </span>
                <a href="#" className="text-primary text-decoration-none">ข้อกำหนดการใช้งาน</a>
                <span className="text-muted"> และ </span>
                <a href="#" className="text-primary text-decoration-none">นโยบายความเป็นส่วนตัว</a>
            </div>
        </div>
    );
};