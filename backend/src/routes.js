import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import {
  FileController,
  MeetupController,
  UserController,
  ScheduleController,
  SessionController,
  SubscriptionController,
} from './app/controllers';

import {
  authMiddleware,
  validateMeetupCreation,
  validateMeetupUpdate,
  validateUserCreation,
  validateUserUpdate,
  validateSession,
} from './middlewares';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', validateUserCreation, UserController.store);
routes.post('/sessions', validateSession, SessionController.store);

routes.use(authMiddleware);

routes.put('/users', validateUserUpdate, UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/meetups', validateMeetupCreation, MeetupController.store);
routes.get('/meetups', MeetupController.index);
routes.get('/meetups/:meetupId', MeetupController.find);
routes.put('/meetups/:meetupId', validateMeetupUpdate, MeetupController.update);
routes.delete('/meetups/:meetupId', MeetupController.delete);

routes.get('/schedule', ScheduleController.index);

routes.post('/subscriptions/:meetupId', SubscriptionController.store);
routes.delete('/subscriptions/:subscriptionId', SubscriptionController.delete);
routes.get('/subscriptions', SubscriptionController.index);

export default routes;
