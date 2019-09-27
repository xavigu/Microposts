import { http } from './http'; //importamos el fichero http.js
import { ui } from './ui'; //importamos el fichero ui.js

//Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

function getPosts(){
    http.get('http://localhost:3000/posts')
      .then(data => ui.showPosts(data))
      .catch(err => console.log(err));
}