import React from "react";
import type { ProfileData } from "../pages/ProfilePage";

interface Props {
    profile: ProfileData;
    setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
}

export const ProfileEditForm: React.FC<Props> = ({ profile, setProfile }) => {
    return (
        <div className="py-4 py-lg-5 animate-fade-in" style={{ borderBottom: '1px solid #3d302a' }}>
            <h6 className="text-uppercase fw-bold mb-4" style={{ fontSize: '0.7rem', letterSpacing: '2px', color: '#c9943a' }}>แก้ไขข้อมูล</h6>
            <div className="row g-4">
                <div className="col-12 col-md-6 col-lg-4">
                    <label className="fw-medium small mb-2" style={{ color: '#f5ebe4' }}>ชื่อ-นามสกุล</label>
                    <input
                        type="text"
                        className="form-control rounded-3 px-4 py-3 shadow-none"
                        style={{ backgroundColor: '#231c18', border: '1px solid #3d302a', color: '#f5ebe4' }}
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <label className="fw-medium small mb-2" style={{ color: '#f5ebe4' }}>อีเมล KKU</label>
                    <input
                        type="email"
                        title="email"
                        className="form-control rounded-3 px-4 py-3 shadow-none"
                        style={{ backgroundColor: '#1a1412', border: '1px solid #3d302a', color: '#8a7b72' }}
                        value={profile.email}
                        disabled // อีเมลแก้ไม่ได้
                    />
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <label className="fw-medium small mb-2" style={{ color: '#f5ebe4' }}>เบอร์โทรศัพท์ (ถ้ามี)</label>
                    <input
                        type="text"
                        className="form-control rounded-3 px-4 py-3 shadow-none"
                        style={{ backgroundColor: '#231c18', border: '1px solid #3d302a', color: '#f5ebe4' }}
                        placeholder="08X-XXX-XXXX"
                        value={profile.phone || ""}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                </div>
            </div>
        </div>
    );
};