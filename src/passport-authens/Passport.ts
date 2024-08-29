// src/passport.ts
import * as passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { publicKey } from '../controllers/helpers/CurrentLogin';

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: publicKey,
  algorithms: ['RS256']
}, async (payload: any, done: Function) => {
  try {
    // const userRepository = getRepository(User);
    // const user = await userRepository.findOne(payload.id);
    if (payload.id) {
      return done(null, payload);
    }
    return done(null, false);
  } catch (err) {
    return done(err, false);
  }
}));

passport.serializeUser((user: any, done: Function) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done: Function) => {
  try {
    // const userRepository = getRepository(User);
    // const user = await userRepository.findOne(id);
    done(null, {id});
  } catch (err) {
    done(err, null);
  }
});
