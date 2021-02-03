const mongoose = require('mongoose');
require('dotenv').config()

function makeNewConnection(uri) {
    const db = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    db.on('error', function (error) {
        console.log(`MongoDB :: connection ${this.name} ${JSON.stringify(error)}`);
        db.close().catch(() => console.log(`MongoDB :: failed to close connection ${this.name}`));
    });

    db.on('connected', function () {
        console.log(`MongoDB :: connected ${this.name}`);
    });

    db.on('disconnected', function () {
        console.log(`MongoDB :: disconnected ${this.name}`);
    });

    return db;
}

const URL1 = `mongodb+srv://${process.env.adminUsername}:${process.env.adminPassword}@cluster1.qtgqg.mongodb.net/Users?retryWrites=true&w=majority`;
const URL2 = `mongodb+srv://${process.env.adminUsername}:${process.env.adminPassword}@cluster1.qtgqg.mongodb.net/Clientele?retryWrites=true&w=majority`;

const userConnection = makeNewConnection(URL1);
const clientConnection = makeNewConnection(URL2);

module.exports = {
    userConnection,
    clientConnection,
};
