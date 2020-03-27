import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlanoContasService } from '../planocontas.service';
import { Planoconta } from '../model/planoconta';
import { Router, ActivatedRoute } from '@angular/router';
import { Grupoplanoconta } from 'src/app/grupocontas/model/grupoplanoconta';
import { GrupoContasService } from 'src/app/grupocontas/grupocontas.service';
import { Usuario } from 'src/app/usuario/model/usuario';
import { AuthService } from 'src/app/usuario/login/auth.service';

@Component({
  selector: 'app-cadplanocontas',
  templateUrl: './cadplanocontas.component.html',
  styleUrls: ['./cadplanocontas.component.css']
})
export class CadsPlanoContasComponent implements OnInit {

    formulario: FormGroup;
    grupoSeleconado: Grupoplanoconta;
    listaGrupoContas: Grupoplanoconta[];
    planoConta: Planoconta;
    usuario: Usuario;

  constructor(
    private planocontaservice: PlanoContasService,
    private grupoContaService: GrupoContasService,
    private formBuilder: FormBuilder,
    private activeRrouter: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}



  ngOnInit() {
    this.usuario = this.authService.usuario;
    this.listarGrupoConta();
      this.formulario = this.formBuilder.group({
        conta: [null],
        descricao: [null],
        grupo: [null],
      });
      this.planoConta = this.planocontaservice.getPlanoConta();
      if (this.planoConta != null) {
        this.formulario = this.formBuilder.group({
          conta: this.planoConta.conta,
          descricao: this.planoConta.descricao,
          grupo: this.planoConta.grupoplanoconta
        });
      }
  }

  listarGrupoConta() {
    this.grupoContaService.listar().subscribe(
      resposta => {
        this.listaGrupoContas = resposta as any;
      }
    );
  }

  compararGrupo(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setGrupo() {
    this.grupoSeleconado = this.formulario.get('grupocontas').value;
  }

  salvar() {
    this.planoConta = this.formulario.value;
    this.planocontaservice.salvar( this.planoConta).subscribe(
      resposta => {
        this.planoConta = resposta as any;
        this.router.navigate(['/consplanocontas']);
      }
    );
  }

  cancelar() {
    this.formulario.reset();
    this.router.navigate(['/consplanocontas']);
  }

}
