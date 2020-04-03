import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerarsaldoComponent } from './gerarsaldo.component';

describe('GerarsaldoComponent', () => {
  let component: GerarsaldoComponent;
  let fixture: ComponentFixture<GerarsaldoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerarsaldoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerarsaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
