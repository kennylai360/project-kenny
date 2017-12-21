export interface IGalleryCover {
  albumId: number;
  imgUrl: string;
  albumTitle?: string;
  albumSubtitle?: string;
  translateX?: number;
  translateY?: number;
  // @TODO - NEED TO CHANGE THIS TO ARRAY OF IGALLERYCOVER WHEN IMPLEMENTING
  albumImages?: string[];
}
