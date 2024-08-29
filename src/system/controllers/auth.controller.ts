import { Request } from "express";
import { Body, Controller, Post, Req, UnauthorizedError } from "routing-controllers";

@Controller("/system/user")
export default class SystemAuthController {
    @Post("/login")
    login(@Body() user: any, @Req() req: Request) {
        const { username, password } = user;
        console.log("# system - login", { username, password });
        if (username === 'admin' && password === 'pass') {
          req.session.systemUser = { username };
          return 'Logged in successfully';
        }
        throw new UnauthorizedError('Invalid credentials');
    }
}