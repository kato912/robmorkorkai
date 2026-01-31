import React from "react";
import { Camera, User, Mail, Phone, Edit2, LogOut } from "lucide-react";
import type { ProfileData } from "../pages/ProfilePage";

interface Props {
    profile: ProfileData;
    setProfile: (profile: ProfileData) => void;
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
    onLogout: () => void;
}

export const ProfileInfoCard: React.FC<Props> = ({
    profile,
    setProfile,
    isEditing,
    setIsEditing,
    onLogout
}) => {
    const renderField = (label: string, value: string, field: keyof ProfileData, icon: React.ReactNode) => (
        <div className="mb-3">
            <label className="text-secondary small mb-1 ms-1">{label}</label>
            {isEditing ? (
                <input
                    type="text"
                    className="form-control rounded-3"
                    value={value}
                    onChange={(e) => setProfile({ ...profile, [field]: e.target.value })}
                />
            ) : (
                <div className="d-flex align-items-center gap-3 py-2 px-3 bg-light rounded-3 text-dark border-0">
                    <span className="text-secondary opacity-50">{icon}</span>
                    <span className="fw-medium">{value}</span>
                </div>
            )}
        </div>
    );

    return (
        <div className="card border-0 shadow-sm rounded-4 p-4 position-relative bg-white shadow-hover">
            <div className="text-center mb-4 mt-2">
                <div className="position-relative d-inline-block mb-3">
                    <img
                        src={profile.imageUrl}
                        alt="Profile"
                        className="rounded-circle shadow-sm border border-4 border-white"
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                    <button className="btn btn-primary btn-sm rounded-circle position-absolute bottom-0 end-0 p-2 border border-2 border-white shadow-sm">
                        <Camera size={14} />
                    </button>
                </div>

                <h5 className="fw-bold text-dark m-0 mb-2">{profile.name}</h5>
                <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-1 fw-medium">
                    KKU Verified
                </span>
            </div>

            <div className="d-flex flex-column gap-1">
                <div className="d-flex justify-content-end mb-1">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="btn btn-link text-decoration-none p-0 text-primary small fw-bold"
                        style={{ fontSize: '0.8rem' }}
                    >
                        {isEditing ? 'บันทึกข้อมูล' : 'แก้ไขโปรไฟล์'}
                    </button>
                </div>

                {renderField("ชื่อ-นามสกุล", profile.name, "name", <User size={18} />)}
                {renderField("อีเมล KKU", profile.email, "email", <Mail size={18} />)}
                {renderField("เบอร์โทรศัพท์", profile.phone, "phone", <Phone size={18} />)}

                <div className="mb-4">
                    <label className="text-secondary small mb-1 ms-1">รหัสนักศึกษา</label>
                    <div className="d-flex align-items-center gap-3 py-2 px-3 bg-light rounded-3 text-dark border-0">
                        <span className="text-secondary opacity-50 small fw-bold">ID</span>
                        <span className="fw-medium">{profile.studentId}</span>
                    </div>
                </div>

                {isEditing && (
                    <button onClick={() => setIsEditing(false)} className="btn btn-primary w-100 py-2 mb-3 rounded-pill shadow-sm fw-bold">
                        <Edit2 size={16} className="me-2" /> บันทึกการเปลี่ยนแปลง
                    </button>
                )}

                <button onClick={onLogout} className="btn btn-outline-danger w-100 py-2 d-flex align-items-center justify-content-center gap-2 rounded-pill fw-bold border-2">
                    <LogOut size={16} /> ออกจากระบบ
                </button>
            </div>
        </div>
    );
};