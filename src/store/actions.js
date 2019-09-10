import { AUDIO_PATH } from './constants';

// Actions Types
////////////////////////////////////////////////////////////

export const SET_TRACK = 'SET_TRACK';

export const REQUEST_TRACK_TRANSCRIPT = 'REQUEST_TRACK_TRANSCRIPT';
export const REQUEST_TRACK_TRANSCRIPT_SUCCESS = 'REQUEST_TRACK_TRANSCRIPT_SUCCESS';
export const REQUEST_TRACK_TRANSCRIPT_ERROR = 'REQUEST_TRACK_TRANSCRIPT_ERROR';

// Action Creators
////////////////////////////////////////////////////////////

export const setTrack = (name) => {
  return {
    type: SET_TRACK,
    name,
  };
};

export const requestTrackTranscript = (name) => {
  return {
    type: REQUEST_TRACK_TRANSCRIPT,
    name,
  };
};


export const requestTrackTranscriptSuccess = (transcript) => {
  return {
    type: REQUEST_TRACK_TRANSCRIPT_SUCCESS,
    transcript,
  };
};

export const requestTrackTranscriptError = (error) => {
  return {
    type: REQUEST_TRACK_TRANSCRIPT_ERROR,
    error,
  };
};

export const fetchTrackTranscript = (name) => {
  return dispatch => {
    dispatch(requestTrackTranscript(name));
    return fetch(`${AUDIO_PATH}${name}.json`)
      .then((response) => response.json())
      .then((transcript) =>{
          dispatch(requestTrackTranscriptSuccess(transcript));
      },
      (error) => {
        dispatch(requestTrackTranscriptError(error));
      }
    );
  }
};
