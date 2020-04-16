import { Planoconta } from 'src/app/planocontas/model/planoconta';
import { Usuario } from 'src/app/usuario/model/usuario';

export class Acerto {
    idacerto: number;
    data: Date;
    custo: number;
    motivo: string;
    planoconta: Planoconta;
    usuario: Usuario;
}