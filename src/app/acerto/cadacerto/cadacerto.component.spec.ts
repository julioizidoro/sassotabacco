import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadacertoComponent } from './cadacerto.component';

describe('CadacertoComponent', () => {
  let component: CadacertoComponent;
  let fixture: ComponentFixture<CadacertoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadacertoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadacertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
