<div align="center">

# Vibe & Fit 🌿

**Moda de mujer y deportiva con estilo propio — viste bien en cada momento.**

[🌐 Ver la página en producción](https://vibe-and-fit.vercel.app)

Sitio web oficial de **Vibe & Fit**: una marca de ropa **de mujer y deportiva**
con una estética limpia, contemporánea y editorial. Desde vestidos y blusas
hasta la línea deportiva, cada pieza está pensada para que la ropa sea la
protagonista: siluetas atemporales, tejidos nobles y colores en tonos tierra,
bronce y crema.

</div>

---

## 🚀 Ver la página desplegada

La página está **desplegada en producción** en este enlace:

### 👉 https://vibe-and-fit.vercel.app

Ábrelo en cualquier navegador para ver la página completa funcionando
(mientras mantengas este código sincronizado con el deploy de Vercel).

> Para ver la versión más reciente siempre que haya cambios, el deploy se
> actualiza automáticamente al hacer **push** a la rama `main` de este
> repositorio.

---

## 📖 ¿Qué es Vibe & Fit?

Vibe & Fit es una marca de **ropa de mujer y deportiva** que apuesta por un
estilo **contemporáneo y con actitud**: siluetas clásicas, comodidad real y
una presencia que llama la atención sin gritar. La web funciona como un
**catálogo en la landing** donde cada pieza se puede ver, añadir al carrito y
pedir de forma directa por WhatsApp, sin precios en pantalla.

## ✨ Características de la página

- 🎬 **Hero cinematográfico**: imágenes de campaña que se alternan cada 3 segundos con tipografía editorial y acentos en bronce.
- 🧭 **Categorías en la landing**: «Ropa de Mujer» (todas las piezas) y «Deportiva», bien ordenadas y responsive.
- 🛍️ **Catálogo único**: cuadrícula responsive (5 columnas en PC, 3 en tablet, 2 en móvil) con tarjetas alineadas.
- 🛒 **Carrito y favoritos** con estado persistente (localStorage).
- 📲 **Pedido por WhatsApp**: el checkout arma automáticamente el pedido (nombre, ciudad y notas) y abre tu WhatsApp al número de la tienda.
- 🪄 **Animaciones fluidas** con GSAP + Lenis (scroll suave).
- 🖼️ **Imágenes optimizadas** (WebP/AVIF) con Next Image y lazy loading.
- 🔍 **SEO**: metadatos por producto, Open Graph, sitemap y `robots.txt`.
- 📱 **Diseño responsive y optimizado**: paleta crema/claro con detalles en bronce, sin precios y sin distracciones.

---

## 🛠️ Tecnologías

- **[Next.js 16](https://nextjs.org)** (App Router + Turbopack) — framework React.
- **[React 19](https://react.dev)** — interfaz de usuario.
- **[Tailwind CSS 4](https://tailwindcss.com)** — estilos.
- **[GSAP](https://gsap.com)** + **[ScrollTrigger](https://gsap.com/scrolltrigger/)** — animaciones.
- **[Lenis](https://lenis.darkroom.engineering/)** — scroll suave.
- **[TypeScript](https://www.typescriptlang.org/)** — tipado seguro.
- Desplegado en **[Vercel](https://vercel.com)**.

---

## 🧑‍💻 Desarrollo local

Requisitos: **Node.js 20.9+** y **npm**.

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el
resultado. La página se actualiza automáticamente al editar los archivos.

**Otros comandos:**

```bash
npm run build    # Compilar versión de producción
npm run start    # Servir la versión de producción compilada
npm run lint     # Revisar estilo/lint del código
```

### 📁 Estructura

```
app/            # Páginas y layout de Next.js (App Router)
  page.tsx      # Página principal (landing)
  layout.tsx    # Layout + metadatos SEO
  globals.css   # Estilos globales y paleta Vibe & Fit
  producto/     # Página de detalle de cada pieza
components/     # Componentes React (Hero, Categorías, Catálogo, Carrito, Footer...)
context/        # Estado global (carrito y favoritos)
lib/            # Datos, utilidades de WhatsApp y assets
public/images/  # Fotos del hero/catálogo y logo
legacy/         # Prototipo estático anterior (solo referencia)
```

---

## ✏️ Personalización

- **Productos, textos y teléfono**: edita `lib/data.ts` (marca, número de WhatsApp, slides del hero, productos, enlaces y categorías).
- **Imágenes**: reemplaza los archivos de `public/images/` (`1.jpg` … `10.jpg` y `logo.png`).
- **Paleta y tipografías**: `app/globals.css`.
- **Número de WhatsApp**: `SITE.whatsapp` (con código de país, `593…`) en `lib/data.ts`; se usa en el botón flotante, el carrito y el footer.

---

## ☁️ Deploy en producción

Esta página está desplegada en **Vercel**. Para hacer un deploy:

1. Empuja los cambios a este repositorio:

   ```bash
   git add .
   git commit -m "descripción del cambio"
   git push origin main
   ```

2. Vercel detecta el push y genera el deploy automáticamente.

3. Tu página queda disponible en **https://vibe-and-fit.vercel.app**.

> El flujo estándar es: **cambios → push a `main` → deploy automático →**
> **ver el resultado en producción**.

---

## 📞 Contacto

- **Marca:** Vibe & Fit
- **WhatsApp:** [+593 098 533 5586](https://wa.me/593985335586)

<div align="center">

**Vibe & Fit** — *Estilo que se mueve contigo.*

</div>