import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno

// Configuración de la estrategia JWT de Passport
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Usa el formato Bearer Token
  secretOrKey: process.env.JWT_SECRET, // Asegura que se esté usando la clave secreta
  algorithms: ['HS256'], // Algoritmo de firma
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      // Aquí puedes buscar el usuario en la base de datos con jwt_payload.id
      return done(null, jwt_payload); // Devuelve el payload si la autenticación es exitosa
    } catch (error) {
      return done(error, false);
    }
  })
);

// Middleware para autenticación usando Passport (JWT)
export const authenticate = passport.authenticate('jwt', { session: false });

// Middleware para verificar el rol de usuario
export const roleMiddleware = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

// Middleware de autenticación usando JWT directamente (sin Passport)
export const jwtAuthenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });
    req.user = decoded;
    next();
  });
};

export default passport;
