import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmineditmovieComponent } from './admineditmovie.component';

describe('AdmineditmovieComponent', () => {
  let component: AdmineditmovieComponent;
  let fixture: ComponentFixture<AdmineditmovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmineditmovieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmineditmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
