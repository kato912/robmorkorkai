import React, { useState, useEffect } from "react";
import {
    Shield, BarChart3, Store, LogOut, X,
    Clock, FileText, User, MapPin, Edit, Save, Image as ImageIcon, Plus
} from "lucide-react";
import type { Shop } from "../../types/shop";
import { adminTheme } from "./types";

/**
 * AdminComponents
 * 
 * Reusable admin components including sidebar, navigation, stat cards, and modals.
 * Exports:
 * - theme: Admin theme colors and styles
 * - AdminSidebar: Desktop fixed sidebar navigation
 * - AdminMobileNav: Mobile bottom navigation bar
 * - StatCard: Large stat card for overview tab (desktop)
 * - StatCardMobile: Compact stat card for overview tab (mobile)
 * - ShopDetailModal: Modal for viewing shop details
 * - EditShopModal: Modal for editing shop information
 */

export const theme = adminTheme;

// ========== SIDEBAR & NAVIGATION ==========

/**
 * AdminSidebar
 * Desktop-only fixed sidebar with navigation and logout button.
 * Shows on large screens (d-lg-flex), with 260px fixed width.
 * Includes: Admin Panel header, navigation tabs (overview/stores), logout button
 */
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

/**
 * SidebarItem
 * Single navigation item in sidebar with active state styling
 * Shows icon and label, highlights when active
 */
const SidebarItem = ({ id, label, icon: Icon, activeTab, onClick }: any) => (
    <button onClick={() => onClick(id)} className="w-100 d-flex align-items-center gap-3 px-3 py-3 rounded-3 border-0 transition text-decoration-none mb-1"
        style={{ backgroundColor: activeTab === id ? theme.activeBlue : "transparent", color: activeTab === id ? "#ffffff" : theme.textGray }}>
        <Icon size={20} /> <span className={activeTab === id ? "fw-bold" : "fw-medium"}>{label}</span>
    </button>
);

/**
 * AdminMobileNav
 * Mobile-only bottom navigation bar (d-lg-none).
 * Shows on small screens with icon buttons for: overview, stores, logout
 * Fixed at bottom with shadow and white background
 */
export const AdminMobileNav = ({ activeTab, setActiveTab, logout }: any) => (
    <nav className="d-lg-none fixed-bottom bg-white border-top shadow-lg d-flex justify-content-around py-2" style={{ zIndex: 1060 }}>
        <NavBtn icon={BarChart3} label="ภาพรวม" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
        <NavBtn icon={Store} label="ร้านค้า" active={activeTab === 'stores'} onClick={() => setActiveTab('stores')} />
        <button onClick={logout} className="btn border-0 d-flex flex-column align-items-center gap-1" style={{ color: '#ef4444' }}><LogOut size={24} strokeWidth={2} /><span style={{ fontSize: '0.65rem', fontWeight: 'normal' }}>ออกระบบ</span></button>
    </nav>
);

/**
 * NavBtn
 * Single bottom navigation button for mobile view
 * Shows icon and label with active state styling
 */
const NavBtn = ({ icon: Icon, label, active, onClick }: any) => (
    <button onClick={onClick} className="btn border-0 d-flex flex-column align-items-center gap-1" style={{ color: active ? theme.activeBlue : theme.textGray }}>
        <Icon size={24} strokeWidth={active ? 2.5 : 2} /><span style={{ fontSize: '0.65rem', fontWeight: active ? 'bold' : 'normal' }}>{label}</span>
    </button>
);

// ========== STAT CARDS ==========

/**
 * StatCard
 * Large stat card component displaying title, number value, and icon.
 * Used in desktop overview tab to show stores, reviews, and users.
 * Props:
 * - title: Label text (e.g., "ร้านค้า")
 * - value: Numeric value to display
 * - icon: Lucide icon component
 * - color: Color scheme (blue, orange, green, purple)
 * - subtext: Optional additional text
 */
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

/**
 * StatCardMobile
 * Compact stat card for mobile overview tab.
 * Displays icon, value, and label in a horizontal layout.
 * Props:
 * - icon: Lucide icon component
 * - value: Numeric value to display
 * - label: Text label
 * - bg: Background color for icon
 * - color: Icon color
 */
