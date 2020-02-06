import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Produto } from '../model/produto';
import { Router } from '@angular/router';
import { ProdutoService } from '../produto.service';
import { Estoque } from 'src/app/estoque/model/estoque';
import { EstoqueService } from 'src/app/estoque/estoque.service';

@Component({
  selector: 'app-consproduto',
  templateUrl: './consproduto.component.html',
  styleUrls: ['./consproduto.component.scss']
})
export class ConsprodutoComponent implements OnInit {

  listaEstoque: Estoque[];
  formulario: FormGroup;
  isFirstOpen = false;
  oneAtATime: true;

constructor(
  private formBuilder: FormBuilder,
  private router: Router,
  private estoqueService: EstoqueService,
) { }

ngOnInit() {
  this.formulario = this.formBuilder.group({
    codigo: [null],
    descricao: [null],
    codigobarras: [null],
  });
  this.consulta();
}

consulta() {
  console.log('inicio');
  this.estoqueService.listarProdutoDescricao('@').subscribe(
    resposta => {
      this.listaEstoque = resposta as any;
    }
  );
}

pesquisar() {
  let codigo : number = this.formulario.get('codigo').value;
  if (codigo!= null){
    this.estoqueService.pesquisarIdProduto(codigo).subscribe(
      resposta => {
        this.listaEstoque = resposta as any;
      }
    );  
  } else {
    let descricao = this.formulario.get('descricao').value;
    if (codigo!= null){
      this.estoqueService.listarProdutoDescricao(descricao).subscribe(
        resposta => {
          this.estoqueService = resposta as any;
        }
      );  
    } else {
      let codigoBarras = this.formulario.get('codgiobarras').value;
      if (codigoBarras!= null){
        this.estoqueService.listarProdutoCodigoBarras(codigoBarras).subscribe(
          resposta => {
            this.listaEstoque = resposta as any;
          }
       );
      }  
    }
  }
}


editar( estoque: Estoque) {
    this.estoqueService.setEstoque(estoque); 
    this.router.navigate(['/cadproduto']);
}


}
