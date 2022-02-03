import { GQLContext } from "../graphql/GQLContext";
import { CookieService } from "./CookieService";
import { JWT } from "./JWTService";
import { SB } from "./SupabaseAuthHelper";


export namespace AccountService {
    export const registerUser = async (info: {
        username: string;
        email: string;
        password: string;
        ctx: GQLContext
    }): Promise<string> => {

        try {
            const user = await SB.signUpUser(info.email, info.password);
            const jwt = JWT.sign({userId: user.id});
            CookieService.setJWTCookie(jwt, info.ctx.res);
            return user.id;
        } catch (e) {
            console.error('can\'t sign up');
            console.dir(e);
        }
    };

    export const loginUser = async (info: {
        email: string;
        password: string;
        ctx: GQLContext
    }): Promise<string> => {

        try {
            const user = await SB.loginUser(info.email, info.password);
            const jwt = JWT.sign({userId: user.id});
            CookieService.setJWTCookie(jwt, info.ctx.res);
            return user.id;
        } catch (e) {
            console.error('can\'t sign up');
            console.dir(e);
        }
    };

    export const getUserId = async (info: {
        ctx: GQLContext
    }): Promise<string | null> => {
        const encodedToken = CookieService.getJWTCookie(info.ctx.req);
        return JWT.verify(encodedToken).userId;
    }
}
