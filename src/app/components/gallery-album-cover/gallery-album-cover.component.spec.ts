import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryAlbumCoverComponent } from './gallery-album-cover.component';

describe('GalleryAlbumJumbotronComponent', () => {
  let component: GalleryAlbumCoverComponent;
  let fixture: ComponentFixture<GalleryAlbumCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryAlbumCoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryAlbumCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
