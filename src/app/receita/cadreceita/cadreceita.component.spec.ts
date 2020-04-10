import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadreceitaComponent } from './cadreceita.component';

describe('CadreceitaComponent', () => {
  let component: CadreceitaComponent;
  let fixture: ComponentFixture<CadreceitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadreceitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadreceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
