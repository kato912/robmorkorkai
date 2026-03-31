import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <style>
                {`
                    .scroll-to-top-btn {
                        bottom: 40px;  /* มือถือ: ลดความสูง ให้อยู่ใกล้บ่อกว่า */
                        right: 20px;   /* มือถือ: ชิดขอบเข้ามา */
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    }

                    .scroll-to-top-btn:hover:not(:active) {
                        background-color: #d4a855 !important; /* ลดสีไป */
                        box-shadow: 0 12px 40px rgba(232, 185, 74, 0.4) !important; /* ขยาย shadow */
                        transform: translateY(-3px) scale(1.08) !important; /* Float ขึ้นมา + ขยายเล็กน้อย */
                    }

                    .scroll-to-top-btn:active {
                        background-color: #b89e47 !important; /* ลดอีกกว่าหน่อย */
                        box-shadow: 0 6px 20px rgba(232, 185, 74, 0.3) !important; /* Shadow ลดลง */
                        transform: translateY(-1px) scale(0.95) !important; /* กดลงเล็กน้อย */
                    }
                    
                    @media (min-width: 992px) {
                        .scroll-to-top-btn {
                            bottom: 40px; /* จอคอม: ดูสมดุลกว่า */
                            right: 40px;  /* จอคอม: ขยับห่างขอบ */
                        }
                    }
                `}
            </style>

            <button
                onClick={scrollToTop}
                className={`scroll-to-top-btn btn rounded-circle shadow-lg position-fixed d-flex justify-content-center align-items-center transition-all hover-scale ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#e8b94a', // สีทอง
                    color: '#1a1412', // ลูกศรสีเข้ม
                    border: 'none',
                    zIndex: 1040,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
                }}
            >
                <ArrowUp size={24} />
            </button>
        </>
    );
};