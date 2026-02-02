import React from "react";
import { 
    Store, CheckCircle, XCircle, Clock, 
    Search, Filter, Shield, BarChart3, 
    MessageSquare, Trash2, Edit, Eye, User, LogOut 
} from "lucide-react";
import { type AdminViewProps, adminTheme as theme } from "./types";
import { StatCard } from "./AdminComponents";

export const AdminDesktop: React.FC<AdminViewProps> = ({
    activeTab, setActiveTab, filteredStores, stats,
    searchQuery, setSearchQuery, selectedCategory, setSelectedCategory,
    categories, isFilterDropdownOpen, setIsFilterDropdownOpen,
    onApprove, onReject, onDelete, onViewDetail, onEdit, logout
}) => {
    
    // Helper Component ภายใน
    const SidebarItem = ({ id, label, icon: Icon, active }: any) => (
        <button onClick={() => setActiveTab(id)} className="w-100 d-flex align-items-center gap-3 px-3 py-3 rounded-3 border-0 transition text-decoration-none mb-1"
            style={{ backgroundColor: active ? theme.activeBlue : "transparent", color: active ? "#ffffff" : theme.textGray }}>
            <Icon size={20} /> <span className={active ? "fw-bold" : "fw-medium"}>{label}</span>
        </button>
    );

    return (
        <div className="d-none d-lg-flex min-vh-100 w-100">
            {/* Sidebar */}
            <aside className="position-fixed h-100 flex-column" style={{ width: '260px', backgroundColor: theme.sidebarBg, zIndex: 1030 }}>
                <div className="p-4 mb-2"><div className="d-flex align-items-center gap-3"><div className="bg-primary rounded-3 p-2 d-flex align-items-center justify-content-center"><Shield size={24} className="text-white" /></div><div><h6 className="fw-bold text-white m-0">Admin Panel</h6><small style={{ color: theme.textGray }}>robmorkorkai</small></div></div></div>
                <nav className="px-3 flex-grow-1 d-flex flex-column gap-1">
                    <SidebarItem id="overview" label="ภาพรวม" icon={BarChart3} active={activeTab === 'overview'} />
                    <SidebarItem id="stores" label="จัดการร้านค้า" icon={Store} active={activeTab === 'stores'} />
                </nav>
                <div className="p-3 mt-auto border-top border-secondary border-opacity-25">
                    <button onClick={logout} className="btn w-100 d-flex align-items-center gap-3 px-3 py-3 rounded-3 border-0 transition text-decoration-none" style={{ color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}><LogOut size={20} /> <span className="fw-medium">ออกจากระบบ</span></button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow-1 p-5" style={{ marginLeft: '260px' }}>
                {/* Header & Search */}
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div><h3 className="fw-bold m-0 text-dark">{activeTab === 'overview' ? 'ภาพรวมระบบ' : 'จัดการร้านค้า'}</h3><p className="text-secondary m-0 small">จัดการข้อมูลทั้งหมดในระบบ</p></div>
                    <div className="d-flex gap-2 position-relative">
                        <div className="position-relative"><Search className="position-absolute text-secondary" size={18} style={{ top: '10px', left: '12px' }} /><input className="form-control ps-5 border-0 shadow-sm" placeholder="ค้นหา..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '250px', backgroundColor: 'white' }} /></div>
                        <div className="position-relative">
                            <button onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)} className={`btn shadow-sm border-0 d-flex align-items-center gap-2 px-3 ${isFilterDropdownOpen || selectedCategory !== 'all' ? 'bg-primary text-white' : 'bg-white text-secondary'}`}><Filter size={18} /> กรอง</button>
                            {isFilterDropdownOpen && <div className="position-absolute end-0 mt-2 bg-white rounded-3 shadow-lg p-3 border" style={{ width: '200px', zIndex: 1050 }}><h6 className="fw-bold small text-muted mb-2">หมวดหมู่</h6>{categories.map(cat => (<div key={cat} onClick={() => { setSelectedCategory(cat); setIsFilterDropdownOpen(false); }} className={`p-2 rounded cursor-pointer small ${selectedCategory === cat ? 'bg-primary text-white' : 'text-dark hover-bg-light'}`}>{cat === 'all' ? 'ทั้งหมด' : cat}</div>))}</div>}
                        </div>
                    </div>
                </div>

                {/* Content Logic */}
                {activeTab === 'overview' && (
                    <div className="animate-fade-in">
                        <div className="row g-4 mb-4">
                            <div className="col-3"><StatCard title="ร้านค้าทั้งหมด" value={stats.totalStores} icon={Store} color="blue" /></div>
                            <div className="col-3"><StatCard title="รอการอนุมัติ" value={stats.pendingStores} icon={Clock} color="orange" /></div>
                            <div className="col-3"><StatCard title="รีวิวทั้งหมด" value={stats.totalReviews} icon={MessageSquare} color="green" /></div>
                            <div className="col-3"><StatCard title="ผู้ใช้งาน" value={stats.totalUsers} icon={User} color="purple" /></div>
                        </div>
                        {/* Pending List Table */}
                        <div className="card border-0 shadow-sm rounded-4 h-100 p-4" style={{ backgroundColor: theme.cardBg }}>
                            <div className="d-flex justify-content-between align-items-center mb-4"><h6 className="fw-bold m-0 text-dark">ร้านค้ารอการอนุมัติ</h6><button className="btn btn-link btn-sm fw-bold" onClick={() => setActiveTab('stores')}>ดูทั้งหมด</button></div>
                            <div className="d-flex flex-column gap-3">
                                {filteredStores.filter(s => s.status === 'pending').map(store => (
                                    <div key={store.id} className="d-flex align-items-center justify-content-between p-3 rounded-3" style={{ backgroundColor: theme.bgMain }}>
                                        <div className="d-flex align-items-center gap-3"><img src={store.image} className="rounded-3 object-fit-cover" width="48" height="48" alt=""/><div><h6 className="fw-bold m-0 text-dark small">{store.name}</h6><small className="text-secondary">{store.owner}</small></div></div>
                                        <div className="d-flex gap-2">
                                            <button onClick={() => onViewDetail(store)} className="btn btn-sm btn-light rounded-circle text-primary p-1 border hover-scale"><Eye size={20}/></button>
                                            <button onClick={() => onApprove(store.id)} className="btn btn-sm btn-light rounded-circle text-success p-1 border hover-scale"><CheckCircle size={20}/></button>
                                            <button onClick={() => onReject(store.id)} className="btn btn-sm btn-light rounded-circle text-danger p-1 border hover-scale"><XCircle size={20}/></button>
                                        </div>
                                    </div>
                                ))}
                                {filteredStores.filter(s => s.status === 'pending').length === 0 && <div className="text-center text-muted py-5">ไม่มีรายการรออนุมัติ</div>}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'stores' && (
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                        <div className="table-responsive">
                            <table className="table table-hover mb-0 align-middle">
                                <thead className="bg-light"><tr><th className="px-4 py-3 text-secondary small">ร้านค้า</th><th className="px-4 py-3 text-secondary small">โซน/หมวดหมู่</th><th className="px-4 py-3 text-secondary small">สถานะ</th><th className="px-4 py-3 text-secondary small text-end">จัดการ</th></tr></thead>
                                <tbody>
                                    {filteredStores.map(store => (
                                        <tr key={store.id}>
                                            <td className="px-4"><div className="d-flex align-items-center gap-3"><img src={store.image} className="rounded-3" width="40" height="40" alt=""/><div><div className="fw-bold small">{store.name}</div><div className="text-muted small">{store.owner}</div></div></div></td>
                                            <td className="px-4"><div className="small text-dark">{store.zone}</div><div className="text-secondary small">{store.category}</div></td>
                                            <td className="px-4">{store.status === 'pending' && <span className="badge bg-warning bg-opacity-10 text-warning border border-warning fw-normal rounded-pill">รออนุมัติ</span>}{store.status === 'approved' && <span className="badge bg-success bg-opacity-10 text-success border border-success fw-normal rounded-pill">อนุมัติแล้ว</span>}{store.status === 'rejected' && <span className="badge bg-danger bg-opacity-10 text-danger border border-danger fw-normal rounded-pill">ปฏิเสธ</span>}</td>
                                            <td className="px-4 text-end">
                                                <div className="d-flex justify-content-end gap-2">
                                                    <button onClick={() => onViewDetail(store)} className="btn btn-sm btn-light border text-secondary hover-scale"><Eye size={14}/> ดู</button>
                                                    {store.status === 'pending' && <><button onClick={() => onApprove(store.id)} className="btn btn-sm btn-success text-white">อนุมัติ</button><button onClick={() => onReject(store.id)} className="btn btn-sm btn-outline-danger">ปฏิเสธ</button></>}
                                                    {store.status === 'approved' && <><button onClick={() => onEdit(store)} className="btn btn-sm btn-light border text-primary d-flex align-items-center gap-1 hover-scale"><Edit size={14}/> แก้ไข</button><button onClick={() => onDelete(store.id)} className="btn btn-sm btn-light border text-danger hover-scale"><Trash2 size={14}/></button></>}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};