const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidos.controller'); // le indica la direccion del pedidos.controller
//manda a llamar las funciones de controller con sus respectivos get, post, put y delete
router.get('/', pedidosController.getAll);
router.get('/:id', pedidosController.getById);
router.post('/', pedidosController.create);
router.put('/:id', pedidosController.update);
router.delete('/:id', pedidosController.delete);

module.exports = router; // manda de regreso lo que obtuvo el router