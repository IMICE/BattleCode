import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
const config = require('./../../../../config.js');
// /home/josh/BattleCode/public/js/React Components/Competition/chat.jsx
// /home/josh/BattleCode/config.js
export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      messages: [],
      GIF: '',
      gifmessage: '',
      query: '',
    };
    this.socket = io();

    const addMessage = (data) => {
      this.setState({ messages: [...this.state.messages, data] });
    };

    this.socket.on('RECEIVE_MESSAGE', (data) => {
      addMessage(data);
    });

    this.handleKeyInput = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.sendMessage(e);
      }
      this.getGif('poop');
    };

    this.sendMessage = (ev) => {
      ev.preventDefault();
      this.socket.emit('SEND_MESSAGE', {
        author: this.props.user.slice(0, props.user.indexOf('@')),
        message: this.state.message,
      });
      this.setState({ message: '' });
    };
    this.getGif = (query) => {
      const api_key= config.GIPHY;
      axios.get(`http://api.giphy.com/v1/gifs/search?q=poop&api_key=${api_key}`)
        .then((response) => {
          let results = response.data.data[0];
            this.setState({
              GIF: results.images.downsized.url,
            });
          //  else {
          //   this.setState({
          //     gifmessage: 'No GIFs found'
          //   })
          // }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="card-title">Global Chat</div>
                <hr />
                <img src={this.state.GIF}></img>
                <div className="messages">
                  {this.state.messages.map(message => (
                    <div>{message.author}: {message.message}</div>
                  ))}
                </div>
              </div>
              <div className="card-footer">
              
                <br />
                <input
                  onKeyPress={this.handleKeyInput}
                  type="text"
                  placeholder="Message"
                  className="form-control"
value={this.state.message}
onChange={ev => this.setState({ message: ev.target.value })}
                />
                <br />
                <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
