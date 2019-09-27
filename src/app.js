import { http } from './http'; //importamos el fichero http.js
import { ui } from './ui'; //importamos el fichero ui.js

//Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

//Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

//Get Posts
function getPosts(){
    http.get('http://localhost:3000/posts')
      .then(data => ui.showPosts(data))
      .catch(err => console.log(err));
}

//Submit Post
function submitPost(){
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;

    const data = {
      title,
      body
    }

    //Create Post
    http.post('http://localhost:3000/posts', data)
      .then(data => {
        ui.showAlert('Post added', 'alert alert-success text-center');
        ui.clearFields();
        getPosts();
      })
      .catch(err => console.log(err));
}