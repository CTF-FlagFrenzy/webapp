import { r as redirect, e as error } from './index-DzcLzHBX.js';
import { g as getUserInfo, r as redirectToAuthCodeUrl } from './services-CO3_SkFM.js';
import 'http';
import 'https';
import 'crypto';
import 'buffer';
import 'stream';
import 'util';
import 'fs';
import 'path';
import './prod-ssr-B2gHlHjM.js';

const handle = async ({ event, resolve }) => {
  if (event.route.id && event.route.id.indexOf("(protected)") > 0) {
    const accessToken = event.cookies.get("accessToken");
    let isValidate;
    if (accessToken) {
      try {
        const user = await getUserInfo(accessToken);
        event.locals.user = user;
        isValidate = true;
      } catch (error2) {
        isValidate = false;
      }
    }
    if (!isValidate) {
      const authCodeUrl = await redirectToAuthCodeUrl(event);
      if (authCodeUrl)
        throw redirect(302, authCodeUrl);
    }
  }
  const url = event.url.pathname;
  if (url.startsWith("/api/") && !event.request.headers.get("x")) {
    throw error(403, "Forbidden");
  }
  return resolve(event);
};

export { handle };
//# sourceMappingURL=hooks.server-BAY1AP0N.js.map
