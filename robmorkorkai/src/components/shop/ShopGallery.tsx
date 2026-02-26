import React from "react";
import { ArrowUpRight, X } from "lucide-react";

interface ShopGalleryProps {
    displayImages: string[];
    activeImageIndex: number;
    setActiveImageIndex: (idx: number) => void;
    isGalleryOpen: boolean;
    setIsGalleryOpen: (val: boolean) => void;
}

export const ShopGallery: React.FC<ShopGalleryProps> = ({
    displayImages, activeImageIndex, setActiveImageIndex, isGalleryOpen, setIsGalleryOpen
}) => {
    return (
        <>
            {/* Desktop Gallery Strip */}
            <section className="d-none d-lg-block" style={{ backgroundColor: '#231c18', borderBottom: '1px solid rgba(201, 148, 58, 0.2)' }}>
                <div className="container-fluid py-4 mx-auto" style={{ maxWidth: '1250px' }}>
                    <div className="d-flex gap-3 overflow-hidden px-3 px-lg-0">
                        {displayImages.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => { setActiveImageIndex(idx); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                                className="btn p-0 flex-shrink-0 rounded-4 overflow-hidden position-relative gallery-thumb shadow-sm"
                                style={{ 
                                    width: '260px', 
                                    height: '140px', 
                                    border: activeImageIndex === idx ? '3px solid #e8b94a' : '3px solid transparent', 
                                    opacity: activeImageIndex === idx ? 1 : 0.5 
                                }}
                            >
                                <img src={img} className="w-100 h-100 object-fit-cover" alt={`Gallery ${idx}`} />
                            </button>
                        ))}
                        
                        <button 
                            onClick={() => setIsGalleryOpen(true)} 
                            className="btn rounded-4 d-flex flex-column align-items-center justify-content-center flex-shrink-0 transition-all hover-scale" 
                            style={{ 
                                width: '140px', height: '140px', 
                                backgroundColor: '#2d2320', 
                                color: '#c9943a', 
                                border: '1px dashed rgba(201, 148, 58, 0.4)' 
                            }}
                        >
                            <span className="fw-bold small mb-1">ดูทั้งหมด</span>
                            <ArrowUpRight size={20} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Full Gallery Modal */}
            {isGalleryOpen && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-4" style={{ zIndex: 1060, backgroundColor: 'rgba(26, 20, 18, 0.98)' }}>
                    
                    <button 
                        onClick={() => setIsGalleryOpen(false)} 
                        className="btn btn-link position-absolute top-0 end-0 m-4 p-2 rounded-circle hover-scale"
                        style={{ color: '#e8b94a', backgroundColor: 'rgba(201, 148, 58, 0.1)' }}
                    >
                        <X size={24} />
                    </button>
                    
                    <div className="container" style={{ maxWidth: '900px' }}>
                        <div className="row g-3">
                            {displayImages.map((img, idx) => (
                                <div className="col-6" key={idx}>
                                    <button 
                                        onClick={() => { setActiveImageIndex(idx); setIsGalleryOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
                                        className="btn p-0 w-100 overflow-hidden rounded-4" 
                                        style={{ 
                                            aspectRatio: '16/9', 
                                            border: activeImageIndex === idx ? '3px solid #e8b94a' : '3px solid transparent' 
                                        }}
                                    >
                                        <img src={img} className="w-100 h-100 object-fit-cover transition-all hover-scale" alt={`Gallery ${idx}`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};