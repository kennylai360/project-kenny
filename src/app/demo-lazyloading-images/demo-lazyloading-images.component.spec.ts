import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoLazyloadingImagesComponent } from './demo-lazyloading-images.component';

describe('DemoLazyloadingImagesComponent', () => {
  let component: DemoLazyloadingImagesComponent;
  let fixture: ComponentFixture<DemoLazyloadingImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoLazyloadingImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoLazyloadingImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
