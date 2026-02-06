import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

// Export Interfaces เพื่อให้ไฟล์อื่นเรียกใช้ Type ได้ถ้าจำเป็น
export interface Option {
    value: string;
    label: string;
}

interface CustomDropdownProps {
    label: string;
    value: string;
    onChange: (val: string) => void;
    options: Option[];
    icon?: any;
    placeholder?: string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({ 
    label, 
    value, 
    onChange, 
    options, 
    icon: Icon, 
    placeholder = "เลือก..." 
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // ปิดเมนูเมื่อคลิกข้างนอก
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const selectedLabel = options.find(opt => opt.value === value)?.label;

    return (
        <div className="mb-0 position-relative" ref={wrapperRef}>
            <label className="form-label fw-bold small text-secondary">
                {Icon && <Icon size={16} className="me-1 mb-1" />} {label}
            </label>
            
            {/* Input Box */}
            <div 
                onClick={() => setIsOpen(!isOpen)}
                className={`form-control form-control-lg rounded-3 fs-6 bg-white d-flex align-items-center justify-content-between cursor-pointer border ${isOpen ? 'border-primary shadow-sm' : ''}`}
                style={{ cursor: 'pointer' }}
            >
                <span className={value ? "text-dark" : "text-secondary"}>
                    {selectedLabel || placeholder}
                </span>
                <ChevronDown size={20} className={`text-secondary opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''}`} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.2s' }} />
            </div>

            {/* Dropdown Menu (Black Theme + Scroll Fix) */}
            {isOpen && (
                <div 
                    className="position-absolute w-100 rounded-3 shadow-lg fade-in" 
                    style={{ 
                        backgroundColor: '#333', // Theme สีดำ
                        top: '100%',     
                        marginTop: '4px',
                        zIndex: 1050, 
                        maxHeight: '250px',        
                        overflowY: 'auto',         
                        overscrollBehavior: 'contain', // ล็อก scroll ไม่ให้ทะลุ
                        WebkitOverflowScrolling: 'touch' 
                    }}
                >
                    {options.map((opt, index) => (
                        <div
                            key={`${opt.value}-${index}`}
                            onClick={() => {
                                onChange(opt.value);
                                setIsOpen(false);
                            }}
                            className="px-3 py-3 border-bottom border-secondary d-flex align-items-center justify-content-between"
                            style={{ 
                                cursor: 'pointer', 
                                backgroundColor: value === opt.value ? '#444' : 'transparent', 
                                borderColor: '#444' 
                            }}
                        >
                            <span className="text-white small">{opt.label}</span>
                            {value === opt.value && <Check size={16} className="text-success" />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};