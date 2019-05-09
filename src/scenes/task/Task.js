import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DateTime, Interval } from 'luxon';
import { Redirect } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Actions
import {
  requestTask,
} from '../../actions/task';

import styles from '../../styles';

const Task = (props) => {
  const { classes } = props;

  if (props.isError) {
    return <Redirect to={'/404'} />;
  }

  useEffect(() => {
    // Load task
    props.requestTask({
      id: props.match.params.id,
    });
  }, [props.match.params.id]);

  return (
    <div className={classes.root}>
      <Grid container alignItems='center' direction='column' className={classes.container}>

        <Card className={classes.card}>
          <CardContent>
            <Typography
              variant="h4"
              component="h2"
            >
              { props.task.name }
            </Typography>
            <Typography
              className={classes.pos}
              color="textSecondary"
            >
              Start
            </Typography>
            <Typography component="p">
              { DateTime.fromISO(props.task.start).toFormat('yyyy-MM-dd HH:mm:ss')}
            </Typography>
            <Typography
              className={classes.pos}
              color="textSecondary"
            >
              End
            </Typography>
            <Typography component="p">
              { DateTime.fromISO(props.task.stop).toFormat('yyyy-MM-dd HH:mm:ss')}
            </Typography>
            <Typography
              className={classes.pos}
              color="textSecondary"
            >
              Time spend
            </Typography>
            <Typography component="p">
              {
                Interval
                  .fromDateTimes(DateTime.fromISO(props.task.start), DateTime.fromISO(props.task.stop))
                  .toDuration()
                  .toFormat('hh:mm:ss')
              }
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => {
                props.history.goBack();
              }}
            >
              Back
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    start: PropTypes.any,
    stop: PropTypes.any,
  }),
  requestTask: PropTypes.func.isRequired,
};

export default connect(
  ({ task }) => ({
    task: task.item,
    isError: task.isError,
  }), {
    requestTask,
  })(withStyles(styles)(Task));
