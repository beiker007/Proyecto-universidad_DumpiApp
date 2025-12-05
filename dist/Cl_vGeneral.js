export default class Cl_vGeneral {
    constructor({ formName }) {
        this._formName = "";
        this._vista = null;
        this._controlador = null;
        this.formName = formName;
        this.vista = this.crearHTMLElement({
            elementName: this.formName,
            isForm: true,
        });
    }
    set formName(formName) {
        this._formName = formName;
    }
    get formName() {
        return this._formName;
    }
    set vista(vista) {
        this._vista = vista;
    }
    get vista() {
        return this._vista;
    }
    set controlador(controlador) {
        this._controlador = controlador;
    }
    get controlador() {
        return this._controlador;
    }
    crearHTMLElement({ elementName, isForm = false, }) {
        let domElementName = isForm
            ? elementName
            : `${this.formName}_${elementName}`;
        let domElement = document.getElementById(domElementName);
        if (!domElement) {
            let msg = `Elemento ${domElementName} no encontrado`;
            alert(msg);
            throw new Error(msg);
        }
        return domElement;
    }
    crearHTMLInputElement({ elementName, }) {
        let domElementName = `${this.formName}_${elementName}`;
        let domElement = document.getElementById(domElementName);
        if (!domElement) {
            let msg = `Elemento ${domElementName} no encontrado`;
            alert(msg);
            throw new Error(msg);
        }
        return domElement;
    }
    crearHTMLButtonElement({ elementName, onclick, }) {
        let domElementName = `${this.formName}_${elementName}`;
        let domElement = document.getElementById(domElementName);
        if (!domElement) {
            let msg = `Elemento ${domElementName} no encontrado`;
            alert(msg);
            throw new Error(msg);
        }
        if (onclick)
            domElement.onclick = onclick;
        return domElement;
    }
    show({ ver = true } = { ver: true }) {
        if (this.vista)
            this.vista.style.display = ver ? "flex" : "none";
    }
}
