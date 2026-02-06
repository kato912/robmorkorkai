import React from "react";
import { MapPin ,Store } from "lucide-react";
import { renderStars } from "../../../utils/renderStars";

interface ShopMobileInfoProps {
    shop: any;
}

export const ShopMobileInfo: React.FC<ShopMobileInfoProps> = ({ shop }) => {
    return (
        <div className="mb-4">
            {/* Rating Section */}
            <div className="d-flex align-items-center justify-content-between mb-4 bg-white border p-3 rounded-4 shadow-sm">
                <div className="d-flex align-items-center gap-3">
                    <div className="text-center">
                        <h2 className="fw-bold m-0 text-dark">{shop.rating}</h2>
                        <small className="text-muted" style={{ fontSize: '10px' }}>คะแนนเต็ม 5</small>
                    </div>
                    <div className="border-start ps-3">
                        <div className="d-flex mb-1">{renderStars(Number(shop.rating))}</div>
                        <small className="text-secondary">{shop.reviewCount} รีวิว</small>
                    </div>
                </div>
                <a href={shop.googleMap} target="_blank" rel="noreferrer" className="btn btn-primary rounded-circle p-3 shadow-sm d-flex align-items-center justify-content-center" style={{ width: 50, height: 50 }}>
                    <MapPin size={24} />
                </a>
            </div>

            {/* --- Description --- */}
            <div className="position-relative p-3 rounded-4" style={{ backgroundColor: '#F8F9FA' }}>

                <div className="d-flex align-items-center gap-2 mb-2">
                    <div className="bg-white p-1 rounded-circle shadow-sm d-flex align-items-center justify-content-center" style={{ width: 32, height: 32 }}>
                        <Store size={16} className="text-primary" />
                    </div>
                    <h5 className="fw-bold m-0">เกี่ยวกับร้าน</h5>
                </div>

                {/* เนื้อหา */}
                <p className="text-secondary small lh-base m-0 ps-1">
                    {shop.description || "ร้านนี้บรรยากาศดี เหมาะสำหรับการนั่งทำงานและอ่านหนังสือ..."}
                </p>
            </div>

            <hr className="my-4 opacity-10" />
        </div>
    );
};