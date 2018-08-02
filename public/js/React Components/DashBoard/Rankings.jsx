import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

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
        <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{user.username}</h5>
            <small className="text-muted">{i + 1}</small>
          </div>
          <p className="mb-1">{this.getBadge(user.points)}</p>
          <small className="text-muted">{user.points} points</small>
        </a>
      </div>
    ));


    //   <Card key={user.username} className="RankList">
    //     <b> {i + 1}. </b>
    //     <CardHeader
    //       title={user.username}
    //     />
    //     <CardTitle title={this.getBadge(user.points)} subtitle={user.points} />
    //   </Card>
    // ));

      // <li key={e.username} className="RankList">
      //   <ul>
      //     {/* {console.log(e, 'e in Rankings')} */}
      //     <b> {i + 1}. </b>
          
      //     <span> {e.username} Points: {e.points}</span>
          
      //   </ul>
      //   <ul><span>Current Badge:{this.getBadge(e.points)}</span></ul>
      // </li>
    // ));

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
