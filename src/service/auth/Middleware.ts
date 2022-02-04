import { NextFunction, Response } from "express";
import { CustomRequest } from "graphql/GQLContext";
import { CookieService } from "./CookieService";
import { JWT } from "./JWTService";


export namespace AuthMiddleware {
    export const EnrichReqWithUserId = (req: CustomRequest, res: Response, next: NextFunction) => {
        const encodedToken = CookieService.getJWTCookie(req);
        if (encodedToken) {
            const tokenPayload = JWT.verify(encodedToken);
            if (tokenPayload && tokenPayload.userId) {
                req.userId = tokenPayload.userId;
            }
        }
        next();
    }
}