# Automatic Sliding Wallpaper Carousel

This repository contains an implementation of an automatic sliding wallpaper carousel component for Next.js applications. The carousel provides a seamless, continuously sliding background of images that can be used for hero sections, landing pages, or any part of your application that needs a dynamic visual element.

## Features

- **Automatic Sliding**: Images slide automatically with configurable duration
- **Seamless Looping**: No visible jumps or pauses between cycles
- **Responsive Design**: Works on all screen sizes
- **Customizable Overlay**: Add text overlays and gradient backgrounds
- **Optimized Images**: Uses Next.js Image component for performance

## Implementation

The carousel works by creating a continuous animation that slides through a set of images. The implementation uses:

1. A React component (`WallpaperCarousel.tsx`) that handles the image display and animation
2. CSS animations defined in `globals.css` to create the sliding effect
3. A data file (`carouselImages.ts`) that defines the images to be displayed

## Usage

You can see the carousel in action by visiting:

- The home page: `/`
- The dedicated example page: `/carousel-example`

## Example Code

```tsx
import WallpaperCarousel from "@/components/carousel/WallpaperCarousel";
import { carouselImages } from "@/data/carouselImages";

export default function Page() {
  return (
    <div className="relative min-h-screen">
      {/* The carousel */}
      <div className="absolute inset-0 z-0">
        <WallpaperCarousel
          images={carouselImages}
          duration={30} // 30 seconds for one full cycle
        />
      </div>

      {/* Your content overlaying the carousel */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-white">Your Content Here</h1>
      </div>
    </div>
  );
}
```

## Component Props

| Prop       | Type              | Default              | Description                                 |
| ---------- | ----------------- | -------------------- | ------------------------------------------- |
| `images`   | `CarouselImage[]` | Required             | Array of image objects                      |
| `duration` | `number`          | `20`                 | Duration in seconds for one complete cycle  |
| `height`   | `string`          | `"100vh"`            | CSS height value for the carousel container |
| `overlay`  | `string`          | `linear-gradient...` | CSS background value for the overlay        |

For more detailed documentation, see [docs/wallpaper-carousel.md](docs/wallpaper-carousel.md).
