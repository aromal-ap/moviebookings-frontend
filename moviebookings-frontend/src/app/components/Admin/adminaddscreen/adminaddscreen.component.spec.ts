import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaddscreenComponent } from './adminaddscreen.component';

describe('AdminaddscreenComponent', () => {
  let component: AdminaddscreenComponent;
  let fixture: ComponentFixture<AdminaddscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminaddscreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminaddscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
