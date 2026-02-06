import React from "react";
import { Share2 } from "lucide-react";

interface ShareButtonProps {
    title: string;      // ชื่อร้าน หรือหัวข้อที่จะแชร์
    text?: string;      // ข้อความเพิ่มเติม (Optional)
    url?: string;    
    className?: string; 
    iconSize?: number;  
    style?: React.CSSProperties; 
}

export const ShareButton: React.FC<ShareButtonProps> = ({ 
    title, 
    text, 
    url, 
    className = "btn btn-light rounded-circle p-2 shadow-sm", // Default Style ตามหน้า Mobile
    iconSize = 20,
    style
}) => {
    
    const handleShare = async () => {
        const shareUrl = url || window.location.href;
        const shareData = {
            title: title,
            text: text || `แนะนำร้าน ${title} น่าไปมาก! ดูรีวิวได้ที่นี่:`,
            url: shareUrl,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                // User กด Cancel หรือ Error อื่นๆ ไม่ต้องทำอะไร
                console.log("Share cancelled or failed", err);
            }
        } else {
            // Fallback: Copy Link
            try {
                await navigator.clipboard.writeText(shareUrl);
                alert("คัดลอกลิงก์เรียบร้อยแล้ว! 📋");
            } catch (err) {
                console.error("Copy failed", err);
                alert("ไม่สามารถแชร์ได้ในขณะนี้");
            }
        }
    };

    return (
        <button 
            onClick={handleShare}
            className={className}
            style={{ opacity: 0.9 }}
            title="แชร์"
        >
            <Share2 size={iconSize} />
        </button>
    );
};