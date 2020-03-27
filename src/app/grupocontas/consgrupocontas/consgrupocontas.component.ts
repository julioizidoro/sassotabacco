import { GrupoContasService } from '../grupocontas.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Router } from '@angular/router';
import { Grupoplanoconta } from '../model/grupoplanoconta';
import { Usuario } from 'src/app/usuario/model/usuario';
import { AuthService } from 'src/app/usuario/login/auth.service';

@Component({
  selector: 'app-consgrupocontas',
  templateUrl: './consgrupocontas.component.html',
  styleUrls: ['./consgrupocontas.component.css']
})
export class ConsGrupoContasComponent implements OnInit {

    formulario: FormGroup;
    isFirstOpen = false;
    oneAtATime = true;
    grupoContas: Grupoplanoconta[];
    usuario: Usuario;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private grupocontasservice: GrupoContasService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.usuario = this.authService.usuario;
    this.formulario = this.formBuilder.group({
      conta: [null],
      descricao: [null],
    });
    this.consultar();
  }

  consultar() {
    this.grupocontasservice.listar().subscribe(
      resposta => {
        this.grupoContas = resposta as any;
      }
    );
  }

  pesquisar() {
    const descricao = this.formulario.get('descricao').value;
    if ( descricao != null) {
        this.grupocontasservice.pesquisarDescricao(descricao).subscribe(
          resposta => {
            this.grupoContas = resposta as any;
          }
        );
    } else {
      const conta = this.formulario.get('conta').value;
      if (( conta != null ) && ( conta.length > 0)) {
        this.grupocontasservice.pesquisarConta(conta).subscribe(
          resposta => {
            this.grupoContas = resposta as any;
          }
        );
      }
    }
 }

 editar(grupoConta: Grupoplanoconta) {
   this.grupocontasservice.setGrupoPlanoContas(grupoConta);
  this.router.navigate([ '/cadgrupocontas']);
}

}
