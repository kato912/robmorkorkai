import React from "react";
import { Camera, User, Mail, Phone, Edit2, LogOut } from "lucide-react";
import type { ProfileData } from "../pages/ProfilePage";

interface Props {
    profile: ProfileData;
    setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
    isEditing: boolean;
    setIsEditing: (value: boolean) => void;
    onLogout: () => void;
}

export const ProfileInfoCard: React.FC<Props> = ({ 
    profile, 
    setProfile, 
    isEditing, 
    setIsEditing, 
    onLogout 
}) => {
    const cameraBtnStyle: React.CSSProperties = {
        width: '36px',   // กำหนดกว้าง
        height: '36px',  // กำหนดสูงเท่ากัน
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        borderRadius: '50%', // ทำเป็นวงกลม
        position: 'absolute',
        bottom: '0',
        right: '0',
        border: '3px solid white', // ขอบขาวตัดกับรูป
        backgroundColor: '#0d6efd', // สีน้ำเงิน (Primary)
        color: 'white',
        cursor: 'pointer',
        zIndex: 10
    };

    return (
        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white position-sticky" style={{ top: "100px" }}>
            <div className="d-flex flex-column align-items-center mb-4">
                {/* Profile Image */}
                <div className="position-relative mb-3">
                    <img
                        src={profile.imageUrl}
                        alt="Profile"
                        referrerPolicy="no-referrer"
                        className="rounded-circle border border-4 border-white shadow"
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                    <button className="btn btn-primary btn-sm rounded-circle position-absolute bottom-0 end-0 p-2 shadow-sm border border-white" style={cameraBtnStyle}>
                        <Camera size={14} />
                    </button>
                </div>

                <h5 className="fw-bold text-dark mb-1">{profile.name}</h5>

                {/* Badges */}
                <div className="d-flex gap-2 mt-1">
                    {profile.isVerifiedStudent && (
                        <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-1">
                            ✓ KKU Student
                        </span>
                    )}
                    <span className="badge bg-light text-secondary border rounded-pill px-3 py-1">
                        {profile.role}
                    </span>
                </div>
            </div>

            {/* Forms */}
            <div className="d-flex flex-column gap-3">
                {/* Name */}
                <div>
                    <label className="small text-muted mb-1">ชื่อ-นามสกุล</label>
                    {isEditing ? (
                        <input
                            type="text"
                            className="form-control bg-light border-0"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        />
                    ) : (
                        <div className="d-flex align-items-center gap-2 p-2 bg-light rounded-3 text-dark">
                            <User size={16} className="text-muted" />
                            <span>{profile.name}</span>
                        </div>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="small text-muted mb-1">อีเมล</label>
                    <div className="d-flex align-items-center gap-2 p-2 bg-light rounded-3 text-dark">
                        <Mail size={16} className="text-muted" />
                        <span className="text-truncate">{profile.email}</span>
                    </div>
                </div>

                {/* Phone */}
                <div>
                    <label className="small text-muted mb-1">เบอร์โทรศัพท์</label>
                    {isEditing ? (
                        <input
                            type="text"
                            className="form-control bg-light border-0"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        />
                    ) : (
                        <div className="d-flex align-items-center gap-2 p-2 bg-light rounded-3 text-dark">
                            <Phone size={16} className="text-muted" />
                            <span>{profile.phone}</span>
                        </div>
                    )}
                </div>

                <hr className="text-muted opacity-25 my-1" />

                {/* Buttons */}
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`btn w-100 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2 ${isEditing ? 'btn-primary shadow' : 'btn-outline-primary'}`}
                >
                    <Edit2 size={16} />
                    {isEditing ? "บันทึกข้อมูล" : "แก้ไขโปรไฟล์"}
                </button>

                <button
                    onClick={onLogout}
                    className="btn btn-light w-100 rounded-pill text-danger fw-bold d-flex align-items-center justify-content-center gap-2"
                >
                    <LogOut size={16} /> ออกจากระบบ
                </button>
            </div>
        </div>
    );
};