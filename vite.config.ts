import { defineConfig } from 'vite'
import vitePrerender from 'vite-plugin-prerender'
const Renderer = vitePrerender.PuppeteerRenderer
import * as path from 'path'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),  
    vitePrerender({
    // Required - The path to the vite-outputted app to prerender.
    staticDir: path.join(__dirname, 'dist'),
    // Required - Routes to render.
    routes: ['/', '/signin', '/signup'],
    // renderer: require('@prerenderer/renderer-puppeteer'),
    // captureAfterDocumentEvent: 'custom-render-trigger',
    renderer: new Renderer({
      // injectProperty: '__PRERENDER_INJECTED',
      // 포트값 지정
      server: {
        port: 8080
      },
      // 아오... 왜... render(mount)되기 전에 만들어지는지 모르겠네.....
      captureAfterDocumentEvent: 'render-event',
      // maxConcurrentRoutes : 5,
      //renderAfterDocumentEvent: 'custom-render-trigger',
      timeout: 0,
      headless: false,
      // renderAfterTime: 12000
    }) 
  }),],
})
