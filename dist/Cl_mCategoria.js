"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cl_mCategoria {
    constructor(nombre) {
        this._nombre = "";
        this.arrCategoria = [];
        this.nombre = nombre;
    }
    set nombre(nombre) {
        this._nombre = nombre;
    }
    get nombre() {
        return this._nombre;
    }
    get ValidarNombre() {
        return this._nombre.length > 0;
    }
    get ValidarCategoria() {
        if (!this.ValidarNombre)
            return "Nombre";
        return true;
    }
    agregarCategoria({ categoria, callback }) {
        let error = categoria.ValidarCategoria;
        if (!error) { // Verifica si hay mensaje de error (string)
            callback(error);
            return;
        }
        let existe = this.arrCategoria.find((c) => c.nombre === categoria.nombre);
        if (existe) {
            callback("La Categoria ya existe");
            return;
        }
        this.arrCategoria.push(categoria);
        localStorage.setItem("categoria", JSON.stringify(this.listarCategoria()));
        callback(false);
    }
    listarCategoria() {
        let lista = [];
        this.arrCategoria.forEach((categoria) => {
            lista.push(categoria.toJSON());
        });
        return lista;
    }
    deleteCategoria({ nombre, callback }) {
        let indice = this.arrCategoria.findIndex((c) => c.nombre === nombre);
        if (indice < 0) {
            callback(`La categoría "${nombre}" no existe.`);
            return;
        }
        this.arrCategoria.splice(indice, 1);
        localStorage.setItem("categoria", JSON.stringify(this.listarCategoria()));
        callback(false);
    }
    toJSON() {
        return {
            nombre: this.nombre
        };
    }
}
exports.default = Cl_mCategoria;
