// Destructuring 

const user = {
  nombre: "Ana",
  edad: 20
}
// let nombre = user.nombre;
// let edaD = user.edad

const {edad , nombre} = user

// console.log(nombre)

// Spread Operator

const tareas = ["a", "b"];

const nuevo = [...tareas, "c"]

// console.log(nuevo)

// Map

const productos = new Map()
productos.set(1, "Laptop")
productos.set(2, "Monitor")

// console.log(productos.get(2))

// Set

const categorias = new Set()
categorias.add("Escuela")
categorias.add("Escuela") // no se duplica

// console.log(categorias)

// Module

import { saludar } from './data.js'

//saludar("José")

// console.log("inicio")
// setTimeout(() => console.log("Despues"), 1000)
// console.log("fin")

// promises
const tarea = new Promise(resolve => {
  setTimeout(() => resolve("Listo"), 1000)
}) 

// tarea.then(res => console.log(res))

// async/await

const ejecutar = async () => {
  const res = await tarea;
  console.log(res)
}

// ejecutar()

// Fetch / then / catch

fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json())
  .then(data => {
    const {name,username,email} = data[5];
    // console.log(name,username,email)
  })
  .catch(err => console.log(err))

// fetch /async / await

const userList = document.querySelector("#users"); 

const obtenerUsuarios = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const dataUsers = await res.json();
    dataUsers.forEach(({ name, username, email }) => {
      
      const li = document.createElement("li");
      li.innerHTML = `<b>${name}</b> (${username}): ${email}`;
      userList.appendChild(li);
      
    });
  } catch (err) {
    console.log(err)
  }
}

obtenerUsuarios();