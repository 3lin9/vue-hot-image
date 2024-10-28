import { createApp } from 'vue'
import HotZone from './components/HotZone.vue';
import './assets/styles/main.scss';
import add from './directives/add';
import move from './directives/move';
import resize from './directives/resize';

const app = createApp(HotZone)
app.directive('addArea', add)
app.directive('move', move)
app.directive('resize', resize)

export default HotZone;