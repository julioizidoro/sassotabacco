import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadcomprasComponent } from './cadcompras.component';

describe('CadcomprasComponent', () => {
  let component: CadcomprasComponent;
  let fixture: ComponentFixture<CadcomprasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadcomprasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadcomprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
