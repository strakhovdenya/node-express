import mongoose from 'mongoose';

import {} from 'dotenv/config'

import '../app/auth/refreshToken.model.js'
/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 *
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 * DB_STRING_PROD=<your production database string>
 */

// mongoose.Promise = Promise - видел в примере

mongoose.connection.on('connected', () => {
    console.log('Connection mongo Established')
})

mongoose.connection.on('reconnected', () => {
    console.log('Connection mongo Reestablished')
})

mongoose.connection.on('disconnected', () => {
    console.log('Connection mongo Disconnected')
})

mongoose.connection.on('close', () => {
    console.log('Connection mongo Closed')
})

mongoose.connection.on('error', (error) => {
    console.log('ERROR (mongo): ' + error)
})

const devConnection = process.env.DB_MONGO_STRING;


// Connect to the correct environment database


export const runMongo = async () => {
    await mongoose.connect(devConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        poolSize: 50,
    });
}


