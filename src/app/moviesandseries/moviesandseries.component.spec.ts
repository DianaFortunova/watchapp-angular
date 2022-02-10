import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesandseriesComponent } from './moviesandseries.component';

describe('MoviesandseriesComponent', () => {
  let component: MoviesandseriesComponent;
  let fixture: ComponentFixture<MoviesandseriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesandseriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesandseriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
