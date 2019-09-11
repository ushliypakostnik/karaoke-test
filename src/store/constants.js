// App audio and json content in public foldder /public/audio
////////////////////////////////////////////////////////////

export const CONTENT = [
  { name: 'audio', date: '21 мар 18:03:41' }
];

export const AUDIO_PATH = 'audio/';

// Player ivterval - the smaller the neater the karaoke works
export const LISTEN_INTERVAL = 1;

export const INITIAL_STATE = {
  rootReducer: {
    isFetching: false,
    track: null,
    transcript: [],
    currentTime: 0,
    error: null,
  },
};
