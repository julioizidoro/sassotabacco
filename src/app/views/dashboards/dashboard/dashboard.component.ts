import { Component, OnInit, ViewChild } from '@angular/core';
import { ContaService } from 'src/app/conta/conta.service';
import { ContasaldoService } from 'src/app/contas/contasaldo.service';
import { Contasaldo } from 'src/app/conta/model/contasaldo';
import { Contas } from 'src/app/contas/model/contas';
import { ContasService } from 'src/app/contas/contas.service';
import { AuthService } from 'src/app/usuario/login/auth.service';
import { Empresa } from 'src/app/empresa/model/empresa';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  /*listaContas: any[] = [
    {
      imagem: 'http://4.bp.blogspot.com/-9eVAhF8ECw0/TyIQgknJ7dI/AAAAAAAAY6Q/GDgr7D0A30I/w1200-h630-p-k-no-nu/logo_itau.png',
      nome: 'Itaú',
      valor: 'R$ 77.800,00'
    },
    {
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRPT3eWGgNhYmdowmWbOvylY6xT9oKDKTczKCtw4hhQKumvLR3T',
      nome: 'Bradesco',
      valor: 'R$ 800,00'
    },
  ];*/

  @ViewChild('selecionarEmpresa', null) public showModalSelecionarEmpresaOnClick: ModalDirective;

  listaContaSaldos: Contasaldo[];
  listaEmpresa: Empresa[];


  constructor(
    private contaSaldoService: ContasaldoService,
    private authService: AuthService,
    private router: Router,
    ) {}

  ngOnInit() {
      console.log(this.authService.getEmpresa());
      if (this.authService.getEmpresa()==null) {
          this.router.navigate(['/consempresa']);
      } else {
        this.consultarContasSaldo();
      }
  }

  consultarContasSaldo() {
    this.contaSaldoService.listarMesAno('@').subscribe(
      resposta => {
        this.listaContaSaldos = resposta as any;
      },
        err => {
          console.log(JSON.stringify(err));
        }
    )
  }

  selecionarEmpresa(empresa: Empresa) {
    this.authService.setEmpresa(empresa);
    this.showModalSelecionarEmpresaOnClick.hide();
  }



}
