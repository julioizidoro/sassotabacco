import { Component, OnInit } from '@angular/core';
import { ContasaldoService } from 'src/app/contas/contasaldo.service';
import { Contasaldo } from 'src/app/conta/model/contasaldo';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { AlertModelService } from 'src/app/shared/alert/alert-model.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gerarsaldo',
  templateUrl: './gerarsaldo.component.html',
  styleUrls: ['./gerarsaldo.component.scss']
})
export class GerarsaldoComponent implements OnInit {

  formulario: FormGroup;
  listaContaSaldo: Contasaldo[];
  public maskMesAno = [/[0-9]/, /[0-9]/,  '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  

  constructor(
    private contaSaldoService: ContasaldoService,
    private alertService: AlertModelService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      mesano: [null],
    });
    this.listarConta();
  }

  async  listarConta() {
    await this.contaSaldoService.getAtivos().subscribe(
      resposta => {
        this.listaContaSaldo = resposta as any;
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }

  async fecharMesAtual() {
    let conta = new Contasaldo();
    let mesAno = this.formulario.get('mesano').value;
    conta.mesano = mesAno;
    conta.entradas = 0;
    conta.saidas = 0;
    conta.saldoinicial =0;
    conta.saldoliquido = 0;
    conta.saldo =0;
     await this.contaSaldoService.fecharMesAtual(conta).subscribe(
       resposta => {
         let mensagem = resposta as string;
         this.alertService.showAlertSuccess(mensagem);
       },
       err => {
         console.log(err.error.erros.join(' '));
       }
     )
  }

}