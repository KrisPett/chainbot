export const mockImagesData: UserImages = {
  userId: "123",
  imagesCollection: {
    L: [{
      M: {
        images: {
          L: [{
            M: {
              imageId: {S: "123"},
              url: {S: "https://images.unsplash.com/photo-1616166330004-1b1f1f1b1b1b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"},
            },
          }],
        }, imagesCollectionId: {S: "123"}, timestamp: {S: "123"},
      }
    }]
  }
}

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
