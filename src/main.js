import { createApp } from 'vue';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';

import { ElButton, ElTable, ElTableColumn } from 'element-plus';

const components = [ElButton, ElTable, ElTableColumn];

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

app.mount('#app');
