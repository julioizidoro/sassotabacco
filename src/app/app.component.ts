import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from './usuario/login/auth.service';
import { Usuario } from './usuario/model/usuario';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']

})

export class AppComponent implements OnInit {
  values: string[] = ['Tag 1', 'Tag 2', 'Tag 4'];
  logado = false;
  title = 'Sasso Tabacco';
  usuario: Usuario;

  specialPage: boolean;

  private specialPages: any[] = [
    '/pages/login',
    '/pages/register',
    '/pages/lock',
    '/pages/pricing',
    '/pages/single-post',
    '/pages/post-listing'
  ];

  private currentUrl = '';

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService,
  ) {

    this.router.events.subscribe((route: any) => {
      this.currentUrl = route.url;

      this.specialPage = this.specialPages.indexOf(this.currentUrl) !== -1;
    });

  }

  ngOnInit(): void {
    this.usuario = new Usuario();
    if (this.logado === false) {
        this.router.navigate(['/login']);
      }
      this.authService.mostrarMenuEmitter.subscribe(
        mostrar => this.logado = mostrar
      );
      if (this.logado === true) {
        this.usuario = this.authService.usuario;
        console.log(this.usuario.nome);
      }
  }

  goBack(): void {
    this.location.back();
  }
}
