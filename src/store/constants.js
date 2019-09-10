export const CONTENT = [
  { name: 'audio' }
];

export const AUDIO_PATH = 'audio/';

export const LISTEN_INTERVAL = 100;

export const INITIAL_STATE = {
  rootReducer: {
    isFetching: false,
    track: null,
    transcript: [],
    error: null,
  },
};
