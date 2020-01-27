import { Atividade_principal } from './atividade_principal';
import { Atividades_secundarias } from './atividades_secudarias';
import { Qsa } from './qsa';
import { Extra } from './extra';
import { Billing } from './billing';

export class Cnpj {
    
    atividade_principal: Atividade_principal[];
    data_situacao : string;
    tipo: string;
    nome: string;
    situacao: string;
    bairro: string;
    logradouro: string;
    numero: string;
    cep: string;
    municipio: string;
    fantasia: string;
    porte: string;
    abertura: Date;
    natureza_juridica: string;
    uf: string;
    cnpj: string;
    ultima_atualizacao: string;
    status: string;
    complemento: string;
    email: string;
    telefone: string;
    efr: string;
    motivo_situacao: string;
    situacao_especial: string;
    data_situacao_especial: string;
    atividades_secundarias: Atividades_secundarias[];
    captial_social: string;
    qsa: Qsa[];
    extra: Extra;
    billing: Billing;

}