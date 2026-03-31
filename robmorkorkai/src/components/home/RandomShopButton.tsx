import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dices } from 'lucide-react';

interface Props {
    shops: any[];
}

export const RandomShopButton: React.FC<Props> = ({ shops }) => {
    const navigate = useNavigate();

    const handleRandomShop = () => {
        if (shops.length > 0) {
            const randomIndex = Math.floor(Math.random() * shops.length);
            const randomShop = shops[randomIndex];
            navigate(`/shop/${randomShop.id}`);
        } else {
            alert("ไม่เจอร้านในหมวดหมู่นี้ให้สุ่มเลย แง 🥲");
        }
    };

    return (
        <>
            <style>
                {`
                    .gacha-btn {
                        width: 60px; 
                        height: 60px;
                        background-color: #A73B24; 
                        color: #e8b94a;
                        position: fixed; 
                        z-index: 1000; 
                        border: 2px solid #e8b94a;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        animation: bounce 2s infinite;
                        bottom: 110px;
                        right: 20px;
                    }

                    .gacha-btn:hover:not(:active) {
                        background-color: #8f3219 !important; /* ลดสีไป */
                        box-shadow: 0 12px 40px rgba(167, 59, 36, 0.5) !important; /* ขยาย shadow */
                        transform: translateY(-5px) scale(1.1) !important; /* Float ขึ้น + ขยาย */
                        animation: none;
                    }

                    .gacha-btn:active {
                        background-color: #6d2616 !important; /* ลดอีกกว่าหน่อย */
                        box-shadow: 0 6px 20px rgba(167, 59, 36, 0.3) !important; /* Shadow ลดลง */
                        transform: scale(0.95) !important; /* กดลงเล็กน้อย */
                    }

                    @media (min-width: 992px) {
                        .gacha-btn {
                            bottom: 40px; 
                            right: 2.5%;
                        }
                    }

                    @media (min-width: 1400px) {
                        .gacha-btn {
                            right: 5%;
                        }
                    }

                    @keyframes bounce {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-5px); }
                    }
                `}
            </style>
            
            <button
                onClick={handleRandomShop}
                className="btn rounded-circle shadow-lg d-flex align-items-center justify-content-center gacha-btn"
                title='random'
            >
                <Dices size={28} />
            </button>
        </>
    );
};