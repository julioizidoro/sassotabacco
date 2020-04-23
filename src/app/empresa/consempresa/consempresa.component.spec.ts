import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsempresaComponent } from './consempresa.component';

describe('ConsempresaComponent', () => {
  let component: ConsempresaComponent;
  let fixture: ComponentFixture<ConsempresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsempresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