export const StatCardMobile = ({ icon: Icon, value, label, bg, color }: any) => (
    <div className="card border-0 shadow-sm p-3 rounded-4 h-100 d-flex flex-row align-items-center gap-3 bg-white">
        <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px', backgroundColor: bg, color: color }}><Icon size={20} /></div>
        <div><h4 className="fw-bold m-0 lh-1 text-dark">{value}</h4><small className="text-secondary" style={{ fontSize: '0.75rem' }}>{label}</small></div>
    </div>
);

// ========== MODALS ==========

/**
 * ShopDetailModal
 * Modal component for viewing shop details.
 * Displays shop cover image, name, category, zone, owner info, operating hours, and description.
 * Includes action buttons to edit or delete the shop.
 * Props:
 * - shop: Shop object to display
 * - onClose: Callback to close modal
 * - onDelete: Callback to delete shop
 * - onEdit: Callback to edit shop
 */
export const ShopDetailModal = ({ shop, onClose, onDelete, onEdit }: any) => {
    if (!shop) return null;
    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }} onClick={onClose}>
            <div className="bg-white rounded-4 shadow-lg w-100 overflow-hidden d-flex flex-column animate-fade-in" style={{ maxWidth: '600px', maxHeight: '90vh' }} onClick={e => e.stopPropagation()}>
                <div className="position-relative bg-light flex-shrink-0" style={{ height: '200px' }}>
                    <img src={shop.coverImage || shop.image} alt={shop.name} className="w-100 h-100 object-fit-cover" />
                    <button onClick={onClose} className="btn btn-dark btn-sm rounded-circle position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}><X size={18} /></button>
                </div>
                <div className="p-4 overflow-auto flex-grow-1" style={{ minHeight: '0' }}>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                        <div><h4 className="fw-bold mb-1">{shop.name}</h4><div className="text-muted small d-flex align-items-center gap-2"><span className="badge bg-light text-dark border">{shop.category}</span><span>•</span><span>{shop.zone}</span></div></div>
                    </div>
                    <div className="d-flex align-items-center gap-2 mb-4 text-success fw-bold small bg-success bg-opacity-10 p-2 rounded-3 w-fit"><Clock size={16} /> <span>เวลาเปิด-ปิด: {shop.openHours || "ไม่ระบุ"}</span></div>
                    <div className="d-flex flex-column gap-3 mb-4">
                        <div className="p-3 bg-light rounded-3"><small className="text-secondary fw-bold mb-1 d-block"><FileText size={14} className="me-1" /> รายละเอียดร้าน</small><p className="m-0 small text-dark">{shop.description || "ไม่มีรายละเอียด"}</p></div>
                        <div className="row g-3">
                            <div className="col-6"><div className="p-3 bg-light rounded-3 h-100"><small className="text-secondary fw-bold mb-1 d-block"><User size={14} className="me-1" /> เจ้าของร้าน</small><div className="fw-medium small">{shop.owner}</div><div className="text-muted small" style={{ fontSize: '0.7rem' }}>{shop.ownerEmail}</div></div></div>
                            <div className="col-6"><div className="p-3 bg-light rounded-3 h-100"><small className="text-secondary fw-bold mb-1 d-block"><MapPin size={14} className="me-1" /> Google Maps</small>{(shop.googleMap || shop.googleMapsUrl) ? <a href={shop.googleMap || shop.googleMapsUrl} target="_blank" rel="noreferrer" className="btn btn-success btn-sm w-100 d-flex align-items-center justify-content-center gap-2">เปิดแผนที่</a> : <span className="text-muted small">ไม่มีลิงก์</span>}</div></div>
                        </div>
                    </div>
                </div>
                <div className="d-grid gap-2 d-flex justify-content-end border-top pt-3 p-4 bg-white flex-shrink-0">
                    <button onClick={() => { onDelete(shop.id); onClose(); }} className="btn btn-light text-danger border flex-grow-1">ลบร้านค้า</button>
                    <button onClick={() => { onEdit(shop); onClose(); }} className="btn btn-light text-primary border flex-grow-1"><Edit size={16} /> แก้ไขข้อมูล</button>
                </div>
            </div>
        </div>
    );
};

/**
 * EditShopModal
 * Modal for editing shop information with form inputs.
 * Allows editing: name, category, zone, cover image, operating hours, Maps link, description.
 * Cannot edit: owner (disabled for safety).
 * Props:
 * - shop: Shop object to edit
 * - onClose: Callback to close modal without saving
 * - onSave: Callback to save edited shop data
 */
