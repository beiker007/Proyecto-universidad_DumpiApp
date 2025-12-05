"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatearFecha = formatearFecha;
exports.ahora = ahora;
function formatearFecha(fechaObj) {
    const anio = fechaObj.getFullYear();
    const mes = String(fechaObj.getMonth() + 1).padStart(2, "0");
    const dia = String(fechaObj.getDate()).padStart(2, "0");
    const hora = String(fechaObj.getHours()).padStart(2, "0");
    const minutos = String(fechaObj.getMinutes()).padStart(2, "0");
    return `${anio}-${mes}-${dia}T${hora}:${minutos}`;
}
function ahora() {
    return new Date();
}
