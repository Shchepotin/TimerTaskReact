import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DateTime, Interval } from 'luxon';
import { Link } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

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

const TaskLog = ({ classes, destroyTask, tasks }) => {
  const [deleteConfirmationDialog, setDeleteConfirmationDialog] = useState(false);
  const [itemForDelete, setItemForDelete] = useState({});

  const closeDeleteDialog = () => {
    setDeleteConfirmationDialog(false);
  };

  const openDeleteDialog = (item) => {
    setItemForDelete(item);
    setDeleteConfirmationDialog(true);
  };

  const deleteItem = () => {
    destroyTask({
      id: itemForDelete.id,
    });

    closeDeleteDialog();
  };

  return (
    <Grid container className={classes.contentWrapper}>
      <Dialog
        open={deleteConfirmationDialog}
        onClose={closeDeleteDialog}
      >
        <DialogTitle>
          Are you sure you want to delete this task?
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={closeDeleteDialog}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={deleteItem}
            color="secondary"
          >
            delete
          </Button>
        </DialogActions>
      </Dialog>

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
          {tasks.map(row => (
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
                  onClick={() => openDeleteDialog(row)}
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
