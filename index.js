'use strict'

const versionModulo = require('./versionModulo');
const fs = require('fs');
const async = require('async');

// Aqui llamabamos a la función sólo para buscar un módulo
// versionModulo('chance', (err, data) => {
//     if(err){
//         console.log("Hubo un error");
//         return;
//     }
//     console.log("El módulo chance tiene la versión:", data);
// })

// En esta ocasión leemos la version del modulo de todas las carpetas de node_modules
function versionModulos(callback){

    // leemos el directorio
    fs.readdir('./node_modules', (err, listado) => {
        if(err){
            callback(err);
            return;
        }
        // tenemos que hacer una funcion iteradora que nos de los datos de los modulos como nombre y version
        // y desde dentro llamamos a nuestra función versionModulo definida en el otro archivo
        function iterador(elemento, callbackIterador) {
            // excluimos los directorios que empiezen por punto
            if(elemento[0] === '.'){
                callbackIterador(null);
                return;
            }
            versionModulo(elemento, (err, datos) => {
                if(err){
                    callback(err);
                    return;
                }
                callbackIterador(null, datos);
            });
        };

        // Concatenamos el resultado con async concat
        async.concat(listado, iterador, callback);

    });

}

versionModulos((err, listaModulos) => {
    if(err){
        console.log('Ha habido un error');
        return;
    }
    //Hacemos un bucle para pintar los modulos
    //console.log(listaModulos);
    for(let i=0; i<listaModulos.length; i++){
        console.log('El módulo', listaModulos[i].miModulo, 'tiene la version', listaModulos[i].miVersion);
    }
})