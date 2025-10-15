import 'dotenv/config';

export const config = {
  port: Number(process.env.PORT || 8080),
  appBaseUrl: process.env.APP_BASE_URL || 'http://localhost:3000',
  apiBaseUrl: process.env.API_BASE_URL || `http://localhost:${process.env.PORT || 8080}`,
  sessionSecret: process.env.SESSION_SECRET || 'change-me',
  jwtSecret: process.env.JWT_SECRET || 'change-me-too',
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || '',
  },
};
