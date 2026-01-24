const userList = document.querySelector("#user-list");
const postList = document.querySelector("#post-list");
const postCount = document.querySelector("#post-count");
import { obtenerUsuarios, obtenerPosts } from './data.js';

const loadUsers = async () => {
    const users = await obtenerUsuarios();
    const userMap = new Map(
        users.map(user => [
            user.id, {name: user.name, username: user.username}
        ])
    );
/* No se si se acuerde profe que tenia este error con el Map, era por que solo acepta dos parametros
 [clave, valor] asi que contatene name y username en un objeto para que funcionara */
    userMap.forEach(({name, username}, id) => {
        const li = document.createElement("li");
        li.textContent = `${id} - ${name} (${username})`;
        li.dataset.userId = id;
        li.addEventListener("click", () => {
            loadPosts(id, name);
        });
        userList.appendChild(li);
    });
}

const loadPosts = async (userId, userName) => {
    const Posts = await obtenerPosts();
    const userPosts = Posts.filter(post => post.userId === userId);
    const postIds = new Set(userPosts.map(p => p.id));
    postList.innerHTML = "";
    postCount.textContent = `Posts de ${userName}: ${[...postIds].length}`;
    userPosts.forEach(({ id, title, body }) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${id}) ${title}</strong><br>${body}`;
        postList.appendChild(li);
    });
}

loadUsers();