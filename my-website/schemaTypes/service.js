import {defineField, defineType} from 'sanity'

// Definizione del tipo di documento "about"
export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    // Campo per il titolo della sezione "About"
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    // Campo per le descrizioni dei servizi
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
})