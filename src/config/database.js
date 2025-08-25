const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://surajdev:1dfwjWFHNxNIgz2M@namastenode.nvsdwgv.mongodb.net/devTinder");
}

module.exports = connectDB;