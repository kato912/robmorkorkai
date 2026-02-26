import React from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, ArrowRight } from "lucide-react";
import '../../assets/css/AIStyles.css'

interface AIResultCardProps {
    shop: any;
}

export const AIResultCard: React.FC<AIResultCardProps> = ({ shop }) => {
    return (
        <Link to={`/shop/${shop.id}`} className="text-decoration-none d-block mb-3">
            
            <div className="card shadow-sm rounded-4 overflow-hidden custom-ai-card transition-all">
                <div className="row g-0 flex-column flex-sm-row">
                    {/* รูปภาพ */}
                    <div className="col-sm-4 position-relative" style={{ minHeight: '160px' }}>
                        <img src={shop.image} alt={shop.name} className="w-100 h-100 object-fit-cover position-absolute top-0 start-0" />
                        <div className="position-absolute top-0 start-0 m-3">
                            <span className="fw-bold px-2 py-1 rounded-pill" style={{ fontSize: '0.7rem', backgroundColor: '#A73B24', color: '#fff5f0' }}>
                                {shop.match}% Match
                            </span>
                        </div>
                    </div>
                    {/* ข้อมูล */}
                    <div className="col-sm-8">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <div>
                                    <h5 className="fw-bold m-0" style={{ color: '#f5ebe4' }}>{shop.name}</h5>
                                    <div className="d-flex flex-wrap align-items-center gap-2 mt-1" style={{ fontSize: '0.8rem' }}>
                                        <span className="fw-bold d-flex align-items-center gap-1" style={{ color: '#e8b94a' }}><Star size={12} style={{ color: '#e8b94a' }} fill="currentColor"/> {shop.rating}</span>
                                        <span style={{ color: '#9a8a7e' }}>({shop.reviews} reviews)</span>
                                        <span style={{ color: '#9a8a7e' }}>-</span>
                                        <span className="d-flex align-items-center gap-1" style={{ color: '#9a8a7e' }}><MapPin size={12}/> {shop.zone}</span>
                                    </div>
                                </div>
                                <div className="d-none d-sm-flex align-items-center gap-1" style={{ color: '#c9943a' }}>
                                    <small>View</small> <ArrowRight size={14} />
                                </div>
                            </div>
                            
                            <p className="mb-3 mt-2" style={{ fontSize: '0.85rem', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', color: '#e8ebe4' }}>
                                {shop.reason}
                            </p>

                            <div className="d-flex gap-2 flex-wrap">
                                {shop.tags.map((tag: string) => (
                                    <span key={tag} className="badge rounded-pill px-2 py-1 fw-medium" style={{ backgroundColor: '#2d2320', color: '#e8b94a', border: '1px solid #3d302a' }}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};