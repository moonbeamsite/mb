import { Navigation } from "@/components/Navigation";
import { FeaturedSections } from "@/components/FeaturedSections";
import { JournalCarousel } from "@/components/JournalCarousel";
import { OrganicProductHighlights } from "@/components/OrganicProductHighlights";
import { TodaysSpecial } from "@/components/TodaysSpecial";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Heart, Leaf, Mountain, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import heroImage from "@/assets/hero-kumaoni.png";
import logoMoonbeam from "@/assets/logoMoonbeam.png";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const slides = [
    {
      type: "story",
      background: heroImage,
      title: "The Heart of Kumaon",
      story: "In the deep, wild forest, the small home of Mai and her family stood, a heart expressing deep respect for nature. This sanctuary was the birthplace of Chyura Ghee. Mai, the old lady, directed her daughter, Asha, who skillfully tended the fire, while the grandchild, Anshu, collected the delicate, fragrant Chyura tree flowers. As the butter simmered, Anshu gently fed the flames with dry Chyura leaves. The resulting fumes, thin and aromatic, carried the raw, herbal soul of the forest into the golden liquid. This ancestral process, blooming with the family's collective bliss, transformed the wild flower's essence into the purest, most authentic Chyura Ghee."
    },
    {
      type: "logo",
      background: "gradient",
      logo: logoMoonbeam,
      tagline: "Authentic Kumaoni Heritage • Organic Excellence • Crafted with Love"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000); // Slowed down from 6 seconds to 10 seconds
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-lavender-light/5 to-royal/5">
      <Navigation />
      
      {/* Hero Slider Section */}
      <section className="relative h-screen min-h-[600px] overflow-hidden z-10">
        {/* Slides Container */}
        <div 
          ref={sliderRef}
          className="relative w-full h-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className={
                `absolute inset-0 transition-all duration-1000 ease-in-out ` +
                (index === currentSlide 
                  ? 'opacity-100 translate-x-0' 
                  : index < currentSlide 
                    ? 'opacity-0 -translate-x-full' 
                    : 'opacity-0 translate-x-full')
              }
            >
              {slide.type === "story" ? (
                // Story Slide - Mobile Layout: Image Top, Story Bottom
                <>
                  {/* Mobile Layout */}
                  <div className="block sm:hidden h-full">
                    {/* Full Image Section - Top Half */}
                    <div className="h-1/2 relative">
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slide.background})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-royal/30 via-royal/20 to-royal/10" />
                        {/* Smooth transition gradient at bottom - Mobile only */}
                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-royal/90 via-royal/70 to-transparent" />
                      </div>
                    </div>
                    
                    {/* Story Section - Bottom Half */}
                    <div className="h-1/2 relative bg-gradient-to-br from-royal/90 via-royal-dark/85 to-royal/90 flex items-center">
                      {/* Smooth transition gradient at top - Mobile only */}
                      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-royal/90 via-royal/70 to-transparent" />
                      <div className="container mx-auto px-4 py-6 relative z-10">
                        <div className="text-center">
                          <h2 className="text-2xl font-bold mb-4 text-primary-foreground glow-lavender font-serif leading-tight">
                            {slide.title}
                          </h2>
                          <div className="bg-background/20 backdrop-blur-sm rounded-xl p-4 border border-lavender/40 shadow-lg">
                            <p className="text-sm leading-relaxed text-primary-foreground/95 font-light">
                              {slide.story}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden sm:block h-full">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${slide.background})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-royal/30 via-royal/20 to-royal/10" />
                    </div>
                    <div className="relative z-10 h-full flex items-center">
                      <div className="container mx-auto px-6 md:px-12">
                        <div className="max-w-2xl">
                          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-primary-foreground glow-lavender font-serif leading-tight">
                            {slide.title}
                          </h2>
                          <div className="bg-background/15 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-lavender/30 shadow-lg">
                            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-primary-foreground/95 font-light">
                              {slide.story}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // Logo Slide - Mobile Optimized
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-lavender-light/20 via-background to-royal/10" />
                  <div className="relative z-10 h-full flex items-center justify-center pt-16 sm:pt-20 md:pt-24">
                    <div className="text-center px-4 sm:px-6 w-full">
                      <div className="mb-4 sm:mb-6 md:mb-8 pb-2 sm:pb-3 md:pb-4 transform hover:scale-105 transition-transform duration-500">
                        <img 
                          src={slide.logo} 
                          alt="Moonbeam Logo" 
                          className="w-full h-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto drop-shadow-2xl object-contain"
                        />
                      </div>
                      <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto relative z-30">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-lavender/30 relative z-40">
                          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-royal font-serif font-semibold leading-relaxed text-center">
                            {slide.tagline}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Desktop Only */}
        <button
          onClick={prevSlide}
          className="hidden lg:block absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-background/25 backdrop-blur-sm border border-lavender/40 text-primary-foreground hover:bg-lavender/25 hover:border-lavender transition-all duration-300 group shadow-lg"
        >
          <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-background/25 backdrop-blur-sm border border-lavender/40 text-primary-foreground hover:bg-lavender/25 hover:border-lavender transition-all duration-300 group shadow-lg"
        >
          <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        {/* Navigation Dots - Mobile Optimized */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={
                `w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ` +
                (index === currentSlide 
                  ? 'bg-lavender scale-125 shadow-lavender' 
                  : 'bg-background/50 backdrop-blur-sm border border-lavender/40 hover:bg-lavender/60')
              }
            />
          ))}
        </div>


      </section>

      {/* Welcome Section - Mobile Optimized */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-br from-background via-lavender-light/3 to-background z-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 glow-lavender text-royal leading-tight">
            Moonbeam
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-3 sm:mb-4 text-lavender font-serif">
            The Kumaon Aesthetics
          </p>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 md:mb-12 text-muted-foreground max-w-xs sm:max-w-lg md:max-w-2xl mx-auto leading-relaxed px-2">
            Experience the mystical flavors and organic treasures of the Himalayan hills
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center items-center">
            <Button 
              size="lg" 
              className="relative overflow-hidden bg-gradient-to-r from-lavender via-lavender-light to-lavender text-white border border-lavender/30 rounded-full px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-base sm:text-lg font-serif font-medium shadow-lg hover:shadow-mystical transition-all duration-500 hover:scale-105 group backdrop-blur-sm w-full sm:w-auto"
              asChild
            >
              <Link to="/menu" className="flex items-center justify-center gap-2 sm:gap-3 relative z-10">
                <span className="tracking-wide">Explore Menu</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-royal/20 to-lavender-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="relative overflow-hidden bg-background/80 backdrop-blur-sm border-2 border-lavender/60 text-royal rounded-full px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-base sm:text-lg font-serif font-medium shadow-lg hover:shadow-mystical transition-all duration-500 hover:scale-105 group hover:border-lavender hover:bg-lavender/10 w-full sm:w-auto"
              asChild
            >
              <Link to="/store" className="flex items-center justify-center gap-2 sm:gap-3 relative z-10">
                <span className="tracking-wide group-hover:text-lavender transition-colors duration-300">Visit Store</span>
                <div className="absolute inset-0 bg-gradient-to-r from-lavender/5 to-royal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Sections Grid */}
      <FeaturedSections />

      {/* Daily Journal Carousel */}
      <JournalCarousel />

      {/* Our Story Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Mobile Layout - No Card */}
          <div className="block sm:hidden">
            <div className="text-center pb-4">
              <h2 className="text-3xl font-bold text-royal mb-3">Our Story</h2>
              <p className="text-base max-w-3xl mx-auto text-muted-foreground">
                Born in the mystical hills of Kumaon, Moonbeam is a celebration of traditional
                Himalayan cuisine and organic living. We craft each dish with love, using recipes
                passed down through generations and ingredients sourced from local organic farms.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="text-center p-2 rounded-lg bg-lavender/10 border border-lavender/20">
                <Mountain className="w-6 h-6 mx-auto mb-2 text-royal" />
                <h3 className="text-xs font-semibold text-royal leading-tight">Mountain Heritage</h3>
              </div>
              <div className="text-center p-2 rounded-lg bg-lavender/10 border border-lavender/20">
                <Leaf className="w-6 h-6 mx-auto mb-2 text-royal" />
                <h3 className="text-xs font-semibold text-royal leading-tight">100% Organic</h3>
              </div>
              <div className="text-center p-2 rounded-lg bg-lavender/10 border border-lavender/20">
                <Heart className="w-6 h-6 mx-auto mb-2 text-royal" />
                <h3 className="text-xs font-semibold text-royal leading-tight">Made with Love</h3>
              </div>
            </div>
          </div>

          {/* Desktop Layout - With Card */}
          <Card className="hidden sm:block border-2 border-lavender/30 bg-card/80 backdrop-blur-sm shadow-lavender">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-4xl md:text-5xl text-royal mb-4">Our Story</CardTitle>
              <CardDescription className="text-lg max-w-3xl mx-auto">
                Born in the mystical hills of Kumaon, Moonbeam is a celebration of traditional
                Himalayan cuisine and organic living. We craft each dish with love, using recipes
                passed down through generations and ingredients sourced from local organic farms.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
                <div className="text-center p-4 md:p-6 rounded-xl bg-lavender/10 border border-lavender/20">
                  <Mountain className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-royal" />
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-royal leading-snug">Mountain Heritage</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Authentic recipes from the Kumaon hills
                  </p>
                </div>
                <div className="text-center p-4 md:p-6 rounded-xl bg-lavender/10 border border-lavender/20">
                  <Leaf className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-royal" />
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-royal leading-snug">100% Organic</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Sourced from certified organic farms
                  </p>
                </div>
                <div className="text-center p-4 md:p-6 rounded-xl bg-lavender/10 border border-lavender/20">
                  <Heart className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-royal" />
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-royal leading-snug">Made with Love</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Each dish crafted with care and tradition
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Separator Line */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-lavender/30 to-transparent"></div>
      </div>

      {/* Today's Special */}
      <TodaysSpecial />

      {/* Organic Product Highlights */}
      <OrganicProductHighlights />

      {/* Why Choose Us Section */}
      <section className="py-12 sm:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 text-royal">Why Choose Moonbeam</h2>
            <p className="text-sm sm:text-xl text-muted-foreground">
              Experience the difference of authentic Kumaoni cuisine
            </p>
          </div>
          
          {/* Mobile Layout - 2x2 Grid */}
          <div className="block sm:hidden">
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: Sparkles,
                  title: "Authentic Recipes",
                  description: "Traditional Kumaoni dishes made from age-old recipes"
                },
                {
                  icon: Leaf,
                  title: "Organic Ingredients",
                  description: "100% organic produce from certified farms"
                },
                {
                  icon: Heart,
                  title: "Handcrafted",
                  description: "Every dish prepared with love and care"
                },
                {
                  icon: Mountain,
                  title: "Hill Fresh",
                  description: "Fresh ingredients from the Himalayan hills"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="text-center p-3 rounded-xl bg-lavender/10 border border-lavender/20"
                >
                  <item.icon className="w-8 h-8 mx-auto mb-2 text-lavender" />
                  <h3 className="text-sm font-semibold text-royal leading-tight mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-tight">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Layout - Original Cards */}
          <div className="hidden sm:block">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Sparkles,
                  title: "Authentic Recipes",
                  description: "Traditional Kumaoni dishes made from age-old recipes"
                },
                {
                  icon: Leaf,
                  title: "Organic Ingredients",
                  description: "100% organic produce from certified farms"
                },
                {
                  icon: Heart,
                  title: "Handcrafted",
                  description: "Every dish prepared with love and care"
                },
                {
                  icon: Mountain,
                  title: "Hill Fresh",
                  description: "Fresh ingredients from the Himalayan hills"
                }
              ].map((item, index) => (
                <Card 
                  key={index}
                  className="border-2 border-lavender/20 hover:border-lavender bg-card/80 backdrop-blur-sm hover:shadow-mystical transition-all duration-300 text-center p-6"
                >
                  <item.icon className="w-12 h-12 mx-auto mb-4 text-lavender" />
                  <h3 className="text-xl font-semibold mb-2 text-royal">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-royal via-indigo to-royal-dark text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-lavender">
            Begin Your Kumaoni Journey
          </h2>
          <p className="text-xl mb-8 text-lavender-light">
            Experience the magic of authentic Himalayan cuisine and organic living
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-lavender text-lavender-foreground hover:bg-lavender-dark transition-all duration-300 text-lg px-8"
              asChild
            >
              <Link to="/contact">Get in Touch</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-lavender text-lavender-light hover:bg-lavender/10 text-lg px-8"
              asChild
            >
              <Link to="/journal">Read Our Journal</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
