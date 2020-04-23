import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadempresaComponent } from './cadempresa.component';

describe('CadempresaComponent', () => {
  let component: CadempresaComponent;
  let fixture: ComponentFixture<CadempresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadempresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
