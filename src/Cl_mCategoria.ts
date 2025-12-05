export interface iCategoria{
    nombre: string  
}
export default class Cl_mCategoria{
    private _nombre: string = ""
    private arrCategoria: Cl_mCategoria[] =[]

    constructor(nombre: string){
        this.nombre = nombre
    }
    set nombre(nombre: string){
            this._nombre = nombre   
    }    
    get nombre(): string{
        return this._nombre
    }
      get ValidarNombre():boolean{
        return this._nombre.length > 0
    }
    get ValidarCategoria():string | true{
        if(!this.ValidarNombre) return "Nombre"
        return true
    }
    agregarCategoria({ categoria, callback }: { categoria: Cl_mCategoria; callback: (error: string | false) => void; }): void {
        let error = categoria.ValidarCategoria;
        if (!error ) { // Verifica si hay mensaje de error (string)
            callback(error);
            return;
        }
        let existe = this.arrCategoria.find((c) => c.nombre === categoria.nombre)

        if (existe) {
            callback("La Categoria ya existe")
            return
        }
        
        this.arrCategoria.push(categoria);
        localStorage.setItem("categoria", JSON.stringify(this.listarCategoria()))
        callback(false)
    }
  listarCategoria(): iCategoria[] {
    let lista: iCategoria[] = [];
    this.arrCategoria.forEach((categoria) => {
      lista.push(categoria.toJSON());
    });
    return lista;
  }

    deleteCategoria({ nombre, callback }: { nombre: string; callback: (error: string | false) => void; }): void {
        let indice = this.arrCategoria.findIndex((c) => c.nombre === nombre);

        if (indice < 0) {
            callback(`La categoría "${nombre}" no existe.`);
            return;
        }

        this.arrCategoria.splice(indice, 1);
        localStorage.setItem("categoria", JSON.stringify(this.listarCategoria()));
        callback(false);
    }
    
    toJSON(): iCategoria{
        return{
            nombre:this.nombre
        }
    }







}



