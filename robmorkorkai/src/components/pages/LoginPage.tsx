import React from "react";
import LoginMobileView from "../login/LoginMobileView";
import LoginDesktopView from "../login/LoginDesktopView";

// 1. สร้าง Interface เพื่อรับฟังก์ชัน onLogin จาก App.tsx
interface Props {
    onLogin: () => void;
}

const LoginPage: React.FC<Props> = ({ onLogin }) => {
    return (
        <>
            {/* แสดงบน Mobile: ส่ง onLogin ไปให้ด้วย */}
            <div className="d-lg-none">
                <LoginMobileView onLogin={onLogin} />
            </div>

            {/* แสดงบน Desktop: ส่ง onLogin ไปให้ด้วย */}
            <div className="d-none d-lg-block">
                <LoginDesktopView onLogin={onLogin} />
            </div>
        </>
    );
};

export default LoginPage;