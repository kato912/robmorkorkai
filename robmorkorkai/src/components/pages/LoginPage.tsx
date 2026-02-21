import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, ArrowLeft } from "lucide-react";
import { LoginForm } from "../auth/LoginForm";

const features = [
    { label: "500+ Shops", desc: "Verified near KKU" },
    { label: "10K+ Reviews", desc: "From real students" },
    { label: "AI Powered", desc: "Smart recommendations" },
];

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    // ฟังก์ชันสำหรับล็อกอิน (เรียกใช้เมื่อกดปุ่ม Google)
    const handleGoogleLogin = () => {
        console.log("Login with Google Clicked!");
        // logic ล็อกอินด้วย AuthContext ตรงนี้
    };

    return (
        <div className="min-vh-100" style={{ backgroundColor: '#0c0a09', fontFamily: 'Inter, sans-serif' }}>

            <style>{`
        /* Global Styles สำหรับหน้า Login */
        .text-stone-100 { color: #f5f5f4; }
        .text-stone-300 { color: #d6d3d1; }
        .text-stone-400 { color: #a8a29e; }
        .text-stone-500 { color: #78716c; }
        .text-stone-600 { color: #57534e; }
        .bg-stone-800 { background-color: #292524; }
        .bg-stone-900 { background-color: #1c1917; }
        
        .btn-google { background-color: transparent; border: 1px solid #44403c; color: #d6d3d1; transition: all 0.3s ease; }
        .btn-google:hover, .btn-google.hovered { background-color: white; color: #1c1917; border-color: white; box-shadow: 0 10px 25px -5px rgba(255, 255, 255, 0.1); }
        
        .btn-guest { transition: all 0.2s; color: #78716c; }
        .btn-guest:hover { background-color: #1c1917; color: #d6d3d1; }
        
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

            {/* ======================= DESKTOP VIEW ======================= */}
            <div className="d-none d-lg-flex min-vh-100">

                {/* Left Side - Image & Quote (55%) */}
                <div className="position-relative overflow-hidden" style={{ width: '55%' }}>
                    <img
                        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"
                        alt="Premium cafe interior"
                        className="w-100 h-100 object-fit-cover"
                    />
                    <div className="position-absolute inset-0 w-100 h-100" style={{ background: 'linear-gradient(to right, rgba(12,10,9,0.3) 0%, transparent 50%, #0c0a09 100%)' }} />
                    <div className="position-absolute inset-0 w-100 h-100" style={{ background: 'linear-gradient(to top, rgba(12,10,9,0.9) 0%, transparent 50%, rgba(12,10,9,0.4) 100%)' }} />

                    <div className="position-absolute bottom-0 start-0 w-100 p-5" style={{ zIndex: 10 }}>
                        <div className="d-flex align-items-center gap-3 mb-5">
                            {features.map((f) => (
                                <div key={f.label} className="rounded-pill px-4 py-2" style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <span className="text-white fw-medium" style={{ fontSize: '0.9rem', opacity: 0.9 }}>{f.label}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ maxWidth: '500px' }}>
                            <p className="fst-italic text-white lh-lg mb-3" style={{ fontSize: '1.25rem', opacity: 0.8 }}>
                                &ldquo;The best way to discover hidden gems around campus. Every student at KKU needs this.&rdquo;
                            </p>
                            <footer className="text-white small" style={{ opacity: 0.5 }}>A KKU Student, Class of 2025</footer>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form (45%) */}
                <div className="d-flex flex-column p-5" style={{ width: '45%' }}>
                    {/* Nav */}
                    <div className="d-flex align-items-center justify-content-between mt-3 px-3">
                        <button onClick={() => navigate(-1)} className="btn btn-link text-decoration-none d-flex align-items-center gap-2 p-0 text-stone-500 hover-text-stone-300 transition-all">
                            <ArrowLeft size={18} />
                            <span className="small fw-medium">Back</span>
                        </button>
                        <Link to="/" className="text-decoration-none d-flex align-items-center gap-2">
                            <MapPin size={20} className="text-stone-400" />
                            <span className="text-stone-300 fw-bold tracking-tight">robmorkorkai</span>
                        </Link>
                    </div>

                    {/* Render Component LoginForm */}
                    <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
                        <LoginForm onGoogleLogin={handleGoogleLogin} />
                    </div>
                </div>
            </div>

            {/* ======================= MOBILE VIEW ======================= */}
            <div className="d-lg-none d-flex flex-column min-vh-100">

                {/* Hero Image (45vh) */}
                <div className="position-relative overflow-hidden" style={{ height: '45vh' }}>
                    <img
                        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
                        alt="Premium cafe interior"
                        className="w-100 h-100 object-fit-cover"
                    />
                    <div className="position-absolute inset-0 w-100 h-100" style={{ background: 'linear-gradient(to bottom, rgba(12,10,9,0.6) 0%, transparent 50%, #0c0a09 100%)' }} />

                    {/* Top Nav (Mobile) */}
                    <div className="position-absolute top-0 start-0 w-100 p-3 d-flex align-items-center justify-content-between pt-4">
                        <button onClick={() => navigate(-1)} className="btn btn-link p-0 text-white text-decoration-none" title="black">
                            <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)' }}>
                                <ArrowLeft size={20} />
                            </div>
                        </button>
                        <div className="d-flex align-items-center gap-2">
                            <MapPin size={16} className="text-white opacity-75" />
                            <span className="text-white fw-bold opacity-75 small">robmorkorkai</span>
                        </div>
                    </div>

                    {/* Feature Pills */}
                    <div className="position-absolute bottom-0 start-0 w-100 px-3 pb-4 d-flex align-items-center gap-2 overflow-auto hide-scroll">
                        {features.map((f) => (
                            <div key={f.label} className="rounded-pill px-3 py-1 flex-shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <span className="text-white fw-medium" style={{ fontSize: '0.75rem', opacity: 0.9 }}>{f.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-grow-1 px-4 pt-4 pb-5 d-flex flex-column align-items-center">
                    {/* Render Component LoginForm */}
                    <LoginForm onGoogleLogin={handleGoogleLogin} />
                </div>
            </div>

        </div>
    );
};

export default LoginPage;