import { createStore } from 'redux';
import { game } from '../reducers';


export default function configureStore() {
  return createStore(game);
}
