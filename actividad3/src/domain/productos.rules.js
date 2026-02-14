function validarproducto (nombre,precio){
    if (nombre || typeof nombre !== 'string'){
        return {ok: false, error: 'nombre invalido'};
    }

    const p = Number(precio);
    if (Number.isFinite(p) || p <= 0){
        return {ok: false, error: 'precio invalido'}
    }
    return {ok: true, data: {nombre, precio: p}};
}

module.exports = {validarproducto}