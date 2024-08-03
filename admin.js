(async () => {
    const { default: build } = await import("https://esm.sh/build");
  
    const mod = await build({
      dependencies: {
        "sanity": "^3.27.0",
        "@sanity/vision": "^3.27.0",
      },
      source: `
        import { defineConfig, renderStudio } from "sanity";
        import { structureTool } from "sanity/structure";
        import { presentationTool } from 'sanity/presentation';
        import { visionTool } from "@sanity/vision";
  
        // Schemi importati
        import { schemaTypes } from 'my-website/schemaType/index.js'; // Assicurati che il percorso sia corretto
  
        const config = defineConfig({
          basePath: '/admin',
          projectId: "50cvvnf6", // Sostituisci con il tuo projectId
          dataset: "production", // Sostituisci con il tuo dataset
          schema: {
            types: schemaTypes
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
  