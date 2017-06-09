import { 
	RESET,
	VALUE_IS_EQUAL,
	VALUE_IS_GREATER,
	VALUE_IS_LESS 
} from '../constants/game';


export function reset() {
	return {
		type: RESET
	};
};

export function valueIsEqual() {
  return {
     type: VALUE_IS_EQUAL
  };
};

export function valueIsGreater() {
  return {
     type: VALUE_IS_GREATER
  };
};

export function valueIsLess() {
  return {
     type: VALUE_IS_LESS
  };
};
