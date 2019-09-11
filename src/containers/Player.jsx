import React, { Component  } from 'react';
import { connect } from 'react-redux';
import AudioPlayer from "react-h5-audio-player";
import PropTypes from 'prop-types';

import {
  AUDIO_PATH,
  LISTEN_INTERVAL,
} from '../store/constants';

import { setCurrentTime } from '../store/actions';

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: null,
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
    if (listen) {if (width > this.setProgress()) width = this.setProgress();}
    sought.style.width = width + 'px';
  };

  setProgress = () => {
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
    return realTime;
  };

  getTotalTime = () => {
    const total = document.getElementById('track-duration');
    return Number(total.textContent);
  };

  getCurrentTimeOnDragMove = () => {
    const timeElement = document.querySelector('.current-time');
    const currentTime = this.textTimeContentToRealTime(timeElement.textContent);
    return currentTime;
  };

  render() {
    const { track, currentTime} = this.state;

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
            this.props.setCurrentTime(Number(currentTime));
          }}
          onDragStart={e => this.setProgressFromDrag(false)}
          onDragMove={e => {
            this.setProgressFromDrag(false)
            this.props.setCurrentTime(this.getCurrentTimeOnDragMove());
          }}
          onDragEnd={e => this.setProgressFromDrag(false)}
          onPause={e => this.setProgress()}
          onPlay={e => this.setProgress()}
          onEnded={e => this.setProgress()}
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

const mapDispatchToProps = (dispatch) => ({
  setCurrentTime: (currentTime) => dispatch(setCurrentTime(currentTime)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
