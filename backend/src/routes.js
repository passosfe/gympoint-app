import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import UserController from './app/controllers/UserController';
import SubscriptionController from './app/controllers/SubscriptionController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';

import authMiddleware from './app/middlewares/auth';
import studentAuthMiddleware from './app/middlewares/studentAuth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.get(
  '/students/:id/checkins',
  studentAuthMiddleware,
  CheckinController.index
);
routes.post(
  '/students/:id/checkins',
  studentAuthMiddleware,
  CheckinController.store
);

routes.get(
  '/students/:id/help-orders',
  studentAuthMiddleware,
  HelpOrderController.indexByUser
);
routes.post(
  '/students/:id/help-orders',
  studentAuthMiddleware,
  HelpOrderController.storeQuestion
);

routes.use(authMiddleware);

routes.get('/enrollments', EnrollmentController.index);
routes.get('/enrollments/:id', EnrollmentController.get);
routes.post('/enrollments', EnrollmentController.store);
routes.put('/enrollments/:id', EnrollmentController.update);
routes.delete('/enrollments/:id', EnrollmentController.delete);

routes.get('/help-orders', HelpOrderController.indexUnanswered);
routes.post('/help-orders/:id/answer', HelpOrderController.storeAnswer);

routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.get);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

routes.get('/subscriptions', SubscriptionController.index);
routes.get('/subscriptions/:id', SubscriptionController.get);
routes.post('/subscriptions', SubscriptionController.store);
routes.put('/subscriptions/:id', SubscriptionController.update);
routes.delete('/subscriptions/:id', SubscriptionController.delete);

routes.put('/users', UserController.update);

export default routes;
