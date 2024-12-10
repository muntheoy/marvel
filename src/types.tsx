// types.ts

export interface Thumbnail {
    path: string;
    extension: string;
  }
  
  export interface Url {
    type: string;
    url: string;
  }
  
  export interface Item {
    resourceURI: string;
    name: string;
  }
  
  export interface Character {
    id: number;
    name: string;
    description: string;
    modified: string;
    resourceURI: string;
    urls: Url[];
    thumbnail: Thumbnail;
    comics: {
      available: number;
      returned: number;
      collectionURI: string;
      items: Item[];
    };
    
    stories: {
      available: number;
      returned: number;
      collectionURI: string;
      items: Item[];
    };
    events: {
      available: number;
      returned: number;
      collectionURI: string;
      items: Item[];
    };
    series: {
      available: number;
      returned: number;
      collectionURI: string;
      items: Item[];
    };
  }
  
  export interface Comic {
    id: number;
    digitalId: number;
    title: string;
    issueNumber: number;
    variantDescription: string;
    description: string;
    modified: string;
    isbn: string;
    upc: string;
    diamondCode: string;
    ean: string;
    issn: string;
    format: string;
    pageCount: number;
    textObjects: {
      type: string;
      language: string;
      text: string;
    }[];
    resourceURI: string;
    urls: Url[];
    series: {
      resourceURI: string;
      name: string;
    };
    variants: Item[];
    collections: Item[];
    collectedIssues: Item[];
    dates: {
      type: string;
      date: string;
    }[];
    prices: {
      type: string;
      price: number;
    }[];
    thumbnail: Thumbnail;
    images: Thumbnail[];
    creators: {
      available: number;
      returned: number;
      collectionURI: string;
      items: Item[];
    };
    characters: {
      available: number;
      returned: number;
      collectionURI: string;
      items: Item[];
    };
    stories: {
      available: number;
      returned: number;
      collectionURI: string;
      items: Item[];
    };
    events: {
      available: number;
      returned: number;
      collectionURI: string;
      items: Item[];
    };
  }