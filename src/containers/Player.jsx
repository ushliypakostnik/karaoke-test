import React, { Component  } from 'react';
import { connect } from 'react-redux';
import ReactAudioPlayer from 'react-audio-player';
import PropTypes from 'prop-types';

import {
  AUDIO_PATH,
  LISTEN_INTERVAL,
} from '../store/constants';

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  static getDerivedStateFromProps = (nextProps) => ({
    track: nextProps.track,
  });


  render() {
    const { track } = this.state;
    console.log('Player: ', track);

    return (
      <ReactAudioPlayer
        className="player"
        autoPlay={ false }
        src={ `${process.env.PUBLIC_URL}${AUDIO_PATH}${track}` }
        controls
        listenInterval={10}
        onPlay={e => console.log("onPlay")}
        onListen={e => console.log(e)}
        onLoadedMetadata={e => console.log(e)}
      />
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
