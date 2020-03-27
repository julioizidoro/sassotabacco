import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConspagarComponent } from './conspagar.component';

describe('ConspagarComponent', () => {
  let component: ConspagarComponent;
  let fixture: ComponentFixture<ConspagarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConspagarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConspagarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
