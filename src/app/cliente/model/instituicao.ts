import { Instituicaoendereco } from './instituicaoendereco';
import { Instituicaocontato } from './instituicaocontato';

export class Instituicao {

    idinstituicao: number;
    nome: string;
    tipojuridico: string;
    situacao: string;
    cpfcnpj: string;
    possuiei: string;
    ie: string;
    im: string;
    optantesimples: string;
    email: string;
    fonefixo: string;
    fonecelular: string;
    datanascimento: Date;
    observacao: string;
    tipo: string;
    instituicaocontato: Instituicaocontato;
    instituicaoendereco: Instituicaoendereco;
}
