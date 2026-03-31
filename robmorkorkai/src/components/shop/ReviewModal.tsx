/**
 * ReviewModal Component
 * 
 * Modal dialog for users to submit reviews (rating + comment) for a shop.
 * Features:
 * - Modal overlay with backdrop blur effect and click-to-close
 * - Slide up animation on mobile devices
 * - Shop preview (image, name, subtitle)
 * - Interactive 5-star rating selector with hover preview
 * - Textarea for review comment input
 * - User verification display (email/account info)
 * - Submit button (disabled until rating > 0 and comment is filled)
 * - Loading state during submission
 * 
 * Props:
 * - isOpen: Controls modal visibility (returns null if false)
 * - onClose: Callback to close modal
 * - onSubmit: Callback function receiving (rating: number, comment: string)
 * - shopName: Display name of the shop
 * - shopImage: Shop thumbnail image URL
 * - isSubmitting: Optional flag to show loading state during submission
 * 
 * State Management:
 * - rating: Current selected star rating (0-5)
 * - hoverRating: Star rating shown on hover (for preview)
 * - comment: User's review text input
 * 
 * CSS Classes Used:
 * - review-modal-overlay: Full-screen overlay with blur
 * - review-modal-box: Modal container with animation
 * - custom-textarea: Styled textarea input
 * - review-star-btn: Individual star button styling
 */
import React, { useState } from "react";
import { Star, X, BadgeCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./css/ReviewModal.css"; 

interface ReviewModalProps {
    isOpen: boolean; 
    onClose: () => void; 
    onSubmit: (rating: number, comment: string) => Promise<void> | void;
    shopName: string; 
    shopImage: string;
    isSubmitting?: boolean;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
    isOpen, onClose, onSubmit, shopName, shopImage, isSubmitting = false
}) => {
    // Get authenticated user from context
    const { user } = useAuth();
    
    // State for star rating (0 = not selected, 1-5 = rating value)
    const [rating, setRating] = useState(0);
    // State for hover preview of stars
    const [hoverRating, setHoverRating] = useState(0);
    // State for review comment textarea
    const [comment, setComment] = useState("");

    // Return null to unmount component when modal is closed (no DOM rendering)
    if (!isOpen) return null;

    // Handle review submission with validation
    const handleSubmit = async () => {
        // Validate form: rating selected, comment not empty, not already submitting
        if (!isSubmitting && rating > 0 && comment.trim()) {
            // Call parent callback with form data
            await onSubmit(rating, comment); 
            // Reset form after successful submission
            setRating(0); 
            setComment("");
        }
    };

    return (
        // Modal overlay - Full screen with backdrop blur. Click to close (except modal content)
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-end align-items-lg-center justify-content-center p-0 p-lg-3" style={{ zIndex: 1060, backgroundColor: 'rgba(10, 10, 10, 0.85)', backdropFilter: 'blur(4px)' }} onClick={onClose}>

            {/* Modal Container - Slide up on mobile, centered on desktop */}
            <div className="w-100 overflow-hidden shadow-lg animate-slide-up review-modal-box" style={{ maxWidth: '500px', backgroundColor: '#231c18', border: '1px solid #3d302a' }} onClick={(e) => e.stopPropagation()}>
                
                {/* Modal Header - Title and close button */}
                <div className="d-flex justify-content-between align-items-center p-4" style={{ borderBottom: '1px solid rgba(201, 148, 58, 0.2)' }}>
                    <h5 className="fw-bolder m-0" style={{ color: '#c9943a' }}>เขียนรีวิว</h5>
                    {/* Close Button - Dismisses modal when clicked */}
                    <button title="ปิด" onClick={onClose} className="btn rounded-circle p-2 d-flex align-items-center hover-scale" style={{ backgroundColor: 'rgba(201, 148, 58, 0.1)', color: '#e8b94a' }}>
                        <X size={20} />
                    </button>
                </div>

                {/* Modal Content - Form fields for review submission */}
                <div className="p-4 p-lg-5">
                    
                    {/* Shop Preview Section - Display shop thumbnail and name */}
                    <div className="d-flex align-items-center gap-3 mb-4 pb-4" style={{ borderBottom: '1px solid #3d302a' }}>
                        {/* Shop Thumbnail Image */}
                        <img src={shopImage} alt={shopName} className="rounded-4 object-fit-cover shadow-sm" style={{ width: 64, height: 64, border: '1px solid #3d302a' }} />
                        {/* Shop Name and Subtitle */}
                        <div>
                            <div className="fw-bold mb-1" style={{ fontSize: '1.1rem', color: '#f5ebe4' }}>{shopName}</div>
                            <small style={{ color: '#9a8a7e' }}>ให้คะแนนประสบการณ์ของคุณ</small>
                        </div>
                    </div>

                    {/* Star Rating Input - Interactive 5-star selector with hover preview */}
                    <div className="text-center mb-4 pb-2">
                        {/* Star Buttons - Click to set rating, hover to preview */}
                        <div className="d-flex justify-content-center gap-2 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button title={`ให้ ${star} ดาว`} key={star} onClick={() => setRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} className="btn p-0 border-0 transition-all hover-scale" type="button">
                                    <Star 
                                        size={48} 
                                        fill={star <= (hoverRating || rating) ? "#e8b94a" : "transparent"} 
                                        style={{ color: star <= (hoverRating || rating) ? "#e8b94a" : "#8a7b72", opacity: star <= (hoverRating || rating) ? 1 : 0.3 }} 
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Review Comment Input Section */}
                    <div className="mb-4">
                        {/* Label for textarea */}
                        <p className="fw-bold mb-3 small" style={{ color: '#e8ebe4' }}>เขียนรีวิวของคุณ</p>
                        {/* Textarea for review text input */}
                        <textarea
                            className="form-control custom-textarea rounded-4 p-4 shadow-none transition-all"
                            rows={4}
                            placeholder="บอกเล่าประสบการณ์ของคุณที่ร้านนี้..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            style={{ resize: 'none', fontSize: '0.95rem' }}
                        />
                    </div>

                    {/* User Verification Info - Shows who the review is posted as */}
                    <div className="d-flex align-items-center gap-3 mb-5 p-3 rounded-4 shadow-sm" style={{ backgroundColor: '#2d2320', border: '1px dashed rgba(201, 148, 58, 0.3)' }}>
                        {/* Badge Icon - Indicates verified user */}
                        <BadgeCheck size={24} style={{ color: '#e8b94a' }} />
                        {/* User Info Display */}
                        <div className="small">
                            <span style={{ color: '#9a8a7e' }}>โพสต์ในนาม </span>
                            <span className="fw-bold" style={{ color: '#f5ebe4' }}>{user?.email || "ผู้ใช้งานทั่วไป"}</span>
                        </div>
                    </div>

                    {/* Submit Button - Disabled until rating is selected and comment is filled */}
                    <button 
                        onClick={handleSubmit} 
                        disabled={isSubmitting || rating === 0 || !comment.trim()} 
                        className="btn w-100 rounded-pill py-3 fw-bold shadow-sm mb-3 transition-all hover-scale"
                        style={{ 
                            // Disabled style (gray) until form is valid
                            backgroundColor: (isSubmitting || rating === 0 || !comment.trim()) ? '#3d302a' : '#A73B24', 
                            color: (isSubmitting || rating === 0 || !comment.trim()) ? '#8a7b72' : '#fff5f0',
                            border: 'none'
                        }}
                    >
                        {/* Button text changes to show loading state */}
                        {isSubmitting ? "กำลังส่ง..." : "ส่งรีวิว"}
                    </button>
                </div>
            </div>
        </div>
    );
};