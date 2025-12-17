// Menu images configuration
// These are placeholder images - replace with your actual menu images

// Import menu images (you'll need to add actual menu image files here)
import menuPage1 from './menu-page-1.jpg';
import menuPage2 from './menu-page-2.jpg';
import menuPage3 from './menu-page-3.jpg';
import menuPage4 from './menu-page-4.jpg';
import menuPage5 from './menu-page-5.jpg';
import menuPage6 from './menu-page-6.jpg';

// For now, using placeholder URLs until actual images are added
export const menuImages = [
  // Page 1 - Cover/Appetizers
  "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=1200&fit=crop&crop=center&q=80",
  
  // Page 2 - Main Courses
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=1200&fit=crop&crop=center&q=80",
  
  // Page 3 - Vegetarian Dishes
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=1200&fit=crop&crop=center&q=80",
  
  // Page 4 - Rice & Biryani
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=1200&fit=crop&crop=center&q=80",
  
  // Page 5 - Breads & Sides
  "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&h=1200&fit=crop&crop=center&q=80",
  
  // Page 6 - Desserts & Beverages
  "https://images.unsplash.com/photo-1565299585323-38174c4a6471?w=800&h=1200&fit=crop&crop=center&q=80"
];

// When you add actual menu images to src/assets/, uncomment this and comment out the above:
/*
export const menuImages = [
  menuPage1,
  menuPage2,
  menuPage3,
  menuPage4,
  menuPage5,
  menuPage6
];
*/

export const menuImageDescriptions = [
  "Cover & Appetizers",
  "Main Courses",
  "Vegetarian Specialties", 
  "Rice & Biryani",
  "Breads & Sides",
  "Desserts & Beverages"
];

// Default menu configuration
export const menuConfig = {
  title: "Kumaoni Cuisine Menu",
  subtitle: "Authentic flavors from the Himalayas",
  pages: menuImages,
  descriptions: menuImageDescriptions
};