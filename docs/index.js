import StartPage from './start_page/index.js';
import GamePage from './game_page/index.js';
import ResultPage from './result_page/index.js';
import Game from './game.js';

// コンテナ要素を取得する
const start_page_element = document.getElementById('start_page_container');
const game_page_element = document.getElementById('game_page_container');
const result_page_element = document.getElementById('result_page_container');

// クラスを実体化する
const start_page = new StartPage(start_page_element);
const game_page = new GamePage(game_page_element);
const result_page = new ResultPage(result_page_element);

// 実体化したPageGameクラスに渡して実体化する
const game = new Game(start_page, game_page, result_page);

// ゲームを開始する
game.launch();
