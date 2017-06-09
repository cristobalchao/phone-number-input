import { getSplitValues, updateSplitValues} from '../utils';
import { 
	RESET,
	VALUE_IS_EQUAL,
	VALUE_IS_GREATER,
	VALUE_IS_LESS
} from '../constants/game';


const initialState = {
	currentSplit: 0,
	all: [getSplitValues(0, 999), getSplitValues(0, 999), getSplitValues(0, 9999)]
};

export default function Game(state=initialState, action) {
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
