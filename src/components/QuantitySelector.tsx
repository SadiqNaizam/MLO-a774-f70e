import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  className?: string;
  disabled?: boolean;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  className,
  disabled = false,
}) => {
  console.log(`Rendering QuantitySelector: Quantity ${quantity}`);

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={onDecrease}
        disabled={disabled || quantity <= min}
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="text" // Using text to display, but not for user input
        value={quantity}
        readOnly
        disabled={disabled}
        className="h-8 w-10 text-center focus-visible:ring-0 focus-visible:ring-offset-0 border-0 shadow-none bg-transparent"
        aria-label="Current quantity"
      />
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={onIncrease}
        disabled={disabled || quantity >= max}
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default QuantitySelector;