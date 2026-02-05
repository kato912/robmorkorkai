import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface User {
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    login: () => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // 1. ฟังก์ชันเช็ค Session จาก Backend
    const checkSession = async () => {
        try {
            // เรียก API ไปที่ /api/auth/session
            const res = await fetch("/api/auth/session");
            const session = await res.json();

            if (session && Object.keys(session).length > 0) {
                setIsLoggedIn(true);
                setUser(session.user);
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        } catch (error) {
            console.error("Failed to fetch session:", error);
            setIsLoggedIn(false);
        } finally {
            setLoading(false);
        }
    };

    // เช็ค Session เมื่อเปิดเว็บครั้งแรก
    useEffect(() => {
        checkSession();
    }, []);

    const login = async () => { 
        try {
            // 1. ขอ CSRF Token จาก Backend ก่อน 
            const res = await fetch("/api/auth/csrf");
            const { csrfToken } = await res.json();

            //สร้าง Form จำลองขึ้นมาเพื่อส่ง POST Request ไปที่ /api/auth/signin/google
            const form = document.createElement("form");
            form.method = "post";
            form.action = "/api/auth/signin/google"; // ระบุ Provider เป็น google

            // ใส่ CSRF Token ลงใน Form
            const csrfInput = document.createElement("input");
            csrfInput.type = "hidden";
            csrfInput.name = "csrfToken";
            csrfInput.value = csrfToken;
            form.appendChild(csrfInput);

            const callbackInput = document.createElement("input");
            callbackInput.type = "hidden";
            callbackInput.name = "callbackUrl";
            callbackInput.value = window.location.origin; // กลับมาหน้า Homepage
            form.appendChild(callbackInput);

            document.body.appendChild(form);
            form.submit();
        } catch (error) {
            console.error("Login flow failed:", error);
        }
    };

    const logout = async () => {
        // Logout ก็ควรทำเหมือนกันเพื่อความปลอดภัย (หรือใช้ Redirect ก็ได้ถ้าระบบยอมรับ GET)
        // แนะนำให้ใช้ CSRF Token เหมือนกันถ้าทำได้ แต่ถ้า Auth.js ยอมรับ GET ก็ใช้แบบเดิมได้
        // เพื่อความชัวร์ ใช้แบบ Form Submit เหมือน Login ก็ดีครับ
        try {
            const res = await fetch("/api/auth/csrf");
            const { csrfToken } = await res.json();

            const form = document.createElement("form");
            form.method = "post";
            form.action = "/api/auth/signout";

            const csrfInput = document.createElement("input");
            csrfInput.type = "hidden";
            csrfInput.name = "csrfToken";
            csrfInput.value = csrfToken;
            form.appendChild(csrfInput);

            // Logout เสร็จให้กลับหน้าแรก
            const callbackInput = document.createElement("input");
            callbackInput.type = "hidden";
            callbackInput.name = "callbackUrl";
            callbackInput.value = window.location.origin + "/";
            form.appendChild(callbackInput);

            document.body.appendChild(form);
            form.submit();
        } catch (error) {
            window.location.href = "/api/auth/signout"; // Fallback
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};