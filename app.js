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
    
   // Generar las tarjetas de forma dinámica
let tarjetasHtml = '';
conciertos.forEach((c, index) => {
    tarjetasHtml += `
        <div class="tarjeta-dia">
            <div class="tarjeta-cabecera">
                <span class="tarjeta-fecha">${c.fecha}</span>
                <span class="tarjeta-dia-semana">${c.dia}</span>
            </div>
            <div class="tarjeta-cuerpo">
                <h3 class="tarjeta-artista">${c.artista}</h3>
                <div class="tarjeta-columnas">
                    <div class="columna">
                        <label>Personal Asignado</label>
                        <textarea name="personal_${index}" placeholder="Escribe los nombres de los voluntarios...">${c.personal || ''}</textarea>
                    </div>
                    <div class="columna">
                        <label>Horario / Notas</label>
                        <textarea name="horario_${index}" placeholder="Ej: 02:00 - 06:00. Llevar camara de fotos...">${c.horario || ''}</textarea>
                    </div>
                </div>
            </div>
        </div>
    `;
});

// Reemplazar en el HTML base
let html = fs.readFileSync(path.join(__dirname, 'views', 'index.html'), 'utf-8');
html = html.replace('<!-- TARJETAS_DINAMICAS -->', tarjetasHtml);

    
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
