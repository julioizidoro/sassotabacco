import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsvendasComponent } from './consvendas.component';

describe('ConsvendasComponent', () => {
  let component: ConsvendasComponent;
  let fixture: ComponentFixture<ConsvendasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsvendasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsvendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
