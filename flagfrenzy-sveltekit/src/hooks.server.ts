import { redirect, type Handle } from '@sveltejs/kit';
import { redirectToAuthCodeUrl } from '$lib/auth/services';
import { getUserInfo } from '$lib/auth/services';
import { error } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.route.id && event.route.id.indexOf('(protected)') > 0) {
		const accessToken = event.cookies.get('accessToken');
		let isValidate;
		
    if (accessToken) {
        try {
            const user = await getUserInfo(accessToken);
            event.locals.user = user;
			isValidate = true;
        } catch (error) {
		   isValidate = false;
        }
    }
		if (!isValidate) {
			const authCodeUrl = await redirectToAuthCodeUrl(event);
			if (authCodeUrl) throw redirect(302, authCodeUrl);
		}
	}

	const url = event.url.pathname;

    if (url.startsWith('/api/') && !event.request.headers.get('x-sveltekit-fetch')) {
        throw error(403, 'Forbidden');
    }

    return resolve(event);
}
