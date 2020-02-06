import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuario/model/usuario';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Conta } from '../model/conta';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/usuario/login/auth.service';
import { ContaService } from '../conta.service';

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
    private contaService: ContaService,
  ) { }

  ngOnInit() {
    this.conta = this.contaService.getConta();
    if ( this.conta == null ) {
    this.conta = new Conta();
    this.formulario = this.formBuilder.group({
      idconta: [null],
      descricao: [null],
      banco: [null],
      saldoinicial: [null],
      datasaldo: [null],
      logo: [null],
    });   
      } else {
        this.formulario = this.formBuilder.group({
          idconta: this.conta.idconta,
          descricao: this.conta.descricao,
          banco: this.conta.banco,
          saldoinicial: this.conta.saldoinicial,
          datasaldo: this.conta.datasaldo,
          logo: this.conta.logo
        });   
      }
    }

    salvar() {
      this.conta = this.formulario.value;
      this.contaService.salvar( this.conta).subscribe(
        resposta => {
          this.conta = resposta as any;
          this.contaService.setConta(null);
          this.router.navigate(['/consconta']);
        },
        err => {
          console.log(JSON.stringify(err));
        }
      );
    }
    
    cancelar() {
      this.formulario.reset();
      this.contaService.setConta(null);
      this.router.navigate(['/consconta']);
    }

    carregarLogo() {
      
    }
  }


