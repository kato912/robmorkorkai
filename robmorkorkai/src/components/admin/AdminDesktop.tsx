import React from "react";
import { 
    Store, Search, Filter, Shield, BarChart3, 
    MessageSquare, Trash2, Edit, Eye, User, LogOut, Plus 
} from "lucide-react";
import { type AdminViewProps, adminTheme as theme } from "./types";
import { StatCard } from "./AdminComponents";
import "./css/AdminDesktop.css";

/**
 * AdminDesktop
 * 
 * Desktop-optimized admin dashboard component with fixed sidebar and responsive main content.
 * Only displays on large screens (d-lg-flex).
 * 
 * Layout:
 * - Fixed left sidebar (260px): Navigation tabs and logout button
 * - Main content area: Header with search/filter, then overview or stores tab content
 * 
 * Features:
 * - Overview tab: 3 stat cards (stores, reviews, users) + preview of recent 5 shops
 * - Stores tab: Full searchable/filterable table of all shops
 * - Search functionality (by shop name or owner)
 * - Category filter dropdown
 * - Shop actions: View detail, Edit, Delete
 * 
 * Props: AdminViewProps
 */
export const AdminDesktop: React.FC<AdminViewProps> = ({
    activeTab, setActiveTab, 
    filteredStores,
    stats, searchQuery, setSearchQuery, 
    selectedCategory, setSelectedCategory,
    categories, isFilterDropdownOpen, setIsFilterDropdownOpen,
    onDelete, onViewDetail, onEdit, onAddShop, logout
}) => {
    // ========== COMPONENTS ==========

    /**
     * SidebarItem
     * Single navigation button in sidebar with active state styling
     */
    const SidebarItem = ({ id, label, icon: Icon, active }: any) => (
        <button onClick={() => setActiveTab(id)} className="w-100 d-flex align-items-center gap-3 px-3 py-3 rounded-3 border-0 transition text-decoration-none mb-1"
            style={{ backgroundColor: active ? theme.activeBlue : "transparent", color: active ? "#ffffff" : theme.textGray }}>
            <Icon size={20} /> <span className={active ? "fw-bold" : "fw-medium"}>{label}</span>
        </button>
    );

    // ========== RENDER ==========
    return (
        <div className="admin-desktop-container">
            {/* ========== SIDEBAR ========== */}
            <aside className="admin-desktop-sidebar" style={{ backgroundColor: theme.sidebarBg }}>
                <div className="admin-desktop-sidebar-header">
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
                <nav className="admin-desktop-sidebar-nav">
                    <SidebarItem id="overview" label="ภาพรวม" icon={BarChart3} active={activeTab === 'overview'} />
                    <SidebarItem id="stores" label="จัดการร้านค้า" icon={Store} active={activeTab === 'stores'} />
                </nav>
                <div className="admin-desktop-sidebar-footer">
                    <button onClick={logout} className="btn w-100 d-flex align-items-center gap-3 px-3 py-3 rounded-3 border-0 transition text-decoration-none" style={{ color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
                        <LogOut size={20} /> <span className="fw-medium">ออกจากระบบ</span>
                    </button>
                </div>
            </aside>

            {/* ========== MAIN CONTENT ========== */}
            <main className="admin-desktop-main">
                {/* Header with Search & Filter */}
                <div className="admin-desktop-header">
                    <div>
                        <h3 className="admin-desktop-header-title">{activeTab === 'overview' ? 'ภาพรวมระบบ' : 'จัดการร้านค้า'}</h3>
                        <p className="admin-desktop-header-subtitle">จัดการข้อมูลทั้งหมดในระบบ</p>
                    </div>
                    <div className="admin-desktop-search-filter">
                        {/* Search Bar */}
                        <div className="admin-desktop-search-wrapper">
                            <Search className="admin-desktop-search-icon" size={18} />
                            <input className="form-control admin-desktop-search-input border-0 shadow-sm" placeholder="ค้นหา..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                        
                        {/* Add Shop Button */}
                        <button onClick={onAddShop} className="btn d-flex align-items-center gap-2 px-4 py-2 rounded-3 border-0 fw-medium" style={{ backgroundColor: '#16a34a', color: '#ffffff', transition: 'all 0.2s ease', boxShadow: '0 2px 8px rgba(22, 163, 74, 0.2)' }} onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(22, 163, 74, 0.4)', e.currentTarget.style.backgroundColor = '#15803d')} onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(22, 163, 74, 0.2)', e.currentTarget.style.backgroundColor = '#16a34a')}>
                            <Plus size={20} /> เพิ่มร้านค้า
                        </button>

                        {/* Filter Dropdown */}
                        <div className="position-relative">
                            <button onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)} className={`admin-desktop-filter-btn ${isFilterDropdownOpen || selectedCategory !== 'all' ? 'bg-primary text-white' : 'bg-white text-secondary'}`}>
                                <Filter size={18} /> กรอง
                            </button>
                            {isFilterDropdownOpen && (
                                <div className="admin-desktop-filter-dropdown">
                                    <h6 className="admin-desktop-filter-dropdown-title">หมวดหมู่</h6>
                                    {categories.map(cat => (
                                        <div key={cat} onClick={() => { setSelectedCategory(cat); setIsFilterDropdownOpen(false); }} className={`admin-desktop-filter-option ${selectedCategory === cat ? 'active' : 'inactive'}`}>
                                            {cat === 'all' ? 'ทั้งหมด' : cat}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ========== CONTENT: OVERVIEW TAB ========== */}
                {activeTab === 'overview' && (
                    <div className="admin-desktop-overview">
                        {/* Stat Cards Row */}
                        <div className="admin-desktop-stat-row">
                            <div className="admin-desktop-stat-col"><StatCard title="ร้านค้าทั้งหมด" value={stats.totalStores} icon={Store} color="blue" /></div>
                            <div className="admin-desktop-stat-col"><StatCard title="รีวิวทั้งหมด" value={stats.totalReviews} icon={MessageSquare} color="green" /></div>
                            <div className="admin-desktop-stat-col"><StatCard title="ผู้ใช้งาน" value={stats.totalUsers} icon={User} color="purple" /></div>
                        </div>

                        {/* Recent Shops Preview Card */}
                        <div className="admin-desktop-shops-card" style={{ backgroundColor: theme.cardBg }}>
                            <div className="admin-desktop-shops-header">
                                <h6 className="admin-desktop-shops-title">ร้านค้า</h6>
                                <button className="btn btn-link btn-sm fw-bold" onClick={() => setActiveTab('stores')}>ดูตารางแบบเต็ม</button>
                            </div>
                            <div className="admin-desktop-shops-list">
                                {filteredStores.slice(0, 5).map(shop => (
                                    <div key={shop.id} className="admin-desktop-shop-item" style={{ backgroundColor: theme.bgMain }}>
                                        <div className="admin-desktop-shop-item-info">
                                            <img src={shop.coverImage || shop.image} className="admin-desktop-shop-item-image object-fit-cover" width="48" height="48" alt=""/>
                                            <div className="admin-desktop-shop-item-details">
                                                <h6>{shop.name}</h6>
                                                <small>{shop.owner}</small>
                                            </div>
                                        </div>
                                        <div className="admin-desktop-shop-item-actions">
                                            <button onClick={() => onViewDetail(shop)} className="admin-desktop-shop-item-action-btn view" title="ดูรายละเอียด"><Eye size={20}/></button>
                                            <button onClick={() => onEdit(shop)} className="admin-desktop-shop-item-action-btn edit" title="แก้ไข"><Edit size={20}/></button>
                                            <button onClick={() => onDelete(shop.id)} className="admin-desktop-shop-item-action-btn delete" title="ลบ"><Trash2 size={20}/></button>
                                        </div>
                                    </div>
                                ))}
                                {filteredStores.length === 0 && <div className="admin-desktop-empty-state">ไม่มีร้านค้าในระบบ</div>}
                            </div>
                        </div>
                    </div>
                )}

                {/* ========== CONTENT: STORES TAB ========== */}
                {activeTab === 'stores' && (
                    <div className="admin-desktop-table-wrapper">
                        <div className="table-responsive">
                            <table className="table table-hover mb-0 align-middle admin-desktop-table">
                                <thead>
                                    <tr>
                                        <th className="admin-desktop-table-header">ร้านค้า</th>
                                        <th className="admin-desktop-table-header">โซน</th>
                                        <th className="admin-desktop-table-header">หมวดหมู่</th>
                                        <th className="admin-desktop-table-header text-end">จัดการ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStores.map(shop => (
                                        <tr key={shop.id}>
                                            <td className="px-4">
                                                <div className="admin-desktop-table-shop">
                                                    <img src={shop.coverImage || shop.image} className="admin-desktop-table-shop-image" alt=""/>
                                                    <div>
                                                        <div className="admin-desktop-table-shop-name">{shop.name}</div>
                                                        <div className="admin-desktop-table-shop-owner">{shop.owner}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4"><div className="admin-desktop-table-zone">{shop.zone}</div></td>
                                            <td className="px-4"><div className="admin-desktop-table-category">{shop.category}</div></td>
                                            <td className="admin-desktop-table-actions">
                                                <div className="admin-desktop-table-action-group">
                                                    <button onClick={() => onViewDetail(shop)} className="admin-desktop-table-action-btn view" title="ดูรายละเอียด">
                                                        <Eye size={14}/> ดู
                                                    </button>
                                                    <button onClick={() => onEdit(shop)} className="admin-desktop-table-action-btn edit" title="แก้ไข">
                                                        <Edit size={14}/> แก้ไข
                                                    </button>
                                                    <button onClick={() => onDelete(shop.id)} className="admin-desktop-table-action-btn delete" title="ลบร้านค้า">
                                                        <Trash2 size={14}/>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {filteredStores.length === 0 && (
                            <div className="d-flex align-items-center justify-content-center p-5">
                                <div className="admin-desktop-empty-state">ไม่มีร้านค้าในระบบ</div>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};