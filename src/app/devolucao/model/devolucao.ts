import { Planoconta } from 'src/app/planocontas/model/planoconta';
import { Usuario } from 'src/app/usuario/model/usuario';
import { Instituicao } from 'src/app/cliente/model/instituicao';
import { Empresa } from 'src/app/empresa/model/empresa';

export class Devolucao {
    
    iddevolucao: number;
    data: Date;
    custo: number;
    observacao: string;
    planoconta: Planoconta;
    usuario: Usuario;
    instituicao: Instituicao;
    empresa: Empresa;
}