

import { Router } from 'express';

import { URLController } from '../app/Controllers';

const auth: Router = Router();

auth.post('/createurl', URLController.createUrl);
export default auth;