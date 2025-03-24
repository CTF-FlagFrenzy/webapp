import { r as redirect } from './index-DzcLzHBX.js';
import { a as getTokens } from './services-OWgo8h5S.js';
import 'http';
import 'https';
import 'crypto';
import 'buffer';
import 'stream';
import 'util';
import 'fs';
import 'path';
import './prod-ssr-B2gHlHjM.js';

const GET = async (event) => {
  try {
    const redirectTo = await getTokens(event);
    console.log("Redirect To:", redirectTo);
    if (!redirectTo) {
      throw new Error("Redirect URL is undefined");
    }
    throw redirect(302, "/");
  } catch (error) {
    console.error("Error during GET:", error);
    throw redirect(302, "/");
  }
};

export { GET };
//# sourceMappingURL=_server.ts-jdlz1o-i.js.map
