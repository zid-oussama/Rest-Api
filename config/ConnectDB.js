require('dotenv').config({ path: './config/.env' })
const mongoose = require("mongoose");
const conectdb = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, });
        console.log('Connected To DB');
    } catch (err) {
        console.log(err);
    }
};
module.exports = conectdb;