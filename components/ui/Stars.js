import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/** Row of gold stars. */
export default function Stars({ count = 5, size = 16, className }) {
  return (
    <div className={cn("inline-flex items-center gap-0.5", className)} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={size} className="fill-gold text-gold" strokeWidth={0} />
      ))}
    </div>
  );
}
