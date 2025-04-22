# JavaScript CRUD and Shopping Cart — Practice 2

This repository contains a frontend implementation of a simple **CRUD-based e-commerce system** built using **vanilla JavaScript**. The project simulates product and cart management functionalities, including dynamic rendering and pagination using Bootstrap.

## 🎯 Objective

Develop a JavaScript module capable of:
- Handling **CRUD operations** for products and shopping cart.
- Validating inputs and handling exceptions.
- Dynamically rendering data using DOM manipulation.
- Simulating server interactions via **LocalStorage** or **crudcrud.com**.
- Implementing frontend pagination for product listings (Pokédex).

## 📦 Functionalities

### 🛍️ Product Management
- Products are represented as JavaScript classes with strict validations:
  - No empty strings, negative values, or malformed objects allowed.
- Methods:
  - `createFromJson(jsonString)` — Converts JSON string to a `Product` instance.
  - `createFromObject(obj)` — Converts raw object into a validated `Product` instance.

### 🛒 Shopping Cart Management
- Core functions:
  - `addItem(productUuid, amount)` — Adds or updates the quantity of an item in the cart.
  - `updateItem(productUuid, newAmount)` — Sets a new quantity, or removes item if `0`.
  - `removeItem(productUuid)` — Removes an item entirely from the cart.
  - `calculateTotal()` — Calculates total cost of items in the cart.
- Each item is assigned a `UUID` via `crypto.randomUUID()`.

### 🔁 Product CRUD API
- Functions:
  - `getProducts()` and `getProductById(uuid)` — Read operations.
  - `createProduct(product)` — Insert new product.
  - `updateProduct(uuid, updatedProduct)` — Edit product data.
  - `deleteProduct(uuid)` — Delete a product.
  - `findProduct(query)` — Optional search functionality by category or title.

### 📚 Pokédex Pagination
- Based on the Pokédex example from class.
- Implemented with Bootstrap components and JavaScript logic.
- Pages dynamically updated based on product dataset.

## 🧪 Testing & Output

- The main entry point (`index.js`) contains sample function calls for testing.
- Products and cart items are dynamically rendered in the DOM using `.innerHTML`.
- Follows the visual card structure from **Practice 1 (Bootstrap UI)**.

## 📝 Evaluation Criteria

| Section                              | Points |
|--------------------------------------|--------|
| Products displayed from API/local    | 30     |
| Validations and custom exceptions    | 10     |
| Full shopping cart functionality     | 35     |
| Test cases and console logging       | 5      |
| Pokédex pagination                   | 30     |
| **Total**                            | 100    |

## 📂 Deliverables

- All HTML and JavaScript files.
- No ZIP files; multiple file upload required.
- Final report including:
  - Code screenshots and test results.
  - Completed evaluation rubric.
  - Personal conclusions and reflections.

## 📝 License

This project is part of the *Computer Engineering* course for academic purposes only.

---

📘 También disponible en español: [README.es.md](README.es.md)