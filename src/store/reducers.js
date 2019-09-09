import { INITIAL_STATE } from './constants';
import { ACTION_EXAMPLE } from './actions';

const rootReducer = (state, action) => {
  if (typeof state === 'undefined') {
    return INITIAL_STATE;
  }

  switch (action.type) {
    case ACTION_EXAMPLE:
      return Object.assign({}, state, {
      });
    default:
      return state;
  };
};

export default rootReducer;
