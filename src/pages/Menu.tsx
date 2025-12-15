import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Plus, Minus, Loader2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { usePublicDishes } from "@/hooks/usePublicData";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const { addItem } = useCart();
  const { data: dishes, isLoading } = usePublicDishes();

  // Get unique categories from dishes
  const categories = ["All", ...new Set(dishes?.map(d => d.category).filter(Boolean) as string[])];

  const filteredItems = selectedCategory === "All"
    ? dishes
    : dishes?.filter((item) => item.category === selectedCategory);

  const getQuantity = (id: string) => quantities[id] || 1;
  
  const updateQuantity = (id: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const handleAddToCart = (item: NonNullable<typeof dishes>[0]) => {
    addItem({
      type: "dish",
      id: item.id,
      name: item.name,
      image: item.image_url || "🍛",
      price: item.price,
      category: item.category || undefined,
      quantity: getQuantity(item.id),
    });
    setQuantities(prev => ({ ...prev, [item.id]: 1 }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-lavender-light/5 to-royal/5">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 glow-lavender">
            Our Menu
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Authentic Kumaoni cuisine crafted with love and organic ingredients
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-lavender" />
          </div>
        ) : (
          <>
            {/* Category Tabs */}
            <Tabs defaultValue="All" className="mb-12">
              <TabsList className="w-full md:w-auto flex flex-wrap justify-center gap-2 bg-card/50 backdrop-blur-sm p-2 rounded-xl shadow-lavender">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    onClick={() => setSelectedCategory(category)}
                    className="data-[state=active]:bg-lavender data-[state=active]:text-lavender-foreground"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems?.map((item) => (
                <Card
                  key={item.id}
                  className="group hover:shadow-mystical transition-all duration-300 border-2 border-lavender/20 hover:border-lavender bg-card/80 backdrop-blur-sm overflow-hidden"
                >
                  <CardHeader>
                    {item.image_url ? (
                      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                        <img 
                          src={item.image_url} 
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="text-6xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                        🍛
                      </div>
                    )}
                    <CardTitle className="text-2xl text-royal">{item.name}</CardTitle>
                    <CardDescription className="text-base">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold text-lavender">₹{item.price}</span>
                      {item.original_price && (
                        <span className="text-lg text-muted-foreground line-through">₹{item.original_price}</span>
                      )}
                      {item.discount_text && (
                        <span className="px-2 py-0.5 bg-lavender/20 text-lavender text-xs font-semibold rounded-full">
                          {item.discount_text}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 bg-lavender/10 rounded-lg p-1 w-fit">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 hover:bg-lavender/20 rounded-md transition-colors"
                      >
                        <Minus className="w-4 h-4 text-royal" />
                      </button>
                      <span className="w-8 text-center font-semibold text-royal">
                        {getQuantity(item.id)}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 hover:bg-lavender/20 rounded-md transition-colors"
                      >
                        <Plus className="w-4 h-4 text-royal" />
                      </button>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button 
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-lavender hover:bg-lavender-dark text-white hover:shadow-lavender transition-all duration-300 opacity-100 visible relative z-10"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredItems?.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No dishes available in this category.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
