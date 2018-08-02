import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import SolutionsList from './SolutionsList';
class Solutions extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <Card>
        <CardHeader
          title= "Solutions"
        // subtitle="Subtitle"
        // avatar="images/jsa-128.jpg"
        />
        {/* <CardMedia
      overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
    >
      <img src="images/nature-600-337.jpg" alt="" />
    </CardMedia> */}
        {/* <CardTitle title="Card title" subtitle="Card subtitle" /> */}
        <CardText> 
          Solution Time:{this.props.time} Points: {this.props.points}
          
          {this.props.solutions.map(solution => <SolutionsList solution={solution} key={solution._id} />)}
        </CardText>
        {/* <CardActions>
      <FlatButton label="Action1" />
      <FlatButton label="Action2" />
    </CardActions> */}
      </Card>
    );
  }
}

export default Solutions;