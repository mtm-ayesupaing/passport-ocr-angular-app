import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassportAddComponent } from './passport-add.component';

describe('PassportAddComponent', () => {
  let component: PassportAddComponent;
  let fixture: ComponentFixture<PassportAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassportAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassportAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
