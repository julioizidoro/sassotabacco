import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadproducaoComponent } from './cadproducao.component';

describe('CadproducaoComponent', () => {
  let component: CadproducaoComponent;
  let fixture: ComponentFixture<CadproducaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadproducaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadproducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
