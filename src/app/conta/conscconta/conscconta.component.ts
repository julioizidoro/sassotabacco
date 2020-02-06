import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Conta } from '../model/conta';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/usuario/login/auth.service';
import { Usuario } from 'src/app/usuario/model/usuario';
import { ContaService } from '../conta.service';

@Component({
  selector: 'app-conscconta',
  templateUrl: './conscconta.component.html',
  styleUrls: ['./conscconta.component.scss']
})
export class ConsccontaComponent implements OnInit {

  formulario: FormGroup;
  contas: Conta[];
  usuario: Usuario;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private contaService: ContaService,
  ) { }

  ngOnInit() {
    this.usuario = this.authService.usuario;
    this.setFormularioNulo();
    this.consultar();
  }

  setFormularioNulo() {
    this.formulario = this.formBuilder.group({
      nome: [null],
    });
  }

  consultar() {
    this.contaService.listar('@').subscribe(
      resposta => {
        this.contas = resposta as any;
      }
    );
  }

  editar( conta: Conta) {
    this.contaService.setConta(conta);
    this.router.navigate(['/consconta']);

  }

  verSaldo( conta: Conta ) {
    
  }
  
  

}
