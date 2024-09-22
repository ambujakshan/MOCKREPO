import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignreviewComponent } from './assignreview.component';

describe('AssignreviewComponent', () => {
  let component: AssignreviewComponent;
  let fixture: ComponentFixture<AssignreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
