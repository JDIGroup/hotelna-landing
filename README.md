# Hotelna Landing Page - Modular Structure

This project has been refactored into a modular, maintainable structure for easier development and customization.

## 📁 Project Structure

### Configuration Files
- `/lib/animations.ts` - Animation configurations and GSAP animation functions
- `/lib/content.ts` - All text content and copy for easy editing
- `/lib/theme.ts` - Theme colors, styles, and utility functions
- `/lib/particle-styles.ts` - Particle system styling and geometric patterns

### Components
- `/components/background-effects.tsx` - Particle system and visual effects
- `/components/main-content.tsx` - Main page content (header, form, footer)

### Hooks
- `/hooks/use-animations.ts` - Custom hook for animation management

### Styles
- `/styles/animations.css` - Custom CSS animations for particles

## 🎨 Customizing Content

### Changing Text Content
Edit `/lib/content.ts` to modify:
- Brand name and taglines
- Form labels and messages
- Footer text
- Social media links

```typescript
export const content = {
  brand: {
    name: "Hotelna",
    tagline: "Where Your Vision Becomes Our Hotel",
    // ... more content
  }
}
```

### Updating Theme Colors
Edit `/lib/theme.ts` to customize:
- Color palette
- Light/dark theme variations
- Gradients and effects

```typescript
export const themeConfig = {
  colors: {
    primary: "#d5b15f", // Gold
    secondary: "#cfc0ae", // Light beige
    accent: "#2f4763", // Navy blue
    // ... more colors
  }
}
```

## ⚡ Animation Configuration

### Animation Settings
Edit `/lib/animations.ts` to adjust:
- Animation durations
- Easing functions
- Particle behavior
- Interaction sensitivity

```typescript
export const animationConfig = {
  particles: {
    count: 12,
    influenceRadius: 250,
    // ... more settings
  }
}
```

### Particle Styles
Edit `/lib/particle-styles.ts` to modify:
- Particle sizes and shapes
- Colors and gradients
- Geometric patterns

## 🔧 Component Usage

### Background Effects
```tsx
<BackgroundEffects
  isDark={isDark}
  mousePosition={mousePosition}
  particlesRef={particlesRef}
  clickRipples={clickRipples}
/>
```

### Main Content
```tsx
<MainContent
  isDark={isDark}
  setIsDark={setIsDark}
  gsapRef={gsapRef}
  themeStyles={themeStyles}
/>
```

### Animation Hook
```tsx
const { containerRef, particlesRef, gsapRef, handleClick } = useAnimations({
  isDark,
  mousePosition,
  setClickRipples,
})
```

## 🚀 Development Benefits

1. **Separation of Concerns**: Logic, content, and styling are separate
2. **Easy Customization**: Change content without touching animation code
3. **Reusable Components**: Components can be used in other projects
4. **Type Safety**: Full TypeScript support for all configurations
5. **Performance**: Optimized animation handling and memory management

## 📝 Making Changes

### To update text content:
1. Edit `/lib/content.ts`
2. No other files need to be touched

### To adjust animations:
1. Edit `/lib/animations.ts` for timing and behavior
2. Edit `/lib/particle-styles.ts` for visual appearance

### To modify theme:
1. Edit `/lib/theme.ts` for colors and styles
2. Changes apply automatically to all components

### To add new particles or effects:
1. Add new patterns to `/lib/particle-styles.ts`
2. Update particle count in `/lib/animations.ts`

## 🎯 Key Features

- **Modular Architecture**: Easy to maintain and extend
- **Performance Optimized**: Efficient animation handling
- **Responsive Design**: Works on all device sizes
- **Theme System**: Easy light/dark mode switching
- **Type Safe**: Full TypeScript coverage
- **GSAP Integration**: Smooth, hardware-accelerated animations
