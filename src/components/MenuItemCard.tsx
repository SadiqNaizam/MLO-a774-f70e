import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';

interface MenuItemCardProps {
  id: string | number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  onAdd: (id: string | number) => void; // Callback when "Add" button is clicked
  className?: string;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  onAdd,
  className,
}) => {
  console.log(`Rendering MenuItemCard: ${name}`);

  const handleAddClick = () => {
    console.log(`Add to cart clicked for MenuItem: ${name}, ID: ${id}`);
    onAdd(id);
  };

  return (
    <Card className={`flex flex-col md:flex-row overflow-hidden transition-all hover:shadow-md ${className}`}>
      <div className="md:w-1/3">
        <AspectRatio ratio={1} className="md:h-full"> {/* Square aspect ratio for image */}
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
      </div>
      <div className="flex flex-col justify-between p-4 md:w-2/3">
        <div>
          <CardTitle className="text-lg mb-1">{name}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {description}
          </CardDescription>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-semibold text-primary">
            ${price.toFixed(2)}
          </span>
          <Button size="sm" onClick={handleAddClick}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MenuItemCard;