import React, { Component } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

const socket = io();

export default class SocketPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: 'Game in Progress!',
      players: [],
      user: this.props.user,
      room: this.props.testName,
    };
    this.send = this.send.bind(this);
    this.updateState = this.updateState.bind(this);
    this.checkWin();
    socket.emit('room', this.props);
    socket.on('new user join', (data) => {
      console.log(data, 'newuser');
      const newP = this.state.players.concat(data);
      this.setState({ players: newP });
    });
    socket.on('winner', (data) => {
      this.setState({ winner: data });
    });
  }
  checkWin() {
    const winCheck = setInterval(() => {
      if (this.props.passed()) {
        // console.log(this.props.user.slice(0, this.props.user.indexOf('@')));
        socket.emit('msg', `${this.props.user.slice(0, this.props.user.indexOf('@'))} won!`);
        clearInterval(winCheck);
      }
    }, 20);
  }
  send(event) {
    // console.log(event);
    socket.emit('room', 'button clicked');
  }
  updateState(newState) {
    this.setState(newState);
  }

  render() {
    if (this.state.winner) {
      return (
        <div>
          {/* {setTimeout(() => console.log(user, players), 1000)} */}
          <h3>{this.state.winner}</h3> <br/>
          <h4>You lost, but try to solve the problem anyway</h4>
          <img src={"https://gifimage.net/wp-content/uploads/2017/06/poop-gif-11.gif"}></img>
          Chat About It!
        </div>
      );
    }
    const { players, user } = this.state;
    return (
      <div>
        {/* {setTimeout(() => console.log(user, players), 1000)} */}
        <h3>In room now {players}</h3>
      </div>
    );
  }
}

SocketPlace.propTypes = {
  user: PropTypes.string.isRequired,
};
