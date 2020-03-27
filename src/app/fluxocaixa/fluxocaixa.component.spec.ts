import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxocaixaComponent } from './fluxocaixa.component';

describe('FluxocaixaComponent', () => {
  let component: FluxocaixaComponent;
  let fixture: ComponentFixture<FluxocaixaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FluxocaixaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FluxocaixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
