import { IGalleryCover } from './gallery-cover.interface';

export interface IGalleryState {
  galleryData: IGalleryCover[];
  selectedAlbumId: string;
  selectedAlbum: IGalleryCover;
}
