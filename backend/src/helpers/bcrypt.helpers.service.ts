import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptHelpersService {
    constructor() { }

    async hashString(string: string): Promise<string> {
        return bcrypt.hash(string, 10);
    }

    async compareString(string: string, hash: string): Promise<boolean> {
        return bcrypt.compare(string, hash);
    }
};