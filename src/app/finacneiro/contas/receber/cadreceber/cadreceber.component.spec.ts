import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadreceberComponent } from './cadreceber.component';

describe('CadreceberComponent', () => {
  let component: CadreceberComponent;
  let fixture: ComponentFixture<CadreceberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadreceberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadreceberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
