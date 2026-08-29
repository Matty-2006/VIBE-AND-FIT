# ISABEL

Ecommerce editorial de moda construido con **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS 4**, **GSAP** y **Lenis**. Una landing de una sola página con hero cinematográfico, catálogo único y pedidos directos por WhatsApp.

## Características

- **Hero cinematográfico**: 10 imágenes que se alternan automáticamente cada 3 segundos en orden aleatorio, con tipografía editorial Playfair Display + Cormorant y acentos en bronce.
- **Catálogo único**: todas las piezas en una sola cuadrícula responsive (5 columnas en PC, 3 en tablet, 2 en móvil), sin categorías ni subpáginas.
- **Carrito y favoritos**: gestionados con Context API y persistidos en `localStorage`.
- **Compra por WhatsApp**: el checkout arma automáticamente el mensaje del pedido (nombre, ciudad y notas) y abre `wa.me` con el número de la tienda.
- **SEO**: `sitemap.xml`, `robots.txt` y metadatos estáticos por producto.
- **Rendimiento**: imágenes optimizadas con Next Image (AVIF/WebP), lazy loading y fuentes locales.

## Stack

| Capa     | Tecnología                        |
| -------- | --------------------------------- |
| Framework| Next.js 16 (App Router) + Turbopack|
| UI       | React 19, Tailwind CSS 4          |
| Anim.    | GSAP + ScrollTrigger, Lenis       |
| Lenguaje | TypeScript 5                      |

## Requisitos

- Node.js **>= 20.9**
- npm o pnpm

## Puesta en marcha

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### Scripts

| Comando            | Descripción                       |
| ------------------ | --------------------------------- |
| `npm run dev`      | Servidor de desarrollo            |
| `npm run build`    | Build de producción               |
| `npm run start`    | Sirve el build de producción      |
| `npm run lint`     | ESLint                            |

## Personalización

- **Productos y textos**: `lib/data.ts` (nombre de la marca, teléfono de WhatsApp, slides del hero, productos, enlaces de navegación).
- **Imágenes**: `public/images/` (`1.jpg` … `10.jpg` para hero y catálogo, `logo.png` para marca y favicon).
- **Colores y tipografías**: `app/globals.css` (paleta ISABEL y fuentes).
- **Número de WhatsApp**: `SITE.whatsapp` (con código de país) y `SITE.whatsappDisplay` en `lib/data.ts`.

## Despliegue en Vercel

1. Sube este repositorio a GitHub (rama `main`).
2. En [vercel.com](https://vercel.com) pulsa **Add New → Project** e importa el repositorio `Matty-2006/ISABEL`.
3. Vercel detecta automáticamente el framework (**Next.js**) gracias a `package.json` y `vercel.json`.
4. Verifica que el framework preseleccionado sea **Next.js**, el comando de build `npm run build` y el Node.js 20.x o 22.x.
5. Pulsa **Deploy**. Al terminar tendrás una URL de producción tipo `https://isabel-XXXX.vercel.app`.

Cada push a `main` genera un despliegue de producción automático; cada Pull Request, un entorno de vista previa.

No se requieren variables de entorno para el funcionamiento básico.

## Estructura

```
app/            Rutas y páginas (layout, home, producto/[id], estáticas y SEO)
components/     Componentes de UI (hero, catálogo, carrito, favovidos, footer…)
context/        Estado global (carrito y favoritos)
lib/            Datos, utilidades de WhatsApp y assets de imagen
legacy/         Prototipo estático anterior (solo referencia)
public/images/  Fotos del hero/catálogo y logo
```