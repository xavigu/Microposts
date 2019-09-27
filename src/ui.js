class UI {
    constructor(){
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.forState = 'add';
    }

    showPosts(posts){
        let output = '';

        posts.forEach((post) => {
            output += `
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">${post.title}</h4>
                    <p class="card-text">${post.body}</p>
                    <a href="#" class="edit card-link" data-id="${post.id}">
                        <i class="fa fa-pencil"></i>
                    </a>                   
                    <a href="#" class="delete card-link" data-id="${post.id}">
                        <i class="fa fa-remove"></i>
                    </a>
                </div>
            </div>
            `
        });
        //Nota: HTML5 te permite tener atributos custom poniendo data-(lo que sea) en nuestro caso es el de data-id
        this.post.innerHTML = output;
    }

    showAlert(message, className) {
        this. clearAlert();

        //Create div
        const div = document.createElement('div');
        //Add classes
        div.className = className;
        //Add text
        div.appendChild(document.createTextNode(message));
        //Get parent
        const container = document.querySelector('.postsContainer'); //Elemento donde meteremos el div de la alerta
        //Get posts
        const posts = document.querySelector('#posts'); //El contenedor de los posts que se toma como referencia para insertar el mensaje de alerta justo antes de él
        //Insert alert div before posts container
        container.insertBefore(div, posts);

        //Timeout
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    clearAlert() {
        const currentAlert = document.querySelector('.alert');

        if (currentAlert) {
            currentAlert.remove();
        }
    }

    clearFields() {
        this.titleInput.value='';
        this.bodyInput.value='';
    }
}

//Exportamos una variable que tendra todo el contenido de la clase UI
export const ui = new UI();