import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Dashboard from '~/pages/Dashboard';
import Meetup from '~/pages/Meetup';
import MeetupDetail from '~/pages/MeetupDetail';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Profile from '~/pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/meetup/:id?" component={Meetup} isPrivate />
      <Route path="/meetup-detail/:id" component={MeetupDetail} isPrivate />
    </Switch>
  );
}
