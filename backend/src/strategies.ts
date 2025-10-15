import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { PrismaClient } from '@prisma/client';
import { config } from './config.js';

const prisma = new PrismaClient();

passport.serializeUser((user: any, done) => done(null, user.id));
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (e) {
    done(e);
  }
});

if (config.google.clientID && config.google.clientSecret) {
  passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL,
  }, async (_accessToken, _refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0]?.value;
      if (!email) return done(new Error('Google account has no email'));
      const user = await prisma.user.upsert({
        where: { providerId: profile.id },
        create: {
          email,
          name: profile.displayName || '',
          image: profile.photos?.[0]?.value,
          provider: 'google',
          providerId: profile.id,
        },
        update: {
          email,
          name: profile.displayName || '',
          image: profile.photos?.[0]?.value,
        },
      });
      return done(null, user);
    } catch (e) {
      return done(e as any);
    }
  }));
}
