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
      <div className="container">
        <div className="row">
          <div className="col-12">
            
      <Card className = "Card">
        <CardText> 
        
          <div><b>Good work solving all the tests </b></div>
          <div><b>Time: {this.props.time}s Points: {this.props.points}</b></div>
          <div>Here are some previous solutions</div>
          <div>
          
          {this.props.solutions.map(solution => <SolutionsList solution={solution} key={solution._id} />)}
          
          </div>
        </CardText>
        {/* <CardActions>
      <FlatButton label="Action1" />
      <FlatButton label="Action2" />
    </CardActions> */}
      </Card>
      </div>
      </div>
      </div>
      
    );
  }
}

export default Solutions;