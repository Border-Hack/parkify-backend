// config/database.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = async() => {
  try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true
		});
	       console.info("Mongo is now connected to", process.env.MONGO_URI);
	} catch (error) {
		 console.error(error);
		process.exit(1);
	}
}

module.exports = connectDB;
