import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagemoviesComponent } from './managemovies.component';

describe('ManagemoviesComponent', () => {
  let component: ManagemoviesComponent;
  let fixture: ComponentFixture<ManagemoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagemoviesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagemoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
