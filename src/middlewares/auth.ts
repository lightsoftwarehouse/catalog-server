import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import authConfig from '../config/authConfig';
import { Middleware, Req } from '@tsed/common';

interface TokenPayload {
	iat: number;
	exp: number;
	sub: string;
}

@Middleware()
export class AuthMiddleware {
	use (@Req() req: Req) {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			throw new Error("JWT is missing");
		}

		const [, token] = authHeader.split(' ');

		const { jwt: { secret }} = authConfig;
		
		try {
			const decodedToken = verify(token, secret) as TokenPayload;

			const { sub } = decodedToken;

			req.user = { id: sub };
		} catch (error) {
			throw new Error("Invalid JWT token");
		}
	}
}