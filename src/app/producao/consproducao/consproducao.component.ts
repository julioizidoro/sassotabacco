import { Component, OnInit } from '@angular/core';
import { Producao } from '../model/producao';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProducaoService } from '../producao.service';

@Component({
  selector: 'app-consproducao',
  templateUrl: './consproducao.component.html',
  styleUrls: ['./consproducao.component.scss']
})
export class ConsproducaoComponent implements OnInit {

  listaProducao: Producao[];
  formulario: FormGroup;
  isFirstOpen = false;
  oneAtATime: true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private producaoService: ProducaoService,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      descricao: [null],
    });
    this.consultar();
  }

  consultar() {
    this.producaoService.listar('@').subscribe(
      resposta => {
        this.listaProducao = resposta as any;
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
    this.producaoService.listar(descricao).subscribe(
      resposta => {
        this.listaProducao = resposta as any;
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    )
  }

  nova() {
    this.producaoService.setProducao(null);
    this.router.navigate(['/cadproducao']);
  }

  editar(producao: Producao) {
    this.producaoService.setProducao(producao);
    this.router.navigate(['/cadproducao']);
  }

}
