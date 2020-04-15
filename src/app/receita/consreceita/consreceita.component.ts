import { Component, OnInit } from '@angular/core';
import { Receita } from '../model/receita';
import { EstoqueService } from 'src/app/estoque/estoque.service';
import { ReceitaService } from '../receita.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consreceita',
  templateUrl: './consreceita.component.html',
  styleUrls: ['./consreceita.component.scss']
})
export class ConsreceitaComponent implements OnInit {

  listaReceitas: Receita[];
  formulario: FormGroup;
  isFirstOpen = false;
  oneAtATime: true;


  constructor(
    private estoqueService: EstoqueService,
    private receitaService: ReceitaService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      descricao: [null],
    });
    this.consultar();
  }

  consultar() {
    this.receitaService.listar("@").subscribe(
      resposta => {
        this.listaReceitas = resposta as any;
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    )
  }

  pesquisarDescricao() {
    let descricao = this.formulario.get('descricao').value;
    if (descricao === null) {
      descricao = "@";
    }
    this.receitaService.listar(descricao).subscribe(
      resposta => {
        this.listaReceitas = resposta as any;
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    )
  }

  nova() {
    this.receitaService.setReceita(null);
    this.router.navigate(['/cadreceita']);
  }

  editar(receita: Receita) {
    this.receitaService.setReceita(receita);
    this.router.navigate(['/cadreceita']);
  }


}
