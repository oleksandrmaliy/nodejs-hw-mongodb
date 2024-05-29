import { mongoose } from 'mongoose';
import { env } from '../utils/env.js';

export const initMongoConnection = async () => {
  try {
    const user = env('MONGODB_USER');
    const pwd = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=ClasterOVM`,
    );
    console.log('Mongo connection successfully established!');
  } catch (err) {
    console.log('Error while setting up Mongo connection', err);
    throw err;
  }
  //   res.json({
  //     message: 'Mongo connection successfully established!',
  //   });
  // err, req, res, next
};
