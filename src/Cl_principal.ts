 import Cl_controlador from "./Cl_controlador.js";

 export default class Cl_principal{
    private controlador: Cl_controlador;

    constructor(){
        this.controlador = new Cl_controlador();
        if (typeof this.controlador.cargarDesdeStorage === 'function') {
            this.controlador.cargarDesdeStorage();
        }

        const form = document.getElementById('formRegistro') as HTMLFormElement | null;
        if (form) {
            form.addEventListener('submit', (event) => {
                event.preventDefault();

                const referencia = (document.getElementById('inReferencia') as HTMLInputElement).value;
                const concepto = (document.getElementById('inConcepto') as HTMLInputElement).value;
                const montoStr = (document.getElementById('inMonto') as HTMLInputElement).value;
                const monto = parseFloat(montoStr) || 0;
                const fecha = (document.getElementById('inFecha') as HTMLInputElement).value;

                const datos = { referencia, concepto, categoria: "General", monto, tipo: "Ingreso", fecha };

                if (typeof this.controlador.agregarRegistro === 'function') {
                    this.controlador.agregarRegistro(datos, (error: string | false) => {
                        if (error) {
                            alert("Error: " + error);
                        } else {
                            alert("Registro agregado correctamente");
                            (form as HTMLFormElement).reset();
                            this.renderTabla();
                        }
                    });
                }
            });
        }

        this.renderTabla();
    }

    renderTabla() {
        const tbody = document.getElementById('tbodyRegistros') as HTMLElement | null;
        if (!tbody) return;
        tbody.innerHTML = '';

        const listar = (this.controlador as any).listarRegistro;
        if (typeof listar !== 'function') return;

        const registros = listar.call(this.controlador) as Array<any>;
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
 