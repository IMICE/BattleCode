import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

class SolutionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <Card className="Card">
        
        {/* <CardMedia
      overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
    >
      <img src="images/nature-600-337.jpg" alt="" />
    </CardMedia> */}
        {/* <CardTitle title="Card title" subtitle="Card subtitle" /> */}
        <CardText> 
        
        <div><b>User: </b>{this.props.solution.username}</div>
        <div><b>Solution: </b>{this.props.solution.solution}</div>
        
        </CardText>
        {/* <CardActions>
      <FlatButton label="Action1" />
      <FlatButton label="Action2" />
    </CardActions> */}
      </Card>
    );
  }
}

export default SolutionsList;
