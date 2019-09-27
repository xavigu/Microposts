/**
 * EasyHTTP Library
 * Library for making HTTP request
 * 
 * @version 3.0.0
 * @author Javier Guzman
 * 
 **/

class EasyHTTP {
    //Make an HTTP GET Request
    async get(url) {
        const response = await fetch(url);
        const resData = await response.json();
        return resData;
    };

    //Make an HTTP POST Request
    async post(url, data) {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        const resData = await response.json();
        return resData;
    };


    //Make an HTTP PUT Request
    async put(url, data) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        const resData = await response.json();
        return resData;
    };

    //Make an HTTP DELETE Request
    async delete(url) {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });
        const resData = await 'Resource deleted...';
        return resData;
    }

}

//Exportamos una variable que tendra todo el contenido de la clase easyHTTP
export const http = new EasyHTTP();

