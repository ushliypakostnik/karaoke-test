import React from "react";
import PropTypes from 'prop-types';

import Phrase from './Phrase';

const Content = ({title, date, transcript}) => (
  <div className="content">
    <header>
      <h1>{ title }</h1>
      <h4>{ date }</h4>
    </header>
    {transcript.map((item, index) => {
      return <Phrase
        words={ item.words }
        time={ item.timeStart }
        key={ index }
      />;
    })}
  </div>
);

Content.propTypes = {
  name: PropTypes.string,
  transcript: PropTypes.arrayOf(PropTypes.object),
};

export default Content;
