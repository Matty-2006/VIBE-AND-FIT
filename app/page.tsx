import BrandStory from "@/components/BrandStory";
import Catalog from "@/components/Catalog";
import CTASection from "@/components/CTASection";
import EditorialSplit from "@/components/EditorialSplit";
import GallerySlider from "@/components/GallerySlider";
import HeroSlideshow from "@/components/HeroSlideshow";
import InstagramGallery from "@/components/InstagramGallery";
import Lookbook from "@/components/Lookbook";
import Newsletter from "@/components/Newsletter";
import Testimonials from "@/components/Testimonials";
import TrustBar from "@/components/TrustBar";
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
      <TrustBar />
      <Catalog />
      <GallerySlider />
      <EditorialSplit />
      <CTASection />
      <Lookbook />
      <BrandStory />
      <Testimonials />
      <Newsletter />
      <InstagramGallery />
    </>
  );
}