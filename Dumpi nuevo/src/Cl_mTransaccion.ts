import Cl_mCategoria, { iCategoria } from "./Cl_mCategoria";
import Cl_mRegistro, { iRegistro } from "./Cl_mRegistro";

export default class Cl_mTransaccion {
  private arrTransaccion: Cl_mRegistro[] = [];

  constructor() {}
  agregarTransaccion({
    transaccion,
    callback,
  }: {
    transaccion: iRegistro;
    callback: (error: string | false) => void;
  }): void {
    const nuevo = new Cl_mRegistro(
      transaccion.referencia,
      transaccion.concepto,
      transaccion.categoria,
      transaccion.monto,
      transaccion.tipo,
      transaccion.fecha
    );

    const validar = nuevo.ValidarRegistro;
    if (validar !== true) {
      callback(`Error de validación en: ${validar}`);
      return;
    }

    const existe = this.arrTransaccion.some(
      (t) => t.referencia === nuevo.referencia
    );

    if (existe) {
      callback("Referencia ya existente en el sistema");
      return;
    }

    this.arrTransaccion.push(nuevo);
    localStorage.setItem(
      "transaccion",
      JSON.stringify(this.listarTransaccion())
    );
    callback(false);
  }

  /**
   * Elimina un movimiento de la lista de movimientos.
   * Verifica si el movimiento con la referencia existe, si no existe devuelve un mensaje de error.
   * @param {{referencia: string, callback: (error: string | false) => void}} - Parámetros de la función.
   * @param referencia - La referencia del movimiento a eliminar.
   * @param callback - La función a ejecutar cuando se complete la operación.
   */
  deleteTransaccion({
    referencia,
    callback,
  }: {
    referencia: string;
    callback: (error: string | false) => void;
  }): void {
    const index = this.arrTransaccion.findIndex(
      (m) => m.referencia === referencia
    );

    if (index === -1) {
      callback(
        `No se encontró ningún movimiento con la referencia: ${referencia}`
      );
      return;
    }

    this.arrTransaccion.splice(index, 1);
    localStorage.setItem(
      "movimiento",
      JSON.stringify(this.listarTransaccion())
    );
    callback(false);
  }

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Edita un movimiento existente en la lista de movimientos.
   * Verifica si el movimiento con la referencia existe, si no existe devuelve un mensaje de error.
   * Verifica si el movimiento a editar tiene errores de validación, si es así
   * devuelve un mensaje de error.
   * @param {{transaccion: iRegistro, callback: (error: string | false) => void}} - Parámetros de la función.
   * @param transaccion - El movimiento a editar.
   * @param callback - La función a ejecutar cuando se complete la operación.
   */
  /*******  6bd26bbe-d8d6-47ed-aaa8-f423bd96cabd  *******/
  editarTransaccion({
    transaccion,
    callback,
  }: {
    transaccion: iRegistro;
    callback: (error: string | false) => void;
  }): void {
    let Tran = new Cl_mTransaccion();

    if (!Tran.ValidarMovimiento) {
      // Verifica si hay mensaje de error (string)
      callback(mov.movimientoOk);
      return;
    }

    const referenciaNueva = transaccion.referencia;
    const index = this.arrTransaccion.findIndex(
      (t) => t.referencia === referenciaNueva
    );

    if (index === -1) {
      callback(
        `No se encontró el movimiento con referencia: ${referenciaNueva} para editar.`
      );
      return;
    }

    this.arrTransaccion[index] = Tran;
    localStorage.setItem(
      "movimiento",
      JSON.stringify(this.listarTransaccion())
    );
    callback(false);
  }

  // --- MÉTODOS DE LISTADO ---

  /**
   * Convierte la lista de movimientos en formato iRegistro
   * para que sea compatible con la interfaz de la aplicación.
   * @return {iRegistro[]} La lista de movimientos en formato iRegistro
   */
  listarTransaccion(): iRegistro[] {
    let lista: iRegistro[] = [];
    this.arrTransaccion.forEach((registro) => {
      lista.push(registro.toJSON());
    });
    return lista;
  }
  // =========================================================================================
  // ============================= NUEVOS MÉTODOS DE ANÁLISIS ================================
  // =========================================================================================

