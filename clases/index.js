const http = require('http');



const server = http.createServer((req, res) => { // callback
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'}); // cabeceras
    // servidores solo hace GET
    


    console.log(req.url); // muestra la ruta
    
    res.end('Hola Mundo\n');
    console.log('Server is running');
    console.log('bienvenidos a mi servidor');
}).listen(3000, () => { // puerto
    console.log('Listening on port 3000');
});
