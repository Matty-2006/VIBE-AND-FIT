/* ═══════════════════════════════════════════
   VELURE — Data Layer (Products, Slides, etc.)
   ═══════════════════════════════════════════ */

export const SLIDES = [
    {
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd82?w=1920&q=80',
        tag:   'Colección Otoño 2026',
        title: 'Elegancia Sin Tiempo',
        subtitle: 'Descubre piezas que trascienden las tendencias',
    },
    {
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80',
        tag:   'Nueva Temporada',
        title: 'Refinamiento Moderno',
        subtitle: 'Siluetas que celebran la feminidad contemporánea',
    },
    {
        image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80',
        tag:   'Exclusivo',
        title: 'Lujo Artesanal',
        subtitle: 'Cada pieza cuenta una historia de excelencia',
    },
    {
        image: 'https://images.unsplash.com/photo-1509631179647-0177339c0280?w=1920&q=80',
        tag:   'Edición Limitada',
        title: 'La Arte del Detalle',
        subtitle: 'Confección artesanal para la mujer excepcional',
    },
];

export const CATEGORIES = [
    { name: 'Vestidos',    count: 48, image: 'https://images.unsplash.com/photo-1595777107588-2ddbcfe8e8c2?w=600&q=80' },
    { name: 'Abrigos',     count: 24, image: 'https://images.unsplash.com/photo-1539533113208-f6df5c2c81e3?w=600&q=80' },
    { name: 'Accesorios',  count: 63, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80' },
    { name: 'Calzado',     count: 35, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80' },
];

export const PRODUCTS = [
    /* ─── Vestidos ─── */
    {
        id: 1, name: 'Vestido Seda Midnight', category: 'Vestidos',
        price: 389, oldPrice: null,
        image: 'https://images.unsplash.com/photo-1595777107588-2ddbcfe8e8c2?w=500&q=80',
        badge: 'new', colors: ['#1a1a2e','#c9a96e','#8b2252'],
        tags: ['all','new'],
    },
    {
        id: 2, name: 'Blusa Chantilly Ivory', category: 'Vestidos',
        price: 189, oldPrice: 250,
        image: 'https://images.unsplash.com/photo-1564257631407-4deb1f00d1a1?w=500&q=80',
        badge: 'sale', colors: ['#f8f5f0','#c9a96e','#8b2252'],
        tags: ['all','sale'],
    },
    {
        id: 3, name: 'Pantalón Tailored Noir', category: 'Vestidos',
        price: 225, oldPrice: null,
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&q=80',
        badge: null, colors: ['#1a1a1a','#2c2c2c','#4a4a4a'],
        tags: ['all','best'],
    },
    {
        id: 4, name: 'Vestido Cocktail Rosé', category: 'Vestidos',
        price: 465, oldPrice: 590,
        image: 'https://images.unsplash.com/photo-1515372039744-b8f0547f4cb0?w=500&q=80',
        badge: 'sale', colors: ['#8b2252','#1a1a2e','#c9a96e'],
        tags: ['all','sale','best'],
    },
    {
        id: 9, name: 'Vestido Maxi Eterra', category: 'Vestidos',
        price: 520, oldPrice: null,
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80',
        badge: 'new', colors: ['#f5f0e8','#c9a96e','#1a1a1a'],
        tags: ['all','new'],
    },
    {
        id: 10, name: 'Camisa Lino Mediterránea', category: 'Vestidos',
        price: 165, oldPrice: null,
        image: 'https://images.unsplash.com/photo-1485462537746-965f33a6f566?w=500&q=80',
        badge: null, colors: ['#f8f5f0','#c9a96e','#2c3e50'],
        tags: ['all','best'],
    },

    /* ─── Abrigos ─── */
    {
        id: 5, name: 'Abrigo Camélia Cashmere', category: 'Abrigos',
        price: 520, oldPrice: 680,
        image: 'https://images.unsplash.com/photo-1539533113208-f6df5c2c81e3?w=500&q=80',
        badge: 'sale', colors: ['#d4c5b2','#2c2c2c','#6b4c3b'],
        tags: ['all','sale'],
    },
    {
        id: 11, name: 'Trench Avignon', category: 'Abrigos',
        price: 695, oldPrice: null,
        image: 'https://images.unsplash.com/photo-1509631179647-0177339c0280?w=500&q=80',
        badge: 'new', colors: ['#d4c5b2','#1a1a1a','#8b4513'],
        tags: ['all','new','best'],
    },
    {
        id: 12, name: 'Chaleco Cachemira Bohème', category: 'Abrigos',
        price: 345, oldPrice: null,
        image: 'https://images.unsplash.com/photo-1591042123586-639b2e3b6eb5?w=500&q=80',
        badge: null, colors: ['#d4c5b2','#c9a96e','#2c2c2c'],
        tags: ['all','best'],
    },

    /* ─── Accesorios ─── */
    {
        id: 6, name: 'Bolso Lumière Structured', category: 'Accesorios',
        price: 445, oldPrice: null,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80',
        badge: null, colors: ['#1a1a1a','#c9a96e','#8b4513'],
        tags: ['all','best'],
    },
    {
        id: 7, name: 'Bufanda Cachemira Étoile', category: 'Accesorios',
        price: 175, oldPrice: null,
        image: 'https://images.unsplash.com/photo-1601924994989-69a5297a6e14?w=500&q=80',
        badge: 'new', colors: ['#d4c5b2','#c9a96e','#8b2252'],
        tags: ['all','new'],
    },
    {
        id: 13, name: 'Collar Perla de Oriente', category: 'Accesorios',
        price: 285, oldPrice: null,
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80',
        badge: 'new', colors: ['#f5f0e8','#c9a96e','#1a1a1a'],
        tags: ['all','new'],
    },
    {
        id: 14, name: 'Gafas de Sol Velours', category: 'Accesorios',
        price: 195, oldPrice: 260,
        image: 'https://images.unsplash.com/photo-1511499754951-2af74917b3b6?w=500&q=80',
        badge: 'sale', colors: ['#1a1a1a','#8b4513','#c9a96e'],
        tags: ['all','sale'],
    },

    /* ─── Calzado ─── */
    {
        id: 8, name: 'Sandalias Riviera Doradas', category: 'Calzado',
        price: 265, oldPrice: null,
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80',
        badge: 'new', colors: ['#c9a96e','#c0c0c0','#1a1a1a'],
        tags: ['all','new','best'],
    },
    {
        id: 15, name: 'Botines Cuero Toscana', category: 'Calzado',
        price: 395, oldPrice: null,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264fd23e?w=500&q=80',
        badge: null, colors: ['#6b4c3b','#1a1a1a','#d4c5b2'],
        tags: ['all','best'],
    },
    {
        id: 16, name: 'Mocasines Suede París', category: 'Calzado',
        price: 310, oldPrice: 420,
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80',
        badge: 'sale', colors: ['#d4c5b2','#1a1a1a','#8b4513'],
        tags: ['all','sale'],
    },
];

export const TESTIMONIALS = [
    {
        text: 'La calidad de los tejidos es incomparable. Cada prenda se siente como una obra de arte diseñada específicamente para mí. El vestido Seda Midnight me hizo sentir verdaderamente especial en la última gala benéfica..',
        author: 'Isabella M.',
        role:  'Cliente desde 2022',
        stars: 5,
    },
    {
        text: 'VELURE entiende lo que significa vestir con elegancia. Su servicio personalizado hace toda la diferencia en el mundo. El embalaje es una experiencia en sí mismo.',
        author: 'Carolina R.',
        role:  'Cliente desde 2021',
        stars: 5,
    },
    {
        text: 'Desde la primera compra supe que había encontrado mi marca. La atención al detalle en cada costura es simplemente impecable. Mi abrigo Camélia es mi pieza favorita.',
        author: 'Alejandra V.',
        role:  'Cliente desde 2023',
        stars: 5,
    },
    {
        text: 'He probado muchas marcas de lujo, pero VELURE es la única que combina sostenibilidad real con una estética impecable. Me encanta saber que mis prendas tienen un impacto positivo.',
        author: 'Valentina S.',
        role:  'Cliente desde 2022',
        stars: 5,
    },
    {
        text: 'Los botines Toscana son las zapatas más cómodas que he tenido, sin sacrificar ni un ápice de estilo. Recibo cumplidos cada vez que los llevo.',
        author: 'Marta L.',
        role:  'Cliente desde 2024',
        stars: 5,
    },
    {
        text: 'El Bolso Lumière se ha convertido en mi inseparable. La artesanía del cuero es excepcional y el diseño es atemporal. Vale cada céntimo de la inversión.',
        author: 'Eugénie D.',
        role:  'Cliente desde 2023',
        stars: 5,
    },
];

export const STATS = [
    { number: '15K+', label: 'Clientes Satisfechas' },
    { number: '200+', label: 'Diseños Exclusivos' },
    { number: '12',  label: 'Países' },
    { number: '98%', label: 'Satisfacción' },
];

export const INSTAGRAM = [
    'https://images.unsplash.com/photo-1515886657614-81f7db93a3c6?w=400&q=80',
    'https://images.unsplash.com/photo-1529139574466-a834d7b727a0?w=400&q=80',
    'https://images.unsplash.com/photo-1485968579580-d6fb5a8d2006?w=400&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd82?w=400&q=80',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80',
    'https://images.unsplash.com/photo-1509631179647-0177339c0280?w=400&q=80',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80',
    'https://images.unsplash.com/photo-1595777107588-2ddbcfe8e8c2?w=400&q=80',
];