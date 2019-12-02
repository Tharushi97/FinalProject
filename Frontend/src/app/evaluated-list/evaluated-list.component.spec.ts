import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatedListComponent } from './evaluated-list.component';

describe('EvaluatedListComponent', () => {
  let component: EvaluatedListComponent;
  let fixture: ComponentFixture<EvaluatedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluatedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluatedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
