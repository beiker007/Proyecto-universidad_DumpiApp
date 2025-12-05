import Cl_mRegistro from "./Cl_mRegistro";
import Cl_vRegistro from "./Cl_vRegistro";
export default class Cl_controlador {
    constructor() {
        this.arrRegistro = [];
        // Inicializa la vista y le pasa referencia al controlador
        this.vista = new Cl_vRegistro();
        this.vista.controlador = this; // vínculo vista ↔ controlador
    }
    // Método para agregar un registro desde la vista
    agregarRegistro(datos, callback) {
        const nuevo = new Cl_mRegistro(datos.referencia, datos.concepto, datos.categoria, datos.monto, datos.tipo, datos.fecha);
        const error = nuevo.ValidarRegistro;
        if (error !== true) {
            callback(error);
            return;
        }
        // Evitar duplicados por referencia
        const existe = this.arrRegistro.find(r => r.referencia === nuevo.referencia);
        if (existe) {
            callback("La referencia ya existe");
            return;
        }
        this.arrRegistro.push(nuevo);
        localStorage.setItem("registro", JSON.stringify(this.listarRegistro()));
        callback(false);
    }
    // Listar registros
    listarRegistro() {
        return this.arrRegistro.map(r => r.toJSON());
    }
    // Eliminar registro
    eliminarRegistro(referencia, callback) {
        const indice = this.arrRegistro.findIndex(r => r.referencia === referencia);
        if (indice < 0) {
            callback(`El registro con referencia "${referencia}" no existe.`);
            return;
        }
        this.arrRegistro.splice(indice, 1);
        localStorage.setItem("registro", JSON.stringify(this.listarRegistro()));
        callback(false);
    }
    // Cargar registros desde localStorage
    cargarDesdeStorage() {
        const data = localStorage.getItem("registro");
        if (data) {
            const lista = JSON.parse(data);
            lista.forEach(reg => {
                const nuevo = new Cl_mRegistro(reg.referencia, reg.concepto, reg.categoria, reg.monto, reg.tipo, reg.fecha);
                this.arrRegistro.push(nuevo);
            });
        }
    }
}
