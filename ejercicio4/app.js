/**
 * app.js — Ejercicio 4
 * Manejo de cadenas, objetos y arreglos en localStorage
 */

'use strict';

const CLAVE_CADENA  = 'simple';
const CLAVE_OBJETO  = 'complejo';
const CLAVE_ARREGLO = 'arreglo';

const inputNom = document.getElementById('nombre');
const inputEd  = document.getElementById('edad');
const salida   = document.getElementById('salida');

/**
 * Lee y valida los inputs del formulario
 */
function leerFormulario() {
    const nombre = inputNom.value.trim();
    const edad   = parseInt(inputEd.value, 10);

    if (nombre === '' || isNaN(edad) || edad < 0) {
        alert('Debe ingresar un nombre y una edad válidos.');
        return null;
    }
    return { nombre: nombre, edad: edad };
}

/**
 * Guarda el par nombre/edad como cadena simple
 */
function anadirCadena() {
    const datos = leerFormulario();
    if (!datos) return;

    const texto = datos.nombre + ', ' + datos.edad;
    localStorage.setItem(CLAVE_CADENA, texto);
    renderizarPanel();
}

/**
 * Recupera el último par guardado como cadena
 */
function restaurarCadena() {
    const texto = localStorage.getItem(CLAVE_CADENA);
    if (!texto) {
        alert('No hay dato simple guardado.');
        return;
    }
    const partes = texto.split(', ');
    if (partes.length === 2) {
        inputNom.value = partes[0];
        inputEd.value  = partes[1];
    }
}

/**
 * Guarda el par nombre/edad como objeto JSON
 */
function guardarObjeto() {
    const datos = leerFormulario();
    if (!datos) return;

    localStorage.setItem(CLAVE_OBJETO, JSON.stringify(datos));
    renderizarPanel();
}

/**
 * Recupera el objeto guardado y lo vuelca en el formulario
 */
function restaurarObjeto() {
    const txt = localStorage.getItem(CLAVE_OBJETO);
    if (!txt) {
        alert('No hay objeto guardado.');
        return;
    }
    try {
        const datos = JSON.parse(txt);
        inputNom.value = datos.nombre;
        inputEd.value  = datos.edad;
    } catch (e) {
        alert('El objeto guardado está corrupto: ' + e.message);
    }
}

/**
 * Añade el par actual a un arreglo de objetos
 */
function guardarArreglo() {
    const datos = leerFormulario();
    if (!datos) return;

    const arreglo = leerArreglo();
    arreglo.push(datos);
    localStorage.setItem(CLAVE_ARREGLO, JSON.stringify(arreglo));
    renderizarPanel();
}

/**
 * Lee el arreglo guardado. Devuelve [] si no hay nada
 */
function leerArreglo() {
    const txt = localStorage.getItem(CLAVE_ARREGLO);
    if (!txt) return [];
    try {
        const arr = JSON.parse(txt);
        return Array.isArray(arr) ? arr : [];
    } catch (e) {
        console.error('Arreglo corrupto:', e);
        return [];
    }
}

/**
 * Vuelca el último elemento del arreglo en el formulario
 */
function restaurarArreglo() {
    const arr = leerArreglo();
    if (arr.length === 0) {
        alert('No hay datos en el arreglo.');
        return;
    }
    const ultimo = arr[arr.length - 1];
    inputNom.value = ultimo.nombre;
    inputEd.value  = ultimo.edad;
}

/**
 * Elimina el último elemento del arreglo y las claves cadena y objeto
 */
function remover() {
    const arr = leerArreglo();
    arr.pop();
    if (arr.length === 0) {
        localStorage.removeItem(CLAVE_ARREGLO);
    } else {
        localStorage.setItem(CLAVE_ARREGLO, JSON.stringify(arr));
    }
    localStorage.removeItem(CLAVE_CADENA);
    localStorage.removeItem(CLAVE_OBJETO);
    renderizarPanel();
}

/**
 * Vacía por completo el localStorage
 */
function limpiar() {
    if (!confirm('¿Seguro que desea borrar todo el localStorage?')) return;
    localStorage.clear();
    document.getElementById('formulario').reset();
    renderizarPanel();
}

/**
 * Muestra el contenido actual de localStorage en el panel
 */
function renderizarPanel() {
    salida.innerHTML = '';

    if (localStorage.length === 0) {
        const p = document.createElement('p');
        p.textContent = 'localStorage está vacío.';
        salida.appendChild(p);
        return;
    }

    for (let i = 0; i < localStorage.length; i++) {
        const clave = localStorage.key(i);
        const valor = localStorage.getItem(clave);

        const p = document.createElement('p');
        let valorMostrar = valor;
        try {
            const obj = JSON.parse(valor);
            valorMostrar = JSON.stringify(obj);
        } catch (e) {
            valorMostrar = valor;
        }
        p.textContent = clave + ': ' + valorMostrar;
        salida.appendChild(p);
    }
}

document.getElementById('btn-anadir').addEventListener('click', anadirCadena);
document.getElementById('btn-obtener').addEventListener('click', restaurarCadena);
document.getElementById('btn-complejo').addEventListener('click', guardarObjeto);
document.getElementById('btn-restaurar-complejo').addEventListener('click', restaurarObjeto);
document.getElementById('btn-arreglo').addEventListener('click', guardarArreglo);
document.getElementById('btn-restaurar-arreglo').addEventListener('click', restaurarArreglo);
document.getElementById('btn-remover').addEventListener('click', remover);
document.getElementById('btn-limpiar').addEventListener('click', limpiar);

document.addEventListener('DOMContentLoaded', renderizarPanel);