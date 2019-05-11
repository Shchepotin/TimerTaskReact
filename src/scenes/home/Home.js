import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TaskLog from '../../components/TaskLog';
import TaskChart from '../../components/TaskChart';
import TaskTimer from '../../components/TaskTimer';

// Actions
import {
  startTask,
  stopTask,
  updateCurrentTask,
} from '../../actions/task';

import styles from '../../styles';

const Home = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid
        container
        alignItems='center'
        direction='column'
        className={classes.container}
      >
        <TaskTimer />

        <AppBar
          position="static"
          className={classes.tabs}
        >
          <Tabs
            className={classes.tabsItems}
            variant="fullWidth"
            value={props.location.pathname === '/' ? 0 : 1}
          >
            <Tab
              component={Link}
              to={'/'}
              label="Tasks log"
            />
            <Tab
              component={Link}
              to={'/chart'}
              label="Tasks chart"
            />
          </Tabs>
        </AppBar>

        <Route
          path={`/`}
          exact
          component={TaskLog}
        />
        <Route
          path={`/chart`}
          exact
          component={TaskChart}
        />
      </Grid>
    </div>
  );
};

Home.propTypes = {
  currentTask: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    start: PropTypes.any,
    stop: PropTypes.any,
  }),
  startTask: PropTypes.func.isRequired,
  stopTask: PropTypes.func.isRequired,
  updateCurrentTask: PropTypes.func.isRequired,
};

export default connect(
  ({ task }) => ({
    currentTask: task.currentItem,
  }), {
    startTask,
    stopTask,
    updateCurrentTask,
  })(withStyles(styles)(Home));
