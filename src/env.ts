import { params } from '@serverless/cloud';

/// Serverless Cloud Params for this app:
export const SUPABASE_URL = params.SUPABASE_URL as string;
export const SUPABASE_KEY_ANON = params.SUPABASE_KEY_ANON as string;
export const SUPABASE_JWT_SECRET = params.SUPABASE_JWT_SECRET as string;


// Sanity-check to catch missing params (try to do this on deploy or something):
export const explodeIfMissingParams = () => {
    console.log('Checking for missing parameters...');
    const expectedVars = [
        SUPABASE_URL,           // 0
        SUPABASE_KEY_ANON,      // 1
        SUPABASE_JWT_SECRET,    // 2
    ];
    expectedVars.forEach((v, i) => {
        if (v && v.length) {}
        else { throw `Secret ${i} not implemented`; }
    });
    console.log('All params are present & non-empty! Nice.');
}
