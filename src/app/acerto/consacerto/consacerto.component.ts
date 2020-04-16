import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Acerto } from '../model/acerto';
import { Router } from '@angular/router';
import { AcertoService } from '../acerto.service';

@Component({
  selector: 'app-consacerto',
  templateUrl: './consacerto.component.html',
  styleUrls: ['./consacerto.component.scss']
})
export class ConsacertoComponent implements OnInit {

  isFirstOpen = false;
  oneAtATime: true;
  listaAcertos: Acerto[];
  formulario: FormGroup;

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private acertoService: AcertoService,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      datainicial: [null],
      datafinal: [null],
    });
    this.consultar();
  }

  consultar() {
    this.acertoService.listarAcerto().subscribe(
      resposta => {
        this.listaAcertos = resposta as any;
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }

  editar(acerto: Acerto) {
    this.acertoService.setAcerto(acerto);
    this.router.navigate(['/cadacerto']);
  }

  novo() {
    this.acertoService.setAcerto(null);
    this.router.navigate(['/cadacerto']);  
  }

  pesquisar() {
    
  }

}
