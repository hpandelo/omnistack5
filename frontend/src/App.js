import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from './pages/Login';
import Timeline from './pages/Timeline';
import Routes from './Routes';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={ Routes.LOGIN } exact component={Login} />
        <Route path={ Routes.TIMELINE } component={Timeline} />
        {
        /*  Example Using Array: 
            <Route path={["/users/:id", "/profile/:id"]} component={User} /> 
        */}
      </Switch>
    </BrowserRouter>
  );
}
