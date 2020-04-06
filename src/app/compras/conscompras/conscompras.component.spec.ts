import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConscomprasComponent } from './conscompras.component';

describe('ConscomprasComponent', () => {
  let component: ConscomprasComponent;
  let fixture: ComponentFixture<ConscomprasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConscomprasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConscomprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
