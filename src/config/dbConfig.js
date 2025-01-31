import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();  // Cargar las variables de entorno

const connectDB = async () => {
  try {
    // Conectar a la base de datos sin las opciones obsoletas
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🟢 Conectado a MongoDB');
  } catch (error) {
    console.error('🔴 Error conectando a MongoDB:', error.message);
    process.exit(1);  // Salir si no se pudo conectar
  }
};

export default connectDB;
