import chalk from "chalk";
import mongoose from "mongoose";

mongoose.set("strictQuery", true);

/**
 * Connects to the MongoDB database.
 * @param {String} mongoUri
 */
export async function dbConnect(mongoUri) {
  try {
    await mongoose.connect(mongoUri);
  } catch (err) {
    console.error(err);
  }
  console.log(chalk.green("Connected to MongoDB!"));
}
