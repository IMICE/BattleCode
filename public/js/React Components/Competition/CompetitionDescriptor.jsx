import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui';
import Test from './Test';
import SocketPlace from './SocketPlace';

class CompetitionDescriptor extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
    };
  }

  render() {
    const { desc, testId, name, test, user, userInput, update, getState, getSolutions, updated } = this.props;
    return (
      <div className="CompetitionDescriptor">
        <div className="TopDescription">
          <SocketPlace
            passed={getState}
            getSolutions={getSolutions}
            user={user}
            testName={name}
          />
          <Card className="Description">
            <CardText>
              <h1>{name}</h1>
              <p>{desc}</p>
            </CardText>
          </Card>
        </div>
        <Test
          passed={updated}
          update={update}
          test={test}
          userInput={userInput}
          user={user}
          testId={testId}
        />
      </div>
    );
  }
}

CompetitionDescriptor.propTypes = {
  desc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  test: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  userInput: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
  getSolutions: PropTypes.func.isRequired,
  updated: PropTypes.bool.isRequired,

};

export default CompetitionDescriptor;
