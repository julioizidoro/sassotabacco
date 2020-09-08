import { Component, OnInit } from '@angular/core';
import { Estoque } from 'src/app/estoque/model/estoque';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EstoqueService } from 'src/app/estoque/estoque.service';
import { AuthService } from 'src/app/usuario/login/auth.service';
import { Produto } from 'src/app/produto/model/produto';
import { Venda } from '../model/venda';
import { Contas } from 'src/app/contas/model/contas';
import { Vendaproduto } from '../model/vendaproduto';
import { VendasService } from '../vendas.service';
import * as moment from 'moment';

@Component({
  selector: 'app-cadvendas',
  templateUrl: './cadvendas.component.html',
  styleUrls: ['./cadvendas.component.scss']
})
export class CadvendasComponent implements OnInit {

  formulario: FormGroup;
  venda: Venda;
  listaEstoque: Estoque[];
  listaProdutos: Produto[];
  produtoSelecionado: Produto;
  avista: boolean;
  aprazo: boolean;
  listaContas: Contas[];
  dataVencimento: Date;
  inputDataCompra: boolean;
  totalLiquido: number;
  valorTotal: number;
  listaVendaProduto: Vendaproduto[];
  estoqueSelecionado: Estoque;
  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private estoqueService: EstoqueService,
    private authService: AuthService,
    private vendasService: VendasService,
  ) { }

  ngOnInit() {
    this.inputDataCompra = false;
    this.listarEstoque();
    this.iniciarFormularioNovo();
  
      this.avista = false;
      this.aprazo = false;
      this.venda = new Venda();
      this.venda.subtotal=0;
      this.venda.totalliquido = 0;
      this.venda.desconto=0;
      this.valorTotal = 0;
      this.totalLiquido = 0;
      this.listaVendaProduto = [];
  }

  iniciarFormularioNovo() {
    let data = new Date();
    this.formulario = this.formBuilder.group({
      idvenda: [null],
      tipo: [null],
      datatipo: data,
      situacaotipo: [null],
      datavalidade: [null],
      formapagamento: [null],
      observacao: [null],
      subtotal: [null],
      desconto: [null],
      totalliquido: [null],
      condicaopagamento: [null],
      observacaoparcela: [null],
      vendaprodutolista: [null],
      vendaconta: [null],
      empresa: [null],
      instituicao: [null],
      usuario: [null],
      numeroitens: [null],
      produtoquantidade: [null],
      produtounitario: [null],
      produtototal: [null],
      datavencimento: [null],
    });
  }

  listarEstoque() {
    this.estoqueService.listarProdutoDescricao('@').subscribe(
      resposta => {
        this.listaEstoque = resposta as any;
        if (this.listaEstoque.length>0){
          this.listaProdutos = [];
          for (let i=0;i<this.listaEstoque.length;i++){
            this.listaProdutos.push(this.listaEstoque[i].produto);
          }
          this.produtoSelecionado = this.listaProdutos[0];
        }
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
  }

  

  

  
  
  addProduto() {
    let quantidade = this.formulario.get('produtoquantidade').value;
    if (quantidade===null) {
      quantidade = 1;
      this.formulario.patchValue({
        produtounitario : quantidade,
    });
    } else if (quantidade===0) {
      quantidade = 1;
      this.formulario.patchValue({
        produtounitario : quantidade,
    });
    }
    let unitario = this.formulario.get('produtounitario').value;
    let vendaProduto = new Vendaproduto();
    vendaProduto.estoque = this.getEstoque(this.produtoSelecionado);
    vendaProduto.quantidade = quantidade;
    vendaProduto.subtotal = vendaProduto.quantidade * this.estoqueSelecionado.valorvenda;
    this.listaVendaProduto.push(vendaProduto);
     this.valorTotal = this.valorTotal + vendaProduto.subtotal;
    this.totalLiquido = this.totalLiquido + vendaProduto.subtotal;
    this.formulario.patchValue({
      produtoquantidade: 0,
      produtounitario: 0,
      produtototal: 0,
    }); 
    this.produtoSelecionado = new Produto();
    this.estoqueSelecionado = new Estoque();
  }

  removerProuto(posicao: number) {
    console.log(posicao);
    let produto = new Vendaproduto();
    produto = this.listaVendaProduto[posicao];
    this.valorTotal = this.valorTotal - produto.subtotal;
    this.totalLiquido = this.totalLiquido - produto.subtotal;
    this.calcularDesconto();
    this.listaVendaProduto.splice(posicao,1);
  }

  calcularparcelas() {
    let formapgamento = this.formulario.get('formapagamento').value;
  //  let documetno = this.formulario.get('documento').value;
    if (formapgamento != null) {
      if (formapgamento === 'a prazo') {
        this.avista = false;
        this.aprazo = true;
      } else {
        this.avista = true;
        this.aprazo = false;
        /*let numeroParcelas = formapgamento;
        this.listaContas = [];
        for (let i=0;i<numeroParcelas;i++){
          let conta = new Contas(); 
          conta.dataemissao = new Date();
          conta.documento = documetno;
          conta.datavencimento  = this.gerarDataVencimento(i+1, this.formulario.get('datacompra').value);
          conta.desconto = 0;
          conta.instituicao = this.fornecedorSelecionado;
          conta.juros = 0;
          conta.numeroparcela = i+1;
          conta.planoconta = this.planoContaSelecionado;
          conta.tipo = 'p';
          conta.valorpago= 0;
          let valorparcela = this.totalLiquido;
          conta.valorparcela = valorparcela/numeroParcelas;
          this.listaContas.push(conta);
        }*/
      }
    }
  }

 /* gerarDataVencimento(parcela: number, dataCompra: Date)  {
    let dataVencimento;
    dataVencimento = (moment(dataCompra).add(parcela, 'month')); 
    dataVencimento = moment(dataVencimento, "DD/MM/YYYY");
     return dataVencimento;
  }*/

  setDataCompra() {
    console.log('Entrou');
    let data = this.formulario.get('datacompra').value;
    if (data !=null ) {
      if (moment(data).isValid) {
        this.inputDataCompra = true;
      } else this.inputDataCompra = false; 
    } else this.inputDataCompra = false;
  }


  salvar() {
    console.log('salvar');
    this.venda = this.formulario.value;
    this.venda.usuario = this.authService.usuario;
    this.venda.subtotal = this.valorTotal;
    this.venda.desconto =  this.formulario.get('desconto').value;
    if(this.venda.desconto===null) {
      this.venda.desconto=0;
    }
    this.venda.totalliquido = this.totalLiquido;
    this.venda.empresa = this.authService.getEmpresa();
    this.venda.numeroitens = this.listaVendaProduto.length;
  /*  this.listavendaConta = [];
    if (this.listaContas.length > 0) {
      for (let i=0;i<this.listaContas.length;i++) {
        let compraConta = new Comprasconta();
        compraConta.compras = this.compra;
        compraConta.contas = this.listaContas[i];
        this.listaCompraConta.push(compraConta);
      }
    
    }else {
      let compraConta = new Comprasconta();
      compraConta.compras = this.compra;
      let conta = new Contas(); 
          conta.dataemissao = this.formulario.get('datacompra').value;
          conta.documento = this.compra.documento;
          conta.datavencimento  = this.formulario.get('datavencimento').value;
          conta.desconto = 0;
          conta.instituicao = this.fornecedorSelecionado;
          conta.juros = 0;
          conta.numeroparcela = 1;
          conta.planoconta = this.planoContaSelecionado;
          conta.tipo = 'p';
          conta.valorpago= 0;
          conta.valorparcela = this.totalLiquido;
          this.listaContas.push(conta);
      compraConta.contas = conta;
      this.listaCompraConta.push(compraConta);
    }*/
    this.vendasService.salvar(this.venda).subscribe(
      resposta => {
        this.venda = resposta as any;
        
        
        for(let i=0;i<this.listaVendaProduto.length;i++){
          this.listaVendaProduto[i].venda = this.venda;
        }
        this.vendasService.salvarProduto(this.listaVendaProduto).subscribe(
          resposta => {
            this.listaVendaProduto = [];
            this.formulario.reset();
            this.totalLiquido =0;
            this.valorTotal = 0;
            this.venda = new Venda();

          },
          err => {
            console.log(JSON.stringify(err));
          }
        );
        
      }
    )

  }

  cancelar() {
      this.formulario.reset();
      this.router.navigate(['/consvenda']);
  }

  getEstoque(produto: Produto) {
    for (let i=0; i<this.listaEstoque.length;i++){
      if (this.listaEstoque[i].produto.idproduto === produto.idproduto) {
        return this.listaEstoque[i];
        i = this.listaEstoque.length + 100;
      }
    }
  }

  

  onChangeProduto() {
    console.log('Entrou');
    this.estoqueSelecionado = this.getEstoque(this.produtoSelecionado);
    this.formulario.patchValue({
      produtounitario : this.estoqueSelecionado.valorvenda,
  });

  this.calcularValorTotalProduto();
}

calcularValorTotalProduto() {
  let quantidade = this.formulario.get('produtoquantidade').value;
  if (quantidade===null) {
    quantidade = 1;
    this.formulario.patchValue({
      produtounitario : quantidade,
  });
  } else if (quantidade===0) {
    quantidade = 1;
    this.formulario.patchValue({
      produtounitario : quantidade,
  });
  }
    let valor = this.estoqueSelecionado.valorvenda * quantidade;
    this.formulario.patchValue({
      produtototal : valor,
    }); 
  

}

calcularDesconto() {
  let desconto = this.formulario.get('desconto').value;
  if (desconto!=null) {
    this.totalLiquido = this.valorTotal - desconto;
    this.formulario.patchValue({
      totalliquido: this.totalLiquido,
    }); 
  } 
}

}
