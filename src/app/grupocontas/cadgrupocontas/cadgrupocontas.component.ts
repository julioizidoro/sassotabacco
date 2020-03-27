import { Grupoplanoconta } from './../model/grupoplanoconta';
import { GrupoContasService } from '../grupocontas.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/usuario/model/usuario';
import { AuthService } from 'src/app/usuario/login/auth.service';


@Component({
  selector: 'app-cadgrupocontas',
  templateUrl: './cadgrupocontas.component.html',
  styleUrls: ['./cadgrupocontas.component.css']
})
export class CadGrupoContasComponent implements OnInit {

    formulario: FormGroup;
    grupoConta: Grupoplanoconta;
    usuario: Usuario;



  constructor(
    private grupocontasservice: GrupoContasService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activeRrouter: ActivatedRoute,
    private authService: AuthService,
    ) {}



  ngOnInit() {
    this.formulario = this.formBuilder.group({
      conta: [null],
      descricao: [null],
    });
    this.grupoConta = this.grupocontasservice.getGrupoPlanoContas();
    if ( this.grupoConta !=null ){
      this.formulario = this.formBuilder.group({
        conta: this.grupoConta.conta,
        descricao: this.grupoConta.descricao,
      });
    }
}

salvar() {
  this.grupoConta = this.formulario.value;
  this.grupocontasservice.salvar( this.grupoConta).subscribe(
    resposta => {
      this.grupoConta = resposta as any;
      this.router.navigate(['/consgrupocontas']);
    }
  );
}

cancelar() {
  this.formulario.reset();
  this.router.navigate(['/consgrupocontas']);
}

}
