import BrandStory from "@/components/BrandStory";
import Catalog from "@/components/Catalog";
import EditorialSplit from "@/components/EditorialSplit";
import HeroSlideshow from "@/components/HeroSlideshow";
import InstagramGallery from "@/components/InstagramGallery";
import Lookbook from "@/components/Lookbook";
import Newsletter from "@/components/Newsletter";
import Testimonials from "@/components/Testimonials";
import { HERO_SLIDE_COPY, type HeroSlide } from "@/lib/data";
import { numericImageFiles } from "@/lib/images";

function buildSlides(): HeroSlide[] {
  const files = numericImageFiles();
  if (files.length === 0) return [];
  return files.map((src, i) => ({
    src,
    ...HERO_SLIDE_COPY[i % HERO_SLIDE_COPY.length],
  }));
}

export default function HomePage() {
  const slides = buildSlides();

  return (
    <>
      <HeroSlideshow slides={slides} />
      <Catalog />
      <EditorialSplit />
      <Lookbook />
      <BrandStory />
      <Testimonials />
      <Newsletter />
      <InstagramGallery />
    </>
  );
}