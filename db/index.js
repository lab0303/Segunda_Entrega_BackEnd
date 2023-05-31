const mongoose = require("mongoose");

const mongoConnect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pqdbvwm.mongodb.net/coderhouse?retryWrites=true&w=majority`
    );
    console.log("db is connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoConnect;
