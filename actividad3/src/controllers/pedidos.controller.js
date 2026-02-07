const PedidosRepository = require('../repositories/pedidos.repository');

class PedidosController { //Hace las operaciones relacionadas con los pedidos
    constructor() {
        this.repository = new PedidosRepository();
    }

    getAll = (req, res) => { // manda a llamar todos los pedidos
        res.json(this.repository.findAll());
    };

    getById = (req, res) => { // manda a llamar un pedido con una ID
        const id = Number(req.params.id);
        const pedido = this.repository.findById(id);

        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        res.json(pedido);
    };

    create = (req, res) => { //crea un nuevo producto
        const { producto, cantidad } = req.body;

        if (!producto || cantidad === undefined) {
            return res.status(400).json({ error: 'Producto y cantidad son obligatorios' });
        }
        if (cantidad <= 0) {
            return res.status(400).json({ error: 'La cantidad debe ser mayor a 0' });
        }

        const nuevoPedido = {
            producto,
            cantidad,
            estado: 'pendiente'
        };

        const pedidoCreado = this.repository.create(nuevoPedido);
        res.status(201).json(pedidoCreado);
    };

    update = (req, res) => { // cambia el estado de pendiente a confirmado
        const id = Number(req.params.id);
        const { estado } = req.body;

        const pedido = this.repository.findById(id);
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        if (pedido.estado !== 'pendiente') { // evita que pongan otras cosas en vez de pendiente
            return res.status(400).json({
                error: `No se puede modificar un pedido en estado ${pedido.estado}`
            });
        }

        if (!['confirmado', 'cancelado'].includes(estado)) { // si esta en otro estado manda error
            return res.status(400).json({
                error: 'Estado inválido. Solo se permite confirmado o cancelado'
            });
        }

        const pedidoActualizado = this.repository.update(id, { estado });
        res.json(pedidoActualizado);
    };

    delete = (req, res) => { // elimina los pedidos siempre y cuando esten pendiente
        const id = Number(req.params.id);
        const pedido = this.repository.findById(id);

        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        if (pedido.estado !== 'pendiente') {
            return res.status(400).json({
                error: 'Solo se pueden eliminar pedidos en estado pendiente'
            });
        }

        this.repository.delete(id);
        res.status(204).send();
    };
}

module.exports = new PedidosController();
