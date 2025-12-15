import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import kitchenPhoto from "@/assets/kitchen-menu-photo.jpg";
import organicPhoto from "@/assets/organic-store-photo.jpg";
import blogPhoto from "@/assets/blog-photo.jpg";

const sections = [
  {
    title: "Kitchen Menu",
    link: "/menu",
    image: kitchenPhoto,
  },
  {
    title: "Organic Store",
    link: "/store",
    image: organicPhoto,
  },
  {
    title: "Blog",
    link: "/blogs",
    image: blogPhoto,
  },
];

export const FeaturedSections = () => {
  return (
    <section className="relative -mt-20 overflow-hidden">
      {/* Soft lavender haze transition from hero */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-lavender-light/10 to-transparent pointer-events-none z-10" />
      
      {/* Floating lavender particles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-lavender-light/40 rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-lavender/30 rounded-full animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute top-2/3 left-2/3 w-2 h-2 bg-royal/20 rounded-full animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '2s' }} />
      </div>

      <div className="grid grid-cols-3">
        {sections.map((section, index) => (
          <Link
            key={section.title}
            to={section.link}
            className="group relative h-[35vh] sm:h-[45vh] md:h-[60vh] lg:h-[70vh] overflow-hidden animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${section.image})` }}
            />

            {/* Gradient Overlay - Lavender to Royal Blue */}
            <div className="absolute inset-0 bg-gradient-to-b from-lavender/40 via-royal/30 to-royal/60 md:from-lavender/30 md:via-royal/20 md:to-royal/50" />

            {/* Vignette Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(28,46,140,0.5)_100%)]" />

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-radial from-lavender/0 via-lavender/0 to-lavender/0 group-hover:from-lavender/20 group-hover:via-lavender/5 transition-all duration-700" />

            {/* Content - Bottom Left */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-8 lg:p-12">
              {/* Title */}
              <h3 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-serif text-white mb-1 sm:mb-2 md:mb-3 glow-lavender transform transition-transform duration-500 group-hover:translate-x-2 leading-tight">
                {section.title}
              </h3>
              
              {/* Underline Accent */}
              <div className="w-8 sm:w-12 md:w-20 h-0.5 bg-lavender mb-2 sm:mb-4 md:mb-6 transition-all duration-500 group-hover:w-12 sm:group-hover:w-16 md:group-hover:w-32 group-hover:shadow-lavender" />

              {/* Explore Button */}
              <button className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full bg-lavender/20 backdrop-blur-sm border border-lavender/40 text-white text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-lavender hover:text-lavender-foreground hover:shadow-lavender hover:scale-105 group/btn">
                <span>Explore Now</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
            </div>

            {/* Subtle shimmer on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000" />
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom fade to page background */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-background pointer-events-none" />
    </section>
  );
};
