import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GalleryAlbumListingComponent } from '../gallery-album-listing/gallery-album-listing.component';


describe('GalleryAlbumListingComponent', () => {
  let component: GalleryAlbumListingComponent;
  let fixture: ComponentFixture<GalleryAlbumListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryAlbumListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryAlbumListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
