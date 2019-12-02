import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CVDetailsComponent } from './cvdetails.component';

describe('CVDetailsComponent', () => {
  let component: CVDetailsComponent;
  let fixture: ComponentFixture<CVDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CVDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CVDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
