export interface ImagesRequest {
  imageUrls: ImageUrl[];
}

export interface ImageUrl {
  url: string;
}

export interface ImagesCollectionResponse {
  imagesCollection: string;
  timestamp: string;
  images: ImageResponse[];
}

export interface ImageResponse {
  imageId: string;
  url: string;
}
