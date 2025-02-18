const mongoose = require("mongoose");

const connectDB = async () => {
    try {
            const cnn = await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        console.log(`MongoDB Connected: ${cnn.connection.host}`);
    } catch (error) {
        console.error(`Erorr: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
