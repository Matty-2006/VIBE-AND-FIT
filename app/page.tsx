import BestSellers from "@/components/BestSellers";
import BrandStory from "@/components/BrandStory";
import Catalog from "@/components/Catalog";
import CTASection from "@/components/CTASection";
import Divider from "@/components/Divider";
import EditorialSplit from "@/components/EditorialSplit";
import GallerySlider from "@/components/GallerySlider";
import HeroSlideshow from "@/components/HeroSlideshow";
import InstagramGallery from "@/components/InstagramGallery";
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
      <Divider />
      <Catalog />
      <GallerySlider />
      <Divider />
      <EditorialSplit />
      <CTASection />
      <BestSellers />
      <BrandStory />
      <Divider />
      <Testimonials />
      <Newsletter />
      <InstagramGallery />
    </>
  );
}