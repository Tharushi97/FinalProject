import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantApplicationReviewerComponent } from './applicant-application-reviewer.component';

describe('ApplicantApplicationReviewerComponent', () => {
  let component: ApplicantApplicationReviewerComponent;
  let fixture: ComponentFixture<ApplicantApplicationReviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantApplicationReviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantApplicationReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
