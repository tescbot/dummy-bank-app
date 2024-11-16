import chalk from "chalk";
import mongoose from "mongoose";

mongoose.set("strictQuery", true);

/**
 * Connects to the MongoDB database.
 * @param {String} mongoUri
 */
export async function dbConnect(mongoUri) {
  await mongoose.connect(mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log(chalk.green("Connected to MongoDB!"));
}
