import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployepanelComponent } from './employepanel.component';

describe('EmployepanelComponent', () => {
  let component: EmployepanelComponent;
  let fixture: ComponentFixture<EmployepanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployepanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployepanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
