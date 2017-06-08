'use strict';

const Phone = [{
	min: 0,
	max: 999
}, {
	min: 0,
	max: 999
}, {
	min: 0,
	max: 9999
}];

class PhoneGame {

  constructor() {
    this.eventTriggers = {
    	resetBtn: () => {
    		this._initValues();
    	},
    	lessBtn: () => {
    		this._setCurrentSplit(1);
    	},
    	yesBtn: () => {
    		this._setCurrentSplit(0);
    	},
    	greaterBtn:  () => {
    		this._setCurrentSplit(2);
    	}
    };

    this.domEls = {
    	main: document.body,
    	phoneSplits: Array.prototype.slice.call(document.querySelectorAll('.phone-template span')),
    	phoneCurrentSplit: document.querySelector('.phone-current-split span'),
    	inputs: {
    		resetBtn: document.querySelector('.reset__btn'),
    		lessBtn: document.querySelector('.less__btn'),
    		yesBtn: document.querySelector('.yes__btn'),
    		greaterBtn: document.querySelector('.greater__btn')
    	}
    };

    this._initValues();
    this._initInputEvents();
  }

  _initValues() {
  	this.phone = JSON.parse(JSON.stringify(Phone));
    this.currentSplitIndex = 0;
    this.domEls.main.classList.remove('finish');
    this._render();
  }

  _initInputEvents() {
  	for (let keyInput in this.domEls.inputs) {
  		this.domEls.inputs[keyInput].addEventListener('click', this.eventTriggers[keyInput]);
  	}
  }

  _render() {
  	this.domEls.phoneSplits.forEach((splitEl, splitIndex) => {
  		const splitData = this.phone[splitIndex];
	  	splitData.value = this._getSplitCurrentValue(splitData);

	  	splitEl.classList.remove('active');
	  	splitEl.classList.remove('ok');

	  	if (this.currentSplitIndex > splitIndex) {
	  		splitEl.classList.add('ok');
	  	}

	  	if (this.currentSplitIndex === splitIndex) {
	  		splitEl.classList.add('active');
	  		this.domEls.phoneCurrentSplit.innerHTML = splitData.value;
	  	}

	  	this.domEls.phoneSplits[splitIndex].innerHTML = splitData.value;
  	});
  }

  _getSplitCurrentValue(split) {
  	return parseInt(((split.max - split.min) / 2) + split.min, 10)
  }

  _setCurrentSplit(type) {
  	const currentSplit = this.phone[this.currentSplitIndex];

  	if (type === 0) {
  		this.currentSplitIndex = this.currentSplitIndex + 1;

  		if (this.currentSplitIndex > this.phone.length - 1) {
  			this.domEls.main.classList.add('finish');
  		}
  	} else if (type === 1) {  //The value is less
  		currentSplit.max = currentSplit.value;
  	} else if (type === 2) {  //The value is more
  		currentSplit.min = currentSplit.value;
  	}

  	this._render();
  }

}

new PhoneGame();
