import { r as redirect } from './index-DzcLzHBX.js';
import { b as getLogoutUri } from './services-CO3_SkFM.js';
import 'http';
import 'https';
import 'crypto';
import 'buffer';
import 'stream';
import 'util';
import 'fs';
import 'path';
import './prod-ssr-B2gHlHjM.js';

const GET = async ({ cookies }) => {
  const cookieOptions = { path: "/" };
  cookies.delete("accessToken", cookieOptions);
  throw redirect(302, getLogoutUri());
};

export { GET };
//# sourceMappingURL=_server.ts-BpRYswNY.js.map
