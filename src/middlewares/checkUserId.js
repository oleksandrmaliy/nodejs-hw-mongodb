import createHttpError from 'http-errors';

import { ContactsCollection } from '../db/models/contacts.js';
import { ROLES } from '../constants/index.js';

export const checkUserId =
  (...roles) =>
  async (req, res, next) => {
    const { user } = req;
    // console.log(req.user._id);
    if (!user) {
      next(createHttpError(404));
      return;
    }

    const { role } = user;
    // if (roles.includes(ROLES.USER) && role === ROLES.USER) {
    //   next();
    //   return;
    // }

    if (roles.includes(ROLES.USER) && role === ROLES.USER) {
      const { contactId } = req.params;
      if (!contactId) {
        next(createHttpError(403));
        return;
      }

      const contact = await ContactsCollection.findOne({
        _id: contactId,
        userId: user._id,
      });

      if (contact) {
        next();
        return;
      }
    }

    next(createHttpError(403));
  };
