import { Component, OnInit } from '@angular/core';
import { Compras } from '../model/Comrpas';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ComprasService } from '../compras.service';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/cliente/cliente.service';


@Component({
  selector: 'app-conscompras',
  templateUrl: './conscompras.component.html',
  styleUrls: ['./conscompras.component.scss']
})
export class ConscomprasComponent implements OnInit {

  listaCompras: Compras[];
  formulario: FormGroup;
  isFirstOpen = false;
  oneAtATime: true;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private comprasService: ComprasService,
    private clienteService: ClienteService,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null],
      documento: [null],
    });
    this.consultar();
  }

  consultar() {
    this.comprasService.listar('@').subscribe(
      resposta => {
        this.listaCompras = resposta as any;
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }

  async  pesquisar() {
    let nome = this.formulario.get('nome').value;
    let documento = this.formulario.get('documento').value;
    if (documento === null) {
      await this.comprasService.pesquisarNome(documento).subscribe(
        resposta => {
          this.listaCompras = resposta as any;
        },
        err => {
          console.log(err.error.erros.join(' '));
        }
      )
    } else if (nome != null) {
     await this.comprasService.pesquisarNome(nome).subscribe(
        resposta => {
          this.listaCompras = resposta as any;
        },
        err => {
          console.log(err.error.erros.join(' '));
        }
      )
    }
  }

  novo() {
    this.comprasService.setCompra(null);
    this.router.navigate(['/cadcompras']);
  }

  editar(compra: Compras) {
    this.comprasService.setCompra(compra);
    this.router.navigate(['/cadcompras']);
  }
}
