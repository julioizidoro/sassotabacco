import { ReceitaService } from 'src/app/receita/receita.service';
import { Usuario } from 'src/app/usuario/model/usuario';
import { Planoconta } from 'src/app/planocontas/model/planoconta';
import { Producaoproduto } from './producaoproduto';
import { Receita } from 'src/app/receita/model/receita';
import { EmpresaModule } from 'src/app/empresa/empresa.module';
import { Empresa } from 'src/app/empresa/model/empresa';

export class Producao {

    idproducao: number;
    quantidade: number;
    custo: number;
    data: Date;
    situacao: string;
    planoconta: Planoconta;
    receita: Receita;
    usuario: Usuario;
    empresa: Empresa;
}