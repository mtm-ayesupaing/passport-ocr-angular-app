import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassportListComponent } from './passport-list.component';

describe('PassportListComponent', () => {
  let component: PassportListComponent;
  let fixture: ComponentFixture<PassportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