export const EditShopModal = ({ shop, onClose, onSave }: any) => {
    const [formData, setFormData] = useState<Shop | null>(null);

    // Initialize form data when shop prop changes
    useEffect(() => { 
        if (shop) {
            setFormData({ 
                ...shop,
                // Map googleMapsUrl from backend to googleMap form field
                googleMap: (shop as any).googleMapsUrl || (shop as any).googleMap || ""
            }); 
        }
    }, [shop]);

    if (!formData) return null;

    // ========== FORM HANDLERS ==========

    /**
     * Update form data for text/select inputs
     * @param field - Shop field to update
     * @param value - New value for field
     */
    const handleChange = (field: string, value: string) => {
        setFormData(prev => prev ? { ...prev, [field]: value } : null);
    };

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2050 }} onClick={onClose}>
            <div className="bg-white rounded-4 shadow-lg w-100 overflow-hidden d-flex flex-column animate-fade-in" style={{ maxWidth: '600px', maxHeight: '90vh' }} onClick={e => e.stopPropagation()}>
                <div className="px-4 py-3 border-bottom d-flex justify-content-between align-items-center bg-light flex-shrink-0">
                    <h5 className="fw-bold m-0 d-flex align-items-center gap-2"><Edit size={20} /> แก้ไขข้อมูลร้านค้า</h5>
                    <button type="button" onClick={onClose} className="btn p-0 text-secondary hover-dark"><X size={24} /></button>
                </div>

                <div className="p-4 overflow-auto flex-grow-1" style={{ minHeight: '0' }}>
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-secondary">URL รูปภาพ</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white"><ImageIcon size={18} /></span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="https://example.com/image.jpg"
                                value={formData.coverImage || formData.image || ""}
                                onChange={(e) => handleChange('coverImage', e.target.value)}
                            />
                        </div>
                        {(formData.coverImage || formData.image) && (
                            <div className="mt-2">
                                <img src={formData.coverImage || formData.image} alt="Preview" className="rounded-3 object-fit-cover border" style={{ width: '100px', height: '60px' }} />
                            </div>
                        )}
                    </div>

                    <div className="row g-3 mb-3">
                        <div className="col-md-6"><label className="form-label small fw-bold text-secondary">ชื่อร้าน</label><input type="text" className="form-control" value={formData.name || ""} onChange={(e) => handleChange('name', e.target.value)} /></div>
                        <div className="col-md-6"><label className="form-label small fw-bold text-secondary">เจ้าของ</label><input type="text" className="form-control" value={formData.owner || ""} onChange={(e) => handleChange('owner', e.target.value)} /></div>
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
                                <option value="กังสดาล">กังสดาล</option><option value="หลังมอ">หลังมอ</option><option value="ฝั่งบึง">ฝั่งบึง</option><option value="ในมหาวิทยาลัย">ในมหาวิทยาลัย</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-secondary">Google Maps Link <span className="badge bg-success">แนะนำ</span></label>
                        <div className="input-group">
                            <span className="input-group-text bg-white"><MapPin size={18} /></span>
                            <input type="text" className="form-control" placeholder="https://maps.google.com/..." value={formData.googleMap || ""} onChange={(e) => handleChange('googleMap', e.target.value)} />
                        </div>
                        <small className="text-muted d-block mt-2">ลิงก์ Google Maps เป็นวิธีที่แนะนำในการระบุที่ตั้งร้าน</small>
                    </div>
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-secondary">เวลาเปิด-ปิด</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white"><Clock size={18} /></span>
                            <input title="เวลาเปิด-ปิด" type="text" className="form-control" placeholder="08:00-22:00" value={formData.openHours || ""} onChange={(e) => handleChange('openHours', e.target.value)} />
                        </div>
                    </div>
                    <div className="mb-3"><label className="form-label small fw-bold text-secondary">รายละเอียดร้าน</label><textarea className="form-control" rows={3} value={formData.description || ""} onChange={(e) => handleChange('description', e.target.value)}></textarea></div>
                </div>

                <div className="p-3 border-top bg-light d-flex justify-content-end gap-2 flex-shrink-0">
                    <button type="button" onClick={onClose} className="btn btn-outline-secondary">ยกเลิก</button>
                    <button type="button" onClick={() => onSave(formData)} className="btn btn-primary d-flex align-items-center gap-1"><Save size={18} /> บันทึกการแก้ไข</button>
                </div>
            </div>
        </div>
    );
};

