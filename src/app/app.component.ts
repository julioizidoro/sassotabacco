import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from './usuario/login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']

})

export class AppComponent implements OnInit {
  values: string[] = ['Tag 1', 'Tag 2', 'Tag 4'];
  logado = false;

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
    if (this.logado === false) {
      this.router.navigate(['/login']);
    }
    this.authService.mostrarMenuEmitter.subscribe(
      mostrar => this.logado = mostrar
    );
  }

  goBack(): void {
    this.location.back();
  }
}
