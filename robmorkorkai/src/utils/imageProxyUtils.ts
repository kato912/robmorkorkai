/**
 * Image Proxy Utility
 * ใช้ backend proxy เพื่อหลีกเลี่ยง Google Image Rate Limit (429)
 */

const API_BASE = import.meta.env.VITE_API_URL;

export const getProxyImageUrl = (url: string | null | undefined): string | null => {
    if (!url) return null;
    // ถ้าเป็น data URI หรือ relative URL ให้ใช้ตรงๆ
    if (url.startsWith('data:') || url.startsWith('/')) {
        return url;
    }
    // ถ้าเป็น external URL ให้ proxy ผ่าน backend
    return `${API_BASE}/api/images/proxy?url=${encodeURIComponent(url)}`;
};
