import React, { useState, useEffect } from "react";
import {
    Shield, BarChart3, Store, LogOut, X,
    Clock, FileText, User, MapPin, Edit, Save, Image as ImageIcon
} from "lucide-react";
// import type { Shop } from "../../data/mockData";
import type { Shop } from "../../types/shop"; // แก้ path ให้ตรงกับที่เก็บไฟล์ Interface ของคุณ
import { adminTheme } from "./types";
export const theme = adminTheme;

// --- Sidebar & Navigation ---
export const AdminSidebar = ({ activeTab, setActiveTab, logout }: any) => (
    <aside className="d-none d-lg-flex position-fixed h-100 flex-column" style={{ width: '260px', backgroundColor: theme.sidebarBg, zIndex: 1030 }}>
        <div className="p-4 mb-2">
            <div className="d-flex align-items-center gap-3">
                <div className="bg-primary rounded-3 p-2 d-flex align-items-center justify-content-center">
                    <Shield size={24} className="text-white" />
                </div>
                <div>
                    <h6 className="fw-bold text-white m-0">Admin Panel</h6>
                    <small style={{ color: theme.textGray }}>robmorkorkai</small>
                </div>
            </div>
        </div>
        <nav className="px-3 flex-grow-1 d-flex flex-column gap-1">
            <SidebarItem id="overview" label="ภาพรวม" icon={BarChart3} activeTab={activeTab} onClick={setActiveTab} />
            <SidebarItem id="stores" label="จัดการร้านค้า" icon={Store} activeTab={activeTab} onClick={setActiveTab} />
        </nav>
        <div className="p-3 mt-auto border-top border-secondary border-opacity-25">
            <button onClick={logout} className="btn w-100 d-flex align-items-center gap-3 px-3 py-3 rounded-3 border-0 transition text-decoration-none" style={{ color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}><LogOut size={20} /> <span className="fw-medium">ออกจากระบบ</span></button>
        </div>
    </aside>
);

const SidebarItem = ({ id, label, icon: Icon, activeTab, onClick }: any) => (
    <button onClick={() => onClick(id)} className="w-100 d-flex align-items-center gap-3 px-3 py-3 rounded-3 border-0 transition text-decoration-none mb-1"
        style={{ backgroundColor: activeTab === id ? theme.activeBlue : "transparent", color: activeTab === id ? "#ffffff" : theme.textGray }}>
        <Icon size={20} /> <span className={activeTab === id ? "fw-bold" : "fw-medium"}>{label}</span>
    </button>
);

export const AdminMobileNav = ({ activeTab, setActiveTab, logout }: any) => (
    <nav className="d-lg-none fixed-bottom bg-white border-top shadow-lg d-flex justify-content-around py-2" style={{ zIndex: 1060 }}>
        <NavBtn icon={BarChart3} label="ภาพรวม" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
        <NavBtn icon={Store} label="ร้านค้า" active={activeTab === 'stores'} onClick={() => setActiveTab('stores')} />
        <button onClick={logout} className="btn border-0 d-flex flex-column align-items-center gap-1" style={{ color: '#ef4444' }}><LogOut size={24} strokeWidth={2} /><span style={{ fontSize: '0.65rem', fontWeight: 'normal' }}>ออกระบบ</span></button>
    </nav>
);

const NavBtn = ({ icon: Icon, label, active, onClick }: any) => (
    <button onClick={onClick} className="btn border-0 d-flex flex-column align-items-center gap-1" style={{ color: active ? theme.activeBlue : theme.textGray }}>
        <Icon size={24} strokeWidth={active ? 2.5 : 2} /><span style={{ fontSize: '0.65rem', fontWeight: active ? 'bold' : 'normal' }}>{label}</span>
    </button>
);

// --- Stats Cards ---
export const StatCard = ({ title, value, icon: Icon, color, subtext }: any) => {
    const bgColors: any = { blue: "#dbeafe", orange: "#ffedd5", green: "#dcfce7", purple: "#f3e8ff" };
    const textColors: any = { blue: "#2563eb", orange: "#ea580c", green: "#16a34a", purple: "#9333ea" };
    return (
        <div className="card border-0 shadow-sm rounded-4 h-100 p-4" style={{ backgroundColor: theme.cardBg }}>
            <div className="d-flex justify-content-between align-items-start">
                <div><p className="mb-2" style={{ color: theme.textGray, fontSize: '0.9rem' }}>{title}</p><h2 className="fw-bold mb-0 text-dark">{value}</h2></div>
                <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backgroundColor: bgColors[color] }}><Icon size={24} style={{ color: textColors[color] }} /></div>
            </div>
        </div>
    );
};

