import Cl_mRegistro, { iRegistro } from "./Cl_mRegistro";

export default class Cl_controlador {
  private arrRegistro: Cl_mRegistro[] = [];
  // La vista se asigna desde el bootstrap (p. ej. Cl_principal) para evitar dependencia circular
  public vista: any = null;

  constructor() {
    // constructor mínimo: la vista será asignada externamente
  }

  // Método para agregar un registro desde la vista
  public agregarRegistro(datos: iRegistro, callback: (error: string | false) => void): void {
    const nuevo = new Cl_mRegistro(
      datos.referencia,
      datos.concepto,
      datos.categoria,
      datos.monto,
      datos.tipo,
      datos.fecha
    );

    const error = nuevo.ValidarRegistro;
    if (error !== true) {
      callback(error as string);
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
  public listarRegistro(): iRegistro[] {
    return this.arrRegistro.map(r => r.toJSON());
  }

  // Eliminar registro
  public eliminarRegistro(referencia: string, callback: (error: string | false) => void): void {
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
  public cargarDesdeStorage(): void {
    const data = localStorage.getItem("registro");
    if (data) {
      const lista: iRegistro[] = JSON.parse(data);
      lista.forEach(reg => {
        const nuevo = new Cl_mRegistro(
          reg.referencia,
          reg.concepto,
          reg.categoria,
          reg.monto,
          reg.tipo,
          reg.fecha
        );
        this.arrRegistro.push(nuevo);
      });
    }
  }
}
