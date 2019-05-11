import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DateTime, Interval } from 'luxon';
import { useDebouncedCallback } from 'use-debounce';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

// Actions
import {
  startTask,
  stopTask,
  updateCurrentTask,
} from '../actions/task';

import styles from '../styles';

const TaskTimer = (props) => {
  const { classes } = props;
  const [taskName, setTaskName] = useState('');
  const [timer, setTimer] = useState('00:00:00');
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    const clock = () => {
      setTimer(Interval
        .fromDateTimes(DateTime.fromISO(props.currentTask.start), DateTime.local())
        .toDuration()
        .toFormat('hh:mm:ss'));
    };

    // Run timer immediately.
    if (props.currentTask.start) {
      clock();
    }

    const timer = setInterval(() => {
      if (props.currentTask.start) {
        clock();
      } else {
        setTimer('00:00:00');
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [props.currentTask.start]);

  const [taskNameDebounceCallback] = useDebouncedCallback((value) => {
    props.updateCurrentTask({
      name: value,
    });
  }, 300);

  useEffect(() => {
    // Restore task name
    setTaskName(props.currentTask.name);
  }, [props.currentTask.start]);

  const startTask = () => {
    props.startTask({
      ...props.currentTask,
      start: DateTime.local().toISO(),
      stop: null,
    });
  };

  const stopTask = () => {
    if (taskName.trim() !== '') {
      props.stopTask({
        ...props.currentTask,
        stop: DateTime.local().toISO(),
      });
    } else {
      setWarning(true);
    }
  };

  return (
    <div className={classes.root}>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={warning}
        onClose={() => {
          setWarning(false);
        }}
      >
        <div className={classes.modal}>
          <Grid
            container
            className={classes.modalContent}
          >
            <Typography
              variant="h6"
              color='error'
              id="modal-title"
            >
              Empty task name
            </Typography>
            <Typography
              variant="subtitle1"
              id="simple-modal-description"
            >
              You are trying close your task without name, enter the title and try again!
            </Typography>
          </Grid>

          <Button
            className={classes.modalClose}
            onClick={() => {
              setWarning(false);
            }}
          >
            Close
          </Button>
        </div>
      </Modal>

      <TextField
        id="standard-name"
        label="Name of your task"
        className={classes.textField}
        value={taskName}
        onChange={(e) => {
          setTaskName(e.target.value);
          taskNameDebounceCallback(e.target.value);
        }}
        margin="normal"
      />

      <Fab className={classes.timer}>
        { timer }
      </Fab>

      { !props.currentTask.start ?
        <Button
          variant="contained"
          onClick={startTask}
          className={classes.actionTimer}
        >
          Start
        </Button>
        :
        <Button
          variant="contained"
          onClick={stopTask}
          className={classes.actionTimer}
        >
          Stop
        </Button>
      }
    </div>
  );
};

TaskTimer.propTypes = {
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
  })(withStyles(styles)(TaskTimer));
