import SmoothScrollSlider from "@/components/SmoothScrollSlider";
import SectionHeader from "@/components/SectionHeader";
import { SITE } from "@/lib/data";
import { numericImageFiles } from "@/lib/images";

export default function GallerySlider() {
  const files = numericImageFiles();
  if (files.length === 0) return null;

  const images = files.map((src, i) => ({
    image: { src, alt: `${SITE.name} — estilismo ${i + 1}` },
    offsetY: ((i % 5) - 2) * 26,
  }));

  return (
    <section className="bg-black py-24">
      <div className="container">
        <SectionHeader
          dark
          eyebrow="Galería en movimiento"
          titleBefore="Piezas que"
          titleEm="fluyen"
          description="Desliza, arrastra o usa la rueda para mover la colección."
        />
      </div>
      <div className="h-[420px] w-full sm:h-[460px]">
        <SmoothScrollSlider
          images={images}
          slideWidth={300}
          slideHeight={400}
          spacing={2.5}
          direction="left"
          smoothness={10}
          radius={18}
          dim={16}
          background="#000000"
          sensitivity={4}
        />
      </div>
    </section>
  );
}