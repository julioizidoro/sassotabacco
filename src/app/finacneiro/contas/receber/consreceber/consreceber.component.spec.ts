import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsreceberComponent } from './consreceber.component';

describe('ConsreceberComponent', () => {
  let component: ConsreceberComponent;
  let fixture: ComponentFixture<ConsreceberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsreceberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsreceberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
