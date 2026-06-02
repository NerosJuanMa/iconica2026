# 📋 Gestor de Personal voluntario de Vigilancia - Icónica Santalucía Sevilla Fest 2026

Esta es una aplicación web local desarrollada con **Node.js** y **Express** para la planificación, organización y asignación del personal de vigilancia posterior a los conciertos del festival. Los datos se gestionan y persisten de forma dinámica utilizando un archivo **JSON** como base de datos local.

## 🚀 Características

*   **Calendario Oficial 2026:** Incluye todas las fechas confirmadas del festival mapeadas con su respectivo día de la semana.
*   **Campos Editables:** Permite asignar trabajadores y definir horarios/notas directamente desde la interfaz web.
*   **Persistencia de Datos:** Al hacer clic en "Guardar Cambios", los datos se escriben automáticamente en el archivo físico `conciertos.json`.
*   **Diseño Limpio y Responsivo:** Tabla estilizada optimizada para una lectura rápida y gestión de cuadrantes.

---

## 📁 Estructura del Proyecto

```text
gestion-vigilancia/
├── data/
│   └── conciertos.json   # Base de datos local en formato JSON
├── views/
│   └── index.html        # Interfaz visual de la aplicación
├── app.js                # Servidor y rutas en Express
├── package.json          # Dependencias y scripts del proyecto
└── README.md             # Documentación del sistema
```

---

## 🛠️ Instalación y Configuración

Sigue estos pasos para poner en marcha la aplicación en tu entorno local:

### 1. Clonar o crear la carpeta del proyecto
Crea un directorio en tu máquina local y asegúrate de estructurar los archivos según el esquema anterior.

### 2. Inicializar el proyecto e instalar dependencias
Abre una terminal dentro de la carpeta raíz del proyecto y ejecuta los siguientes comandos:

```bash
# Inicializar el gestor de paquetes de Node
npm init -y

# Instalar Express.js como dependencia de producción
npm install express
```

### 3. Ejecutar el servidor
Para arrancar la aplicación, ejecuta el siguiente comando en tu terminal:

```bash
node app.js
```

Verás un mensaje en la consola indicando:  
`Servidor de vigilancia corriendo en http://localhost:3000`

---

## 💻 Instrucciones de Uso

1. Abre cualquier navegador web e ingresa a la dirección: **`http://localhost:3000`**
2. Visualizarás la tabla completa ordenada cronológicamente por días.
3. Haz clic sobre cualquier casilla de las columnas **Personal Asignado** o **Horario / Notas** para escribir los nombres de tu equipo.
4. Una vez completado el cuadrante, haz clic en el botón flotante **💾 Guardar Cambios**. 
5. La página se recargará automáticamente y los datos quedarán salvados de forma permanente en `data/conciertos.json`.

---

## ⚙️ Tecnologías Utilizadas

*   **Backend:** Node.js (V8 Runtime Environment)
*   **Framework Web:** Express.js
*   **Persistencia:** Módulo nativo `fs` (File System) de Node.js
*   **Frontend:** HTML5 y CSS3 nativo (sin dependencias ni librerías externas)
