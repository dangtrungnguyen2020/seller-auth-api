import { Controller, Post, Get, Req, Res, Body, UnauthorizedError, UseBefore, SessionParam } from 'routing-controllers';
import { Request, Response } from 'express';
// import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { DestroySession } from '../middlewares/DestroySession';
import { privateKey } from './helpers/CurrentLogin';
import { Service } from 'typedi';

@Service()
@Controller('/user')
export default class UserController {
  @Post('/facebookLogin')
  async facebookLogin() {
    //
  }

  @Post('/googleLogin')
  async googleLogin() {
    //
  }

  @Post('/login')
  async login(@Body() user: any) {
    const {username, password} = user;
    if (['admin', 'user'].includes(username) && password === 'pass') {
      const token = jwt.sign({ id: (username == 'admin' ? 1 : 2), username, role: username }, privateKey, { expiresIn: '1h' });
      return { token, user: { username } };
    }
    throw new UnauthorizedError('Invalid credentials');
  }

  @Get('/profile')
  async profile(@SessionParam('user') user: any, @Req() req: Request, @Res() res: Response) {
    if (user) {
      return `User Profile: ${user.username}`;
    } else {
      return res.status(401).send('Not logged in');
    }
  }

  @Post('/logout')
  @UseBefore(DestroySession)
  async logout() {
    return true;
  }
}

