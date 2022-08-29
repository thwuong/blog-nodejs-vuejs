const mongoose = require("mongoose");
module.exports = async () => {
  try {
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("connect db successfully!");
  } catch (error) {
    console.log("connect db failure!");
  }
};
