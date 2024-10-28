import { createApp } from 'vue'
import HotZone from './components/HotZone.vue';
import './assets/styles/main.scss';

const app = createApp(App)
app.directive('addArea', add)
app.directive('move', move)
app.directive('resize', resize)

export default HotZone;