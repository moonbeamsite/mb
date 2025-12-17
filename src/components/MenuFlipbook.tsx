import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MenuFlipbookProps {
  pages: string[];
}

export const MenuFlipbook = ({ pages }: MenuFlipbookProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset position when page changes
  useEffect(() => {
    setPosition({ x: 0, y: 0 });
    setZoom(1);
  }, [currentPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isFlipping) return;
      
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          prevPage();
          break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          nextPage();
          break;
        case 'Home':
          e.preventDefault();
          goToPage(0);
          break;
        case 'End':
          e.preventDefault();
          goToPage(pages.length - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, isFlipping, pages.length]);

  const nextPage = () => {
    if (currentPage < pages.length - 1 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('next');
      // Different timing for mobile vs desktop
      const flipDuration = window.innerWidth < 768 ? 400 : 600;
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setTimeout(() => {
          setIsFlipping(false);
          setFlipDirection(null);
        }, 100);
      }, flipDuration);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('prev');
      // Different timing for mobile vs desktop
      const flipDuration = window.innerWidth < 768 ? 400 : 600;
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setTimeout(() => {
          setIsFlipping(false);
          setFlipDirection(null);
        }, 100);
      }, flipDuration);
    }
  };

  const goToPage = (pageIndex: number) => {
    if (pageIndex !== currentPage && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection(pageIndex > currentPage ? 'next' : 'prev');
      // Different timing for mobile vs desktop
      const flipDuration = window.innerWidth < 768 ? 400 : 600;
      setTimeout(() => {
        setCurrentPage(pageIndex);
        setTimeout(() => {
          setIsFlipping(false);
          setFlipDirection(null);
        }, 100);
      }, flipDuration);
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const resetView = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setTouchEnd({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchEnd({ x: touch.clientX, y: touch.clientY });
    
    // Handle pan when zoomed
    if (zoom > 1 && !isDragging) {
      setIsDragging(true);
      setDragStart({
        x: touch.clientX - position.x,
        y: touch.clientY - position.y
      });
    } else if (zoom > 1 && isDragging) {
      setPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    if (zoom > 1) {
      setIsDragging(false);
      return;
    }

    if (!touchStart.x || !touchEnd.x) return;
    
    const distance = touchStart.x - touchEnd.x;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentPage < pages.length - 1 && !isFlipping) {
      nextPage();
    } else if (isRightSwipe && currentPage > 0 && !isFlipping) {
      prevPage();
    }
    
    // Reset touch positions
    setTouchStart({ x: 0, y: 0 });
    setTouchEnd({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto perspective-1000">
      {/* Book Container */}
      <div className="relative bg-gradient-to-br from-lavender-light/20 via-background to-royal/10 rounded-2xl shadow-mystical overflow-hidden book-container border border-lavender/30">
        {/* Book Spine Effect - Hidden on mobile */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-2 bg-gradient-to-b from-royal via-lavender to-royal shadow-lg z-30 transform -translate-x-1 book-spine"></div>
      
      {/* Controls - Desktop */}
      <div className="hidden md:flex absolute top-4 right-4 gap-2 z-20">
        <Button
          variant="outline"
          size="sm"
          onClick={handleZoomOut}
          disabled={zoom <= 0.5}
          className="bg-card/90 backdrop-blur-sm hover:bg-card border-lavender/30 text-royal hover:border-lavender flipbook-interactive"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleZoomIn}
          disabled={zoom >= 3}
          className="bg-card/90 backdrop-blur-sm hover:bg-card border-lavender/30 text-royal hover:border-lavender flipbook-interactive"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={resetView}
          className="bg-card/90 backdrop-blur-sm hover:bg-card border-lavender/30 text-royal hover:border-lavender flipbook-interactive"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Mobile Controls - Top Bar */}
      <div className="md:hidden absolute top-2 left-2 right-2 flex justify-between items-center z-20">
        <div className="bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium shadow-lavender border border-lavender/30">
          <span className="text-royal">{currentPage + 1} / {pages.length}</span>
        </div>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            disabled={zoom <= 0.5}
            className="bg-card/90 backdrop-blur-sm hover:bg-card border-lavender/30 text-royal hover:border-lavender h-8 w-8 p-0"
          >
            <ZoomOut className="w-3 h-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            disabled={zoom >= 3}
            className="bg-card/90 backdrop-blur-sm hover:bg-card border-lavender/30 text-royal hover:border-lavender h-8 w-8 p-0"
          >
            <ZoomIn className="w-3 h-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={resetView}
            className="bg-card/90 backdrop-blur-sm hover:bg-card border-lavender/30 text-royal hover:border-lavender h-8 w-8 p-0"
          >
            <RotateCcw className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Page Counter - Desktop */}
      <div className="hidden md:block absolute top-4 left-4 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium z-20 shadow-lavender border border-lavender/30">
        <span className="text-royal">Page {currentPage + 1} of {pages.length}</span>
      </div>

      {/* Flip indicator */}
      {isFlipping && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
          <div className="bg-card/95 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-mystical border border-lavender/40 animate-pulse">
            <span className="text-royal font-medium text-xs md:text-sm">
              {flipDirection === 'next' ? 'Turning page...' : 'Going back...'}
            </span>
          </div>
        </div>
      )}

        {/* Main Book Container */}
        <div 
          ref={containerRef}
          className="relative h-[70vh] md:h-[80vh] overflow-hidden"
          style={{ perspective: '1200px' }}
        >
          {/* Book Pages Container */}
          <div 
            className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Desktop Layout - Two Pages Side by Side */}
            <div className="hidden md:block absolute inset-0">
              {/* Left Page (Previous) */}
              <div className="absolute left-0 w-1/2 h-full flex items-center justify-center">
                <div className="relative w-full h-full max-w-lg max-h-full">
                  <div className="absolute inset-6 bg-white rounded-l-lg page-shadow-left overflow-hidden border-r-2 border-lavender/40 page-texture">
                    {currentPage > 0 ? (
                      <>
                        <img
                          src={pages[currentPage - 1]}
                          alt={`Menu page ${currentPage}`}
                          className="w-full h-full object-contain opacity-95"
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-royal/5 pointer-events-none"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-1 book-gutter"></div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-lavender/5 to-royal/5 flex items-center justify-center">
                        <div className="text-royal/30 text-lg font-serif">Cover</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Page (Current) */}
              <div className="absolute right-0 w-1/2 h-full flex items-center justify-center">
                <div className="relative w-full h-full max-w-lg max-h-full">
                  <div className="absolute inset-6 bg-white rounded-r-lg page-shadow-right overflow-hidden border-l-2 border-lavender/40 page-texture page-hover-effect">
                    <img
                      src={pages[currentPage]}
                      alt={`Menu page ${currentPage + 1}`}
                      className="w-full h-full object-contain"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-royal/5 pointer-events-none"></div>
                    <div className="absolute left-0 top-0 bottom-0 w-1 book-gutter"></div>
                    
                    {/* Enhanced page curl effect */}
                    <div className="absolute bottom-2 right-2 w-8 h-8 opacity-30">
                      <div className="w-full h-full bg-gradient-to-tl from-lavender/60 via-lavender/30 to-transparent transform rotate-45 shadow-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Layout - Single Page */}
            <div className="md:hidden absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full max-w-sm max-h-full">
                <div className={`absolute inset-3 bg-white rounded-lg shadow-2xl overflow-hidden border-2 border-lavender/40 page-texture transition-all duration-500 ease-out ${
                  isFlipping ? 'scale-95 opacity-70' : 'scale-100 opacity-100'
                }`}>
                  <img
                    src={pages[currentPage]}
                    alt={`Menu page ${currentPage + 1}`}
                    className={`w-full h-full object-contain transition-all duration-300 ease-out ${
                      isFlipping ? 'blur-sm' : 'blur-0'
                    }`}
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-royal/3 pointer-events-none"></div>
                  
                  {/* Mobile page curl effect */}
                  <div className="absolute bottom-1 right-1 w-6 h-6 opacity-30">
                    <div className="w-full h-full bg-gradient-to-tl from-lavender/60 via-lavender/30 to-transparent transform rotate-45 shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Flipping Page Animation - Desktop Only */}
            {isFlipping && (
              <>
                {/* Desktop Flip Animation */}
                <div className="hidden md:block absolute right-0 w-1/2 h-full flex items-center justify-center z-20">
                  <div 
                    className={`relative w-full h-full max-w-md max-h-full transform-gpu ${
                      flipDirection === 'next' ? 'animate-flip-next' : 'animate-flip-prev'
                    }`}
                    style={{
                      transformStyle: 'preserve-3d',
                      transformOrigin: 'left center'
                    }}
                  >
                    {/* Front of flipping page */}
                    <div className="absolute inset-4 bg-white rounded-r-lg shadow-2xl overflow-hidden backface-hidden page-texture border-l-2 border-lavender/40">
                      <img
                        src={pages[flipDirection === 'next' ? currentPage : (currentPage < pages.length - 1 ? currentPage + 1 : currentPage)]}
                        alt="Flipping page front"
                        className="w-full h-full object-contain"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-royal/5 pointer-events-none"></div>
                      <div className="absolute left-0 top-0 bottom-0 w-1 book-gutter"></div>
                      
                      {/* Dynamic shadow during flip */}
                      <div className="absolute inset-0 bg-gradient-to-r from-royal/20 via-transparent to-transparent pointer-events-none opacity-50"></div>
                    </div>
                    
                    {/* Back of flipping page */}
                    <div 
                      className="absolute inset-4 bg-white rounded-l-lg shadow-2xl overflow-hidden backface-hidden page-texture border-r-2 border-lavender/40"
                      style={{ transform: 'rotateY(180deg)' }}
                    >
                      <img
                        src={pages[flipDirection === 'next' ? (currentPage < pages.length - 1 ? currentPage + 1 : currentPage) : (currentPage > 0 ? currentPage - 1 : currentPage)]}
                        alt="Flipping page back"
                        className="w-full h-full object-contain transform scale-x-[-1]"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-royal/5 pointer-events-none"></div>
                      <div className="absolute right-0 top-0 bottom-0 w-1 book-gutter"></div>
                      
                      {/* Back side shadow */}
                      <div className="absolute inset-0 bg-gradient-to-l from-royal/20 via-transparent to-transparent pointer-events-none opacity-50"></div>
                    </div>
                  </div>
                </div>

                {/* Mobile Flip Animation - Slide Effect */}
                <div className="md:hidden absolute inset-0 flex items-center justify-center z-20">
                  <div className="relative w-full h-full max-w-sm max-h-full">
                    <div className={`absolute inset-3 bg-white rounded-lg shadow-2xl overflow-hidden border-2 border-lavender/40 page-texture transition-all duration-500 ease-out ${
                      flipDirection === 'next' 
                        ? 'animate-slide-in-right' 
                        : 'animate-slide-in-left'
                    }`}>
                      <img
                        src={pages[flipDirection === 'next' ? (currentPage < pages.length - 1 ? currentPage + 1 : currentPage) : (currentPage > 0 ? currentPage - 1 : currentPage)]}
                        alt="Next page preview"
                        className="w-full h-full object-contain"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-royal/3 pointer-events-none"></div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Navigation Areas - Desktop */}
        <button
          onClick={prevPage}
          disabled={currentPage === 0 || isFlipping}
          className="hidden md:block absolute left-0 top-0 bottom-0 w-1/2 bg-transparent hover:bg-royal/5 transition-colors duration-200 disabled:cursor-not-allowed group z-20"
        >
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <ChevronLeft className="w-8 h-8 text-royal drop-shadow-lg" />
          </div>
        </button>

        <button
          onClick={nextPage}
          disabled={currentPage === pages.length - 1 || isFlipping}
          className="hidden md:block absolute right-0 top-0 bottom-0 w-1/2 bg-transparent hover:bg-royal/5 transition-colors duration-200 disabled:cursor-not-allowed group z-20"
        >
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <ChevronRight className="w-8 h-8 text-royal drop-shadow-lg" />
          </div>
        </button>

        {/* Mobile Navigation Areas - Full Width */}
        <button
          onClick={prevPage}
          disabled={currentPage === 0 || isFlipping}
          className="md:hidden absolute left-0 top-12 bottom-16 w-1/3 bg-transparent active:bg-royal/10 transition-colors duration-200 disabled:cursor-not-allowed group z-20"
        >
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-60 group-active:opacity-100 transition-opacity duration-200">
            <ChevronLeft className="w-6 h-6 text-royal drop-shadow-lg" />
          </div>
        </button>

        <button
          onClick={nextPage}
          disabled={currentPage === pages.length - 1 || isFlipping}
          className="md:hidden absolute right-0 top-12 bottom-16 w-1/3 bg-transparent active:bg-royal/10 transition-colors duration-200 disabled:cursor-not-allowed group z-20"
        >
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-60 group-active:opacity-100 transition-opacity duration-200">
            <ChevronRight className="w-6 h-6 text-royal drop-shadow-lg" />
          </div>
        </button>

      {/* Page Thumbnails - Desktop */}
      <div className="hidden md:flex absolute bottom-16 left-1/2 transform -translate-x-1/2 gap-1 bg-card/90 backdrop-blur-sm rounded-full px-3 py-2 z-20 border border-lavender/30">
        {pages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            disabled={isFlipping}
            className={`w-2 h-2 rounded-full transition-all duration-200 disabled:cursor-not-allowed ${
              index === currentPage 
                ? 'bg-lavender scale-125' 
                : 'bg-lavender/40 hover:bg-lavender/70'
            }`}
          />
        ))}
      </div>

      {/* Mobile Page Indicators */}
      <div className="md:hidden absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 bg-card/90 backdrop-blur-sm rounded-full px-2 py-1 z-20 border border-lavender/30">
        {pages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            disabled={isFlipping}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 disabled:cursor-not-allowed ${
              index === currentPage 
                ? 'bg-lavender scale-125' 
                : 'bg-lavender/40 active:bg-lavender/70'
            }`}
          />
        ))}
      </div>
    </div>

      {/* Bottom Navigation - Desktop Only */}
      <div className="hidden md:flex absolute bottom-4 left-1/2 transform -translate-x-1/2 gap-2 z-20">
        <Button
          variant="outline"
          size="sm"
          onClick={prevPage}
          disabled={currentPage === 0 || isFlipping}
          className="bg-card/90 backdrop-blur-sm hover:bg-card border-lavender/30 text-royal hover:border-lavender"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={currentPage === pages.length - 1 || isFlipping}
          className="bg-card/90 backdrop-blur-sm hover:bg-card border-lavender/30 text-royal hover:border-lavender"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

    </div>
  );
};