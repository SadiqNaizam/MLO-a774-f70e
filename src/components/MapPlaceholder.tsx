import React from 'react';
import { MapPin } from 'lucide-react'; // Example icon
import { cn } from '@/lib/utils';

interface MapPlaceholderProps {
  label?: string;
  className?: string;
}

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({
  label = "Live map coming soon...",
  className,
}) => {
  console.log("Rendering MapPlaceholder");

  return (
    <div
      className={cn(
        "w-full aspect-video bg-muted rounded-md flex flex-col items-center justify-center text-muted-foreground p-4",
        className
      )}
    >
      <MapPin className="w-12 h-12 mb-4 text-gray-400" />
      <p className="text-sm font-medium">{label}</p>
      <p className="text-xs text-gray-500 mt-1">
        (This is a placeholder for map integration)
      </p>
    </div>
  );
};

export default MapPlaceholder;