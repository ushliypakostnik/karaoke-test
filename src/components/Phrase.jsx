import React from "react";
import PropTypes from 'prop-types';

import Word from '../containers/Word';

import { Avatar } from 'antd';
import '../../node_modules/antd/lib/avatar/style/index.css';

import icon from '../images/ava.png';

const Phrase = ({time, words}) => (
  <div className="phrase">
    <Avatar
      size={32}
      src={ icon }
      className="phrase__avatar"
    />
    <h4>{ time }</h4>
    <div className="phrase__text">
      {words.map((word, index) => {
        console.log(word.word);
        return <Word word={ word.word } />;
      })}
    </div>
  </div>
);

Phrase.propTypes = {

};

export default Phrase;
