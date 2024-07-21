import {defineField, defineType} from 'sanity'

// Definizione del tipo di documento "portfolioItem"
export default defineType({
  name: 'portfolioItem',
  title: 'Portfolio Item',
  type: 'document',
  fields: [
    // Campo per il titolo dell'elemento del portfolio
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    // Campo per la descrizione dell'elemento del portfolio
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    // Campo per l'URL dell'elemento del portfolio
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    }),
    // Campo per l'immagine dell'elemento del portfolio
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  // Configurazione dell'anteprima dell'elemento del portfolio
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})
