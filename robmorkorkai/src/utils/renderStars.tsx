// src/utils/formatters.tsx
import { Star } from "lucide-react";

export const renderStars = (rating: number, size = 14) => {
    return Array.from({ length: 5 }, (_, i) => (
        <Star
            key={i}
            size={size}
            className={i < Math.round(rating) ? "text-warning fill-warning" : "text-light-gray"}
        />
    ));
};