import { http } from './http'; //importamos el fichero http.js (módulo)
import { ui } from './ui'; //importamos el fichero ui.js (módulo)

//Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

//Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

//Listen for delete post
document.querySelector('#posts').addEventListener('click', deletePost);

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

//Delete Post
function deletePost(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains('delete')) { //Si el elemento que clickeas tiene la clase delete
      const id = e.target.parentElement.dataset.id; //obtienes el atributo data-id de ese elemento
      if (confirm('Are you sure?')) {
        //Delete Post
        http.delete(`http://localhost:3000/posts/${id}`)
          .then(data => {
            ui.showAlert('Post Removed', 'alert alert-danger');
            getPosts();
          })
          .catch(err => console.log(err));
      }
  }
}