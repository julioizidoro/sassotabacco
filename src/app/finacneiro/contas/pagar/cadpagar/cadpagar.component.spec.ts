import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadpagarComponent } from './cadpagar.component';

describe('CadpagarComponent', () => {
  let component: CadpagarComponent;
  let fixture: ComponentFixture<CadpagarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadpagarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadpagarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
