const {default: build} = await import("https://esm.sh/build")

const mod = await build({
  dependencies: {
    "sanity": "^3.27.0",
    "@sanity/vision": "^3.27.0",
  },
  source: `
      import { defineConfig, renderStudio } from "sanity";
      import { structureTool } from "sanity/structure";
      import {presentationTool} from 'sanity/presentation';
      import { visionTool } from "@sanity/vision";

      const config = defineConfig({
        basePath: '/admin',
        projectId: "50cvvnf6",
        dataset: "production",
        schema: {
          types: [
            {
              type: "document",
              name: "post",
              title: "Post",
              fields: [
                {
                  type: "string",
                  name: "title",
                  title: "Title"
                }
              ]
            }
          ]
        },
        plugins: [structureTool(), presentationTool({}), visionTool()]
      });
const div = document.createElement('div')
document.body.innerHTML = ''
document.body.appendChild(div)
export const render = () => renderStudio(div, config);
  `,
  // for types checking and LSP completion
  types: `
    export function render(): string;
  `,
});

// import module
const { render } = await import(mod.bundleUrl);

render()

