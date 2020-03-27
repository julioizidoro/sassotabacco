import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalcontasComponent } from './modalcontas.component';

describe('ModalcontasComponent', () => {
  let component: ModalcontasComponent;
  let fixture: ComponentFixture<ModalcontasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalcontasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalcontasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
