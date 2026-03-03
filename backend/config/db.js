import mongoose from 'mongoose';

let connectPromise = null;

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (connectPromise) {
        return connectPromise;
    }

    connectPromise = mongoose
        .connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
        })
        .then((conn) => {
            console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
            return conn.connection;
        })
        .catch((error) => {
            connectPromise = null;
            throw error;
        });

    return connectPromise;
};

export default connectDB;
