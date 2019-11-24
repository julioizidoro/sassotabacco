import { ClienteService } from './../cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Instituicao } from '../model/instituicao';

@Component({
  selector: 'app-conscliente',
  templateUrl: './conscliente.component.html',
  styleUrls: ['./conscliente.component.scss']
})
export class ConsclienteComponent implements OnInit {

    instituicao: Instituicao[];
    formulario: FormGroup;
    isFirstOpen = false;
    oneAtATime: true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private clienteService: ClienteService,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null],
      email: [null],
      cnpj: [null],
    });
  }

  consulta() {
    this.clienteService.listar('c').subscribe(
      resposta => {
        this.instituicao = resposta as any;
      }
    );
  }

  pesquisar() {
    const nome = this.formulario.get('nome').value;
    const email = this.formulario.get('email').value;
    this.clienteService.pesquisar(nome, email).subscribe(
     resposta => {
       this.instituicao = resposta as any;
     }
   );
 }

}