export const StatCardMobile = ({ icon: Icon, value, label, bg, color }: any) => (
    <div className="card border-0 shadow-sm p-3 rounded-4 h-100 d-flex flex-row align-items-center gap-3 bg-white">
        <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px', backgroundColor: bg, color: color }}><Icon size={20} /></div>
        <div><h4 className="fw-bold m-0 lh-1 text-dark">{value}</h4><small className="text-secondary" style={{ fontSize: '0.75rem' }}>{label}</small></div>
    </div>
);

// --- Modals ---
export const ShopDetailModal = ({ shop, onClose, onDelete, onEdit }: any) => {
    if (!shop) return null;
    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }} onClick={onClose}>
            <div className="bg-white rounded-4 shadow-lg w-100 overflow-hidden d-flex flex-column animate-fade-in" style={{ maxWidth: '600px', maxHeight: '90vh' }} onClick={e => e.stopPropagation()}>
                <div className="position-relative bg-light" style={{ height: '200px' }}>
                    <img src={shop.image} alt={shop.name} className="w-100 h-100 object-fit-cover" />
                    <button onClick={onClose} className="btn btn-dark btn-sm rounded-circle position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}><X size={18} /></button>
                </div>
                <div className="p-4 overflow-auto custom-scrollbar">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                        <div><h4 className="fw-bold mb-1">{shop.name}</h4><div className="text-muted small d-flex align-items-center gap-2"><span className="badge bg-light text-dark border">{shop.category}</span><span>•</span><span>{shop.zone}</span></div></div>
                    </div>
                    <div className="d-flex align-items-center gap-2 mb-4 text-success fw-bold small bg-success bg-opacity-10 p-2 rounded-3 w-fit"><Clock size={16} /> <span>เวลาเปิด-ปิด: {shop.openHours || "ไม่ระบุ"}</span></div>
                    <div className="d-flex flex-column gap-3 mb-4">
                        <div className="p-3 bg-light rounded-3"><small className="text-secondary fw-bold mb-1 d-block"><FileText size={14} className="me-1" /> รายละเอียดร้าน</small><p className="m-0 small text-dark">{shop.description || "ไม่มีรายละเอียด"}</p></div>
                        <div className="row g-3">
                            <div className="col-6"><div className="p-3 bg-light rounded-3 h-100"><small className="text-secondary fw-bold mb-1 d-block"><User size={14} className="me-1" /> เจ้าของร้าน</small><div className="fw-medium small">{shop.owner}</div><div className="text-muted small" style={{ fontSize: '0.7rem' }}>{shop.ownerEmail}</div></div></div>
                            <div className="col-6"><div className="p-3 bg-light rounded-3 h-100"><small className="text-secondary fw-bold mb-1 d-block"><MapPin size={14} className="me-1" /> ที่ตั้ง</small><a href={shop.mapsLink} target="_blank" rel="noreferrer" className="text-primary small text-decoration-none fw-bold">เปิด Google Maps</a></div></div>
                        </div>
                    </div>
                    <div className="d-grid gap-2 d-flex justify-content-end border-top pt-3">

                        <button onClick={() => { onDelete(shop.id); onClose(); }} className="btn btn-light text-danger border flex-grow-1">ลบร้านค้า</button>
                        <button onClick={() => { onEdit(shop); onClose(); }} className="btn btn-light text-primary border flex-grow-1"><Edit size={16} /> แก้ไขข้อมูล</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const EditShopModal = ({ shop, onClose, onSave }: any) => {
    const [formData, setFormData] = useState<Shop | null>(null);

    useEffect(() => { if (shop) setFormData({ ...shop }); }, [shop]);

    if (!formData) return null;

    // Handle Text Inputs
    const handleChange = (field: keyof Shop, value: string) => {
        setFormData(prev => prev ? { ...prev, [field]: value } : null);
    };

    // Handle File Upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setFormData(prev => prev ? { ...prev, image: previewUrl } : null);
        }
    };

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2050 }} onClick={onClose}>
            <div className="bg-white rounded-4 shadow-lg w-100 overflow-hidden d-flex flex-column animate-fade-in" style={{ maxWidth: '600px', maxHeight: '90vh' }} onClick={e => e.stopPropagation()}>
                <div className="px-4 py-3 border-bottom d-flex justify-content-between align-items-center bg-light">
                    <h5 className="fw-bold m-0 d-flex align-items-center gap-2"><Edit size={20} /> แก้ไขข้อมูลร้านค้า</h5>
                    <button type="button" onClick={onClose} className="btn p-0 text-secondary hover-dark"><X size={24} /></button>
                </div>

                <div className="p-4 overflow-auto custom-scrollbar">
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-secondary">รูปภาพ (อัปโหลดไฟล์)</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white"><ImageIcon size={18} /></span>
                            <input
                                type="file"
                                className="form-control"
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={handleFileChange}
                            />
                        </div>
                        {formData.image && (
                            <div className="mt-2">
                                <img src={formData.image} alt="Preview" className="rounded-3 object-fit-cover border" style={{ width: '100px', height: '60px' }} />
                            </div>
                        )}
                    </div>

                    <div className="row g-3 mb-3">
                        <div className="col-md-6"><label className="form-label small fw-bold text-secondary">ชื่อร้าน</label><input type="text" className="form-control" value={formData.name || ""} onChange={(e) => handleChange('name', e.target.value)} /></div>
                        <div className="col-md-6"><label className="form-label small fw-bold text-secondary">เจ้าของ</label><input type="text" className="form-control bg-light" value={formData.owner || ""} disabled /></div>
                    </div>
                    <div className="row g-3 mb-3">
                        <div className="col-6">
                            <label className="form-label small fw-bold text-secondary">หมวดหมู่</label>
                            <select className="form-select" value={formData.category || ""} onChange={(e) => handleChange('category', e.target.value)}>
                                <option value="คาเฟ่">คาเฟ่</option><option value="อาหาร">อาหาร</option><option value="สุขภาพ">สุขภาพ</option><option value="บาร์">บาร์</option><option value="บริการ">บริการ</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <label className="form-label small fw-bold text-secondary">โซน</label>
                            <select className="form-select" value={formData.zone || ""} onChange={(e) => handleChange('zone', e.target.value)}>
                                <option value="กังสดาล">กังสดาล</option><option value="หลังมอ">หลังมอ</option><option value="ฝั่งบึง">ฝั่งบึง</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-3"><label className="form-label small fw-bold text-secondary">เวลาเปิด-ปิด</label><div className="input-group"><span className="input-group-text bg-white"><Clock size={18} /></span><input type="text" className="form-control" value={formData.openHours || ""} onChange={(e) => handleChange('openHours', e.target.value)} /></div></div>
                    <div className="mb-3"><label className="form-label small fw-bold text-secondary">Google Maps Link</label><div className="input-group"><span className="input-group-text bg-white"><MapPin size={18} /></span><input type="text" className="form-control" value={formData.mapsLink || ""} onChange={(e) => handleChange('mapsLink', e.target.value)} /></div></div>
                    <div className="mb-3"><label className="form-label small fw-bold text-secondary">รายละเอียดร้าน</label><textarea className="form-control" rows={3} value={formData.description || ""} onChange={(e) => handleChange('description', e.target.value)}></textarea></div>
                </div>

                <div className="p-3 border-top bg-light d-flex justify-content-end gap-2">
                    <button type="button" onClick={onClose} className="btn btn-outline-secondary">ยกเลิก</button>
                    <button type="button" onClick={() => onSave(formData)} className="btn btn-primary d-flex align-items-center gap-1"><Save size={18} /> บันทึกการแก้ไข</button>
                </div>
            </div>
        </div>
    );
};