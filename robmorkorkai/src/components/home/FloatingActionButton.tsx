import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dices, ArrowUp } from 'lucide-react';

interface Props {
    shops: any[];
}

export const FloatingActionButton: React.FC<Props> = ({ shops }) => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);

    // Track scroll position
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleRandomShop = () => {
        if (shops.length > 0) {
            const randomIndex = Math.floor(Math.random() * shops.length);
            const randomShop = shops[randomIndex];
            navigate(`/shop/${randomShop.id}`);
        } else {
            alert("ไม่เจอร้านในหมวดหมู่นี้ให้สุ่มเลย แง 🥲");
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <style>
                {`
                    .floating-action-btn {
                        width: 60px; 
                        height: 60px;
                        position: fixed; 
                        z-index: 1000; 
                        border: 2px solid #e8b94a;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        bottom: 110px;
                        right: 20px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                    }

                    .floating-action-btn:hover:not(:active) {
                        box-shadow: 0 12px 40px rgba(167, 59, 36, 0.5) !important;
                        transform: translateY(-5px) scale(1.1) !important;
                    }

                    .floating-action-btn:active {
                        box-shadow: 0 6px 20px rgba(167, 59, 36, 0.3) !important;
                        transform: scale(0.95) !important;
                    }

                    /* Random Shop Button Style */
                    .floating-action-btn.random-btn {
                        background-color: #A73B24;
                        color: #e8b94a;
                        animation: bounce 2s infinite;
                    }

                    .floating-action-btn.random-btn:hover:not(:active) {
                        background-color: #8f3219 !important;
                        animation: none;
                    }

                    .floating-action-btn.random-btn:active {
                        background-color: #6d2616 !important;
                    }

                    /* Scroll to Top Button Style */
                    .floating-action-btn.scroll-btn {
                        background-color: #e8b94a;
                        color: #1a1412;
                    }

                    .floating-action-btn.scroll-btn:hover:not(:active) {
                        background-color: #d4a855 !important;
                    }

                    .floating-action-btn.scroll-btn:active {
                        background-color: #b89e47 !important;
                    }

                    @media (min-width: 992px) {
                        .floating-action-btn {
                            bottom: 40px; 
                            right: 2.5%;
                        }
                    }

                    @media (min-width: 1400px) {
                        .floating-action-btn {
                            right: 5%;
                        }
                    }

                    @keyframes bounce {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-5px); }
                    }
                `}
            </style>
            
            {isScrolled ? (
                <button
                    onClick={scrollToTop}
                    className="floating-action-btn scroll-btn"
                    title='scroll to top'
                >
                    <ArrowUp size={28} />
                </button>
            ) : (
                <button
                    onClick={handleRandomShop}
                    className="floating-action-btn random-btn"
                    title='random'
                >
                    <Dices size={28} />
                </button>
            )}
        </>
    );
};
