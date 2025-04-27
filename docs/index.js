import { start_page } from './start_page/index.js';
import { game_page } from './game_page/index.js';
import { result_page } from './result_page/index.js';

function entrypoint() {
    start_page();
    game_page();
    result_page();
}

entrypoint();