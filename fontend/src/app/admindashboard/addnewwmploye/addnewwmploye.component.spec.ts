import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewwmployeComponent } from './addnewwmploye.component';

describe('AddnewwmployeComponent', () => {
  let component: AddnewwmployeComponent;
  let fixture: ComponentFixture<AddnewwmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddnewwmployeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnewwmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
