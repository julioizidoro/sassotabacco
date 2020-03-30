import { Fluxocaixa } from './fluxocaixa';
import { Grupoplanoconta } from 'src/app/grupocontas/model/grupoplanoconta';
import { Planoconta } from 'src/app/planocontas/model/planoconta';
import { Conta } from 'src/app/conta/model/conta';

export class Fluxomostrar {
    fluxocaixa: Fluxocaixa;
    tipo: string;
    documento: string;
    descricao: string;
    grupoplanoconta: Grupoplanoconta;
    planoconta: Planoconta;
    valorentrada: number;
    valorsaida: number;
    realizado: boolean;
    
}