export interface iRegistro {
    referencia: string;
    concepto: string;
    categoria: string;
    monto: number;
    tipo: string;
   fecha: string;
   }
   export default class Cl_mRegistro{
    private arrRegistro: Cl_mRegistro[] = [];
    private _referencia: string = "";
    private _concepto: string = "";
    private _categoria: string = "";
    private _monto: number = 0.0;
    private _tipo: string = "";
    private _fecha: string = "";
    constructor(
        referencia: string,
        concepto: string,
        categoria: string,
        monto: number,
        tipo: string,
        fecha: string){
        this.referencia = referencia;
        this.concepto = concepto;
        this.categoria = categoria;
        this.monto = monto;
        this.tipo = tipo;
        this.fecha = fecha;
    }
    set referencia(referencia: string){
        this._referencia = referencia;
    }
    get referencia(): string{
        return this._referencia;
    }   
    set concepto(concepto: string){
        this._concepto = concepto.toUpperCase().trim();
    }
    get concepto(): string{
        return this._concepto;
    }
    set categoria(categoria: string){
        this._categoria = categoria;
    }
    get categoria(): string {
        return this._categoria;
    }
    set monto(monto: number){
        this._monto = monto;
    }
    get monto(): number{
        return this._monto;
    }
    set tipo(tipo: string){
        this._tipo = tipo;
    }
     get tipo(): string{
        return this._tipo;
    }
    set fecha(fecha: string){
        this._fecha = fecha;    
    }
    get fecha(): string{
        return this._fecha;
    }
    /**
 * Valida si la referencia es un número válido.
 * Utiliza una expresión regular para verificar que la referencia solo contenga dígitos numéricos.
 * @returns {boolean} - true si la referencia es un número válido, false en caso contrario.
 */
get validarReferencia(): boolean {
    const referenciaRegex = /^[0-9]+$/;
    return referenciaRegex.test(this._referencia);
}

    get validarconcepto(): boolean {
        return this.concepto.length > 0 && this.concepto.length < 30
    }
    get validarMonto(): boolean {
        return this.monto > 0
    }
    get validarFecha(): boolean {
    const fechaRegex = /^[0-9]+$/;
    return fechaRegex.test(this._fecha);
    }
    get ValidarRegistro(): string | true {
        if (!this.validarReferencia) return "Referencia"
        if (!this.validarconcepto) return "Concepto"
        if (!this.validarMonto) return "Monto"
        if (!this.validarFecha) return "Fecha"
        return true  
}

// validar que la referencia no se repita
toJSON(): iRegistro{
        return {
            referencia: this._referencia,
            concepto: this._concepto,
            categoria: this._categoria,
            monto: this._monto,
            tipo: this._tipo,
            fecha: this._fecha
        }
    }
}

