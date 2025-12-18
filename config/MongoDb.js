import mongoose from "mongoose";

const connectDatabse = async () => {
  try {
    if (!process.env.MONGO_URL) {
      console.error("Error: MONGO_URL is not defined in environment variables");
      process.exit(1);
    }
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`MongoDB Connection Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDatabse;
