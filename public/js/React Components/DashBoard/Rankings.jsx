import React, { Component } from 'react';
import axios from 'axios';

export default class Rankings extends Component {
  constructor() {
    super();
    this.state = {
      userRankings: [],
      badges: localStorage.getItem('badges').split(','),
      // RankingsList: [],
    };
    this.getBadge = this.getBadge.bind(this);
  }
  
  getBadge(points){
    return this.state.badges.filter((badge) => {
        return badge[1] < points;
    })[0];
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

    // axios.get('/games').then(({ data }) => {
    //   const winners = data.reduce((prev, cur) => prev.concat(cur.winner), []);
    //   const allWinners = winners.reduce((prev, cur) => {
    //     prev[cur] = prev[cur] + 1 || 1;
    //     return prev;
    //   }, {});

    //   const winnersByName = [];
    //   Object.entries(allWinners).map(winner =>
    //     axios.get('/findUserById', {
    //       params: {
    //         _id: winner[0],
    //       },
    //     }).then(({ data: user }) => {
    //       const pureWinner = winner.slice();
    //       pureWinner[2] = user.username.split('@')[0];
    //       winnersByName.push(pureWinner);
    //       this.setState({ RankingsList: winnersByName.sort((a, b) => b[1] - a[1]) });
    //     }),
    //   );
    // });
  }

  render() {
    const userRankings = this.state.userRankings.map((e, i) => (
      <li key={e.username} className="RankList">
<<<<<<< HEAD
        <ul>
          {console.log(e, 'e in Rankings')}
=======
        <p>
          {/* {console.log(e, 'e in Rankings')} */}
>>>>>>> 64128bbfcf537667c37939b705429081cf1216f8
          <b> {i + 1}. </b>
          <span> {e.username} Points: {e.points}</span>
          <span>{this.state.badges[0]}</span>
        </ul>
      </li>
    ));
    // const RankingsList = this.state.RankingsList.map((e, i) => (
    //   <li key={e[0]} className="RankList">
    //     <p>
    {/* {console.log(e, 'e in Rankings')} */}
    {/* <b> {i + 1}. </b>
          <span> {e[2]} Wins: {e[1]}</span>
        </p>
      </li> */}
    // ));
    return (
      <div className="DashBoardHalf">
        <div className="ListTitle">
          <h1> Rankings </h1>
        </div>
        <ul className="DashBoardList">
          {userRankings}
          {/* {RankingsList} */}
        </ul>
      </div>
    );
  }
}
