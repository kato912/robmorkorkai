import React from "react";
import type { ProfileData } from "../pages/ProfilePage";

interface Props {
    profile: ProfileData;
    setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
}

export const ProfileEditForm: React.FC<Props> = ({ profile, setProfile }) => {
    return (
        <div className="py-4 py-lg-5 border-bottom border-light-subtle animate-fade-in">
            <h6 className="text-uppercase fw-bold text-muted mb-4" style={{ fontSize: '0.7rem', letterSpacing: '2px' }}>แก้ไขข้อมูล</h6>
            <div className="row g-4">
                <div className="col-12 col-md-6 col-lg-4">
                    <label className="fw-medium small text-dark mb-2">ชื่อ-นามสกุล</label>
                    <input
                        type="text"
                        className="form-control bg-light border-0 rounded-3 px-4 py-3 shadow-none"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <label className="fw-medium small text-dark mb-2">อีเมล KKU</label>
                    <input
                        type="email"
                        className="form-control bg-light border-0 rounded-3 px-4 py-3 shadow-none text-muted"
                        value={profile.email}
                        disabled // สมมติว่าอีเมลแก้ไม่ได้
                    />
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <label className="fw-medium small text-dark mb-2">เบอร์โทรศัพท์ (ถ้ามี)</label>
                    <input
                        type="text"
                        className="form-control bg-light border-0 rounded-3 px-4 py-3 shadow-none"
                        placeholder="08X-XXX-XXXX"
                        value={profile.phone || ""}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                </div>
            </div>
        </div>
    );
};