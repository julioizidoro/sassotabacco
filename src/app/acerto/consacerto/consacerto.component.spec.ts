import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsacertoComponent } from './consacerto.component';

describe('ConsacertoComponent', () => {
  let component: ConsacertoComponent;
  let fixture: ComponentFixture<ConsacertoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsacertoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsacertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
