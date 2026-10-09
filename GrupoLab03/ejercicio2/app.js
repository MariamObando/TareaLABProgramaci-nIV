/**
 * app.js — Ejercicio 2
 * Persistencia de un formulario simple (Nombre + Contraseña)
 * en localStorage.
 */

'use strict';

const CLAVE = 'formulario-contacto';

const form      = document.getElementById('formulario');
const inputNom  = document.getElementById('nombre');
const inputMail = document.getElementById('correo');
const salida    = document.getElementById('salida');


//de predef
function nombreValido(valor) {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{2,60}$/;
    return regex.test(valor);
}

function emailValido(valor) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(valor);
}

function guardar() {
    const nombre = inputNom.value.trim();
    const email  = inputMail.value.trim();

    if (nombre === '' || email === '') {
        alert('Debe completar nombre y email.');
        return;
    }

    if (!nombreValido(nombre)) {
        alert('El nombre solo puede contener letras y espacios (mínimo 2 caracteres).');
        inputNom.focus();
        return;
    }

    if (!emailValido(email)) {
        alert('El correo debe tener un formato válido (ejemplo@dominio.com).');
        inputMail.focus();
        return;
    }

    const datos = { nombre: nombre, email: email };
    localStorage.setItem(CLAVE, JSON.stringify(datos));

    salida.textContent = 'Guardado correctamente:\n' +
        'Nombre: ' + nombre + '\n' +
        'Email:  ' + email;
}

function mostrar() {
    const txt = localStorage.getItem(CLAVE);

    if (!txt) {
        salida.textContent = 'No hay datos guardados.';
        return;
    }

    const datos = JSON.parse(txt);
    salida.textContent = 'Datos recuperados de localStorage:\n' +
        'Nombre: ' + datos.nombre + '\n' +
        'Email:  ' + datos.email;
}

function limpiar() {
    localStorage.removeItem(CLAVE);
    form.reset();
    salida.textContent = 'Datos eliminados. localStorage limpio para esta clave.';
}

function restaurarAlCargar() {
    const txt = localStorage.getItem(CLAVE);
    if (!txt) return;

    try {
        const datos = JSON.parse(txt);
        inputNom.value  = datos.nombre || '';
        inputMail.value = datos.email  || '';
        salida.textContent = 'Datos restaurados automáticamente al cargar la página.';
    } catch (e) {
        console.error('JSON corrupto en localStorage:', e);
        localStorage.removeItem(CLAVE);
    }
}

document.getElementById('btn-guardar').addEventListener('click', guardar);
document.getElementById('btn-mostrar').addEventListener('click', mostrar);
document.getElementById('btn-limpiar').addEventListener('click', limpiar);

document.addEventListener('DOMContentLoaded', restaurarAlCargar);