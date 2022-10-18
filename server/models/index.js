const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URL);

mongoose.connection.on("connected", () => {
    console.log("Established Mongoose Default Connection");
});

mongoose.connection.on("error", (err) => {
    console.log("Mongoose Default Connection Error : " + err);
});
