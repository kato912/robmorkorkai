// Show picture store

import React from "react"; 

interface ShopImageGalleryProps {
    image: string;
    name: string;
}

export const ShopImageGallery: React.FC<ShopImageGalleryProps> = ({ image, name }) => {
    return (
        <div className="sticky-top" style={{ top: '100px' }}>
            <img 
                src={image} 
                alt={name} 
                className="w-100 rounded-4 shadow-sm object-fit-cover mb-3" 
                style={{ height: '400px' }} 
            />
            <div className="row g-2">
                {[1, 2, 3].map((i) => (
                    <div className="col-4" key={i}>
                        <img 
                            src={image} 
                            className="w-100 rounded-3 object-fit-cover opacity-75 hover-opacity-100 cursor-pointer" 
                            style={{ height: '100px' }} 
                            alt={`thumb-${i}`} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};