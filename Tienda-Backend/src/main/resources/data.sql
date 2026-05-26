-- ============================================================
-- data.sql  —  Datos de prueba para TechStore
-- Adaptado a las entidades JPA del proyecto Spring Boot
--
-- Tablas generadas por Hibernate (ddl-auto=update):
--   roles, users, users_roles, productos, carts, cart_items
--
-- Credenciales de prueba:
--   admin      / admin123  → ROLE_ADMIN + ROLE_USER (Administrador)
--   carlos     / user123   → ROLE_USER  (Comprador Premium)
--   laura      / user123   → ROLE_USER  (Comprador Premium)
--   sofia      / user123   → ROLE_USER  (Comprador Activo)
--   miguel     / user123   → ROLE_USER  (Comprador Frecuente)
--   ana        / user123   → ROLE_USER  (Comprador Ocasional)
--   david      / user123   → ROLE_USER  (Nuevo Usuario)
--   patricia   / user123   → ROLE_USER  (Comprador VIP)
--
-- Hashes BCrypt (coste 10):
--   admin123 → $2a$10$7QIhkk4fkJHJ8yp.sxdYx.Cr5HCf9CbDLFPHBmb.sdWLBNMiS19gy
--   user123  → $2a$10$LZGiyJ5DOlFZ.DRfXf5LsupV.p3kQ.lI6JcZb5PYdT9mQfVDnCK6a
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;

-- ------------------------------------------------------------
-- ROLES
-- El enum Roles define: ROLE_ADMIN, ROLE_USER
-- Columna `name` es VARCHAR con EnumType.STRING
-- ------------------------------------------------------------
DELETE FROM roles;

INSERT INTO roles (id, name) VALUES
  (1, 'ROLE_ADMIN'),
  (2, 'ROLE_USER');

-- ------------------------------------------------------------
-- USERS
-- Campos: id, name, lastname, email, username, admin, password
-- El @PostConstruct crea admin/user si no existen,
-- este script los precarga para tener más usuarios de prueba.
-- Total: 1 admin + 7 usuarios regulares
-- 
-- Hashes BCrypt (coste 10):
--   admin123 → $2a$10$7QIhkk4fkJHJ8yp.sxdYx.Cr5HCf9CbDLFPHBmb.sdWLBNMiS19gy
--   user123  → $2a$10$LZGiyJ5DOlFZ.DRfXf5LsupV.p3kQ.lI6JcZb5PYdT9mQfVDnCK6a
-- ------------------------------------------------------------
DELETE FROM users;

INSERT INTO users (id, name, lastname, email, username, admin, password) VALUES
  (1, 'Admin',      'Administrator',  'admin@techstore.com',      'admin',     true,  '$2a$10$7QIhkk4fkJHJ8yp.sxdYx.Cr5HCf9CbDLFPHBmb.sdWLBNMiS19gy'),
  (2, 'Carlos',     'García López',    'carlos@techstore.com',     'carlos',    false, '$2a$10$LZGiyJ5DOlFZ.DRfXf5LsupV.p3kQ.lI6JcZb5PYdT9mQfVDnCK6a'),
  (3, 'Laura',      'Martínez Ruiz',   'laura@techstore.com',      'laura',     false, '$2a$10$LZGiyJ5DOlFZ.DRfXf5LsupV.p3kQ.lI6JcZb5PYdT9mQfVDnCK6a'),
  (4, 'Sofía',      'Fernández Silva', 'sofia@techstore.com',      'sofia',     false, '$2a$10$LZGiyJ5DOlFZ.DRfXf5LsupV.p3kQ.lI6JcZb5PYdT9mQfVDnCK6a'),
  (5, 'Miguel',     'López González',  'miguel@techstore.com',     'miguel',    false, '$2a$10$LZGiyJ5DOlFZ.DRfXf5LsupV.p3kQ.lI6JcZb5PYdT9mQfVDnCK6a'),
  (6, 'Ana',        'Rodríguez Pérez', 'ana@techstore.com',        'ana',       false, '$2a$10$LZGiyJ5DOlFZ.DRfXf5LsupV.p3kQ.lI6JcZb5PYdT9mQfVDnCK6a'),
  (7, 'David',      'Sánchez Torres',  'david@techstore.com',      'david',     false, '$2a$10$LZGiyJ5DOlFZ.DRfXf5LsupV.p3kQ.lI6JcZb5PYdT9mQfVDnCK6a'),
  (8, 'Patricia',   'Moreno Jiménez',  'patricia@techstore.com',   'patricia',  false, '$2a$10$LZGiyJ5DOlFZ.DRfXf5LsupV.p3kQ.lI6JcZb5PYdT9mQfVDnCK6a');

-- ------------------------------------------------------------
-- USERS_ROLES  (tabla intermedia @ManyToMany)
-- JoinTable: user_id → users.id  /  role_id → roles.id
-- admin  → ROLE_ADMIN (1) + ROLE_USER (2)
-- resto  → ROLE_USER  (2)
-- ------------------------------------------------------------
DELETE FROM users_roles;

