import React, { useState } from "react";

interface ReviewerAvatarProps {
    userImage?: string;
    userName?: string;
}

/**
 * ReviewerAvatar Component
 * Displays user avatar with fallback to initial letter
 */
export const ReviewerAvatar: React.FC<ReviewerAvatarProps> = ({ userImage, userName }) => {
    const [imageLoaded, setImageLoaded] = useState(true);
    const initial = userName ? userName.charAt(0).toUpperCase() : 'U';
    
    return (
        <div 
            className="rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0" 
            style={{ 
                width: '45px', 
                height: '45px', 
                overflow: 'hidden', 
                backgroundColor: '#2d2320', 
                color: '#e8b94a', 
                border: '1px solid #3d302a', 
                fontSize: '1.1rem' 
            }}
        >
            {userImage && userImage.trim() && imageLoaded ? (
                <img 
                    src={userImage} 
                    alt={userName} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    onError={() => setImageLoaded(false)}
                />
            ) : (
                <span>{initial}</span>
            )}
        </div>
    );
};
