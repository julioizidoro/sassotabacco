import { Acesso } from 'src/app/acesso/model/acesso';
import { Empresa } from 'src/app/empresa/model/empresa';

export class Usuario {
  idusuario: number;
    nome: string;
    datanascimento: Date;
    login: string;
    senha: string;
    email: string;
    fonecelular: string;
    situacao: boolean;
    urlfoto: string;
    acesso: Acesso;
    listaempresa: Empresa[];
}
