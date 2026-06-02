import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

// Configurar __dirname en entornos de módulos ES (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

const JSON_PATH = path.join(__dirname, 'data', 'conciertos.json');

// Leer datos del JSON
function obtenerDatos() {
    const data = fs.readFileSync(JSON_PATH, 'utf-8');
    return JSON.parse(data);
}

// Guardar datos en el JSON
function guardarDatos(datos) {
    fs.writeFileSync(JSON_PATH, JSON.stringify(datos, null, 2), 'utf-8');
}

// Ruta principal: Muestra la tabla interactiva
app.get('/', (req, res) => {
    const conciertos = obtenerDatos();
    
    // Generar las filas de la tabla de forma dinámica
    let filasHtml = '';
    conciertos.forEach((c, index) => {
        filasHtml += `
            <tr>
                <td>${c.fecha}</td>
                <td><strong>${c.dia}</strong></td>
                <td>${c.artista}</td>
                <td><input type="text" name="personal_${index}" value="${c.personal || ''}" placeholder="Ej: Juan, Ana..."></td>
                <td><input type="text" name="horario_${index}" value="${c.horario || ''}" placeholder="Ej: 02:00 - 06:00"></td>
            </tr>
        `;
    });

    // Leer el archivo HTML base e inyectar las filas
    let html = fs.readFileSync(path.join(__dirname, 'views', 'index.html'), 'utf-8');
    html = html.replace('<!-- FILAS_DINAMICAS -->', filasHtml);
    
    res.send(html);
});

// Ruta para procesar y guardar el cuadrante modificado
app.post('/guardar', (req, res) => {
    const conciertos = obtenerDatos();
    
    conciertos.forEach((c, index) => {
        c.personal = req.body[`personal_${index}`] || '';
        c.horario = req.body[`horario_${index}`] || '';
    });

    guardarDatos(conciertos);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Servidor de limpieza corriendo en http://localhost:${PORT}`);
});
