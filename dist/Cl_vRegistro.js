"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cl_vGeneral_1 = __importDefault(require("./Cl_vGeneral"));
class Cl_vRegistro extends Cl_vGeneral_1.default {
    constructor() {
        var _a;
        super({ formName: "formRegistro" });
        this._controlador = null;
        this.inReferencia = this.crearHTMLInputElement({ elementName: "inReferencia" });
        this.inConcepto = this.crearHTMLInputElement({ elementName: "inConcepto" });
        this.inMonto = this.crearHTMLInputElement({ elementName: "inMonto" });
        this.inFecha = this.crearHTMLInputElement({ elementName: "inFecha" });
        this.btRegistrar = this.crearHTMLButtonElement({
            elementName: "btRegistrar",
            onclick: () => {
                var _a;
                const datos = {
                    referencia: this.inReferencia.value,
                    concepto: this.inConcepto.value,
                    categoria: "General",
                    monto: parseFloat(this.inMonto.value),
                    tipo: "Ingreso",
                    fecha: this.inFecha.value,
                };
                (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.agregarRegistro(datos, (error) => {
                    if (error) {
                        alert("Error: " + error);
                    }
                    else {
                        // 👇 Aquí mostramos directamente lo que se ingresó
                        this.lblDatos.innerHTML = `
              <p><strong>Referencia:</strong> ${datos.referencia}</p>
              <p><strong>Concepto:</strong> ${datos.concepto}</p>
              <p><strong>Monto:</strong> ${datos.monto}</p>
              <p><strong>Fecha:</strong> ${datos.fecha}</p>
            `;
                    }
                });
            },
        });
        this.btCancelar = this.crearHTMLButtonElement({
            elementName: "btCancelar",
            onclick: () => {
                var _a;
                this.show({ ver: false });
                (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.vista.show();
            },
        });
        // Creamos un contenedor para mostrar los datos
        this.lblDatos = document.createElement("div");
        (_a = this.vista) === null || _a === void 0 ? void 0 : _a.appendChild(this.lblDatos);
    }
}
exports.default = Cl_vRegistro;
