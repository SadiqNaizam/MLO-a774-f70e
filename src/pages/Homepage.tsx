import React, { useState } from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CuisineCategoryChip from '@/components/CuisineCategoryChip';
import RestaurantCard from '@/components/RestaurantCard';
import { Search, Utensils, Pizza, Salad, ShoppingCart, User } from 'lucide-react';

const Homepage = () => {
  console.log('Homepage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const cuisineCategories = [
    { name: 'Pizza', imageUrl: 'https://img.icons8.com/fluent/48/000000/pizza.png' },
    { name: 'Burgers', imageUrl: 'https://img.icons8.com/fluent/48/000000/hamburger.png' },
    { name: 'Sushi', imageUrl: 'https://img.icons8.com/fluent/48/000000/sushi.png' },
    { name: 'Italian', imageUrl: 'https://img.icons8.com/fluent/48/000000/spaghetti.png' },
    { name: 'Healthy', imageUrl: 'https://img.icons8.com/fluent/48/000000/natural-food.png' },
    { name: 'Nearby', imageUrl: 'https://img.icons8.com/fluent/48/000000/place-marker.png' },
  ];

  const featuredRestaurants = [
    { id: '1', name: 'Pizza Paradise', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', cuisineTypes: ['Pizza', 'Italian'], rating: 4.5, deliveryTime: '25-35 min', priceRange: '$$' },
    { id: '2', name: 'Burger Bliss', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', cuisineTypes: ['Burgers', 'American'], rating: 4.2, deliveryTime: '20-30 min', priceRange: '$$' },
    { id: '3', name: 'Sushi Central', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', cuisineTypes: ['Sushi', 'Japanese'], rating: 4.8, deliveryTime: '30-40 min', priceRange: '$$$' },
    { id: '4', name: 'Pasta Place', imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', cuisineTypes: ['Italian', 'Pasta'], rating: 4.6, deliveryTime: '25-35 min', priceRange: '$$' },
  ];

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    // Navigate to restaurant listing page with search term
    // navigate(`/restaurants?search=${searchTerm}`);
  };

  const handleCategoryClick = (categoryName: string) => {
    console.log('Category clicked:', categoryName);
    setActiveCategory(categoryName);
    // Navigate to restaurant listing page with category
    // navigate(`/restaurants?category=${categoryName}`);
  };

  const handleRestaurantClick = (id: string | number) => {
    console.log('Restaurant clicked:', id);
    // Navigate to restaurant detail page
    // navigate(`/restaurant/${id}`);
  };
  
  // Dummy navigation function for now
  const navigate = (path: string) => {
    console.log(`Navigating to ${path}`);
    // In a real app, use react-router-dom's useNavigate hook
    window.location.pathname = path;
  };


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
                 {/* Search bar in header is common on many food apps */}
            </div>
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

      <main className="flex-grow container mx-auto px-4 py-8">
        <section aria-labelledby="welcome-search-section" className="mb-12 text-center">
          <h1 id="welcome-search-section" className="text-4xl font-bold text-gray-800 mb-4">
            What are you craving?
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Order food from your favorite local restaurants.
          </p>
          <div className="max-w-2xl mx-auto flex items-center">
            <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                    type="search"
                    placeholder="Search restaurants or cuisines (e.g., Pizza, Momos)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10 pr-16 py-3 h-12 text-base"
                    aria-label="Search restaurants or cuisines"
                />
            </div>
            <Button onClick={handleSearch} className="ml-2 h-12" aria-label="Search">
                Search
            </Button>
          </div>
        </section>

        <section aria-labelledby="cuisine-categories-section" className="mb-12">
          <h2 id="cuisine-categories-section" className="text-2xl font-semibold text-gray-700 mb-4">
            Explore Categories
          </h2>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-3 pb-4">
              {cuisineCategories.map((category) => (
                <CuisineCategoryChip
                  key={category.name}
                  categoryName={category.name}
                  imageUrl={category.imageUrl}
                  isActive={activeCategory === category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className="flex-shrink-0"
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        <section aria-labelledby="featured-restaurants-section" className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 id="featured-restaurants-section" className="text-2xl font-semibold text-gray-700">
              Featured Restaurants
            </h2>
            <Button variant="link" onClick={() => navigate('/restaurants')}>View All</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                {...restaurant}
                onClick={() => handleRestaurantClick(restaurant.id)}
              />
            ))}
          </div>
        </section>
        
        <section aria-labelledby="promotions-section" className="mb-12 bg-gradient-to-r from-primary to-orange-500 text-white p-8 rounded-lg shadow-lg">
            <h2 id="promotions-section" className="text-3xl font-bold mb-3">Special Offer!</h2>
            <p className="text-lg mb-4">Get 20% off your first order. Use code: <span className="font-semibold">NEW20</span></p>
            <Button variant="secondary" size="lg" onClick={() => console.log("Explore offers")}>
                Explore Offers
            </Button>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 text-center">
        <p>&copy; {new Date().getFullYear()} FoodFleet. All rights reserved.</p>
        <p className="text-sm text-gray-400">Your favorite food, delivered fast.</p>
      </footer>
    </div>
  );
};

export default Homepage;