import React from "react";
import { Star, MapPin } from "lucide-react";

interface ShopMobileInfoProps {
    shop: any;
}

export const ShopMobileInfo: React.FC<ShopMobileInfoProps> = ({ shop }) => {
    
    // Helper function สำหรับ render ดาว (ใส่ไว้ในนี้เพื่อให้จบใน component)
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                size={14}
                className={`${i < rating ? "text-warning fill-warning" : "text-muted opacity-50"}`}
            />
        ));
    };

    return (
        <div className="mb-4">
            {/* Rating & Actions */}
            <div className="d-flex align-items-center justify-content-between mb-4 bg-light p-3 rounded-4">
                <div className="d-flex align-items-center gap-3">
                    <div className="text-center">
                        <h2 className="fw-bold m-0 text-dark">{shop.rating}</h2>
                        <small className="text-muted" style={{ fontSize: '10px' }}>คะแนนเต็ม 5</small>
                    </div>
                    <div className="border-start ps-3">
                        <div className="d-flex mb-1">{renderStars(Math.round(Number(shop.rating)))}</div>
                        <small className="text-secondary">{shop.reviewCount} รีวิว</small>
                    </div>
                </div>
                <a href={shop.googleMap} target="_blank" rel="noreferrer" className="btn btn-primary rounded-circle p-3 shadow-sm d-flex align-items-center justify-content-center" style={{ width: 50, height: 50 }}>
                    <MapPin size={24} />
                </a>
            </div>

            {/* Description */}
            <div>
                <h5 className="fw-bold mb-2">เกี่ยวกับร้าน</h5>
                <p className="text-secondary small lh-base m-0">
                    {shop.description || "ร้านนี้บรรยากาศดี เหมาะสำหรับการนั่งทำงานและอ่านหนังสือ มีปลั๊กไฟบริการทั่วถึง Wi-Fi แรง กาแฟรสชาติดีและราคาเป็นมิตรสำหรับนักศึกษา มข."}
                </p>
            </div>
            
            <hr className="my-4 opacity-10" />
        </div>
    );
};