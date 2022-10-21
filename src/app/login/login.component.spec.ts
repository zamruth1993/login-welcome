import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonPathComponent } from './common-path.component';

describe('CommonPathComponent', () => {
  let component: CommonPathComponent;
  let fixture: ComponentFixture<CommonPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonPathComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
