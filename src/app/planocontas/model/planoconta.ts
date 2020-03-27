import { Grupoplanoconta } from 'src/app/grupocontas/model/grupoplanoconta';

export class Planoconta {

    idplanoconta: number;
    descricao: string;
    conta: string;
    grupoplanoconta: Grupoplanoconta;
    lancamentobens: boolean;
}
