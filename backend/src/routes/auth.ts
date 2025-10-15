import { Router } from 'express';
import passport from 'passport';
import { issueJwt } from '../middlewares/auth.js';
import { config } from '../config.js';

const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: `${config.appBaseUrl}/login?error=oauth` }),
  (req, res) => {
    const user: any = (req as any).user;
    const token = issueJwt(user.id);
    // redirect back to frontend with token as URL fragment
    res.redirect(`${config.appBaseUrl}/auth/success#token=${token}`);
  }
);

// Placeholder for Apple OAuth: you will need to add passport-apple or custom OpenID Connect flow.
router.get('/apple', (_req, res) => res.status(501).json({ error: 'Apple OAuth not yet implemented' }));

export default router;
