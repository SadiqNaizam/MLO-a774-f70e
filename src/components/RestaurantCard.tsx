import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, DollarSign } from 'lucide-react'; // Example icons

interface RestaurantCardProps {
  id: string | number;
  name: string;
  imageUrl: string;
  cuisineTypes: string[]; // e.g., ["Italian", "Pizza"]
  rating: number; // e.g., 4.5
  deliveryTime: string; // e.g., "20-30 min"
  priceRange: string; // e.g., "$$"
  onClick: (id: string | number) => void;
  className?: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  cuisineTypes,
  rating,
  deliveryTime,
  priceRange,
  onClick,
  className,
}) => {
  console.log(`Rendering RestaurantCard: ${name}`);

  return (
    <Card
      className={`w-full max-w-sm overflow-hidden transition-all hover:shadow-lg cursor-pointer ${className}`}
      onClick={() => onClick(id)}
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onClick(id)}
    >
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={16 / 9}>
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
        {/* You could add a badge for "Featured" or "New" here, absolutely positioned */}
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <CardTitle className="text-lg font-semibold truncate">{name}</CardTitle>
        <p className="text-sm text-muted-foreground truncate">
          {cuisineTypes.join(', ')}
        </p>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
            <span>{rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{deliveryTime}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>{priceRange}</span>
          </div>
        </div>
      </CardContent>
      {/* CardFooter can be used for actions if any, e.g., quick view button */}
      {/* <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full">View Menu</Button>
      </CardFooter> */}
    </Card>
  );
};

export default RestaurantCard;