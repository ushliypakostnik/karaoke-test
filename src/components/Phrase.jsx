import React from "react";
import PropTypes from 'prop-types';

const Phrase = ({name, ...props}) => (
  <div className="phrase">
    <h1>{ name }</h1>
    {props.children}
  </div>
);

Phrase.propTypes = {

};

export default Phrase;
