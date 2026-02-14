const validarproducto = (require('./productos.rules'))

test('rechaza nombre vacio', () => {
    const p = validarproducto({nombre: '',
        precio: 100
    })
    expect
});