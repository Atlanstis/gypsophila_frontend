import '@unocss/reset/tailwind-compat.css';
import 'virtual:uno.css';

import { createApp } from 'vue';

import { setupRouter } from '@/router';
import { setupStore } from '@/store';

import App from './App.vue';
import './styles/global.scss';

const app = createApp(App);

async function setupApp() {
  setupStore(app);

  await setupRouter(app);

  app.mount('#app');
}

setupApp();
