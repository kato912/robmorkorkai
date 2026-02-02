import React from "react";
import { Link } from "react-router-dom";
import { Home, Bot, User, LogIn } from "lucide-react";
import { useAuth } from "../../context/AuthContext"; // ✅ Import Hook

interface Props {
    activePage: string;
}

export const BottomNav: React.FC<Props> = ({ activePage }) => {
    const { isLoggedIn } = useAuth();

    return (
        <nav
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                height: '70px',
                backgroundColor: '#ffffff', // พื้นหลังขาว
                borderTop: '1px solid #dee2e6', // เส้นขอบบางๆ
                boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
                zIndex: 1050, // ค่ามาตรฐาน Bootstrap
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                paddingBottom: 'env(safe-area-inset-bottom)'
            }}
        >
            {/* 1. Home */}
            <Link to="/" className="d-flex flex-column align-items-center text-decoration-none" style={{ color: activePage === 'home' ? '#0d6efd' : '#6c757d' }}>
                <Home size={24} strokeWidth={activePage === 'home' ? 2.5 : 2} />
                <span style={{ fontSize: '10px', marginTop: '4px', fontWeight: activePage === 'home' ? 'bold' : 'normal' }}>Home</span>
            </Link>

            {/* 2. AI Helper */}
            <Link to="/ai" className="d-flex flex-column align-items-center text-decoration-none" style={{ color: activePage === 'ai' ? '#0d6efd' : '#6c757d' }}>
                <Bot size={24} strokeWidth={activePage === 'ai' ? 2.5 : 2} />
                <span style={{ fontSize: '10px', marginTop: '4px', fontWeight: activePage === 'ai' ? 'bold' : 'normal' }}>AI Helper</span>
            </Link>

            {/* 3. Profile / Login */}
            <Link to={isLoggedIn ? "/profile" : "/login"} className="d-flex flex-column align-items-center text-decoration-none" style={{ color: activePage === 'profile' ? '#0d6efd' : '#6c757d' }}>
                {isLoggedIn ? <User size={24} strokeWidth={activePage === 'profile' ? 2.5 : 2} /> : <LogIn size={24} strokeWidth={activePage === 'profile' ? 2.5 : 2} />}
                <span style={{ fontSize: '10px', marginTop: '4px', fontWeight: activePage === 'profile' ? 'bold' : 'normal' }}>
                    {isLoggedIn ? 'Profile' : 'Login'}
                </span>
            </Link>
        </nav>
    );
};