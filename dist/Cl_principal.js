"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cl_controlador_js_1 = __importDefault(require("./Cl_controlador.js"));
class Cl_principal {
    constructor() {
        this.controlador = new Cl_controlador_js_1.default();
        if (typeof this.controlador.cargarDesdeStorage === 'function') {
            this.controlador.cargarDesdeStorage();
        }
        const form = document.getElementById('formRegistro');
        if (form) {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                const referencia = document.getElementById('inReferencia').value;
                const concepto = document.getElementById('inConcepto').value;
                const montoStr = document.getElementById('inMonto').value;
                const monto = parseFloat(montoStr) || 0;
                const fecha = document.getElementById('inFecha').value;
                const datos = { referencia, concepto, categoria: "General", monto, tipo: "Ingreso", fecha };
                if (typeof this.controlador.agregarRegistro === 'function') {
                    this.controlador.agregarRegistro(datos, (error) => {
                        if (error) {
                            alert("Error: " + error);
                        }
                        else {
                            alert("Registro agregado correctamente");
                            form.reset();
                            this.renderTabla();
                        }
                    });
                }
            });
        }
        this.renderTabla();
    }
    renderTabla() {
        const tbody = document.getElementById('tbodyRegistros');
        if (!tbody)
            return;
        tbody.innerHTML = '';
        const listar = this.controlador.listarRegistro;
        if (typeof listar !== 'function')
            return;
        const registros = listar.call(this.controlador);
        registros.forEach(reg => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${reg.referencia}</td>
            <td>${reg.concepto}</td>
            <td>${reg.monto}</td>
            <td>${reg.fecha}</td>
            `;
            tbody.appendChild(tr);
        });
    }
}
exports.default = Cl_principal;
