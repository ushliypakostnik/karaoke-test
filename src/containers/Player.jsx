import React, { Component, Fragment  } from 'react';
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
    };
  }

  static getDerivedStateFromProps = (nextProps) => ({
    track: nextProps.track,
  });

  componentDidMount() {
    const audio = document.getElementsByTagName('audio')[0];
    audio.onloadedmetadata = () => {
      const duration = Math.floor(audio.duration);
      console.log('audio.duration', duration);
      const total = document.getElementById('track-duration');
      total.innerHTML += duration;
    };
  }

  setStartButtonToFalse = () => {
    this.setState({
      startButton: false,
    });
  }

  render() {
    const { track, startButton } = this.state;

    return (
      <Fragment>
        <div className="player">
          <AudioPlayer
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
            onPause={e => console.log("onPause")}
            listenInterval={ LISTEN_INTERVAL }
            onListen={e => console.log(e)}
          />
          <span className="player__track-duration" id="track-duration"></span>
        </div>
      </Fragment>
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
