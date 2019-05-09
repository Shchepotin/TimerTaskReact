import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

import Home from './scenes/home/Home';
import Task from './scenes/task/Task';
import NotFound from './scenes/NotFound';

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/chart" exact component={Home} />
        <Route path="/tasks/:id" exact component={Task} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
