import React from "react";
import LoginMobileView from "../login/LoginMobileView";
import LoginDesktopView from "../login/LoginDesktopView";

const LoginPage: React.FC = () => {
    return (
        <>
            <div className="d-lg-none">
                <LoginMobileView />
            </div>

            <div className="d-none d-lg-block">
                <LoginDesktopView  />
            </div>
        </>
    );
};

export default LoginPage;