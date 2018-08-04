import React, { Component } from 'react';
import axios from 'axios';

export default class Rankings extends Component {
  constructor() {
    super();
    this.state = {
      userRankings: [],
      badges: localStorage.getItem('badges').split(','),
    };
    this.getBadge = this.getBadge.bind(this);
    this.emblems = {
      'Seaman Recruit': 'https://www.military-ranks.org/images/ranks/navy/large/seaman-recruit.png',
      'Seaman Apprentice': 'https://www.military-ranks.org/images/ranks/navy/large/seaman-apprentice.png',
      'Seaman': 'https://www.military-ranks.org/images/ranks/navy/large/seaman.png',
      'Command Master Chief Petty Officer': 'https://www.military-ranks.org/images/ranks/navy/large/command-master-chief-petty-officer.png',
      'Ensign': 'https://www.military-ranks.org/images/ranks/navy/large/ensign.png',
      'Lieutenant': 'https://www.military-ranks.org/images/ranks/navy/large/lieutenant.png',
      'Commander': 'https://www.military-ranks.org/images/ranks/navy/large/commander.png',
      'Captain': 'https://www.military-ranks.org/images/ranks/navy/large/captain.png',
      'Admiral': 'https://www.military-ranks.org/images/ranks/navy/large/admiral.png',
    };
  }
  componentWillMount() {
    axios.get('/userprofiles')
      .then(({ data }) => {
        this.setState({
          userRankings: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getBadge(points) {
    const badges = this.state.badges;
    let currBadge = badges[0];
    for (let i = 0; i < badges.length; i++) {
      if (points >= Number(badges[i + 1])) {
        currBadge = badges[i];
      }
    }
    return currBadge;
  }
  render() {
    const userRankings = this.state.userRankings.map((user, i) => (
      <div className="list-group" key={user.username}>
        <a href="" className="list-group-item list-group-item-action flex-column align-items-start">
          <div className="d-flex w-100 justify-content-between">
            <img className="mr-3" src={this.emblems[this.getBadge(user.points)]} alt="emblem image" height="50px" width="50px"></img>
            <h5 className="mb-1">{user.username}</h5>
            <small className="text-muted">{i + 1}</small>
          </div>
          <p className="mb-1">{this.getBadge(user.points)}</p>
          <small className="text-muted">{user.points} points</small>
        </a>
      </div>
    ));
    return (
      <div className="DashBoardHalf">
        <div className="ListTitle">
          <h1> Rankings </h1>
        </div>
        <ul className="DashBoardList">
          {userRankings}
        </ul>
      </div>
    );
  }
}
