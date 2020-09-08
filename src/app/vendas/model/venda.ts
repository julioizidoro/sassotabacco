import { Instituicao } from 'src/app/cliente/model/instituicao';
import { Usuario } from 'src/app/usuario/model/usuario';
import { Empresa } from 'src/app/empresa/model/empresa';
import { Vendaproduto } from './vendaproduto';

export class Venda {

    idvenda: number;
    tipo: number;
    hora: string;
    datatipo: Date;
    situacaotipo: string;
    datavalidade: string;
    formapagamento: string;
    observacao: string;
    subtotal: number;
    desconto: number;
    totalliquido: number;
    condicaopagamento: string;
    observacaoparcela: string;
    vendaprodutoList: Vendaproduto;
    empresa: Empresa;
    usuario: Usuario;
    numeroitens: number;
}