import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge'; // Using Badge as a base or inspiration

interface CuisineCategoryChipProps {
  categoryName: string;
  imageUrl?: string; // Optional image/icon for the chip
  isActive?: boolean;
  onClick: () => void;
  className?: string;
}

const CuisineCategoryChip: React.FC<CuisineCategoryChipProps> = ({
  categoryName,
  imageUrl,
  isActive,
  onClick,
  className,
}) => {
  console.log(`Rendering CuisineCategoryChip: ${categoryName}, Active: ${isActive}`);

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-3 m-1 rounded-lg border-2 transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary",
        isActive ? "border-primary bg-primary/10 shadow-md" : "border-border bg-card hover:border-primary/50",
        "w-24 h-24 text-center", // Example fixed size, adjust as needed
        className
      )}
      aria-pressed={isActive}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={categoryName}
          className="w-10 h-10 object-contain mb-1 rounded-full"
          onError={(e) => {
            // Fallback if image fails to load, e.g., hide or show placeholder
            (e.currentTarget as HTMLImageElement).style.display = 'none';
            // You could add a placeholder div or icon here
          }}
        />
      )}
      <span className={cn("text-xs font-medium truncate w-full", isActive ? "text-primary-foreground" : "text-card-foreground")}>
        {categoryName}
      </span>
    </button>
  );
};

export default CuisineCategoryChip;