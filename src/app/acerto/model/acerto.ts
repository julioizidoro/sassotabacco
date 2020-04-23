import { Planoconta } from 'src/app/planocontas/model/planoconta';
import { Usuario } from 'src/app/usuario/model/usuario';
import { Empresa } from 'src/app/empresa/model/empresa';


export class Acerto {
    idacerto: number;
    data: Date;
    custo: number;
    motivo: string;
    planoconta: Planoconta;
    usuario: Usuario;
    empresa: Empresa;
}