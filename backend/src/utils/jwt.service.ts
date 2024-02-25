import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {

    constructor() {

    }

    async verifyToken(token: string | undefined | null): Promise<any> {
        if (!token) throw new UnauthorizedException('Authorization token missing');
        try {
            const decoded = jwt.verify(token, process.env.AUTH_SECRET);
            return decoded;
        } catch (error) {
            console.log(error)
            if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedException('Token has expired');
            } else {
                throw new UnauthorizedException('Invalid token');
            }
        }
    }
}