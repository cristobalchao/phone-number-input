import configureStore from './store';
import { PhoneGame, PhoneObserver } from './components';

const store = configureStore();
const phoneGame = new PhoneGame(store);
const phoneObserver = new PhoneObserver(store);
phoneGame.addEvents();
phoneObserver.updateDOMValues();
phoneObserver.init();
