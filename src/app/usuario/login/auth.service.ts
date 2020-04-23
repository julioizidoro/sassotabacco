import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { Empresa } from 'src/app/empresa/model/empresa';




@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private usuairoAutenticado = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();
  usuario: Usuario;
  private empresa: Empresa;


  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
  ) { }

  getUsuario() {
    return this.usuario;
  }

  setUsuario(usuario: Usuario) {
    this.usuario = usuario;
  }

  getEmpresa() {
    return this.empresa;
  }

  setEmpresa(empresa: Empresa){
    this.empresa = empresa;
  }

 /* fazerLogin(usuario: Usuario) {
    console.log();
    if (usuario.login === 'sasso' &&  usuario.senha  === '123456' ) {
        this.usuairoAutenticado = true;
        usuario.nome = 'Sasso Tabacco';
        this.usuario = usuario;
        this.router.navigate(['/']);
        this.mostrarMenuEmitter.emit(true);
      } else {
        this.usuairoAutenticado = false;
        this.mostrarMenuEmitter.emit(false);
      }
    }*/

    fazerLogin(usuario: Usuario) {
      this.usuarioService.logar(usuario.login, usuario.senha).subscribe(
        resposta => {
          this.usuario = resposta as Usuario;
          if ( this.usuario != null ) {
            this.router.navigate([ '/' ]);
            this.mostrarMenuEmitter.emit(true);
          } else {
            this.usuairoAutenticado = false;
            this.mostrarMenuEmitter.emit(false);
          }
        },
        err => {
          console.log(err.error.erros.join(' '));
        }
      );
    }

    fazerLogof() {
      this.usuario = null;
      this.usuairoAutenticado = false;
      this.mostrarMenuEmitter.emit(false);
    }
}
