import * as jwt from 'jsonwebtoken';
import fs from 'node:fs';
import path from 'node:path';
import { Action } from "routing-controllers";

export const privateKey = fs.readFileSync(path.join(__dirname, '../../../ssl/rsa/private.key'), 'utf8');
export const publicKey = fs.readFileSync(path.join(__dirname, '../../../ssl/rsa/public.key'), 'utf8');

export function currentUserChecker(action: Action) {
    const token = action.request.headers['authorization'];
    // return action.request.session.id;
    return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
}

export async function authorizationChecker(action: Action, roles: string[]) {
    const token = action.request.headers['authorization'];

    // const user = await getEntityManager().findOneByToken(User, token);
    // if (user && !roles.length) return true;
    // if (user && roles.find(role => user.roles.indexOf(role) !== -1)) return true;
    // return action.request.session.id;
    return false;
}
