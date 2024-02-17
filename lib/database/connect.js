import mongoose from 'mongoose';

const MONGODB_URL = 'mongodb+srv://khalidkhankakar2468:dzcyyTPVviK7znBT@cluster0.gessk0s.mongodb.net/?retryWrites=true&w=majority'

let cached = (global).mongoose

if(!cached) {
  cached = (global).mongoose = { 
    conn: null, promise: null 
  }
}

export const connectToDatabase = async () => {
  if(cached.conn) return cached.conn;

  if(!MONGODB_URL) throw new Error('Missing MONGODB_URL');
console.log(MONGODB_URL);
  cached.promise = 
    cached.promise || 
    mongoose.connect(MONGODB_URL, { 
      dbName: 'imaginary', bufferCommands: false 
    })

  cached.conn = await cached.promise;

  return cached.conn;
}