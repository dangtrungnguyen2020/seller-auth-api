import { Request } from "express";
import { Body, Controller, Post, Req, UnauthorizedError } from "routing-controllers";

@Controller("/admin/user")
export default class AdminAuthController {
    @Post("/login")
    login(@Body() user: any, @Req() req: Request) {
        const { username, password } = user;
        console.log("# admin - login", {username, password});
        if (username === 'admin' && password === 'pass') {
          req.session.adminUser = { username };
          return 'Logged in successfully';
        }
        throw new UnauthorizedError('Invalid credentials');
    }
}