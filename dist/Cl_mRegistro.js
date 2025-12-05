"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cl_mRegistro {
    constructor(referencia, concepto, categoria, monto, tipo, fecha) {
        this.arrRegistro = [];
        this._referencia = "";
        this._concepto = "";
        this._categoria = "";
        this._monto = 0.0;
        this._tipo = "";
        this._fecha = "";
        this.referencia = referencia;
        this.concepto = concepto;
        this.categoria = categoria;
        this.monto = monto;
        this.tipo = tipo;
        this.fecha = fecha;
    }
    set referencia(referencia) {
        this._referencia = referencia;
    }
    get referencia() {
        return this._referencia;
    }
    set concepto(concepto) {
        this._concepto = concepto.toUpperCase().trim();
    }
    get concepto() {
        return this._concepto;
    }
    set categoria(categoria) {
        this._categoria = categoria;
    }
    get categoria() {
        return this._categoria;
    }
    set monto(monto) {
        this._monto = monto;
    }
    get monto() {
        return this._monto;
    }
    set tipo(tipo) {
        this._tipo = tipo;
    }
    get tipo() {
        return this._tipo;
    }
    set fecha(fecha) {
        this._fecha = fecha;
    }
    get fecha() {
        return this._fecha;
    }
    /**
 * Valida si la referencia es un número válido.
 * Utiliza una expresión regular para verificar que la referencia solo contenga dígitos numéricos.
 * @returns {boolean} - true si la referencia es un número válido, false en caso contrario.
 */
    get validarReferencia() {
        const referenciaRegex = /^[0-9]+$/;
        return referenciaRegex.test(this._referencia);
    }
    get validarconcepto() {
        return this.concepto.length > 0 && this.concepto.length < 30;
    }
    get validarMonto() {
        return this.monto > 0;
    }
    get validarFecha() {
        const fechaRegex = /^[0-9]+$/;
        return fechaRegex.test(this._fecha);
    }
    get ValidarRegistro() {
        if (!this.validarReferencia)
            return "Referencia";
        if (!this.validarconcepto)
            return "Concepto";
        if (!this.validarMonto)
            return "Monto";
        if (!this.validarFecha)
            return "Fecha";
        return true;
    }
    // validar que la referencia no se repita
    toJSON() {
        return {
            referencia: this._referencia,
            concepto: this._concepto,
            categoria: this._categoria,
            monto: this._monto,
            tipo: this._tipo,
            fecha: this._fecha
        };
    }
}
exports.default = Cl_mRegistro;
