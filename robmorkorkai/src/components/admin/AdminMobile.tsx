import React, { useState } from "react";
import { 
    Store, CheckCircle, XCircle, Clock, 
    Search, Filter, Menu, X, Shield, 
    BarChart3, MessageSquare, Trash2, Edit, Eye, User, LogOut 
} from "lucide-react";
import { type AdminViewProps, adminTheme as theme } from "./types";
import { StatCardMobile } from "./AdminComponents";

export const AdminMobile: React.FC<AdminViewProps> = ({
    activeTab, setActiveTab, filteredStores, stats,
    searchQuery, setSearchQuery, selectedCategory, setSelectedCategory,
    categories, onApprove, onReject, onDelete, onViewDetail, onEdit, logout
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const NavBtn = ({ icon: Icon, label, active, onClick }: any) => (
        <button onClick={onClick} className="btn border-0 d-flex flex-column align-items-center gap-1" style={{ color: active ? theme.activeBlue : theme.textGray }}>
            <Icon size={24} strokeWidth={active ? 2.5 : 2} /><span style={{ fontSize: '0.65rem', fontWeight: active ? 'bold' : 'normal' }}>{label}</span>
        </button>
    );

    return (
        <div className="d-lg-none d-flex flex-column min-vh-100 w-100">
            {/* Header */}
            <div className="px-3 py-3 d-flex justify-content-between align-items-center sticky-top shadow-sm" style={{ backgroundColor: theme.sidebarBg, zIndex: 1040, height: '60px' }}>
                <div className="d-flex align-items-center gap-2"><div className="bg-primary text-white p-1 rounded"><Shield size={18} /></div><span className="fw-bold text-white">Admin Panel</span></div>
                <button className="btn text-white p-0" onClick={() => setIsMenuOpen(true)}><Menu size={24} /></button>
            </div>

            {/* Menu Overlay */}
            {isMenuOpen && <div className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-50" style={{ zIndex: 1050 }} onClick={() => setIsMenuOpen(false)}><div className="h-100 w-75 p-4 shadow" style={{ backgroundColor: theme.sidebarBg }} onClick={e => e.stopPropagation()}><div className="d-flex justify-content-between align-items-center mb-4"><h5 className="fw-bold m-0 text-white">เมนู</h5><button className="btn p-0 text-white" onClick={() => setIsMenuOpen(false)}><X size={24} /></button></div><nav className="d-flex flex-column gap-3"><button onClick={() => { setActiveTab('overview'); setIsMenuOpen(false); }} className="btn text-start text-white"><BarChart3 size={20} className="me-2" /> ภาพรวม</button><button onClick={() => { setActiveTab('stores'); setIsMenuOpen(false); }} className="btn text-start text-white"><Store size={20} className="me-2" /> ร้านค้า</button><hr className="border-secondary" /><button onClick={logout} className="btn text-start text-danger"><LogOut size={20} className="me-2" /> ออกจากระบบ</button></nav></div></div>}

            <main className="p-3 pb-5 mb-5 flex-grow-1">
                {activeTab === 'overview' && (
                    <div className="d-flex flex-column gap-3">
                        <div className="row g-3">
                            <div className="col-6"><StatCardMobile icon={Store} value={stats.totalStores} label="ร้านค้า" bg="#dbeafe" color="#2563eb" /></div>
                            <div className="col-6"><StatCardMobile icon={Clock} value={stats.pendingStores} label="รออนุมัติ" bg="#ffedd5" color="#ea580c" /></div>
                            <div className="col-6"><StatCardMobile icon={MessageSquare} value={stats.totalReviews} label="รีวิว" bg="#dcfce7" color="#16a34a" /></div>
                            <div className="col-6"><StatCardMobile icon={User} value={stats.totalUsers} label="ผู้ใช้" bg="#f3e8ff" color="#9333ea" /></div>
                        </div>
                        <div className="card border-0 shadow-sm rounded-4 p-3 mt-2 bg-white">
                            <h6 className="fw-bold mb-3" style={{ color: theme.sidebarBg }}>ร้านค้ารอการอนุมัติ</h6>
                            <div className="d-flex flex-column gap-3">
                                {filteredStores.filter(s => s.status === 'pending').map(store => (
                                    <div key={store.id} className="d-flex align-items-center justify-content-between p-2 border-bottom">
                                        <div className="d-flex align-items-center gap-3"><img src={store.image} className="rounded-3 object-fit-cover" width="48" height="48" alt=""/><div><div className="fw-bold small text-dark">{store.name}</div><div className="small text-secondary" style={{fontSize: '0.75rem'}}>{store.owner}</div></div></div>
                                        <div className="d-flex gap-2">
                                            <button onClick={() => onViewDetail(store)} className="btn rounded-circle p-0 d-flex align-items-center justify-content-center border-0" style={{ width: '32px', height: '32px', backgroundColor: '#e2e8f0', color: '#475569' }}><Eye size={18} /></button>
                                            <button onClick={() => onApprove(store.id)} className="btn rounded-circle p-0 d-flex align-items-center justify-content-center border-0" style={{ width: '32px', height: '32px', backgroundColor: '#dcfce7', color: '#16a34a' }}><CheckCircle size={18} /></button>
                                            <button onClick={() => onReject(store.id)} className="btn rounded-circle p-0 d-flex align-items-center justify-content-center border-0" style={{ width: '32px', height: '32px', backgroundColor: '#fee2e2', color: '#ef4444' }}><X size={18} /></button>
                                        </div>
                                    </div>
                                ))}
                                {filteredStores.filter(s => s.status === 'pending').length === 0 && <div className="text-center text-muted small py-3">ไม่มีรายการรออนุมัติ</div>}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'stores' && (
                    <div className="d-flex flex-column gap-3">
                        <div className="position-relative"><Search className="position-absolute text-secondary" size={18} style={{ top: '10px', left: '12px' }} /><input className="form-control ps-5 border-0 shadow-sm" placeholder="ค้นหา..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div>
                        <div className="d-flex gap-2 overflow-auto pb-2" style={{ whiteSpace: 'nowrap' }}>{categories.map(cat => (<button key={cat} onClick={() => setSelectedCategory(cat)} className={`btn btn-sm rounded-pill px-3 border-0 ${selectedCategory === cat ? 'bg-primary text-white' : 'bg-white text-secondary shadow-sm'}`}>{cat === 'all' ? 'ทั้งหมด' : cat}</button>))}</div>
                        {filteredStores.map(store => (
                            <div key={store.id} className="card border-0 shadow-sm p-3 rounded-4 bg-white">
                                <div className="d-flex align-items-center gap-3 mb-2"><img src={store.image} className="rounded-3 object-fit-cover" width="56" height="56" alt="" /><div className="flex-grow-1"><div className="fw-bold small text-dark">{store.name}</div><div className="small text-secondary mb-1">{store.owner}</div><span className={`badge ${store.status === 'approved' ? 'bg-success' : store.status === 'pending' ? 'bg-warning' : 'bg-danger'} bg-opacity-10 text-dark border rounded-pill`} style={{ fontSize: '0.65rem' }}>{store.status}</span></div></div>
                                <div className="d-flex gap-2 mt-2 border-top pt-2">
                                    <button onClick={() => onViewDetail(store)} className="btn btn-light btn-sm text-secondary border flex-grow-1"><Eye size={16} /> ดู</button>
                                    {store.status === 'pending' && <><button onClick={() => onApprove(store.id)} className="btn btn-success btn-sm flex-grow-1 text-white">อนุมัติ</button><button onClick={() => onReject(store.id)} className="btn btn-outline-danger btn-sm flex-grow-1">ปฏิเสธ</button></>}
                                    {store.status === 'approved' && <><button onClick={() => onEdit(store)} className="btn btn-light btn-sm flex-grow-1 text-primary border"><Edit size={16} /> แก้ไข</button><button onClick={() => onDelete(store.id)} className="btn btn-light btn-sm text-secondary border"><Trash2 size={16} /></button></>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <nav className="fixed-bottom bg-white border-top shadow-lg d-flex justify-content-around py-2" style={{ zIndex: 1060 }}>
                <NavBtn icon={BarChart3} label="ภาพรวม" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                <NavBtn icon={Store} label="ร้านค้า" active={activeTab === 'stores'} onClick={() => setActiveTab('stores')} />
                <button onClick={logout} className="btn border-0 d-flex flex-column align-items-center gap-1" style={{ color: '#ef4444' }}><LogOut size={24} strokeWidth={2} /><span style={{ fontSize: '0.65rem', fontWeight: 'normal' }}>ออกระบบ</span></button>
            </nav>
        </div>
    );
};