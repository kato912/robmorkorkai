import React from "react";
import LoginMobileView from "../login/LoginMobileView";
import LoginDesktopView from "../login/LoginDesktopView";

const LoginPage: React.FC = () => {
    return (
        <>
            {/* แสดงบน Mobile เท่านั้น */}
            <div className="d-lg-none">
                <LoginMobileView />
            </div>

            {/* แสดงบน Desktop (Large screen) เท่านั้น */}
            <div className="d-none d-lg-block">
                <LoginDesktopView />
            </div>
        </>
    );
};

export default LoginPage;