import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaddevolucaoComponent } from './caddevolucao.component';

describe('CaddevolucaoComponent', () => {
  let component: CaddevolucaoComponent;
  let fixture: ComponentFixture<CaddevolucaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaddevolucaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaddevolucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
