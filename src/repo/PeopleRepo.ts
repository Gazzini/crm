import PrismaClientLib from '@prisma/client'
import { SUPABASE_DB_STRING } from 'env';

export namespace PeopleRepo {
    const prisma = new PrismaClientLib.PrismaClient({datasources: {
        db: {
            url: SUPABASE_DB_STRING
        }
    }});

    export const getAll = async (): Promise<number[]> => {
        const results = await prisma.people.findMany();
        return results.map(p => +`${p.id}`);
    }
}
