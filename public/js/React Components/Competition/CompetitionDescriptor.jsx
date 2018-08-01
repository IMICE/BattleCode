import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui';
import Test from './Test';
import SocketPlace from './SocketPlace';
import axios from 'axios';
import SolutionsList from './SolutionsList.jsx';


class CompetitionDescriptor extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      passed: false,
      updated: false,
      solutions: [],
    };
    this.makeUpdateTrue = this.makeUpdateTrue.bind(this);
    this.getState = this.getState.bind(this);
    this.getSolutions = this.getSolutions.bind(this);
  }
  getState() {
    return this.state.passed;
  }
  getSolutions() {
    return this.state.solutions;
  }
  makeUpdateTrue() {
    axios.post('/gamewin', { email: this.props.user, gameId: this.props.testId }).then((res) => {
      axios.post('/solutions', { testId: this.props.testId, solution: this.props.userInput, username: this.props.user }).then((res) => {
        const testId = this.props.testId;
        axios.get('/solutions', {
          params: { testId },
        }).then((res) => {
          const allSolutions = res.data;
          this.setState({
            updated: true,
            passed: true,
            solutions: allSolutions,
          });
        });
      });
    });
  }
  render() {
    const { desc, testId, name, test, user, userInput } = this.props;
    return (
      <div className="CompetitionDescriptor">
        <div className="TopDescription">
          <SocketPlace
            passed={this.getState}
            solutions={this.getSolutions}
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
          passed={this.state.updated}
          update={this.makeUpdateTrue}
          test={test}
          userInput={userInput}
          user={user}
          testId={testId}
        />
        solutions

        {this.state.passed ? this.state.solutions.map(solution => <SolutionsList solution={solution} key={solution._id} />)
          : <div />}
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
};

export default CompetitionDescriptor;
