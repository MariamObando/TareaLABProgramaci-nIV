/**
 * app.js — Ejercicio 1
 * Renderiza dinámicamente un arreglo de personas en una tabla
 * usando createElement / appendChild (sin innerHTML).
 */

'use strict';

// datos dados en el enunciado
const personas = [
    { nombre: "Lilian Rosales",    edad: 27, profesion: "Bachiller"    },
    { nombre: "Gustavo González",  edad: 28, profesion: "Arquitecto"   },
    { nombre: "Génesis Deras",     edad: 31, profesion: "Mercadóloga"  },
    { nombre: "Reina Benítez",     edad: 25, profesion: "Secretaria"   },
    { nombre: "Hugo Pérez",        edad: 34, profesion: "Diseñador"    }
];

/**
 * Separa un nombre completo en [nombre, apellido].
 * Usa el primer espacio como separador.
 */
function separarNombre(nombreCompleto) {
    const partes = nombreCompleto.split(' ');
    // Si solo hay una palabra, apellido vacío.
    return {
        nombre:   partes[0],
        apellido: partes.slice(1).join(' ') || ''
    };
}

/**
 * Construye una fila <tr> con los datos de una persona.
 * Todos los nodos se crean con createElement.
 */
function crearFila(persona, indice) {
    const fila = document.createElement('tr');

    const celdaImg = document.createElement('td');
    const img = document.createElement('img');
    // Usamos un avatar distinto por persona
    img.src = 'img/persona' + (indice + 1) + '.jpg';
    img.alt = 'Avatar de ' + persona.nombre;

    celdaImg.appendChild(img);
    fila.appendChild(celdaImg);

    const { nombre, apellido } = separarNombre(persona.nombre);

    const celdaNombre = document.createElement('td');
    celdaNombre.textContent = nombre;
    fila.appendChild(celdaNombre);

    const celdaApellido = document.createElement('td');
    celdaApellido.textContent = apellido;
    fila.appendChild(celdaApellido);

    const celdaEdad = document.createElement('td');
    celdaEdad.textContent = persona.edad;
    fila.appendChild(celdaEdad);

    const celdaProf = document.createElement('td');
    celdaProf.textContent = persona.profesion;
    fila.appendChild(celdaProf);

    return fila;
}

function renderizarPersonas() {
    const tbody = document.getElementById('cuerpo-tabla');
    tbody.innerHTML = '';

    const fragment = document.createDocumentFragment();

    personas.forEach((persona, i) => {
        fragment.appendChild(crearFila(persona, i));
    });

    tbody.appendChild(fragment);
}

document.addEventListener('DOMContentLoaded', renderizarPersonas);