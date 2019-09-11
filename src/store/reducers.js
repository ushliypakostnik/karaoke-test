import { INITIAL_STATE } from './constants';

import {
  SET_TRACK,
  REQUEST_TRACK_TRANSCRIPT,
  REQUEST_TRACK_TRANSCRIPT_SUCCESS,
  REQUEST_TRACK_TRANSCRIPT_ERROR,
  SET_CURRENT_TIME,
} from './actions';

const rootReducer = (state, action) => {
  if (typeof state === 'undefined') {
    return INITIAL_STATE;
  }

  switch (action.type) {
    case SET_TRACK:
      return Object.assign({}, state, {
       track: `${action.name}.wav`,
      });
    case REQUEST_TRACK_TRANSCRIPT:
      return Object.assign({}, state, {
       isFetching: true,
      });
    case REQUEST_TRACK_TRANSCRIPT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        transcript: action.transcript,
      });
    case REQUEST_TRACK_TRANSCRIPT_ERROR:
      return Object.assign({}, state, {
         isFetching: false,
         error: action.error,
      });
    case SET_CURRENT_TIME:
      return Object.assign({}, state, {
         currentTime: action.currentTime,
      });
    default:
      return state;
  };
};

export default rootReducer;
