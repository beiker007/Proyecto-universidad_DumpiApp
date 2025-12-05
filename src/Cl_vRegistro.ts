import { iRegistro } from "./Cl_mRegistro";
import Cl_vGeneral from "./Cl_vGeneral";

export default class Cl_vRegistro extends Cl_vGeneral {
  private inReferencia: HTMLInputElement;
  private inConcepto: HTMLInputElement;
  private inMonto: HTMLInputElement;
  private inFecha: HTMLInputElement;

  private btRegistrar: HTMLButtonElement;
  private btCancelar: HTMLButtonElement;

  // Área donde se mostrarán los datos ingresados
  private lblDatos: HTMLElement;

  public _controlador: Cl_controlador | null = null;

  constructor() {
    super({ formName: "formRegistro" });

    this.inReferencia = this.crearHTMLInputElement({ elementName: "inReferencia" });
    this.inConcepto   = this.crearHTMLInputElement({ elementName: "inConcepto" });
    this.inMonto      = this.crearHTMLInputElement({ elementName: "inMonto" });
    this.inFecha      = this.crearHTMLInputElement({ elementName: "inFecha" });

    this.btRegistrar = this.crearHTMLButtonElement({
      elementName: "btRegistrar",
      onclick: () => {
        const datos: iRegistro = {
          referencia: this.inReferencia.value,
          concepto: this.inConcepto.value,
          categoria: "General",
          monto: parseFloat(this.inMonto.value),
          tipo: "Ingreso",
          fecha: this.inFecha.value,
        };

        this.controlador?.agregarRegistro(datos, (error) => {
          if (error) {
            alert("Error: " + error);
          } else {
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
        this.show({ ver: false });
        this.controlador?.vista.show();
      },
    });

    // Creamos un contenedor para mostrar los datos
    this.lblDatos = document.createElement("div");
    this.vista?.appendChild(this.lblDatos);
  }
}