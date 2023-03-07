import { createApp } from 'vue';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap/dist/css/bootstrap.css';

import App from './App.vue'
import Game from './components/Game.vue';
import GameHeader from './components/GameHeader.vue';
import GameContent from './components/GameContent.vue';
import ScoreBoard from './components/ScoreBoard.vue';
import GameScroller from './components/GameScroller.vue';
import './assets/main.scss';

const app = createApp(App);
app.use(bootstrap);

app.component('game-body', Game);
app.component('game-header', GameHeader);
app.component('game-content', GameContent);
app.component('score-board', ScoreBoard);
app.component('game-scroller', GameScroller);

app.mount('#app');
