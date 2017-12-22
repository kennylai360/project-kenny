import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryAlbumJumbotronComponent } from './gallery-album-jumbotron.component';

describe('GalleryAlbumJumbotronComponent', () => {
  let component: GalleryAlbumJumbotronComponent;
  let fixture: ComponentFixture<GalleryAlbumJumbotronComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryAlbumJumbotronComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryAlbumJumbotronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
