import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsdevolucaoComponent } from './consdevolucao.component';

describe('ConsdevolucaoComponent', () => {
  let component: ConsdevolucaoComponent;
  let fixture: ComponentFixture<ConsdevolucaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsdevolucaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsdevolucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
