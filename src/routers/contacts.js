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

const router = Router();

router.get('/', ctrlWrapper(getAllContactsController));

router.get('/:contactId', ctrlWrapper(getContactByIdController));

router.post(
  '/',
  validateBody(postContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;
