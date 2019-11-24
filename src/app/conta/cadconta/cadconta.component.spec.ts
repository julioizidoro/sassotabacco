import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadcontaComponent } from './cadconta.component';

describe('CadcontaComponent', () => {
  let component: CadcontaComponent;
  let fixture: ComponentFixture<CadcontaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadcontaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadcontaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
