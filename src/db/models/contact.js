import { model, Schema } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      required: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: false,
      default: 'personal',
    },
  },
  {
    timestamps: false,
    versionKey: false,
  },
);

export const ContactCollection = model('contact', contactSchema);
