import mongoose from "mongoose";

const connectDB = async (USERNAME, PASSWORD) => {
  const url = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.sotedmd.mongodb.net/?retryWrites=true&w=majority`;
  try {
    const DB_OPTIONS = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      DbName: "mini-project",
    };
    await mongoose.connect(url, DB_OPTIONS);
    console.log("Database connected successfully");
  } catch (e) {
    console.log(e.message);
  }
};

export default connectDB;
