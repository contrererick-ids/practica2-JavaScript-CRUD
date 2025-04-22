# Sistema CRUD y Carrito de Compras con JavaScript — Práctica 2

Este repositorio contiene la implementación frontend de un sistema de e-commerce simple, construido con **JavaScript puro**. El proyecto simula funcionalidades de gestión de productos y carrito de compras, incluyendo renderizado dinámico, validaciones y paginación usando Bootstrap.

## 🎯 Objetivo

Desarrollar un módulo en JavaScript capaz de:
- Realizar operaciones **CRUD** sobre productos y carrito.
- Validar entradas y manejar excepciones.
- Renderizar datos dinámicamente manipulando el DOM.
- Simular peticiones a un servidor mediante **LocalStorage** o **crudcrud.com**.
- Implementar paginación en el frontend sobre listados de productos (Pokédex).

## 📦 Funcionalidades

### 🛍️ Gestión de Productos
- Los productos están definidos como clases con validaciones estrictas:
  - No se permiten campos vacíos, valores negativos ni objetos inválidos.
- Métodos clave:
  - `createFromJson(jsonString)` — Convierte un string JSON a una instancia de `Product`.
  - `createFromObject(obj)` — Valida y transforma un objeto JS en producto.

### 🛒 Gestión del Carrito de Compras
- Funciones principales:
  - `addItem(productUuid, amount)` — Añade producto o aumenta cantidad.
  - `updateItem(productUuid, newAmount)` — Establece nueva cantidad o elimina si es 0.
  - `removeItem(productUuid)` — Elimina completamente el producto.
  - `calculateTotal()` — Suma todos los subtotales del carrito.
- Cada producto usa un `UUID` generado con `crypto.randomUUID()`.

### 🔁 API CRUD de Productos
- Métodos incluidos:
  - `getProducts()` y `getProductById(uuid)` — Consultas.
  - `createProduct(product)` — Alta.
  - `updateProduct(uuid, updatedProduct)` — Modificación.
  - `deleteProduct(uuid)` — Eliminación.
  - `findProduct(query)` — Búsqueda opcional por categoría o nombre.

### 📚 Paginación Pokédex
- Inspirado en el ejemplo de Pokédex visto en clase.
- Paginación implementada con componentes de Bootstrap y lógica en JS.
- Las páginas se actualizan dinámicamente en base a los datos cargados.

## 🧪 Pruebas y Salida

- El archivo principal (`index.js`) incluye llamadas de prueba.
- El renderizado dinámico se hace con `.innerHTML` directamente en el DOM.
- Se reutiliza la estructura visual de tarjetas de la **Práctica 1 (Bootstrap UI)**.

## 📝 Criterios de Evaluación

| Sección                                  | Puntos |
|------------------------------------------|--------|
| Productos mostrados desde API/local      | 30     |
| Validaciones y excepciones personalizadas| 10     |
| Funcionalidad completa del carrito       | 35     |
| Casos de prueba y logs en consola        | 5      |
| Paginación Pokédex                       | 30     |
| **Total**                                | 100    |

## 📂 Entregables

- Archivos HTML y JS (no se aceptan ZIP).
- Reporte con:
  - Capturas de código y salidas.
  - Rúbrica completada.
  - Conclusiones y aprendizajes.

## 📝 Licencia

Este proyecto fue desarrollado con fines académicos como parte de la carrera de *Ingeniería en Computación*.

---

📘 Also available in English: [README.md](README.md)