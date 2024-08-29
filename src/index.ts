import 'reflect-metadata';
import path from 'node:path';
import express from 'express';
import { useContainer, useExpressServer } from 'routing-controllers';
import session from 'express-session';
import bodyParser from 'body-parser';
import { Container } from 'typedi';
import passport from 'passport';

import configs from './configs';

import { authorizationChecker, currentUserChecker } from './controllers/helpers/CurrentLogin';
// import './passport-authens/Passport';
// import { jwtAuthen } from './passport-authens/JwtAuthen';

import ProductController from './controllers/product.controller';
import UserController from './controllers/user.controller';
import AdminAuthController from './admin/controllers/auth.controller';
import SystemAuthController from './system/controllers/auth.controller';

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
    adminUser: { [key: string]: any };
    systemUser: { [key: string]: any };
  }
}

const SERVER_PORT = configs.SERVER_PORT;

useContainer(Container);

const app = express();
app.use(express.static(path.join(__dirname, 'static')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up session middleware
app.use(session({
  secret: 'your-secret-key', // Replace with a strong secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 3600000 } // Set to true if using HTTPS
}));

// Set up routing-controllers
useExpressServer(app, {
  defaultErrorHandler: false,
  currentUserChecker,
  authorizationChecker,
  controllers: [
    UserController, ProductController,
    AdminAuthController,
    SystemAuthController
  ],
  middlewares: [__dirname + '/middlewares/*.ts']
});

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
// app.use(jwtAuthen);

// Start the server
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});

process.on('unhandledRejection', (err: any) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  // app.close(() => {
  //   process.exit(1);
  // });
});
