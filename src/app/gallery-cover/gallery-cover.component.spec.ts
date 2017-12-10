import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryCoverComponent } from './gallery-cover.component';

describe('GalleryCoverComponent', () => {
  let component: GalleryCoverComponent;
  let fixture: ComponentFixture<GalleryCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryCoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
