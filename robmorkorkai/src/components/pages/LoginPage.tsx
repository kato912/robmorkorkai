/**
 * LoginPage Component
 *
 * Main authentication landing page with responsive design.
 * Features:
 * - Responsive split layout: 55% image + 45% form (desktop only)
 * - Mobile-optimized view: full-width image header + form below
 * - Hero image with gradient overlays
 * - Feature highlights badges
 * - Testimonial section on desktop
 * - Navigation bar with back button
 * - Integrates LoginForm component
 *
 * Layout:
 * Desktop: Side-by-side layout with image on left, form on right
 * Mobile: Stacked layout with image header and form below
 *
 * Features displayed:
 * - 500+ Verified shops near KKU
 * - 10K+ Reviews from real students
 * - AI-powered recommendations
 *
 * CSS Classes Used:
 * - login-page-root: Main container
 * - login-desktop-container: Desktop layout wrapper
 * - login-desktop-image-section: Image area (55%)
 * - login-desktop-form-section: Form area (45%)
 * - login-mobile-container: Mobile layout wrapper
 * - login-mobile-image-section: Mobile image header
 * - login-mobile-content-section: Mobile form area
 */

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, ArrowLeft } from "lucide-react";
import { LoginForm } from "../auth/LoginForm";
import "./css/LoginPage.css";

const API_BASE = import.meta.env.VITE_API_URL;

/** Feature statistics from database */
interface Stats {
    shops: number;
    reviews: number;
    aiPowered: boolean;
}

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState<Stats>({ shops: 500, reviews: 10000, aiPowered: true });

    /**
     * Fetch app statistics from backend on component mount
     * Updates features display with real data from database
     */
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/shops/stats`);
                if (!response.ok) throw new Error("Failed to fetch stats");
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error("Error fetching stats:", error);
                // Fallback to default values on error
                setStats({ shops: 500, reviews: 10000, aiPowered: true });
            }
        };

        fetchStats();
    }, []);

    /**
     * Format feature items from stats for display
     * Converts stats into human-readable feature pills
     */
    const features = [
        { label: `${(stats.shops).toLocaleString()}+ Shops`, desc: "Verified near KKU" },
        { label: `${(stats.reviews).toLocaleString()}+ Reviews`, desc: "From real students" },
        { label: stats.aiPowered ? "AI Powered" : "Smart", desc: "Smart recommendations" },
    ];

    /**
     * Handle Google login button click
     * Triggers authentication flow
     */
    const handleGoogleLogin = () => {
        console.log("Login with Google Clicked!");
        // Authentication logic handled in LoginForm component
    };

    return (
        <div className="login-page-root">
            {/* ======================= DESKTOP VIEW ======================= */}
            {/* Desktop layout: 55% image on left, 45% form on right */}
            <div className="login-desktop-container">

                {/* Left Side - Hero Image & Testimonial (55%) */}
                <div className="login-desktop-image-section">
                    {/* Background image - cafe interior */}
                    <img
                        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"
                        alt="Premium cafe interior"
                        className="login-hero-image"
                    />
                    
                    {/* Dark gradient overlays - creates readability over image */}
                    <div className="login-image-overlay-horizontal" />
                    <div className="login-image-overlay-vertical" />

                    {/* Bottom content - Features and testimonial */}
                    <div className="login-image-bottom-content">
                        {/* Feature badges - display key stats */}
                        <div className="login-features-desktop">
                            {features.map((f) => (
                                <div key={f.label} className="login-feature-pill">
                                    <span className="login-feature-pill-text">{f.label}</span>
                                </div>
                            ))}
                        </div>
                        
                        {/* Testimonial section - social proof */}
                        <p className="login-testimonial-text">
                            &ldquo;The best way to discover hidden gems around campus. Every student at KKU needs this.&rdquo;
                        </p>
                        <footer className="login-testimonial-credit">A KKU Student, Class of 2025</footer>
                    </div>
                </div>

                {/* Right Side - Form Section (45%) */}
                <div className="login-desktop-form-section">
                    {/* Navigation bar - Back button and branding */}
                    <div className="login-desktop-nav">
                        <button 
                            onClick={() => navigate(-1)} 
                            className="login-back-button"
                            title="Go back to previous page"
                        >
                            <ArrowLeft size={18} className="login-back-button-icon" />
                            <span className="login-back-button-text">Back</span>
                        </button>
                        <Link to="/" className="login-brand-section">
                            <MapPin size={20} className="login-brand-icon" />
                            <span className="login-brand-name">robmorkorkai</span>
                        </Link>
                    </div>

                    {/* Form container - centered within right section */}
                    <div className="login-desktop-form-container">
                        <LoginForm onGoogleLogin={handleGoogleLogin} />
                    </div>
                </div>
            </div>

            {/* ======================= MOBILE VIEW ======================= */}
            {/* Mobile layout: Stacked, full-width sections */}
            <div className="login-mobile-container">

                {/* Hero Image Header (45vh) */}
                <div className="login-mobile-image-section">
                    {/* Background image - cafe interior */}
                    <img
                        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
                        alt="Premium cafe interior"
                        className="login-mobile-image"
                    />
                    
                    {/* Dark overlay for image readability */}
                    <div className="login-mobile-image-overlay" />

                    {/* Top Navigation - Back button and branding */}
                    <div className="login-mobile-nav">
                        <button 
                            onClick={() => navigate(-1)} 
                            className="login-mobile-back-button"
                            title="Go back to previous page"
                        >
                            <div className="login-mobile-back-icon">
                                <ArrowLeft size={20} />
                            </div>
                        </button>
                        <div className="login-mobile-brand">
                            <MapPin size={16} className="login-mobile-brand-icon" />
                            <span className="login-mobile-brand-text">robmorkorkai</span>
                        </div>
                    </div>

                    {/* Feature Pills - Horizontal scrollable badges */}
                    <div className="login-features-mobile">
                        {features.map((f) => (
                            <div key={f.label} className="login-feature-pill-mobile">
                                <span className="login-feature-pill-mobile-text">{f.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content Area - Form section below image */}
                <div className="login-mobile-content-section">
                    {/* LoginForm component */}
                    <LoginForm onGoogleLogin={handleGoogleLogin} />
                </div>
            </div>

        </div>
    );
};

export default LoginPage;