import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  // void -> I don't take care what type of data is returning
  
  if (connection.isConnected) { //is already connected
    console.log("Already Connected to DB");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || '');

    connection.isConnected = db.connections[0].readyState;

    console.log("DB Connected Successfully");
    
  } catch (error) {
    console.log("Database connection failed",error);
    
    process.exit(1)
  }
}

export default dbConnect;
