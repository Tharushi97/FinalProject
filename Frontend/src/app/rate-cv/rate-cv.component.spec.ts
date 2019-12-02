import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateCVComponent } from './rate-cv.component';

describe('RateCVComponent', () => {
  let component: RateCVComponent;
  let fixture: ComponentFixture<RateCVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateCVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateCVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
