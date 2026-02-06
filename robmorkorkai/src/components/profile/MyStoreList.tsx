import React from "react";
import { Link } from "react-router-dom";
import { Star, Heart, ChevronRight } from "lucide-react";

interface Store {
    id: string;
    name: string;
    status: string;
    image: string;
}

interface Props {
    stores: Store[];
}

export const MyStoreList: React.FC<Props> = ({ stores }) => {
    return (
        <div>
            {/* Stats Box */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                <h6 className="fw-bold mb-3 text-secondary">สถิติของคุณ</h6>
                <div className="row g-3">
                    <div className="col-6">
                        <div className="p-3 rounded-4 text-center h-100" style={{ background: "linear-gradient(135deg, #eff6ff, #dbeafe)" }}>
                            <h3 className="fw-bold text-primary mb-0">0</h3>
                            <small className="text-primary opacity-75">รีวิวที่เขียน</small>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="p-3 rounded-4 text-center h-100" style={{ background: "linear-gradient(135deg, #fdf2f8, #fce7f3)" }}>
                            <h3 className="fw-bold text-danger mb-0">{stores.length}</h3>
                            <small className="text-danger opacity-75">ร้านโปรด</small>
                        </div>
                    </div>
                </div>
            </div>

            {/* Favorite Shops List */}
            <div>
                <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
                    <Heart className="text-danger" size={20} fill="currentColor" /> ร้านโปรด
                </h6>
                <div className="row g-3">
                    {stores.length > 0 ? (
                        stores.map((shop) => (
                            <div key={shop.id} className="col-12">
                                <Link to={`/shop/${shop.id}`} className="text-decoration-none">
                                    <div className="card border-0 shadow-sm rounded-4 p-3 transition h-100 hover-shadow">
                                        <div className="d-flex align-items-center gap-3">
                                            <img 
                                                src={shop.image} 
                                                alt={shop.name} 
                                                className="rounded-3 object-fit-cover" 
                                                style={{ width: '56px', height: '56px' }} 
                                            />
                                            <div className="flex-grow-1 overflow-hidden">
                                                <h6 className="fw-bold text-dark mb-1 text-truncate">{shop.name}</h6>
                                                <div className="d-flex align-items-center gap-2">
                                                    <span className="badge bg-light text-secondary border fw-normal">Verified</span>
                                                    <div className="d-flex align-items-center text-warning small fw-bold">
                                                        <Star size={12} fill="currentColor" className="me-1" />
                                                        5.0
                                                    </div>
                                                </div>
                                            </div>
                                            <ChevronRight size={18} className="text-muted" />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-4 text-muted">
                            <p>ยังไม่มีร้านโปรด</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};