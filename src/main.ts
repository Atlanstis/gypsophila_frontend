import '@unocss/reset/tailwind-compat.css';
import 'virtual:uno.css';

import { createApp } from 'vue';

import App from './App.vue';
import './styles/global.scss';

createApp(App).mount('#app');
