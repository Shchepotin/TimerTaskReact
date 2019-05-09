import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DateTime, Interval } from 'luxon';
import { Link } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

// Actions
import {
  destroyTask
} from '../actions/task';

import styles from '../styles';

const TaskLog = (props) => {
  const { classes } = props;

  return (
    <Grid container className={classes.contentWrapper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Task</TableCell>
            <TableCell>Time start</TableCell>
            <TableCell>Time end</TableCell>
            <TableCell>Time spend</TableCell>
            <TableCell>Info</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tasks.map(row => (
            <TableRow
              key={row.id}
              className={classes.cellTable}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>
                {row.name}
              </TableCell>
              <TableCell>
                {DateTime.fromISO(row.start).toFormat('HH:mm:ss')}
              </TableCell>
              <TableCell>
                {DateTime.fromISO(row.stop).toFormat('HH:mm:ss')}
              </TableCell>
              <TableCell>
                {
                  Interval
                    .fromDateTimes(DateTime.fromISO(row.start), DateTime.fromISO(row.stop))
                    .toDuration()
                    .toFormat('hh:mm:ss')
                }
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  className={classes.button}
                  component={Link}
                  to={`/tasks/${row.id}`}
                >
                  Info
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={() => {
                    props.destroyTask({
                      id: row.id,
                    });
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Grid>
  );
};

TaskLog.propTypes = {
  tasks: PropTypes.array.isRequired,
  destroyTask: PropTypes.func.isRequired,
};

export default connect(
  ({ task }) => ({
    tasks: task.items,
  }), {
    destroyTask,
  })(withStyles(styles)(TaskLog));
