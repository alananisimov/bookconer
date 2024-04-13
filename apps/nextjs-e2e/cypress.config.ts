import { defineConfig } from "cypress";

const BASE_URL =
  process.env.NODE_ENV == "production"
    ? `https://bookconer.site`
    : `http://localhost:${process.env.PORT ?? 3000}`;

export default defineConfig({
  e2e: {
    baseUrl: BASE_URL,
    fileServerFolder: "src",
    supportFile: false,
    specPattern: "src/**/*.cy.{js,jsx,ts,tsx}",
  },
});
