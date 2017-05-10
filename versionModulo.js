'use strict'

const fs = require('fs');
const path = require('path');

// vamos a hacer la función que lee el Módulo
function versionModulo(nombreModulo, callback){

    // primero indicamos la ruta de los archivos
    const fichero = path.join('./node_modules', nombreModulo, 'package.json');

    // leemos el contenido de un package.json
    fs.readFile(fichero, (err, data) => {
        // si hay error llamamos al callback pasando el error
        if(err){
            callback(err);
            return;
        }
    
        try {
            // debemos parsear los datos del JSON y lo guardamos en una constante
            const miJSON = JSON.parse(data);
            // obtener la version y guardarla en una constante
            const version = miJSON.version;
            // y devolvemos los datos de version y nombre
            const datos = {miModulo:nombreModulo, miVersion:version}
            callback(null, datos);

        } catch(err) {
            callback(err);
            return;
        }
    });

}

module.exports = versionModulo;