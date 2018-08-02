import React, { Component } from 'react';

export default class Badges extends Component {
  constructor() {
    super();
    this.state = {
      BadgesList: [['Deck Swabber', 0],['Seaman Apprentice', 1000], ['Seaman', 5000],['Able Seaman', 10000], ['Boatswain', 20000],
      ['Third Mate', 30000], ['Second Mate', 40000], ['First Mate', 100000], ['Captain', 200000], ['Admiral', 1000000000]]
    };
  localStorage.setItem('badges', this.state.BadgesList);

  }
  render() {
    const BadgesList = this.state.BadgesList.map(e => (
      <div key={e[1]}>
      <li >
      <ul><b>{e[0]} </b></ul>
      </li>
      <li>
        <ul> {e[1]} points</ul>
        </li>
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
