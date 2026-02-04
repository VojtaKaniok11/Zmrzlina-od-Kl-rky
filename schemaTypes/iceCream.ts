import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'iceCream',
    title: 'Zmrzlinárna Info',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Nadpis webu',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'subtitle',
            title: 'Podnázev',
            type: 'string',
            description: 'Např. "Prodej točené zmrzliny z Opočna!"',
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'menuItems',
            title: 'Ceník',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Název', type: 'string' },
                        { name: 'price', title: 'Cena', type: 'string' },
                        { name: 'icon', title: 'Emoji ikona', type: 'string' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'galleryImages',
            title: 'Galerie obrázků',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'image',
                            title: 'Obrázek',
                            type: 'image',
                            options: { hotspot: true },
                        },
                        { name: 'caption', title: 'Popis', type: 'string' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'openingHours',
            title: 'Otevírací doba',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'day', title: 'Den', type: 'string' },
                        { name: 'hours', title: 'Hodiny', type: 'string' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'address',
            title: 'Adresa',
            type: 'string',
        }),
        defineField({
            name: 'mapEmbedUrl',
            title: 'Google Maps Embed URL',
            type: 'url',
            description: 'URL pro iframe embedování Google Maps',
        }),
        defineField({
            name: 'facebookUrl',
            title: 'Facebook URL',
            type: 'url',
        }),
        defineField({
            name: 'instagramUrl',
            title: 'Instagram URL',
            type: 'url',
        }),
    ],
})
