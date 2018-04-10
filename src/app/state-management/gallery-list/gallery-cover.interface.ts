import { IAlbumImagesData } from '../../pages/galleries/gallery-album/album-data.interface';

export interface IGalleryCover {
  albumId: string;
  imgUrl: string;
  albumTitle?: string;
  albumSubtitle?: string;
  translateX?: number;
  translateY?: number;
  albumImages?: IAlbumImagesData[];
}
