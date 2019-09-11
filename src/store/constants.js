export const CONTENT = [
  { name: 'audio', date: '21 мар 18:03:41' }
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
