import React from 'react';
import { AppBar, Card, MuiThemeProvider, RaisedButton } from 'material-ui';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Badges from './Badges';
import Rankings from './Rankings';
import CompetitionSelect from '../Competition/CompetitionSelect';
import Chat from '../Competition/chat';
import GifChat from '../Competition/GifChat';

const DashBoard = props => (
  <MuiThemeProvider >
    <div className="Dashboard">
      <AppBar showMenuIconButton={false} title="Dashboard" style={{ backgroundColor: '#4FB5DB' }} />
      <Card>
        <div>
          <CompetitionSelect />
          <Link to="CreateCompetition">
            <RaisedButton fullWidth label="Create A Challenge" />
          </Link>
          <div className="container">
            <div className="row">
              <div className="col-4"><Chat user={props.user} /></div>
              <div className="col-8"><GifChat user={props.user} /></div>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>Welcome {props.user.slice(0, props.user.indexOf('@'))}!</div>
          <div className="DashBoardFlex">
            <Badges />
            <Rankings />
          </div>
        </div>
      </Card>

    </div>
  </MuiThemeProvider >
);

DashBoard.propTypes = {
  user: PropTypes.string.isRequired,
};
export default DashBoard;
