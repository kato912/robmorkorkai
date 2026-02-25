import React from "react";
import { MapPin } from "lucide-react"; 

interface Props {
    zones: any[];
    selectedZone: string | null;
    setSelectedZone: (id: string | null) => void;
    isMobile?: boolean;
}

export const ZoneFilter: React.FC<Props> = ({ zones = [], selectedZone, setSelectedZone, isMobile }) => {
    const safeZones = zones || [];

    return (
        <div
            className={isMobile ? "d-flex gap-2 overflow-auto pb-2 px-1" : "d-flex flex-column gap-2"}
            style={isMobile ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : {}}
        >
            <button
                onClick={() => setSelectedZone(null)}
                className={`btn px-4 text-nowrap d-flex align-items-center justify-content-center shadow-sm ${
                    isMobile ? 'rounded-pill' : 'text-start w-100 py-3 rounded-4'
                }`}
                style={{
                    height: isMobile ? '38px' : 'auto', 
                    fontSize: '14px',
                    border: selectedZone === null ? 'none' : '1px solid #3d302a',
                    backgroundColor: selectedZone === null ? '#A73B24' : '#2d2320', 
                    color: selectedZone === null ? '#fff5f0' : '#f5ebe4', 
                    fontWeight: selectedZone === null ? 'bold' : 'normal'
                }}
            >
                <span>ทั้งหมด</span>
            </button>

            {/* --- ปุ่มโซนต่างๆ --- */}
            {safeZones.map((zone) => (
                <button
                    key={zone.id}
                    onClick={() => setSelectedZone(zone.id)}
                    className={`btn px-4 text-nowrap d-flex align-items-center justify-content-center shadow-sm ${
                        isMobile ? 'rounded-pill' : 'text-start w-100 py-3 rounded-4 d-flex justify-content-between'
                    }`}
                    style={{
                        height: isMobile ? '38px' : 'auto', 
                        fontSize: '14px',
                        border: selectedZone === zone.id ? 'none' : '1px solid #3d302a',
                        backgroundColor: selectedZone === zone.id ? '#A73B24' : '#2d2320',
                        color: selectedZone === zone.id ? '#fff5f0' : '#f5ebe4',
                        fontWeight: selectedZone === zone.id ? 'bold' : 'normal'
                    }}
                >
                    <div className="d-flex align-items-center gap-2">
                        <MapPin size={16} style={{ color: selectedZone === zone.id ? '#fff5f0' : '#8a7b72' }} />
                        <span>{zone.label.replace('📍', '').trim()}</span>
                    </div>
                    
                    {!isMobile && (
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: selectedZone === zone.id ? '#fff5f0' : '#8a7b72' }}>
                            {zone.count || '0'}
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
};