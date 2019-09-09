import React, { Component } from 'react';
import AudioPlayer from "react-h5-audio-player";

class Player extends Component {
  render() {
    return (
      <div className="player">
        <AudioPlayer
          autoPlay
          src={process.env.PUBLIC_URL + '/audio/audio.wav'}
          onPlay={e => console.log("onPlay")}
          // other props here
        />
      </div>
    );
  }
}

export default Player;
