# Menu Images Setup Guide

This guide explains how to replace the placeholder menu images with your actual menu images.

## 📁 File Structure

Your menu images should be placed in the `src/assets/` folder alongside other assets like the logo and hero image.

```
src/assets/
├── hero-kumaoni.png          # Existing hero image
├── logoMoonbeam.png          # Existing logo
├── menu-config.ts            # Menu configuration file
├── menu-page-1.jpg           # Your menu page 1 (replace this)
├── menu-page-2.jpg           # Your menu page 2 (replace this)
├── menu-page-3.jpg           # Your menu page 3 (replace this)
├── menu-page-4.jpg           # Your menu page 4 (replace this)
├── menu-page-5.jpg           # Your menu page 5 (replace this)
└── menu-page-6.jpg           # Your menu page 6 (replace this)
```

## 🖼️ Image Requirements

### File Format
- **Recommended**: JPG, PNG, or WebP
- **Size**: Keep under 10MB per image for optimal loading
- **Resolution**: At least 800x1200px for crisp display

### Dimensions
- **Aspect Ratio**: 3:4 (portrait orientation)
- **Example sizes**: 
  - 800x1200px (minimum)
  - 1200x1600px (recommended)
  - 1600x2400px (high quality)

### Content Guidelines
- Ensure text is clear and readable
- Use high contrast for better visibility
- Consider how the image will look when zoomed
- Test readability on mobile devices

## 🔧 Setup Steps

### Step 1: Prepare Your Images
1. Scan or photograph your menu pages
2. Edit them to the correct size and format
3. Name them sequentially:
   - `menu-page-1.jpg` (Cover/Appetizers)
   - `menu-page-2.jpg` (Main Courses)
   - `menu-page-3.jpg` (Vegetarian)
   - `menu-page-4.jpg` (Rice & Biryani)
   - `menu-page-5.jpg` (Breads & Sides)
   - `menu-page-6.jpg` (Desserts & Beverages)

### Step 2: Replace Placeholder Files
1. Navigate to `src/assets/` folder
2. Replace the existing placeholder files with your actual menu images
3. Keep the same file names for automatic detection

### Step 3: Update Configuration (Optional)
If you want to use different file names or add more pages:

1. Open `src/assets/menu-config.ts`
2. Update the import statements:
```typescript
import menuPage1 from './your-custom-name-1.jpg';
import menuPage2 from './your-custom-name-2.jpg';
// ... add more as needed
```

3. Uncomment and update the local images array:
```typescript
export const menuImages = [
  menuPage1,
  menuPage2,
  menuPage3,
  menuPage4,
  menuPage5,
  menuPage6
];
```

4. Comment out the placeholder URLs array

### Step 4: Update Descriptions (Optional)
Update the page descriptions in `menu-config.ts`:
```typescript
export const menuImageDescriptions = [
  "Cover & Appetizers",
  "Main Courses", 
  "Your Custom Section",
  "Another Section",
  "Breads & Sides",
  "Desserts & Beverages"
];
```

## 🎯 Current Setup

The system is currently configured to:
- Use placeholder images from Unsplash
- Display 6 menu pages in the flipbook
- Show realistic page-flipping animations
- Allow admin management through the admin panel

## 🔄 Admin Panel Features

Access the admin panel at `/admin` to:
- Preview the current menu flipbook
- Upload new images (saved to local storage)
- Reorder menu pages
- Test the flipbook functionality

## 📱 Testing Your Images

After replacing the images:
1. Visit the menu page (`/menu`)
2. Test the flipbook functionality
3. Check zoom and pan features
4. Verify readability on different screen sizes
5. Test on mobile devices

## 🚀 Going Live

Once you're satisfied with your menu images:
1. The images are bundled with your application
2. They load quickly as local assets
3. No external dependencies or database required
4. Works offline once the app is loaded

## 🔧 Troubleshooting

### Images Not Loading
- Check file names match exactly (case-sensitive)
- Verify files are in `src/assets/` folder
- Ensure file formats are supported (JPG, PNG, WebP)

### Poor Image Quality
- Use higher resolution source images
- Check compression settings
- Ensure aspect ratio is maintained

### Slow Loading
- Optimize image file sizes
- Use WebP format for better compression
- Consider progressive JPEG for large images

## 📞 Support

If you need help with image setup:
1. Check the browser console for error messages
2. Verify file paths and names
3. Test with a single image first
4. Ensure images meet the size requirements