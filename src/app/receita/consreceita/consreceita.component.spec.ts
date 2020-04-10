import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsreceitaComponent } from './consreceita.component';

describe('ConsreceitaComponent', () => {
  let component: ConsreceitaComponent;
  let fixture: ComponentFixture<ConsreceitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsreceitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsreceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
