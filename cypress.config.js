const { defineConfig } = require("cypress");
const { registerArgosTask } = require("@argos-ci/cypress/task")

module.exports = defineConfig({
  e2e: {
    viewportHeight: 1080,
    viewportWidth: 1920,
    async setupNodeEvents(on, config) {
      registerArgosTask(on, config, {
        // Enable upload to Argos only when it runs on CI.
        uploadToArgos: !!process.env.CI,
        // Set your Argos token (required only if you don't use Github Actions).
        token: "<YOUR-ARGOS-TOKEN>",
      });
    }
    //baseUrl: 'https://localhost:8080',
    // implement node event listeners here
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
