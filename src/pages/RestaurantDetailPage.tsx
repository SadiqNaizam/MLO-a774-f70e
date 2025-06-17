import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom'; // For real navigation
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import MenuItemCard from '@/components/MenuItemCard';
import QuantitySelector from '@/components/QuantitySelector';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Utensils, Star, Clock, MapPin, ShoppingCart, User, ChevronRight, Check, X } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast"; // Assuming sonner might be aliased or useToast is for shadcn native toasts

// Dummy data - replace with actual data fetching
const restaurantData = {
  id: '1',
  name: 'Pizza Paradise',
  bannerUrl: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=400',
  logoUrl: 'https://img.icons8.com/fluent/96/000000/pizza-place.png',
  rating: 4.5,
  reviewsCount: 250,
  address: '123 Pizza St, Flavor Town',
  openingHours: '11:00 AM - 10:00 PM',
  cuisineTypes: ['Pizza', 'Italian', 'Fast Food'],
  menu: {
    'Appetizers': [
      { id: 'm1', name: 'Garlic Knots', description: 'Warm, buttery garlic knots served with marinara sauce.', price: 6.99, imageUrl: 'https://images.unsplash.com/photo-1627308594079-a3aa95083083?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60', customizations: { rice: null, extras: [{id: 'ex1', name: 'Extra Marinara', price: 0.50}] } },
      { id: 'm2', name: 'Caprese Salad', description: 'Fresh mozzarella, tomatoes, basil, with a balsamic glaze.', price: 8.50, imageUrl: 'https://images.unsplash.com/photo-1570197571440-df170ce1e371?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60', customizations: { rice: null, extras: [] } },
    ],
    'Pizzas': [
      { id: 'm3', name: 'Margherita Pizza', description: 'Classic cheese and tomato pizza with fresh basil.', price: 12.99, imageUrl: 'https://images.unsplash.com/photo-1593504049358-7433075514a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60', customizations: { rice: null, extras: [{id: 'ex2', name: 'Extra Cheese', price: 2.00}, {id: 'ex3', name: 'Mushrooms', price: 1.50}]} },
      { id: 'm4', name: 'Pepperoni Pizza', description: 'Loaded with spicy pepperoni and mozzarella cheese.', price: 14.50, imageUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60', customizations: { rice: null, extras: [{id: 'ex4', name: 'Olives', price: 1.00}]} },
    ],
    'Drinks': [
      { id: 'm5', name: 'Cola', description: 'Chilled cola.', price: 2.50, imageUrl: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60', customizations: { rice: null, extras: [] } },
    ]
  }
};

type MenuItemType = typeof restaurantData.menu.Appetizers[0];

const RestaurantDetailPage = () => {
  console.log('RestaurantDetailPage loaded');
  // const { restaurantId } = useParams(); // For real params
  // const navigate = useNavigate(); // For real navigation
  const { toast } = useToast();


  // Dummy navigation function for now
  const navigate = (path: string) => {
    console.log(`Navigating to ${path}`);
    // In a real app, use react-router-dom's useNavigate hook
    window.location.pathname = path;
  };


  const [isCustomizationDialogOpen, setIsCustomizationDialogOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemType | null>(null);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState<{ rice?: string; extras: string[] }>({ extras: [] });


  const handleAddItem = (menuItemId: string | number) => {
    // Find item in menu (simplified)
    let item: MenuItemType | null = null;
    for (const category in restaurantData.menu) {
        const found = (restaurantData.menu as any)[category].find((i: MenuItemType) => i.id === menuItemId);
        if (found) {
            item = found;
            break;
        }
    }

    if (item) {
        if (item.customizations && (item.customizations.rice || item.customizations.extras.length > 0)) {
            setSelectedMenuItem(item);
            setItemQuantity(1);
            setSelectedCustomizations({ extras: [] }); // Reset
            setIsCustomizationDialogOpen(true);
        } else {
            // Add directly to cart
            console.log(`Adding ${item.name} (x1) to cart with no customizations.`);
            toast({ title: "Item Added", description: `${item.name} (x1) has been added to your cart.`});
        }
    }
  };

  const handleCustomizationSubmit = () => {
    if (!selectedMenuItem) return;
    console.log(`Adding ${selectedMenuItem.name} (x${itemQuantity}) to cart with customizations:`, selectedCustomizations);
    toast({ title: "Item Added to Cart", description: `${selectedMenuItem.name} (x${itemQuantity}) added.` });
    setIsCustomizationDialogOpen(false);
  };
  
  const restaurantId = '1'; // Placeholder for dynamic ID

  if (!restaurantData || restaurantData.id !== restaurantId) {
    // In a real app, you'd fetch data or show a loading/error state
    return <div>Loading restaurant data or restaurant not found...</div>;
  }


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <NavigationMenu className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink href="/" className="flex items-center text-2xl font-bold text-primary">
                        <Utensils className="h-7 w-7 mr-2" /> FoodFleet
                    </NavigationMenuLink>
                </NavigationMenuItem>
                 <NavigationMenuItem>
                    <NavigationMenuLink href="/restaurants" className={navigationMenuTriggerStyle()}>Restaurants</NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Button variant="ghost" size="icon" onClick={() => navigate('/cart')}>
                        <ShoppingCart className="h-6 w-6" />
                    </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                     <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}> {/* Placeholder for profile */}
                        <User className="h-6 w-6" />
                    </Button>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
      </header>

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href="/restaurants">Restaurants</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>{restaurantData.name}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <section aria-labelledby="restaurant-hero" className="relative">
          <AspectRatio ratio={16 / 5} className="bg-muted">
            <img src={restaurantData.bannerUrl} alt={`${restaurantData.name} banner`} className="object-cover w-full h-full" />
          </AspectRatio>
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-12 sm:-mt-16 relative z-10">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-white shadow-lg">
                <AvatarImage src={restaurantData.logoUrl} alt={`${restaurantData.name} logo`} />
                <AvatarFallback>{restaurantData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="mt-4 sm:ml-6 sm:mb-2">
                <h1 id="restaurant-hero" className="text-3xl sm:text-4xl font-bold text-gray-800">{restaurantData.name}</h1>
                <div className="flex items-center space-x-3 text-sm text-gray-600 mt-1">
                  <div className="flex items-center"><Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" /> {restaurantData.rating} ({restaurantData.reviewsCount} reviews)</div>
                  <span>•</span>
                  <div>{restaurantData.cuisineTypes.join(', ')}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <section aria-labelledby="menu-section">
                        <h2 id="menu-section" className="text-2xl font-semibold text-gray-700 mb-4">Menu</h2>
                        <Accordion type="multiple" defaultValue={Object.keys(restaurantData.menu).slice(0,1)} className="w-full">
                        {Object.entries(restaurantData.menu).map(([category, items]) => (
                            <AccordionItem value={category} key={category}>
                            <AccordionTrigger className="text-xl font-medium">{category}</AccordionTrigger>
                            <AccordionContent>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                                {items.map((item) => (
                                    <MenuItemCard
                                    key={item.id}
                                    {...item}
                                    onAdd={() => handleAddItem(item.id)}
                                    />
                                ))}
                                </div>
                            </AccordionContent>
                            </AccordionItem>
                        ))}
                        </Accordion>
                    </section>
                </div>

                <aside className="md:col-span-1 space-y-6 sticky top-24 self-start">
                    <section aria-labelledby="restaurant-info-section" className="bg-white p-6 rounded-lg shadow">
                        <h3 id="restaurant-info-section" className="text-lg font-semibold text-gray-700 mb-3">Restaurant Info</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-primary" /> {restaurantData.address}</p>
                            <p className="flex items-center"><Clock className="w-4 h-4 mr-2 text-primary" /> {restaurantData.openingHours}</p>
                        </div>
                         <div className="mt-4">
                            {restaurantData.cuisineTypes.map(cuisine => (
                                <Badge key={cuisine} variant="secondary" className="mr-1 mb-1">{cuisine}</Badge>
                            ))}
                        </div>
                    </section>
                    {/* Could add a mini-cart summary here */}
                </aside>
            </div>
        </div>
      </main>

      {selectedMenuItem && (
        <Dialog open={isCustomizationDialogOpen} onOpenChange={setIsCustomizationDialogOpen}>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle>Customize {selectedMenuItem.name}</DialogTitle>
              <DialogDescription>
                Make it just the way you like it. Base Price: ${selectedMenuItem.price.toFixed(2)}
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] p-1">
                <div className="space-y-4 py-4">
                {selectedMenuItem.customizations?.rice && (
                    <div>
                        <Label className="text-md font-medium">Rice Option</Label>
                        <RadioGroup 
                            defaultValue={selectedCustomizations.rice}
                            onValueChange={(value) => setSelectedCustomizations(prev => ({...prev, rice: value}))} 
                            className="mt-2"
                        >
                            {selectedMenuItem.customizations.rice.options.map((opt: {id: string, name: string, price_diff: number}) => (
                                <div key={opt.id} className="flex items-center space-x-2">
                                    <RadioGroupItem value={opt.id} id={`rice-${opt.id}`} />
                                    <Label htmlFor={`rice-${opt.id}`}>{opt.name} {opt.price_diff > 0 ? `(+$${opt.price_diff.toFixed(2)})` : ''}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                )}
                {selectedMenuItem.customizations?.extras && selectedMenuItem.customizations.extras.length > 0 && (
                    <div>
                        <Label className="text-md font-medium">Extras</Label>
                        {selectedMenuItem.customizations.extras.map((extra: {id: string, name: string, price: number}) => (
                            <div key={extra.id} className="flex items-center space-x-2 mt-2">
                                <Checkbox 
                                    id={`extra-${extra.id}`}
                                    checked={selectedCustomizations.extras.includes(extra.id)}
                                    onCheckedChange={(checked) => {
                                        setSelectedCustomizations(prev => ({
                                            ...prev,
                                            extras: checked ? [...prev.extras, extra.id] : prev.extras.filter(eId => eId !== extra.id)
                                        }));
                                    }}
                                />
                                <Label htmlFor={`extra-${extra.id}`}>{extra.name} (+${extra.price.toFixed(2)})</Label>
                            </div>
                        ))}
                    </div>
                )}
                <div>
                    <Label htmlFor="quantity" className="text-md font-medium">Quantity</Label>
                    <QuantitySelector
                        quantity={itemQuantity}
                        onIncrease={() => setItemQuantity(q => q + 1)}
                        onDecrease={() => setItemQuantity(q => Math.max(1, q - 1))}
                        className="mt-2"
                    />
                </div>
                </div>
            </ScrollArea>
            <DialogFooter className="sm:justify-between">
                <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                {/* Calculate total price of customized item here */}
                <Button type="button" onClick={handleCustomizationSubmit}>
                    Add to Cart (Total: {/* Placeholder for dynamic total */}${(selectedMenuItem.price * itemQuantity).toFixed(2)})
                </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
       <footer className="bg-gray-800 text-white py-8 text-center mt-auto">
        <p>&copy; {new Date().getFullYear()} FoodFleet. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RestaurantDetailPage;