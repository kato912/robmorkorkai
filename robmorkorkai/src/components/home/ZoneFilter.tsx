import React from "react";

interface Props {
    zones: any[];
    selectedZone: string | null;
    setSelectedZone: (id: string | null) => void;
    isMobile?: boolean;
}

export const ZoneFilter: React.FC<Props> = ({ zones, selectedZone, setSelectedZone, isMobile }) => {
    return (
        <div
            className={isMobile ? "d-flex gap-2 overflow-auto pb-2" : "d-flex flex-column gap-2"}
            style={isMobile ? { scrollbarWidth: 'none' } : {}}
        >
            {/* --- ปุ่ม "ทั้งหมด" (All) --- */}
            <button
                onClick={() => setSelectedZone(null)}
                className={`btn text-nowrap ${isMobile ? 'rounded-pill px-3 btn-sm' : 'text-start py-2'} ${selectedZone === null
                        ? "btn-dark shadow-sm border-0" // เลือกแล้วสีเข้ม
                        : "btn-light bg-white border text-secondary"
                    }`}
            >
                <span className="fw-medium">ทั้งหมด</span>
                {!isMobile && <small className="ms-2 opacity-50">(All Zones)</small>}
            </button>

            {/* --- ปุ่มโซนต่างๆ --- */}
            {zones.map((zone) => (
                <button
                    key={zone.id}
                    onClick={() => setSelectedZone(zone.id)}
                    className={`btn text-nowrap position-relative overflow-hidden ${isMobile ? 'rounded-pill px-3 btn-sm' : 'text-start py-2'
                        } ${selectedZone === zone.id
                            ? "btn-primary shadow-sm"
                            : "btn-light bg-white border text-secondary"
                        }`}
                >
                    <span className="fw-medium">{zone.label}</span>
                    {!isMobile && (
                        <small className={`ms-2 ${selectedZone === zone.id ? 'text-white-50' : 'text-muted opacity-50'}`}>
                            ({zone.labelEn})
                        </small>
                    )}
                </button>
            ))}
        </div>
    );
};