import React from "react";
import PropTypes from 'prop-types';

import { Avatar } from 'antd';
import '../../node_modules/antd/lib/avatar/style/index.css';

const Phrase = ({ ...props}) => (
  <div className="phrase">
    <Avatar size={64} icon="user" />
  </div>
);

Phrase.propTypes = {

};

export default Phrase;
