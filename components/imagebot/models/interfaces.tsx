export interface ImageObject {
  S: string;
}

export interface Image {
  M: {
    imageId: ImageObject;
    url: ImageObject;
  };
}

export interface Images {
  images: { L: Image[] };
  imagesCollectionId: ImageObject;
  timestamp: ImageObject;
}

export interface ImagesCollection {
  L: [{ M: Images }];
}

export interface UserImages {
  userId: string
  imagesCollection: ImagesCollection;
}