  // Calcula Monto Total Abonos, Monto Total Cargos y Saldo Final
  obtenerBalanceAnalisis(): {
    montoTotalAbonos: number;
    montoTotalCargos: number;
    saldoFinal: number;
  } {
    const TIPO_ABONO = "ABONO";
    const TIPO_CARGO = "CARGO";

    const resultado = this.arrTransaccion.reduce(
      (acumulador, mov) => {
        if (mov.tipo === TIPO_ABONO) {
          acumulador.montoTotalAbonos += mov.monto;
        } else if (mov.tipo === TIPO_CARGO) {
          acumulador.montoTotalCargos += mov.monto;
        }
        return acumulador;
      },
      {
        montoTotalAbonos: 0,
        montoTotalCargos: 0,
        saldoFinal: 0,
      }
    );

    resultado.saldoFinal =
      resultado.montoTotalAbonos - resultado.montoTotalCargos;

    return resultado;
  }

  // Realiza un Desglose por Categoría (Abonos, Cargos, Diferencial)
  desglosePorCategoria(): {
    [categoria: string]: {
      totalAbonos: number;
      totalCargos: number;
      diferencial: number;
    };
  } {
    const TIPO_ABONO = "ABONO";
    const TIPO_CARGO = "CARGO";

    const desglose: {
      [categoria: string]: {
        totalAbonos: number;
        totalCargos: number;
        diferencial: number;
      };
    } = {};

    this.arrTransaccion.forEach((tran) => {
      if (!desglose[tran.categoria]) {
        desglose[tran.categoria] = {
          totalAbonos: 0,
          totalCargos: 0,
          diferencial: 0,
        };
      }

      if (tran.tipo === TIPO_ABONO) {
        desglose[tran.categoria].totalAbonos += tran.monto;
      } else if (tran.tipo === TIPO_CARGO) {
        desglose[tran.categoria].totalCargos += tran.monto;
      }
    });

    for (const cat in desglose) {
      desglose[cat].diferencial =
        desglose[cat].totalAbonos - desglose[cat].totalCargos;
    }

    return desglose;
  }

  // Identifica la Mayor Categoría de Gasto y la Mayor Categoría de Ingreso
  obtenerMayorCategoria(): {
    mayorGasto: { nombre: string; monto: number };
    mayorIngreso: { nombre: string; monto: number };
  } {
    const desglose = this.desglosePorCategoria();

    let mayorGasto = { nombre: "", monto: -1 };
    let mayorIngreso = { nombre: "", monto: -1 };

    for (const nombreCategoria in desglose) {
      const datos = desglose[nombreCategoria];

      if (datos.totalCargos > mayorGasto.monto) {
        mayorGasto = { nombre: nombreCategoria, monto: datos.totalCargos };
      }

      if (datos.totalAbonos > mayorIngreso.monto) {
        mayorIngreso = { nombre: nombreCategoria, monto: datos.totalAbonos };
      }
    }

    return { mayorGasto, mayorIngreso };
  }

  // --- MÉTODOS DE FILTRADO ---

  // Filtra movimientos por Fecha, Monto (Rango), Referencia y Categoría
  listarMovimientosFiltrados({
    fecha,
    montoMin,
    montoMax,
    referencia,
    categoria,
  }: {
    fecha?: string;
    montoMin?: number;
    montoMax?: number;
    referencia?: string;
    categoria?: string;
  }): iRegistro[] {
    let resultados = this.arrTransaccion;

    // Filtro por CATEGORÍA
    if (categoria && categoria.trim() !== "") {
      resultados = resultados.filter((tran) => tran.categoria === categoria);
    }

    // Filtro por REFERENCIA (búsqueda parcial)
    if (referencia && referencia.trim() !== "") {
      resultados = resultados.filter((tran) =>
        tran.referencia.includes(referencia)
      );
    }

    // Filtro por FECHA (día exacto)
    if (fecha && fecha.trim() !== "") {
      resultados = resultados.filter((tran) => tran.fecha === fecha);
    }

    // Filtro por MONTO (Rango)
    if (montoMin !== undefined || montoMax !== undefined) {
      resultados = resultados.filter((mov) => {
        const cumpleMin = montoMin === undefined || mov.monto >= montoMin;
        const cumpleMax = montoMax === undefined || mov.monto <= montoMax;
        return cumpleMin && cumpleMax;
      });
    }

    // Retorna la lista filtrada en formato IMovimientos[]
    return resultados.map((mov) => mov.toJSON());
  }
}
