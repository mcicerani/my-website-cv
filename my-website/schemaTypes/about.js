import {defineField, defineType} from 'sanity'

// Definizione del tipo di documento "about"
export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    // Campo per il titolo della sezione "About"
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    // Campo per la prima parte della descrizione
    defineField({
      name: 'description1',
      title: 'Description Part 1',
      type: 'text',
    }),
    // Campo per le competenze (skills)
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{type: 'string'}],
    }),
    // Campo per la seconda parte della descrizione
    defineField({
      name: 'description2',
      title: 'Description Part 2',
      type: 'text',
    }),
    // Campo per il caricamento del Curriculum Vitae in formato PDF
    defineField({
      name: 'cv',
      title: 'Curriculum Vitae',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
  ],
})