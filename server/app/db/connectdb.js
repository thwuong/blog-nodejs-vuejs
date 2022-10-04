const mongoose = require("mongoose");
module.exports = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://bong123:${process.env.PASSWORD}@cluster0.scxbxju.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("connect db successfully!");
  } catch (error) {
    console.log("connect db failure!");
  }
};
