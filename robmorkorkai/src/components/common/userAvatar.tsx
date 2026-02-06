// user avartar
import React from "react";
import { User } from "lucide-react";

interface UserAvatarProps {
    image?: string | null;
    size?: number;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ image, size = 45 }) => {
    if (image) {
        return (
            <img
                src={image}
                alt="User"
                referrerPolicy="no-referrer"
                className="rounded-circle border object-fit-cover bg-white"
                style={{ width: size, height: size, minWidth: size }}
            />
        );
    }
    return (
        <div className="bg-light rounded-circle d-flex align-items-center justify-content-center border"
            style={{ width: size, height: size, minWidth: size }}>
            <User size={size * 0.5} className="text-secondary" />
        </div>
    );
};