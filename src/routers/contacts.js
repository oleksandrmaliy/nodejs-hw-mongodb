import { Router } from 'express';
import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
} from '../controllers/contacts.js';

const router = Router();

const ctrlWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

router.post('/contacts', ctrlWrapper(createContactController));

export default router;
