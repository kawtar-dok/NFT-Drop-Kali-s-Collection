interface Image {
    asset: {
        url: string,
    }
}

export interface Creator {
    _id: string,
    name:string,
    address:string,
    bio: string,
    image: Image,
    slug: {
        current:string,
    }
}

export interface Collection {
    _id: string,
    address: string,
    creator: Creator,
    description: string,
    mainImage: Image,
    previewImage: Image,
    nftCollectionName: string,
    slug: {
        current:string,
    },
    title: string,

}