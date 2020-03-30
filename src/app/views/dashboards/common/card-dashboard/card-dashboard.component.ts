import { Component, OnInit } from '@angular/core';
import { ContasService } from 'src/app/contas/contas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-dashboard',
  templateUrl: './card-dashboard.component.html',
  styleUrls: ['./card-dashboard.component.scss']
})
export class CardDashboardComponent implements OnInit {

  vencendoHojeCR: number;
  vencendoHojeCP: number;
  vencidasCR: number;
  vencidasCP: number;
  restoMesCR: number;
  restoMesCP: number;

  constructor(
    private contasService: ContasService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.consultarContas();
  }

  consultarContas() {
    this.contasService.vencerHojeCR().subscribe(
      resposta => {
        this.vencendoHojeCR = resposta as number;
      },
        err => {
          console.log(JSON.stringify(err));
        }
    );
    this.contasService.vencerHojeCP().subscribe(
      resposta => {
        this.vencendoHojeCP = resposta as number;
      },
        err => {
          console.log(JSON.stringify(err));
        }
    );
    this.contasService.vencidasCR().subscribe(
      resposta => {
        this.vencidasCR = resposta as number;
      },
        err => {
          console.log(JSON.stringify(err));
        }
    );
    this.contasService.vencidasCP().subscribe(
      resposta => {
        this.vencidasCP = resposta as number;
      },
        err => {
          console.log(JSON.stringify(err));
        }
    );
    this.contasService.restoMesCR().subscribe(
      resposta => {
        this.restoMesCR = resposta as number;
      },
        err => {
          console.log(JSON.stringify(err));
        }
    );
    this.contasService.restoMesCP().subscribe(
      resposta => {
        this.restoMesCP = resposta as number;
      },
        err => {
          console.log(JSON.stringify(err));
        }
    );
  }

  novoRecebimento() {
    this.router.navigate(["/cadreceber"]);
  }

  novoPagamento() {
    this.router.navigate(["/cadpagar"]);
  }

}
