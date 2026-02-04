import { client } from './sanity.client'

export interface MenuItem {
    name: string
    price: string
    icon: string
}

export interface GalleryImage {
    image: any
    caption: string
}

export interface OpeningHour {
    day: string
    hours: string
}

export interface IceCreamData {
    title: string
    subtitle: string
    logo: any
    menuItems: MenuItem[]
    galleryImages: GalleryImage[]
    openingHours: OpeningHour[]
    address: string
    mapEmbedUrl: string
    facebookUrl: string
    instagramUrl: string
}

export async function getIceCreamData(): Promise<IceCreamData | null> {
    const query = `*[_type == "iceCream"][0]{
    title,
    subtitle,
    logo,
    menuItems,
    galleryImages[]{
      image,
      caption
    },
    openingHours,
    address,
    mapEmbedUrl,
    facebookUrl,
    instagramUrl
  }`

    try {
        const data = await client.fetch<IceCreamData>(query)
        return data
    } catch (error) {
        console.error('Error fetching ice cream data:', error)
        return null
    }
}
