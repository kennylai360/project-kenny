import { IGalleryCover } from './gallery-cover.interface';

export interface IGalleryState {
  galleryData: IGalleryCover[];
  selectedAlbumId: number;
  selectedAlbum: IGalleryCover;
}