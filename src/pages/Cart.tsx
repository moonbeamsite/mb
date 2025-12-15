import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, X, ShoppingBag, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items, removeItem, updateQuantity, totalItems, subtotal, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-lavender-light/5 to-royal/5">
        <Navigation />
        <div className="container mx-auto px-4 pt-32 pb-16">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="w-24 h-24 mx-auto text-lavender/50 mb-6" />
            <h1 className="text-4xl font-bold mb-4 text-royal glow-lavender">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Start adding delicious items from our Kitchen Menu or Organic Store
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/menu">
                <Button className="bg-gradient-mystical hover:shadow-lavender">
                  Browse Menu
                </Button>
              </Link>
              <Link to="/store">
                <Button variant="outline" className="border-lavender/50 text-royal hover:bg-lavender/10">
                  Visit Store
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-lavender-light/5 to-royal/5">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 glow-lavender">Your Cart</h1>
          <p className="text-xl text-muted-foreground">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your basket
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card
                key={`${item.type}-${item.id}`}
                className="border-2 border-lavender/20 bg-card/80 backdrop-blur-sm hover:shadow-mystical transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {item.image && (
                      <div className="flex-shrink-0 w-24 h-24 bg-lavender/10 rounded-lg flex items-center justify-center text-4xl">
                        {item.image}
                      </div>
                    )}
                    <div className="flex-grow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-royal">{item.name}</h3>
                          <Badge
                            className={
                              item.type === "dish"
                                ? "bg-lavender text-lavender-foreground mt-1"
                                : "bg-royal text-primary-foreground mt-1"
                            }
                          >
                            {item.type === "dish" ? "Kitchen" : "Organic"}
                          </Badge>
                          {item.category && (
                            <p className="text-sm text-muted-foreground mt-1">{item.category}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.id, item.type)}
                          className="p-2 hover:bg-lavender/20 rounded-full transition-colors"
                        >
                          <X className="w-5 h-5 text-royal" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3 bg-lavender/10 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.type, item.quantity - 1)}
                            className="p-2 hover:bg-lavender/20 rounded-md transition-colors"
                          >
                            <Minus className="w-4 h-4 text-royal" />
                          </button>
                          <span className="w-8 text-center font-semibold text-royal">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.type, item.quantity + 1)}
                            className="p-2 hover:bg-lavender/20 rounded-md transition-colors"
                          >
                            <Plus className="w-4 h-4 text-royal" />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">₹{item.price} each</p>
                          <p className="text-2xl font-bold text-lavender">
                            ₹{(item.price * item.quantity).toFixed(0)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="border-2 border-lavender/20 bg-card/80 backdrop-blur-sm shadow-mystical sticky top-32">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-lavender" />
                  <h2 className="text-2xl font-bold text-royal">Order Summary</h2>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-lg">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold text-royal">₹{subtotal.toFixed(0)}</span>
                  </div>
                  <div className="border-t border-lavender/20 pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span className="text-royal">Total</span>
                      <span className="text-lavender">₹{total.toFixed(0)}</span>
                    </div>
                  </div>
                </div>

                <Link to="/checkout">
                  <Button className="w-full bg-gradient-mystical hover:shadow-lavender transition-all duration-300 h-12 text-lg">
                    Proceed to Checkout
                  </Button>
                </Link>

                <Link to="/menu" className="block mt-4">
                  <Button
                    variant="outline"
                    className="w-full border-lavender/50 text-royal hover:bg-lavender/10"
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
