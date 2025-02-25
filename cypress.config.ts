import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "d6hww8",
  e2e: {
    baseUrl: "http://localhost:3000",  // Ensure this is your running app URL
  },
});
