import { defineConfig } from 'vite';

export default defineConfig({
  // Use repository name base only when deploying to GitHub Pages
  base: process.env.GITHUB_ACTIONS ? '/-tn-weather-app/' : '/',
});
