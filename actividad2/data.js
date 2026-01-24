
export const obtenerUsuarios = async () => {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        return await res.json();
    } catch (err) {
        console.error("Error al consumir Usuarios:", err);
    }
}

export const obtenerPosts = async () => {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        return await res.json();
    } catch (err) {
        console.error("Error al consumir Posts:", err);
    }
}