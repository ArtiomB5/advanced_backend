import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const [bearer, token] = authHeader.split(' ');
            
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'User is unauthorized!' });
            }
            const jwtVerifyOptions: JwtVerifyOptions = {
                secret: process.env.PRIVATE_KEY,
            };
            const user = this.jwtService.verify(token, jwtVerifyOptions);
            req.user = user;
            return true;
        } catch (e) {
            throw new UnauthorizedException({ message: 'User is unauthorized!' });
        }
    }
}