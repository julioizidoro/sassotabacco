import { ClienteService } from './../cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Instituicao } from '../model/instituicao';
import { CepService } from 'src/app/util/cep/cepservice.service';
import { Cep } from 'src/app/util/cep/cep';

@Component({
  selector: 'app-cadcliente',
  templateUrl: './cadcliente.component.html',
  styleUrls: ['./cadcliente.component.scss']
})
export class CadclienteComponent implements OnInit {

  instituicao: Instituicao;
   formulario: FormGroup;
   pessoaJuridica = false;
   pessoaFisica = true;
   isFirstOpen = true;
   oneAtATime: true;
   cep: Cep;
   public maskCPF = [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
  // tslint:disable-next-line:max-line-length
  public maskCNPJ = [/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
  public maskFONE = ['(', /[0-9]/, /[0-9]/, ')', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  // tslint:disable-next-line:max-line-length
  public maskCELULAR = ['(', /[0-9]/, /[0-9]/, ')', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  public maskCEP = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/];
  public maskDATE = [/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/', /[0-9]/,  /[0-9]/, /[0-9]/, /[0-9]/];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cepService: CepService,
    private clienteService: ClienteService,
  ) { }

  ngOnInit() {
    this.instituicao = new Instituicao();
    this.formulario = this.formBuilder.group({

      idinstituicao: [null],
      nome: [null],
      tipojuridico: [null],
      situacao: [null],
      cpfcnpj: [null],
      possuiie: [null],
      ie: [null],
      im: [null],
      optantesimples: [null],
      email: [null],
      fonefixo: [null],
      fonecelular: [null],
      datanascimento: [null],
      observacao: [null],
      tipo: [null],
      instituicaocontato: this.formBuilder.group({
        idinstituicaocontato: [null],
        nome: [null],
        email: [null],
        fone: [null],
        cargo: [null],
      }),
      instituicaoendereco: this.formBuilder.group({
        idinstituicaoendereco: [null],
        logradouro: [null],
        numero: [null],
        complemento: [null],
        bairro: [null],
        cidade: [null],
        estado: [null],
        cep: [null],
      }),
    });
  }

  setTipoJuridico() {
    if (this.formulario.get('tipojuridico').value === 'PF') {
      this.pessoaJuridica = false;
      this.pessoaFisica = true;
    } else {
      this.pessoaJuridica = true;
      this.pessoaFisica = false;
    }
  }

  salvar() {
    this.formulario.patchValue( {
      datacadastro: new Date(),
      tipo: 'c'
      });
    this.instituicao = this.formulario.value;
    this.clienteService.salvar( this.instituicao).subscribe(
      resposta => {
        this.instituicao = resposta as any;
        this.router.navigate(['/consCliente']);
      }
    );
  }

  cancelar() {
    this.router.navigate([ '/conscliente']);
  }

  consultarCEP() {
    let cepInformado;
    cepInformado = this.formulario.get('instituicaoendereco.cep').value;
    cepInformado = cepInformado.replace(/\D/g, '');
    this.cepService.consultar(cepInformado).subscribe(
      resposta => {
        this.cep = resposta;
        this.formulario.patchValue({
            instituicaoendereco: {
                logradouro: this.cep.logradouro,
                bairro: this.cep.bairro,
                cidade: this.cep.localidade,
                estado: this.cep.uf
            }
        });
      });
  }
}
