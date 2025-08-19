# Favicon Setup for Hotelna

## 📱 Current Favicon Configuration

The Hotelna landing page now includes a complete favicon setup with the following files:

### Created Files:
- `/public/favicon.svg` - Modern SVG favicon with Hotelna branding
- `/public/safari-pinned-tab.svg` - Safari pinned tab icon
- `/public/site.webmanifest` - PWA manifest file
- `/public/browserconfig.xml` - Windows tile configuration

### Required Files (Need to be generated):
You'll need to create these additional favicon files for complete browser support:

- `/public/favicon.ico` - Traditional ICO format (16x16, 32x32)
- `/public/favicon-16x16.png` - 16x16 PNG favicon
- `/public/favicon-32x32.png` - 32x32 PNG favicon
- `/public/apple-touch-icon.png` - 180x180 Apple touch icon
- `/public/android-chrome-192x192.png` - 192x192 Android icon
- `/public/android-chrome-512x512.png` - 512x512 Android icon
- `/public/mstile-150x150.png` - 150x150 Windows tile

## 🎨 Design Specifications

### Colors Used:
- **Primary Blue**: `#2f4763` (Navy blue background)
- **Gold Accent**: `#d5b15f` (Hotelna brand gold)
- **Light Beige**: `#cfc0ae` (Secondary elements)

### Design Elements:
- Hotel building silhouette representing hospitality
- Letter "H" for Hotelna branding
- Clean, minimal design that works at small sizes
- Brand colors consistent with main site theme

## 🛠️ How to Generate Missing Icons

### Option 1: Online Favicon Generator
1. Use the `/public/favicon.svg` as your source
2. Visit a favicon generator like:
   - https://realfavicongenerator.net/
   - https://favicon.io/
   - https://www.favicon-generator.org/

3. Upload the SVG and generate all required sizes

### Option 2: Manual Creation
Using your preferred design tool (Figma, Photoshop, etc.):

1. **favicon.ico**: Create 16x16 and 32x32 versions
2. **PNG files**: Export in the exact sizes specified
3. **Apple touch icon**: 180x180 with rounded corners optional
4. **Android icons**: 192x192 and 512x512 with proper padding

## 📝 Browser Support

The current configuration supports:
- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile devices (iOS, Android)
- ✅ PWA installation
- ✅ Windows live tiles
- ✅ Safari pinned tabs

## 🔄 Updating Favicons

To update the favicon:
1. Modify `/public/favicon.svg` with new design
2. Regenerate all PNG/ICO versions
3. Keep the same file names for automatic detection
4. Test across different browsers and devices

## 🎯 Brand Consistency

The favicon design maintains Hotelna's brand identity:
- Uses official brand colors
- Incorporates hospitality symbolism
- Maintains readability at small sizes
- Works well on both light and dark backgrounds
