import React from "react";
import PropTypes from 'prop-types';

const Content = ({name, ...props}) => (
  <div className="content">
    <header><h1>{ name }</h1></header>
    {props.children}
  </div>
);

Content.propTypes = {
  name: PropTypes.string
};

export default Content;
