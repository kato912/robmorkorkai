/**
 * ProfileEditForm Component
 *
 * User profile edit form with input fields.
 * Features:
 * - Text input for user name (editable)
 * - Email field (read-only, KKU verification only)
 * - Phone number input (optional)
 * - Form validation and styling
 * - Fade-in animation on mount
 *
 * Props:
 * - profile: User profile data object
 * - setProfile: Callback to update profile state
 *
 * CSS Classes Used:
 * - profile-edit-form: Main form container
 * - profile-form-label: Label styling
 * - profile-form-input: Input field styling
 */

import React from "react";
import type { ProfileData } from "../pages/ProfilePage";
import "./css/ProfileInfoCard.css";

interface Props {
    profile: ProfileData;
    setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
}

export const ProfileEditForm: React.FC<Props> = ({ profile, setProfile }) => {
    return (
        <div className="profile-edit-form">
            {/* Form Title - "Edit Information" section header */}
            <h6 className="profile-form-title">แก้ไขข้อมูล</h6>
            
            {/* Form Fields Grid - 3 columns on lg, 2 on md, 1 on mobile */}
            <div className="profile-form-grid">
                {/* Full Name Field */}
                <div className="profile-form-field">
                    <label className="profile-form-label">ชื่อ-นามสกุล</label>
                    <input
                        type="text"
                        className="profile-form-input"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                </div>

                {/* Email Field - Read-only, KKU verification only */}
                <div className="profile-form-field">
                    <label className="profile-form-label">อีเมล KKU</label>
                    <input
                        type="email"
                        title="email"
                        className="profile-form-input"
                        value={profile.email}
                        disabled // Email cannot be changed for security
                    />
                </div>

                {/* Phone Number Field - Optional */}
                <div className="profile-form-field">
                    <label className="profile-form-label">เบอร์โทรศัพท์ (ถ้ามี)</label>
                    <input
                        type="text"
                        className="profile-form-input"
                        placeholder="08X-XXX-XXXX"
                        value={profile.phone || ""}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                </div>
            </div>
        </div>
    );
};