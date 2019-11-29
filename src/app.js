import { http } from './http'; //importamos el fichero http.js (módulo)
import { ui } from './ui'; //importamos el fichero ui.js (módulo)

//Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

//Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

//Listen for delete post
document.querySelector('#posts').addEventListener('click', deletePost);

//Listen for enable edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

//Listen for cancel edit button
document.querySelector('.card-form').addEventListener('click', cancelEdit);

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
    const id = document.querySelector('#id').value;

    //Create object with the data
    const data = {
      title,
      body
    }

    //Validate fields
    if (title === '' || body === '') {
      ui.showAlert ('Please fill in all fields', 'alert alert-danger')
    } else { 
        //Check if id (if null 'create post' if not 'edit post')
        if (id === '') {
          //Create Post
          http.post('http://localhost:3000/posts', data)
            .then(data => {
              ui.showAlert('Post added', 'alert alert-success text-center');
              ui.clearFields();
              getPosts();
            })
            .catch(err => console.log(err));
        } else {
          //Edit Post
          http.put(`http://localhost:3000/posts/${id}`, data)
            .then(data => {
              ui.showAlert('Post edited', 'alert alert-success text-center');
              ui.changeFormState('add'); //Cambiamos el estado add que tambien limpia los campos del form
              getPosts();
            })
            .catch(err => console.log(err));
        }
  }
}

//Delete Post
function deletePost(e) {
  e.preventDefault();
  console.log(e.target);
  if (e.target.parentElement.classList.contains('delete')) { //Si el elemento que clickeas tiene la clase delete (que seria el padre(el anchor) del elemento X)
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

//Enable Edit State
function enableEdit(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains('edit')) { //Si el elemento que clickeas tiene la clase edit
    const id = e.target.parentElement.dataset.id; //Variable que recoge el id del post
    const body = e.target.parentElement.previousElementSibling.textContent; //Variable que recoge el texto del body del post (es justo el elemento anterior)
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent; //Variable que recoge el texto del title del post (dos elementos previos al elemento que tiene el id)
  
    const data = {
      id,
      title,
      body
    }

    //Rellena el form con el contenido del post(data)
    ui.fillForm(data);
  }
}

//cancel Edit State
function cancelEdit(e) {
  if (e.target.classList.contains('post-cancel')) { //Si el elemento que clickeas tiene la clase post-cancel (el boton de cancel edit)
    ui.changeFormState('add');
  }
  e.preventDefault();
}