import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import styles from '../styles';

// Actions
import { generateRandomTasks } from '../actions/task'

import splitTasksByTime from '../utils/splitTasksByTime';

const TaskChart = ({ classes, tasks, generateRandomTasks }) => {
  const data = useMemo(() => splitTasksByTime(tasks), [tasks]);

  return (
    <div className={classes.subRoot}>
      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart
          height={300}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            name='Minutes in this hours'
            dataKey="value"
            fill="#3248c7"
          />
        </BarChart>
      </ResponsiveContainer>

      <div className={classes.buttonContainerCenter}>
        <Button
          variant="contained"
          className={classes.actionButton}
          onClick={() => {
            generateRandomTasks();
          }}
        >
          Generate
        </Button>
      </div>
    </div>
  );
};

TaskChart.propTypes = {
  tasks: PropTypes.array.isRequired,
  generateRandomTasks: PropTypes.func.isRequired,
};

export default connect(
  ({ task }) => ({
    tasks: task.items,
  }), {
    generateRandomTasks,
  })(withStyles(styles)(TaskChart));
