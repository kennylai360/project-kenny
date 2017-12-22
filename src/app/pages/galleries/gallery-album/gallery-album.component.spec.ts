import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryAlbumComponent } from './gallery-album.component';

describe('GalleryAlbumComponent', () => {
  let component: GalleryAlbumComponent;
  let fixture: ComponentFixture<GalleryAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
