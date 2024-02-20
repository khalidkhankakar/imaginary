import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGO_DB_URI

let cached = (global).mongoose

if(!cached) {
  cached = (global).mongoose = { 
    conn: null, promise: null 
  }
}

export const connectToDatabase = async () => {
  if(cached.conn) return cached.conn;

  if(!MONGODB_URL) throw new Error('Missing MONGODB_URL');
  cached.promise = 
    cached.promise || 
    mongoose.connect(MONGODB_URL, { 
      dbName: 'imaginary', bufferCommands: false 
    })

  cached.conn = await cached.promise;
  return cached.conn;
}