INSERT INTO users_roles (user_id, role_id) VALUES
  (1, 1), (1, 2),  -- admin: ROLE_ADMIN + ROLE_USER
  (2, 2),          -- carlos: ROLE_USER
  (3, 2),          -- laura: ROLE_USER
  (4, 2),          -- sofia: ROLE_USER
  (5, 2),          -- miguel: ROLE_USER
  (6, 2),          -- ana: ROLE_USER
  (7, 2),          -- david: ROLE_USER
  (8, 2);          -- patricia: ROLE_USER

-- ------------------------------------------------------------
-- PRODUCTOS
-- Campos: id, name, precio, marca, modelo, image_url
-- `image_url` es LONGTEXT (columna generada por @Lob)
-- ------------------------------------------------------------
DELETE FROM productos;

INSERT INTO productos (id, name, precio, marca, modelo, image_url) VALUES

-- SMARTPHONES
(1,  'iPhone 15 Pro',
     1199.99, 'Apple', 'iPhone 15 Pro',
     'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium'),

(2,  'Samsung Galaxy S24 Ultra',
     1299.99, 'Samsung', 'Galaxy S24 Ultra',
     'https://images.samsung.com/is/image/samsung/p6pim/es/2401/gallery/es-galaxy-s24-ultra-s928-sm-s928bzkgeub-thumb-539573050'),

(3,  'Google Pixel 9 Pro',
     1099.99, 'Google', 'Pixel 9 Pro',
     'https://lh3.googleusercontent.com/iBex6SGrfCLAknUJvV1RJmQZ4bmVfFSP2Z7WqIFRWGDhTnhfnT7ew1F_4h8'),

(4,  'Xiaomi 14 Ultra',
     999.99, 'Xiaomi', '14 Ultra',
     'https://i02.appmifile.com/mi-com-product/fly-birds/xiaomi-14-ultra/m/product-header.png'),

(5,  'OnePlus 12',
     799.99, 'OnePlus', '12',
     'https://image01.oneplus.net/ebp/202312/15/1-m00-4a-48-rb8bwwv4yhcaczcoaabgczqg9ae4413.png'),

-- LAPTOPS
(6,  'MacBook Pro 16" M3 Pro',
     2499.99, 'Apple', 'MacBook Pro 16" M3 Pro',
     'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spaceblack-select-202310'),

(7,  'Dell XPS 15',
     1799.99, 'Dell', 'XPS 15 9530',
     'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-15-9530/media-gallery/black/notebook-xps-15-9530-black-gallery-2.psd'),

(8,  'ASUS ROG Zephyrus G14',
     1399.99, 'ASUS', 'ROG Zephyrus G14',
     'https://dlcdnwebimgs.asus.com/gain/6e63f24e-f34b-4fc3-8a62-78b88d7cb5c3/w1000/h732'),

(9,  'Lenovo ThinkPad X1 Carbon Gen 12',
     1699.99, 'Lenovo', 'ThinkPad X1 Carbon Gen 12',
     'https://p1-ofp.static.pub/fes/cms/2022/09/12/u0qlop53gjm0h3hkj3s0miqnzm1it0834743.png'),

(10, 'HP Spectre x360 14"',
     1499.99, 'HP', 'Spectre x360 14',
     'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/knowledgebase/c08154677.png'),

-- AURICULARES
(11, 'Sony WH-1000XM5',
     379.99, 'Sony', 'WH-1000XM5',
     'https://www.sony.es/image/5d02da5df552836db894cead8a68f5f3'),

(12, 'Apple AirPods Pro 2',
     279.99, 'Apple', 'AirPods Pro 2',
     'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83'),

(13, 'Bose QuietComfort Ultra',
     429.99, 'Bose', 'QuietComfort Ultra',
     'https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/qc45/product_silo_images/QC45_BLK_01_hero.png'),

(14, 'Jabra Evolve2 85',
     349.99, 'Jabra', 'Evolve2 85',
     'https://www.jabra.com/content/dam/consumer/products/headphones/jabra-evolve2-85/gallery/jabra-evolve2-85-navy-1.png'),

-- TABLETS
(15, 'iPad Pro 13" M4',
     1299.99, 'Apple', 'iPad Pro 13" M4',
     'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-13-select-wifi-spacegray-202210'),

(16, 'Samsung Galaxy Tab S9 Ultra',
     1199.99, 'Samsung', 'Galaxy Tab S9 Ultra',
     'https://images.samsung.com/is/image/samsung/p6pim/es/sm-x810nzaaeub/gallery/es-galaxy-tab-s9-plus-x810-sm-x810nzaaeub-thumb-537664272'),

