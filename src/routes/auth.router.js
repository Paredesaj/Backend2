import express from 'express';
import passport from '../middleware/googleStrategy.js';

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/dashboard'); // Redirige después de la autenticación
});

export default router;
