"use client";

import { gsap } from "@/lib/gsap";

/**
 * Animates a cloned "ghost" of the product photo (kept as a rounded
 * rectangle in the product's own aspect ratio, not a cropped circle)
 * flying from the button that was pressed into the cart icon in the
 * navigation bar, then gives the cart icon a satisfying bounce. Respects
 * prefers-reduced-motion (falls back to just bumping the cart icon, no
 * flying element). Sizing and the arc are clamped to the viewport so it
 * also reads well on small mobile screens.
 */
const PRODUCT_ASPECT = 3 / 4;

export function flyToCart(
  sourceEl: HTMLElement | null,
  imageSrc: string,
  onComplete?: () => void
) {
  if (typeof window === "undefined" || !sourceEl) {
    onComplete?.();
    return;
  }

  const cartIcon = document.querySelector<HTMLElement>("[data-cart-icon]");
  if (!cartIcon) {
    onComplete?.();
    return;
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced) {
    bumpCartIcon(cartIcon);
    onComplete?.();
    return;
  }

  const startRect = sourceEl.getBoundingClientRect();
  const endRect = cartIcon.getBoundingClientRect();
  if (startRect.width === 0 || startRect.height === 0) {
    onComplete?.();
    return;
  }

  // Smaller flying thumbnail on phones so it never dwarfs the screen.
  const isSmall = window.innerWidth < 640;
  const width = isSmall ? 66 : 92;
  const height = width / PRODUCT_ASPECT;

  const flyer = document.createElement("div");
  flyer.setAttribute("aria-hidden", "true");
  Object.assign(flyer.style, {
    position: "fixed",
    zIndex: "10001",
    left: "0",
    top: "0",
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: "10px",
    backgroundImage: `url(${imageSrc})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    boxShadow: "0 14px 30px rgba(0,0,0,0.32), 0 0 0 2px rgba(255,255,255,0.7)",
    pointerEvents: "none",
    willChange: "transform, opacity",
  });

  const startX = startRect.left + startRect.width / 2 - width / 2;
  const startY = startRect.top + startRect.height / 2 - height / 2;
  const endX = endRect.left + endRect.width / 2 - width / 2;
  const endY = endRect.top + endRect.height / 2 - height / 2;

  document.body.appendChild(flyer);

  gsap.set(flyer, { x: startX, y: startY, scale: 1, opacity: 1, rotate: 0 });

  // Arc: lift up (and slightly sideways) before diving into the cart icon,
  // simulated as two tweens instead of a motion-path plugin, clamped so
  // the midpoint never drifts off-screen on narrow viewports.
  const margin = 12;
  const maxX = window.innerWidth - width - margin;
  const maxY = window.innerHeight - height - margin;
  const sideBias = endX < startX ? -40 : 40;
  const midX = gsap.utils.clamp(margin, maxX, (startX + endX) / 2 + sideBias);
  const rawMidY =
    Math.min(startY, endY) - Math.max(90, Math.abs(startY - endY) * 0.45 + 40);
  const midY = gsap.utils.clamp(margin, maxY, rawMidY);
  const tilt = gsap.utils.random(-8, 8);

  const tl = gsap.timeline({
    onComplete: () => {
      flyer.remove();
      bumpCartIcon(cartIcon);
      onComplete?.();
    },
  });

  tl.to(flyer, {
    x: midX,
    y: midY,
    scale: 0.86,
    rotate: tilt,
    duration: 0.55,
    ease: "power2.out",
  })
    .to(flyer, {
      x: endX,
      y: endY,
      scale: 0.3,
      rotate: tilt * -0.6,
      duration: 0.62,
      ease: "power1.in",
    })
    .to(
      flyer,
      { opacity: 0, scale: 0.15, duration: 0.16, ease: "power1.in" },
      "-=0.16"
    );
}

function bumpCartIcon(cartIcon: HTMLElement) {
  gsap.fromTo(
    cartIcon,
    { scale: 1 },
    {
      scale: 1.32,
      duration: 0.16,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
      transformOrigin: "50% 50%",
      clearProps: "scale",
    }
  );
}
