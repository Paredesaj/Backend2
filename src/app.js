import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import connectDB from './config/dbConfig.js';
import productRouter from './routes/products.router.js';
 // Asegúrate de que esta ruta sea correcta
import cartRouter from './routes/carts.router.js';  // Asegúrate de que esta línea esté incluida
import sessionsRouter from './routes/sessions.router.js'; // Asegúrate de que esta línea esté incluida

// Configuración de entorno y conexión a la base de datos
dotenv.config();
connectDB();

const app = express();

// Middleware global
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configuración de sesiones persistentes con MongoDB
app.use(session({
  secret: process.env.SESSION_SECRET || 'mySecret', 
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 14 * 24 * 60 * 60, // 14 días de expiración de sesión
  }),
  cookie: {
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14 días de duración del cookie
    httpOnly: true,
  },
}));

// Integración de Passport (JWT)
app.use(passport.initialize());
app.use(passport.session());

// Rutas de la API
app.use('/api/sessions', sessionsRouter);  // Ruta para la gestión de sesiones
app.use('/api/products', productRouter);   // Ruta para productos
app.use('/api/carts', cartRouter);         // Ruta para carritos

// Arrancar el servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
