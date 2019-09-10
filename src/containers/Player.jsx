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

          <AudioPlayer
            autoPlay={ false }
            src={ `${process.env.PUBLIC_URL}${AUDIO_PATH}${track}` }
            onPlay={e => {
              console.log("onPlay");
              if (startButton) {
                const button = document.querySelector('.toggle-play-button');
                button.click();
                this.setStartButtonToFalse();
              }
            }}
            listenInterval={ LISTEN_INTERVAL }
            onListen={e => console.log(e)}
          />
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
