class UI {
    constructor(){
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.forState = 'add'; //variable para cambiar al estado cuando quieras añadir o editar en el form
    }
    //Show all posts
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

    //Show alert message
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

    //Clear alert message
    clearAlert() {
        const currentAlert = document.querySelector('.alert');

        if (currentAlert) {
            currentAlert.remove();
        }
    }

    //Clear all fields in the form
    clearFields() {
        this.titleInput.value='';
        this.bodyInput.value='';
    }

    //Fill form to edit
    fillForm(data){
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id; //This input element is always hidden (solo para diferenciar los posts )
    
        this.changeFormState('edit'); //Cambia el estado del formulario a edir
    }

    //Clear ID Hidden
    clearIdInput(){
        this.idInput.value = '';
    }

    //Change the form state
    changeFormState(type){
        if (type === 'edit') {
            this.postSubmit.textContent = 'Update post';
            this.postSubmit.className = 'post-submit btn btn-warning';
            if (document.querySelector('.post-cancel') === null) {
                //Create cancel button
                const button = document.createElement('button');
                button.className= 'post-cancel btn btn-light';
                button.appendChild(document.createTextNode('Cancel Edit'));
                //Get parent
                const cardForm = document.querySelector('.card-form');
                //Get element to insert before it
                const formEnd = document.querySelector('.form-end');
                //Insert cancel button
                cardForm.insertBefore(button, formEnd);
            }
        } else {
            this.postSubmit.textContent = 'Post It';
            this.postSubmit.className = 'post-submit btn btn-primary';
            //Remove cancel button
            if (document.querySelector('.post-cancel')) {
                document.querySelector('.post-cancel').remove();
            }
            //Clear ID form hidden field
            this.clearIdInput();
            //Clear text fields
            this.clearFields();
        }
    }
}

//Exportamos una variable que tendra todo el contenido de la clase UI
export const ui = new UI();