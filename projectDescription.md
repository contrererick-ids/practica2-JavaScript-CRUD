# Práctica de JavaScript
## Operaciones con productos y carrito de compras
### Objetivo:
- Crear un conjunto de funciones en JavaScript que permitan simular operaciones de altas, bajas, cambios y consultas en una app de e-commerce.
- Manejo de paginacion desde el Front-end utilizando JS.
### Descripción de la aplicación
Se desea tener un conjunto de funciones en JavaScript que permitan simular operaciones de altas, bajas, cambios y consultas para la parte de productos y el carrito de compras de una app de e-commerce.
Esta práctica contiene los siguientes puntos:
1. Consideraciones
2. Configuración inicial
3. Funciones de Productos
4. Funciones del Carrito de Compras
5. Funciones para Manejo de Datos
6. Paginación de pokédex
7. Pruebas y ejemplos
8. Evaluación
### Consideraciones:
Considerar los siguientes aspectos para la implementación de la práctica:
1. Utilizar los archivos desarrollados en la práctica 1.
2. Mostraremos la funcionalidad de nuestro conjunto de funciones de manera visual y desde la consola del navegador.
3. Se espera que puedas interactuar con el DOM basándose en los ejemplos expuestos en clase.
### Configuración inicial:
La práctica se compone de dos partes:
1.-Practica Ecommerce
En tu archivo home.html de la práctica 1, carga los scripts de JavaScript en cualquier lugar (en
head o en body).
Utiliza una url de crudcrud.com o la clase localstorage para simular el backend.
Realiza los archivos de js que creas conveniente intentando seguir una estructura lógica de tu código puedes basarte en el CRUD de usuarios que vimos en clase.
2.-Implementar paginacion en pokédex.
Adjunto en esta práctica encontraras el pokedex realizado en clase sin paginación.
Se debe agregar paginación utilizando bootstrap y JS como se muestra en el ejemplo demo.
https://jam.dev/c/d55c45a4-1366-4319-a9c2-95bec7dd131a
### Funciones de Productos
Para poder utilizar correctamente los productos en nuestra aplicación, necesitamos una manera de representarlos en objetos de JavaScript.
Necesitaremos getters y setters que hagan las validaciones adecuadas tirando excepciones de tipo Product Exception, como no permitir Strings vacíos, números negativos, etc…
Para poder interactuar con el servidor, debemos de ser capaz de interpretar objetos externos como productos, para lo cual crearemos las siguientes funciones estáticas:
● createFromJson(jsonValue): Esta función debe convertir el String de JSON recibido en una nueva instancia de producto (utilizando la clase Product).
● createFromObject(obj): Esta función debe convertir el objeto recibido en una nueva instancia de producto (utilizando la clase Product) y debe ser capaz de ignorar todos aquellos valores que no pertenezcan a la clase Product.
### Funciones del Carrito de Compras
Esta tal vez sea la parte más difícil de la práctica, la dejamos al inicio para que consultes al profesor en caso de que lo requieras.
● addItem(productUuid, amount): Esta función debe agregar al carrito un nuevo artículo, o en caso de que exista ya el producto, actualizar la cantidad a la suma de ambos
valores (cantidad original + cantidad nueva).
Para general e UUID puedes implementar la función randomUUID( ejemplo en el CRUD de usuarios).
https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID
● updateItem(productUuid, newAmount): Esta función debe actualizar el producto correspondiente a la nueva cantidad. Si el nuevo valor es negativo, mandamos error, si es igual a 0, eliminamos el producto del carrito y si es mayor a 0, entonces actualizamos al nuevo valor.
● removeItem(productUuid): Esta función debe eliminar el producto correspondiente.
● calculateTotal(): Esta función debe calcular el valor total de la compra, utilizando la cantidad correspondiente a cada producto y el valor unitario del mismo.
### Funciones para Manejo de Datos
Debemos agregar los métodos correspondientes para leer (getProducts(), getProductById(uuid)), para crear (createProduct(product)), para actualizar (updateProduct(uuid, updatedProduct)) y para eliminar (deleteProduct(uuid)).
Además del CRUD, de manera opcional puedes agregar un método para búsqueda por categoría o por nombre del producto. Para esto crearemos findProduct(query), en donde query es un String, en el cual pondremos la categoría y el nombre a buscar en el siguiente formato “<category>: <title>”.
En caso de que el usuario pase solo la categoría (“<category>:”) haremos la búsqueda de los0 productos que contengan esa cadena dentro de su categoría. De manera similar si el usuario pasa solo el nombre (“<title>”) haremos la búsqueda de los productos que contengan esa cadena dentro de su nombre.
Para el caso combinado, debemos dividir la consulta en las 2 partes correspondientes y aplicar ambos filtros para la lista de productos.
### Pruebas y Ejemplos
En index.js mandaremos llamar nuestras diferentes funciones para validar que todo se ejecute según lo planeado.
Puedes cargar los elementos directamente en el contenedor principal apoyándote de la propiedad innerHTML. Esto requiere crear un método que mapee los valores del producto a un String con el contenido de HTML correspondiente a una tarjeta como las de la práctica 1, codigo similar a lo que realizamos con el ejemplo pokedex adjunto en esta practica.
### Evaluación
Home muestra productos leidos del API o local storage -> 30 puntos
Uso de excepciones y validaciones -> 10 puntos
CRUD del carrito de compras -> 35 puntos
Pruebas y ejemplos -> 5 puntos
Paginación de Pokédex -> 30 puntos
Máxima calificación de la práctica: 100 puntos.
### Entregables:
● Recuerda entregar tanto el archivo HTML de index o home, así como los archivos correspondientes de JavaScript.
● Debes además adjuntar un reporte con las evidencias y la rúbrica contestada de acuerdo a lo que se alcanzó a entregar.
● En el reporte añadir conclusiones, cosas por mejorar, temas que costaron trabajo, etc…
NOTA: NO enviar archivos ZIP, la practica estara habilitada para subir multiples archivos.
