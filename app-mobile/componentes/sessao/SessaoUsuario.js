class SessaoUsuario {

    constructor() {
        this._logado = false;
    }

    set logado(logado) {
        this._logado = logado;
    }

    get logado() {
        return this._logado;
    }

    set usuario(usuario) {
        this._usuario = usuario;
    }

    get usuario() {
        return this._usuario;
    }

}

export const URL_BASE = "https://lancamento.herokuapp.com";

const sessaoUsuario = new SessaoUsuario();
export default sessaoUsuario;