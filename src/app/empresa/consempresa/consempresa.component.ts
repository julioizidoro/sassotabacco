import { Component, OnInit } from '@angular/core';
import { Empresa } from '../model/empresa';
import { AuthService } from 'src/app/usuario/login/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-consempresa',
  templateUrl: './consempresa.component.html',
  styleUrls: ['./consempresa.component.scss']
})
export class ConsempresaComponent implements OnInit {

  listaEmpresa: Empresa[];
  formulario: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null],
    });
    this.listaEmpresa = this.authService.getUsuario().listaempresa;
    console.log(this.listaEmpresa);
  }

  selecionarEmpresa(empresa: Empresa) {
      this.authService.selecionarEmpresa(empresa);
  }

}
