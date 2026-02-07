class PedidosRepository { // operaciones CRUD de los pedidos
    constructor() {
        this.currentId = 1;
        this.pedidos = [];
    }

    findAll() { // manda a llamar los pedidos del repositorio
        return this.pedidos;
    }

    findById(id) { // busca directamente por id
        return this.pedidos.find(p => p.id === id);
    }

    create(pedido) { // guarda el pedido al repositorio
        pedido.id = this.currentId++;
        this.pedidos.push(pedido);
        return pedido;
    }

    update(id, updatedPedido) { // actualiza el estado en el objeto
        const index = this.pedidos.findIndex(p => p.id === id);
        if (index <= 0) {
            return "el ID no puede ser igual o menor de 0";
        }

        this.pedidos[index] = { ...this.pedidos[index], ...updatedPedido };
        return this.pedidos[index];
    }

    delete(id) { // elimina el repositorio con la id
        const index = this.pedidos.findIndex(p => p.id === id);
        if (index === -1){ 
            return false;
        }

        this.pedidos.splice(index, 1);
        return true;
    }
}

module.exports = PedidosRepository;