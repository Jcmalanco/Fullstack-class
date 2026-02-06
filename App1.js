//npm init
//npm install express
//npm install
const express = require('express');

const app = express()
const port = 3000;

let products = []

app.use(express.json());

app.get('/products', (req, res) => {
  res.json({
    products: products
  });
})

app.post('/products', (req, res) => {
  const nuevoProducto = req.body
  console.log(nuevoProducto);
  products.push(nuevoProducto)
  products.push(`activo: ${true}`)
  res.status(201).json({
    products
  })
  if (Array.isArray(nuevoProducto)) {
    nuevoProducto.forEach(product => products.push(product));
  }
  
  if (!nuevoProducto.name || !nuevoProducto.price || !nuevoProducto.id) {
    res.status(400).json({message: 'Faltan datos del producto'});
  }
  res.status(201).json({nuevoProducto})
  return;
})

app.put('/products/:id', (req, res) => {
  const {id} = req.params;
  const updatedProduct = req.body;
  const productIndex = products.findIndex(product => product.id === parseInt(id));
  if (productIndex !== -1) {
    products[productIndex] = {...products[productIndex], ...updatedProduct};
    res.json({message: 'Producto actualizado', product: products[productIndex]});
  } else {
    res.status(404).json({message: 'Producto no encontrado'});
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/json', (req, res) => {
  res.json({
    message: 'Hola Mundo',
    status: 'success' 
  });
})

app.get('/info', (req, res) => {
  console.log(req.body);
  res.json({
    message: 'Data received',
    status: 'success',
    data: data
  });
});
delete app.get('/products/id', (req, res) => {
  id = req.params.id;
  console.log(req.body);
  res.json({
    message: 'Producto eliminado'
  });
  products.push(`activo: ${false}`)

});

app.router('/usuarios', require('./routes/usuarios'));


app.listen(port, () => {
  console.log(`Example app listening http://localhost:${port}`)
});