const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos.controller'); // ruta controllers
// realmente para esta actividad solo vi que era necesario el search asi que solo deje ese
router.get('/search', productosController.search);

module.exports = router;
