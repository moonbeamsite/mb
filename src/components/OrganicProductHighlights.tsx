import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Sparkles, ChevronLeft, ChevronRight, Loader2, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { useFeaturedProducts } from "@/hooks/usePublicData";

export const OrganicProductHighlights = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "start",
    slidesToScroll: 1
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const { data: products, isLoading } = useFeaturedProducts();

  const handleAddToCart = (product: any) => {
    // Add to cart functionality - you can implement this based on your cart system
    console.log('Adding to cart:', product);
    // For now, just show an alert or implement your cart logic here
  };

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (isLoading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-b from-lavender/5 to-transparent">
        <div className="container mx-auto max-w-7xl flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-lavender" />
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-20 px-4 bg-gradient-to-b from-lavender/5 to-transparent relative overflow-hidden">
      {/* Mobile Layout */}
      <div className="block sm:hidden">
        <div className="container mx-auto max-w-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-serif font-bold mb-2 text-royal">
              Organic Treasures
            </h2>
            <p className="text-sm text-muted-foreground">
              Handpicked from Himalayan farms, crafted with tradition
            </p>
          </div>

          {/* Mobile Horizontal Scroll - Myntra Style */}
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <div className="flex gap-3 px-1" style={{ width: 'max-content' }}>
                {products.map((product) => (
                  <div key={product.id} className="flex-shrink-0 w-40">
                    <div className="bg-white rounded-lg border border-lavender/20 shadow-sm overflow-hidden">
                      {/* Product Image */}
                      <div className="relative h-32 bg-lavender/5">
                        <img
                          src={product.image_url || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1">
                          <Leaf className="w-3 h-3 text-lavender" />
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-3">
                        <div className="flex items-center gap-1 mb-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Sparkles key={i} className="w-2.5 h-2.5 text-lavender fill-current" />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground ml-1">4.5</span>
                        </div>
                        
                        <h3 className="text-xs font-medium text-royal mb-1 truncate">
                          Moonbeam
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                          {product.name}
                        </p>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-bold text-royal">₹{product.price}</span>
                          <span className="text-xs text-muted-foreground line-through">₹{Math.round(product.price * 1.3)}</span>
                          <span className="text-xs text-green-600 font-medium">(23% OFF)</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-lavender" />
                            <span className="text-xs text-lavender font-medium">Organic</span>
                          </div>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="w-6 h-6 rounded-full bg-lavender hover:bg-lavender-dark text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                            aria-label="Add to cart"
                          >
                            <ShoppingCart className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="flex justify-center gap-1 mt-3">
              {[...Array(Math.ceil(products.length / 2))].map((_, index) => (
                <div
                  key={index}
                  className="w-1.5 h-1.5 rounded-full bg-lavender/30"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:block">
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 opacity-10">
          <Leaf className="w-32 h-32 text-lavender rotate-12" />
        </div>
        <div className="absolute bottom-10 left-10 opacity-10">
          <Sparkles className="w-24 h-24 text-royal" />
        </div>
        
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-royal">
              Organic Treasures
            </h2>
            <p className="text-xl text-muted-foreground">
              Handpicked from Himalayan farms, crafted with tradition
            </p>
          </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {products.map((product, index) => (
                <div 
                  key={product.id} 
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0 pl-4"
                >
                  <Card
                    className="group border-2 border-royal/30 bg-lavender/5 backdrop-blur-sm hover:border-lavender hover:shadow-mystical transition-all duration-500 overflow-hidden relative h-full"
                    style={{
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, hsl(var(--lavender) / 0.05), hsl(var(--lavender) / 0.1))"
                    }}
                  >
                    {/* Decorative corner leaves */}
                    <div className="absolute top-0 left-0 w-12 h-12 opacity-20">
                      <svg viewBox="0 0 50 50" className="text-lavender fill-current">
                        <path d="M5,5 Q5,25 25,25 Q5,25 5,45" stroke="currentColor" strokeWidth="2" fill="none" />
                        <circle cx="5" cy="5" r="2" />
                        <circle cx="5" cy="45" r="2" />
                      </svg>
                    </div>
                    <div className="absolute top-0 right-0 w-12 h-12 opacity-20 transform rotate-90">
                      <svg viewBox="0 0 50 50" className="text-lavender fill-current">
                        <path d="M5,5 Q5,25 25,25 Q5,25 5,45" stroke="currentColor" strokeWidth="2" fill="none" />
                        <circle cx="5" cy="5" r="2" />
                        <circle cx="5" cy="45" r="2" />
                      </svg>
                    </div>

                    {/* Woven basket border effect */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                      <svg className="w-full h-full" style={{ mixBlendMode: "multiply" }}>
                        <pattern id={`basket-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                          <line x1="0" y1="10" x2="20" y2="10" stroke="hsl(var(--royal))" strokeWidth="1" />
                          <line x1="10" y1="0" x2="10" y2="20" stroke="hsl(var(--royal))" strokeWidth="1" />
                        </pattern>
                        <rect width="100%" height="100%" fill={`url(#basket-${index})`} />
                      </svg>
                    </div>

                    {/* Product image with woven frame */}
                    <div className="relative h-48 overflow-hidden p-4">
                      <div className="absolute inset-4 border-4 border-royal/30 rounded-full" style={{
                        borderStyle: "dashed",
                        borderSpacing: "4px"
                      }} />
                      <img
                        src={product.image_url || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500 relative z-10"
                      />
                      {/* Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-lavender hover:bg-lavender-dark text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg z-20 opacity-0 group-hover:opacity-100"
                        aria-label="Add to cart"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                      {/* Lavender berry accents */}
                      <div className="absolute top-2 right-2 w-3 h-3 bg-lavender rounded-full group-hover:animate-pulse" />
                      <div className="absolute top-4 right-6 w-2 h-2 bg-lavender rounded-full group-hover:animate-pulse" style={{ animationDelay: "0.2s" }} />
                    </div>

                    <CardHeader className="relative z-10">
                      <CardTitle className="text-xl font-serif text-royal">{product.name}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {product.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-royal">₹{product.price}</span>
                        <Leaf className="w-5 h-5 text-lavender" />
                      </div>
                      <Button 
                        className="w-full bg-gradient-to-r from-lavender to-royal text-primary-foreground hover:shadow-lavender transition-all duration-300 group-hover:scale-105"
                        asChild
                      >
                        <Link to="/store">Shop Now</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {products.length > 1 && (
            <>
              <button
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 w-10 h-10 rounded-full bg-lavender/20 border border-lavender/40 flex items-center justify-center text-royal hover:bg-lavender hover:text-primary-foreground transition-all duration-300 shadow-lg hover:scale-110 z-10"
                aria-label="Previous products"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 w-10 h-10 rounded-full bg-lavender/20 border border-lavender/40 flex items-center justify-center text-royal hover:bg-lavender hover:text-primary-foreground transition-all duration-300 shadow-lg hover:scale-110 z-10"
                aria-label="Next products"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Pagination Dots */}
        {scrollSnaps.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "bg-lavender w-8 shadow-lavender"
                    : "bg-lavender/30 hover:bg-lavender/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          )}
        </div>
      </div>
    </section>
  );
};
