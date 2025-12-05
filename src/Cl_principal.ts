import Cl_controlador from "./Cl_controlador";
import Cl_vRegistro from "./Cl_vRegistro";

export default class Cl_principal {
    private controlador: Cl_controlador;

    constructor() {
        // Bootstrap: crear controlador y vista y conectarlos aquí
        this.controlador = new Cl_controlador();
        const vista = new Cl_vRegistro();
        // Asignar la vista al controlador y el controlador a la vista
        this.controlador.vista = vista;
        vista.controlador = this.controlador;

        if (typeof this.controlador.cargarDesdeStorage === "function") {
            this.controlador.cargarDesdeStorage();
        }

        this.renderTabla();
    }

    renderTabla() {
        const tbody = document.getElementById("tbodyRegistros") as HTMLElement | null;
        if (!tbody) return;
        tbody.innerHTML = "";

        const listar = (this.controlador as any).listarRegistro;
        if (typeof listar !== "function") return;

        const registros = listar.call(this.controlador) as Array<any>;
        registros.forEach((reg) => {
            const tr = document.createElement("tr");
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

// Arranca la aplicación al cargar este módulo
new Cl_principal();
 