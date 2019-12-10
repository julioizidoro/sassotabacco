import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Cep } from 'src/app/shared/cep/model/cep';
import { Instituicao } from 'src/app/cliente/model/instituicao';
import { Usuario } from 'src/app/usuario/model/usuario';
import { ConsultacepService } from 'src/app/shared/cep/consultacep.service';
import { ClienteService } from 'src/app/cliente/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/usuario/login/auth.service';
import { Instituicaocontato } from 'src/app/cliente/model/instituicaocontato';
import { Instituicaoendereco } from 'src/app/cliente/model/instituicaoendereco';

@Component({
  selector: 'app-cadfornecedor',
  templateUrl: './cadfornecedor.component.html',
  styleUrls: ['./cadfornecedor.component.scss']
})
export class CadfornecedorComponent implements OnInit {

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


  constructor(
    private consultacepService: ConsultacepService,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private activeRrouter: ActivatedRoute,
    private authService: AuthService,
  ) { }



  ngOnInit() {
    this.usuario = this.authService.usuario;
    this.setFormularioNulo();
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
        datacadastro: this.instituicao.datacadastro,
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
          isinstituicaoendereco: this.instituicao.instituicaoendereco.idinstituicaoendereco,
          cep: this.instituicao.instituicaoendereco.cep,
          endereco: this.instituicao.instituicaoendereco.logradouro,
          numero: this.instituicao.instituicaoendereco.numero,
          bairro: this.instituicao.instituicaoendereco.bairro,
          complemento: this.instituicao.instituicaoendereco.complemento,
          cidade: this.instituicao.instituicaoendereco.cidade,
          estado: this.instituicao.instituicaoendereco.estado,
        }),
      });
    }
  }


consultarCEP(tipo: string) {
  let cepInformado = this.formulario.get('instituicaoendereco.cep').value;

  cepInformado = cepInformado.replace(/\D/g, '');
  this.consultacepService.consultar(cepInformado).subscribe(
    resposta => {
      this.cep = resposta;
        this.formulario.patchValue({
          clienteenderecocomercial: {
            endereco: this.cep.logradouro,
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
    datacadastro: new Date(),
    tipo: 'c',
    segundo: this.segundo
  });
  this.instituicao = this.formulario.value;
  this.clienteService.salvar(this.instituicao).subscribe(
    resposta => {
      this.instituicao = resposta as any;
      this.router.navigate(['/consCliente']);
    },
    err => {
      console.log(err.error.erros.join(' '));
    }
  );

  console.log(this.instituicao);
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
      isinstituicaoendereco: [null],
      cep: [null],
      endereco: [null],
      numero: [null],
      bairro: [null],
      complemento: [null],
      cidade: [null],
      estado: [null],
    }),
  });
}
}
