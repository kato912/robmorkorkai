import React, { useState } from "react";
import {
    Store,
    Search, Menu, X, Shield,
    BarChart3, MessageSquare, Trash2, Edit, Eye, User, LogOut, Plus
} from "lucide-react";
import { type AdminViewProps, adminTheme as theme } from "./types";
import { StatCardMobile } from "./AdminComponents";
import "./css/AdminMobile.css";

/**
 * AdminMobile
 * 
 * Mobile-optimized admin dashboard component for small screens.
 * Only displays below large screens (d-lg-none).
 * 
 * Layout:
 * - Sticky header (60px) with Admin Panel branding and hamburger menu
 * - Menu overlay sidebar with navigation and logout
 * - Main content area with two tabs: Overview and Stores
 * - Fixed bottom navigation bar for tab switching
 * 
 * Features:
 * - Overview tab: Stat cards + preview of recent shops
 * - Stores tab: Search bar + category filter + shop cards
 * - Menu overlay for hamburger navigation
 * - Bottom navigation for quick tab access
 * - Responsive grid layout for stat cards
 * 
 * Props: AdminViewProps
 */
export const AdminMobile: React.FC<AdminViewProps> = ({
    activeTab, setActiveTab, filteredStores, stats,
    searchQuery, setSearchQuery, selectedCategory, setSelectedCategory,
    categories, onDelete, onViewDetail, onEdit, onAddShop, logout
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // ========== COMPONENTS ==========

    /**
     * NavBtn
     * Single bottom navigation button with active state styling
     */
    const NavBtn = ({ icon: Icon, label, active, onClick }: any) => (
        <button onClick={onClick} className="admin-mobile-nav-btn" style={{ color: active ? theme.activeBlue : theme.textGray }}>
            <Icon size={24} strokeWidth={active ? 2.5 : 2} />
            <span className={`admin-mobile-nav-btn-label ${active ? 'active' : ''}`}>{label}</span>
        </button>
    );

    // ========== RENDER ==========
    return (
        <div className="admin-mobile-container">
            {/* ========== HEADER ========== */}
            <div className="admin-mobile-header" style={{ backgroundColor: theme.sidebarBg }}>
                <div className="admin-mobile-header-brand">
                    <div className="admin-mobile-header-brand-icon">
                        <Shield size={18} />
                    </div>
                    <span className="admin-mobile-header-brand-text">Admin Panel</span>
                </div>
                <button className="admin-mobile-header-menu-btn" onClick={() => setIsMenuOpen(true)}>
                    <Menu size={24} />
                </button>
            </div>

            {/* ========== MENU OVERLAY ========== */}
            {isMenuOpen && (
                <div className="admin-mobile-menu-overlay" onClick={() => setIsMenuOpen(false)}>
                    <div className="admin-mobile-menu-sidebar" style={{ backgroundColor: theme.sidebarBg }} onClick={e => e.stopPropagation()}>
                        <div className="admin-mobile-menu-header">
                            <h5 className="admin-mobile-menu-title">เมนู</h5>
                            <button className="admin-mobile-menu-close-btn" onClick={() => setIsMenuOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <nav className="admin-mobile-menu-nav">
                            <button onClick={() => { setActiveTab('overview'); setIsMenuOpen(false); }} className="admin-mobile-menu-nav-btn">
                                <BarChart3 size={20} className="admin-mobile-menu-nav-btn-icon" /> ภาพรวม
                            </button>
                            <button onClick={() => { setActiveTab('stores'); setIsMenuOpen(false); }} className="admin-mobile-menu-nav-btn">
                                <Store size={20} className="admin-mobile-menu-nav-btn-icon" /> ร้านค้า
                            </button>
                            <hr className="admin-mobile-menu-divider" />
                            <button onClick={logout} className="admin-mobile-menu-logout-btn">
                                <LogOut size={20} className="admin-mobile-menu-nav-btn-icon" /> ออกจากระบบ
                            </button>
                        </nav>
                    </div>
                </div>
            )}

            {/* ========== MAIN CONTENT ========== */}
            <main className="admin-mobile-main">
                {/* ========== OVERVIEW TAB ========== */}
                {activeTab === 'overview' && (
                    <div className="admin-mobile-overview">
                        {/* Stat Cards */}
                        <div className="admin-mobile-stat-grid">
                            <div>
                                <StatCardMobile icon={Store} value={stats.totalStores} label="ร้านค้าทั้งหมด" bg="#dbeafe" color="#2563eb" />
                            </div>
                        </div>
                        <div className="admin-mobile-stat-grid two-column">
                            <div>
                                <StatCardMobile icon={MessageSquare} value={stats.totalReviews} label="รีวิวทั้งหมด" bg="#dcfce7" color="#16a34a" />
                            </div>
                            <div>
                                <StatCardMobile icon={User} value={stats.totalUsers} label="ผู้ใช้งาน" bg="#f3e8ff" color="#9333ea" />
                            </div>
                        </div>

                        {/* Recent Shops Card */}
                        <div className="admin-mobile-shops-card">
                            <h6 className="admin-mobile-shops-card-title" style={{ color: theme.sidebarBg }}>ร้านค้า</h6>
                            <div className="admin-mobile-shops-list">
                                {filteredStores.slice(0, 5).map(store => (
                                    <div key={store.id} className="admin-mobile-shop-item">
                                        <div className="admin-mobile-shop-item-info">
                                            <img src={store.coverImage || store.image} className="admin-mobile-shop-item-image object-fit-cover" width="48" height="48" alt="" />
                                            <div>
                                                <div className="admin-mobile-shop-item-name">{store.name}</div>
                                                <div className="admin-mobile-shop-item-owner">{store.owner}</div>
                                            </div>
                                        </div>
                                        <div className="admin-mobile-shop-item-actions">
                                            <button onClick={() => onViewDetail(store)} className="admin-mobile-shop-item-action-btn view" title="ดูรายละเอียด">
                                                <Eye size={18} />
                                            </button>
                                            <button onClick={() => onEdit(store)} className="admin-mobile-shop-item-action-btn edit" title="แก้ไข">
                                                <Edit size={18} />
                                            </button>
                                            <button onClick={() => onDelete(store.id)} className="admin-mobile-shop-item-action-btn delete" title="ลบ">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ========== STORES TAB ========== */}
                {activeTab === 'stores' && (
                    <div className="admin-mobile-stores">
                        {/* Header with Search and Add Button */}
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                            <div className="admin-mobile-search-wrapper" style={{ flex: 1 }}>
                                <Search className="admin-mobile-search-icon" size={18} />
                                <input className="form-control admin-mobile-search-input" placeholder="ค้นหา..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            </div>
                            <button onClick={onAddShop} className="btn btn-success" style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', padding: '8px 16px' }}>
                                <Plus size={18} /> เพิ่ม
                            </button>
                        </div>

                        {/* Category Filter */}
                        <div className="admin-mobile-category-filter">
                            {categories.map(cat => (
                                <button 
                                    key={cat} 
                                    onClick={() => setSelectedCategory(cat)} 
                                    className={`admin-mobile-category-btn ${selectedCategory === cat ? 'active' : 'inactive'}`}
                                >
                                    {cat === 'all' ? 'ทั้งหมด' : cat}
                                </button>
                            ))}
                        </div>

                        {/* Store Cards */}
                        {filteredStores.map(store => (
                            <div key={store.id} className="admin-mobile-store-card">
                                <div className="admin-mobile-store-card-header">
                                    <img src={store.coverImage || store.image} className="admin-mobile-store-card-image object-fit-cover" width="56" height="56" alt="" />
                                    <div className="admin-mobile-store-card-info">
                                        <div className="admin-mobile-store-card-name">{store.name}</div>
                                        <div className="admin-mobile-store-card-owner">{store.owner}</div>
                                    </div>
                                </div>
                                <div className="admin-mobile-store-card-actions">
                                    <button onClick={() => onViewDetail(store)} className="admin-mobile-store-card-action-btn view" title="ดูรายละเอียด">
                                        <Eye size={16} /> ดู
                                    </button>
                                    <button onClick={() => onEdit(store)} className="admin-mobile-store-card-action-btn edit" title="แก้ไข">
                                        <Edit size={16} /> แก้ไข
                                    </button>
                                    <button onClick={() => onDelete(store.id)} className="admin-mobile-store-card-action-btn delete" title="ลบร้านค้า">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* ========== BOTTOM NAVIGATION ========== */}
            {/* Floating Action Button for Add Shop */}
            <button 
                onClick={onAddShop}
                className="admin-mobile-fab"
                style={{
                    position: 'fixed',
                    bottom: '90px',
                    right: '16px',
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#16a34a',
                    color: '#ffffff',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(22, 163, 74, 0.4)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 99
                }}
                title="เพิ่มร้านค้า"
            >
                <Plus size={28} strokeWidth={2.5} />
            </button>

            <nav className="admin-mobile-bottom-nav">
                <NavBtn icon={BarChart3} label="ภาพรวม" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                <NavBtn icon={Store} label="ร้านค้า" active={activeTab === 'stores'} onClick={() => setActiveTab('stores')} />
                <button onClick={logout} className="admin-mobile-nav-logout-btn">
                    <LogOut size={24} strokeWidth={2} />
                    <span className="admin-mobile-nav-logout-btn-label">ออกระบบ</span>
                </button>
            </nav>
        </div>
    );
};