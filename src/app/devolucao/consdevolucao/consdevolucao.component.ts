import { Component, OnInit } from '@angular/core';
import { Devolucao } from '../model/devolucao';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DevolucaoService } from '../devolucao.service';

@Component({
  selector: 'app-consdevolucao',
  templateUrl: './consdevolucao.component.html',
  styleUrls: ['./consdevolucao.component.scss']
})
export class ConsdevolucaoComponent implements OnInit {

  isFirstOpen = false;
  oneAtATime: true;
  listaDevolucao: Devolucao[];
  formulario: FormGroup;


  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private devolucaoService: DevolucaoService,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      datainicial: [null],
      datafinal: [null],
    });
    this.consultar();
  }

  consultar() {
    this.devolucaoService.listarDevolucao().subscribe(
      resposta => {
        this.listaDevolucao = resposta as any;
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }

  editar(devolucao: Devolucao) {
    this.devolucaoService.setDevolucao(devolucao);
    this.router.navigate(['/caddevolucao']);
  }

  novo() {
    this.devolucaoService.setDevolucao(null);
    this.router.navigate(['/caddevolucao']);  
  }

  pesquisar() {
    
  }

}
