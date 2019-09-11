import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Word extends Component {
    constructor(props) {
    super(props);

    this.state = {
      currentTime: this.props.currentTime,
    };
  };

  static getDerivedStateFromProps = (nextProps) => ({
    currentTime: nextProps.currentTime,
  });

  render() {
    const { word, timeStart, timeEnd, currentTime } = this.props;
    let wordClass = classNames('word', {
      'word--active': timeStart <= currentTime && timeEnd >= currentTime,
    });

    return (
      <span className={ wordClass }>{ word }</span>
    );
  }
};

Word.propTypes = {
  word: PropTypes.string.isRequired,
  timeStart: PropTypes.number.isRequired,
  timeEnd: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currentTime: state.rootReducer.currentTime,
});

export default connect(mapStateToProps, null)(Word);
