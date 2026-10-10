Laboratorio 3

Grupo 03 - integrantes:

- Mariam Obando
- Billy Cordero
- Diego Fernandez

---

Descripción general

Este repositorio contiene la solución de los cuatro ejercicios del Laboratorio 3.
El objetivo es practicar la manipulación de arreglos de objetos en JavaScript, su
serialización a JSON y el uso del API Web Storage (localStorage) para la
persistencia de datos en el lado del cliente.

Cada ejercicio está en una carpeta independiente y se puede ejecutar abriendo el
index.html correspondiente en el navegador.

---

Estructura del repositorio

GrupoLab03/
├── README.md
├── capturas/
│   ├── ejercicio1.png
│   ├── ejercicio2.png
│   ├── ejercicio3.png
│   └── ejercicio4.png
├── ejercicio1/
│   ├── index.html
│   ├── estilos.css
│   └── app.js
│   └── img/
|         ├── persona1.jpg 
|         ├── persona2.jpg
|         ├── persona3.jpg
|         ├── persona4.jpg
|         └── persona5.jpg
├── ejercicio2/
│   ├── index.html
│   ├── estilos.css
│   └── app.js
├── ejercicio3/
│   ├── index.html
│   ├── formstorage.js
│   └──Ejercicio 3 - Análisis.pdf
└── ejercicio4/
    ├── index.html
    ├── estilos.css
    └── app.js


---

Cómo ejecutar cada ejercicio

Todos los ejercicios son HTML estático: no requieren servidor, ni Tomcat, ni
Node.js. Basta con abrir el index.html en el navegador.

Opción A: Doble clic

1. Navega hasta la carpeta del ejercicio (por ejemplo ejercicio1/).
2. Haz doble clic sobre index.html.
3. Se abrirá en tu navegador por defecto.

Opción B: IntelliJ IDEA

1. Abre IntelliJ IDEA.
2. File → Open… y selecciona la carpeta GrupoLab03/ o el ejercicio individualmente.
3. En el árbol del proyecto, haz clic derecho sobre el index.html del ejercicio
   que quieras probar.
4. Selecciona Open in Browser → Chrome / Edge / Firefox.

---

Descripción de cada ejercicio

Ejercicio 1. Arreglo JSON de datos personales 

Carpeta: ejercicio1/

Se parte del arreglo de objetos personas proporcionado en el enunciado y se
renderiza dinámicamente en una tabla HTML con las columnas Imagen, Nombre,
Apellido, Edad y Profesión.

Aspectos destacados:

- El renderizado se hace íntegramente con createElement y appendChild
  (no se usa innerHTML para insertar filas).
- Se emplea un DocumentFragment para minimizar los reflows del navegador.
- El nombre completo se separa en nombre y apellido con la función
  separarNombre().
- Los avatares se cargan desde la carpeta local img/ (persona1.jpg …
  persona5.jpg). 
- Se declara meta charset UTF-8 y los nombres con tildes
  (Génesis, González, Benítez, Pérez, Mercadóloga) se muestran correctamente.

Resultado esperado: cinco bloques/filas visibles, uno por persona, con edad y
profesión asociadas.

---

Ejercicio 2 - Persistencia con localStorage desde un formulario

Carpeta: ejercicio2/

Formulario HTML que captura Nombre y Correo electrónico y los guarda en
localStorage.

Aspectos destacados:

- Uso de localStorage.setItem() y localStorage.getItem().
- Botón Guardar: válido formato del nombre y del correo con expresiones
  regulares y persiste el objeto serializado con JSON.stringify().
- Botón Mostrar: recupera y muestra en pantalla lo último guardado.
- Botón Limpiar: elimina la clave utilizada mediante removeItem().
- Al cargar la página, el evento DOMContentLoaded restaura automáticamente los
  datos en el formulario.
- Se maneja el caso de JSON corrupto en localStorage con try/catch.

Validaciones implementadas:

- Nombre: solo letras (con tildes, ñ, ü) y espacios; entre 2 y 60 caracteres.
- Correo: formato usuario@dominio.com con extensión de 2+ caracteres.

Resultado esperado: el dato permanece tras refrescar la página, cerrar la
pestaña o cerrar y reabrir el navegador.

---

Ejercicio 3 — Análisis de código

Carpeta: ejercicio3/

Se analiza el código proporcionado en el enunciado (index.html +
formstorage.js) que muestra tres formas distintas de acceder a localStorage.

