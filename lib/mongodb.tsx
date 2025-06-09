import mongoose from "mongoose";

let isConnected = false;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Define MongoDB URI");
}

export const ConnectDB = async () => {
  if (isConnected) return;
  try {
    mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("MongoDb Connected Successfully");
  } catch (err) {
    throw new Error(String(err));
  }
};
