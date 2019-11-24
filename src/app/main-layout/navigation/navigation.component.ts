import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/usuario/login/auth.service';
import { Usuario } from 'src/app/usuario/model/usuario';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav', {static: true}) sidenav: ElementRef;

  clicked: boolean;
  usuario: Usuario;

  constructor(
    private authService: AuthService,
    private router: Router,
    ) {
    this.clicked = this.clicked === undefined ? false : true;
  }

  ngOnInit() {
    this.usuario = this.authService.usuario;
  }

  setClicked(val: boolean): void {
    this.clicked = val;
  }

  logof() {
    this.authService.mostrarMenuEmitter.unsubscribe();
    this.router.navigate(['/login']);
  }


}
