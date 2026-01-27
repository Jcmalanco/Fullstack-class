//npm init
//npm install express
//npm install
const express = require('express');

const app = express()
const port = 3000;
const data ={
  curso: 'Fullstack',
  semana: 3,
  dia: 'martes'
}

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});