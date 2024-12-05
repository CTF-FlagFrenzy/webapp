import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getTokens } from '$lib/auth/services';

export const GET: RequestHandler = async (event) => {
    try {
        const redirectTo = await getTokens(event);
        console.log('Redirect To:', redirectTo);
        if (!redirectTo) {
            throw new Error('Redirect URL is undefined');
        }
        throw redirect(302, '/');
    } catch (error) {
        console.error('Error during GET:', error);
        throw redirect(302, '/'); 
    }
};