import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { CONTENT } from '../store/constants';
import {

} from '../store/actions';

class Word extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  };

  static getDerivedStateFromProps = (nextProps) => ({
  });

  componentDidMount() {
  };

  render() {
    const { word } = this.props;

    return (
      <span className="word">{ word }</span>
    );
  }
};

Word.propTypes = {
  word: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(null, null)(Word);
