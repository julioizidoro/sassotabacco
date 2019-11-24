import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Produto } from '../model/produto';
import { Router } from '@angular/router';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-consproduto',
  templateUrl: './consproduto.component.html',
  styleUrls: ['./consproduto.component.scss']
})
export class ConsprodutoComponent implements OnInit {

  produtos: Produto[];
  formulario: FormGroup;
  isFirstOpen = false;
  oneAtATime: true;

constructor(
  private formBuilder: FormBuilder,
  private router: Router,
  private podutoService: ProdutoService,
) { }

ngOnInit() {
  this.formulario = this.formBuilder.group({
    codigo: [null],
    descricao: [null],
    codigobarras: [null],
  });
}

consulta() {
  this.podutoService.listar().subscribe(
    resposta => {
      this.produtos = resposta as any;
    }
  );
}

pesquisar() {
  let codigo : number = this.formulario.get('codigo').value;
  if (codigo!= null){
    this.podutoService.pesquisarId(codigo).subscribe(
      resposta => {
        this.produtos = resposta as any;
      }
    );  
  } else {
    let descricao = this.formulario.get('descricao').value;
    if (codigo!= null){
      this.podutoService.pesquisarDescricao(descricao).subscribe(
        resposta => {
          this.produtos = resposta as any;
        }
      );  
    } else {
      let codigoBarras = this.formulario.get('codgiobarras').value;
      if (codigoBarras!= null){
        this.podutoService.pesquisarCodigoBarras(codigoBarras).subscribe(
          resposta => {
            this.produtos = resposta as any;
          }
       );
      }  
    }
  }
}
}
