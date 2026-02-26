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
                        transition: all 0.2s;
                        animation: bounce 2s infinite;
                        bottom: 110px;
                        right: 20px;
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
                    .gacha-btn:active {
                        transform: scale(0.9);
                    }
                `}
            </style>
            
            <button
                onClick={handleRandomShop}
                className="btn rounded-circle shadow-lg d-flex align-items-center justify-content-center gacha-btn"
            >
                <Dices size={28} />
            </button>
        </>
    );
};