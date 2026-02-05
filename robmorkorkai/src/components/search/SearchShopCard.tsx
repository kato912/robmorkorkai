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
        <Link to={`/shop/${shop.id}`} className="text-decoration-none text-dark">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white hover-shadow transition h-100">
                <div className="d-flex h-100">
                    {/* รูปภาพ */}
                    <div style={{ width: '35%', maxWidth: '160px', minWidth: '120px' }} className="position-relative">
                        <img src={shop.image} className="w-100 h-100 object-fit-cover" alt={shop.name} style={{ minHeight: '130px' }} />
                        {shop.verified && (
                            <span className="position-absolute top-0 start-0 m-2 badge bg-success border border-white rounded-1 shadow-sm px-2 py-1" style={{ fontSize: '0.65rem' }}>
                                Verified
                            </span>
                        )}
                    </div>

                    {/* เนื้อหา */}
                    <div className="p-3 flex-grow-1 d-flex flex-column justify-content-center">
                        <div className="d-flex justify-content-between align-items-start">
                            <h6 className="fw-bold mb-1 fs-6 text-truncate" style={{ maxWidth: '80%' }}>{shop.name}</h6>
                            <span className="text-muted small" style={{ fontSize: '0.7rem' }}>{shop.priceRange}</span>
                        </div>

                        <p className="text-secondary small text-truncate mb-2" style={{ maxWidth: '95%', fontSize: '0.8rem' }}>
                            {shop.description}
                        </p>

                        <div className="d-flex align-items-center gap-1 text-warning small fw-bold mb-2">
                            <Star size={14} className="fill-warning" /> {shop.rating}
                            <span className="text-secondary fw-normal">({shop.reviewCount})</span>
                        </div>

                        <div className="mt-auto">
                            <div className="d-flex flex-wrap align-items-center gap-3 text-secondary small mb-2" style={{ fontSize: '0.75rem' }}>
                                <span className="d-flex align-items-center gap-1"><MapPin size={12} /> {shop.zone}</span>
                                <span className="d-flex align-items-center gap-1"><Clock size={12} /> {shop.openHours}</span>
                            </div>

                            <div className="d-flex gap-1 flex-wrap">
                                {shop.facilities.slice(0, 3).map((fId: string) => {
                                    const fac = FACILITIES.find(f => f.id === fId);
                                    const Icon = fac?.icon || Coffee;
                                    return (
                                        <span key={fId} className="badge bg-light text-secondary border fw-normal d-flex align-items-center gap-1 px-2 py-1" style={{ fontSize: '0.65rem' }}>
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