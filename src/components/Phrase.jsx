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
        return <Word
                 key={ index }
                 word={ word.word }
                 timeStart={ word.timeStart }
                 timeEnd={ word.timeEnd }
               />;
      })}
    </div>
  </div>
);

Phrase.propTypes = {
  timeStart: PropTypes.string,
  word: PropTypes.object,
};

export default Phrase;
