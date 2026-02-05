import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
    ArrowLeft, Camera, MapPin, Link2, FileText, Store, 
    X, CheckCircle, Clock 
} from "lucide-react";
import { TopNavbar } from "../layout/TopNavbar";
import { BottomNav } from "../layout/BottomNav"; // ✅ เรียกใช้ BottomNav ที่มีอยู่แล้ว
import { CustomDropdown } from "../addStore/CustomDropdown"; // ✅ เรียกใช้ CustomDropdown จากไฟล์แยก

export const AddShopPage: React.FC = () => {
    const navigate = useNavigate();
    
    const [storeData, setStoreData] = useState({
        name: "",
        description: "",
        zone: "",
        category: "",
        googleMapsLink: "",
        openHours: "",
        image: null as string | null,
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleImageUpload = () => {
        setStoreData({
            ...storeData,
            image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop", 
        });
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        window.scrollTo(0, 0);
    };

    const categoryOptions = [
        { value: "cafe", label: "คาเฟ่" },
        { value: "restaurant", label: "ร้านอาหาร" },
        { value: "dessert", label: "ของหวาน" },
        { value: "bar", label: "บาร์/ผับ" },
        { value: "service", label: "บริการ" },
        { value: "service2", label: "บริการ (สาขา 2)" },
        { value: "service3", label: "บริการ (สาขา 3)" },
        { value: "other", label: "อื่นๆ" },
    ];

    const zoneOptions = [
        { value: "kangsadan", label: "กังสดาล" },
        { value: "langmor", label: "หลังมอ" },
        { value: "bueng", label: "ฝั่งบึง" },
    ];

    if (isSubmitted) {
        return (
            <div className="min-vh-100 bg-light d-flex flex-column">
                <div className="d-none d-lg-block">
                    <TopNavbar activePage="AddShopPage"/>
                </div>
                <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center px-4 py-5">
                    <div className="bg-success bg-opacity-10 rounded-circle p-4 mb-4">
                        <CheckCircle className="text-success" size={64} />
                    </div>
                    <h2 className="fw-bold text-dark mb-2 text-center">ส่งข้อมูลสำเร็จ!</h2>
                    <p className="text-secondary text-center mb-5">
                        ร้านของคุณจะได้รับการตรวจสอบ<br />
                        และจะปรากฏบนเว็บไซต์ภายใน 24 ชม.
                    </p>
                    <div className="d-grid gap-2 w-100" style={{ maxWidth: '320px' }}>
                        <Link to="/" className="btn btn-primary py-3 rounded-pill fw-bold">
                            กลับไปหน้าแรก
                        </Link>
                        <Link to="/profile" className="btn btn-outline-secondary py-3 rounded-pill fw-bold">
                            ไปที่หน้าโปรไฟล์
                        </Link>
                    </div>
                </div>
                {/* Mobile Bottom Nav */}
                <div className="d-lg-none mt-auto">
                    <BottomNav />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-light min-vh-100 pb-5">
            {/* Desktop Navbar */}
            <div className="d-none d-lg-block">
                <TopNavbar activePage="profile" />
            </div>

            {/* Mobile Header */}
            <div className="d-lg-none bg-primary px-3 py-3 border-bottom sticky-top shadow-sm">
                <div className="d-flex align-items-center gap-3">
                    <button onClick={() => navigate(-1)} className="btn p-0 border-0">
                        <ArrowLeft size={24} className="text-white" />
                    </button>
                    <h1 className="h5 fw-bold m-0 text-white">เพิ่มร้านค้า</h1>
                </div>
            </div>

            <div className="container py-4 py-lg-5 mb-5" style={{ maxWidth: '800px' }}>
                <div className="d-none d-lg-flex items-center gap-2 mb-4">
                    <Link to="/" className="text-decoration-none text-secondary d-flex align-items-center gap-1 hover-dark">
                        <ArrowLeft size={20} /> ย้อนกลับ
                    </Link>
                    <span className="text-muted">/</span>
                    <span className="fw-bold">ลงทะเบียนร้านค้า</span>
                </div>

                <div className="card border-0 shadow-sm rounded-4 p-4 p-lg-5 bg-white">
                    {/* Image Upload */}
                    <div className="mb-4">
                        <label className="form-label fw-bold text-secondary">รูปภาพร้าน</label>
                        {storeData.image ? (
                            <div className="position-relative">
                                <img
                                    src={storeData.image}
                                    alt="Store Preview"
                                    className="w-100 rounded-4 object-fit-cover shadow-sm border"
                                    style={{ height: '250px' }}
                                />
                                <button
                                    onClick={() => setStoreData({ ...storeData, image: null })}
                                    className="btn btn-danger btn-sm rounded-circle position-absolute top-0 end-0 m-2 shadow"
                                    style={{ width: 32, height: 32, padding: 0 }}
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div 
                                onClick={handleImageUpload}
                                className="w-100 rounded-4 border-2 border-dashed d-flex flex-column align-items-center justify-content-center cursor-pointer bg-light hover-bg-gray transition"
                                style={{ height: '250px', borderStyle: 'dashed' }}
                            >
                                <div className="bg-white p-3 rounded-circle shadow-sm mb-3">
                                    <Camera className="text-primary" size={32} />
                                </div>
                                <div className="text-center">
                                    <p className="fw-bold text-dark mb-1">แตะเพื่ออัปโหลดรูปภาพ</p>
                                    <p className="text-muted small m-0">JPG, PNG ขนาดไม่เกิน 5MB</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="row g-4">
                        <div className="col-md-6">
                            <label className="form-label fw-bold small text-secondary">
                                <Store size={16} className="me-1 mb-1" /> ชื่อร้าน
                            </label>
                            <input
                                type="text"
                                className="form-control form-control-lg rounded-3 fs-6 bg-white"
                                placeholder="เช่น Coffee Corner KKU"
                                value={storeData.name}
                                onChange={(e) => setStoreData({ ...storeData, name: e.target.value })}
                            />
                        </div>

                        <div className="col-md-6">
                            {/* เรียกใช้ Component จากไฟล์แยก */}
                            <CustomDropdown 
                                label="หมวดหมู่"
                                placeholder="เลือกหมวดหมู่..."
                                value={storeData.category}
                                onChange={(val) => setStoreData({...storeData, category: val})}
                                options={categoryOptions}
                            />
                        </div>

                        <div className="col-md-6">
                            {/* เรียกใช้ Component จากไฟล์แยก */}
                            <CustomDropdown 
                                label="โซน"
                                icon={MapPin}
                                placeholder="เลือกโซน..."
                                value={storeData.zone}
                                onChange={(val) => setStoreData({...storeData, zone: val})}
                                options={zoneOptions}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-bold small text-secondary">
                                <Clock size={16} className="me-1 mb-1" /> เวลาเปิด-ปิด
                            </label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg rounded-3 fs-6 bg-white" 
                                placeholder="เช่น 10:00 - 22:00 น." 
                                value={storeData.openHours} 
                                onChange={(e) => setStoreData({ ...storeData, openHours: e.target.value })} 
                            />
                        </div>

                        <div className="col-12">
                            <label className="form-label fw-bold small text-secondary">
                                <Link2 size={16} className="me-1 mb-1" /> ลิงก์ Google Maps
                            </label>
                            <input
                                type="text"
                                className="form-control form-control-lg rounded-3 fs-6 bg-white"
                                placeholder="http://googleusercontent.com/..."
                                value={storeData.googleMapsLink}
                                onChange={(e) => setStoreData({ ...storeData, googleMapsLink: e.target.value })}
                            />
                        </div>

                        <div className="col-12">
                            <label className="form-label fw-bold small text-secondary">
                                <FileText size={16} className="me-1 mb-1" /> รายละเอียดร้าน
                            </label>
                            <textarea
                                className="form-control rounded-4 bg-white"
                                rows={4}
                                placeholder="บอกเล่าเกี่ยวกับร้านของคุณ..."
                                value={storeData.description}
                                onChange={(e) => setStoreData({ ...storeData, description: e.target.value })}
                            ></textarea>
                        </div>
                    </div>

                    <div className="mt-2 mb-4">
                        <small className="text-muted ms-1">
                            * คัดลอกลิงก์จาก Google Maps เพื่อให้ลูกค้าหาร้านได้ง่ายขึ้น
                        </small>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={!storeData.name || !storeData.zone || !storeData.category}
                        className="btn btn-primary w-100 py-3 rounded-3 fw-bold shadow-sm"
                    >
                        ส่งข้อมูลร้านค้า
                    </button>
                    
                    <div className="text-center mt-3">
                        <small className="text-muted">ข้อมูลของคุณจะได้รับการตรวจสอบก่อนแสดงบนเว็บไซต์</small>
                    </div>
                </div>
            </div>

            <div className="d-lg-none">
                <BottomNav activePage="profile"/>
            </div>
        </div>
    );
};