import React from "react";
import { Link } from "react-router-dom";
import { Store, ChevronRight } from "lucide-react";

interface StoreItem {
    id: string;
    name: string;
    status: string;
    image?: string;
}

interface Props {
    stores: StoreItem[];
}

export const MyStoreList: React.FC<Props> = ({ stores }) => {
    return (
        <section>
            <h3 className="h6 text-secondary fw-bold mb-3 d-flex align-items-center gap-2 ms-1">
                <Store size={20} />
                ร้านของฉัน
            </h3>

            {/* 1. รายการร้านค้าที่มีอยู่ */}
            {stores.map((store) => (
                <Link 
                    to={`/shop/${store.id}`} 
                    key={store.id} 
                    className="text-decoration-none d-block mb-3"
                >
                    <div className="card border-0 shadow-sm rounded-4 p-3 hover-shadow transition">
                        <div className="d-flex align-items-center gap-3">
                            <img 
                                src={store.image} 
                                alt={store.name} 
                                className="rounded-3 object-fit-cover"
                                style={{ width: '56px', height: '56px' }}
                            />
                            <div className="flex-grow-1">
                                <h5 className="fw-bold text-dark m-0" style={{ fontSize: '1rem' }}>{store.name}</h5>
                                <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-2 py-0 mt-1" style={{ fontSize: '10px' }}>
                                    {store.status === 'verified' ? 'Verified' : 'Pending'}
                                </span>
                            </div>
                            <ChevronRight className="text-secondary opacity-50" size={20} />
                        </div>
                    </div>
                </Link>
            ))}

            {/* 2. ปุ่มเพิ่มร้านค้า (Dashed Border) */}
            <Link to="/profile/add-store" className="text-decoration-none">
                <div className="card border-2 border-dashed border-primary bg-primary bg-opacity-10 rounded-4 p-4 mb-4 text-center cursor-pointer hover-bg-primary-subtle transition">
                    <div className="d-flex align-items-center justify-content-center gap-3">
                        <div className="bg-white p-2 rounded-circle text-primary shadow-sm">
                            <Store size={24} />
                        </div>
                        <div className="text-start">
                            <h6 className="fw-bold text-primary m-0">เพิ่มร้านค้า</h6>
                            <small className="text-primary opacity-75" style={{ fontSize: '0.8rem' }}>ลงทะเบียนร้านของคุณ</small>
                        </div>
                        <div className="ms-auto text-primary">
                            <ChevronRight size={20} />
                        </div>
                    </div>
                </div>
            </Link>

            {/* 3. Stats (แสดงเฉพาะ Desktop) */}
            <div className="d-none d-lg-block card border-0 shadow-sm rounded-4 p-4 mt-4">
                <h6 className="fw-bold mb-3">สถิติของคุณ</h6>
                <div className="row g-2">
                    {[
                        { label: "รีวิว", value: 15 },
                        { label: "ร้านโปรด", value: 8 },
                        { label: "ร้านฉัน", value: stores.length }
                    ].map((stat, idx) => (
                        <div className="col-4 text-center p-3 bg-light rounded-3 transition hover-bg-white" key={idx}>
                            <div className="h4 fw-bold text-primary m-0">{stat.value}</div>
                            <div className="small text-muted" style={{ fontSize: '0.75rem' }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};