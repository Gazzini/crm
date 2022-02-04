import { params } from '@serverless/cloud';
import { Util } from './service/Util';

/// Serverless Cloud Params for this app:
export const SUPABASE_URL = params.SUPABASE_URL as string;
export const SUPABASE_KEY_ANON = params.SUPABASE_KEY_ANON as string;
export const SUPABASE_JWT_SECRET = params.SUPABASE_JWT_SECRET as string;

export const SUPABASE_DB_STRING = params.SUPABASE_DB_STRING as string;

// Is this too much logic for a "dumb" file like this? meh.
export const CLOUD_URL = Util.removePrefix(params.CLOUD_URL as string, 'https://');
export const INSTANCE_NAME = params.INSTANCE_NAME as string;

export const DOMAIN_HOST_NAME = 'byterise.com';

// Sanity-check to catch missing params (try to do this on deploy or something):
export const explodeIfMissingParams = () => {
    console.log('Checking for missing parameters...');
    const expectedVars = [
        SUPABASE_URL,           // 0
        SUPABASE_KEY_ANON,      // 1
        SUPABASE_JWT_SECRET,    // 2
        CLOUD_URL,              // 3
        INSTANCE_NAME,          // 4
    ];
    expectedVars.forEach((v, i) => {
        if (v && v.length) {}
        else { throw `Secret ${i} not implemented`; }
    });
    console.log('All params are present & non-empty! Nice.');
}
