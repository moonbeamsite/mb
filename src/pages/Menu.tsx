import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MenuFlipbook } from "@/components/MenuFlipbook";
import { menuConfig } from "@/assets/menu-config";

const Menu = () => {
  // Use hardcoded menu images from config
  const menuPages = menuConfig.pages;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-lavender-light/5 to-royal/5">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 md:pt-32 pb-8 md:pb-16">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-royal glow-lavender">
            {menuConfig.title}
          </h1>
          <p className="text-lg md:text-xl text-lavender max-w-2xl mx-auto mb-6 md:mb-8 font-serif">
            {menuConfig.subtitle}
          </p>
          
          {/* Desktop Instructions */}
          <p className="hidden md:block text-sm text-royal bg-lavender/10 border border-lavender/30 inline-block px-4 py-2 rounded-full backdrop-blur-sm">
            Click or use arrow keys to flip through pages • Zoom in for details
          </p>
          
          {/* Mobile Instructions */}
          <p className="md:hidden text-xs text-royal bg-lavender/10 border border-lavender/30 inline-block px-3 py-1.5 rounded-full backdrop-blur-sm">
            Tap sides to navigate • Pinch to zoom
          </p>
        </div>

        {/* Menu Flipbook */}
        <div className="bg-gradient-to-br from-lavender-light/10 via-background/50 to-royal/5 rounded-xl md:rounded-2xl p-3 md:p-6 shadow-mystical border border-lavender/20 backdrop-blur-sm">
          <MenuFlipbook pages={menuPages} />
        </div>
        
        {/* Instructions - Desktop Only */}
        <div className="hidden md:block mt-8 text-center">
          <div className="inline-flex items-center gap-4 bg-card/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lavender border border-lavender/30">
            <div className="flex items-center gap-2 text-sm text-royal">
              <span className="w-2 h-2 bg-lavender rounded-full"></span>
              Click left/right to navigate
            </div>
            <div className="flex items-center gap-2 text-sm text-royal">
              <span className="w-2 h-2 bg-lavender rounded-full"></span>
              Use zoom controls for details
            </div>
            <div className="flex items-center gap-2 text-sm text-royal">
              <span className="w-2 h-2 bg-lavender rounded-full"></span>
              Drag to pan when zoomed
            </div>
          </div>
        </div>

        {/* Mobile Instructions */}
        <div className="md:hidden mt-4 text-center">
          <div className="flex flex-wrap justify-center gap-2 text-xs text-royal">
            <div className="flex items-center gap-1 bg-card/60 backdrop-blur-sm rounded-full px-2 py-1 border border-lavender/20">
              <span className="w-1 h-1 bg-lavender rounded-full"></span>
              Tap sides to turn pages
            </div>
            <div className="flex items-center gap-1 bg-card/60 backdrop-blur-sm rounded-full px-2 py-1 border border-lavender/20">
              <span className="w-1 h-1 bg-lavender rounded-full"></span>
              Pinch to zoom
            </div>
            <div className="flex items-center gap-1 bg-card/60 backdrop-blur-sm rounded-full px-2 py-1 border border-lavender/20">
              <span className="w-1 h-1 bg-lavender rounded-full"></span>
              Drag when zoomed
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Menu;
