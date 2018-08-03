import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Card, CardText, MuiThemeProvider } from 'material-ui';
import Script from 'react-load-script';
import { GoogleLogin } from 'react-google-login-component';
import Sound from 'react-sound';
import boat from '../../../../images/SSBattleCode.png';

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLoginLoaded: false,
      user: null,
      clicked: false,
    };
    this.responseGoogle = this.responseGoogle.bind(this);
  }
  handleClick() {
    console.log('handleClick called')
    this.setState({
      clicked: true,
    });
  }
  responseGoogle(googleUser) {
    const idToken = googleUser.getAuthResponse().id_token;
    const profile = googleUser.getBasicProfile();
    const userEmail = profile.getEmail();
    console.log({ accessToken: idToken, email: userEmail, userProfile: profile });
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/signin', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = () => {
      window.isLoggedIn = true;
      window.user = userEmail;
      this.setState({
        userLoginLoaded: true,
        user: userEmail,
      });
    };
    xhr.send(`idtoken=${idToken}`);
  }
  render() {
    return (
      <MuiThemeProvider >
        <Card>
          <div className="col-md-12 Signin">
            <Script url="https://apis.google.com/js/platform.js" />
            {this.state.clicked ?
              <div>
                {console.log('clicked')}
                <Sound
                  url="http://freesound.org/data/previews/32/32304_37876-lq.mp3"
                  playStatus={Sound.status.PLAYING}
                />
              </div> : <div />
            }
            {this.state.userLoginLoaded ? <Redirect to="/dash" /> : <div />}
            <div id="boat">
              <img className="animated" src={boat} alt="battle boat" />
            </div>
            <div>
              <Sound
                url="http://freesound.org/data/previews/93/93678_1386366-lq.mp3"
                // url="http://freesound.org/data/previews/71/71123_1039875-lq.mp3"      
                playStatus={Sound.status.PLAYING}
                loop={true}
              />
            </div>
            <h1 className="headers">BattleCode!</h1>
            <h3 className="headers">Compete against others to prove your coding skills!</h3>
            <CardText className="signin-buttons">
              <GoogleLogin
                onClick={this.handleClick}
                socialId="106454631553-mles8i7ktt96qbvps7uoh2k9idop90e0.apps.googleusercontent.com"
                className="login-btn"
                scope="https://www.googleapis.com/auth/userinfo.email"
                responseHandler={this.responseGoogle}
                buttonText="Login With Google"
              />
            </CardText>
          </div>
        </Card>
      </MuiThemeProvider>
    );
  }
}
