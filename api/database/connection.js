import mongoose from 'mongoose';

const connectDB = async () => {
    try {       
        await mongoose.connect(process.env.MONGODB_URI);       
    } catch (error) {
        console.error("Error de conexión a la base de datos:", error);
    }
};

export default connectDB;

