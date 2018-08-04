import React, { Component } from 'react';

export default class Badges extends Component {
  constructor() {
    super();
    this.state = {
      BadgesList: [
        ['Seaman Recruit', 0, 'https://www.military-ranks.org/images/ranks/navy/large/seaman-recruit.png'],
        ['Seaman Apprentice', 1000, 'https://www.military-ranks.org/images/ranks/navy/large/seaman-apprentice.png'],
        ['Seaman', 5000, 'https://www.military-ranks.org/images/ranks/navy/large/seaman.png'],
        ['Command Master Chief Petty Officer', 10000, 'https://www.military-ranks.org/images/ranks/navy/large/command-master-chief-petty-officer.png'],
        ['Ensign', 20000, 'https://www.military-ranks.org/images/ranks/navy/large/ensign.png'],
        ['Lieutenant', 40000, 'https://www.military-ranks.org/images/ranks/navy/large/lieutenant.png'],
        ['Commander', 100000, 'https://www.military-ranks.org/images/ranks/navy/large/commander.png'],
        ['Captain', 200000, 'https://www.military-ranks.org/images/ranks/navy/large/captain.png'],
        ['Admiral', 1000000000, 'https://www.military-ranks.org/images/ranks/navy/large/admiral.png'],
      ],
    };
    localStorage.setItem('badges', this.state.BadgesList);
  }
  render() {
    const BadgesList = this.state.BadgesList.map(e => (
      <div className="list-group" key={e[1]}>
        <a href="" className="list-group-item list-group-item-action flex-column align-items-start">
          <div className="d-flex w-100 justify-content-between">
            <img className="mr-3" src={e[2]} alt="emblem image" height="50px" width="50px"></img>
          </div>
          <p className="mb-1">{e[0]}</p>
          <small className="text-muted">{e[1]} points</small>
        </a>
      </div>
    ));
    return (
      <div className="DashBoardHalf">
        <div className="ListTitle">
          <h1> Badges </h1>
        </div>
        <ul className="DashBoardList">
          {BadgesList}
        </ul>
      </div>
    );
  }
}