(17, 'Microsoft Surface Pro 10',
     1099.99, 'Microsoft', 'Surface Pro 10',
     'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4OXqR'),

-- ACCESORIOS
(18, 'Logitech MX Master 3S',
     99.99, 'Logitech', 'MX Master 3S',
     'https://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png'),

(19, 'Keychron Q1 Pro',
     199.99, 'Keychron', 'Q1 Pro',
     'https://cdn.shopify.com/s/files/1/0059/0630/1017/products/K2-pro-A-RGB-B-1_1800x1800.jpg'),

(20, 'LG UltraGear 27" 4K OLED',
     799.99, 'LG', 'UltraGear 27GR95QE',
     'https://www.lg.com/es/images/monitores/md07557893/gallery/D-1.jpg'),

(21, 'Anker 737 GaNPrime 120W',
     69.99, 'Anker', '737 GaNPrime 120W',
     'https://cdn.anker.com/product-images/A2148/A2148111_T1.jpg'),

(22, 'Samsung T7 Shield SSD 2TB',
     149.99, 'Samsung', 'T7 Shield 2TB',
     'https://images.samsung.com/is/image/samsung/p6pim/es/mu-pe2t0s-eu/gallery/es-t7-shield-mu-pe2t0s-eu-532402950');

-- ------------------------------------------------------------
-- CARTS
-- Un carrito por usuario (relación OneToOne con users)
-- Columna FK: user_id → users.id
-- Se crean carritos para todos los usuarios, algunos vacíos.
-- Total: 8 carritos (uno por usuario)
-- ------------------------------------------------------------
DELETE FROM carts;

INSERT INTO carts (id, user_id) VALUES
  (1, 1), -- admin: carrito vacío
  (2, 2), -- carlos: con items
  (3, 3), -- laura: con items
  (4, 4), -- sofia: con items
  (5, 5), -- miguel: con items
  (6, 6), -- ana: con items
  (7, 7), -- david: vacío
  (8, 8); -- patricia: con items

-- ------------------------------------------------------------
-- CART_ITEMS
-- Campos: id, cart_id, product_id, product_name, unit_price, quantity
-- No hay FK a productos en la entidad, solo almacena el ID y nombre
-- como snapshot del producto en el momento de añadirlo al carrito.
--
-- Distribución:
--   Cart 1 (admin):     vacío
--   Cart 2 (carlos):    2 items (auriculares + accesorios)
--   Cart 3 (laura):     1 item (laptop premium)
--   Cart 4 (sofia):     3 items (smartphone + auriculares + accesorios)
--   Cart 5 (miguel):    2 items (tablet + monitor)
--   Cart 6 (ana):       4 items (mezcla variada)
--   Cart 7 (david):     vacío
--   Cart 8 (patricia):  5 items (compra grande)
-- ------------------------------------------------------------
DELETE FROM cart_items;

INSERT INTO cart_items (id, cart_id, product_id, product_name, unit_price, quantity) VALUES
  -- Carrito de Carlos (cart 2): Auriculares de calidad
  (1,  2, 11, 'Sony WH-1000XM5',         379.99,  1),
  (2,  2, 18, 'Logitech MX Master 3S',    99.99,  2),
  
  -- Carrito de Laura (cart 3): Laptop premium
  (3,  3,  6, 'MacBook Pro 16" M3 Pro', 2499.99,  1),
  
  -- Carrito de Sofía (cart 4): Smartphone y accesorios
  (4,  4,  1, 'iPhone 15 Pro',          1199.99,  1),
  (5,  4, 12, 'Apple AirPods Pro 2',     279.99,  1),
  (6,  4, 21, 'Anker 737 GaNPrime 120W',  69.99,  2),
  
  -- Carrito de Miguel (cart 5): Tablet y monitor
  (7,  5, 15, 'iPad Pro 13" M4',        1299.99,  1),
  (8,  5, 20, 'LG UltraGear 27" 4K OLED', 799.99, 1),
  
  -- Carrito de Ana (cart 6): Mezcla variada
  (9,  6,  4, 'Xiaomi 14 Ultra',         999.99,  1),
  (10, 6, 14, 'Jabra Evolve2 85',        349.99,  1),
  (11, 6, 19, 'Keychron Q1 Pro',         199.99,  1),
  (12, 6, 22, 'Samsung T7 Shield SSD 2TB', 149.99, 2),
  
  -- Carrito de Patricia (cart 8): Compra grande - Tech complete setup
  (13, 8,  7, 'Dell XPS 15',            1799.99,  1),
  (14, 8, 11, 'Sony WH-1000XM5',         379.99,  1),
  (15, 8, 18, 'Logitech MX Master 3S',    99.99,  1),
  (16, 8, 20, 'LG UltraGear 27" 4K OLED', 799.99, 1),
  (17, 8, 22, 'Samsung T7 Shield SSD 2TB', 149.99, 3);

SET FOREIGN_KEY_CHECKS = 1;
