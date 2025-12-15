import { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Moon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useFeaturedJournalEntries } from "@/hooks/usePublicData";

export const JournalCarousel = () => {
  // Desktop carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 1 },
    },
  });
  
  // Mobile carousel
  const [mobileEmblaRef, mobileEmblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1
  });
  
  const { data: journalEntries, isLoading } = useFeaturedJournalEntries();

  // Desktop carousel controls
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Mobile carousel controls
  const mobileScrollPrev = useCallback(() => {
    if (mobileEmblaApi) mobileEmblaApi.scrollPrev();
  }, [mobileEmblaApi]);

  const mobileScrollNext = useCallback(() => {
    if (mobileEmblaApi) mobileEmblaApi.scrollNext();
  }, [mobileEmblaApi]);

  // Auto-scroll every 7 seconds
  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 7000);

    return () => clearInterval(autoplay);
  }, [emblaApi]);

  if (isLoading) {
    return (
      <section className="relative py-20 px-4 bg-lavender/5 border-t-2 border-b-2 border-royal/20">
        <div className="container mx-auto max-w-7xl flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-lavender" />
        </div>
      </section>
    );
  }

  if (!journalEntries || journalEntries.length === 0) {
    return null;
  }

  return (
    <section className="relative py-20 px-4 bg-lavender/5 border-t-2 border-b-2 border-royal/20 overflow-hidden">
      {/* Background texture and decorations */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyYWluIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiIGZpbGw9IiM4YjVjZjYiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhaW4pIi8+PC9zdmc+')] pointer-events-none" />
      
      {/* Floating leaf doodles */}
      <div className="absolute top-10 left-10 w-16 h-16 opacity-10">
        <svg viewBox="0 0 100 100" className="text-lavender">
          <path d="M50 10 Q70 30 70 50 Q70 70 50 90 Q30 70 30 50 Q30 30 50 10 Z" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute bottom-10 right-10 w-20 h-20 opacity-10">
        <Moon className="w-full h-full text-lavender" />
      </div>

      <div className="container mx-auto max-w-7xl relative">
        {/* Heading with crescent moon */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Moon className="w-6 h-6 text-lavender animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-serif text-royal glow-lavender">
              From Our Daily Journal
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-mystical mx-auto rounded-full" />
        </div>

        {/* Mobile Slider View */}
        <div className="block md:hidden">
          <div className="relative">
            <div className="overflow-hidden" ref={mobileEmblaRef}>
              <div className="flex gap-4">
                {journalEntries.map((entry) => (
                  <div key={entry.id} className="flex-[0_0_calc(100%-1rem)] min-w-0">
                    <div className="relative group">
                      {/* Tape/Pin decorations at corners */}
                      <div className="absolute -top-1 -left-1 w-4 h-4 bg-lavender/30 rounded-full z-10 shadow-sm" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-lavender/30 rounded-full z-10 shadow-sm" />
                      
                      {/* Card */}
                      <div className="relative bg-lavender-light/20 backdrop-blur-sm rounded-lg p-3 border border-royal/40 shadow-sm transition-all duration-300 group-hover:shadow-lavender group-hover:border-royal/60">
                        {/* Content */}
                        <div className="relative z-10">
                          {/* Date and Tag in one line */}
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-medium text-indigo uppercase tracking-wide">
                              {entry.entry_date ? new Date(entry.entry_date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              }) : 'No date'}
                            </p>
                            {entry.is_featured && (
                              <span className="px-2 py-0.5 text-xs font-semibold bg-lavender/30 text-royal rounded-full border border-lavender/50">
                                Featured
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="text-base font-serif text-royal mb-2 group-hover:text-indigo transition-colors line-clamp-2">
                            {entry.title}
                          </h3>

                          {/* Preview - shorter */}
                          <p className="text-xs text-muted-foreground mb-3 leading-relaxed line-clamp-2">
                            {entry.excerpt || entry.content?.substring(0, 80)}...
                          </p>

                          {/* Read More Button - smaller */}
                          <Button
                            asChild
                            size="sm"
                            className="text-xs px-3 py-1.5 bg-lavender hover:bg-lavender-dark text-white hover:shadow-lavender transition-all duration-300"
                          >
                            <Link to="/journal">
                              Read More
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Arrows - Mobile */}
            {journalEntries.length > 1 && (
              <>
                <button
                  onClick={mobileScrollPrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-8 h-8 rounded-full bg-lavender/20 border border-lavender/40 flex items-center justify-center text-royal hover:bg-lavender hover:text-primary-foreground transition-all duration-300 shadow-lg z-10"
                  aria-label="Previous journal entry"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={mobileScrollNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-8 h-8 rounded-full bg-lavender/20 border border-lavender/40 flex items-center justify-center text-royal hover:bg-lavender hover:text-primary-foreground transition-all duration-300 shadow-lg z-10"
                  aria-label="Next journal entry"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Pagination Dots - Mobile */}
            {journalEntries.length > 1 && (
              <div className="flex justify-center gap-1 mt-4">
                {journalEntries.map((_, index) => (
                  <div
                    key={index}
                    className="w-1.5 h-1.5 rounded-full bg-lavender/30"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Carousel View */}
        <div className="hidden md:block relative">
          {/* Carousel Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {journalEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex-[0_0_calc(33.333%-1rem)] min-w-0"
                >
                  {/* Journal Card - Notice Board Style */}
                  <div className="relative group h-full">
                    {/* Tape/Pin decorations at corners */}
                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-lavender/30 rounded-full z-10 shadow-lg" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-lavender/30 rounded-full z-10 shadow-lg" />
                    
                    {/* Card */}
                    <div className="relative bg-lavender-light/20 backdrop-blur-sm rounded-xl p-6 h-full border-2 border-royal/40 shadow-lavender transition-all duration-500 group-hover:shadow-mystical group-hover:scale-105 group-hover:border-royal/60">
                      {/* Hand-drawn border effect */}
                      <div className="absolute inset-0 rounded-xl border-2 border-royal/20 transform -rotate-1" />
                      <div className="absolute inset-0 rounded-xl border-2 border-lavender/20 transform rotate-1" />
                      
                      {/* Leaf vine decoration */}
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-8 opacity-40">
                        <svg viewBox="0 0 100 50" className="text-lavender">
                          <path d="M10 25 Q30 10 50 25 Q70 10 90 25" stroke="currentColor" fill="none" strokeWidth="3" />
                        </svg>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 flex flex-col h-full">
                        {/* Date */}
                        <p className="text-sm font-medium text-indigo uppercase tracking-wide mb-3">
                          {entry.entry_date ? new Date(entry.entry_date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          }) : 'No date'}
                        </p>

                        {/* Tag */}
                        {entry.is_featured && (
                          <span className="inline-block self-start px-3 py-1 text-xs font-semibold bg-lavender/30 text-royal rounded-full mb-4 border border-lavender/50">
                            Featured
                          </span>
                        )}

                        {/* Title */}
                        <h3 className="text-2xl font-serif text-royal mb-4 group-hover:text-indigo transition-colors">
                          {entry.title}
                        </h3>

                        {/* Preview */}
                        <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
                          {entry.excerpt || entry.content?.substring(0, 150)}...
                        </p>

                        {/* Read More Button */}
                        <Button
                          asChild
                          className="w-full bg-gradient-mystical hover:shadow-lavender transition-all duration-300 group-hover:scale-105"
                        >
                          <Link to="/journal">
                            Read Full Journal
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Desktop Only */}
          {journalEntries.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full left-4 z-20 w-12 h-12 rounded-full border-2 border-lavender bg-background/90 backdrop-blur-sm hover:bg-royal hover:border-royal hover:text-primary-foreground shadow-lavender transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full right-4 z-20 w-12 h-12 rounded-full border-2 border-lavender bg-background/90 backdrop-blur-sm hover:bg-royal hover:border-royal hover:text-primary-foreground shadow-lavender transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </>
          )}

          {/* Pagination Dots - Desktop Only */}
          {journalEntries.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {journalEntries.map((_, index) => (
                <button
                  key={index}
                  className="w-2 h-2 rounded-full bg-lavender/40 hover:bg-lavender transition-colors duration-300"
                  onClick={() => emblaApi?.scrollTo(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
