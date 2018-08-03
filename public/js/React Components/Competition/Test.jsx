import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui';
import Sound from 'react-sound';

// import axios from 'axios';

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      won: false,
    };
  }
  componentDidMount() {
    try {
      mocha.suite.suites.splice(0, 1);
      eval(`${this.props.userInput}; ${this.props.test};`);
    } catch (e) {
      eval(`${this.props.test};`);
    }
  }
  componentDidUpdate() {
    this.mocha.innerHTML = '';
    try {
      mocha.suite.suites.splice(0, 1);
      eval(`${this.props.userInput}; ${this.props.test};`);

      setTimeout(() => {
        if (mocha.suite.suites[0].tests.every(test => test.state === 'passed')) {
          document.getElementsByClassName('Confetti')[0].style.display = 'block';
          this.setState({
            won: true,
          }, () => {
            if (this.props.passed === false) {
              this.props.update();
            }
          });
        } else {
          // console.log('fail!', 0);
        }
      }, 400);
    } catch (e) {
      eval(`${this.props.test};`);
    }
  }

  render() {
    return (
      <Card>
        <CardText>
          {this.state.won ?
            <div>
              <Sound
                // url="http://freesound.org/data/previews/25/25779_15220-lq.mp3"
                url="http://freesound.org/data/previews/333/333387_5884138-lq.mp3"
                playStatus={Sound.status.PLAYING}
              />
            </div> : <div />
          }
          <div id="mocha" ref={(mocha) => { this.mocha = mocha; }} style={{ margin: 0 }} />
        </CardText>
      </Card>
    );
  }
}

Test.propTypes = {
  test: PropTypes.string.isRequired,
  userInput: PropTypes.string.isRequired,
  // user: PropTypes.string.isRequired,
  // testId: PropTypes.string.isRequired,
  // compDescState: PropTypes.function.isRequired,
};
