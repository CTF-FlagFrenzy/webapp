import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getLogoutUri } from '$lib/auth/services';

export const GET: RequestHandler = async ({ cookies }) => {
    const cookieOptions = { path: '/' };

    cookies.delete('accessToken', cookieOptions);


    throw redirect(302, getLogoutUri());
};
