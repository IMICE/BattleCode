import React, { Component } from 'react';
import { AppBar, FontIcon, MuiThemeProvider } from 'material-ui';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Confetti from 'react-confetti';
import axios from 'axios';
import CompetitionDescriptor from './CompetitionDescriptor';
import TextEditor from './TextEditor';
import TextEditorSettings from './TextEditorSettings';
import parseToMocha from './parseToMocha';
import WinShare from './WinShare';
import ReactDOM from 'react-dom';
import timer from 'react-timer-hoc';

function Counter({ timer }) {
  return <div className="timer">{timer.tick}</div>
}

const timer1000 = timer(1000);
const Timer1 = timer1000(Counter);
const timeNow = Date.now();

export default class Competition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'javascript',
      theme: 'blackboard',
      userInput: '',
      test: '',
      name: '',
      desc: '',
      id: '',
      passed: false,
      updated: false,
      solutions: [],
      time: '',
    };
    this.update = this.update.bind(this);
    this.getState = this.getState.bind(this);
    this.getSolutions = this.getSolutions.bind(this);
    this.updateState = this.updateState.bind(this);

    axios.post('/uniquecompetition', {
      id: window.location.hash.split('?id=')[1],
    }).then(res => {
      this.setState({
        test: parseToMocha(res.data[0].tests, res.data[0].name),
        name: res.data[0].name,
        desc: res.data[0].description,
        testId: res.data[0]._id,
      });
    });
  }
  getState() {
    return this.state.passed;
  }
  getSolutions() {
    return this.state.solutions;
  }
  update() {
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
    })
      .catch((err) => {
        console.error(err);
      });

  }
  updateState(newState) {

    this.setState(newState);
    this.setState({
      time: document.getElementsByClassName('timer')[0].textContent,
      
    });
  }

  render() {
    const { desc, mode, name, test, theme, userInput } = this.state;
    if (this.state.name === '') {
      return <div>loading</div>;
    } return (
      <MuiThemeProvider>
        <div className="Competition">
          <Confetti className="Confetti" />
          
          <AppBar
            title="Challenge"
            style={{ backgroundColor: '#4FB5DB' }}
            iconElementLeft={
              <Link to="/dash">
                <FontIcon className={'material-icons icons iconsLeft'}>
                    navigate_before
                </FontIcon>
              </Link>
            }
            iconElementRight={
              <TextEditorSettings updateState={this.updateState} />}
          />
          <div className="MainCompetition">
          
            <CompetitionDescriptor
              updateState={this.updateState}
              userInput={userInput}
              test={test}
              name={name}
              desc={desc}
              user={this.props.user}
              testId={this.state.testId}
              update={this.update}
              getState={this.getState}
              getSolutions={this.getSolutions}
              updated={this.state.updated}

            />
            Timer: <Timer1 />  
            <TextEditor
              className="TextEditor"
              mode={mode}
              theme={theme}
              userInput={userInput}
              updateState={this.updateState}
            />
          </div>
          <WinShare
            className="WinShare"
            testId={this.state.testId}
          />
          
          solutions  solution time: {this.state.time}
          {this.state.passed ? this.state.solutions.map(solution => <SolutionsList solution={solution} key={solution._id} />)
            : <div />}
        </div>
      </MuiThemeProvider>
    );
  }
}

Competition.propTypes = {
  user: PropTypes.string.isRequired,
};
