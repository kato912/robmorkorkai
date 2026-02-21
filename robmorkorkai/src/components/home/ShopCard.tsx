import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";
import type { Shop } from "../../data/mockData";

export const ShopCard: React.FC<{ shop: Shop }> = ({ shop }) => (
    <Link to={`/shop/${shop.id}`} className="text-decoration-none">
        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="position-relative" style={{ height: "180px" }}>
                <img src={shop.image} 
                loading="lazy"   
                alt={shop.name} 
                className="w-100 h-100 object-fit-cover" />
                {shop.verified && <span className="position-absolute top-0 end-0 m-2 badge bg-success rounded-pill">VERIFIED</span>}
            </div>
            <div className="card-body">
                <h5 className="card-title fw-bold text-dark mb-1">{shop.name}</h5>
                <div className="d-flex gap-3 text-muted small mb-2">
                    <span className="text-warning fw-bold d-flex align-items-center gap-1"><Star size={14} className="fill-warning" /> {shop.rating}</span>
                    <span className="d-flex align-items-center gap-1"><MapPin size={14} /> {shop.zone}</span>
                </div>
                <p className="card-text text-secondary small mb-0 pt-2 border-top">{shop.category}</p>
            </div>
        </div>
    </Link>
);