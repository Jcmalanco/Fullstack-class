//encapsulamiento por comvencion
//nombre , emal privado, get obtener email y y set para modificarlo

/* class persona {
    $email;
    constructor(id, nombre, email) {
        this.id = id
        this.nombre = nombre
        this.$email = email
        return '418';
    }
    
    get email(){
        return `ID: ${this.id}, Nombre: ${this.nombre}, correo: ${this.$email}`;
    }
    set email(correo){
        if (typeof correo !== 'string' || !correo.includes('.') || !correo.includes('@')){
            console.log('correo no valido')
            return;
        }
        this.$email = correo;
    }
    
}


const user1 = new persona(1, 'Jose', 'jose@gmail.com')

console.log(user1.email);
console.log(user1.email = 'no c');
 */


/* class cuenta{
    $saldo;
    constructor(titular, saldo){
        this.titular = titular
        this.$saldo = saldo
    }
    get saldo(){
        return this.$saldo;
    }
    get consultar(){
        return this.$saldo;
    }

    get depositar(){
        return this.$saldo;
    }
    get retirar(){
        return this.$saldo;
    }
    
    set depositar(monto){
        if (typeof monto !== 'number' || monto <= 0){
            console.log('n c puede')
        }
        const total = this.saldo + monto;
        return total;
    }
    set retirar(monto){
        if (typeof monto !== 'number' || monto <= 0){
            console.log('n c puede x2')
        }
        const total = this.saldo + monto;
        return total;
    }
}

const cuenta1 = new cuenta(1, 'pepe', 2000);

console.log(cuenta1.depositar = 2000);
console.log(cuenta1.retirar = 1000);
console.log(cuenta1.consultar); */
const productos = []


//repositorio

class productosRep{
    constructor(){
        this.id = 1;
        this.productos = []
    }

    getall(){
        return this.productos;
    }

    create(nombre, precio) {
        if (typeof nombre !== 'string' || nombre.length === 0){
            return "nombre invalido"
        }
        if (typeof precio !== 'number' || precio <= 0){
            return "precio invalido"
        }

        const nuevo = {
            id: this.id,
            nombre,
            precio
        }

        this.productos.push(nuevo);
    }
    update(email, data){
        if (typeof email !== 'number' || email.length <= 0 || !email.includes('@') || !email.includes('.')){

        }
    }
}

const repo = new productosRep()


