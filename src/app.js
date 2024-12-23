import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from './middleware/authMiddleware.js';
import sessionsRouter from './routes/sessions.router.js';
import connectDB from './config/dbConfig.js';

const app = express();

// Middleware global
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configuración de sesiones persistentes con MongoDB
app.use(session({
  secret: process.env.SESSION_SECRET || 'mySecret',  // Clave secreta para las sesiones
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,  // URI de la base de datos
    ttl: 14 * 24 * 60 * 60,  // 14 días de persistencia
  }),
  cookie: {
    maxAge: 14 * 24 * 60 * 60 * 1000, // Expiración de la cookie: 14 días
    httpOnly: true,  // Seguridad adicional para las cookies
  },
}));

// Integración de Passport (JWT)
app.use(passport.initialize());
app.use(passport.session()); // Usamos la sesión de Passport con express-session

// Rutas
app.use('/api/sessions', sessionsRouter);  // Rutas para la gestión de sesiones (registro, login, etc.)

// Conectar a la base de datos y arrancar el servidor
connectDB();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
