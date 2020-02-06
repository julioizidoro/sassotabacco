import { ConsultacepService } from './../../shared/cep/consultacep.service';
import { ClienteService } from './../cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Instituicao } from '../model/instituicao';
import { Cep } from 'src/app/shared/cep/model/cep';
import { Instituicaocontato } from '../model/instituicaocontato';
import { Instituicaoendereco } from '../model/instituicaoendereco';
import { Usuario } from 'src/app/usuario/model/usuario';
import { AuthService } from 'src/app/usuario/login/auth.service';
import { ApiReceitaService } from 'src/app/api-receita/api-receita.service';
import { Cnpj } from 'src/app/api-receita/model/cnpj';

@Component({
  selector: 'app-cadcliente',
  templateUrl: './cadcliente.component.html',
  styleUrls: ['./cadcliente.component.scss']
})
export class CadclienteComponent implements OnInit {

  formulario: FormGroup;
  cep: Cep;
  instituicao: Instituicao;
  pessoaJuridica = false;
  pessoaFisica = false;
  segundo = false;
  isFirstOpen = true;
  oneAtATime: true;
  public maskCPF = [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
  // tslint:disable-next-line:max-line-length
  public maskCNPJ = [/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
  public maskFONE = ['(', /[0-9]/, /[0-9]/, ')', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  // tslint:disable-next-line:max-line-length
  public maskCELULAR = ['(', /[0-9]/, /[0-9]/, ')', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  public maskCEP = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/];
  usuario: Usuario;
  cnpj: Cnpj;


  constructor(
    private consultacepService: ConsultacepService,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private activeRrouter: ActivatedRoute,
    private authService: AuthService,
    private apireceitaService: ApiReceitaService,
  ) { }



  ngOnInit() {
    this.usuario = this.authService.usuario;
    this.instituicao = this.clienteService.getInstituicao();
    if (this.instituicao != null) {
      if (this.instituicao.tipojuridico === 'PF') {
        this.pessoaFisica = true;
        this.pessoaJuridica = false;
      } else {
        this.pessoaJuridica = true;
        this.pessoaFisica = false;
      }
      if (this.instituicao.instituicaocontato == null) {
        this.instituicao.instituicaocontato = new Instituicaocontato();
      }
      if (this.instituicao.instituicaoendereco == null) {
        this.instituicao.instituicaoendereco = new Instituicaoendereco();
      }
      this.formulario = this.formBuilder.group({
        idinstituicao: this.instituicao.idinstituicao,
        nome: this.instituicao.nome,
        cpfcnpj: this.instituicao.cpfcnpj,
        email: this.instituicao.email,
        fonecelular: this.instituicao.fonecelular,
        fonefixo: this.instituicao.fonefixo,
        datanascimento: this.instituicao.datanascimento,
        tipo: this.instituicao.tipo,
        tipojuridico: this.instituicao.tipojuridico,
        instituicaocontato: this.formBuilder.group({
          idinstituicaocontato: this.instituicao.instituicaocontato.idinstituicaocontato,
          nome: this.instituicao.instituicaocontato.nome,
          fonecelular: this.instituicao.instituicaocontato.fone,
          email: this.instituicao.instituicaocontato.email,
          cargo: this.instituicao.instituicaocontato.cargo,
        }),
        instituicaoendereco: this.formBuilder.group({
          idinstituicaoendereco: this.instituicao.instituicaoendereco.idinstituicaoendereco,
          cep: this.instituicao.instituicaoendereco.cep,
          logradouro: this.instituicao.instituicaoendereco.logradouro,
          numero: this.instituicao.instituicaoendereco.numero,
          bairro: this.instituicao.instituicaoendereco.bairro,
          complemento: this.instituicao.instituicaoendereco.complemento,
          cidade: this.instituicao.instituicaoendereco.cidade,
          estado: this.instituicao.instituicaoendereco.estado,
        }),
      });
    } else {
      this.setFormularioNulo();
      this.instituicao = new Instituicao();
    }
  }


consultarCEP() {
  let cepInformado = this.formulario.get('instituicaoendereco.cep').value;

  cepInformado = cepInformado.replace(/\D/g, '');
  this.consultacepService.consultar(cepInformado).subscribe(
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
    },
    err => {
      console.log(JSON.stringify(err));
    }
  );
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
  this.instituicao = this.formulario.value;
  this.formulario.patchValue({
    tipo: 'c',
  });
  this.instituicao = this.formulario.value;
  this.instituicao.situacao = 'Ativo';
  this.clienteService.salvar(this.instituicao).subscribe(
    resposta => {
      this.instituicao = resposta as any;
      this.router.navigate(['/conscliente']);
    },
    err => {
      console.log(err.error.erros.join(' '));
    }
  );
}

cancelar() {
  this.formulario.reset();
  this.router.navigate(['/conscliente']);
}

setFormularioNulo() {
  this.formulario = this.formBuilder.group({
    idinstituicao: [null],
    nome: [null],
    cpfcnpj: [null],
    email: [null],
    fonecelular: [null],
    fonefixo: [null],
    datanascimento: [null],
    datacadastro: [null],
    tipo: [null],
    tipojuridico: [null],
    instituicaocontato: this.formBuilder.group({
      idinstituicaocontato: [null],
      nome: [null],
      fonecelular: [null],
      email: [null], 
      cargo: [null],
    }),
    instituicaoendereco: this.formBuilder.group({
      idinstituicaoendereco: [null],
      cep: [null],
      logradouro: [null],
      numero: [null],
      bairro: [null],
      complemento: [null],
      cidade: [null],
      estado: [null],
    }),
  });
}


  consultarAPIReceita() {
    if (this.instituicao.idinstituicao == null) {
      if (this.pessoaJuridica) {
        let numero = this.formulario.get('cpfcnpj').value
        numero = numero.replace('.', '');
        numero = numero.replace('.', '');
        numero = numero.replace('/', '');
        numero = numero.replace('-', '');
        this.apireceitaService.get(numero).subscribe(
          resposta => {
            this.cnpj = resposta as any;
            console.log(this.cnpj);
          },
          err => {
            console.log(err.error.erros.join(' '));
          }
        );
      }
    }
  }
}
