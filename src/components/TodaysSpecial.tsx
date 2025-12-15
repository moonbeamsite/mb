import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChefHat, Moon, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { useFeaturedDishes } from "@/hooks/usePublicData";

export const TodaysSpecial = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { data: specialDishes, isLoading } = useFeaturedDishes();

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
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (isLoading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-royal/5">
        <div className="container mx-auto max-w-5xl flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-lavender" />
        </div>
      </section>
    );
  }

  if (!specialDishes || specialDishes.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-20 px-4 bg-gradient-to-b from-transparent to-royal/5 relative overflow-hidden">
      {/* Mobile Layout */}
      <div className="block sm:hidden">
        <div className="container mx-auto max-w-lg">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 mb-3">
              <ChefHat className="w-6 h-6 text-lavender" />
              <h2 className="text-2xl font-serif font-bold text-royal">
                Today's Special
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Fresh from the chulha, made with love
            </p>
          </div>

          {/* Mobile Dish Cards */}
          <div className="space-y-4">
            {specialDishes.map((dish, index) => (
              <div key={dish.id} className="bg-lavender/5 rounded-xl p-4 border border-lavender/20">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={dish.image_url || "/placeholder.svg"}
                      alt={dish.name}
                      className="w-20 h-20 object-cover rounded-lg border-2 border-lavender/30"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-serif font-bold text-royal mb-1 truncate">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {dish.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-royal">₹{dish.price}</span>
                        {dish.original_price && (
                          <span className="text-sm text-muted-foreground line-through">₹{dish.original_price}</span>
                        )}
                      </div>
                      <Button 
                        size="sm"
                        className="bg-lavender hover:bg-lavender-dark text-white text-xs px-3 py-1"
                        asChild
                      >
                        <Link to="/menu">Order</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:block">
        {/* Smoke/ember particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-lavender/40 rounded-full animate-pulse"
              style={{
                left: `${20 + i * 10}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: "3s"
              }}
            />
          ))}
        </div>

        <div className="container mx-auto max-w-5xl">
          <Card 
            className="relative border-4 border-royal/40 bg-gradient-to-br from-lavender/10 via-background to-lavender/5 overflow-hidden shadow-2xl"
            style={{
              borderRadius: "8px",
              borderStyle: "solid",
              borderImageSlice: 1,
              boxShadow: "0 8px 32px rgba(28, 46, 140, 0.15), inset 0 0 80px rgba(200, 155, 255, 0.05)"
            }}
          >
          {/* Wooden plank texture overlay */}
          <div 
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 10px, hsl(var(--royal)) 10px, hsl(var(--royal)) 11px)",
              mixBlendMode: "multiply"
            }}
          />

          {/* Decorative pins at corners */}
          <div className="absolute top-4 left-4 w-3 h-3 bg-royal rounded-full shadow-lg" />
          <div className="absolute top-4 right-4 w-3 h-3 bg-royal rounded-full shadow-lg" />
          <div className="absolute bottom-4 left-4 w-3 h-3 bg-royal rounded-full shadow-lg" />
          <div className="absolute bottom-4 right-4 w-3 h-3 bg-royal rounded-full shadow-lg" />

          {/* Moon doodle */}
          <div className="absolute top-6 right-12 opacity-30">
            <Moon className="w-8 h-8 text-lavender fill-lavender/20" />
          </div>

          {/* Leaf vines decoration */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg className="w-full h-full">
              <path
                d="M 0,50 Q 50,30 100,50"
                stroke="hsl(var(--lavender))"
                strokeWidth="2"
                fill="none"
                className="animate-pulse"
              />
              <path
                d="M 400,20 Q 450,40 500,20"
                stroke="hsl(var(--lavender))"
                strokeWidth="2"
                fill="none"
                className="animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </svg>
          </div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <ChefHat className="w-8 h-8 text-lavender" />
                <h2 className="text-4xl md:text-5xl font-serif font-bold glow-lavender text-royal">
                  Today's Special
                </h2>
                <ChefHat className="w-8 h-8 text-lavender" />
              </div>
              <p className="text-lg text-muted-foreground">
                Fresh from the chulha, made with love
              </p>
            </div>

            {/* Carousel */}
            <div className="relative">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {specialDishes.map((dish) => (
                    <div key={dish.id} className="flex-[0_0_100%] min-w-0">
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Image with pinned/taped effect */}
                        <div className="relative">
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-lavender/40 backdrop-blur-sm rounded-sm transform rotate-1 shadow-lg" />
                          <div className="relative border-4 border-lavender/30 shadow-mystical overflow-hidden rounded-lg transform hover:rotate-1 transition-all duration-300">
                            <img
                              src={dish.image_url || "/placeholder.svg"}
                              alt={dish.name}
                              className="w-full h-64 object-cover"
                            />
                          </div>
                          {/* Corner tape pieces */}
                          <div className="absolute -bottom-2 -right-2 w-12 h-8 bg-lavender/40 backdrop-blur-sm rounded-sm transform -rotate-12 shadow-lg" />
                        </div>

                        {/* Description */}
                        <div className="space-y-6">
                          <h3 className="text-3xl font-serif font-bold text-royal">
                            {dish.name}
                          </h3>
                          <p className="text-lg text-muted-foreground leading-relaxed">
                            {dish.description}
                          </p>
                          <div className="flex items-baseline gap-3">
                            <span className="text-4xl font-bold text-royal">₹{dish.price}</span>
                            {dish.original_price && (
                              <span className="text-xl text-muted-foreground line-through">₹{dish.original_price}</span>
                            )}
                            {dish.discount_text && (
                              <span className="px-3 py-1 bg-lavender/20 text-lavender text-sm font-semibold rounded-full">
                                {dish.discount_text}
                              </span>
                            )}
                          </div>
                          <Button 
                            size="lg"
                            className="w-full bg-gradient-to-r from-lavender via-royal to-lavender bg-[length:200%_100%] hover:bg-[position:100%_0] text-primary-foreground text-lg shadow-mystical hover:shadow-lavender transition-all duration-500"
                            asChild
                          >
                            <Link to="/menu">Order Now</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              {specialDishes.length > 1 && (
                <>
                  <button
                    onClick={scrollPrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 rounded-full bg-lavender/20 border border-lavender/40 flex items-center justify-center text-royal hover:bg-lavender hover:text-primary-foreground transition-all duration-300 shadow-lg hover:scale-110"
                    aria-label="Previous dish"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={scrollNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 rounded-full bg-lavender/20 border border-lavender/40 flex items-center justify-center text-royal hover:bg-lavender hover:text-primary-foreground transition-all duration-300 shadow-lg hover:scale-110"
                    aria-label="Next dish"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Pagination Dots */}
            {specialDishes.length > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {specialDishes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === selectedIndex
                        ? "bg-lavender w-8 shadow-lavender"
                        : "bg-lavender/30 hover:bg-lavender/50"
                    }`}
                    aria-label={`Go to dish ${index + 1}`}
                  />
                ))}
              </div>
            )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
