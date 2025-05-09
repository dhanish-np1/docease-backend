import mongoose from 'mongoose';
import { config } from '../../config/config';


const uri = config.database.uri;

export async function connectToDatabase() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}

export default mongoose;