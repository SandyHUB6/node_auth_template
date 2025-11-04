const mongoose = require("mongoose");

const dbConnect = async () => {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);

    console.log(`DATABASE CONNECTED ::${connect.connection.host}::${connect.connection.name}`);
}

module.exports = dbConnect;