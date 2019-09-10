import React, { Component  } from 'react';
import AudioPlayer from "react-h5-audio-player";

import { LISTEN_INTERVAL } from '../store/constants';

class Player extends Component {
  render() {
    return (
      <div className="player">
        <AudioPlayer
          src={process.env.PUBLIC_URL + '/audio/audio.wav'}
          onPlay={e => console.log("onPlay")}
          listenInterval={ LISTEN_INTERVAL }
          onListen={e => console.log(e)}
        />
      </div>
    );
  }
}

export default Player;
