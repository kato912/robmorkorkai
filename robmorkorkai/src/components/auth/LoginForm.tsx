import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { GoogleIcon } from "./GoogleIcon";
import { useAuth } from "../../context/AuthContext";

interface LoginFormProps {
    onGoogleLogin?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onGoogleLogin }) => {
    const [isHovering, setIsHovering] = useState(false);
    const { login } = useAuth();
    const handleGoogleClick = () => {
        login(); // เรียกใช้การล็อกอิน
    };

    return (
        <div className="w-100" style={{ maxWidth: '400px' }}>
            <div className="mb-4 mb-lg-5">
                <p className="text-stone-500 text-uppercase fw-bold mb-2 mb-lg-3" style={{ fontSize: '0.75rem', letterSpacing: '0.2em' }}>Welcome</p>
                <h1 className="fw-bolder text-stone-100 tracking-tight lh-sm mb-2 mb-lg-3" style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)' }}>
                    Sign in to<br />
                    <span className="text-stone-400">explore KKU</span>
                </h1>
                <p className="text-stone-500 lh-base" style={{ fontSize: '1rem' }}>
                    Discover the best cafes, restaurants, and study spots around Khon Kaen University.
                </p>
            </div>

            {/* Google Button */}
            <div className="d-flex flex-column gap-3 mb-4">
                <button
                    onClick={handleGoogleClick}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className={`btn w-100 rounded-4 d-flex align-items-center justify-content-center gap-3 fw-medium btn-google ${isHovering ? 'hovered' : ''}`}
                    style={{ height: '56px', fontSize: '1rem' }}
                >
                    <GoogleIcon />
                    Continue with Google
                </button>

                {/* Divider */}
                <div className="d-flex align-items-center gap-3 my-1">
                    <div className="flex-grow-1 bg-stone-800" style={{ height: '1px' }} />
                    <span className="text-stone-600 text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>or</span>
                    <div className="flex-grow-1 bg-stone-800" style={{ height: '1px' }} />
                </div>

                {/* Guest Button */}
                <Link to="/" className="text-decoration-none">
                    <button className="btn w-100 rounded-4 fw-medium btn-guest" style={{ height: '48px' }}>
                        Browse as guest
                    </button>
                </Link>
            </div>

            {/* KKU Mail Tip */}
            <div className="p-3 p-lg-4 bg-stone-900 border border-secondary border-opacity-25 rounded-4 mb-4 mb-lg-5">
                <div className="d-flex align-items-start gap-3">
                    <div className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '36px', height: '36px', backgroundColor: 'rgba(245, 158, 11, 0.1)' }}>
                        <Sparkles size={18} className="text-warning" />
                    </div>
                    <div>
                        <p className="text-stone-300 fw-bold mb-1" style={{ fontSize: '0.9rem' }}>Use @kkumail.com</p>
                        <p className="text-stone-500 m-0 lh-base" style={{ fontSize: '0.8rem' }}>
                            Sign in with your KKU email to unlock exclusive student features and verified badge.
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Terms */}
            <p className="text-stone-600 mb-0 text-center text-lg-start" style={{ fontSize: '0.75rem' }}>
                By signing in, you agree to our{" "}
                <a href="#" className="text-stone-400 text-decoration-underline hover-text-stone-300">Terms</a>
                {" "}&{" "}
                <a href="#" className="text-stone-400 text-decoration-underline hover-text-stone-300">Privacy</a>
            </p>
        </div>
    );
};