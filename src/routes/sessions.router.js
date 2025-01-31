import express from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import User from '../dao/models/userModel.js';
  // Asegúrate de tener tu modelo User
import { generateToken } from '../utils/jwt.js';  // Función para generar el JWT
import { roleMiddleware } from '../middleware/roleMiddleware.js';  // Middleware de autorización

const router = express.Router();

// Función para encontrar un usuario por su email
const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

// Función para crear un nuevo usuario
const createUser = async ({ first_name, last_name, email, age, password }) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = new User({
    first_name,
    last_name,
    email,
    age,
    password: hashedPassword,
    role: 'user',  // Valor predeterminado
  });

  await user.save();
  return user;
};

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = await createUser({ first_name, last_name, email, age, password });
    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);  // Asegúrate de tener la función de generar el token
    res.cookie('jwt', token, { httpOnly: true });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

// Ruta protegida: Solo accesible para admin
router.get('/admin', passport.authenticate('jwt', { session: false }), roleMiddleware(['admin']), (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});

// Obtener usuario actual
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ user: req.user });
});

export default router;
