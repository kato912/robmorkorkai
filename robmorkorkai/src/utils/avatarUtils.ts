/**
 * สร้าง Avatar SVG สีตามตัวอักษรแรก
 * @param name - ชื่อผู้ใช้
 * @param email - อีเมล
 * @returns Avatar SVG data URL
 */
export const getInitialAvatar = (name?: string | null, email?: string | null): string => {
    const text = (name || email || "U").charAt(0).toUpperCase();
    const colors = ["#E8B94A", "#A73B24", "#C9943A", "#698891", "#7B6D4A"];
    const color = colors[text.charCodeAt(0) % colors.length];
    
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect width='32' height='32' fill='${encodeURIComponent(color)}'/%3E%3Ctext x='16' y='20' font-size='16' font-weight='bold' fill='%23231c18' text-anchor='middle' font-family='Arial'%3E${text}%3C/text%3E%3C/svg%3E`;
};

/**
 * สร้าง Avatar SVG สีตามตัวอักษรแรก (ขนาดใหญ่)
 * @param name - ชื่อผู้ใช้
 * @param email - อีเมล
 * @param size - ขนาด (default: 120)
 * @returns Avatar SVG data URL
 */
export const getInitialAvatarLarge = (name?: string | null, email?: string | null, size: number = 120): string => {
    const text = (name || email || "U").charAt(0).toUpperCase();
    const colors = ["#E8B94A", "#A73B24", "#C9943A", "#698891", "#7B6D4A"];
    const color = colors[text.charCodeAt(0) % colors.length];
    const fontSize = Math.round(size * 0.5);
    const yPos = Math.round(size * 0.65);
    
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'%3E%3Crect width='${size}' height='${size}' fill='${encodeURIComponent(color)}'/%3E%3Ctext x='${size / 2}' y='${yPos}' font-size='${fontSize}' font-weight='bold' fill='%23231c18' text-anchor='middle' font-family='Arial'%3E${text}%3C/text%3E%3C/svg%3E`;
};
