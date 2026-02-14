const productosRepository = require('../repositories/productos.repository');

class ProductosController { // verifica errores posibles y manda el error correspondiente

  search = async (req, res) => {
    try { // hice un try para evitar errores e identificar donde estaba fallando el programa
      let { nombre, minPrecio, maxPrecio, page = 1, limit = 5 } = req.query;

      //validaciones obligatorias
      page = parseInt(page);
      limit = parseInt(limit);

      if (isNaN(page) || page <= 0) {
        return res.status(400).json({ error: 'page debe ser número mayor a 0 o numerico'});
      }

      if (isNaN(limit) || limit <= 0) {
        return res.status(400).json({ error: 'limit debe ser número mayor a 0 o numerico'});
      }

      if (minPrecio && isNaN(minPrecio)) {
        return res.status(400).json({ error: 'minPrecio debe ser numérico'});
      }

      if (minPrecio <= -1){ // permite 0 en caso de objetos gratis
        return res.status(400).json({ error: 'minPrecio debe ser mayor a 0'})
      }
      
      if (maxPrecio && isNaN(maxPrecio)) {
        return res.status(400).json({ error: 'maxPrecio debe ser numérico'});
      }
      
      if (maxPrecio <= 0){
        return res.status(400).json({ error: 'maxPrecio debe ser mayor a 0'})
      }

      if (maxPrecio < minPrecio){ // este funciona de forma extraña no c por que, falla pero hasta cierto punto empieza a funcionar (?)
        return res.status(400).json({ error: 'el precio maximo no puede ser menor al minimo'})
      }

      const result = await productosRepository.search({
        nombre,
        minPrecio,
        maxPrecio,
        page,
        limit
      });

      return res.json({ //regresa la data de la base de datos y page, limit y total
        data: result.data,
        page,
        limit,
        total: result.total
      });

    } catch (error) {
      console.error(error);
      res.status(418).json({ error: 'ya me quiero dormir (mala peticion)' });
    }
  };
}

module.exports = new ProductosController();
