/**
 * Inspired by https://github.com/morkro/tetrys
 **/
 
'use strict';

// Utils
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
function getSplitValues(min=0, max=999) {
	return {
		min,
		max,
		value: parseInt(((max - min) / 2) + min, 10)
	}
}

function updateSplitValues(index, values, type) {
	return [...values].map((value, valueIndex) => {
		if (index === valueIndex && type === 'greater') {
			return getSplitValues(values[index].value, values[index].max);
		}

		if (index === valueIndex && type === 'less') {
			return getSplitValues(values[index].min, values[index].value);
		}

		return value;
	});
}

// Actions
const RESET = 'RESET';
const VALUE_IS_EQUAL = 'VALUE_IS_EQUAL';
const VALUE_IS_GREATER = 'VALUE_IS_GREATER';
const VALUE_IS_LESS = 'VALUE_IS_LESS';

function reset() {
	return {
		type: RESET
	};
};

function valueIsEqual() {
  return {
     type: VALUE_IS_EQUAL
  };
};

function valueIsGreater() {
  return {
     type: VALUE_IS_GREATER
  };
};
function valueIsLess() {
  return {
     type: VALUE_IS_LESS
  };
};

// Reducers
const initialState = {
	currentSplit: 0,
	all: [getSplitValues(0, 999), getSplitValues(0, 999), getSplitValues(0, 9999)]
};

function SplitValue(state=initialState, action) {
	switch (action.type) {
		case RESET:
			return Object.assign({}, state, initialState);
		case VALUE_IS_EQUAL:
			return Object.assign({}, state, {
				currentSplit: state.currentSplit + 1
			})
		case VALUE_IS_GREATER:
			return Object.assign({}, state, {
				all: updateSplitValues(state.currentSplit, state.all, 'greater')
			})
		case VALUE_IS_LESS:
			return Object.assign({}, state, {
				all: updateSplitValues(state.currentSplit, state.all, 'less')
			})
		default:
			return state;
	}
}

// Store
const { createStore } = Redux;

function configureStore() {
  return createStore(SplitValue)
}


// Components
class PhoneGame {
  constructor(store) {
  	this.$buttons = [...$$('button')];
    this.store = store;
  }

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

  addEvents() {
    this.$buttons.forEach(
      $button => $button.addEventListener('click', this.onClick.bind(this))
    );
  }
}

class PhoneObserver {
	constructor(store) {
		this.store = store
		this.$body = $('body');
		this.$phoneSplits = [...$$('.phone-template span')];
    this.$phoneCurrentSplit = $('.phone-current-split .value');
	}

	updateDOMValues() {
		const storeState = this.store.getState();

		this.$body.classList.remove('finish');

		if (storeState.currentSplit > this.$phoneSplits.length - 1) {
			this.$body.classList.add('finish');
			return;
		}

		this.$phoneSplits.forEach(($split, splitIndex) => {
			$split.classList.remove('ok');
			$split.classList.remove('active');
			if (splitIndex < storeState.currentSplit) {
				$split.classList.add('ok');
			} else if (splitIndex === storeState.currentSplit) {
				$split.classList.add('active');
			}
			
			$split.innerHTML = storeState.all[splitIndex].value;
	  });

		this.$phoneCurrentSplit.innerHTML = storeState.all[storeState.currentSplit].value;
	}

	init() {
		this.store.subscribe(this.updateDOMValues.bind(this));
	}
}


// Index
const store = configureStore();
const phoneGame = new PhoneGame(store);
const phoneObserver = new PhoneObserver(store);
phoneGame.addEvents();
phoneObserver.updateDOMValues();
phoneObserver.init();
