const express = require('express');
const productosRoutes = require('./src/routes/productos.routes');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(418).json('ta bien');
});

app.use('/productos', productosRoutes); // manda a llamar a la ruta /productos/...

app.listen(3000, () => { // servidor
  console.log('Servidor en http://localhost:3000');
});
