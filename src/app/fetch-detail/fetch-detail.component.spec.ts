import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchDetailComponent } from './fetch-detail.component';

describe('FetchDetailComponent', () => {
  let component: FetchDetailComponent;
  let fixture: ComponentFixture<FetchDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FetchDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
