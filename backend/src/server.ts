import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { config } from './config.js';
import './strategies.js';
import authRouter from './routes/auth.js';
import postcardsRouter from './routes/postcards.js';

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(cors({
  origin: [config.appBaseUrl],
  credentials: true,
}));

app.get('/health', (_req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// sessions only used for OAuth handshakes
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, sameSite: 'lax' },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/api/postcards', postcardsRouter);

app.use((_req, res) => res.status(404).json({ error: 'Not Found' }));

const server = app.listen(config.port, () => {
  console.log(`API running on ${config.port}`);
});

process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});
