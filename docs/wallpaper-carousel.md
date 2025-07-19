# WallpaperCarousel Component

The `WallpaperCarousel` component provides a smooth, automatically sliding image carousel perfect for creating dynamic backgrounds for your website's hero sections, landing pages, or anywhere you want to showcase multiple images in a seamless presentation.

## Features

- Automatic sliding animation with customizable duration
- Seamless looping for continuous playback
- Optional image captions with title and description
- Customizable height and overlay effects
- Responsive design that works on all screen sizes

## Usage

```tsx
import WallpaperCarousel from "@/components/carousel/WallpaperCarousel";
import { carouselImages } from "@/data/carouselImages";

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* The carousel as background */}
      <div className="absolute inset-0 z-0">
        <WallpaperCarousel
          images={carouselImages}
          duration={30} // 30 seconds for one complete cycle
          height="100vh" // Full viewport height
          overlay="linear-gradient(105deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)" // Optional dark overlay
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-5xl font-bold text-white">Your Content Here</h1>
        <p className="text-xl text-white/80 mt-4">
          This content appears above the carousel
        </p>
      </div>
    </div>
  );
}
```

## Props

| Prop       | Type              | Default                  | Description                                                 |
| ---------- | ----------------- | ------------------------ | ----------------------------------------------------------- |
| `images`   | `CarouselImage[]` | Required                 | Array of image objects with id, src, title, and description |
| `duration` | `number`          | `20`                     | Duration in seconds for one complete cycle                  |
| `height`   | `string`          | `"100vh"`                | CSS height value for the carousel container                 |
| `overlay`  | `string`          | `"linear-gradient(...)"` | CSS background value for the overlay on images              |

## Example Page

To see a working example of the WallpaperCarousel component, visit the [Carousel Example page](/carousel-example).

## Implementation Notes

The carousel works by duplicating the images array and using CSS animations to create a seamless sliding effect. When the animation completes one full cycle, it appears to continue smoothly because the duplicated images create a perfect loop.