Contenido del informe:

1. Propósito general del código.
2. Flujo de ejecución paso a paso:
   - load de window → init()
   - init() → registra el listener del botón con polyfill
   - mostrar() → lee el select y ejecuta el switch
   - Salida por innerHTML en el div#content
3. Las tres formas de acceso a localStorage:
   - API explícita:localStorage.setItem('k', 'v') / localStorage.getItem('k')
   - Notación de matrices: localStorage['k'] = 'v'/ localStorage['k']
   - Propiedades de objeto: localStorage.k = 'v'/ localStorage.k
4. Polyfill para navegadores antiguos (addEventListener vs attachEvent):
   se explica por qué el código usa if (addEventListener) … else if (attachEvent)
   y en qué casos aplica (Internet Explorer 8 y anteriores).

Archivo del informe: Ejercicio 3 - Análisis.pdf(máximo 2 páginas).

---

Ejercicio 4 — localStorage con datos simples, arreglos y objetos

Carpeta: ejercicio4/

Página con formulario (Nombre, Edad) y ocho botones que demuestran las tres
formas de almacenamiento admitidas por localStorage.

Botones y su función:

- Añadir: guarda "nombre, edad" como cadena simple en la clave simple.
- Obtener: recupera la cadena guardada y la vuelca en el formulario.
- Guardar dato complejo: guarda {nombre, edad} como objeto con JSON.stringify()
  en la clave complejo.
- Restaurar dato complejo: recupera el objeto con JSON.parse() y lo muestra.
- Guardar arreglo: acumula el par actual en un arreglo de objetos en arreglo.
- Restaurar arreglo: recupera el último elemento del arreglo y lo vuelca.
- Remover: elimina el último elemento del arreglo.
- Limpiar: borra por completo el localStorage (con confirmación).

Aspectos destacados:

- Uso correcto de JSON.stringify() / JSON.parse() con manejo de errores.
- Validación de campos vacíos y de edad (entero entre 0 y 120).
- Panel inferior que refleja el estado actual de localStorage tras cada
  operación.
- Limpieza del panel con removeChild() (sin innerHTML = '').

Resultado esperado: los botones gestionan los datos y el panel inferior
muestra en todo momento el contenido real del localStorage.

---

Requisitos cumplidos

- meta charset UTF-8 declarado en todos los HTML.
- JavaScript en archivos externos (.js) salvo indicación contraria.
- Uso de createElement / appendChild para el renderizado dinámico.
- Uso de localStorage.setItem() / getItem() / removeItem() / clear().
- Uso de JSON.stringify() y JSON.parse() para objetos y arreglos.
- Manejo del evento DOMContentLoaded al cargar cada página.
- Validación de campos vacíos y de formato (nombre, correo, edad).
- Caracteres UTF-8 (tildes, ñ, ü) visualizados sin reemplazos.
- Separación de responsabilidades: HTML, CSS y JS en archivos distintos.

---

Tecnologías utilizadas

- HTML5 con codificación UTF-8.
- CSS3 (grid, flexbox).
- JavaScript ES2015+ (arrow functions, const/let).
- Web Storage API (localStorage).
- DOM API (createElement, appendChild, DocumentFragment, addEventListener).

---

Capturas de pantalla

Las capturas del resultado en el navegador están en la carpeta capturas/:

- ejercicio1.png — Tabla con los 5 registros renderizados dinámicamente.
- ejercicio2.png — Formulario con datos persistidos tras refrescar (F5).
- ejercicio3.png — Resultado del switch con las tres formas de acceso.
- ejercicio4.png — Panel con el estado actual de localStorage.

---

Cómo verificar que funciona

1. Ejercicio 1: abrir ejercicio1/index.html y comprobar que aparecen 5 filas
   con nombres, edades y profesiones, sin caracteres de reemplazo.
2. Ejercicio 2: abrir ejercicio2/index.html, guardar un nombre y un correo,
   refrescar con F5 y verificar que los campos se restauran automáticamente.
3. Ejercicio 3: abrir ejercicio3/index.html, seleccionar cada una de las tres
   opciones del select y pulsar Seleccionar; se debe mostrar el mensaje
   correspondiente.
4. Ejercicio 4: abrir ejercicio4/index.html, probar cada botón y comprobar
   que el panel inferior refleja el estado real de localStorage (se puede
   inspeccionar también con F12 → Application → Local Storage).





