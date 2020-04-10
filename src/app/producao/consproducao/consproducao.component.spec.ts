import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsproducaoComponent } from './consproducao.component';

describe('ConsproducaoComponent', () => {
  let component: ConsproducaoComponent;
  let fixture: ComponentFixture<ConsproducaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsproducaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsproducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
