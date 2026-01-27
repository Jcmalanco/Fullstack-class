const boton = document.querySelector("#boton-1")
const addTaskButton = document.querySelector('#add-task-button');
const newTaskInput = document.querySelector("#new-task");
const list = document.querySelector("#todo-list")
const messageBox = document.querySelector(".msg")
const taskcount = document.querySelector("#count")

newTaskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTaskButton.click()
    }
})

addTaskButton.addEventListener("click", (e) => {
    if (newTaskInput.value.trim() !== "") {
        const li = document.createElement("li")
        const delButton = document.createElement("button")

        li.textContent = newTaskInput.value
        delButton.textContent = "X"
        delButton.classList.add("close-btn")
        li.appendChild(delButton)
        list.appendChild(li)
        messageBox.className = "ok"
        messageBox.textContent = "tarea agregada"
        li.textContent = newTaskInput.value
        newTaskInput.value = ""
        
        li.addEventListener("click", (e) => {
            li.remove()
            messageBox.className = "warning"
            messageBox.textContent = "tarea eliminada"
            updateTaskCount()
            setTimeout(() => {
                messageBox.classList.add("hide")
            },3000)
            
        })
        updateTaskCount()
        return;
        
    }
});

const updateTaskCount = () => {
    const count = list.children.length
    taskcount.textContent = `tareas: ${count}`
}

const user = {
    nombre: "Ana",
    edad: 20
}

const {edad, nombre} = user

const tareas = ["a" + "b"];

const nuevo = [...tareas, "c"]

console.log(nuevo)

const productos = new Map()
productos.set(1, "monitor")
productos.set(2, "lap")

const categorias = new set()
categorias.add("escuaela")
categorias.add("escuaela")

import {saludar} from './App1'
saludar("jose")

