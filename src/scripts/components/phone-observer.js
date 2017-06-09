import {
	$,
	$$ 
} from '../utils';


export default class PhoneObserver {
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
