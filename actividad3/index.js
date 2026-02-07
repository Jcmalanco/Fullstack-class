//https://jcmalanco-5024375.postman.co/workspace/Juan-Carlos-Malanco-Rodriguez's~7ec218ca-6e36-4d37-86f0-3b8ccc6b4479/collection/51982639-8dc2db1a-9cee-4c70-95f1-4db7ca8641de?action=share&creator=51982639
const pedidosRoutes = require('./src/routes/pedidos.routes'); // direccion del route para acceder a los otros documentos
const express = require('express');
const app = express();
app.use(express.json());
app.use('/pedidos', pedidosRoutes); //manda  a llamar a pedidos.routes

app.listen(3000, () => { //puerto
  console.log('Servidor corriendo en http://localhost:3000');
});