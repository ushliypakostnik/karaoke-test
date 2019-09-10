import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { CONTENT } from '../store/constants';
import {
  setTrack,
  fetchTrackTranscript,
} from '../store/actions';

import { Spin } from 'antd';
import '../../node_modules/antd/lib/spin/style/index.css';

import Content from '../components/Content';
import Player from './Player';

import '../styles/_stylebase.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
    };
  }

  static getDerivedStateFromProps = (nextProps) => ({
    isLoaded: nextProps.isLoaded,
    track: nextProps.track,
  });

  componentDidMount() {
    this.props.setTrack(CONTENT[0].name);
    this.props.fetchTrackTranscript(CONTENT[0].name);
  }

  render() {
    const { isLoaded, track } = this.state;
    let ContentClass = classNames('card', 'page__content', {
      'page__content--loading': !isLoaded,
    });

    return (
      <div className="page">
        <div className="page__container">
          <div className={ ContentClass }>
            {!isLoaded ? <Spin size="large" /> :
            <Content name={ track }>
            </Content>}
          </div>
          <div className="card page__player">
            <Player />
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  track: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isLoaded: !state.rootReducer.isFetching,
  track: state.rootReducer.track,
});

const mapDispatchToProps = (dispatch) => ({
  setTrack: (name) => dispatch(setTrack(name)),
  fetchTrackTranscript: (name) => dispatch(fetchTrackTranscript(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
