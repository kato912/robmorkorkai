import React from "react";

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
            className={isMobile ? "d-flex gap-2 overflow-auto pb-2" : "d-flex flex-column gap-2"}
            style={isMobile ? { 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                paddingRight: '16px'
            } : {}}
        >
            {/* --- ปุ่ม "ทั้งหมด" (All) --- */}
            <button
                onClick={() => setSelectedZone(null)}
                className={`btn border px-3 text-nowrap d-flex align-items-center justify-content-center ${
                    isMobile ? 'rounded-pill' : 'text-start w-100 py-2 rounded-3'
                } ${selectedZone === null
                        ? "btn-dark text-white border-dark shadow-sm" 
                        : "btn-white bg-white text-secondary border-light-subtle"
                    }`}
                style={{ height: isMobile ? '38px' : 'auto', fontSize: '14px' }}
            >
                <span className="fw-bold">ทั้งหมด</span>
                {!isMobile && <small className="ms-2 opacity-50 fw-normal">(All Zones)</small>}
            </button>

            {/* --- ปุ่มโซนต่างๆ --- */}
            {safeZones.map((zone) => (
                <button
                    key={zone.id}
                    onClick={() => setSelectedZone(zone.id)}
                    className={`btn border px-3 text-nowrap d-flex align-items-center justify-content-center ${
                        isMobile ? 'rounded-pill' : 'text-start w-100 py-2 rounded-3'
                    } ${selectedZone === zone.id
                            ? "btn-primary text-white border-primary shadow-sm"
                            : "btn-white bg-white text-secondary border-light-subtle"
                        }`}
                    style={{ height: isMobile ? '38px' : 'auto', fontSize: '14px' }}
                >
                    <span className="fw-medium">{zone.label}</span>
                    {!isMobile && (
                        <small className={`ms-2 fw-normal ${selectedZone === zone.id ? 'text-white-50' : 'text-muted opacity-50'}`}>
                            ({zone.labelEn})
                        </small>
                    )}
                </button>
            ))}
        </div>
    );
};