# Menu Flipbook Guide

## Overview
The menu page has been redesigned to display as a fully functional flipbook where pages are images that can be easily replaced. This creates an authentic booklet experience for your customers.

## Features

### 🔄 Realistic Flipbook Navigation
- **Click Navigation**: Click left or right side of the book to flip pages with 3D animation
- **Button Controls**: Use Previous/Next buttons at the bottom
- **Thumbnail Navigation**: Click page dots to jump to specific pages
- **Keyboard Support**: Full keyboard navigation support
  - Arrow keys (←→↑↓) or Spacebar to navigate
  - Home/End keys to jump to first/last page
- **Visual Feedback**: Real-time flip indicators and page counter
- **Realistic Animation**: 3D page turning with shadows and perspective

### 🔍 Zoom & Pan
- **Zoom Controls**: Use + and - buttons to zoom in/out (0.5x to 3x)
- **Pan Support**: Drag to move around when zoomed in
- **Reset View**: Click the reset button to return to original view

### 📱 Responsive Design
- Works seamlessly on desktop, tablet, and mobile devices
- Touch-friendly controls for mobile users
- Optimized for different screen sizes

## Managing Menu Images

### Access Image Manager
1. Go to the Menu page
2. Click the "Manage Images" button in the header
3. This opens the image management interface

### Upload New Images
1. Click the upload area or drag files into it
2. Select multiple images at once (PNG, JPG, JPEG)
3. Images are automatically added to your menu

### Organize Pages
- **Reorder**: Use arrow buttons (← →) on each image to change page order
- **Remove**: Click the X button to delete an image
- **Preview**: Click the eye icon to see a full-size preview

### Best Practices
- **Image Quality**: Use high-resolution images (at least 800x1200px)
- **Aspect Ratio**: Portrait orientation (3:4 ratio) works best
- **File Size**: Keep images under 10MB each for optimal loading
- **Page Order**: Upload images in the order you want them to appear

## Technical Implementation

### Components Created
- `MenuFlipbook.tsx` - Main flipbook component with all interactive features
- `MenuImageManager.tsx` - Admin interface for managing menu images
- Updated `Menu.tsx` - Main page with toggle between view and manage modes

### Styling
- Custom CSS animations for page flipping
- Book-like visual effects (spine, shadows, page curl)
- Responsive design with Tailwind CSS
- Amber/orange color scheme for warm, inviting feel

### Realistic Animation Features
- **3D Page Flipping**: Pages rotate in 3D space with proper perspective
- **Dynamic Shadows**: Realistic shadows that change during page turns
- **Book Spine**: Detailed binding with gradient textures
- **Page Texture**: Subtle paper-like texture on all pages
- **Flip Indicators**: Visual feedback showing "Turning page..." during animations
- **Smooth Transitions**: Hardware-accelerated animations for 60fps performance

### Current Setup
The system uses hardcoded menu images stored in `src/assets/`. Replace the placeholder files with your actual menu images. See `MENU_IMAGES_SETUP.md` for detailed instructions.

## Usage Instructions

### For Customers
1. Visit the menu page
2. Click anywhere on the left side to go to previous page
3. Click anywhere on the right side to go to next page
4. Use zoom controls to read fine details
5. Drag to pan around when zoomed in

### For Restaurant Staff
1. Click "Manage Images" to enter admin mode
2. Upload your menu images in order
3. Reorder pages as needed
4. Click "View Menu" to see the customer experience
5. Images are stored locally in the browser session

## Future Enhancements
- Persistent image storage (database integration)
- Bulk upload functionality
- Image editing tools (crop, rotate, adjust)
- Multiple menu versions (lunch, dinner, seasonal)
- Print-friendly export options

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled
- Works offline once images are loaded