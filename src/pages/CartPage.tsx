import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // For real navigation
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import QuantitySelector from '@/components/QuantitySelector';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Utensils, ShoppingCart, User, Trash2, Tag } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  restaurantName: string;
}

const initialCartItems: CartItem[] = [
  { id: 'm3', name: 'Margherita Pizza', price: 12.99, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1593504049358-7433075514a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60', restaurantName: 'Pizza Paradise' },
  { id: 'm1', name: 'Garlic Knots', price: 6.99, quantity: 2, imageUrl: 'https://images.unsplash.com/photo-1627308594079-a3aa95083083?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60', restaurantName: 'Pizza Paradise' },
  { id: 'sushi1', name: 'Spicy Tuna Roll', price: 8.00, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60', restaurantName: 'Sushi Central'},
];

const CartPage = () => {
  console.log('CartPage loaded');
  // const navigate = useNavigate(); // For real navigation
  const { toast } = useToast();
  
  // Dummy navigation function for now
  const navigate = (path: string) => {
    console.log(`Navigating to ${path}`);
    window.location.pathname = path;
  };

  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ).filter(item => item.quantity > 0) // Remove if quantity is 0
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    toast({ title: "Item Removed", description: "The item has been removed from your cart."});
  };

  const handleApplyPromoCode = () => {
    if (promoCode.toUpperCase() === 'NEW20') {
      setDiscount(0.20); // 20% discount
      toast({ title: "Promo Applied!", description: "20% discount has been applied."});
    } else {
      setDiscount(0);
      toast({ title: "Invalid Promo Code", variant: "destructive" });
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cartItems.length > 0 ? 3.50 : 0; // Example flat delivery fee
  const taxes = subtotal * 0.08; // Example 8% tax
  const totalDiscount = subtotal * discount;
  const total = subtotal + deliveryFee + taxes - totalDiscount;

  const handleCheckout = () => {
    console.log('Proceeding to checkout with items:', cartItems, 'Total:', total);
    // This would typically navigate to a checkout page or start a payment flow
    toast({ title: "Order Placed (Simulation)", description: "Redirecting to order tracking..."});
    navigate('/order-tracking'); // Navigate to order tracking page after "checkout"
  };

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
                {/* <NavigationMenuItem>
                    <Button variant="ghost" size="icon" onClick={() => navigate('/cart')}>
                        <ShoppingCart className="h-6 w-6" />
                    </Button>
                </NavigationMenuItem> */}
                <NavigationMenuItem>
                     <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}> {/* Placeholder for profile */}
                        <User className="h-6 w-6" />
                    </Button>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Button onClick={() => navigate('/')}>Start Shopping</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                    <CardTitle>Order Items ({cartItems.length})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[calc(100vh-400px)] md:h-auto md:max-h-[60vh]"> {/* Adjust height as needed */}
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px] hidden sm:table-cell">Image</TableHead>
                          <TableHead>Item</TableHead>
                          <TableHead className="text-center">Quantity</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                          <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cartItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="hidden sm:table-cell">
                              <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                            </TableCell>
                            <TableCell>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-xs text-muted-foreground">{item.restaurantName}</p>
                            </TableCell>
                            <TableCell className="text-center">
                              <QuantitySelector
                                quantity={item.quantity}
                                onIncrease={() => handleQuantityChange(item.id, item.quantity + 1)}
                                onDecrease={() => handleQuantityChange(item.id, item.quantity - 1)}
                              />
                            </TableCell>
                            <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                            <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                            <TableCell className="text-center">
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
                                    <Trash2 className="h-5 w-5" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action will remove {item.name} from your cart.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleRemoveItem(item.id)} className="bg-red-600 hover:bg-red-700">Remove</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24"> {/* Make summary sticky on larger screens */}
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes (8%)</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({discount*100}%)</span>
                      <span>-${totalDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="pt-2">
                    <Label htmlFor="promo" className="text-sm font-medium">Promo Code</Label>
                    <div className="flex space-x-2 mt-1">
                      <Input 
                        id="promo"
                        type="text" 
                        placeholder="Enter promo code" 
                        value={promoCode} 
                        onChange={(e) => setPromoCode(e.target.value)} 
                      />
                      <Button onClick={handleApplyPromoCode} variant="outline">Apply</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="lg" className="w-full" onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>
      <footer className="bg-gray-800 text-white py-8 text-center mt-auto">
        <p>&copy; {new Date().getFullYear()} FoodFleet. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CartPage;