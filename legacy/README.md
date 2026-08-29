# VELURE — Moda Lujo Femenino · Sitio E-Commerce

## Descripción

VELURE es un sitio e-commerce estático de moda lujo femenina. Diseñado con una estética de maison europea (acentos dorados, tipografía serif editorial, paleta crema/negro), todo el contenido está en español e incluye funcionalidad completa de carrito con persistencia en `localStorage`.

## Estructura del Proyecto

```
velure-fashion/
├── index.html                  # Página principal
├── css/
│   ├── variables.css            # Tokens de diseño (colores, tipografía, espaciado)
│   ├── base.css                 # Reset, tipografía base, utilidades
│   ├── animations.css           # Animaciones y keyframes
│   ├── announcement-bar.css     # Barra de anuncio superior
│   ├── navigation.css           # Navegación principal + móvil
│   ├── hero.css                 # Sección hero con slider
│   ├── values.css               # Bloque de valores de marca
│   ├── categories.css           # Grid de categorías
│   ├── products.css             # Tarjetas de producto
│   ├── editorial.css            # Sección editorial / lookbook
│   ├── testimonials.css         # Testimonios
│   ├── stats.css                # Estadísticas de marca
│   ├── newsletter.css           # Formulario newsletter
│   ├── instagram.css            # Feed Instagram
│   ├── footer.css               # Pie de página
│   ├── cart.css                 # Panel lateral del carrito
│   └── responsive.css           # Breakpoints responsive
├── js/
│   ├── data.js                  # Datos de productos, slides hero, etc.
│   ├── cart.js                  # Lógica del carrito (localStorage)
│   ├── hero.js                  # Slider hero + autoplay
│   ├── navigation.js            # Menú móvil + scroll shrink
│   ├── scroll-reveal.js         # Animaciones al scroll
│   ├── products.js              # Renderizado de tarjetas de producto
│   └── app.js                   # Inicialización principal
├── pages/
│   ├── about.html               # Sobre nosotros
│   ├── product-detail.html      # Detalle de producto
│   ├── size-guide.html          # Guía de tallas
│   └── sustainability.html      # Sostenibilidad
├── assets/
│   ├── images/                  # Imágenes locales (vacía – usa Unsplash CDN)
│   ├── icons/
│   │   └── favicon.svg          # Favicon SVG
│   └── fonts/                   # Fuentes locales (vacía – usa Google Fonts CDN)
└── README.md
```

## Cómo Usar

1. Abre `index.html` directamente en tu navegador (no requiere servidor ni build step).
2. Navega entre secciones desde la página principal.
3. Accede a las sub-páginas desde el menú de navegación.
4. Añade productos al carrito — se persiste en `localStorage`.

> **Nota:** Si abres los archivos directamente desde el sistema de archivos (`file://`), los módulos ES pueden requerir un servidor local. En ese caso, usa cualquier servidor estático:
>
> ```bash
> # Con Python
> python -m http.server 8000
>
> # Con Node.js
> npx serve .
> ```

## Tecnologías

- HTML5 semántico
- CSS3 con Custom Properties (variables), Grid, Flexbox
- JavaScript ES Modules (vanilla, sin framework)
- Google Fonts (Playfair Display, Cormorant Garamond, Inter)
- Imágenes vía Unsplash (CDN)

## Personalización

- **Colores y tipografía:** edita `css/variables.css`
- **Productos:** edita el array en `js/data.js`
- **Contenido:** edita directamente los archivos HTML
- **Imágenes:** reemplaza las URLs de Unsplash por las tuyas en `data.js` y HTML

## Licencia

Proyecto de demostración. Todos los derechos reservados © 2026 VELURE.