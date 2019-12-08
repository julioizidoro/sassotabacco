import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-consfornecedor',
  templateUrl: './consfornecedor.component.html',
  styleUrls: ['./consfornecedor.component.scss']
})
export class ConsfornecedorComponent implements OnInit {

  isFirstOpen = true;
  oneAtATime: true;
  formulario: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null],
      email: [null],
      cnpj: [null],
    });
  }

}