/**
 * AddShopModal
 * Modal for creating a new shop with form inputs.
 * Requires: name, latitude, longitude (from backend validation)
 * Optional: category, zone, cover image, operating hours, Maps link, description.
 * Props:
 * - onClose: Callback to close modal without saving
 * - onSave: Callback to save new shop data
 */
export const AddShopModal = ({ onClose, onSave }: any) => {
    const [formData, setFormData] = useState<any>({
        name: "",
        owner: "",
        category: "คาเฟ่",
        zone: "กังสดาล",
        coverImage: "",
        openHours: "",
        googleMap: "",
        description: "",
    });

    const handleChange = (field: string, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2050 }} onClick={onClose}>
            <div className="bg-white rounded-4 shadow-lg w-100 overflow-hidden d-flex flex-column animate-fade-in" style={{ maxWidth: '600px', maxHeight: '90vh' }} onClick={e => e.stopPropagation()}>
                <div className="px-4 py-3 border-bottom d-flex justify-content-between align-items-center bg-light flex-shrink-0">
                    <h5 className="fw-bold m-0 d-flex align-items-center gap-2"><Plus size={20} /> เพิ่มร้านค้าใหม่</h5>
                    <button type="button" onClick={onClose} className="btn p-0 text-secondary hover-dark"><X size={24} /></button>
                </div>

                <div className="p-4 overflow-auto flex-grow-1" style={{ minHeight: '0' }}>
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-secondary">URL รูปภาพ</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white"><ImageIcon size={18} /></span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="https://example.com/image.jpg"
                                value={formData.coverImage || ""}
                                onChange={(e) => handleChange('coverImage', e.target.value)}
                            />
                        </div>
                        {formData.coverImage && (
                            <div className="mt-2">
                                <img src={formData.coverImage} alt="Preview" className="rounded-3 object-fit-cover border" style={{ width: '100px', height: '60px' }} />
                            </div>
                        )}
                    </div>

                    <div className="row g-3 mb-3">
                        <div className="col-md-6"><label className="form-label small fw-bold text-secondary">ชื่อร้าน *</label><input type="text" className="form-control" value={formData.name || ""} onChange={(e) => handleChange('name', e.target.value)} /></div>
                        <div className="col-md-6"><label className="form-label small fw-bold text-secondary">เจ้าของร้าน</label><input type="text" className="form-control" value={formData.owner || ""} onChange={(e) => handleChange('owner', e.target.value)} /></div>
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
                                <option value="กังสดาล">กังสดาล</option><option value="หลังมอ">หลังมอ</option><option value="ฝั่งบึง">ฝั่งบึง</option><option value="ในมหาวิทยาลัย">ในมหาวิทยาลัย</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-secondary">Google Maps Link <span className="badge bg-success">แนะนำ</span></label>
                        <div className="input-group">
                            <span className="input-group-text bg-white"><MapPin size={18} /></span>
                            <input type="text" className="form-control" placeholder="https://maps.google.com/..." value={formData.googleMap || ""} onChange={(e) => handleChange('googleMap', e.target.value)} />
                        </div>
                        <small className="text-muted d-block mt-2">ลิงก์ Google Maps เป็นวิธีที่แนะนำในการระบุที่ตั้งร้าน</small>
                    </div>
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-secondary">เวลาเปิด-ปิด</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white"><Clock size={18} /></span>
                            <input type="text" className="form-control" placeholder="08:00-22:00" value={formData.openHours || ""} onChange={(e) => handleChange('openHours', e.target.value)} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-secondary">รายละเอียดร้าน</label>
                        <textarea className="form-control" rows={3} value={formData.description || ""} onChange={(e) => handleChange('description', e.target.value)}></textarea>
                    </div>
                    <small className="text-muted">* = ข้อมูลที่จำเป็น (ชื่อร้าน) | ลิงก์ Google Maps แนะนำให้ระบุเพื่อการอ้างอิงที่ตั้งที่ดีขึ้น</small>
                </div>

                <div className="p-3 border-top bg-light d-flex justify-content-end gap-2 flex-shrink-0">
                    <button type="button" onClick={onClose} className="btn btn-outline-secondary">ยกเลิก</button>
                    <button type="button" onClick={() => onSave(formData)} className="btn btn-success d-flex align-items-center gap-1"><Plus size={18} /> เพิ่มร้านค้า</button>
                </div>
            </div>
        </div>
    );
};