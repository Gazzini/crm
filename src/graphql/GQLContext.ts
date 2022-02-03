import { Request, Response } from 'express';

interface CustomRequest extends Request {
    /// For logged in users, we'll set this string in our middleware
    userId?: string;
}

/// The custom context object we inject to each resolver func
export interface GQLContext {
    req: CustomRequest;
    res: Response;
}
