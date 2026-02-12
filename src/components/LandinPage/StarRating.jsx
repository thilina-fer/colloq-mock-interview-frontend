import { Star } from "lucide-react";

export default function StarRating({ rating = 5, size = 20 }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < Math.floor(rating)
              ? "fill-light-text-primary text-light-text-primary"
              : "text-light-gray-300"
          }
        />
      ))}
    </div>
  );
}
