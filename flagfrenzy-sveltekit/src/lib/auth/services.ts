import type { RequestEvent } from '@sveltejs/kit';
import { ConfidentialClientApplication, CryptoProvider, ResponseMode } from '@azure/msal-node';
import { REDIRECT_URI } from '$env/static/private';
import { dev } from '$app/environment';
import { msalConfig } from './config';

const msalInstance = new ConfidentialClientApplication(msalConfig);
const cryptoProvider = new CryptoProvider();

const cookiesConfig = {
	httpOnly: true,
	path: '/',
	secure: !dev
};


export const redirectToAuthCodeUrl = async (event: RequestEvent) => {
	const { verifier, challenge } = await cryptoProvider.generatePkceCodes();
	const pkceCodes = {
		challengeMethod: 'S256',
		verifier,
		challenge
	};
	const csrfToken = cryptoProvider.createNewGuid();
	const state = cryptoProvider.base64Encode(
		JSON.stringify({
			csrfToken,
			redirectTo: event.url.pathname
		})
	);
	const authCodeUrlRequest = {
		redirectUri: REDIRECT_URI,
		responseMode: ResponseMode.QUERY,
		codeChallenge: pkceCodes.challenge,
		codeChallengeMethod: pkceCodes.challengeMethod,
		scopes: [],
		state
	};

	try {
		const authCodeUrl = await msalInstance.getAuthCodeUrl(authCodeUrlRequest);
		event.cookies.set('pkceVerifier', verifier, cookiesConfig);
		event.cookies.set('csrfToken', csrfToken, cookiesConfig);
		return authCodeUrl;
	} catch (err) {
		console.log(err);
	}
};

interface UserInfo {
    id: string;
    displayName: string;
    givenName: string;
    surname: string;
    mail: string;

}

export const getUserInfo = async (accessToken: string): Promise<UserInfo> => {
    const url = 'https://graph.microsoft.com/v1.0/me';
    const headers = {
        'Authorization': `Bearer ${accessToken}`
    };

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
            console.log(await response.text())
            throw new Error(`Failed to fetch user info: ${response.status}`);
        }
        
        let jsonResponse = await response.json();
  
        return jsonResponse;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch user info');
    }
};

export const getTokens = async (event: RequestEvent) => {
    const state = event.url.searchParams.get('state');
    if (state) {
        const decodedState = JSON.parse(cryptoProvider.base64Decode(state));
        const csrfToken = event.cookies.get('csrfToken');
        if (decodedState.csrfToken === csrfToken) {
            const code = event.url.searchParams.get('code');
            const error = event.url.searchParams.get('error');
            if (code) {
                const authCodeRequest = {
                    redirectUri: REDIRECT_URI,
                    code,
                    scopes: [],
                    codeVerifier: event.cookies.get('pkceVerifier')
                };
                try {
                    const tokenResponse = await msalInstance.acquireTokenByCode(authCodeRequest);
                    event.cookies.set('accessToken', tokenResponse.accessToken, cookiesConfig);
                    event.cookies.set('idToken', tokenResponse.idToken, cookiesConfig);
                    event.cookies.set('account', JSON.stringify(tokenResponse.account), cookiesConfig);
                    console.log('Access Token:', tokenResponse.accessToken);
                    
                    // Benutzerinformationen abrufen
                    const userInfo = await getUserInfo(tokenResponse.accessToken);
                    console.log('User Info:', userInfo);
                    
        
                    
                    
                } catch (err) {
                    console.log(err);
                }
            } else if (error) {
                throw new Error(error);
            }
        } else {
            throw new Error('CSRF token mismatch');
        }
    } else {
        throw new Error('State parameter missing');
    }
};
export const getLogoutUri = () => {
    return `${msalConfig.auth.authority}/oauth2/v2.0/logout`;
  };