import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';




@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private usuairoAutenticado = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();
  usuario: Usuario;


  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
  ) { }

  fazerLogin(usuario: Usuario) {
    console.log();
    if (usuario.user === 'sasso' &&  usuario.password  === '123456' ) {
        this.usuairoAutenticado = true;
        usuario.nome = 'Sasso Tabacco';
        this.usuario = usuario;
        this.router.navigate(['/']);
        this.mostrarMenuEmitter.emit(true);
      } else {
        this.usuairoAutenticado = false;
        this.mostrarMenuEmitter.emit(false);
      }
    }

   /* fazerLogin(usuario: Usuario) {
      this.usuarioService.logar(usuario.user, usuario.password).subscribe(
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
    }*/
}
