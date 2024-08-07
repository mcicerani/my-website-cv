(async () => {
    const { default: build } = await import("https://esm.sh/build");
  
    const mod = await build({
      dependencies: {
        "sanity": "^3.27.0",
        "@sanity/vision": "^3.27.0",
      },
      source: `
        import { defineConfig, renderStudio, defineField, defineType } from "sanity";
        import { structureTool } from "sanity/structure";
        import { presentationTool } from 'sanity/presentation';
        import { visionTool } from "@sanity/vision";
  
        // Configurazione di Sanity Studio con schemi incorporati
        const config = defineConfig({
          basePath: '/admin',
          projectId: "50cvvnf6", // Sostituisci con il tuo projectId
          dataset: "production", // Sostituisci con il tuo dataset
          schema: {
            types: [
              // Schema "about"
              defineType({
                name: 'about',
                title: 'About',
                type: 'document',
                fields: [
                  defineField({
                    name: 'title',
                    title: 'Title',
                    type: 'string',
                  }),
                  defineField({
                    name: 'description1',
                    title: 'Description Part 1',
                    type: 'text',
                  }),
                  defineField({
                    name: 'skills',
                    title: 'Skills',
                    type: 'array',
                    of: [{type: 'string'}],
                  }),
                  defineField({
                    name: 'description2',
                    title: 'Description Part 2',
                    type: 'text',
                  }),
                  defineField({
                    name: 'cv',
                    title: 'Curriculum Vitae',
                    type: 'file',
                    options: {
                      accept: '.pdf',
                    },
                  }),
                ],
              }),
              // Schema "service"
              defineType({
                name: 'service',
                title: 'Service',
                type: 'document',
                fields: [
                  defineField({
                    name: 'title',
                    title: 'Title',
                    type: 'string',
                  }),
                  defineField({
                    name: 'descrizione',
                    title: 'Descrizione',
                    type: 'array',
                    of: [{type: 'string'}],
                  }),
                ],
              }),
              // Schema "portfolioItem"
              defineType({
                name: 'portfolioItem',
                title: 'Portfolio Item',
                type: 'document',
                fields: [
                  defineField({
                    name: 'title',
                    title: 'Title',
                    type: 'string',
                  }),
                  defineField({
                    name: 'description',
                    title: 'Description',
                    type: 'text',
                  }),
                  defineField({
                    name: 'url',
                    title: 'URL',
                    type: 'url',
                  }),
                  defineField({
                    name: 'image',
                    title: 'Image',
                    type: 'image',
                    options: {
                      hotspot: true,
                    },
                  }),
                ],
                preview: {
                  select: {
                    title: 'title',
                    media: 'image',
                  },
                },
              })
            ]
          },
          plugins: [structureTool(), presentationTool({}), visionTool()]
        });
  
        const div = document.getElementById('studio-container');
        export const render = () => renderStudio(div, config);
      `,
      // per il controllo dei tipi e il completamento LSP
      types: `
        export function render(): string;
      `,
    });
  
    // Importa ed esegui il modulo
    const { render } = await import(mod.bundleUrl);
    render();
  })();
  