import { createApp } from 'vue'
import App from './App.vue'
import add from './directives/add';
import move from './directives/move';
import resize from './directives/resize';

import './assets/styles/main.scss'
const app = createApp(App)
app.directive('addArea', add)
app.directive('move', move)
app.directive('resize', resize)
app.mount('#app')
