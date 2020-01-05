import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/Login';

import Students from '~/pages/Students';
import StudentForm from '~/pages/Students/Form';
import Subscriptions from '~/pages/Subscriptions';
import SubscriptionForm from '~/pages/Subscriptions/Form';
import Enrollments from '~/pages/Enrollments';
import EnrollmentForm from '~/pages/Enrollments/Form';
import HelpRequests from '~/pages/HelpRequests';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/add" component={StudentForm} isPrivate />
      <Route path="/students/:id" component={StudentForm} isPrivate />

      <Route path="/subscriptions" exact component={Subscriptions} isPrivate />
      <Route path="/subscriptions/add" component={SubscriptionForm} isPrivate />
      <Route path="/subscriptions/:id" component={SubscriptionForm} isPrivate />

      <Route path="/enrollments" exact component={Enrollments} isPrivate />
      <Route path="/enrollments/add" component={EnrollmentForm} isPrivate />
      <Route path="/enrollments/:id" component={EnrollmentForm} isPrivate />

      <Route path="/requests" component={HelpRequests} isPrivate />
    </Switch>
  );
}
