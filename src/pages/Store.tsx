import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Plus, Minus, Loader2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { usePublicProducts } from "@/hooks/usePublicData";

const Store = () => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const { addItem } = useCart();
  const { data: products, isLoading } = usePublicProducts();

  const getQuantity = (id: string) => quantities[id] || 1;
  
  const updateQuantity = (id: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const handleAddToCart = (product: NonNullable<typeof products>[0]) => {
    addItem({
      type: "product",
      id: product.id,
      name: product.name,
      image: product.image_url || undefined,
      price: product.price,
      category: product.category || undefined,
      quantity: getQuantity(product.id),
    });
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  const getStockStatus = (quantity: number | null) => {
    if (quantity === null || quantity === 0) return "Out of Stock";
    if (quantity < 10) return "Limited";
    return "In Stock";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-lavender-light/5 to-royal/5">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 glow-lavender">
            Organic Store
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Authentic organic products sourced directly from the Kumaon hills
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-lavender" />
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products?.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-mystical transition-all duration-300 border-2 border-lavender/20 hover:border-lavender bg-card/80 backdrop-blur-sm overflow-hidden"
                >
                  <CardHeader className="pt-6">
                    {product.is_featured && (
                      <Badge className="w-fit mb-2 bg-lavender text-lavender-foreground">
                        Featured
                      </Badge>
                    )}
                    {product.image_url && (
                      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardTitle className="text-2xl text-royal">{product.name}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {product.category}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-base text-foreground/80 mb-4">{product.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-bold text-lavender">₹{product.price}</span>
                      <Badge variant={getStockStatus(product.stock_quantity) === "In Stock" ? "default" : "secondary"}>
                        {getStockStatus(product.stock_quantity)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 bg-lavender/10 rounded-lg p-1 w-fit">
                      <button
                        onClick={() => updateQuantity(product.id, -1)}
                        className="p-2 hover:bg-lavender/20 rounded-md transition-colors"
                      >
                        <Minus className="w-4 h-4 text-royal" />
                      </button>
                      <span className="w-8 text-center font-semibold text-royal">
                        {getQuantity(product.id)}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, 1)}
                        className="p-2 hover:bg-lavender/20 rounded-md transition-colors"
                      >
                        <Plus className="w-4 h-4 text-royal" />
                      </button>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-4">
                    <Button 
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock_quantity === 0}
                      className="w-full bg-lavender hover:bg-lavender-dark text-white hover:shadow-lavender transition-all duration-300 opacity-100 visible relative z-10"
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {products?.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No products available at the moment.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Store;
