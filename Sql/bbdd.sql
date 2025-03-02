create database inventario_tienda;
use inventario_tienda;
 
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    categoria_id INT,
    stock FLOAT DEFAULT 0,
    quintales BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);


CREATE TABLE precios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT,
    concepto VARCHAR(255) NOT NULL,  -- Ejemplo: 'libra', 'arroba', etc.
    valor DOUBLE NOT NULL,  -- Precio por unidad en dólares
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);


CREATE TABLE compras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT,
    fecha DATE NOT NULL,
    precio_compra DOUBLE NOT NULL,
    cantidad FLOAT NOT NULL,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

CREATE TABLE ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT,
    precio_venta DOUBLE NOT NULL,
    cantidad FLOAT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);
