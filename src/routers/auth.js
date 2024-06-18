import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserSchema,
  loginUserSchema,
  refreshUserSchema,
} from '../validation/auth.js';
import {
  registerUserController,
  loginUserController,
  refreshUserController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

// import { loginUserSchema } from '../validation/auth.js';
// import { loginUserController } from '../controllers/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post(
  '/refresh',
  validateBody(refreshUserSchema),
  ctrlWrapper(refreshUserController),
);

export default router;
