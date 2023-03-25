import { userType } from "src/enums/userType";

export class Usuario {
    public id?: number;
    public nome?: string;
    public login?: string;
    public tipo?: userType
    public password?: string

    constructor(codigo: number, nome: string, login: string, tipo: userType, password: string) {
        this.id = codigo;
        this.nome = nome;
        this.login = login;
        this.tipo = tipo;
        this.password = password;
    }


}