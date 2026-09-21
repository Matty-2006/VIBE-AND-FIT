import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])';

/**
 * Atrapa el foco mientras `active` está abierto y lo devuelve al elemento que
 * lo tenía antes al cerrar. Los sidebars y el menú móvil declaran role=dialog,
 * así que Tab no debe escaparse al contenido de detrás.
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !active) return;

    const previous = document.activeElement as HTMLElement | null;

    const items = () =>
      Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter(
        (el) => el.offsetParent !== null || el === document.activeElement
      );

    items()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const list = items();
      if (list.length === 0) {
        e.preventDefault();
        return;
      }
      const first = list[0];
      const last = list[list.length - 1];
      const current = document.activeElement;
      if (e.shiftKey) {
        if (current === first || !container.contains(current)) {
          e.preventDefault();
          last.focus();
        }
      } else if (current === last || !container.contains(current)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (previous && typeof previous.focus === "function") {
        previous.focus({ preventScroll: true });
      }
    };
  }, [containerRef, active]);
}