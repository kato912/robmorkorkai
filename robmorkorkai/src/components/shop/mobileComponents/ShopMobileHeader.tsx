import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Share2, Heart, MapPin, Clock } from "lucide-react";

interface ShopMobileHeaderProps {
    shop: any;
}

export const ShopMobileHeader: React.FC<ShopMobileHeaderProps> = ({ shop }) => {
    return (
        <div className="position-relative" style={{ height: '280px' }}>
            <img
                src={shop.image}
                alt={shop.name}
                className="w-100 h-100 object-fit-cover"
            />
            {/* Gradient Overlay */}
            <div className="position-absolute top-0 start-0 w-100 h-100"
                style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 40%, rgba(0,0,0,0.8) 100%)' }}>
            </div>

            {/* Navbar Buttons */}
            <div className="position-absolute top-0 start-0 w-100 p-3 d-flex justify-content-between align-items-center">
                <Link to="/" className="btn btn-dark bg-black bg-opacity-50 border-0 rounded-circle p-2 d-flex align-items-center justify-content-center text-white backdrop-blur" style={{ width: 40, height: 40 }}>
                    <ArrowLeft size={20} />
                </Link>
                <div className="d-flex gap-2">
                    <button className="btn btn-dark bg-black bg-opacity-50 border-0 rounded-circle p-2 d-flex align-items-center justify-content-center text-white backdrop-blur" style={{ width: 40, height: 40 }}>
                        <Share2 size={20} />
                    </button>
                    <button className="btn btn-dark bg-black bg-opacity-50 border-0 rounded-circle p-2 d-flex align-items-center justify-content-center text-white backdrop-blur" style={{ width: 40, height: 40 }}>
                        <Heart size={20} />
                    </button>
                </div>
            </div>

            {/* Shop Info Overlay */}
            <div className="position-absolute bottom-0 start-0 w-100 p-3 text-white">
                <span className="badge bg-primary px-2 py-1 mb-2 rounded-pill shadow-sm">{shop.category}</span>
                <h1 className="fw-bold m-0 text-shadow">{shop.name}</h1>
                <div className="d-flex align-items-center gap-2 mt-1 small opacity-75">
                    <MapPin size={14} /> <span>โซน{shop.zone}</span> •
                    <Clock size={14} /> <span>{shop.openTime}</span>
                </div>
            </div>
        </div>
    );
};