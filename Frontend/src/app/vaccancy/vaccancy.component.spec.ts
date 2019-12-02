import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccancyComponent } from './vaccancy.component';

describe('VaccancyComponent', () => {
  let component: VaccancyComponent;
  let fixture: ComponentFixture<VaccancyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaccancyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
