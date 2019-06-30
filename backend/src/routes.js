import { Router } from 'express';
import { UserController, SessionController } from './app/controllers';

import {
  authMiddleware,
  validateUserCreation,
  validateUserUpdate,
  validateSession,
} from './middlewares';

const routes = new Router();

routes.post('/users', validateUserCreation, UserController.store);
routes.post('/sessions', validateSession, SessionController.store);

routes.use(authMiddleware);

routes.put('/users', validateUserUpdate, UserController.update);

export default routes;
