import mongoose from "mongoose";

export const connectionDB = async () => {
  try {
    const DB = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `MongoDB is connected. Name ${DB.connection.name}. Port ${DB.connection.port}`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
