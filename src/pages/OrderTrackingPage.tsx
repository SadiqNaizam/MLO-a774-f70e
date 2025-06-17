import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom'; // For real navigation
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import OrderProgressStepper from '@/components/OrderProgressStepper';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import MapPlaceholder from '@/components/MapPlaceholder';
import { Utensils, ShoppingCart, User, Package, CookingPot, Bike, CheckCircle, HelpCircle } from 'lucide-react';

type StepStatus = 'completed' | 'current' | 'pending';

interface OrderStep {
  name: string;
  status: StepStatus;
  timestamp?: string;
}

const initialOrderSteps: OrderStep[] = [
  { name: 'Order Confirmed', status: 'completed', timestamp: '10:30 AM, July 26' },
  { name: 'Preparing Food', status: 'current', timestamp: '10:35 AM, July 26' },
  { name: 'Out for Delivery', status: 'pending' },
  { name: 'Delivered', status: 'pending' },
];

const OrderTrackingPage = () => {
  console.log('OrderTrackingPage loaded');
  // const navigate = useNavigate();
  // const location = useLocation(); // Could pass orderId via state or query params

  // Dummy navigation function for now
  const navigate = (path: string) => {
    console.log(`Navigating to ${path}`);
    window.location.pathname = path;
  };

  const [orderSteps, setOrderSteps] = useState<OrderStep[]>(initialOrderSteps);
  const [estimatedDelivery, setEstimatedDelivery] = useState('11:15 AM - 11:30 AM');

  // Simulate order progress
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    if (orderSteps[1].status === 'current') {
      timeouts.push(setTimeout(() => {
        setOrderSteps(prev => prev.map((step, i) => 
          i === 1 ? { ...step, status: 'completed' } : 
          i === 2 ? { ...step, status: 'current', timestamp: '10:55 AM, July 26' } : step
        ));
        setEstimatedDelivery('11:20 AM - 11:35 AM');
      }, 5000)); // 5 seconds for demo
    }
    
    // If "Out for Delivery" becomes current
    if (orderSteps.find(s => s.name === 'Out for Delivery' && s.status === 'current')) {
        timeouts.push(setTimeout(() => {
            setOrderSteps(prev => prev.map((step, i) => 
              i === 2 ? { ...step, status: 'completed' } : 
              i === 3 ? { ...step, status: 'completed', timestamp: '11:25 AM, July 26' } : step // Mark as Delivered
            ));
            setEstimatedDelivery('Delivered at 11:25 AM');
      }, 7000)); // 7 more seconds
    }


    return () => timeouts.forEach(clearTimeout);
  }, [orderSteps]);

  const orderDetails = {
    orderId: '#FF123456',
    restaurantName: 'Pizza Paradise',
    items: [
      { name: 'Margherita Pizza', quantity: 1 },
      { name: 'Garlic Knots', quantity: 2 },
    ],
    totalAmount: '$23.47',
    deliveryAddress: '123 Main St, Anytown, USA',
  };

  const currentStepInfo = orderSteps.find(step => step.status === 'current');

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <NavigationMenu className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink href="/" className="flex items-center text-2xl font-bold text-primary">
                        <Utensils className="h-7 w-7 mr-2" /> FoodFleet
                    </NavigationMenuLink>
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

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Track Your Order {orderDetails.orderId}</CardTitle>
              <CardDescription>From {orderDetails.restaurantName}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <OrderProgressStepper steps={orderSteps} className="py-4 px-2 sm:px-6" />
              
              <div className="text-center">
                <p className="text-lg font-semibold">Estimated Delivery Time</p>
                <p className="text-2xl text-primary font-bold">{estimatedDelivery}</p>
                {currentStepInfo && <p className="text-sm text-muted-foreground mt-1">{currentStepInfo.name} - {currentStepInfo.timestamp}</p>}
              </div>

            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]"> {/* Fixed height for scroll */}
                  <ul className="space-y-2 text-sm">
                    {orderDetails.items.map(item => (
                      <li key={item.name} className="flex justify-between">
                        <span>{item.quantity}x {item.name}</span>
                      </li>
                    ))}
                  </ul>
                  <hr className="my-3"/>
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount:</span>
                    <span>{orderDetails.totalAmount}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Delivering to: {orderDetails.deliveryAddress}
                  </p>
                </ScrollArea>
              </CardContent>
              <CardFooter className="flex-col items-start space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <Button variant="outline" className="w-full sm:w-auto" onClick={() => console.log("View full receipt")}>
                  <Package className="mr-2 h-4 w-4" /> View Receipt
                </Button>
                 <Button variant="outline" className="w-full sm:w-auto" onClick={() => console.log("Help clicked")}>
                    <HelpCircle className="mr-2 h-4 w-4" /> Get Help
                </Button>
              </CardFooter>
            </Card>

            <MapPlaceholder 
                label="Your rider is on the way!" 
                className="aspect-square md:aspect-auto md:h-full" 
            />
          </div>
          
          <div className="mt-8 text-center">
            <Button size="lg" onClick={() => navigate('/')}>
                Order Again
            </Button>
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-8 text-center mt-auto">
        <p>&copy; {new Date().getFullYear()} FoodFleet. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default OrderTrackingPage;