import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // For real navigation
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RestaurantCard from '@/components/RestaurantCard';
import Sidebar from '@/components/Sidebar';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search, Filter, X, Utensils, ShoppingCart, User, ListFilter } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';

const allRestaurants = [
    { id: '1', name: 'Pizza Paradise', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60', cuisineTypes: ['Pizza', 'Italian'], rating: 4.5, deliveryTime: '25-35 min', priceRange: '$$', deliveryFee: 0 },
    { id: '2', name: 'Burger Bliss', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60', cuisineTypes: ['Burgers', 'American'], rating: 4.2, deliveryTime: '20-30 min', priceRange: '$$', deliveryFee: 2.99 },
    { id: '3', name: 'Sushi Central', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60', cuisineTypes: ['Sushi', 'Japanese'], rating: 4.8, deliveryTime: '30-40 min', priceRange: '$$$', deliveryFee: 5.00 },
    { id: '4', name: 'Taco Town', imageUrl: 'https://images.unsplash.com/photo-1565299715199-866c917206bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60', cuisineTypes: ['Mexican', 'Tacos'], rating: 4.3, deliveryTime: '15-25 min', priceRange: '$', deliveryFee: 1.50 },
    { id: '5', name: 'Healthy Hub', imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60', cuisineTypes: ['Healthy', 'Salads'], rating: 4.7, deliveryTime: '35-45 min', priceRange: '$$', deliveryFee: 0 },
    { id: '6', name: 'Curry Corner', imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60', cuisineTypes: ['Indian', 'Curry'], rating: 4.6, deliveryTime: '40-50 min', priceRange: '$$$', deliveryFee: 3.00 },
    { id: '7', name: 'Noodle Nirvana', imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60', cuisineTypes: ['Asian', 'Noodles'], rating: 4.1, deliveryTime: '20-30 min', priceRange: '$', deliveryFee: 2.00 },
    { id: '8', name: 'The Sweet Spot', imageUrl: 'https://images.unsplash.com/photo-1563805042-76295500e542?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60', cuisineTypes: ['Desserts', 'Bakery'], rating: 4.9, deliveryTime: '15-25 min', priceRange: '$$', deliveryFee: 0 },
];

const ITEMS_PER_PAGE = 4;

const RestaurantListingPage = () => {
  console.log('RestaurantListingPage loaded');
  // const location = useLocation(); // For real query params
  // const navigate = useNavigate(); // For real navigation
  
  // Dummy navigation and location for now
  const navigate = (path: string) => {
    console.log(`Navigating to ${path}`);
    window.location.pathname = path;
  };
  const location = { search: window.location.search };


  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    deliveryTime: false, // e.g., < 30 min
    freeDelivery: false,
    priceRange: [0, 50], // Example range for slider
    rating: null as number | null,
  });
  const [sortBy, setSortBy] = useState('rating_desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredRestaurants, setFilteredRestaurants] = useState(allRestaurants);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const initialSearch = queryParams.get('search') || queryParams.get('category') || '';
    setSearchTerm(initialSearch);
  }, [location.search]);

  useEffect(() => {
    let tempRestaurants = [...allRestaurants];

    // Filter by search term
    if (searchTerm) {
      tempRestaurants = tempRestaurants.filter(r =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.cuisineTypes.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by deliveryTime (<30 min)
    if (filters.deliveryTime) {
        tempRestaurants = tempRestaurants.filter(r => {
            const time = parseInt(r.deliveryTime.split('-')[0]);
            return time < 30;
        });
    }
    
    // Filter by free delivery
    if (filters.freeDelivery) {
        tempRestaurants = tempRestaurants.filter(r => r.deliveryFee === 0);
    }

    // Filter by rating (e.g. 4+ stars)
    if (filters.rating) {
        tempRestaurants = tempRestaurants.filter(r => r.rating >= (filters.rating || 0) );
    }

    // Sort
    tempRestaurants.sort((a, b) => {
      switch (sortBy) {
        case 'rating_desc': return b.rating - a.rating;
        case 'rating_asc': return a.rating - b.rating;
        case 'delivery_time_asc': return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
        case 'price_asc': // This needs actual price data, using priceRange length as proxy
          return a.priceRange.length - b.priceRange.length;
        default: return 0;
      }
    });
    
    setFilteredRestaurants(tempRestaurants);
    setCurrentPage(1); // Reset to first page after filtering/sorting
  }, [searchTerm, filters, sortBy]);

  const totalPages = Math.ceil(filteredRestaurants.length / ITEMS_PER_PAGE);
  const currentRestaurants = filteredRestaurants.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleRestaurantClick = (id: string | number) => {
    navigate(`/restaurant/${id}`);
  };
  
  const handleFilterChange = (filterName: keyof typeof filters, value: any) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const FilterContent = () => (
    <>
      <div className="space-y-4">
        <div>
          <h3 className="text-md font-semibold mb-2">Delivery Time</h3>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="deliveryTime" 
              checked={filters.deliveryTime} 
              onCheckedChange={(checked) => handleFilterChange('deliveryTime', checked)}
            />
            <Label htmlFor="deliveryTime" className="text-sm">Under 30 minutes</Label>
          </div>
        </div>
         <div>
          <h3 className="text-md font-semibold mb-2">Delivery Fee</h3>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="freeDelivery" 
              checked={filters.freeDelivery} 
              onCheckedChange={(checked) => handleFilterChange('freeDelivery', checked)}
            />
            <Label htmlFor="freeDelivery" className="text-sm">Free Delivery</Label>
          </div>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-2">Minimum Rating</h3>
          <RadioGroup 
            defaultValue={filters.rating?.toString()}
            onValueChange={(value) => handleFilterChange('rating', value ? parseInt(value) : null)}
          >
            {[5, 4, 3].map(r => (
              <div key={r} className="flex items-center space-x-2">
                <RadioGroupItem value={r.toString()} id={`rating-${r}`} />
                <Label htmlFor={`rating-${r}`} className="text-sm">{r}+ Stars</Label>
              </div>
            ))}
             <div className="flex items-center space-x-2">
                <RadioGroupItem value="" id="rating-any" />
                <Label htmlFor="rating-any" className="text-sm">Any</Label>
              </div>
          </RadioGroup>
        </div>
        {/* Price Range Slider - Assuming slider value can be used for price category later */}
        <div>
            <h3 className="text-md font-semibold mb-2">Price Range (Placeholder)</h3>
            <Slider
                defaultValue={[2]} // Corresponds to '$$'
                min={1} max={3} step={1}
                onValueChange={(value) => console.log("Price range slider (visual only):", value)}
                className="my-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>$</span>
                <span>$$</span>
                <span>$$$</span>
            </div>
        </div>
      </div>
      <Button className="w-full mt-6" onClick={() => console.log("Apply filters from sheet/sidebar")}>Apply Filters</Button>
    </>
  );


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
            </NavigationMenuList>
            <div className="flex-1 max-w-xl mx-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        type="search"
                        placeholder="Search restaurants..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full"
                    />
                </div>
            </div>
            <NavigationMenuList>
                <NavigationMenuItem className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon"><Filter className="h-5 w-5" /></Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <SheetHeader><SheetTitle>Filter & Sort</SheetTitle></SheetHeader>
                            <ScrollArea className="h-[calc(100vh-80px)] p-4">
                                <FilterContent/>
                            </ScrollArea>
                        </SheetContent>
                    </Sheet>
                </NavigationMenuItem>
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

      <div className="flex flex-1 container mx-auto px-4 py-8">
        <Sidebar title="Filter & Sort" className="hidden md:block">
           <FilterContent />
        </Sidebar>

        <main className="flex-grow md:pl-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              {searchTerm ? `Results for "${searchTerm}"` : 'All Restaurants'} ({filteredRestaurants.length})
            </h1>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating_desc">Rating: High to Low</SelectItem>
                <SelectItem value="rating_asc">Rating: Low to High</SelectItem>
                <SelectItem value="delivery_time_asc">Delivery: Fastest</SelectItem>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {currentRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  {...restaurant}
                  onClick={() => handleRestaurantClick(restaurant.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">No restaurants found</h2>
              <p className="text-gray-500">Try adjusting your search or filters.</p>
            </div>
          )}

          {totalPages > 1 && (
            <Pagination className="mt-12">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)); }} disabled={currentPage === 1} />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink href="#" isActive={currentPage === i + 1} onClick={(e) => { e.preventDefault(); setCurrentPage(i + 1); }}>
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {/* Basic ellipsis, could be more complex */}
                {totalPages > 5 && currentPage < totalPages - 2 && <PaginationEllipsis />} 
                <PaginationItem>
                  <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p + 1)); }} disabled={currentPage === totalPages} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </main>
      </div>
       <footer className="bg-gray-800 text-white py-8 text-center mt-auto">
        <p>&copy; {new Date().getFullYear()} FoodFleet. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RestaurantListingPage;