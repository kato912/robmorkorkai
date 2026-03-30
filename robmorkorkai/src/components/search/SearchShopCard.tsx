import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, Clock, Coffee } from "lucide-react";
import { FACILITIES } from "../../data/mockDatat";
import type { Shop } from "../../data/mockDatat";

interface Props {
    shop: Shop;
}

export const SearchShopCard: React.FC<Props> = ({ shop }) => {
    return (
        <Link to={`/shop/${shop.id}`} className="text-decoration-none">
            
            <style>{`
                .custom-search-card {
                    background-color: #231c18 !important;
                    border: 1px solid #3d302a !important;
                }
                .custom-search-card:hover {
                    border-color: #c9943a !important;
                    background-color: #2d2320 !important;
                }
            `}</style>

            <div className="card shadow-sm rounded-4 overflow-hidden custom-search-card transition h-100">
                <div className="d-flex h-100">
                    {/* รูปภาพ */}
                    <div style={{ width: '35%', maxWidth: '160px', minWidth: '120px' }} className="position-relative">
                        <img src={shop.coverImage || shop.image} className="w-100 h-100 object-fit-cover" alt={shop.name} style={{ minHeight: '130px', opacity: 0.9 }} />
                        {shop.verified && (
                            <span className="position-absolute top-0 start-0 m-2 badge rounded-1 shadow-sm px-2 py-1" 
                                style={{ fontSize: '0.65rem', backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                                Verified
                            </span>
                        )}
                    </div>

                    {/* เนื้อหา */}
                    <div className="p-3 flex-grow-1 d-flex flex-column justify-content-center">
                        <div className="d-flex justify-content-between align-items-start">
                            <h6 className="fw-bold mb-1 fs-6 text-truncate" style={{ maxWidth: '80%', color: '#f5ebe4' }}>{shop.name}</h6>
                            <span className="small" style={{ fontSize: '0.7rem', color: '#8a7b72' }}>{shop.priceRange}</span>
                        </div>

                        <p className="small text-truncate mb-2" style={{ maxWidth: '95%', fontSize: '0.8rem', color: '#9a8a7e' }}>
                            {shop.description}
                        </p>

                        <div className="d-flex align-items-center gap-1 small fw-bold mb-2" style={{ color: '#e8b94a' }}>
                            <Star size={14} className="fill-warning" style={{ color: '#e8b94a' }} /> {shop.rating}
                            <span className="fw-normal" style={{ color: '#8a7b72' }}>({shop.reviewCount})</span>
                        </div>

                        <div className="mt-auto">
                            <div className="d-flex flex-wrap align-items-center gap-3 small mb-2" style={{ fontSize: '0.75rem', color: '#9a8a7e' }}>
                                <span className="d-flex align-items-center gap-1"><MapPin size={12} /> {shop.zone}</span>
                                <span className="d-flex align-items-center gap-1"><Clock size={12} /> {shop.openHours}</span>
                            </div>

                            <div className="d-flex gap-1 flex-wrap">
                                {shop.facilities.slice(0, 3).map((fId: string) => {
                                    const fac = FACILITIES.find(f => f.id === fId);
                                    const Icon = fac?.icon || Coffee;
                                    return (
                                        <span key={fId} className="badge fw-normal d-flex align-items-center gap-1 px-2 py-1" 
                                            style={{ fontSize: '0.65rem', backgroundColor: '#2d2320', color: '#9a8a7e', border: '1px solid #3d302a' }}>
                                            <Icon size={10} /> {fac?.label}
                                        </span>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};