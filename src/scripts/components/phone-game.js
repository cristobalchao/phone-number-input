import { $$ } from '../utils';
import { 
	reset,
	valueIsEqual,
	valueIsGreater,
	valueIsLess 
} from '../actions';


/**
 * @class PhoneGame
 */
export default class PhoneGame {

  constructor(store) {
  	this.$buttons = [...$$('button')];
    this.store = store;
  }

  /**
	 * Event handler that depending on the `data-` attributes of an element either updates
	 * the view or store.dispatches actions.
	 * @param {HTMLElement} target
	 * @return {undefined}
	 */
  onClick({ target }) {
    switch (target.getAttribute('data-action')) {
	    case 'RESET':
	      this.store.dispatch(reset());
	      break;
	    case 'VALUE_IS_EQUAL':
	      this.store.dispatch(valueIsEqual());
	      break;
	    case 'VALUE_IS_GREATER':
	      this.store.dispatch(valueIsGreater());
	      break;
	    case 'VALUE_IS_LESS':
	     	this.store.dispatch(valueIsLess());
	      break;
	    default:
	      break;
	  }

    target.blur();
  }

  /**
	 * Adds event listener to buttons.
	 * @return {undefined}
	 */
  addEvents() {
    this.$buttons.forEach(
      $button => $button.addEventListener('click', this.onClick.bind(this))
    );
  }
}
