import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadvendasComponent } from './cadvendas.component';

describe('CadvendasComponent', () => {
  let component: CadvendasComponent;
  let fixture: ComponentFixture<CadvendasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadvendasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadvendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
