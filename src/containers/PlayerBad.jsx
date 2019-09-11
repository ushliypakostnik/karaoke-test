import React, { Component  } from 'react';
import { connect } from 'react-redux';
import AudioPlayer from "react-h5-audio-player";
import PropTypes from 'prop-types';

import {
  AUDIO_PATH,
  LISTEN_INTERVAL,
} from '../store/constants';

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startButton: true,
      currentTime: 0,
    };
  };

  static getDerivedStateFromProps = (nextProps) => ({
    track: nextProps.track,
  });

  componentDidMount() {
    this.setAudioDuration();
  };

  componentDidUpdate() {
    this.setAudioDuration();
  }

  setAudioDuration = () => {
    const audio = document.getElementsByTagName('audio')[0];
    audio.onloadedmetadata = () => {
      const duration = Math.floor(audio.duration);
      const total = document.getElementById('track-duration');
      total.innerHTML += duration;
    };
  };

  setStartButtonToFalse = () => {
    this.setState({
      startButton: false,
    });
  };

  setProgress = (listen) => {
    const timeElement = document.querySelector('.current-time');
    const wrapper = document.querySelector('.progress-bar-wrapper');
    const sought = document.querySelector('.sought');

    let currentTime;
    if (listen) {
      currentTime = this.state.currentTime;
    } else currentTime = this.textTimeContentToRealTime(timeElement.textContent);
    let width = parseInt(window.getComputedStyle(wrapper).getPropertyValue('width')) * currentTime / this.getTotalTime();
    sought.style.width = width + 'px';
  };

  textTimeContentToRealTime = (textTimeContent) => {
    const minutes = Number(textTimeContent.split(':')[0]);
    const seconds = Number(textTimeContent.split(':')[1]);
    const realTime = minutes * 60 + seconds;
    if (realTime === 0) return 0.1;
    return realTime;
  };

  getTotalTime = () => {
    const total = document.getElementById('track-duration');
    return Number(total.textContent);
  };

  render() {
    const { track, startButton, currentTime } = this.state;
    console.log(currentTime);

    return (
      <div className="player">
        <AudioPlayer
          listenInterval={ LISTEN_INTERVAL }
          src={ `${process.env.PUBLIC_URL}${AUDIO_PATH}${track}` }
          onPlay={e => {
            console.log("onPlay");
            if (startButton) {
              e.preventDefault();
              const button = document.querySelector('.toggle-play-button');
              button.click();
              button.classList.add('toggle-play-button--after-firs-click');
              this.setStartButtonToFalse();
            }
          }}
          onListen={e => {
            // console.log(e.toFixed(3));
            this.setState({
              currentTime: e.toFixed(3),
            });
            this.setProgress(true);
          }}
          onDragMove={e => {
            this.setProgress(false);
          }}
          onPause={e => {
            console.log('onPaused', e);
          }}
        />
        <span className="player__track-duration" id="track-duration"></span>
        <span className="player__crack"></span>
      </div>
    );
  }
}

Player.propTypes = {
  track: PropTypes.string,
};

const mapStateToProps = (state) => ({
  track: state.rootReducer.track,
});

export default connect(mapStateToProps, null)(Player);


