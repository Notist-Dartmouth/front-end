import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { red700, red300 } from 'material-ui/styles/colors';

const ExploreError = props => (
  <div style={{
    margin: 'auto',
    width: '75%',
    padding: '10%' }}
  >
    <h2>Sorry, there was an error with explore.</h2>
    <br />
    <div>
      <FlatButton
        label="Try again"
        primary
        style={{ color: 'white' }}
        hoverColor={red300}
        backgroundColor={red700}
        onClick={props.handleRetry}
      />
    </div>
  </div>
);

ExploreError.propTypes = {
  handleRetry: PropTypes.func.isRequired,
};

export default ExploreError;
