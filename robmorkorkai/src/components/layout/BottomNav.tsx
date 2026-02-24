import React from "react";
import { Link } from "react-router-dom";
import { Home, Bot, User, LogIn } from "lucide-react";
import { useAuth } from "../../context/AuthContext"; 

interface Props {
    activePage: string;
}

export const BottomNav: React.FC<Props> = ({ activePage }) => {
    const { isLoggedIn } = useAuth();

    return (
        <nav className="fixed-bottom bg-white border-top shadow-lg" style={{ height: '70px', zIndex: 1050, paddingBottom: 'env(safe-area-inset-bottom)' }}>
            <div className="h-100 d-flex justify-content-around align-items-center max-w-md mx-auto px-2">
                
                <Link to="/" className="text-decoration-none d-flex flex-column align-items-center" style={{ color: activePage === 'home' ? '#212529' : '#adb5bd' }}>
                    <Home size={24} strokeWidth={activePage === 'home' ? 2.5 : 2} />
                    <span style={{ fontSize: '10px', marginTop: '4px', fontWeight: activePage === 'home' ? 'bold' : 'normal' }}>Home</span>
                </Link>

                <Link to="/ai" className="text-decoration-none d-flex flex-column align-items-center" style={{ color: activePage === 'ai' ? '#212529' : '#adb5bd' }}>
                    <Bot size={24} strokeWidth={activePage === 'ai' ? 2.5 : 2} />
                    <span style={{ fontSize: '10px', marginTop: '4px', fontWeight: activePage === 'ai' ? 'bold' : 'normal' }}>AI</span>
                </Link>

                <Link to={isLoggedIn ? "/profile" : "/login"} className="text-decoration-none d-flex flex-column align-items-center" style={{ color: activePage === 'profile' ? '#212529' : '#adb5bd' }}>
                    {isLoggedIn ? <User size={24} strokeWidth={activePage === 'profile' ? 2.5 : 2} /> : <LogIn size={24} strokeWidth={activePage === 'profile' ? 2.5 : 2} />}
                    <span style={{ fontSize: '10px', marginTop: '4px', fontWeight: activePage === 'profile' ? 'bold' : 'normal' }}>
                        {isLoggedIn ? 'Profile' : 'Login'}
                    </span>
                </Link>
                
            </div>
        </nav>
    );
};