import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsccontaComponent } from './conscconta.component';

describe('ConsccontaComponent', () => {
  let component: ConsccontaComponent;
  let fixture: ComponentFixture<ConsccontaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsccontaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsccontaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
