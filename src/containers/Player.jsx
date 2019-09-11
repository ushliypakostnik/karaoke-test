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

  setProgressFromDrag = (listen) => {
    const timeElement = document.querySelector('.current-time');
    const wrapper = document.querySelector('.progress-bar-wrapper');
    const sought = document.querySelector('.sought');
    let currentTime;
    if (listen) {
      currentTime = this.state.currentTime;
    } else currentTime = this.textTimeContentToRealTime(timeElement.textContent);
    let width = parseInt(window.getComputedStyle(wrapper).getPropertyValue('width')) * currentTime / this.getTotalTime();

    if (listen) {if (width > this.setProgressFromClick()) width = this.setProgressFromClick();}

    sought.style.width = width + 'px';
  };

  setProgressFromClick = () => {
    const indicator = document.querySelector('.indicator');
    const sought = document.querySelector('.sought');
    let left = parseInt(window.getComputedStyle(indicator).getPropertyValue('left'));
    sought.style.width = left + 'px';
    return left;
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

    return (
      <div className="player">
        <AudioPlayer
          listenInterval={ LISTEN_INTERVAL }
          src={ `${process.env.PUBLIC_URL}${AUDIO_PATH}${track}` }
          onListen={e => {
            this.setState({
              currentTime: e.toFixed(3),
            });
            this.setProgressFromDrag(true);
          }}
          onDragStart={e => this.setProgressFromDrag(false)}
          onDragMove={e => this.setProgressFromDrag(false)}
          onDragEnd={e => this.setProgressFromDrag(false)}
          onPause={e => this.setProgressFromClick()}
          onPlay={e => this.setProgressFromClick()}
          onEnded={e => this.setProgressFromClick()}
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
