import { IAlbumImagesData } from '../../pages/galleries/gallery-album/album-data.interface';
import { ISocialMediaLinks } from './social-media-links.interface';

export interface IGalleryCover {
  albumId: string;
  imgUrl: string;
  albumTitle?: string;
  albumSubtitle?: string;
  socialMediaLinks?: ISocialMediaLinks;
  translateX?: number;
  translateY?: number;
  albumImages?: IAlbumImagesData[];
}
