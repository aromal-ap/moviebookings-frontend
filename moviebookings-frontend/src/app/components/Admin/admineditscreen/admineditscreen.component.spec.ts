import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmineditscreenComponent } from './admineditscreen.component';

describe('AdmineditscreenComponent', () => {
  let component: AdmineditscreenComponent;
  let fixture: ComponentFixture<AdmineditscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmineditscreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmineditscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
