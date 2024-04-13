import { defineConfig } from "cypress";

import { BASE_URL } from "../../constants";

export default defineConfig({
  e2e: {
    baseUrl: BASE_URL,
    fileServerFolder: "src",
    supportFile: false,
    specPattern: "src/**/*.cy.{js,jsx,ts,tsx}",
  },
});
