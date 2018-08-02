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
      <div className="list-group" key={e[1]}>
        <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
          <div className="d-flex w-100 justify-content-between">
            {/* <h5 className="mb-1">{e[0]}</h5> */}
            {/* <small className="text-muted">{i + 1}</small> */}
          </div>
          <p className="mb-1">{e[0]}</p>
          <small className="text-muted">{e[1]} points</small>
        </a>
      </div>
    ));
      // <div key={e[1]}>
      // <li >
      // <ul><b>{e[0]} </b></ul>
      // </li>
      // <li>
      //   <ul> {e[1]} points</ul>
      //   </li>
      //   </div>
      
    // ));
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
