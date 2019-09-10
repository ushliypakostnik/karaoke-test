import React from "react";
import PropTypes from 'prop-types';

const Content = ({name, transcript}) => (
  <div className="content">
    <header><h1>{ name }</h1></header>
    {transcript.map((item, index) => {
      console.log(item.timeStart);
      console.log(item.words);
    })}
  </div>
);

Content.propTypes = {
  name: PropTypes.string,
  transcript: PropTypes.arrayOf(PropTypes.object),
};

export default Content;
