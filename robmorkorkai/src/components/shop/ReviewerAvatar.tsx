import React, { useState } from "react";
import { getProxyImageUrl } from "../../utils/imageProxyUtils";
import { getInitialAvatar } from "../../utils/avatarUtils";

interface ReviewerAvatarProps {
    userImage?: string;
    userName?: string;
}

/**
 * ReviewerAvatar Component
 * Displays user avatar with fallback to initial letter
 * Uses image proxy to avoid Google rate limiting (429 errors)
 */
export const ReviewerAvatar: React.FC<ReviewerAvatarProps> = ({ userImage, userName }) => {
    const [imageLoaded, setImageLoaded] = useState(!!userImage && userImage.trim() !== '');
    const proxyImageUrl = getProxyImageUrl(userImage);
    const fallbackAvatar = getInitialAvatar(userName || 'User', '', 45);
    
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
                    src={proxyImageUrl || fallbackAvatar}
                    alt={userName}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    onError={() => setImageLoaded(false)}
                />
            ) : (
                <img 
                    src={fallbackAvatar}
                    alt={userName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            )}
        </div>
    );
};
