# ParallaxImage Component

A React component that implements a smooth parallax scrolling effect where an image scales up or down as the user scrolls the page. The image is centered, responsive, and provides an elegant user experience.

## Features

- ✨ Smooth parallax scaling effect based on scroll position
- 📱 Fully responsive design (mobile and desktop)
- ⚡ Performance optimized with requestAnimationFrame and GPU acceleration
- 🎛️ Highly customizable with multiple props
- ♿ Accessibility friendly with proper ARIA labels
- 🎨 Integrates seamlessly with Tailwind CSS
- 🚀 No external dependencies beyond React

## Installation

The component is already included in your project at `client/src/components/ui/parallax-image.tsx`.

## Basic Usage

```tsx
import ParallaxImage from '@/components/ui/parallax-image';

function MyComponent() {
  return (
    <ParallaxImage
      src="https://example.com/image.jpg"
      alt="Description of the image"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **required** | The image URL |
| `alt` | `string` | **required** | Alt text for accessibility |
| `className` | `string` | `undefined` | Additional CSS classes for the image element |
| `containerClassName` | `string` | `undefined` | Additional CSS classes for the container |
| `minScale` | `number` | `1` | Minimum scale value (when not scrolled) |
| `maxScale` | `number` | `1.2` | Maximum scale value (when fully scrolled) |
| `scrollSensitivity` | `number` | `0.5` | How sensitive the effect is to scrolling (0-1) |
| `transitionDuration` | `number` | `0.3` | Duration of the scale transition in seconds |

## Advanced Examples

### Custom Scaling Range
```tsx
<ParallaxImage
  src="/path/to/image.jpg"
  alt="Custom scaling example"
  minScale={0.9}
  maxScale={1.3}
  scrollSensitivity={0.8}
/>
```

### Custom Styling
```tsx
<ParallaxImage
  src="/path/to/image.jpg"
  alt="Custom styling example"
  containerClassName="h-screen rounded-lg shadow-xl"
  className="brightness-75 contrast-125"
  transitionDuration={0.5}
/>
```

### Subtle Effect
```tsx
<ParallaxImage
  src="/path/to/image.jpg"
  alt="Subtle parallax effect"
  minScale={1}
  maxScale={1.05}
  scrollSensitivity={0.3}
  transitionDuration={0.6}
/>
```

## How It Works

1. **Scroll Detection**: Uses `useEffect` and `useState` to track scroll position
2. **Viewport Calculation**: Determines when the image is visible in the viewport
3. **Scale Calculation**: Calculates the scale factor based on scroll progress
4. **Performance Optimization**: Uses `requestAnimationFrame` for smooth animations
5. **GPU Acceleration**: Applies `transform-gpu` class for hardware acceleration

## Performance Considerations

- The component uses `requestAnimationFrame` to throttle scroll events
- GPU acceleration is enabled with `transform-gpu` class
- Passive event listeners are used for better scroll performance
- The effect only calculates when the image is in the viewport

## Accessibility

- Includes proper `role="img"` and `aria-label` attributes
- Provides a fallback `<img>` element for screen readers
- Uses `sr-only` class to hide the fallback image visually
- Supports `loading="lazy"` for better performance

## Browser Support

- Modern browsers that support CSS transforms
- Requires JavaScript enabled
- Gracefully degrades to static image if JavaScript is disabled

## Demo

To see the component in action, you can use the demo component:

```tsx
import ParallaxImageDemo from '@/components/ui/parallax-image-demo';

function App() {
  return <ParallaxImageDemo />;
}
```

## Integration with SalesAIde

The component follows the SalesAIde design system:
- Uses the project's color variables and Tailwind classes
- Integrates with the existing `cn` utility function
- Follows the component structure patterns used in the project
- Compatible with the responsive design approach

## Troubleshooting

**Image not scaling**: Check that the image is in the viewport and scroll sensitivity is appropriate.

**Performance issues**: Reduce scroll sensitivity or increase transition duration.

**Image not loading**: Verify the image URL is accessible and the alt text is provided.

**Styling conflicts**: Use `containerClassName` and `className` props to override default styles.
