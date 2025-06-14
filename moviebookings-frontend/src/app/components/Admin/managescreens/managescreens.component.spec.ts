import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagescreensComponent } from './managescreens.component';

describe('ManagescreensComponent', () => {
  let component: ManagescreensComponent;
  let fixture: ComponentFixture<ManagescreensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagescreensComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagescreensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
