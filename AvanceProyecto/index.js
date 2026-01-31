const express = require("express"); // impota express
const app = express();
const PORT = 3000; // puerto
app.use(express.json()); // middleware para JSON

// en el codigo crearia otra entidadad para manejar clientes y boletas por separado para una base de datos mas grande
// pero para fines practicos y de simplicidad para el avence dejo solo una entidad boletas
let boletas = [
  { // datos de boletas de ejemplo
    id: 1,
    cliente: "Juan Pérez",
    articulo: "Anillo de oro",
    monto: 1500,
    mesesPagados: 0,
    mesesTotales: 6,
    interesMensual: 0.10,
    liquidada: false
  }
];
//es la forma en la que monstraria las boletas activas al cliente
//get boletas
app.get("/boletas", (req, res) => {

  const boletasConTotal = boletas.map(b => {
    //se hace el calculo del total a liquidar agregando el interes por los meses restantes en este caso del 10%
    const totalLiquidacion = b.monto + b.monto * b.interesMensual * b.mesesTotales - b.monto * b.interesMensual * b.mesesPagados;
    return { ...b, totalLiquidacion }; // se agrega el total a liquidar al objeto boleta
  });
  if (boletasConTotal.every(b => b.liquidada === true)) { // si todas las boletas estan liquidadas envia un 404
    res.status(404).json({
      mensaje: "No hay boletas activas"
    });
  }

  boletasConTotal.forEach(b => {
    if (b.liquidada === true) {
      boletasConTotal.splice(boletasConTotal.indexOf(b), 1); // quita las boletas liquidadas del array de boletascontotal
    }
  });

  res.status(200).json({
  mensaje: "Boletas del cliente",
  boletas: boletasConTotal
  });
});

//es la forma en la que monstraria las boletas que ya fueron liquidadas al cliente
//get boleta liquidadas
app.get("/boletas/liquidadas", (req, res) => {
  const boletasLiquidadas = boletas.filter(b => b.liquidada === true);
  if (boletasLiquidadas.length === 0) {
    return res.status(404).json({
      mensaje: "No hay boletas liquidadas"
    });
  } else {
    res.status(200).json({
      mensaje: "Boletas liquidadas",
      boletas: boletasLiquidadas
    });
  }
});

//post boleta
// lo inclui para simular la recepcion de datos desde la base de datos, junto a la validacion de datos para evitar errores
app.post("/boletas", (req, res) => {
  const { cliente, articulo, monto } = req.body; 
  const Whitelist = ["cliente", "articulo", "monto"]; // keys permitidas
  const nuevaBoleta = {
    id: boletas.length + 1,
    cliente,
    articulo,
    monto,
    mesesPagados: 0,
    mesesTotales: 6,
    interesMensual: 0.10,
    liquidada: false
  };

  if (!cliente || !articulo || !monto) { // validacion de datos
    return res.status(400).json({ mensaje: "Faltan datos de la boleta" });
  } else if (typeof monto !== "number" || monto <= 200) { // validacion de monto
    return res.status(400).json({ mensaje: "El monto debe ser mayor a 200" });
  } else if (Object.keys(req.body).some(key => !Whitelist.includes(key))) { // validacion de whitelist con object.keys
    return res.status(203).json({ mensaje: "No se pueden enviar esos datos" });
  }

  boletas.push(nuevaBoleta);
  res.status(201).json({
    mensaje: "Boleta creada",
    boleta: nuevaBoleta
  });
});

// simularia el pago de una boleta por pago mensual una vez realizado el pago
//put pagar boleta
app.put("/boletas/:id/pagar", (req, res) => {
  const id = parseInt(req.params.id);
  const boleta = boletas.find(b => b.id === id);

  if (!boleta) {
    boletaNotFound(res);
  }else if (boleta.mesesPagados >= boleta.mesesTotales) {
    boleta.liquidada = true;
    boletaYaLiquidata(res);
  } else if (boleta.mesesPagados === boleta.mesesTotales) {
    boleta.liquidada = true;
  }

  boleta.mesesPagados++; // incrementa los meses pagados
  
  res.status(202).json({
    mensaje: "Pago mensual realizado",
    boleta
  });
});
// simularia la liquidacion total de la boleta
//put liquidar boleta
app.put("/boletas/:id/liquidar", (req, res) => { //put liquidar boleta
  const id = parseInt(req.params.id);
  const boleta = boletas.find(b => b.id === id);
  if (!boleta) {
    boletaNotFound(res);
  }else if (boleta.liquidada) {
    boletaYaLiquidata(res);
  }
  boleta.mesesPagados = boleta.mesesTotales; // paga todos los meses restantes
  boleta.liquidada = true;
  res.status(200).json({
    mensaje: "Boleta liquidada",
    boleta
  });
});
// simularia la cancelacion de un pago realizado en caso de que no se haya procesado la transaccion correctamente
//delete cancelar un pago de boleta
app.delete("/boletas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const boleta = boletas.find(b => b.id === id);
  if (!boleta) {
    boletaNotFound(res);
  }
  if (boleta.mesesPagados === 0) { // si no hay pagos realizados
    return res.status(400).json({
      mensaje: "No hay pagos para cancelar"
    });
  }
  boleta.mesesPagados--; // decrementa los meses pagados
  boleta.liquidada = false; // si se cancela un pago, la boleta ya no esta liquidada

  res.status(200).json({
    mensaje: "Pago cancelado",
    boleta
  });
});
/* simularia la cancelacion de la liquidacion total de una boleta en caso de
  error en la transaccion de la liquidacion o una reactivacion de la boleta*/
//delete cancelar liquidacion de boleta
app.delete("/boletas/:id/liquidadas", (req, res) => {
  const id = parseInt(req.params.id);
  const boleta = boletas.find(b => b.id === id);

  if (!boleta) { // si no encuentra la boleta
    boletaNotFound(res);
  } else if (!boleta.liquidada) { // si la boleta no esta liquidada
    return res.status(400).json({
      mensaje: "La boleta no está liquidada"
    });
  }

  boleta.liquidada = false; // reinicia la boleta
  boleta.mesesPagados = 0;

  res.status(200).json({
    mensaje: "Pago cancelado, boleta reiniciada",
    boleta
  });
});

const boletaNotFound = (res) => { // funcion para boleta no encontrada ya que se repite varias veces
  res.status(404).json({
    mensaje: "boleta no encontrada"
});
}

const boletaYaLiquidata = (res) => { // funcion para boleta ya liquidada
  res.status(400).json({
    mensaje: "boleta ya liquidada"
});
}

app.listen(PORT, () => { // inicia el servidor
  console.log(`Servidor activo en http://localhost:${PORT}`);
});