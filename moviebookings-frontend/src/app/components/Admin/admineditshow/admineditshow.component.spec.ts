import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmineditshowComponent } from './admineditshow.component';

describe('AdmineditshowComponent', () => {
  let component: AdmineditshowComponent;
  let fixture: ComponentFixture<AdmineditshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmineditshowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmineditshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
