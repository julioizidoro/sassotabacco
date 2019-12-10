import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuario/model/usuario';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Conta } from '../model/conta';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/usuario/login/auth.service';

@Component({
  selector: 'app-cadconta',
  templateUrl: './cadconta.component.html',
  styleUrls: ['./cadconta.component.scss']
})
export class CadcontaComponent implements OnInit {

  formulario: FormGroup;
  usuario: Usuario;
  conta: Conta;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      idconta: [null],
      nome: [null],
      banco: [null],
      agencia: [null],
      conta: [null],
      logo: [null],
    });
    /*this.grupoConta = this.grupocontasservice.getGrupoPlanoContas();
     ( this.grupoConta !=null ){
      this.formulario = this.formBuilder.group({
        conta: this.grupoConta.conta,
        descricao: this.grupoConta.descricao,
      });*/
    }

    salvar() {
      /*this.grupoConta = this.formulario.value;
      this.grupocontasservice.salvar( this.grupoConta).subscribe(
        resposta => {
          this.grupoConta = resposta as any;
          this.router.navigate(['/consgrupocontas']);
        }
      );*/
    }
    
    cancelar() {
      this.formulario.reset();
      this.router.navigate(['/consconta']);
    }
  }


