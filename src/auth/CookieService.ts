import { Request, Response } from "express";
import { INSTANCE_NAME, CLOUD_URL, DOMAIN_HOST_NAME } from "../env";

export namespace CookieService {
    export const COOKIE_NAME_JWT = 'jwt';

    export const setJWTCookie = (value: string, res: Response) => {
        console.log(`Setting cookie value: ${value}`);
        const days_120_ms = 1000 * 60 * 60 * 24 * 120;

        const domain = (INSTANCE_NAME === 'production')
            ? `.${DOMAIN_HOST_NAME}`
            : CLOUD_URL;

        res.cookie(COOKIE_NAME_JWT, value, {
            secure: true,
            httpOnly: true,
            sameSite: 'strict',
            domain,
            maxAge: days_120_ms
        });

        console.log('Set cookie for domain:');
        console.log(domain);
    }

    export const getJWTCookie = (req: Request): string | null => {
        const value = req.cookies[COOKIE_NAME_JWT];
        if (!value) {
            return null;
        }
        return value;
    }
}
