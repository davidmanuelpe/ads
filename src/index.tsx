import React, { ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';

import DragNDrop from './DragNDrop';

import './index.css';

const routes = [
  {
    path: '/',
    component: DragNDrop,
  },
];


ReactDOM.render(
  <Router forceRefresh={true}>
    {/* <Header /> */}
    {/* TODO: Fazer um Header bonito */}
    <Switch>
      {routes.map((route) => (
        <Route exact path={route.path} render={() => <route.component />} key={route.path} />
      ))}
    </Switch>
  </Router>,
  document.getElementById('root')
);
