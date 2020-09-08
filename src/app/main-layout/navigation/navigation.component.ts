import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/usuario/login/auth.service';
import { Usuario } from 'src/app/usuario/model/usuario';
import { Empresa } from 'src/app/empresa/model/empresa';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav', {static: true}) sidenav: ElementRef;

  clicked: boolean;
  usuario: Usuario;
  empresa: Empresa;
  empresaUsuario: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    ) {
    this.clicked = this.clicked === undefined ? false : true;
  }

  ngOnInit() {
    this.empresa = this.authService.getEmpresa();
    console.log(this.empresa.nomefantasia);
    if (this.empresa == null) {
      this.empresa = new Empresa();
      this.empresa.nomefantasia = '';
    }
    this.usuario = this.authService.usuario;
    this.empresaUsuario = this.empresa.nomefantasia + ' - ' + this.usuario.nome;
  }

  setClicked(val: boolean): void {
    this.clicked = val;
  }

  logof() {
    this.authService.mostrarMenuEmitter.unsubscribe();
    this.router.navigate(['/login']);
  }

  trocarEmpresa() {
    if (this.authService.usuario.listaempresa.length>1) {
      this.authService.mostrarMenuEmitter.emit(false);
      this.router.navigate(['/consempresa']);
    }
  }


}
