const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 1. Interfaz de la Barra de Búsqueda (HTML integrado)
const htmlInicio = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Navegador Proxy Gratis</title>
    <style>
        body { font-family: sans-serif; background-color: #121212; color: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
        .container { text-align: center; width: 90%; max-width: 600px; }
        h1 { font-size: 2.5rem; margin-bottom: 20px; color: #00ffff; }
        form { display: flex; background: #1e1e1e; padding: 10px; border-radius: 50px; border: 1px solid #333; }
        input[type="text"] { flex: 1; border: none; background: transparent; color: white; padding: 12px 20px; font-size: 16px; outline: none; }
        button { background: #00ffff; color: #121212; border: none; padding: 12px 30px; border-radius: 50px; font-size: 16px; font-weight: bold; cursor: pointer; transition: 0.3s; }
        button:hover { background: #00cccc; box-shadow: 0 0 10px rgba(0,255,255,0.5); }
        .info { margin-top: 20px; font-size: 14px; color: #888; }
    </style>
</head>
<body>
<div class="container">
    <h1>Proxy Web Vercel</h1>
    <p>Navega de forma anónima introduciendo una dirección web abajo:</p>
    <form action="/proxy" method="GET">
        <input type="text" name="url" placeholder="ejemplo.com o https://wikipedia.org" required autocomplete="off">
        <button type="submit">Navegar</button>
    </form>
    <div class="info">Alojado en Vercel Serverless - Siempre Activo.</div>
</div>
</body>
</html>
`;

// Ruta principal
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(htmlInicio);
});

// Ruta del proxy dinámico
app.get('/proxy', async (req, res) => {
    let targetUrl = req.query.url;

    if (!targetUrl) {
        return res.send('Por favor, introduce una URL válida.');
    }

    if (!/^https?:\/\//i.test(targetUrl)) {
        targetUrl = 'https://' + targetUrl;
    }

    try {
        const response = await axios.get(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            responseType: 'text',
            timeout: 8000 // Vercel tiene un límite de tiempo de espera en su plan gratis
        });

        let html = response.data;

        // Inyectar barra superior para seguir navegando
        const barraSuperior = `
        <div style="position:fixed; top:0; left:0; width:100%; background:#222; color:#fff; padding:10px; z-index:999999; display:flex; gap:10px; align-items:center; font-family:sans-serif; box-sizing:border-box;">
            <b style="color:#00ffff;">Proxy Vercel:</b>
            <form action="/proxy" method="GET" style="display:flex; flex-grow:1; gap:5px; margin:0;">
                <input type="text" name="url" value="${targetUrl}" style="flex-grow:1; padding:5px; border-radius:4px; border:none;" />
                <button type="submit" style="padding:5px 15px; background:#00ffff; color:#000; border:none; border-radius:4px; cursor:pointer; font-weight:bold;">Ir</button>
            </form>
            <a href="/" style="color:#fff; text-decoration:none; padding:5px; font-size:12px;">🏠 Inicio</a>
        </div>
        <div style="height:50px;"></div>
        `;

        html = html.replace(/<body([^>]*)>/i, `<body$1>${barraSuperior}`);
        
        res.setHeader('Content-Type', 'text/html');
        res.send(html);

    } catch (error) {
        res.status(500).send(`<h3>Error al cargar la página:</h3><p>${error.message}</p><a href="/">Volver al inicio</a>`);
    }
});

module.exports = app;
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 1. Interfaz de la Barra de Búsqueda (HTML integrado)
const htmlInicio = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Navegador Proxy Gratis</title>
    <style>
        body { font-family: sans-serif; background-color: #121212; color: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
        .container { text-align: center; width: 90%; max-width: 600px; }
        h1 { font-size: 2.5rem; margin-bottom: 20px; color: #00ffff; }
        form { display: flex; background: #1e1e1e; padding: 10px; border-radius: 50px; border: 1px solid #333; }
        input[type="text"] { flex: 1; border: none; background: transparent; color: white; padding: 12px 20px; font-size: 16px; outline: none; }
        button { background: #00ffff; color: #121212; border: none; padding: 12px 30px; border-radius: 50px; font-size: 16px; font-weight: bold; cursor: pointer; transition: 0.3s; }
        button:hover { background: #00cccc; box-shadow: 0 0 10px rgba(0,255,255,0.5); }
        .info { margin-top: 20px; font-size: 14px; color: #888; }
    </style>
</head>
<body>
<div class="container">
    <h1>Proxy Web Vercel</h1>
    <p>Navega de forma anónima introduciendo una dirección web abajo:</p>
    <form action="/proxy" method="GET">
        <input type="text" name="url" placeholder="ejemplo.com o https://wikipedia.org" required autocomplete="off">
        <button type="submit">Navegar</button>
    </form>
    <div class="info">Alojado en Vercel Serverless - Siempre Activo.</div>
</div>
</body>
</html>
`;

// Ruta principal
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(htmlInicio);
});

// Ruta del proxy dinámico
app.get('/proxy', async (req, res) => {
    let targetUrl = req.query.url;

    if (!targetUrl) {
        return res.send('Por favor, introduce una URL válida.');
    }

    if (!/^https?:\/\//i.test(targetUrl)) {
        targetUrl = 'https://' + targetUrl;
    }

    try {
        const response = await axios.get(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            responseType: 'text',
            timeout: 8000 // Vercel tiene un límite de tiempo de espera en su plan gratis
        });

        let html = response.data;

        // Inyectar barra superior para seguir navegando
        const barraSuperior = `
        <div style="position:fixed; top:0; left:0; width:100%; background:#222; color:#fff; padding:10px; z-index:999999; display:flex; gap:10px; align-items:center; font-family:sans-serif; box-sizing:border-box;">
            <b style="color:#00ffff;">Proxy Vercel:</b>
            <form action="/proxy" method="GET" style="display:flex; flex-grow:1; gap:5px; margin:0;">
                <input type="text" name="url" value="${targetUrl}" style="flex-grow:1; padding:5px; border-radius:4px; border:none;" />
                <button type="submit" style="padding:5px 15px; background:#00ffff; color:#000; border:none; border-radius:4px; cursor:pointer; font-weight:bold;">Ir</button>
            </form>
            <a href="/" style="color:#fff; text-decoration:none; padding:5px; font-size:12px;">🏠 Inicio</a>
        </div>
        <div style="height:50px;"></div>
        `;

        html = html.replace(/<body([^>]*)>/i, `<body$1>${barraSuperior}`);
        
        res.setHeader('Content-Type', 'text/html');
        res.send(html);

    } catch (error) {
        res.status(500).send(`<h3>Error al cargar la página:</h3><p>${error.message}</p><a href="/">Volver al inicio</a>`);
    }
});

module.exports = app;
