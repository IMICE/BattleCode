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
      <Card>
        <CardHeader
          title={this.props.solution.username}
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
          {this.props.solution.solution}
        </CardText>
        {/* <CardActions>
      <FlatButton label="Action1" />
      <FlatButton label="Action2" />
    </CardActions> */}
      </Card>
    );
  }
}

// SolutionsList.propTypes = {
//   mode: PropTypes.string.isRequired,
//   theme: PropTypes.string.isRequired,
// };

export default SolutionsList;
