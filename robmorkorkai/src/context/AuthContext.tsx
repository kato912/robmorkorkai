import React, { createContext, useContext, useState, type ReactNode } from "react";
// 1. เพิ่ม import useNavigate
import { useNavigate } from "react-router-dom"; 

interface AuthContextType {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // 2. เรียกใช้ Hook
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        return localStorage.getItem("isLoggedIn") === "true";
    });

    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
    };

    const logout = () => {
        // ✅ 3. สั่งย้ายหน้านำไปก่อนเลย (หนีออกจาก ProtectedRoute)
        navigate("/", { replace: true });

        // ✅ 4. ค่อยเคลียร์ค่าทีหลัง (React จะย้ายหน้าก่อน แล้วค่อยอัปเดต State)
        setTimeout(() => {
            setIsLoggedIn(false);
            localStorage.removeItem("isLoggedIn");
            localStorage.clear();
        }, 100); // ใส่ delay นิดนึงเพื่อให้แน่ใจว่าย้ายหน้าเสร็จแล้วจริงๆ
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};