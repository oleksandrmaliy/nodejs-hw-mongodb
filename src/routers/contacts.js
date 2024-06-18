import { Router } from 'express';
import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  postContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkUserId } from '../middlewares/checkUserId.js';
import { ROLES } from '../constants/index.js';

const router = Router();

router.use(authenticate);

router.get('/', checkUserId(ROLES.USER), ctrlWrapper(getAllContactsController));

router.get(
  '/:contactId',
  checkUserId(ROLES.USER),
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/',
  checkUserId(ROLES.USER),
  validateBody(postContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  checkUserId(ROLES.USER),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

router.delete(
  '/:contactId',
  checkUserId(ROLES.USER),
  ctrlWrapper(deleteContactController),
);

export default router;
