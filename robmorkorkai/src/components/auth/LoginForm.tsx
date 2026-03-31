/**
 * LoginForm Component
 *
 * Responsive authentication form for user login.
 * Features:
 * - Google OAuth login button with hover effects
 * - Guest browse option
 * - Visual divider between login options
 * - Educational tip box promoting KKU email sign-in
 * - Terms and privacy policy links
 * - Responsive design (mobile and desktop)
 *
 * Props:
 * - onGoogleLogin: Optional callback when Google login is clicked
 *
 * State:
 * - isHovering: Tracks hover state for Google button
 *
 * CSS Classes Used:
 * - login-form-container: Main form wrapper
 * - login-form-header: Welcome and heading section
 * - login-form-buttons: Google and guest button container
 * - login-button-google: Google OAuth button
 * - login-button-guest: Guest browse button
 * - login-form-divider-container: "or" divider
 * - login-kku-tip-box: Educational tip for KKU email
 * - login-form-footer: Terms and privacy links
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { GoogleIcon } from "./GoogleIcon";
import { useAuth } from "../../context/AuthContext";
import "./LoginForm.css";

interface LoginFormProps {
    onGoogleLogin?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onGoogleLogin }) => {
    const [isHovering, setIsHovering] = useState(false);
    const { login } = useAuth();
    
    /**
     * Handle Google login button click
     * Triggers authentication flow via AuthContext
     */
    const handleGoogleClick = () => {
        login(); // Initiate Google OAuth login
    };

    return (
        <div className="login-form-container">
            {/* Header Section - Welcome text and main heading */}
            <div className="login-form-header">
                <p className="login-form-welcome-label">Welcome</p>
                <h1 className="login-form-heading">
                    Sign in to<br />
                    <span className="login-form-heading-accent">explore KKU</span>
                </h1>
                <p className="login-form-description">
                    Discover the best cafes, restaurants, and study spots around Khon Kaen University.
                </p>
            </div>

            {/* Buttons Section - Login options */}
            <div className="login-form-buttons">
                {/* Google Login Button - Primary authentication option */}
                <button
                    onClick={handleGoogleClick}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className={`login-button-google ${isHovering ? 'hovered' : ''}`}
                    title="Continue with your Google account"
                >
                    <GoogleIcon />
                    Continue with Google
                </button>

                {/* Divider - "or" separator between login options */}
                <div className="login-form-divider-container">
                    <div className="login-divider-line" />
                    <span className="login-divider-text">or</span>
                    <div className="login-divider-line" />
                </div>

                {/* Guest Login Button - Browse without authentication */}
                <Link to="/" className="login-guest-button-link">
                    <button 
                        className="login-button-guest"
                        title="Continue browsing as guest"
                    >
                        Browse as guest
                    </button>
                </Link>
            </div>

            {/* KKU Email Tip Box - Educational callout encouraging KKU email signups */}
            <div className="login-kku-tip-box">
                {/* Icon container with Sparkles icon */}
                <div className="login-tip-icon-container">
                    <Sparkles className="login-tip-icon" size={18} />
                </div>
                
                {/* Tip content - Heading and description */}
                <div className="login-tip-content">
                    <p className="login-tip-heading">Use @kkumail.com</p>
                    <p className="login-tip-description">
                        Sign in with your KKU email to unlock exclusive student features and verified badge.
                    </p>
                </div>
            </div>

            {/* Footer - Terms and Privacy links */}
            <p className="login-form-footer">
                By signing in, you agree to our{" "}
                <a href="#" className="login-footer-link">Terms</a>
                {" "}&{" "}
                <a href="#" className="login-footer-link">Privacy</a>
            </p>
        </div>
    );
};