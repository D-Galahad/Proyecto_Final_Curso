const products = [
  // SMARTPHONES
  {
    id: '1',
    name: 'iPhone 15 Pro',
    price: 1199.99,
    category: 'Smartphones',
    stock: 15,
    rating: 4.8,
    image: '/artifacts/iphone_15_pro_1769012287496.png',
    description: 'Smartphone premium con chip A17 Pro, cámara de 48MP y diseño en titanio. Experiencia fotográfica profesional.',
    specs: ['256GB', 'Titanio Azul', '5G', 'Chip A17 Pro']
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    price: 1099.99,
    category: 'Smartphones',
    stock: 12,
    rating: 4.7,
    image: '/artifacts/samsung_s24_ultra_1769012318568.png',
    description: 'Smartphone con S Pen integrado, pantalla AMOLED 2X y cámara de 200MP. La productividad perfecta.',
    specs: ['512GB', 'Titanio Gris', '5G', 'S Pen incluido']
  },
  {
    id: '3',
    name: 'Google Pixel 8 Pro',
    price: 899.99,
    category: 'Smartphones',
    stock: 20,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop',
    description: 'Android puro con IA avanzada de Google. Fotografía computacional de última generación.',
    specs: ['128GB', 'Obsidian', '5G', 'Google Tensor G3']
  },

  // LAPTOPS
  {
    id: '4',
    name: 'MacBook Pro M3',
    price: 2499.99,
    category: 'Laptops',
    stock: 8,
    rating: 4.9,
    image: '/artifacts/macbook_pro_m3_1769012351697.png',
    description: 'Laptop profesional con chip M3, pantalla Liquid Retina XDR y hasta 22 horas de batería.',
    specs: ['16GB RAM', '512GB SSD', 'M3 Pro', '14.2"']
  },
  {
    id: '5',
    name: 'Dell XPS 15',
    price: 1799.99,
    category: 'Laptops',
    stock: 10,
    rating: 4.5,
    image: '/artifacts/dell_xps_15_1769012382381.png',
    description: 'Potencia Windows con pantalla InfinityEdge 4K y diseño ultradelgado en aluminio premium.',
    specs: ['32GB RAM', '1TB SSD', 'Intel i9', '15.6" 4K']
  },
  {
    id: '6',
    name: 'Lenovo ThinkPad X1 Carbon',
    price: 1599.99,
    category: 'Laptops',
    stock: 7,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop',
    description: 'Laptop empresarial ultraligero con certificación militar y teclado legendario.',
    specs: ['16GB RAM', '512GB SSD', 'Intel i7', '14" WUXGA']
  },
  {
    id: '7',
    name: 'ASUS ROG Zephyrus G16',
    price: 2299.99,
    category: 'Laptops',
    stock: 5,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop',
    description: 'Laptop gaming premium con RTX 4070, pantalla 240Hz y diseño elegante y portátil.',
    specs: ['32GB RAM', '1TB SSD', 'RTX 4070', '16" QHD+']
  },

  // AUDIO
  {
    id: '8',
    name: 'AirPods Pro (2ª Gen)',
    price: 279.99,
    category: 'Audio',
    stock: 25,
    rating: 4.8,
    image: '/artifacts/airpods_pro_1769012411233.png',
    description: 'Auriculares inalámbricos con cancelación activa de ruido adaptativa y audio espacial.',
    specs: ['USB-C', 'H2 Chip', 'MagSafe', 'Resistentes al agua']
  },
  {
    id: '9',
    name: 'Sony WH-1000XM5',
    price: 349.99,
    category: 'Audio',
    stock: 18,
    rating: 4.9,
    image: '/artifacts/sony_wh1000xm5_1769012456086.png',
    description: 'Los mejores auriculares con cancelación de ruido del mercado. 30 horas de batería.',
    specs: ['Bluetooth 5.2', 'Multipoint', '30h batería', 'LDAC']
  },
  {
    id: '10',
    name: 'Bose QuietComfort 45',
    price: 299.99,
    category: 'Audio',
    stock: 14,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&h=300&fit=crop',
    description: 'Comodidad legendaria con cancelación de ruido de clase mundial para viajes largos.',
    specs: ['Bluetooth 5.1', '24h batería', 'ANC', 'Ultraligeros']
  },
  {
    id: '11',
    name: 'JBL Flip 6',
    price: 119.99,
    category: 'Audio',
    stock: 30,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
    description: 'Altavoz Bluetooth portátil resistente al agua con sonido potente y graves profundos.',
    specs: ['IP67', '12h batería', 'PartyBoost', 'Portable']
  },

  // GAMING
  {
    id: '12',
    name: 'PlayStation 5',
    price: 549.99,
    category: 'Gaming',
    stock: 6,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop',
    description: 'Consola de nueva generación con SSD ultrarrápido, ray tracing y DualSense innovador.',
    specs: ['1TB SSD', 'Ray Tracing', '4K/120fps', 'DualSense']
  },
  {
    id: '13',
    name: 'Xbox Series X',
    price: 499.99,
    category: 'Gaming',
    stock: 8,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&h=300&fit=crop',
    description: 'La Xbox más potente jamás creada con Game Pass y compatibilidad total.',
    specs: ['1TB SSD', '12 TFLOPS', '4K/120fps', 'Quick Resume']
  },
  {
    id: '14',
    name: 'Nintendo Switch OLED',
    price: 349.99,
    category: 'Gaming',
    stock: 15,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=300&fit=crop',
    description: 'Consola híbrida con pantalla OLED vibrante de 7 pulgadas. Juega donde quieras.',
    specs: ['64GB', 'Pantalla OLED', 'Portátil', 'Joy-Con']
  },
  {
    id: '15',
    name: 'Steam Deck OLED',
    price: 649.99,
    category: 'Gaming',
    stock: 4,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1625805866449-3589fe3f6d40?w=400&h=300&fit=crop',
    description: 'PC gaming portátil con pantalla OLED HDR y acceso a toda tu biblioteca de Steam.',
    specs: ['1TB SSD', 'OLED HDR', 'AMD RDNA 2', 'Portátil']
  },

  // ACCESORIOS
  {
    id: '16',
    name: 'Logitech MX Master 3S',
    price: 99.99,
    category: 'Accesorios',
    stock: 22,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
    description: 'El ratón definitivo para productividad con scroll electromagnético y 8000 DPI.',
    specs: ['8000 DPI', 'Multi-dispositivo', '70 días batería', 'Ergonómico']
  },
  {
    id: '17',
    name: 'Apple Watch Series 9',
    price: 429.99,
    category: 'Accesorios',
    stock: 16,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=300&fit=crop',
    description: 'Smartwatch con chip S9, pantalla always-on y seguimiento avanzado de salud.',
    specs: ['GPS + Cellular', 'Always-On', 'ECG', '18h batería']
  },
  {
    id: '18',
    name: 'Keychron K8 Pro',
    price: 109.99,
    category: 'Accesorios',
    stock: 19,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop',
    description: 'Teclado mecánico inalámbrico hot-swappable con switches Gateron y RGB.',
    specs: ['Hot-swappable', 'Wireless', 'RGB', 'Switches Gateron']
  },
  {
    id: '19',
    name: 'SanDisk Extreme Pro 2TB',
    price: 189.99,
    category: 'Accesorios',
    stock: 28,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop',
    description: 'SSD externo de alto rendimiento con 2000 MB/s, resistente y compacto.',
    specs: ['2TB', '2000 MB/s', 'IP55', 'USB-C 3.2']
  },
  {
    id: '20',
    name: 'Anker 737 Power Bank',
    price: 149.99,
    category: 'Accesorios',
    stock: 24,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=300&fit=crop',
    description: 'Batería externa de 24000mAh con carga rápida de 140W para laptops y smartphones.',
    specs: ['24000mAh', '140W PD', '3 puertos', 'Display LED']
  }
]

export default products
