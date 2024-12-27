require('dotenv').config();
const mongoose = require('mongoose');

//check connection of db
var dbState = [{
    value: 0,
    label: "Disconnected"
},
{
    value: 1,
    label: "Connected"
},
{
    value: 2,
    label: "Connecting"
},
{
    value: 3,
    label: "Disconnecting"
}];


const connection = async () => {
    try {
        const option = {
            dbName: process.env.DB_NAME
        }
        await mongoose.connect(process.env.DB_HOST, option);
        const state = Number(mongoose.connection.readyState);
        console.log(dbState.find(f => f.value === state).label, "to database"); // connected to db
    } catch (error) {
        console.log('DB connection error: ', error);
    }
}

module.exports = connection;