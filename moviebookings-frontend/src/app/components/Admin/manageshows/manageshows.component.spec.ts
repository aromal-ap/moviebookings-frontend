import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageshowsComponent } from './manageshows.component';

describe('ManageshowsComponent', () => {
  let component: ManageshowsComponent;
  let fixture: ComponentFixture<ManageshowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageshowsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageshowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
