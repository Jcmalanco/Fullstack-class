const pool = require('../db');

class ProductosRepository {

  async search(filters) {

    const values = [];
    let dataQuery;
    let countQuery;

    const offset = (filters.page - 1) * filters.limit;

    //nombre, minPrecio y maxPrecio
    if (filters.nombre && filters.minPrecio && filters.maxPrecio) {

      dataQuery = `SELECT * FROM productos WHERE nombre ILIKE $1 AND precio >= $2 AND precio <= $3 ORDER BY id DESC LIMIT $4 OFFSET $5`;

      countQuery = `SELECT COUNT(*) FROM productos WHERE nombre ILIKE $1 AND precio >= $2 AND precio <= $3`;

      values.push(`%${filters.nombre}%`, filters.minPrecio, filters.maxPrecio, filters.limit, offset);
    }
    //nombre y minPrecio
    else if (filters.nombre && filters.minPrecio) {
      dataQuery = `SELECT * FROM productos WHERE nombre ILIKE $1 AND precio >= $2 ORDER BY id DESC LIMIT $3 OFFSET $4`;
      countQuery = `SELECT COUNT(*) FROM productos WHERE nombre ILIKE $1 AND precio >= $2`;

      values.push(`%${filters.nombre}%`, filters.minPrecio, filters.limit, offset);
    }
    //solo nombre
    else if (filters.nombre) {

      dataQuery = `SELECT * FROM productos WHERE nombre ILIKE $1 ORDER BY id DESC LIMIT $2 OFFSET $3`;
      countQuery = `SELECT COUNT(*) FROM productos WHERE nombre ILIKE $1`;

      values.push(`%${filters.nombre}%`, filters.limit, offset);
    }
    //sin filtros
    else {
      dataQuery = `SELECT * FROM productos ORDER BY id DESC LIMIT $1 OFFSET $2`;
      countQuery = `SELECT COUNT(*) FROM productos`;

      values.push(filters.limit, offset);
    }

    const dataResult = await pool.query(dataQuery, values);
    const countResult = await pool.query(
      countQuery,
      values.slice(0, values.length - 2)
    );

    return {
      data: dataResult.rows,
      total: parseInt(countResult.rows[0].count)
    };
  }

}

module.exports = new ProductosRepository();
