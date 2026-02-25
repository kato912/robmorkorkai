import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";
import type { Shop } from "../../types/shop";

export const ShopCard: React.FC<{ shop: Shop }> = ({ shop }) => (
    <Link to={`/shop/${shop.id}`} className="text-decoration-none">
        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden" style={{ background: '#231c18'}}>
            <div className="position-relative" style={{ height: "180px" }}>
                <img
                    src={shop.image || "https://images.unsplash.com/photo-1554118811-1e0d58224f24"}
                    loading="lazy"
                    alt={shop.name}
                    className="w-100 h-100 object-fit-cover" />
            </div>

            <div className="card-body">
                <h5 className="fw-bold mb-3 text-truncate" style={{color: '#f5ebe4'}} title={shop.name}>
                    {shop.name}
                </h5>                <div className="d-flex gap-3 text-muted small mb-2">
                    <span className="text-warning fw-bold d-flex align-items-center gap-1"><Star size={14} className="fill-warning" /> {shop.ratingAvg}</span>
                    <span className="d-flex align-items-center gap-1" style={{ color:'#9a8a7e'}}><MapPin size={14} /> {shop.zone}</span>
                </div>
                <p className="card-text text-secondary small mb-0 pt-2 border-top">{shop.category}</p>
            </div>
        </div>
    </Link>
);