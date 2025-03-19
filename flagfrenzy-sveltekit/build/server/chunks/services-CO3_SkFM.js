import http from 'http';
import https from 'https';
import crypto from 'crypto';
import require$$0 from 'buffer';
import require$$3 from 'stream';
import require$$5 from 'util';
import 'fs';
import 'path';
import { D as DEV } from './prod-ssr-B2gHlHjM.js';

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

/*! @azure/msal-node v2.16.2 2024-11-19 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * This class serializes cache entities to be saved into in-memory object types defined internally
 * @internal
 */
class Serializer {
    /**
     * serialize the JSON blob
     * @param data - JSON blob cache
     */
    static serializeJSONBlob(data) {
        return JSON.stringify(data);
    }
    /**
     * Serialize Accounts
     * @param accCache - cache of accounts
     */
    static serializeAccounts(accCache) {
        const accounts = {};
        Object.keys(accCache).map(function (key) {
            const accountEntity = accCache[key];
            accounts[key] = {
                home_account_id: accountEntity.homeAccountId,
                environment: accountEntity.environment,
                realm: accountEntity.realm,
                local_account_id: accountEntity.localAccountId,
                username: accountEntity.username,
                authority_type: accountEntity.authorityType,
                name: accountEntity.name,
                client_info: accountEntity.clientInfo,
                last_modification_time: accountEntity.lastModificationTime,
                last_modification_app: accountEntity.lastModificationApp,
                tenantProfiles: accountEntity.tenantProfiles?.map((tenantProfile) => {
                    return JSON.stringify(tenantProfile);
                }),
            };
        });
        return accounts;
    }
    /**
     * Serialize IdTokens
     * @param idTCache - cache of ID tokens
     */
    static serializeIdTokens(idTCache) {
        const idTokens = {};
        Object.keys(idTCache).map(function (key) {
            const idTEntity = idTCache[key];
            idTokens[key] = {
                home_account_id: idTEntity.homeAccountId,
                environment: idTEntity.environment,
                credential_type: idTEntity.credentialType,
                client_id: idTEntity.clientId,
                secret: idTEntity.secret,
                realm: idTEntity.realm,
            };
        });
        return idTokens;
    }
    /**
     * Serializes AccessTokens
     * @param atCache - cache of access tokens
     */
    static serializeAccessTokens(atCache) {
        const accessTokens = {};
        Object.keys(atCache).map(function (key) {
            const atEntity = atCache[key];
            accessTokens[key] = {
                home_account_id: atEntity.homeAccountId,
                environment: atEntity.environment,
                credential_type: atEntity.credentialType,
                client_id: atEntity.clientId,
                secret: atEntity.secret,
                realm: atEntity.realm,
                target: atEntity.target,
                cached_at: atEntity.cachedAt,
                expires_on: atEntity.expiresOn,
                extended_expires_on: atEntity.extendedExpiresOn,
                refresh_on: atEntity.refreshOn,
                key_id: atEntity.keyId,
                token_type: atEntity.tokenType,
                requestedClaims: atEntity.requestedClaims,
                requestedClaimsHash: atEntity.requestedClaimsHash,
                userAssertionHash: atEntity.userAssertionHash,
            };
        });
        return accessTokens;
    }
    /**
     * Serialize refreshTokens
     * @param rtCache - cache of refresh tokens
     */
    static serializeRefreshTokens(rtCache) {
        const refreshTokens = {};
        Object.keys(rtCache).map(function (key) {
            const rtEntity = rtCache[key];
            refreshTokens[key] = {
                home_account_id: rtEntity.homeAccountId,
                environment: rtEntity.environment,
                credential_type: rtEntity.credentialType,
                client_id: rtEntity.clientId,
                secret: rtEntity.secret,
                family_id: rtEntity.familyId,
                target: rtEntity.target,
                realm: rtEntity.realm,
            };
        });
        return refreshTokens;
    }
    /**
     * Serialize amdtCache
     * @param amdtCache - cache of app metadata
     */
    static serializeAppMetadata(amdtCache) {
        const appMetadata = {};
        Object.keys(amdtCache).map(function (key) {
            const amdtEntity = amdtCache[key];
            appMetadata[key] = {
                client_id: amdtEntity.clientId,
                environment: amdtEntity.environment,
                family_id: amdtEntity.familyId,
            };
        });
        return appMetadata;
    }
    /**
     * Serialize the cache
     * @param inMemCache - itemised cache read from the JSON
     */
    static serializeAllCache(inMemCache) {
        return {
            Account: this.serializeAccounts(inMemCache.accounts),
            IdToken: this.serializeIdTokens(inMemCache.idTokens),
            AccessToken: this.serializeAccessTokens(inMemCache.accessTokens),
            RefreshToken: this.serializeRefreshTokens(inMemCache.refreshTokens),
            AppMetadata: this.serializeAppMetadata(inMemCache.appMetadata),
        };
    }
}

/*! @azure/msal-common v14.16.0 2024-11-05 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const Constants$1 = {
    LIBRARY_NAME: "MSAL.JS",
    SKU: "msal.js.common",
    // Prefix for all library cache entries
    CACHE_PREFIX: "msal",
    // default authority
    DEFAULT_AUTHORITY: "https://login.microsoftonline.com/common/",
    DEFAULT_AUTHORITY_HOST: "login.microsoftonline.com",
    DEFAULT_COMMON_TENANT: "common",
    // ADFS String
    ADFS: "adfs",
    DSTS: "dstsv2",
    // Default AAD Instance Discovery Endpoint
    AAD_INSTANCE_DISCOVERY_ENDPT: "https://login.microsoftonline.com/common/discovery/instance?api-version=1.1&authorization_endpoint=",
    // CIAM URL
    CIAM_AUTH_URL: ".ciamlogin.com",
    AAD_TENANT_DOMAIN_SUFFIX: ".onmicrosoft.com",
    // Resource delimiter - used for certain cache entries
    RESOURCE_DELIM: "|",
    // Placeholder for non-existent account ids/objects
    NO_ACCOUNT: "NO_ACCOUNT",
    // Claims
    CLAIMS: "claims",
    // Consumer UTID
    CONSUMER_UTID: "9188040d-6c67-4c5b-b112-36a304b66dad",
    // Default scopes
    OPENID_SCOPE: "openid",
    PROFILE_SCOPE: "profile",
    OFFLINE_ACCESS_SCOPE: "offline_access",
    EMAIL_SCOPE: "email",
    // Default response type for authorization code flow
    CODE_RESPONSE_TYPE: "code",
    CODE_GRANT_TYPE: "authorization_code",
    RT_GRANT_TYPE: "refresh_token",
    FRAGMENT_RESPONSE_MODE: "fragment",
    S256_CODE_CHALLENGE_METHOD: "S256",
    URL_FORM_CONTENT_TYPE: "application/x-www-form-urlencoded;charset=utf-8",
    AUTHORIZATION_PENDING: "authorization_pending",
    NOT_DEFINED: "not_defined",
    EMPTY_STRING: "",
    NOT_APPLICABLE: "N/A",
    NOT_AVAILABLE: "Not Available",
    FORWARD_SLASH: "/",
    IMDS_ENDPOINT: "http://169.254.169.254/metadata/instance/compute/location",
    IMDS_VERSION: "2020-06-01",
    IMDS_TIMEOUT: 2000,
    AZURE_REGION_AUTO_DISCOVER_FLAG: "TryAutoDetect",
    REGIONAL_AUTH_PUBLIC_CLOUD_SUFFIX: "login.microsoft.com",
    KNOWN_PUBLIC_CLOUDS: [
        "login.microsoftonline.com",
        "login.windows.net",
        "login.microsoft.com",
        "sts.windows.net",
    ],
    TOKEN_RESPONSE_TYPE: "token",
    ID_TOKEN_RESPONSE_TYPE: "id_token",
    SHR_NONCE_VALIDITY: 240,
    INVALID_INSTANCE: "invalid_instance",
};
const HttpStatus = {
    SUCCESS: 200,
    SUCCESS_RANGE_START: 200,
    SUCCESS_RANGE_END: 299,
    REDIRECT: 302,
    CLIENT_ERROR: 400,
    CLIENT_ERROR_RANGE_START: 400,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    REQUEST_TIMEOUT: 408,
    TOO_MANY_REQUESTS: 429,
    CLIENT_ERROR_RANGE_END: 499,
    SERVER_ERROR: 500,
    SERVER_ERROR_RANGE_START: 500,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    SERVER_ERROR_RANGE_END: 599,
    MULTI_SIDED_ERROR: 600,
};
const OIDC_DEFAULT_SCOPES = [
    Constants$1.OPENID_SCOPE,
    Constants$1.PROFILE_SCOPE,
    Constants$1.OFFLINE_ACCESS_SCOPE,
];
const OIDC_SCOPES = [...OIDC_DEFAULT_SCOPES, Constants$1.EMAIL_SCOPE];
/**
 * Request header names
 */
const HeaderNames = {
    CONTENT_TYPE: "Content-Type",
    CONTENT_LENGTH: "Content-Length",
    RETRY_AFTER: "Retry-After",
    CCS_HEADER: "X-AnchorMailbox",
    WWWAuthenticate: "WWW-Authenticate",
    AuthenticationInfo: "Authentication-Info",
    X_MS_REQUEST_ID: "x-ms-request-id",
    X_MS_HTTP_VERSION: "x-ms-httpver",
};
/**
 * String constants related to AAD Authority
 */
const AADAuthorityConstants = {
    COMMON: "common",
    ORGANIZATIONS: "organizations",
    CONSUMERS: "consumers",
};
/**
 * Claims request keys
 */
const ClaimsRequestKeys = {
    ACCESS_TOKEN: "access_token",
    XMS_CC: "xms_cc",
};
/**
 * we considered making this "enum" in the request instead of string, however it looks like the allowed list of
 * prompt values kept changing over past couple of years. There are some undocumented prompt values for some
 * internal partners too, hence the choice of generic "string" type instead of the "enum"
 */
const PromptValue = {
    LOGIN: "login",
    SELECT_ACCOUNT: "select_account",
    CONSENT: "consent",
    NONE: "none",
    CREATE: "create",
    NO_SESSION: "no_session",
};
/**
 * allowed values for codeVerifier
 */
const CodeChallengeMethodValues = {
    PLAIN: "plain",
    S256: "S256",
};
/**
 * allowed values for server response type
 */
const ServerResponseType = {
    QUERY: "query",
    FRAGMENT: "fragment",
};
/**
 * allowed values for response_mode
 */
const ResponseMode = {
    ...ServerResponseType,
    FORM_POST: "form_post",
};
/**
 * allowed grant_type
 */
const GrantType = {
    IMPLICIT_GRANT: "implicit",
    AUTHORIZATION_CODE_GRANT: "authorization_code",
    CLIENT_CREDENTIALS_GRANT: "client_credentials",
    RESOURCE_OWNER_PASSWORD_GRANT: "password",
    REFRESH_TOKEN_GRANT: "refresh_token",
    DEVICE_CODE_GRANT: "device_code",
    JWT_BEARER: "urn:ietf:params:oauth:grant-type:jwt-bearer",
};
/**
 * Account types in Cache
 */
const CacheAccountType = {
    MSSTS_ACCOUNT_TYPE: "MSSTS",
    ADFS_ACCOUNT_TYPE: "ADFS",
    MSAV1_ACCOUNT_TYPE: "MSA",
    GENERIC_ACCOUNT_TYPE: "Generic", // NTLM, Kerberos, FBA, Basic etc
};
/**
 * Separators used in cache
 */
const Separators = {
    CACHE_KEY_SEPARATOR: "-",
    CLIENT_INFO_SEPARATOR: ".",
};
/**
 * Credential Type stored in the cache
 */
const CredentialType = {
    ID_TOKEN: "IdToken",
    ACCESS_TOKEN: "AccessToken",
    ACCESS_TOKEN_WITH_AUTH_SCHEME: "AccessToken_With_AuthScheme",
    REFRESH_TOKEN: "RefreshToken",
};
/**
 * More Cache related constants
 */
const APP_METADATA = "appmetadata";
const CLIENT_INFO = "client_info";
const THE_FAMILY_ID = "1";
const AUTHORITY_METADATA_CONSTANTS = {
    CACHE_KEY: "authority-metadata",
    REFRESH_TIME_SECONDS: 3600 * 24, // 24 Hours
};
const AuthorityMetadataSource = {
    CONFIG: "config",
    CACHE: "cache",
    NETWORK: "network",
    HARDCODED_VALUES: "hardcoded_values",
};
const SERVER_TELEM_CONSTANTS = {
    SCHEMA_VERSION: 5,
    MAX_CUR_HEADER_BYTES: 80,
    MAX_LAST_HEADER_BYTES: 330,
    MAX_CACHED_ERRORS: 50,
    CACHE_KEY: "server-telemetry",
    CATEGORY_SEPARATOR: "|",
    VALUE_SEPARATOR: ",",
    OVERFLOW_TRUE: "1",
    OVERFLOW_FALSE: "0",
    UNKNOWN_ERROR: "unknown_error",
};
/**
 * Type of the authentication request
 */
const AuthenticationScheme = {
    BEARER: "Bearer",
    POP: "pop",
    SSH: "ssh-cert",
};
/**
 * Constants related to throttling
 */
const ThrottlingConstants = {
    // Default time to throttle RequestThumbprint in seconds
    DEFAULT_THROTTLE_TIME_SECONDS: 60,
    // Default maximum time to throttle in seconds, overrides what the server sends back
    DEFAULT_MAX_THROTTLE_TIME_SECONDS: 3600,
    // Prefix for storing throttling entries
    THROTTLING_PREFIX: "throttling",
    // Value assigned to the x-ms-lib-capability header to indicate to the server the library supports throttling
    X_MS_LIB_CAPABILITY_VALUE: "retry-after, h429",
};
const Errors = {
    INVALID_GRANT_ERROR: "invalid_grant",
    CLIENT_MISMATCH_ERROR: "client_mismatch",
};
/**
 * Password grant parameters
 */
const PasswordGrantConstants = {
    username: "username",
    password: "password",
};
/**
 * Response codes
 */
const ResponseCodes = {
    httpSuccess: 200,
    httpBadRequest: 400,
};
/**
 * Region Discovery Sources
 */
const RegionDiscoverySources = {
    FAILED_AUTO_DETECTION: "1",
    INTERNAL_CACHE: "2",
    ENVIRONMENT_VARIABLE: "3",
    IMDS: "4",
};
/**
 * Region Discovery Outcomes
 */
const RegionDiscoveryOutcomes = {
    CONFIGURED_MATCHES_DETECTED: "1",
    CONFIGURED_NO_AUTO_DETECTION: "2",
    CONFIGURED_NOT_DETECTED: "3",
    AUTO_DETECTION_REQUESTED_SUCCESSFUL: "4",
    AUTO_DETECTION_REQUESTED_FAILED: "5",
};
/**
 * Specifies the reason for fetching the access token from the identity provider
 */
const CacheOutcome = {
    // When a token is found in the cache or the cache is not supposed to be hit when making the request
    NOT_APPLICABLE: "0",
    // When the token request goes to the identity provider because force_refresh was set to true. Also occurs if claims were requested
    FORCE_REFRESH_OR_CLAIMS: "1",
    // When the token request goes to the identity provider because no cached access token exists
    NO_CACHED_ACCESS_TOKEN: "2",
    // When the token request goes to the identity provider because cached access token expired
    CACHED_ACCESS_TOKEN_EXPIRED: "3",
    // When the token request goes to the identity provider because refresh_in was used and the existing token needs to be refreshed
    PROACTIVELY_REFRESHED: "4",
};
// Token renewal offset default in seconds
const DEFAULT_TOKEN_RENEWAL_OFFSET_SEC = 300;

/*! @azure/msal-common v14.16.0 2024-11-05 */
/**
 * General error class thrown by the MSAL.js library.
 */
class AuthError extends Error {
    constructor(errorCode, errorMessage, suberror) {
        const errorString = errorMessage
            ? `${errorCode}: ${errorMessage}`
            : errorCode;
        super(errorString);
        Object.setPrototypeOf(this, AuthError.prototype);
        this.errorCode = errorCode || Constants$1.EMPTY_STRING;
        this.errorMessage = errorMessage || Constants$1.EMPTY_STRING;
        this.subError = suberror || Constants$1.EMPTY_STRING;
        this.name = "AuthError";
    }
    setCorrelationId(correlationId) {
        this.correlationId = correlationId;
    }
}

/*! @azure/msal-common v14.16.0 2024-11-05 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const clientInfoDecodingError = "client_info_decoding_error";
const clientInfoEmptyError = "client_info_empty_error";
const tokenParsingError = "token_parsing_error";
const nullOrEmptyToken = "null_or_empty_token";
const endpointResolutionError = "endpoints_resolution_error";
const networkError = "network_error";
const openIdConfigError = "openid_config_error";
const hashNotDeserialized = "hash_not_deserialized";
const invalidState = "invalid_state";
const stateMismatch = "state_mismatch";
const stateNotFound = "state_not_found";
const nonceMismatch = "nonce_mismatch";
const authTimeNotFound = "auth_time_not_found";
const maxAgeTranspired = "max_age_transpired";
const multipleMatchingTokens = "multiple_matching_tokens";
const multipleMatchingAccounts = "multiple_matching_accounts";
const multipleMatchingAppMetadata = "multiple_matching_appMetadata";
const requestCannotBeMade = "request_cannot_be_made";
const cannotRemoveEmptyScope = "cannot_remove_empty_scope";
const cannotAppendScopeSet = "cannot_append_scopeset";
const emptyInputScopeSet = "empty_input_scopeset";
const deviceCodePollingCancelled = "device_code_polling_cancelled";
const deviceCodeExpired = "device_code_expired";
const deviceCodeUnknownError = "device_code_unknown_error";
const noAccountInSilentRequest = "no_account_in_silent_request";
const invalidCacheRecord = "invalid_cache_record";
const invalidCacheEnvironment = "invalid_cache_environment";
const noAccountFound = "no_account_found";
const noCryptoObject = "no_crypto_object";
const unexpectedCredentialType = "unexpected_credential_type";
const invalidAssertion = "invalid_assertion";
const invalidClientCredential = "invalid_client_credential";
const tokenRefreshRequired = "token_refresh_required";
const userTimeoutReached = "user_timeout_reached";
const tokenClaimsCnfRequiredForSignedJwt = "token_claims_cnf_required_for_signedjwt";
const authorizationCodeMissingFromServerResponse = "authorization_code_missing_from_server_response";
const bindingKeyNotRemoved = "binding_key_not_removed";
const endSessionEndpointNotSupported = "end_session_endpoint_not_supported";
const keyIdMissing = "key_id_missing";
const noNetworkConnectivity = "no_network_connectivity";
const userCanceled = "user_canceled";
const missingTenantIdError = "missing_tenant_id_error";
const methodNotImplemented = "method_not_implemented";
const nestedAppAuthBridgeDisabled = "nested_app_auth_bridge_disabled";

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * ClientAuthErrorMessage class containing string constants used by error codes and messages.
 */
const ClientAuthErrorMessages = {
    [clientInfoDecodingError]: "The client info could not be parsed/decoded correctly",
    [clientInfoEmptyError]: "The client info was empty",
    [tokenParsingError]: "Token cannot be parsed",
    [nullOrEmptyToken]: "The token is null or empty",
    [endpointResolutionError]: "Endpoints cannot be resolved",
    [networkError]: "Network request failed",
    [openIdConfigError]: "Could not retrieve endpoints. Check your authority and verify the .well-known/openid-configuration endpoint returns the required endpoints.",
    [hashNotDeserialized]: "The hash parameters could not be deserialized",
    [invalidState]: "State was not the expected format",
    [stateMismatch]: "State mismatch error",
    [stateNotFound]: "State not found",
    [nonceMismatch]: "Nonce mismatch error",
    [authTimeNotFound]: "Max Age was requested and the ID token is missing the auth_time variable." +
        " auth_time is an optional claim and is not enabled by default - it must be enabled." +
        " See https://aka.ms/msaljs/optional-claims for more information.",
    [maxAgeTranspired]: "Max Age is set to 0, or too much time has elapsed since the last end-user authentication.",
    [multipleMatchingTokens]: "The cache contains multiple tokens satisfying the requirements. " +
        "Call AcquireToken again providing more requirements such as authority or account.",
    [multipleMatchingAccounts]: "The cache contains multiple accounts satisfying the given parameters. Please pass more info to obtain the correct account",
    [multipleMatchingAppMetadata]: "The cache contains multiple appMetadata satisfying the given parameters. Please pass more info to obtain the correct appMetadata",
    [requestCannotBeMade]: "Token request cannot be made without authorization code or refresh token.",
    [cannotRemoveEmptyScope]: "Cannot remove null or empty scope from ScopeSet",
    [cannotAppendScopeSet]: "Cannot append ScopeSet",
    [emptyInputScopeSet]: "Empty input ScopeSet cannot be processed",
    [deviceCodePollingCancelled]: "Caller has cancelled token endpoint polling during device code flow by setting DeviceCodeRequest.cancel = true.",
    [deviceCodeExpired]: "Device code is expired.",
    [deviceCodeUnknownError]: "Device code stopped polling for unknown reasons.",
    [noAccountInSilentRequest]: "Please pass an account object, silent flow is not supported without account information",
    [invalidCacheRecord]: "Cache record object was null or undefined.",
    [invalidCacheEnvironment]: "Invalid environment when attempting to create cache entry",
    [noAccountFound]: "No account found in cache for given key.",
    [noCryptoObject]: "No crypto object detected.",
    [unexpectedCredentialType]: "Unexpected credential type.",
    [invalidAssertion]: "Client assertion must meet requirements described in https://tools.ietf.org/html/rfc7515",
    [invalidClientCredential]: "Client credential (secret, certificate, or assertion) must not be empty when creating a confidential client. An application should at most have one credential",
    [tokenRefreshRequired]: "Cannot return token from cache because it must be refreshed. This may be due to one of the following reasons: forceRefresh parameter is set to true, claims have been requested, there is no cached access token or it is expired.",
    [userTimeoutReached]: "User defined timeout for device code polling reached",
    [tokenClaimsCnfRequiredForSignedJwt]: "Cannot generate a POP jwt if the token_claims are not populated",
    [authorizationCodeMissingFromServerResponse]: "Server response does not contain an authorization code to proceed",
    [bindingKeyNotRemoved]: "Could not remove the credential's binding key from storage.",
    [endSessionEndpointNotSupported]: "The provided authority does not support logout",
    [keyIdMissing]: "A keyId value is missing from the requested bound token's cache record and is required to match the token to it's stored binding key.",
    [noNetworkConnectivity]: "No network connectivity. Check your internet connection.",
    [userCanceled]: "User cancelled the flow.",
    [missingTenantIdError]: "A tenant id - not common, organizations, or consumers - must be specified when using the client_credentials flow.",
    [methodNotImplemented]: "This method has not been implemented",
    [nestedAppAuthBridgeDisabled]: "The nested app auth bridge is disabled",
};
/**
 * Error thrown when there is an error in the client code running on the browser.
 */
class ClientAuthError extends AuthError {
    constructor(errorCode, additionalMessage) {
        super(errorCode, additionalMessage
            ? `${ClientAuthErrorMessages[errorCode]}: ${additionalMessage}`
            : ClientAuthErrorMessages[errorCode]);
        this.name = "ClientAuthError";
        Object.setPrototypeOf(this, ClientAuthError.prototype);
    }
}
function createClientAuthError(errorCode, additionalMessage) {
    return new ClientAuthError(errorCode, additionalMessage);
}

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const DEFAULT_CRYPTO_IMPLEMENTATION = {
    createNewGuid: () => {
        throw createClientAuthError(methodNotImplemented);
    },
    base64Decode: () => {
        throw createClientAuthError(methodNotImplemented);
    },
    base64Encode: () => {
        throw createClientAuthError(methodNotImplemented);
    },
    base64UrlEncode: () => {
        throw createClientAuthError(methodNotImplemented);
    },
    encodeKid: () => {
        throw createClientAuthError(methodNotImplemented);
    },
    async getPublicKeyThumbprint() {
        throw createClientAuthError(methodNotImplemented);
    },
    async removeTokenBindingKey() {
        throw createClientAuthError(methodNotImplemented);
    },
    async clearKeystore() {
        throw createClientAuthError(methodNotImplemented);
    },
    async signJwt() {
        throw createClientAuthError(methodNotImplemented);
    },
    async hashString() {
        throw createClientAuthError(methodNotImplemented);
    },
};

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Log message level.
 */
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Error"] = 0] = "Error";
    LogLevel[LogLevel["Warning"] = 1] = "Warning";
    LogLevel[LogLevel["Info"] = 2] = "Info";
    LogLevel[LogLevel["Verbose"] = 3] = "Verbose";
    LogLevel[LogLevel["Trace"] = 4] = "Trace";
})(LogLevel || (LogLevel = {}));
/**
 * Class which facilitates logging of messages to a specific place.
 */
class Logger {
    constructor(loggerOptions, packageName, packageVersion) {
        // Current log level, defaults to info.
        this.level = LogLevel.Info;
        const defaultLoggerCallback = () => {
            return;
        };
        const setLoggerOptions = loggerOptions || Logger.createDefaultLoggerOptions();
        this.localCallback =
            setLoggerOptions.loggerCallback || defaultLoggerCallback;
        this.piiLoggingEnabled = setLoggerOptions.piiLoggingEnabled || false;
        this.level =
            typeof setLoggerOptions.logLevel === "number"
                ? setLoggerOptions.logLevel
                : LogLevel.Info;
        this.correlationId =
            setLoggerOptions.correlationId || Constants$1.EMPTY_STRING;
        this.packageName = packageName || Constants$1.EMPTY_STRING;
        this.packageVersion = packageVersion || Constants$1.EMPTY_STRING;
    }
    static createDefaultLoggerOptions() {
        return {
            loggerCallback: () => {
                // allow users to not set loggerCallback
            },
            piiLoggingEnabled: false,
            logLevel: LogLevel.Info,
        };
    }
    /**
     * Create new Logger with existing configurations.
     */
    clone(packageName, packageVersion, correlationId) {
        return new Logger({
            loggerCallback: this.localCallback,
            piiLoggingEnabled: this.piiLoggingEnabled,
            logLevel: this.level,
            correlationId: correlationId || this.correlationId,
        }, packageName, packageVersion);
    }
    /**
     * Log message with required options.
     */
    logMessage(logMessage, options) {
        if (options.logLevel > this.level ||
            (!this.piiLoggingEnabled && options.containsPii)) {
            return;
        }
        const timestamp = new Date().toUTCString();
        // Add correlationId to logs if set, correlationId provided on log messages take precedence
        const logHeader = `[${timestamp}] : [${options.correlationId || this.correlationId || ""}]`;
        const log = `${logHeader} : ${this.packageName}@${this.packageVersion} : ${LogLevel[options.logLevel]} - ${logMessage}`;
        // debug(`msal:${LogLevel[options.logLevel]}${options.containsPii ? "-Pii": Constants.EMPTY_STRING}${options.context ? `:${options.context}` : Constants.EMPTY_STRING}`)(logMessage);
        this.executeCallback(options.logLevel, log, options.containsPii || false);
    }
    /**
     * Execute callback with message.
     */
    executeCallback(level, message, containsPii) {
        if (this.localCallback) {
            this.localCallback(level, message, containsPii);
        }
    }
    /**
     * Logs error messages.
     */
    error(message, correlationId) {
        this.logMessage(message, {
            logLevel: LogLevel.Error,
            containsPii: false,
            correlationId: correlationId || Constants$1.EMPTY_STRING,
        });
    }
    /**
     * Logs error messages with PII.
     */
    errorPii(message, correlationId) {
        this.logMessage(message, {
            logLevel: LogLevel.Error,
            containsPii: true,
            correlationId: correlationId || Constants$1.EMPTY_STRING,
        });
    }
    /**
     * Logs warning messages.
     */
    warning(message, correlationId) {
        this.logMessage(message, {
            logLevel: LogLevel.Warning,
            containsPii: false,
            correlationId: correlationId || Constants$1.EMPTY_STRING,
        });
    }
    /**
     * Logs warning messages with PII.
     */
    warningPii(message, correlationId) {
        this.logMessage(message, {
            logLevel: LogLevel.Warning,
            containsPii: true,
            correlationId: correlationId || Constants$1.EMPTY_STRING,
        });
    }
    /**
     * Logs info messages.
     */
    info(message, correlationId) {
        this.logMessage(message, {
            logLevel: LogLevel.Info,
            containsPii: false,
            correlationId: correlationId || Constants$1.EMPTY_STRING,
        });
    }
    /**
     * Logs info messages with PII.
     */
    infoPii(message, correlationId) {
        this.logMessage(message, {
            logLevel: LogLevel.Info,
            containsPii: true,
            correlationId: correlationId || Constants$1.EMPTY_STRING,
        });
    }
    /**
     * Logs verbose messages.
     */
    verbose(message, correlationId) {
        this.logMessage(message, {
            logLevel: LogLevel.Verbose,
            containsPii: false,
            correlationId: correlationId || Constants$1.EMPTY_STRING,
        });
    }
    /**
     * Logs verbose messages with PII.
     */
    verbosePii(message, correlationId) {
        this.logMessage(message, {
            logLevel: LogLevel.Verbose,
            containsPii: true,
            correlationId: correlationId || Constants$1.EMPTY_STRING,
        });
    }
    /**
     * Logs trace messages.
     */
    trace(message, correlationId) {
        this.logMessage(message, {
            logLevel: LogLevel.Trace,
            containsPii: false,
            correlationId: correlationId || Constants$1.EMPTY_STRING,
        });
    }
    /**
     * Logs trace messages with PII.
     */
    tracePii(message, correlationId) {
        this.logMessage(message, {
            logLevel: LogLevel.Trace,
            containsPii: true,
            correlationId: correlationId || Constants$1.EMPTY_STRING,
        });
    }
    /**
     * Returns whether PII Logging is enabled or not.
     */
    isPiiLoggingEnabled() {
        return this.piiLoggingEnabled || false;
    }
}

/*! @azure/msal-common v14.16.0 2024-11-05 */
/* eslint-disable header/header */
const name$1 = "@azure/msal-common";
const version$1 = "14.16.0";

/*! @azure/msal-common v14.16.0 2024-11-05 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const AzureCloudInstance = {
    // AzureCloudInstance is not specified.
    None: "none",
    // Microsoft Azure public cloud
    AzurePublic: "https://login.microsoftonline.com",
    // Microsoft PPE
    AzurePpe: "https://login.windows-ppe.net",
    // Microsoft Chinese national/regional cloud
    AzureChina: "https://login.chinacloudapi.cn",
    // Microsoft German national/regional cloud ("Black Forest")
    AzureGermany: "https://login.microsoftonline.de",
    // US Government cloud
    AzureUsGovernment: "https://login.microsoftonline.us",
};

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Extract token by decoding the rawToken
 *
 * @param encodedToken
 */
function extractTokenClaims(encodedToken, base64Decode) {
    const jswPayload = getJWSPayload(encodedToken);
    // token will be decoded to get the username
    try {
        // base64Decode() should throw an error if there is an issue
        const base64Decoded = base64Decode(jswPayload);
        return JSON.parse(base64Decoded);
    }
    catch (err) {
        throw createClientAuthError(tokenParsingError);
    }
}
/**
 * decode a JWT
 *
 * @param authToken
 */
function getJWSPayload(authToken) {
    if (!authToken) {
        throw createClientAuthError(nullOrEmptyToken);
    }
    const tokenPartsRegex = /^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/;
    const matches = tokenPartsRegex.exec(authToken);
    if (!matches || matches.length < 4) {
        throw createClientAuthError(tokenParsingError);
    }
    /**
     * const crackedToken = {
     *  header: matches[1],
     *  JWSPayload: matches[2],
     *  JWSSig: matches[3],
     * };
     */
    return matches[2];
}
/**
 * Determine if the token's max_age has transpired
 */
function checkMaxAge(authTime, maxAge) {
    /*
     * per https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest
     * To force an immediate re-authentication: If an app requires that a user re-authenticate prior to access,
     * provide a value of 0 for the max_age parameter and the AS will force a fresh login.
     */
    const fiveMinuteSkew = 300000; // five minutes in milliseconds
    if (maxAge === 0 || Date.now() - fiveMinuteSkew > authTime + maxAge) {
        throw createClientAuthError(maxAgeTranspired);
    }
}

/*! @azure/msal-common v14.16.0 2024-11-05 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Utility functions for managing date and time operations.
 */
/**
 * return the current time in Unix time (seconds).
 */
function nowSeconds() {
    // Date.getTime() returns in milliseconds.
    return Math.round(new Date().getTime() / 1000.0);
}
/**
 * check if a token is expired based on given UTC time in seconds.
 * @param expiresOn
 */
function isTokenExpired(expiresOn, offset) {
    // check for access token expiry
    const expirationSec = Number(expiresOn) || 0;
    const offsetCurrentTimeSec = nowSeconds() + offset;
    // If current time + offset is greater than token expiration time, then token is expired.
    return offsetCurrentTimeSec > expirationSec;
}
/**
 * If the current time is earlier than the time that a token was cached at, we must discard the token
 * i.e. The system clock was turned back after acquiring the cached token
 * @param cachedAt
 * @param offset
 */
function wasClockTurnedBack(cachedAt) {
    const cachedAtSec = Number(cachedAt);
    return cachedAtSec > nowSeconds();
}

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Cache Key: <home_account_id>-<environment>-<credential_type>-<client_id or familyId>-<realm>-<scopes>-<claims hash>-<scheme>
 * IdToken Example: uid.utid-login.microsoftonline.com-idtoken-app_client_id-contoso.com
 * AccessToken Example: uid.utid-login.microsoftonline.com-accesstoken-app_client_id-contoso.com-scope1 scope2--pop
 * RefreshToken Example: uid.utid-login.microsoftonline.com-refreshtoken-1-contoso.com
 * @param credentialEntity
 * @returns
 */
function generateCredentialKey(credentialEntity) {
    const credentialKey = [
        generateAccountId(credentialEntity),
        generateCredentialId(credentialEntity),
        generateTarget(credentialEntity),
        generateClaimsHash(credentialEntity),
        generateScheme(credentialEntity),
    ];
    return credentialKey.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
}
/**
 * Create IdTokenEntity
 * @param homeAccountId
 * @param authenticationResult
 * @param clientId
 * @param authority
 */
function createIdTokenEntity(homeAccountId, environment, idToken, clientId, tenantId) {
    const idTokenEntity = {
        credentialType: CredentialType.ID_TOKEN,
        homeAccountId: homeAccountId,
        environment: environment,
        clientId: clientId,
        secret: idToken,
        realm: tenantId,
    };
    return idTokenEntity;
}
/**
 * Create AccessTokenEntity
 * @param homeAccountId
 * @param environment
 * @param accessToken
 * @param clientId
 * @param tenantId
 * @param scopes
 * @param expiresOn
 * @param extExpiresOn
 */
function createAccessTokenEntity(homeAccountId, environment, accessToken, clientId, tenantId, scopes, expiresOn, extExpiresOn, base64Decode, refreshOn, tokenType, userAssertionHash, keyId, requestedClaims, requestedClaimsHash) {
    const atEntity = {
        homeAccountId: homeAccountId,
        credentialType: CredentialType.ACCESS_TOKEN,
        secret: accessToken,
        cachedAt: nowSeconds().toString(),
        expiresOn: expiresOn.toString(),
        extendedExpiresOn: extExpiresOn.toString(),
        environment: environment,
        clientId: clientId,
        realm: tenantId,
        target: scopes,
        tokenType: tokenType || AuthenticationScheme.BEARER,
    };
    if (userAssertionHash) {
        atEntity.userAssertionHash = userAssertionHash;
    }
    if (refreshOn) {
        atEntity.refreshOn = refreshOn.toString();
    }
    if (requestedClaims) {
        atEntity.requestedClaims = requestedClaims;
        atEntity.requestedClaimsHash = requestedClaimsHash;
    }
    /*
     * Create Access Token With Auth Scheme instead of regular access token
     * Cast to lower to handle "bearer" from ADFS
     */
    if (atEntity.tokenType?.toLowerCase() !==
        AuthenticationScheme.BEARER.toLowerCase()) {
        atEntity.credentialType = CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME;
        switch (atEntity.tokenType) {
            case AuthenticationScheme.POP:
                // Make sure keyId is present and add it to credential
                const tokenClaims = extractTokenClaims(accessToken, base64Decode);
                if (!tokenClaims?.cnf?.kid) {
                    throw createClientAuthError(tokenClaimsCnfRequiredForSignedJwt);
                }
                atEntity.keyId = tokenClaims.cnf.kid;
                break;
            case AuthenticationScheme.SSH:
                atEntity.keyId = keyId;
        }
    }
    return atEntity;
}
/**
 * Create RefreshTokenEntity
 * @param homeAccountId
 * @param authenticationResult
 * @param clientId
 * @param authority
 */
function createRefreshTokenEntity(homeAccountId, environment, refreshToken, clientId, familyId, userAssertionHash, expiresOn) {
    const rtEntity = {
        credentialType: CredentialType.REFRESH_TOKEN,
        homeAccountId: homeAccountId,
        environment: environment,
        clientId: clientId,
        secret: refreshToken,
    };
    if (userAssertionHash) {
        rtEntity.userAssertionHash = userAssertionHash;
    }
    if (familyId) {
        rtEntity.familyId = familyId;
    }
    if (expiresOn) {
        rtEntity.expiresOn = expiresOn.toString();
    }
    return rtEntity;
}
function isCredentialEntity(entity) {
    return (entity.hasOwnProperty("homeAccountId") &&
        entity.hasOwnProperty("environment") &&
        entity.hasOwnProperty("credentialType") &&
        entity.hasOwnProperty("clientId") &&
        entity.hasOwnProperty("secret"));
}
/**
 * Validates an entity: checks for all expected params
 * @param entity
 */
function isAccessTokenEntity(entity) {
    if (!entity) {
        return false;
    }
    return (isCredentialEntity(entity) &&
        entity.hasOwnProperty("realm") &&
        entity.hasOwnProperty("target") &&
        (entity["credentialType"] === CredentialType.ACCESS_TOKEN ||
            entity["credentialType"] ===
                CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME));
}
/**
 * Validates an entity: checks for all expected params
 * @param entity
 */
function isIdTokenEntity(entity) {
    if (!entity) {
        return false;
    }
    return (isCredentialEntity(entity) &&
        entity.hasOwnProperty("realm") &&
        entity["credentialType"] === CredentialType.ID_TOKEN);
}
/**
 * Validates an entity: checks for all expected params
 * @param entity
 */
function isRefreshTokenEntity(entity) {
    if (!entity) {
        return false;
    }
    return (isCredentialEntity(entity) &&
        entity["credentialType"] === CredentialType.REFRESH_TOKEN);
}
/**
 * Generate Account Id key component as per the schema: <home_account_id>-<environment>
 */
function generateAccountId(credentialEntity) {
    const accountId = [
        credentialEntity.homeAccountId,
        credentialEntity.environment,
    ];
    return accountId.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
}
/**
 * Generate Credential Id key component as per the schema: <credential_type>-<client_id>-<realm>
 */
function generateCredentialId(credentialEntity) {
    const clientOrFamilyId = credentialEntity.credentialType === CredentialType.REFRESH_TOKEN
        ? credentialEntity.familyId || credentialEntity.clientId
        : credentialEntity.clientId;
    const credentialId = [
        credentialEntity.credentialType,
        clientOrFamilyId,
        credentialEntity.realm || "",
    ];
    return credentialId.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
}
/**
 * Generate target key component as per schema: <target>
 */
function generateTarget(credentialEntity) {
    return (credentialEntity.target || "").toLowerCase();
}
/**
 * Generate requested claims key component as per schema: <requestedClaims>
 */
function generateClaimsHash(credentialEntity) {
    return (credentialEntity.requestedClaimsHash || "").toLowerCase();
}
/**
 * Generate scheme key componenet as per schema: <scheme>
 */
function generateScheme(credentialEntity) {
    /*
     * PoP Tokens and SSH certs include scheme in cache key
     * Cast to lowercase to handle "bearer" from ADFS
     */
    return credentialEntity.tokenType &&
        credentialEntity.tokenType.toLowerCase() !==
            AuthenticationScheme.BEARER.toLowerCase()
        ? credentialEntity.tokenType.toLowerCase()
        : "";
}
/**
 * validates if a given cache entry is "Telemetry", parses <key,value>
 * @param key
 * @param entity
 */
function isServerTelemetryEntity(key, entity) {
    const validateKey = key.indexOf(SERVER_TELEM_CONSTANTS.CACHE_KEY) === 0;
    let validateEntity = true;
    if (entity) {
        validateEntity =
            entity.hasOwnProperty("failedRequests") &&
                entity.hasOwnProperty("errors") &&
                entity.hasOwnProperty("cacheHits");
    }
    return validateKey && validateEntity;
}
/**
 * validates if a given cache entry is "Throttling", parses <key,value>
 * @param key
 * @param entity
 */
function isThrottlingEntity(key, entity) {
    let validateKey = false;
    if (key) {
        validateKey = key.indexOf(ThrottlingConstants.THROTTLING_PREFIX) === 0;
    }
    let validateEntity = true;
    if (entity) {
        validateEntity = entity.hasOwnProperty("throttleTime");
    }
    return validateKey && validateEntity;
}
/**
 * Generate AppMetadata Cache Key as per the schema: appmetadata-<environment>-<client_id>
 */
function generateAppMetadataKey({ environment, clientId, }) {
    const appMetaDataKeyArray = [
        APP_METADATA,
        environment,
        clientId,
    ];
    return appMetaDataKeyArray
        .join(Separators.CACHE_KEY_SEPARATOR)
        .toLowerCase();
}
/*
 * Validates an entity: checks for all expected params
 * @param entity
 */
function isAppMetadataEntity(key, entity) {
    if (!entity) {
        return false;
    }
    return (key.indexOf(APP_METADATA) === 0 &&
        entity.hasOwnProperty("clientId") &&
        entity.hasOwnProperty("environment"));
}
/**
 * Validates an entity: checks for all expected params
 * @param entity
 */
function isAuthorityMetadataEntity(key, entity) {
    if (!entity) {
        return false;
    }
    return (key.indexOf(AUTHORITY_METADATA_CONSTANTS.CACHE_KEY) === 0 &&
        entity.hasOwnProperty("aliases") &&
        entity.hasOwnProperty("preferred_cache") &&
        entity.hasOwnProperty("preferred_network") &&
        entity.hasOwnProperty("canonical_authority") &&
        entity.hasOwnProperty("authorization_endpoint") &&
        entity.hasOwnProperty("token_endpoint") &&
        entity.hasOwnProperty("issuer") &&
        entity.hasOwnProperty("aliasesFromNetwork") &&
        entity.hasOwnProperty("endpointsFromNetwork") &&
        entity.hasOwnProperty("expiresAt") &&
        entity.hasOwnProperty("jwks_uri"));
}
/**
 * Reset the exiresAt value
 */
function generateAuthorityMetadataExpiresAt() {
    return (nowSeconds() +
        AUTHORITY_METADATA_CONSTANTS.REFRESH_TIME_SECONDS);
}
function updateAuthorityEndpointMetadata(authorityMetadata, updatedValues, fromNetwork) {
    authorityMetadata.authorization_endpoint =
        updatedValues.authorization_endpoint;
    authorityMetadata.token_endpoint = updatedValues.token_endpoint;
    authorityMetadata.end_session_endpoint = updatedValues.end_session_endpoint;
    authorityMetadata.issuer = updatedValues.issuer;
    authorityMetadata.endpointsFromNetwork = fromNetwork;
    authorityMetadata.jwks_uri = updatedValues.jwks_uri;
}
function updateCloudDiscoveryMetadata(authorityMetadata, updatedValues, fromNetwork) {
    authorityMetadata.aliases = updatedValues.aliases;
    authorityMetadata.preferred_cache = updatedValues.preferred_cache;
    authorityMetadata.preferred_network = updatedValues.preferred_network;
    authorityMetadata.aliasesFromNetwork = fromNetwork;
}
/**
 * Returns whether or not the data needs to be refreshed
 */
function isAuthorityMetadataExpired(metadata) {
    return metadata.expiresAt <= nowSeconds();
}

/*! @azure/msal-common v14.16.0 2024-11-05 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const redirectUriEmpty = "redirect_uri_empty";
const claimsRequestParsingError = "claims_request_parsing_error";
const authorityUriInsecure = "authority_uri_insecure";
const urlParseError = "url_parse_error";
const urlEmptyError = "empty_url_error";
const emptyInputScopesError = "empty_input_scopes_error";
const invalidPromptValue = "invalid_prompt_value";
const invalidClaims = "invalid_claims";
const tokenRequestEmpty = "token_request_empty";
const logoutRequestEmpty = "logout_request_empty";
const invalidCodeChallengeMethod = "invalid_code_challenge_method";
const pkceParamsMissing = "pkce_params_missing";
const invalidCloudDiscoveryMetadata = "invalid_cloud_discovery_metadata";
const invalidAuthorityMetadata = "invalid_authority_metadata";
const untrustedAuthority = "untrusted_authority";
const missingSshJwk = "missing_ssh_jwk";
const missingSshKid = "missing_ssh_kid";
const missingNonceAuthenticationHeader = "missing_nonce_authentication_header";
const invalidAuthenticationHeader = "invalid_authentication_header";
const cannotSetOIDCOptions = "cannot_set_OIDCOptions";
const cannotAllowNativeBroker = "cannot_allow_native_broker";
const authorityMismatch = "authority_mismatch";

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const ClientConfigurationErrorMessages = {
    [redirectUriEmpty]: "A redirect URI is required for all calls, and none has been set.",
    [claimsRequestParsingError]: "Could not parse the given claims request object.",
    [authorityUriInsecure]: "Authority URIs must use https.  Please see here for valid authority configuration options: https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-js-initializing-client-applications#configuration-options",
    [urlParseError]: "URL could not be parsed into appropriate segments.",
    [urlEmptyError]: "URL was empty or null.",
    [emptyInputScopesError]: "Scopes cannot be passed as null, undefined or empty array because they are required to obtain an access token.",
    [invalidPromptValue]: "Please see here for valid configuration options: https://azuread.github.io/microsoft-authentication-library-for-js/ref/modules/_azure_msal_common.html#commonauthorizationurlrequest",
    [invalidClaims]: "Given claims parameter must be a stringified JSON object.",
    [tokenRequestEmpty]: "Token request was empty and not found in cache.",
    [logoutRequestEmpty]: "The logout request was null or undefined.",
    [invalidCodeChallengeMethod]: 'code_challenge_method passed is invalid. Valid values are "plain" and "S256".',
    [pkceParamsMissing]: "Both params: code_challenge and code_challenge_method are to be passed if to be sent in the request",
    [invalidCloudDiscoveryMetadata]: "Invalid cloudDiscoveryMetadata provided. Must be a stringified JSON object containing tenant_discovery_endpoint and metadata fields",
    [invalidAuthorityMetadata]: "Invalid authorityMetadata provided. Must by a stringified JSON object containing authorization_endpoint, token_endpoint, issuer fields.",
    [untrustedAuthority]: "The provided authority is not a trusted authority. Please include this authority in the knownAuthorities config parameter.",
    [missingSshJwk]: "Missing sshJwk in SSH certificate request. A stringified JSON Web Key is required when using the SSH authentication scheme.",
    [missingSshKid]: "Missing sshKid in SSH certificate request. A string that uniquely identifies the public SSH key is required when using the SSH authentication scheme.",
    [missingNonceAuthenticationHeader]: "Unable to find an authentication header containing server nonce. Either the Authentication-Info or WWW-Authenticate headers must be present in order to obtain a server nonce.",
    [invalidAuthenticationHeader]: "Invalid authentication header provided",
    [cannotSetOIDCOptions]: "Cannot set OIDCOptions parameter. Please change the protocol mode to OIDC or use a non-Microsoft authority.",
    [cannotAllowNativeBroker]: "Cannot set allowNativeBroker parameter to true when not in AAD protocol mode.",
    [authorityMismatch]: "Authority mismatch error. Authority provided in login request or PublicClientApplication config does not match the environment of the provided account. Please use a matching account or make an interactive request to login to this authority.",
};
/**
 * Error thrown when there is an error in configuration of the MSAL.js library.
 */
class ClientConfigurationError extends AuthError {
    constructor(errorCode) {
        super(errorCode, ClientConfigurationErrorMessages[errorCode]);
        this.name = "ClientConfigurationError";
        Object.setPrototypeOf(this, ClientConfigurationError.prototype);
    }
}
function createClientConfigurationError(errorCode) {
    return new ClientConfigurationError(errorCode);
}

/*! @azure/msal-common v14.16.0 2024-11-05 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * @hidden
 */
class StringUtils {
    /**
     * Check if stringified object is empty
     * @param strObj
     */
    static isEmptyObj(strObj) {
        if (strObj) {
            try {
                const obj = JSON.parse(strObj);
                return Object.keys(obj).length === 0;
            }
            catch (e) { }
        }
        return true;
    }
    static startsWith(str, search) {
        return str.indexOf(search) === 0;
    }
    static endsWith(str, search) {
        return (str.length >= search.length &&
            str.lastIndexOf(search) === str.length - search.length);
    }
    /**
     * Parses string into an object.
     *
     * @param query
     */
    static queryStringToObject(query) {
        const obj = {};
        const params = query.split("&");
        const decode = (s) => decodeURIComponent(s.replace(/\+/g, " "));
        params.forEach((pair) => {
            if (pair.trim()) {
                const [key, value] = pair.split(/=(.+)/g, 2); // Split on the first occurence of the '=' character
                if (key && value) {
                    obj[decode(key)] = decode(value);
                }
            }
        });
        return obj;
    }
    /**
     * Trims entries in an array.
     *
     * @param arr
     */
    static trimArrayEntries(arr) {
        return arr.map((entry) => entry.trim());
    }
    /**
     * Removes empty strings from array
     * @param arr
     */
    static removeEmptyStringsFromArray(arr) {
        return arr.filter((entry) => {
            return !!entry;
        });
    }
    /**
     * Attempts to parse a string into JSON
     * @param str
     */
    static jsonParseHelper(str) {
        try {
            return JSON.parse(str);
        }
        catch (e) {
            return null;
        }
    }
    /**
     * Tests if a given string matches a given pattern, with support for wildcards and queries.
     * @param pattern Wildcard pattern to string match. Supports "*" for wildcards and "?" for queries
     * @param input String to match against
     */
    static matchPattern(pattern, input) {
        /**
         * Wildcard support: https://stackoverflow.com/a/3117248/4888559
         * Queries: replaces "?" in string with escaped "\?" for regex test
         */
        // eslint-disable-next-line security/detect-non-literal-regexp
        const regex = new RegExp(pattern
            .replace(/\\/g, "\\\\")
            .replace(/\*/g, "[^ ]*")
            .replace(/\?/g, "\\?"));
        return regex.test(input);
    }
}

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * The ScopeSet class creates a set of scopes. Scopes are case-insensitive, unique values, so the Set object in JS makes
 * the most sense to implement for this class. All scopes are trimmed and converted to lower case strings in intersection and union functions
 * to ensure uniqueness of strings.
 */
class ScopeSet {
    constructor(inputScopes) {
        // Filter empty string and null/undefined array items
        const scopeArr = inputScopes
            ? StringUtils.trimArrayEntries([...inputScopes])
            : [];
        const filteredInput = scopeArr
            ? StringUtils.removeEmptyStringsFromArray(scopeArr)
            : [];
        // Validate and filter scopes (validate function throws if validation fails)
        this.validateInputScopes(filteredInput);
        this.scopes = new Set(); // Iterator in constructor not supported by IE11
        filteredInput.forEach((scope) => this.scopes.add(scope));
    }
    /**
     * Factory method to create ScopeSet from space-delimited string
     * @param inputScopeString
     * @param appClientId
     * @param scopesRequired
     */
    static fromString(inputScopeString) {
        const scopeString = inputScopeString || Constants$1.EMPTY_STRING;
        const inputScopes = scopeString.split(" ");
        return new ScopeSet(inputScopes);
    }
    /**
     * Creates the set of scopes to search for in cache lookups
     * @param inputScopeString
     * @returns
     */
    static createSearchScopes(inputScopeString) {
        const scopeSet = new ScopeSet(inputScopeString);
        if (!scopeSet.containsOnlyOIDCScopes()) {
            scopeSet.removeOIDCScopes();
        }
        else {
            scopeSet.removeScope(Constants$1.OFFLINE_ACCESS_SCOPE);
        }
        return scopeSet;
    }
    /**
     * Used to validate the scopes input parameter requested  by the developer.
     * @param {Array<string>} inputScopes - Developer requested permissions. Not all scopes are guaranteed to be included in the access token returned.
     * @param {boolean} scopesRequired - Boolean indicating whether the scopes array is required or not
     */
    validateInputScopes(inputScopes) {
        // Check if scopes are required but not given or is an empty array
        if (!inputScopes || inputScopes.length < 1) {
            throw createClientConfigurationError(emptyInputScopesError);
        }
    }
    /**
     * Check if a given scope is present in this set of scopes.
     * @param scope
     */
    containsScope(scope) {
        const lowerCaseScopes = this.printScopesLowerCase().split(" ");
        const lowerCaseScopesSet = new ScopeSet(lowerCaseScopes);
        // compare lowercase scopes
        return scope
            ? lowerCaseScopesSet.scopes.has(scope.toLowerCase())
            : false;
    }
    /**
     * Check if a set of scopes is present in this set of scopes.
     * @param scopeSet
     */
    containsScopeSet(scopeSet) {
        if (!scopeSet || scopeSet.scopes.size <= 0) {
            return false;
        }
        return (this.scopes.size >= scopeSet.scopes.size &&
            scopeSet.asArray().every((scope) => this.containsScope(scope)));
    }
    /**
     * Check if set of scopes contains only the defaults
     */
    containsOnlyOIDCScopes() {
        let defaultScopeCount = 0;
        OIDC_SCOPES.forEach((defaultScope) => {
            if (this.containsScope(defaultScope)) {
                defaultScopeCount += 1;
            }
        });
        return this.scopes.size === defaultScopeCount;
    }
    /**
     * Appends single scope if passed
     * @param newScope
     */
    appendScope(newScope) {
        if (newScope) {
            this.scopes.add(newScope.trim());
        }
    }
    /**
     * Appends multiple scopes if passed
     * @param newScopes
     */
    appendScopes(newScopes) {
        try {
            newScopes.forEach((newScope) => this.appendScope(newScope));
        }
        catch (e) {
            throw createClientAuthError(cannotAppendScopeSet);
        }
    }
    /**
     * Removes element from set of scopes.
     * @param scope
     */
    removeScope(scope) {
        if (!scope) {
            throw createClientAuthError(cannotRemoveEmptyScope);
        }
        this.scopes.delete(scope.trim());
    }
    /**
     * Removes default scopes from set of scopes
     * Primarily used to prevent cache misses if the default scopes are not returned from the server
     */
    removeOIDCScopes() {
        OIDC_SCOPES.forEach((defaultScope) => {
            this.scopes.delete(defaultScope);
        });
    }
    /**
     * Combines an array of scopes with the current set of scopes.
     * @param otherScopes
     */
    unionScopeSets(otherScopes) {
        if (!otherScopes) {
            throw createClientAuthError(emptyInputScopeSet);
        }
        const unionScopes = new Set(); // Iterator in constructor not supported in IE11
        otherScopes.scopes.forEach((scope) => unionScopes.add(scope.toLowerCase()));
        this.scopes.forEach((scope) => unionScopes.add(scope.toLowerCase()));
        return unionScopes;
    }
    /**
     * Check if scopes intersect between this set and another.
     * @param otherScopes
     */
    intersectingScopeSets(otherScopes) {
        if (!otherScopes) {
            throw createClientAuthError(emptyInputScopeSet);
        }
        // Do not allow OIDC scopes to be the only intersecting scopes
        if (!otherScopes.containsOnlyOIDCScopes()) {
            otherScopes.removeOIDCScopes();
        }
        const unionScopes = this.unionScopeSets(otherScopes);
        const sizeOtherScopes = otherScopes.getScopeCount();
        const sizeThisScopes = this.getScopeCount();
        const sizeUnionScopes = unionScopes.size;
        return sizeUnionScopes < sizeThisScopes + sizeOtherScopes;
    }
    /**
     * Returns size of set of scopes.
     */
    getScopeCount() {
        return this.scopes.size;
    }
    /**
     * Returns the scopes as an array of string values
     */
    asArray() {
        const array = [];
        this.scopes.forEach((val) => array.push(val));
        return array;
    }
    /**
     * Prints scopes into a space-delimited string
     */
    printScopes() {
        if (this.scopes) {
            const scopeArr = this.asArray();
            return scopeArr.join(" ");
        }
        return Constants$1.EMPTY_STRING;
    }
    /**
     * Prints scopes into a space-delimited lower-case string (used for caching)
     */
    printScopesLowerCase() {
        return this.printScopes().toLowerCase();
    }
}

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Function to build a client info object from server clientInfo string
 * @param rawClientInfo
 * @param crypto
 */
function buildClientInfo(rawClientInfo, base64Decode) {
    if (!rawClientInfo) {
        throw createClientAuthError(clientInfoEmptyError);
    }
    try {
        const decodedClientInfo = base64Decode(rawClientInfo);
        return JSON.parse(decodedClientInfo);
    }
    catch (e) {
        throw createClientAuthError(clientInfoDecodingError);
    }
}
/**
 * Function to build a client info object from cached homeAccountId string
 * @param homeAccountId
 */
function buildClientInfoFromHomeAccountId(homeAccountId) {
    if (!homeAccountId) {
        throw createClientAuthError(clientInfoDecodingError);
    }
    const clientInfoParts = homeAccountId.split(Separators.CLIENT_INFO_SEPARATOR, 2);
    return {
        uid: clientInfoParts[0],
        utid: clientInfoParts.length < 2
            ? Constants$1.EMPTY_STRING
            : clientInfoParts[1],
    };
}

/*! @azure/msal-common v14.16.0 2024-11-05 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Returns true if tenantId matches the utid portion of homeAccountId
 * @param tenantId
 * @param homeAccountId
 * @returns
 */
function tenantIdMatchesHomeTenant(tenantId, homeAccountId) {
    return (!!tenantId &&
        !!homeAccountId &&
        tenantId === homeAccountId.split(".")[1]);
}
/**
 * Build tenant profile
 * @param homeAccountId - Home account identifier for this account object
 * @param localAccountId - Local account identifer for this account object
 * @param tenantId - Full tenant or organizational id that this account belongs to
 * @param idTokenClaims - Claims from the ID token
 * @returns
 */
function buildTenantProfile(homeAccountId, localAccountId, tenantId, idTokenClaims) {
    if (idTokenClaims) {
        const { oid, sub, tid, name, tfp, acr } = idTokenClaims;
        /**
         * Since there is no way to determine if the authority is AAD or B2C, we exhaust all the possible claims that can serve as tenant ID with the following precedence:
         * tid - TenantID claim that identifies the tenant that issued the token in AAD. Expected in all AAD ID tokens, not present in B2C ID Tokens.
         * tfp - Trust Framework Policy claim that identifies the policy that was used to authenticate the user. Functions as tenant for B2C scenarios.
         * acr - Authentication Context Class Reference claim used only with older B2C policies. Fallback in case tfp is not present, but likely won't be present anyway.
         */
        const tenantId = tid || tfp || acr || "";
        return {
            tenantId: tenantId,
            localAccountId: oid || sub || "",
            name: name,
            isHomeTenant: tenantIdMatchesHomeTenant(tenantId, homeAccountId),
        };
    }
    else {
        return {
            tenantId,
            localAccountId,
            isHomeTenant: tenantIdMatchesHomeTenant(tenantId, homeAccountId),
        };
    }
}
/**
 * Replaces account info that varies by tenant profile sourced from the ID token claims passed in with the tenant-specific account info
 * @param baseAccountInfo
 * @param idTokenClaims
 * @returns
 */
function updateAccountTenantProfileData(baseAccountInfo, tenantProfile, idTokenClaims, idTokenSecret) {
    let updatedAccountInfo = baseAccountInfo;
    // Tenant Profile overrides passed in account info
    if (tenantProfile) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { isHomeTenant, ...tenantProfileOverride } = tenantProfile;
        updatedAccountInfo = { ...baseAccountInfo, ...tenantProfileOverride };
    }
    // ID token claims override passed in account info and tenant profile
    if (idTokenClaims) {
        // Ignore isHomeTenant, loginHint, and sid which are part of tenant profile but not base account info
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { isHomeTenant, ...claimsSourcedTenantProfile } = buildTenantProfile(baseAccountInfo.homeAccountId, baseAccountInfo.localAccountId, baseAccountInfo.tenantId, idTokenClaims);
        updatedAccountInfo = {
            ...updatedAccountInfo,
            ...claimsSourcedTenantProfile,
            idTokenClaims: idTokenClaims,
            idToken: idTokenSecret,
        };
        return updatedAccountInfo;
    }
    return updatedAccountInfo;
}

/*! @azure/msal-common v14.16.0 2024-11-05 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Authority types supported by MSAL.
 */
const AuthorityType = {
    Default: 0,
    Adfs: 1,
    Dsts: 2,
    Ciam: 3,
};

/*! @azure/msal-common v14.16.0 2024-11-05 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Gets tenantId from available ID token claims to set as credential realm with the following precedence:
 * 1. tid - if the token is acquired from an Azure AD tenant tid will be present
 * 2. tfp - if the token is acquired from a modern B2C tenant tfp should be present
 * 3. acr - if the token is acquired from a legacy B2C tenant acr should be present
 * Downcased to match the realm case-insensitive comparison requirements
 * @param idTokenClaims
 * @returns
 */
function getTenantIdFromIdTokenClaims(idTokenClaims) {
    if (idTokenClaims) {
        const tenantId = idTokenClaims.tid || idTokenClaims.tfp || idTokenClaims.acr;
        return tenantId || null;
    }
    return null;
}

/*! @azure/msal-common v14.16.0 2024-11-05 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Protocol modes supported by MSAL.
 */
const ProtocolMode = {
    AAD: "AAD",
    OIDC: "OIDC",
};

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Type that defines required and optional parameters for an Account field (based on universal cache schema implemented by all MSALs).
 *
 * Key : Value Schema
 *
 * Key: <home_account_id>-<environment>-<realm*>
 *
 * Value Schema:
 * {
 *      homeAccountId: home account identifier for the auth scheme,
 *      environment: entity that issued the token, represented as a full host
 *      realm: Full tenant or organizational identifier that the account belongs to
 *      localAccountId: Original tenant-specific accountID, usually used for legacy cases
 *      username: primary username that represents the user, usually corresponds to preferred_username in the v2 endpt
 *      authorityType: Accounts authority type as a string
 *      name: Full name for the account, including given name and family name,
 *      lastModificationTime: last time this entity was modified in the cache
 *      lastModificationApp:
 *      nativeAccountId: Account identifier on the native device
 *      tenantProfiles: Array of tenant profile objects for each tenant that the account has authenticated with in the browser
 * }
 * @internal
 */
class AccountEntity {
    /**
     * Generate Account Id key component as per the schema: <home_account_id>-<environment>
     */
    generateAccountId() {
        const accountId = [this.homeAccountId, this.environment];
        return accountId.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
    }
    /**
     * Generate Account Cache Key as per the schema: <home_account_id>-<environment>-<realm*>
     */
    generateAccountKey() {
        return AccountEntity.generateAccountCacheKey({
            homeAccountId: this.homeAccountId,
            environment: this.environment,
            tenantId: this.realm,
            username: this.username,
            localAccountId: this.localAccountId,
        });
    }
    /**
     * Returns the AccountInfo interface for this account.
     */
    getAccountInfo() {
        return {
            homeAccountId: this.homeAccountId,
            environment: this.environment,
            tenantId: this.realm,
            username: this.username,
            localAccountId: this.localAccountId,
            name: this.name,
            nativeAccountId: this.nativeAccountId,
            authorityType: this.authorityType,
            // Deserialize tenant profiles array into a Map
            tenantProfiles: new Map((this.tenantProfiles || []).map((tenantProfile) => {
                return [tenantProfile.tenantId, tenantProfile];
            })),
        };
    }
    /**
     * Returns true if the account entity is in single tenant format (outdated), false otherwise
     */
    isSingleTenant() {
        return !this.tenantProfiles;
    }
    /**
     * Generates account key from interface
     * @param accountInterface
     */
    static generateAccountCacheKey(accountInterface) {
        const homeTenantId = accountInterface.homeAccountId.split(".")[1];
        const accountKey = [
            accountInterface.homeAccountId,
            accountInterface.environment || "",
            homeTenantId || accountInterface.tenantId || "",
        ];
        return accountKey.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
    }
    /**
     * Build Account cache from IdToken, clientInfo and authority/policy. Associated with AAD.
     * @param accountDetails
     */
    static createAccount(accountDetails, authority, base64Decode) {
        const account = new AccountEntity();
        if (authority.authorityType === AuthorityType.Adfs) {
            account.authorityType = CacheAccountType.ADFS_ACCOUNT_TYPE;
        }
        else if (authority.protocolMode === ProtocolMode.AAD) {
            account.authorityType = CacheAccountType.MSSTS_ACCOUNT_TYPE;
        }
        else {
            account.authorityType = CacheAccountType.GENERIC_ACCOUNT_TYPE;
        }
        let clientInfo;
        if (accountDetails.clientInfo && base64Decode) {
            clientInfo = buildClientInfo(accountDetails.clientInfo, base64Decode);
        }
        account.clientInfo = accountDetails.clientInfo;
        account.homeAccountId = accountDetails.homeAccountId;
        account.nativeAccountId = accountDetails.nativeAccountId;
        const env = accountDetails.environment ||
            (authority && authority.getPreferredCache());
        if (!env) {
            throw createClientAuthError(invalidCacheEnvironment);
        }
        account.environment = env;
        // non AAD scenarios can have empty realm
        account.realm =
            clientInfo?.utid ||
                getTenantIdFromIdTokenClaims(accountDetails.idTokenClaims) ||
                "";
        // How do you account for MSA CID here?
        account.localAccountId =
            clientInfo?.uid ||
                accountDetails.idTokenClaims?.oid ||
                accountDetails.idTokenClaims?.sub ||
                "";
        /*
         * In B2C scenarios the emails claim is used instead of preferred_username and it is an array.
         * In most cases it will contain a single email. This field should not be relied upon if a custom
         * policy is configured to return more than 1 email.
         */
        const preferredUsername = accountDetails.idTokenClaims?.preferred_username ||
            accountDetails.idTokenClaims?.upn;
        const email = accountDetails.idTokenClaims?.emails
            ? accountDetails.idTokenClaims.emails[0]
            : null;
        account.username = preferredUsername || email || "";
        account.name = accountDetails.idTokenClaims?.name || "";
        account.cloudGraphHostName = accountDetails.cloudGraphHostName;
        account.msGraphHost = accountDetails.msGraphHost;
        if (accountDetails.tenantProfiles) {
            account.tenantProfiles = accountDetails.tenantProfiles;
        }
        else {
            const tenantProfile = buildTenantProfile(accountDetails.homeAccountId, account.localAccountId, account.realm, accountDetails.idTokenClaims);
            account.tenantProfiles = [tenantProfile];
        }
        return account;
    }
    /**
     * Creates an AccountEntity object from AccountInfo
     * @param accountInfo
     * @param cloudGraphHostName
     * @param msGraphHost
     * @returns
     */
    static createFromAccountInfo(accountInfo, cloudGraphHostName, msGraphHost) {
        const account = new AccountEntity();
        account.authorityType =
            accountInfo.authorityType || CacheAccountType.GENERIC_ACCOUNT_TYPE;
        account.homeAccountId = accountInfo.homeAccountId;
        account.localAccountId = accountInfo.localAccountId;
        account.nativeAccountId = accountInfo.nativeAccountId;
        account.realm = accountInfo.tenantId;
        account.environment = accountInfo.environment;
        account.username = accountInfo.username;
        account.name = accountInfo.name;
        account.cloudGraphHostName = cloudGraphHostName;
        account.msGraphHost = msGraphHost;
        // Serialize tenant profiles map into an array
        account.tenantProfiles = Array.from(accountInfo.tenantProfiles?.values() || []);
        return account;
    }
    /**
     * Generate HomeAccountId from server response
     * @param serverClientInfo
     * @param authType
     */
    static generateHomeAccountId(serverClientInfo, authType, logger, cryptoObj, idTokenClaims) {
        // since ADFS/DSTS do not have tid and does not set client_info
        if (!(authType === AuthorityType.Adfs ||
            authType === AuthorityType.Dsts)) {
            // for cases where there is clientInfo
            if (serverClientInfo) {
                try {
                    const clientInfo = buildClientInfo(serverClientInfo, cryptoObj.base64Decode);
                    if (clientInfo.uid && clientInfo.utid) {
                        return `${clientInfo.uid}.${clientInfo.utid}`;
                    }
                }
                catch (e) { }
            }
            logger.warning("No client info in response");
        }
        // default to "sub" claim
        return idTokenClaims?.sub || "";
    }
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    static isAccountEntity(entity) {
        if (!entity) {
            return false;
        }
        return (entity.hasOwnProperty("homeAccountId") &&
            entity.hasOwnProperty("environment") &&
            entity.hasOwnProperty("realm") &&
            entity.hasOwnProperty("localAccountId") &&
            entity.hasOwnProperty("username") &&
            entity.hasOwnProperty("authorityType"));
    }
    /**
     * Helper function to determine whether 2 accountInfo objects represent the same account
     * @param accountA
     * @param accountB
     * @param compareClaims - If set to true idTokenClaims will also be compared to determine account equality
     */
    static accountInfoIsEqual(accountA, accountB, compareClaims) {
        if (!accountA || !accountB) {
            return false;
        }
        let claimsMatch = true; // default to true so as to not fail comparison below if compareClaims: false
        if (compareClaims) {
            const accountAClaims = (accountA.idTokenClaims ||
                {});
            const accountBClaims = (accountB.idTokenClaims ||
                {});
            // issued at timestamp and nonce are expected to change each time a new id token is acquired
            claimsMatch =
                accountAClaims.iat === accountBClaims.iat &&
                    accountAClaims.nonce === accountBClaims.nonce;
        }
        return (accountA.homeAccountId === accountB.homeAccountId &&
            accountA.localAccountId === accountB.localAccountId &&
            accountA.username === accountB.username &&
            accountA.tenantId === accountB.tenantId &&
            accountA.environment === accountB.environment &&
            accountA.nativeAccountId === accountB.nativeAccountId &&
            claimsMatch);
    }
}

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Parses hash string from given string. Returns empty string if no hash symbol is found.
 * @param hashString
 */
function stripLeadingHashOrQuery(responseString) {
    if (responseString.startsWith("#/")) {
        return responseString.substring(2);
    }
    else if (responseString.startsWith("#") ||
        responseString.startsWith("?")) {
        return responseString.substring(1);
    }
    return responseString;
}
/**
 * Returns URL hash as server auth code response object.
 */
function getDeserializedResponse(responseString) {
    // Check if given hash is empty
    if (!responseString || responseString.indexOf("=") < 0) {
        return null;
    }
    try {
        // Strip the # or ? symbol if present
        const normalizedResponse = stripLeadingHashOrQuery(responseString);
        // If # symbol was not present, above will return empty string, so give original hash value
        const deserializedHash = Object.fromEntries(new URLSearchParams(normalizedResponse));
        // Check for known response properties
        if (deserializedHash.code ||
            deserializedHash.error ||
            deserializedHash.error_description ||
            deserializedHash.state) {
            return deserializedHash;
        }
    }
    catch (e) {
        throw createClientAuthError(hashNotDeserialized);
    }
    return null;
}

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Url object class which can perform various transformations on url strings.
 */
class UrlString {
    get urlString() {
        return this._urlString;
    }
    constructor(url) {
        this._urlString = url;
        if (!this._urlString) {
            // Throws error if url is empty
            throw createClientConfigurationError(urlEmptyError);
        }
        if (!url.includes("#")) {
            this._urlString = UrlString.canonicalizeUri(url);
        }
    }
    /**
     * Ensure urls are lower case and end with a / character.
     * @param url
     */
    static canonicalizeUri(url) {
        if (url) {
            let lowerCaseUrl = url.toLowerCase();
            if (StringUtils.endsWith(lowerCaseUrl, "?")) {
                lowerCaseUrl = lowerCaseUrl.slice(0, -1);
            }
            else if (StringUtils.endsWith(lowerCaseUrl, "?/")) {
                lowerCaseUrl = lowerCaseUrl.slice(0, -2);
            }
            if (!StringUtils.endsWith(lowerCaseUrl, "/")) {
                lowerCaseUrl += "/";
            }
            return lowerCaseUrl;
        }
        return url;
    }
    /**
     * Throws if urlString passed is not a valid authority URI string.
     */
    validateAsUri() {
        // Attempts to parse url for uri components
        let components;
        try {
            components = this.getUrlComponents();
        }
        catch (e) {
            throw createClientConfigurationError(urlParseError);
        }
        // Throw error if URI or path segments are not parseable.
        if (!components.HostNameAndPort || !components.PathSegments) {
            throw createClientConfigurationError(urlParseError);
        }
        // Throw error if uri is insecure.
        if (!components.Protocol ||
            components.Protocol.toLowerCase() !== "https:") {
            throw createClientConfigurationError(authorityUriInsecure);
        }
    }
    /**
     * Given a url and a query string return the url with provided query string appended
     * @param url
     * @param queryString
     */
    static appendQueryString(url, queryString) {
        if (!queryString) {
            return url;
        }
        return url.indexOf("?") < 0
            ? `${url}?${queryString}`
            : `${url}&${queryString}`;
    }
    /**
     * Returns a url with the hash removed
     * @param url
     */
    static removeHashFromUrl(url) {
        return UrlString.canonicalizeUri(url.split("#")[0]);
    }
    /**
     * Given a url like https://a:b/common/d?e=f#g, and a tenantId, returns https://a:b/tenantId/d
     * @param href The url
     * @param tenantId The tenant id to replace
     */
    replaceTenantPath(tenantId) {
        const urlObject = this.getUrlComponents();
        const pathArray = urlObject.PathSegments;
        if (tenantId &&
            pathArray.length !== 0 &&
            (pathArray[0] === AADAuthorityConstants.COMMON ||
                pathArray[0] === AADAuthorityConstants.ORGANIZATIONS)) {
            pathArray[0] = tenantId;
        }
        return UrlString.constructAuthorityUriFromObject(urlObject);
    }
    /**
     * Parses out the components from a url string.
     * @returns An object with the various components. Please cache this value insted of calling this multiple times on the same url.
     */
    getUrlComponents() {
        // https://gist.github.com/curtisz/11139b2cfcaef4a261e0
        const regEx = RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?");
        // If url string does not match regEx, we throw an error
        const match = this.urlString.match(regEx);
        if (!match) {
            throw createClientConfigurationError(urlParseError);
        }
        // Url component object
        const urlComponents = {
            Protocol: match[1],
            HostNameAndPort: match[4],
            AbsolutePath: match[5],
            QueryString: match[7],
        };
        let pathSegments = urlComponents.AbsolutePath.split("/");
        pathSegments = pathSegments.filter((val) => val && val.length > 0); // remove empty elements
        urlComponents.PathSegments = pathSegments;
        if (urlComponents.QueryString &&
            urlComponents.QueryString.endsWith("/")) {
            urlComponents.QueryString = urlComponents.QueryString.substring(0, urlComponents.QueryString.length - 1);
        }
        return urlComponents;
    }
    static getDomainFromUrl(url) {
        const regEx = RegExp("^([^:/?#]+://)?([^/?#]*)");
        const match = url.match(regEx);
        if (!match) {
            throw createClientConfigurationError(urlParseError);
        }
        return match[2];
    }
    static getAbsoluteUrl(relativeUrl, baseUrl) {
        if (relativeUrl[0] === Constants$1.FORWARD_SLASH) {
            const url = new UrlString(baseUrl);
            const baseComponents = url.getUrlComponents();
            return (baseComponents.Protocol +
                "//" +
                baseComponents.HostNameAndPort +
                relativeUrl);
        }
        return relativeUrl;
    }
    static constructAuthorityUriFromObject(urlObject) {
        return new UrlString(urlObject.Protocol +
            "//" +
            urlObject.HostNameAndPort +
            "/" +
            urlObject.PathSegments.join("/"));
    }
    /**
     * Check if the hash of the URL string contains known properties
     * @deprecated This API will be removed in a future version
     */
    static hashContainsKnownProperties(response) {
        return !!getDeserializedResponse(response);
    }
}

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const rawMetdataJSON = {
    endpointMetadata: {
        "login.microsoftonline.com": {
            token_endpoint: "https://login.microsoftonline.com/{tenantid}/oauth2/v2.0/token",
            jwks_uri: "https://login.microsoftonline.com/{tenantid}/discovery/v2.0/keys",
            issuer: "https://login.microsoftonline.com/{tenantid}/v2.0",
            authorization_endpoint: "https://login.microsoftonline.com/{tenantid}/oauth2/v2.0/authorize",
            end_session_endpoint: "https://login.microsoftonline.com/{tenantid}/oauth2/v2.0/logout",
        },
        "login.chinacloudapi.cn": {
            token_endpoint: "https://login.chinacloudapi.cn/{tenantid}/oauth2/v2.0/token",
            jwks_uri: "https://login.chinacloudapi.cn/{tenantid}/discovery/v2.0/keys",
            issuer: "https://login.partner.microsoftonline.cn/{tenantid}/v2.0",
            authorization_endpoint: "https://login.chinacloudapi.cn/{tenantid}/oauth2/v2.0/authorize",
            end_session_endpoint: "https://login.chinacloudapi.cn/{tenantid}/oauth2/v2.0/logout",
        },
        "login.microsoftonline.us": {
            token_endpoint: "https://login.microsoftonline.us/{tenantid}/oauth2/v2.0/token",
            jwks_uri: "https://login.microsoftonline.us/{tenantid}/discovery/v2.0/keys",
            issuer: "https://login.microsoftonline.us/{tenantid}/v2.0",
            authorization_endpoint: "https://login.microsoftonline.us/{tenantid}/oauth2/v2.0/authorize",
            end_session_endpoint: "https://login.microsoftonline.us/{tenantid}/oauth2/v2.0/logout",
        },
    },
    instanceDiscoveryMetadata: {
        tenant_discovery_endpoint: "https://{canonicalAuthority}/v2.0/.well-known/openid-configuration",
        metadata: [
            {
                preferred_network: "login.microsoftonline.com",
                preferred_cache: "login.windows.net",
                aliases: [
                    "login.microsoftonline.com",
                    "login.windows.net",
                    "login.microsoft.com",
                    "sts.windows.net",
                ],
            },
            {
                preferred_network: "login.partner.microsoftonline.cn",
                preferred_cache: "login.partner.microsoftonline.cn",
                aliases: [
                    "login.partner.microsoftonline.cn",
                    "login.chinacloudapi.cn",
                ],
            },
            {
                preferred_network: "login.microsoftonline.de",
                preferred_cache: "login.microsoftonline.de",
                aliases: ["login.microsoftonline.de"],
            },
            {
                preferred_network: "login.microsoftonline.us",
                preferred_cache: "login.microsoftonline.us",
                aliases: [
                    "login.microsoftonline.us",
                    "login.usgovcloudapi.net",
                ],
            },
            {
                preferred_network: "login-us.microsoftonline.com",
                preferred_cache: "login-us.microsoftonline.com",
                aliases: ["login-us.microsoftonline.com"],
            },
        ],
    },
};
const EndpointMetadata = rawMetdataJSON.endpointMetadata;
const InstanceDiscoveryMetadata = rawMetdataJSON.instanceDiscoveryMetadata;
const InstanceDiscoveryMetadataAliases = new Set();
InstanceDiscoveryMetadata.metadata.forEach((metadataEntry) => {
    metadataEntry.aliases.forEach((alias) => {
        InstanceDiscoveryMetadataAliases.add(alias);
    });
});
/**
 * Attempts to get an aliases array from the static authority metadata sources based on the canonical authority host
 * @param staticAuthorityOptions
 * @param logger
 * @returns
 */
function getAliasesFromStaticSources(staticAuthorityOptions, logger) {
    let staticAliases;
    const canonicalAuthority = staticAuthorityOptions.canonicalAuthority;
    if (canonicalAuthority) {
        const authorityHost = new UrlString(canonicalAuthority).getUrlComponents().HostNameAndPort;
        staticAliases =
            getAliasesFromMetadata(authorityHost, staticAuthorityOptions.cloudDiscoveryMetadata?.metadata, AuthorityMetadataSource.CONFIG, logger) ||
                getAliasesFromMetadata(authorityHost, InstanceDiscoveryMetadata.metadata, AuthorityMetadataSource.HARDCODED_VALUES, logger) ||
                staticAuthorityOptions.knownAuthorities;
    }
    return staticAliases || [];
}
/**
 * Returns aliases for from the raw cloud discovery metadata passed in
 * @param authorityHost
 * @param rawCloudDiscoveryMetadata
 * @returns
 */
function getAliasesFromMetadata(authorityHost, cloudDiscoveryMetadata, source, logger) {
    logger?.trace(`getAliasesFromMetadata called with source: ${source}`);
    if (authorityHost && cloudDiscoveryMetadata) {
        const metadata = getCloudDiscoveryMetadataFromNetworkResponse(cloudDiscoveryMetadata, authorityHost);
        if (metadata) {
            logger?.trace(`getAliasesFromMetadata: found cloud discovery metadata in ${source}, returning aliases`);
            return metadata.aliases;
        }
        else {
            logger?.trace(`getAliasesFromMetadata: did not find cloud discovery metadata in ${source}`);
        }
    }
    return null;
}
/**
 * Get cloud discovery metadata for common authorities
 */
function getCloudDiscoveryMetadataFromHardcodedValues(authorityHost) {
    const metadata = getCloudDiscoveryMetadataFromNetworkResponse(InstanceDiscoveryMetadata.metadata, authorityHost);
    return metadata;
}
/**
 * Searches instance discovery network response for the entry that contains the host in the aliases list
 * @param response
 * @param authority
 */
function getCloudDiscoveryMetadataFromNetworkResponse(response, authorityHost) {
    for (let i = 0; i < response.length; i++) {
        const metadata = response[i];
        if (metadata.aliases.includes(authorityHost)) {
            return metadata;
        }
    }
    return null;
}

/*! @azure/msal-common v14.16.0 2024-11-05 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const cacheQuotaExceededErrorCode = "cache_quota_exceeded";
const cacheUnknownErrorCode = "cache_error_unknown";

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const CacheErrorMessages = {
    [cacheQuotaExceededErrorCode]: "Exceeded cache storage capacity.",
    [cacheUnknownErrorCode]: "Unexpected error occurred when using cache storage.",
};
/**
 * Error thrown when there is an error with the cache
 */
class CacheError extends Error {
    constructor(errorCode, errorMessage) {
        const message = errorMessage ||
            (CacheErrorMessages[errorCode]
                ? CacheErrorMessages[errorCode]
                : CacheErrorMessages[cacheUnknownErrorCode]);
        super(`${errorCode}: ${message}`);
        Object.setPrototypeOf(this, CacheError.prototype);
        this.name = "CacheError";
        this.errorCode = errorCode;
        this.errorMessage = message;
    }
}

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Interface class which implement cache storage functions used by MSAL to perform validity checks, and store tokens.
 * @internal
 */
class CacheManager {
    constructor(clientId, cryptoImpl, logger, staticAuthorityOptions) {
        this.clientId = clientId;
        this.cryptoImpl = cryptoImpl;
        this.commonLogger = logger.clone(name$1, version$1);
        this.staticAuthorityOptions = staticAuthorityOptions;
    }
    /**
     * Returns all the accounts in the cache that match the optional filter. If no filter is provided, all accounts are returned.
     * @param accountFilter - (Optional) filter to narrow down the accounts returned
     * @returns Array of AccountInfo objects in cache
     */
    getAllAccounts(accountFilter) {
        return this.buildTenantProfiles(this.getAccountsFilteredBy(accountFilter || {}), accountFilter);
    }
    /**
     * Gets first tenanted AccountInfo object found based on provided filters
     */
    getAccountInfoFilteredBy(accountFilter) {
        const allAccounts = this.getAllAccounts(accountFilter);
        if (allAccounts.length > 1) {
            // If one or more accounts are found, prioritize accounts that have an ID token
            const sortedAccounts = allAccounts.sort((account) => {
                return account.idTokenClaims ? -1 : 1;
            });
            return sortedAccounts[0];
        }
        else if (allAccounts.length === 1) {
            // If only one account is found, return it regardless of whether a matching ID token was found
            return allAccounts[0];
        }
        else {
            return null;
        }
    }
    /**
     * Returns a single matching
     * @param accountFilter
     * @returns
     */
    getBaseAccountInfo(accountFilter) {
        const accountEntities = this.getAccountsFilteredBy(accountFilter);
        if (accountEntities.length > 0) {
            return accountEntities[0].getAccountInfo();
        }
        else {
            return null;
        }
    }
    /**
     * Matches filtered account entities with cached ID tokens that match the tenant profile-specific account filters
     * and builds the account info objects from the matching ID token's claims
     * @param cachedAccounts
     * @param accountFilter
     * @returns Array of AccountInfo objects that match account and tenant profile filters
     */
    buildTenantProfiles(cachedAccounts, accountFilter) {
        return cachedAccounts.flatMap((accountEntity) => {
            return this.getTenantProfilesFromAccountEntity(accountEntity, accountFilter?.tenantId, accountFilter);
        });
    }
    getTenantedAccountInfoByFilter(accountInfo, tokenKeys, tenantProfile, tenantProfileFilter) {
        let tenantedAccountInfo = null;
        let idTokenClaims;
        if (tenantProfileFilter) {
            if (!this.tenantProfileMatchesFilter(tenantProfile, tenantProfileFilter)) {
                return null;
            }
        }
        const idToken = this.getIdToken(accountInfo, tokenKeys, tenantProfile.tenantId);
        if (idToken) {
            idTokenClaims = extractTokenClaims(idToken.secret, this.cryptoImpl.base64Decode);
            if (!this.idTokenClaimsMatchTenantProfileFilter(idTokenClaims, tenantProfileFilter)) {
                // ID token sourced claims don't match so this tenant profile is not a match
                return null;
            }
        }
        // Expand tenant profile into account info based on matching tenant profile and if available matching ID token claims
        tenantedAccountInfo = updateAccountTenantProfileData(accountInfo, tenantProfile, idTokenClaims, idToken?.secret);
        return tenantedAccountInfo;
    }
    getTenantProfilesFromAccountEntity(accountEntity, targetTenantId, tenantProfileFilter) {
        const accountInfo = accountEntity.getAccountInfo();
        let searchTenantProfiles = accountInfo.tenantProfiles || new Map();
        const tokenKeys = this.getTokenKeys();
        // If a tenant ID was provided, only return the tenant profile for that tenant ID if it exists
        if (targetTenantId) {
            const tenantProfile = searchTenantProfiles.get(targetTenantId);
            if (tenantProfile) {
                // Reduce search field to just this tenant profile
                searchTenantProfiles = new Map([
                    [targetTenantId, tenantProfile],
                ]);
            }
            else {
                // No tenant profile for search tenant ID, return empty array
                return [];
            }
        }
        const matchingTenantProfiles = [];
        searchTenantProfiles.forEach((tenantProfile) => {
            const tenantedAccountInfo = this.getTenantedAccountInfoByFilter(accountInfo, tokenKeys, tenantProfile, tenantProfileFilter);
            if (tenantedAccountInfo) {
                matchingTenantProfiles.push(tenantedAccountInfo);
            }
        });
        return matchingTenantProfiles;
    }
    tenantProfileMatchesFilter(tenantProfile, tenantProfileFilter) {
        if (!!tenantProfileFilter.localAccountId &&
            !this.matchLocalAccountIdFromTenantProfile(tenantProfile, tenantProfileFilter.localAccountId)) {
            return false;
        }
        if (!!tenantProfileFilter.name &&
            !(tenantProfile.name === tenantProfileFilter.name)) {
            return false;
        }
        if (tenantProfileFilter.isHomeTenant !== undefined &&
            !(tenantProfile.isHomeTenant === tenantProfileFilter.isHomeTenant)) {
            return false;
        }
        return true;
    }
    idTokenClaimsMatchTenantProfileFilter(idTokenClaims, tenantProfileFilter) {
        // Tenant Profile filtering
        if (tenantProfileFilter) {
            if (!!tenantProfileFilter.localAccountId &&
                !this.matchLocalAccountIdFromTokenClaims(idTokenClaims, tenantProfileFilter.localAccountId)) {
                return false;
            }
            if (!!tenantProfileFilter.loginHint &&
                !this.matchLoginHintFromTokenClaims(idTokenClaims, tenantProfileFilter.loginHint)) {
                return false;
            }
            if (!!tenantProfileFilter.username &&
                !this.matchUsername(idTokenClaims.preferred_username, tenantProfileFilter.username)) {
                return false;
            }
            if (!!tenantProfileFilter.name &&
                !this.matchName(idTokenClaims, tenantProfileFilter.name)) {
                return false;
            }
            if (!!tenantProfileFilter.sid &&
                !this.matchSid(idTokenClaims, tenantProfileFilter.sid)) {
                return false;
            }
        }
        return true;
    }
    /**
     * saves a cache record
     * @param cacheRecord {CacheRecord}
     * @param storeInCache {?StoreInCache}
     * @param correlationId {?string} correlation id
     */
    async saveCacheRecord(cacheRecord, storeInCache, correlationId) {
        if (!cacheRecord) {
            throw createClientAuthError(invalidCacheRecord);
        }
        try {
            if (!!cacheRecord.account) {
                this.setAccount(cacheRecord.account);
            }
            if (!!cacheRecord.idToken && storeInCache?.idToken !== false) {
                this.setIdTokenCredential(cacheRecord.idToken);
            }
            if (!!cacheRecord.accessToken &&
                storeInCache?.accessToken !== false) {
                await this.saveAccessToken(cacheRecord.accessToken);
            }
            if (!!cacheRecord.refreshToken &&
                storeInCache?.refreshToken !== false) {
                this.setRefreshTokenCredential(cacheRecord.refreshToken);
            }
            if (!!cacheRecord.appMetadata) {
                this.setAppMetadata(cacheRecord.appMetadata);
            }
        }
        catch (e) {
            this.commonLogger?.error(`CacheManager.saveCacheRecord: failed`);
            if (e instanceof Error) {
                this.commonLogger?.errorPii(`CacheManager.saveCacheRecord: ${e.message}`, correlationId);
                if (e.name === "QuotaExceededError" ||
                    e.name === "NS_ERROR_DOM_QUOTA_REACHED" ||
                    e.message.includes("exceeded the quota")) {
                    this.commonLogger?.error(`CacheManager.saveCacheRecord: exceeded storage quota`, correlationId);
                    throw new CacheError(cacheQuotaExceededErrorCode);
                }
                else {
                    throw new CacheError(e.name, e.message);
                }
            }
            else {
                this.commonLogger?.errorPii(`CacheManager.saveCacheRecord: ${e}`, correlationId);
                throw new CacheError(cacheUnknownErrorCode);
            }
        }
    }
    /**
     * saves access token credential
     * @param credential
     */
    async saveAccessToken(credential) {
        const accessTokenFilter = {
            clientId: credential.clientId,
            credentialType: credential.credentialType,
            environment: credential.environment,
            homeAccountId: credential.homeAccountId,
            realm: credential.realm,
            tokenType: credential.tokenType,
            requestedClaimsHash: credential.requestedClaimsHash,
        };
        const tokenKeys = this.getTokenKeys();
        const currentScopes = ScopeSet.fromString(credential.target);
        const removedAccessTokens = [];
        tokenKeys.accessToken.forEach((key) => {
            if (!this.accessTokenKeyMatchesFilter(key, accessTokenFilter, false)) {
                return;
            }
            const tokenEntity = this.getAccessTokenCredential(key);
            if (tokenEntity &&
                this.credentialMatchesFilter(tokenEntity, accessTokenFilter)) {
                const tokenScopeSet = ScopeSet.fromString(tokenEntity.target);
                if (tokenScopeSet.intersectingScopeSets(currentScopes)) {
                    removedAccessTokens.push(this.removeAccessToken(key));
                }
            }
        });
        await Promise.all(removedAccessTokens);
        this.setAccessTokenCredential(credential);
    }
    /**
     * Retrieve account entities matching all provided tenant-agnostic filters; if no filter is set, get all account entities in the cache
     * Not checking for casing as keys are all generated in lower case, remember to convert to lower case if object properties are compared
     * @param accountFilter - An object containing Account properties to filter by
     */
    getAccountsFilteredBy(accountFilter) {
        const allAccountKeys = this.getAccountKeys();
        const matchingAccounts = [];
        allAccountKeys.forEach((cacheKey) => {
            if (!this.isAccountKey(cacheKey, accountFilter.homeAccountId)) {
                // Don't parse value if the key doesn't match the account filters
                return;
            }
            const entity = this.getAccount(cacheKey, this.commonLogger);
            // Match base account fields
            if (!entity) {
                return;
            }
            if (!!accountFilter.homeAccountId &&
                !this.matchHomeAccountId(entity, accountFilter.homeAccountId)) {
                return;
            }
            if (!!accountFilter.username &&
                !this.matchUsername(entity.username, accountFilter.username)) {
                return;
            }
            if (!!accountFilter.environment &&
                !this.matchEnvironment(entity, accountFilter.environment)) {
                return;
            }
            if (!!accountFilter.realm &&
                !this.matchRealm(entity, accountFilter.realm)) {
                return;
            }
            if (!!accountFilter.nativeAccountId &&
                !this.matchNativeAccountId(entity, accountFilter.nativeAccountId)) {
                return;
            }
            if (!!accountFilter.authorityType &&
                !this.matchAuthorityType(entity, accountFilter.authorityType)) {
                return;
            }
            // If at least one tenant profile matches the tenant profile filter, add the account to the list of matching accounts
            const tenantProfileFilter = {
                localAccountId: accountFilter?.localAccountId,
                name: accountFilter?.name,
            };
            const matchingTenantProfiles = entity.tenantProfiles?.filter((tenantProfile) => {
                return this.tenantProfileMatchesFilter(tenantProfile, tenantProfileFilter);
            });
            if (matchingTenantProfiles && matchingTenantProfiles.length === 0) {
                // No tenant profile for this account matches filter, don't add to list of matching accounts
                return;
            }
            matchingAccounts.push(entity);
        });
        return matchingAccounts;
    }
    /**
     * Returns true if the given key matches our account key schema. Also matches homeAccountId and/or tenantId if provided
     * @param key
     * @param homeAccountId
     * @param tenantId
     * @returns
     */
    isAccountKey(key, homeAccountId, tenantId) {
        if (key.split(Separators.CACHE_KEY_SEPARATOR).length < 3) {
            // Account cache keys contain 3 items separated by '-' (each item may also contain '-')
            return false;
        }
        if (homeAccountId &&
            !key.toLowerCase().includes(homeAccountId.toLowerCase())) {
            return false;
        }
        if (tenantId && !key.toLowerCase().includes(tenantId.toLowerCase())) {
            return false;
        }
        // Do not check environment as aliasing can cause false negatives
        return true;
    }
    /**
     * Returns true if the given key matches our credential key schema.
     * @param key
     */
    isCredentialKey(key) {
        if (key.split(Separators.CACHE_KEY_SEPARATOR).length < 6) {
            // Credential cache keys contain 6 items separated by '-' (each item may also contain '-')
            return false;
        }
        const lowerCaseKey = key.toLowerCase();
        // Credential keys must indicate what credential type they represent
        if (lowerCaseKey.indexOf(CredentialType.ID_TOKEN.toLowerCase()) ===
            -1 &&
            lowerCaseKey.indexOf(CredentialType.ACCESS_TOKEN.toLowerCase()) ===
                -1 &&
            lowerCaseKey.indexOf(CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME.toLowerCase()) === -1 &&
            lowerCaseKey.indexOf(CredentialType.REFRESH_TOKEN.toLowerCase()) ===
                -1) {
            return false;
        }
        if (lowerCaseKey.indexOf(CredentialType.REFRESH_TOKEN.toLowerCase()) >
            -1) {
            // Refresh tokens must contain the client id or family id
            const clientIdValidation = `${CredentialType.REFRESH_TOKEN}${Separators.CACHE_KEY_SEPARATOR}${this.clientId}${Separators.CACHE_KEY_SEPARATOR}`;
            const familyIdValidation = `${CredentialType.REFRESH_TOKEN}${Separators.CACHE_KEY_SEPARATOR}${THE_FAMILY_ID}${Separators.CACHE_KEY_SEPARATOR}`;
            if (lowerCaseKey.indexOf(clientIdValidation.toLowerCase()) === -1 &&
                lowerCaseKey.indexOf(familyIdValidation.toLowerCase()) === -1) {
                return false;
            }
        }
        else if (lowerCaseKey.indexOf(this.clientId.toLowerCase()) === -1) {
            // Tokens must contain the clientId
            return false;
        }
        return true;
    }
    /**
     * Returns whether or not the given credential entity matches the filter
     * @param entity
     * @param filter
     * @returns
     */
    credentialMatchesFilter(entity, filter) {
        if (!!filter.clientId && !this.matchClientId(entity, filter.clientId)) {
            return false;
        }
        if (!!filter.userAssertionHash &&
            !this.matchUserAssertionHash(entity, filter.userAssertionHash)) {
            return false;
        }
        /*
         * homeAccountId can be undefined, and we want to filter out cached items that have a homeAccountId of ""
         * because we don't want a client_credential request to return a cached token that has a homeAccountId
         */
        if (typeof filter.homeAccountId === "string" &&
            !this.matchHomeAccountId(entity, filter.homeAccountId)) {
            return false;
        }
        if (!!filter.environment &&
            !this.matchEnvironment(entity, filter.environment)) {
            return false;
        }
        if (!!filter.realm && !this.matchRealm(entity, filter.realm)) {
            return false;
        }
        if (!!filter.credentialType &&
            !this.matchCredentialType(entity, filter.credentialType)) {
            return false;
        }
        if (!!filter.familyId && !this.matchFamilyId(entity, filter.familyId)) {
            return false;
        }
        /*
         * idTokens do not have "target", target specific refreshTokens do exist for some types of authentication
         * Resource specific refresh tokens case will be added when the support is deemed necessary
         */
        if (!!filter.target && !this.matchTarget(entity, filter.target)) {
            return false;
        }
        // If request OR cached entity has requested Claims Hash, check if they match
        if (filter.requestedClaimsHash || entity.requestedClaimsHash) {
            // Don't match if either is undefined or they are different
            if (entity.requestedClaimsHash !== filter.requestedClaimsHash) {
                return false;
            }
        }
        // Access Token with Auth Scheme specific matching
        if (entity.credentialType ===
            CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME) {
            if (!!filter.tokenType &&
                !this.matchTokenType(entity, filter.tokenType)) {
                return false;
            }
            // KeyId (sshKid) in request must match cached SSH certificate keyId because SSH cert is bound to a specific key
            if (filter.tokenType === AuthenticationScheme.SSH) {
                if (filter.keyId && !this.matchKeyId(entity, filter.keyId)) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * retrieve appMetadata matching all provided filters; if no filter is set, get all appMetadata
     * @param filter
     */
    getAppMetadataFilteredBy(filter) {
        const allCacheKeys = this.getKeys();
        const matchingAppMetadata = {};
        allCacheKeys.forEach((cacheKey) => {
            // don't parse any non-appMetadata type cache entities
            if (!this.isAppMetadata(cacheKey)) {
                return;
            }
            // Attempt retrieval
            const entity = this.getAppMetadata(cacheKey);
            if (!entity) {
                return;
            }
            if (!!filter.environment &&
                !this.matchEnvironment(entity, filter.environment)) {
                return;
            }
            if (!!filter.clientId &&
                !this.matchClientId(entity, filter.clientId)) {
                return;
            }
            matchingAppMetadata[cacheKey] = entity;
        });
        return matchingAppMetadata;
    }
    /**
     * retrieve authorityMetadata that contains a matching alias
     * @param filter
     */
    getAuthorityMetadataByAlias(host) {
        const allCacheKeys = this.getAuthorityMetadataKeys();
        let matchedEntity = null;
        allCacheKeys.forEach((cacheKey) => {
            // don't parse any non-authorityMetadata type cache entities
            if (!this.isAuthorityMetadata(cacheKey) ||
                cacheKey.indexOf(this.clientId) === -1) {
                return;
            }
            // Attempt retrieval
            const entity = this.getAuthorityMetadata(cacheKey);
            if (!entity) {
                return;
            }
            if (entity.aliases.indexOf(host) === -1) {
                return;
            }
            matchedEntity = entity;
        });
        return matchedEntity;
    }
    /**
     * Removes all accounts and related tokens from cache.
     */
    async removeAllAccounts() {
        const allAccountKeys = this.getAccountKeys();
        const removedAccounts = [];
        allAccountKeys.forEach((cacheKey) => {
            removedAccounts.push(this.removeAccount(cacheKey));
        });
        await Promise.all(removedAccounts);
    }
    /**
     * Removes the account and related tokens for a given account key
     * @param account
     */
    async removeAccount(accountKey) {
        const account = this.getAccount(accountKey, this.commonLogger);
        if (!account) {
            return;
        }
        await this.removeAccountContext(account);
        this.removeItem(accountKey);
    }
    /**
     * Removes credentials associated with the provided account
     * @param account
     */
    async removeAccountContext(account) {
        const allTokenKeys = this.getTokenKeys();
        const accountId = account.generateAccountId();
        const removedCredentials = [];
        allTokenKeys.idToken.forEach((key) => {
            if (key.indexOf(accountId) === 0) {
                this.removeIdToken(key);
            }
        });
        allTokenKeys.accessToken.forEach((key) => {
            if (key.indexOf(accountId) === 0) {
                removedCredentials.push(this.removeAccessToken(key));
            }
        });
        allTokenKeys.refreshToken.forEach((key) => {
            if (key.indexOf(accountId) === 0) {
                this.removeRefreshToken(key);
            }
        });
        await Promise.all(removedCredentials);
    }
    /**
     * Migrates a single-tenant account and all it's associated alternate cross-tenant account objects in the
     * cache into a condensed multi-tenant account object with tenant profiles.
     * @param accountKey
     * @param accountEntity
     * @param logger
     * @returns
     */
    updateOutdatedCachedAccount(accountKey, accountEntity, logger) {
        // Only update if account entity is defined and has no tenantProfiles object (is outdated)
        if (accountEntity && accountEntity.isSingleTenant()) {
            this.commonLogger?.verbose("updateOutdatedCachedAccount: Found a single-tenant (outdated) account entity in the cache, migrating to multi-tenant account entity");
            // Get keys of all accounts belonging to user
            const matchingAccountKeys = this.getAccountKeys().filter((key) => {
                return key.startsWith(accountEntity.homeAccountId);
            });
            // Get all account entities belonging to user
            const accountsToMerge = [];
            matchingAccountKeys.forEach((key) => {
                const account = this.getCachedAccountEntity(key);
                if (account) {
                    accountsToMerge.push(account);
                }
            });
            // Set base account to home account if available, any account if not
            const baseAccount = accountsToMerge.find((account) => {
                return tenantIdMatchesHomeTenant(account.realm, account.homeAccountId);
            }) || accountsToMerge[0];
            // Populate tenant profiles built from each account entity belonging to the user
            baseAccount.tenantProfiles = accountsToMerge.map((account) => {
                return {
                    tenantId: account.realm,
                    localAccountId: account.localAccountId,
                    name: account.name,
                    isHomeTenant: tenantIdMatchesHomeTenant(account.realm, account.homeAccountId),
                };
            });
            const updatedAccount = CacheManager.toObject(new AccountEntity(), {
                ...baseAccount,
            });
            const newAccountKey = updatedAccount.generateAccountKey();
            // Clear cache of legacy account objects that have been collpsed into tenant profiles
            matchingAccountKeys.forEach((key) => {
                if (key !== newAccountKey) {
                    this.removeOutdatedAccount(accountKey);
                }
            });
            // Cache updated account object
            this.setAccount(updatedAccount);
            logger?.verbose("Updated an outdated account entity in the cache");
            return updatedAccount;
        }
        // No update is necessary
        return accountEntity;
    }
    /**
     * returns a boolean if the given credential is removed
     * @param credential
     */
    async removeAccessToken(key) {
        const credential = this.getAccessTokenCredential(key);
        if (!credential) {
            return;
        }
        // Remove Token Binding Key from key store for PoP Tokens Credentials
        if (credential.credentialType.toLowerCase() ===
            CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME.toLowerCase()) {
            if (credential.tokenType === AuthenticationScheme.POP) {
                const accessTokenWithAuthSchemeEntity = credential;
                const kid = accessTokenWithAuthSchemeEntity.keyId;
                if (kid) {
                    try {
                        await this.cryptoImpl.removeTokenBindingKey(kid);
                    }
                    catch (error) {
                        throw createClientAuthError(bindingKeyNotRemoved);
                    }
                }
            }
        }
        return this.removeItem(key);
    }
    /**
     * Removes all app metadata objects from cache.
     */
    removeAppMetadata() {
        const allCacheKeys = this.getKeys();
        allCacheKeys.forEach((cacheKey) => {
            if (this.isAppMetadata(cacheKey)) {
                this.removeItem(cacheKey);
            }
        });
        return true;
    }
    /**
     * Retrieve AccountEntity from cache
     * @param account
     */
    readAccountFromCache(account) {
        const accountKey = AccountEntity.generateAccountCacheKey(account);
        return this.getAccount(accountKey, this.commonLogger);
    }
    /**
     * Retrieve IdTokenEntity from cache
     * @param account {AccountInfo}
     * @param tokenKeys {?TokenKeys}
     * @param targetRealm {?string}
     * @param performanceClient {?IPerformanceClient}
     * @param correlationId {?string}
     */
    getIdToken(account, tokenKeys, targetRealm, performanceClient, correlationId) {
        this.commonLogger.trace("CacheManager - getIdToken called");
        const idTokenFilter = {
            homeAccountId: account.homeAccountId,
            environment: account.environment,
            credentialType: CredentialType.ID_TOKEN,
            clientId: this.clientId,
            realm: targetRealm,
        };
        const idTokenMap = this.getIdTokensByFilter(idTokenFilter, tokenKeys);
        const numIdTokens = idTokenMap.size;
        if (numIdTokens < 1) {
            this.commonLogger.info("CacheManager:getIdToken - No token found");
            return null;
        }
        else if (numIdTokens > 1) {
            let tokensToBeRemoved = idTokenMap;
            // Multiple tenant profiles and no tenant specified, pick home account
            if (!targetRealm) {
                const homeIdTokenMap = new Map();
                idTokenMap.forEach((idToken, key) => {
                    if (idToken.realm === account.tenantId) {
                        homeIdTokenMap.set(key, idToken);
                    }
                });
                const numHomeIdTokens = homeIdTokenMap.size;
                if (numHomeIdTokens < 1) {
                    this.commonLogger.info("CacheManager:getIdToken - Multiple ID tokens found for account but none match account entity tenant id, returning first result");
                    return idTokenMap.values().next().value;
                }
                else if (numHomeIdTokens === 1) {
                    this.commonLogger.info("CacheManager:getIdToken - Multiple ID tokens found for account, defaulting to home tenant profile");
                    return homeIdTokenMap.values().next().value;
                }
                else {
                    // Multiple ID tokens for home tenant profile, remove all and return null
                    tokensToBeRemoved = homeIdTokenMap;
                }
            }
            // Multiple tokens for a single tenant profile, remove all and return null
            this.commonLogger.info("CacheManager:getIdToken - Multiple matching ID tokens found, clearing them");
            tokensToBeRemoved.forEach((idToken, key) => {
                this.removeIdToken(key);
            });
            if (performanceClient && correlationId) {
                performanceClient.addFields({ multiMatchedID: idTokenMap.size }, correlationId);
            }
            return null;
        }
        this.commonLogger.info("CacheManager:getIdToken - Returning ID token");
        return idTokenMap.values().next().value;
    }
    /**
     * Gets all idTokens matching the given filter
     * @param filter
     * @returns
     */
    getIdTokensByFilter(filter, tokenKeys) {
        const idTokenKeys = (tokenKeys && tokenKeys.idToken) || this.getTokenKeys().idToken;
        const idTokens = new Map();
        idTokenKeys.forEach((key) => {
            if (!this.idTokenKeyMatchesFilter(key, {
                clientId: this.clientId,
                ...filter,
            })) {
                return;
            }
            const idToken = this.getIdTokenCredential(key);
            if (idToken && this.credentialMatchesFilter(idToken, filter)) {
                idTokens.set(key, idToken);
            }
        });
        return idTokens;
    }
    /**
     * Validate the cache key against filter before retrieving and parsing cache value
     * @param key
     * @param filter
     * @returns
     */
    idTokenKeyMatchesFilter(inputKey, filter) {
        const key = inputKey.toLowerCase();
        if (filter.clientId &&
            key.indexOf(filter.clientId.toLowerCase()) === -1) {
            return false;
        }
        if (filter.homeAccountId &&
            key.indexOf(filter.homeAccountId.toLowerCase()) === -1) {
            return false;
        }
        return true;
    }
    /**
     * Removes idToken from the cache
     * @param key
     */
    removeIdToken(key) {
        this.removeItem(key);
    }
    /**
     * Removes refresh token from the cache
     * @param key
     */
    removeRefreshToken(key) {
        this.removeItem(key);
    }
    /**
     * Retrieve AccessTokenEntity from cache
     * @param account {AccountInfo}
     * @param request {BaseAuthRequest}
     * @param tokenKeys {?TokenKeys}
     * @param performanceClient {?IPerformanceClient}
     * @param correlationId {?string}
     */
    getAccessToken(account, request, tokenKeys, targetRealm, performanceClient, correlationId) {
        this.commonLogger.trace("CacheManager - getAccessToken called");
        const scopes = ScopeSet.createSearchScopes(request.scopes);
        const authScheme = request.authenticationScheme || AuthenticationScheme.BEARER;
        /*
         * Distinguish between Bearer and PoP/SSH token cache types
         * Cast to lowercase to handle "bearer" from ADFS
         */
        const credentialType = authScheme &&
            authScheme.toLowerCase() !==
                AuthenticationScheme.BEARER.toLowerCase()
            ? CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME
            : CredentialType.ACCESS_TOKEN;
        const accessTokenFilter = {
            homeAccountId: account.homeAccountId,
            environment: account.environment,
            credentialType: credentialType,
            clientId: this.clientId,
            realm: targetRealm || account.tenantId,
            target: scopes,
            tokenType: authScheme,
            keyId: request.sshKid,
            requestedClaimsHash: request.requestedClaimsHash,
        };
        const accessTokenKeys = (tokenKeys && tokenKeys.accessToken) ||
            this.getTokenKeys().accessToken;
        const accessTokens = [];
        accessTokenKeys.forEach((key) => {
            // Validate key
            if (this.accessTokenKeyMatchesFilter(key, accessTokenFilter, true)) {
                const accessToken = this.getAccessTokenCredential(key);
                // Validate value
                if (accessToken &&
                    this.credentialMatchesFilter(accessToken, accessTokenFilter)) {
                    accessTokens.push(accessToken);
                }
            }
        });
        const numAccessTokens = accessTokens.length;
        if (numAccessTokens < 1) {
            this.commonLogger.info("CacheManager:getAccessToken - No token found");
            return null;
        }
        else if (numAccessTokens > 1) {
            this.commonLogger.info("CacheManager:getAccessToken - Multiple access tokens found, clearing them");
            accessTokens.forEach((accessToken) => {
                void this.removeAccessToken(generateCredentialKey(accessToken));
            });
            if (performanceClient && correlationId) {
                performanceClient.addFields({ multiMatchedAT: accessTokens.length }, correlationId);
            }
            return null;
        }
        this.commonLogger.info("CacheManager:getAccessToken - Returning access token");
        return accessTokens[0];
    }
    /**
     * Validate the cache key against filter before retrieving and parsing cache value
     * @param key
     * @param filter
     * @param keyMustContainAllScopes
     * @returns
     */
    accessTokenKeyMatchesFilter(inputKey, filter, keyMustContainAllScopes) {
        const key = inputKey.toLowerCase();
        if (filter.clientId &&
            key.indexOf(filter.clientId.toLowerCase()) === -1) {
            return false;
        }
        if (filter.homeAccountId &&
            key.indexOf(filter.homeAccountId.toLowerCase()) === -1) {
            return false;
        }
        if (filter.realm && key.indexOf(filter.realm.toLowerCase()) === -1) {
            return false;
        }
        if (filter.requestedClaimsHash &&
            key.indexOf(filter.requestedClaimsHash.toLowerCase()) === -1) {
            return false;
        }
        if (filter.target) {
            const scopes = filter.target.asArray();
            for (let i = 0; i < scopes.length; i++) {
                if (keyMustContainAllScopes &&
                    !key.includes(scopes[i].toLowerCase())) {
                    // When performing a cache lookup a missing scope would be a cache miss
                    return false;
                }
                else if (!keyMustContainAllScopes &&
                    key.includes(scopes[i].toLowerCase())) {
                    // When performing a cache write, any token with a subset of requested scopes should be replaced
                    return true;
                }
            }
        }
        return true;
    }
    /**
     * Gets all access tokens matching the filter
     * @param filter
     * @returns
     */
    getAccessTokensByFilter(filter) {
        const tokenKeys = this.getTokenKeys();
        const accessTokens = [];
        tokenKeys.accessToken.forEach((key) => {
            if (!this.accessTokenKeyMatchesFilter(key, filter, true)) {
                return;
            }
            const accessToken = this.getAccessTokenCredential(key);
            if (accessToken &&
                this.credentialMatchesFilter(accessToken, filter)) {
                accessTokens.push(accessToken);
            }
        });
        return accessTokens;
    }
    /**
     * Helper to retrieve the appropriate refresh token from cache
     * @param account {AccountInfo}
     * @param familyRT {boolean}
     * @param tokenKeys {?TokenKeys}
     * @param performanceClient {?IPerformanceClient}
     * @param correlationId {?string}
     */
    getRefreshToken(account, familyRT, tokenKeys, performanceClient, correlationId) {
        this.commonLogger.trace("CacheManager - getRefreshToken called");
        const id = familyRT ? THE_FAMILY_ID : undefined;
        const refreshTokenFilter = {
            homeAccountId: account.homeAccountId,
            environment: account.environment,
            credentialType: CredentialType.REFRESH_TOKEN,
            clientId: this.clientId,
            familyId: id,
        };
        const refreshTokenKeys = (tokenKeys && tokenKeys.refreshToken) ||
            this.getTokenKeys().refreshToken;
        const refreshTokens = [];
        refreshTokenKeys.forEach((key) => {
            // Validate key
            if (this.refreshTokenKeyMatchesFilter(key, refreshTokenFilter)) {
                const refreshToken = this.getRefreshTokenCredential(key);
                // Validate value
                if (refreshToken &&
                    this.credentialMatchesFilter(refreshToken, refreshTokenFilter)) {
                    refreshTokens.push(refreshToken);
                }
            }
        });
        const numRefreshTokens = refreshTokens.length;
        if (numRefreshTokens < 1) {
            this.commonLogger.info("CacheManager:getRefreshToken - No refresh token found.");
            return null;
        }
        // address the else case after remove functions address environment aliases
        if (numRefreshTokens > 1 && performanceClient && correlationId) {
            performanceClient.addFields({ multiMatchedRT: numRefreshTokens }, correlationId);
        }
        this.commonLogger.info("CacheManager:getRefreshToken - returning refresh token");
        return refreshTokens[0];
    }
    /**
     * Validate the cache key against filter before retrieving and parsing cache value
     * @param key
     * @param filter
     */
    refreshTokenKeyMatchesFilter(inputKey, filter) {
        const key = inputKey.toLowerCase();
        if (filter.familyId &&
            key.indexOf(filter.familyId.toLowerCase()) === -1) {
            return false;
        }
        // If familyId is used, clientId is not in the key
        if (!filter.familyId &&
            filter.clientId &&
            key.indexOf(filter.clientId.toLowerCase()) === -1) {
            return false;
        }
        if (filter.homeAccountId &&
            key.indexOf(filter.homeAccountId.toLowerCase()) === -1) {
            return false;
        }
        return true;
    }
    /**
     * Retrieve AppMetadataEntity from cache
     */
    readAppMetadataFromCache(environment) {
        const appMetadataFilter = {
            environment,
            clientId: this.clientId,
        };
        const appMetadata = this.getAppMetadataFilteredBy(appMetadataFilter);
        const appMetadataEntries = Object.keys(appMetadata).map((key) => appMetadata[key]);
        const numAppMetadata = appMetadataEntries.length;
        if (numAppMetadata < 1) {
            return null;
        }
        else if (numAppMetadata > 1) {
            throw createClientAuthError(multipleMatchingAppMetadata);
        }
        return appMetadataEntries[0];
    }
    /**
     * Return the family_id value associated  with FOCI
     * @param environment
     * @param clientId
     */
    isAppMetadataFOCI(environment) {
        const appMetadata = this.readAppMetadataFromCache(environment);
        return !!(appMetadata && appMetadata.familyId === THE_FAMILY_ID);
    }
    /**
     * helper to match account ids
     * @param value
     * @param homeAccountId
     */
    matchHomeAccountId(entity, homeAccountId) {
        return !!(typeof entity.homeAccountId === "string" &&
            homeAccountId === entity.homeAccountId);
    }
    /**
     * helper to match account ids
     * @param entity
     * @param localAccountId
     * @returns
     */
    matchLocalAccountIdFromTokenClaims(tokenClaims, localAccountId) {
        const idTokenLocalAccountId = tokenClaims.oid || tokenClaims.sub;
        return localAccountId === idTokenLocalAccountId;
    }
    matchLocalAccountIdFromTenantProfile(tenantProfile, localAccountId) {
        return tenantProfile.localAccountId === localAccountId;
    }
    /**
     * helper to match names
     * @param entity
     * @param name
     * @returns true if the downcased name properties are present and match in the filter and the entity
     */
    matchName(claims, name) {
        return !!(name.toLowerCase() === claims.name?.toLowerCase());
    }
    /**
     * helper to match usernames
     * @param entity
     * @param username
     * @returns
     */
    matchUsername(cachedUsername, filterUsername) {
        return !!(cachedUsername &&
            typeof cachedUsername === "string" &&
            filterUsername?.toLowerCase() === cachedUsername.toLowerCase());
    }
    /**
     * helper to match assertion
     * @param value
     * @param oboAssertion
     */
    matchUserAssertionHash(entity, userAssertionHash) {
        return !!(entity.userAssertionHash &&
            userAssertionHash === entity.userAssertionHash);
    }
    /**
     * helper to match environment
     * @param value
     * @param environment
     */
    matchEnvironment(entity, environment) {
        // Check static authority options first for cases where authority metadata has not been resolved and cached yet
        if (this.staticAuthorityOptions) {
            const staticAliases = getAliasesFromStaticSources(this.staticAuthorityOptions, this.commonLogger);
            if (staticAliases.includes(environment) &&
                staticAliases.includes(entity.environment)) {
                return true;
            }
        }
        // Query metadata cache if no static authority configuration has aliases that match enviroment
        const cloudMetadata = this.getAuthorityMetadataByAlias(environment);
        if (cloudMetadata &&
            cloudMetadata.aliases.indexOf(entity.environment) > -1) {
            return true;
        }
        return false;
    }
    /**
     * helper to match credential type
     * @param entity
     * @param credentialType
     */
    matchCredentialType(entity, credentialType) {
        return (entity.credentialType &&
            credentialType.toLowerCase() === entity.credentialType.toLowerCase());
    }
    /**
     * helper to match client ids
     * @param entity
     * @param clientId
     */
    matchClientId(entity, clientId) {
        return !!(entity.clientId && clientId === entity.clientId);
    }
    /**
     * helper to match family ids
     * @param entity
     * @param familyId
     */
    matchFamilyId(entity, familyId) {
        return !!(entity.familyId && familyId === entity.familyId);
    }
    /**
     * helper to match realm
     * @param entity
     * @param realm
     */
    matchRealm(entity, realm) {
        return !!(entity.realm?.toLowerCase() === realm.toLowerCase());
    }
    /**
     * helper to match nativeAccountId
     * @param entity
     * @param nativeAccountId
     * @returns boolean indicating the match result
     */
    matchNativeAccountId(entity, nativeAccountId) {
        return !!(entity.nativeAccountId && nativeAccountId === entity.nativeAccountId);
    }
    /**
     * helper to match loginHint which can be either:
     * 1. login_hint ID token claim
     * 2. username in cached account object
     * 3. upn in ID token claims
     * @param entity
     * @param loginHint
     * @returns
     */
    matchLoginHintFromTokenClaims(tokenClaims, loginHint) {
        if (tokenClaims.login_hint === loginHint) {
            return true;
        }
        if (tokenClaims.preferred_username === loginHint) {
            return true;
        }
        if (tokenClaims.upn === loginHint) {
            return true;
        }
        return false;
    }
    /**
     * Helper to match sid
     * @param entity
     * @param sid
     * @returns true if the sid claim is present and matches the filter
     */
    matchSid(idTokenClaims, sid) {
        return idTokenClaims.sid === sid;
    }
    matchAuthorityType(entity, authorityType) {
        return !!(entity.authorityType &&
            authorityType.toLowerCase() === entity.authorityType.toLowerCase());
    }
    /**
     * Returns true if the target scopes are a subset of the current entity's scopes, false otherwise.
     * @param entity
     * @param target
     */
    matchTarget(entity, target) {
        const isNotAccessTokenCredential = entity.credentialType !== CredentialType.ACCESS_TOKEN &&
            entity.credentialType !==
                CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME;
        if (isNotAccessTokenCredential || !entity.target) {
            return false;
        }
        const entityScopeSet = ScopeSet.fromString(entity.target);
        return entityScopeSet.containsScopeSet(target);
    }
    /**
     * Returns true if the credential's tokenType or Authentication Scheme matches the one in the request, false otherwise
     * @param entity
     * @param tokenType
     */
    matchTokenType(entity, tokenType) {
        return !!(entity.tokenType && entity.tokenType === tokenType);
    }
    /**
     * Returns true if the credential's keyId matches the one in the request, false otherwise
     * @param entity
     * @param keyId
     */
    matchKeyId(entity, keyId) {
        return !!(entity.keyId && entity.keyId === keyId);
    }
    /**
     * returns if a given cache entity is of the type appmetadata
     * @param key
     */
    isAppMetadata(key) {
        return key.indexOf(APP_METADATA) !== -1;
    }
    /**
     * returns if a given cache entity is of the type authoritymetadata
     * @param key
     */
    isAuthorityMetadata(key) {
        return key.indexOf(AUTHORITY_METADATA_CONSTANTS.CACHE_KEY) !== -1;
    }
    /**
     * returns cache key used for cloud instance metadata
     */
    generateAuthorityMetadataCacheKey(authority) {
        return `${AUTHORITY_METADATA_CONSTANTS.CACHE_KEY}-${this.clientId}-${authority}`;
    }
    /**
     * Helper to convert serialized data to object
     * @param obj
     * @param json
     */
    static toObject(obj, json) {
        for (const propertyName in json) {
            obj[propertyName] = json[propertyName];
        }
        return obj;
    }
}
/** @internal */
class DefaultStorageClass extends CacheManager {
    setAccount() {
        throw createClientAuthError(methodNotImplemented);
    }
    getAccount() {
        throw createClientAuthError(methodNotImplemented);
    }
    getCachedAccountEntity() {
        throw createClientAuthError(methodNotImplemented);
    }
    setIdTokenCredential() {
        throw createClientAuthError(methodNotImplemented);
    }
    getIdTokenCredential() {
        throw createClientAuthError(methodNotImplemented);
    }
    setAccessTokenCredential() {
        throw createClientAuthError(methodNotImplemented);
    }
    getAccessTokenCredential() {
        throw createClientAuthError(methodNotImplemented);
    }
    setRefreshTokenCredential() {
        throw createClientAuthError(methodNotImplemented);
    }
    getRefreshTokenCredential() {
        throw createClientAuthError(methodNotImplemented);
    }
    setAppMetadata() {
        throw createClientAuthError(methodNotImplemented);
    }
    getAppMetadata() {
        throw createClientAuthError(methodNotImplemented);
    }
    setServerTelemetry() {
        throw createClientAuthError(methodNotImplemented);
    }
    getServerTelemetry() {
        throw createClientAuthError(methodNotImplemented);
    }
    setAuthorityMetadata() {
        throw createClientAuthError(methodNotImplemented);
    }
    getAuthorityMetadata() {
        throw createClientAuthError(methodNotImplemented);
    }
    getAuthorityMetadataKeys() {
        throw createClientAuthError(methodNotImplemented);
    }
    setThrottlingCache() {
        throw createClientAuthError(methodNotImplemented);
    }
    getThrottlingCache() {
        throw createClientAuthError(methodNotImplemented);
    }
    removeItem() {
        throw createClientAuthError(methodNotImplemented);
    }
    getKeys() {
        throw createClientAuthError(methodNotImplemented);
    }
    getAccountKeys() {
        throw createClientAuthError(methodNotImplemented);
    }
    getTokenKeys() {
        throw createClientAuthError(methodNotImplemented);
    }
    updateCredentialCacheKey() {
        throw createClientAuthError(methodNotImplemented);
    }
    removeOutdatedAccount() {
        throw createClientAuthError(methodNotImplemented);
    }
}

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const DEFAULT_SYSTEM_OPTIONS$1 = {
    tokenRenewalOffsetSeconds: DEFAULT_TOKEN_RENEWAL_OFFSET_SEC,
    preventCorsPreflight: false,
};
const DEFAULT_LOGGER_IMPLEMENTATION = {
    loggerCallback: () => {
        // allow users to not set loggerCallback
    },
    piiLoggingEnabled: false,
    logLevel: LogLevel.Info,
    correlationId: Constants$1.EMPTY_STRING,
};
const DEFAULT_CACHE_OPTIONS$1 = {
    claimsBasedCachingEnabled: false,
};
const DEFAULT_NETWORK_IMPLEMENTATION = {
    async sendGetRequestAsync() {
        throw createClientAuthError(methodNotImplemented);
    },
    async sendPostRequestAsync() {
        throw createClientAuthError(methodNotImplemented);
    },
};
const DEFAULT_LIBRARY_INFO = {
    sku: Constants$1.SKU,
    version: version$1,
    cpu: Constants$1.EMPTY_STRING,
    os: Constants$1.EMPTY_STRING,
};
const DEFAULT_CLIENT_CREDENTIALS = {
    clientSecret: Constants$1.EMPTY_STRING,
    clientAssertion: undefined,
};
const DEFAULT_AZURE_CLOUD_OPTIONS = {
    azureCloudInstance: AzureCloudInstance.None,
    tenant: `${Constants$1.DEFAULT_COMMON_TENANT}`,
};
const DEFAULT_TELEMETRY_OPTIONS$1 = {
    application: {
        appName: "",
        appVersion: "",
    },
};
/**
 * Function that sets the default options when not explicitly configured from app developer
 *
 * @param Configuration
 *
 * @returns Configuration
 */
function buildClientConfiguration({ authOptions: userAuthOptions, systemOptions: userSystemOptions, loggerOptions: userLoggerOption, cacheOptions: userCacheOptions, storageInterface: storageImplementation, networkInterface: networkImplementation, cryptoInterface: cryptoImplementation, clientCredentials: clientCredentials, libraryInfo: libraryInfo, telemetry: telemetry, serverTelemetryManager: serverTelemetryManager, persistencePlugin: persistencePlugin, serializableCache: serializableCache, }) {
    const loggerOptions = {
        ...DEFAULT_LOGGER_IMPLEMENTATION,
        ...userLoggerOption,
    };
    return {
        authOptions: buildAuthOptions(userAuthOptions),
        systemOptions: { ...DEFAULT_SYSTEM_OPTIONS$1, ...userSystemOptions },
        loggerOptions: loggerOptions,
        cacheOptions: { ...DEFAULT_CACHE_OPTIONS$1, ...userCacheOptions },
        storageInterface: storageImplementation ||
            new DefaultStorageClass(userAuthOptions.clientId, DEFAULT_CRYPTO_IMPLEMENTATION, new Logger(loggerOptions)),
        networkInterface: networkImplementation || DEFAULT_NETWORK_IMPLEMENTATION,
        cryptoInterface: cryptoImplementation || DEFAULT_CRYPTO_IMPLEMENTATION,
        clientCredentials: clientCredentials || DEFAULT_CLIENT_CREDENTIALS,
        libraryInfo: { ...DEFAULT_LIBRARY_INFO, ...libraryInfo },
        telemetry: { ...DEFAULT_TELEMETRY_OPTIONS$1, ...telemetry },
        serverTelemetryManager: serverTelemetryManager || null,
        persistencePlugin: persistencePlugin || null,
        serializableCache: serializableCache || null,
    };
}
/**
 * Construct authoptions from the client and platform passed values
 * @param authOptions
 */
function buildAuthOptions(authOptions) {
    return {
        clientCapabilities: [],
        azureCloudOptions: DEFAULT_AZURE_CLOUD_OPTIONS,
        skipAuthorityMetadataCache: false,
        instanceAware: false,
        ...authOptions,
    };
}
/**
 * Returns true if config has protocolMode set to ProtocolMode.OIDC, false otherwise
 * @param ClientConfiguration
 */
function isOidcProtocolMode(config) {
    return (config.authOptions.authority.options.protocolMode === ProtocolMode.OIDC);
}

/*! @azure/msal-common v14.16.0 2024-11-05 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const CcsCredentialType = {
    HOME_ACCOUNT_ID: "home_account_id",
    UPN: "UPN",
};

/*! @azure/msal-common v14.16.0 2024-11-05 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const CLIENT_ID$1 = "client_id";
const REDIRECT_URI$1 = "redirect_uri";
const RESPONSE_TYPE = "response_type";
const RESPONSE_MODE = "response_mode";
const GRANT_TYPE = "grant_type";
const CLAIMS = "claims";
const SCOPE = "scope";
const REFRESH_TOKEN = "refresh_token";
const STATE = "state";
const NONCE = "nonce";
const PROMPT = "prompt";
const CODE = "code";
const CODE_CHALLENGE = "code_challenge";
const CODE_CHALLENGE_METHOD = "code_challenge_method";
const CODE_VERIFIER = "code_verifier";
const CLIENT_REQUEST_ID = "client-request-id";
const X_CLIENT_SKU = "x-client-SKU";
const X_CLIENT_VER = "x-client-VER";
const X_CLIENT_OS = "x-client-OS";
const X_CLIENT_CPU = "x-client-CPU";
const X_CLIENT_CURR_TELEM = "x-client-current-telemetry";
const X_CLIENT_LAST_TELEM = "x-client-last-telemetry";
const X_MS_LIB_CAPABILITY = "x-ms-lib-capability";
const X_APP_NAME = "x-app-name";
const X_APP_VER = "x-app-ver";
const POST_LOGOUT_URI = "post_logout_redirect_uri";
const ID_TOKEN_HINT = "id_token_hint";
const DEVICE_CODE = "device_code";
const CLIENT_SECRET$1 = "client_secret";
const CLIENT_ASSERTION = "client_assertion";
const CLIENT_ASSERTION_TYPE = "client_assertion_type";
const TOKEN_TYPE = "token_type";
const REQ_CNF = "req_cnf";
const OBO_ASSERTION = "assertion";
const REQUESTED_TOKEN_USE = "requested_token_use";
const ON_BEHALF_OF = "on_behalf_of";
const RETURN_SPA_CODE = "return_spa_code";
const NATIVE_BROKER = "nativebroker";
const LOGOUT_HINT = "logout_hint";
const SID = "sid";
const LOGIN_HINT = "login_hint";
const DOMAIN_HINT = "domain_hint";
const BROKER_CLIENT_ID = "brk_client_id";
const BROKER_REDIRECT_URI = "brk_redirect_uri";

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Validates server consumable params from the "request" objects
 */
class RequestValidator {
    /**
     * Utility to check if the `redirectUri` in the request is a non-null value
     * @param redirectUri
     */
    static validateRedirectUri(redirectUri) {
        if (!redirectUri) {
            throw createClientConfigurationError(redirectUriEmpty);
        }
    }
    /**
     * Utility to validate prompt sent by the user in the request
     * @param prompt
     */
    static validatePrompt(prompt) {
        const promptValues = [];
        for (const value in PromptValue) {
            promptValues.push(PromptValue[value]);
        }
        if (promptValues.indexOf(prompt) < 0) {
            throw createClientConfigurationError(invalidPromptValue);
        }
    }
    static validateClaims(claims) {
        try {
            JSON.parse(claims);
        }
        catch (e) {
            throw createClientConfigurationError(invalidClaims);
        }
    }
    /**
     * Utility to validate code_challenge and code_challenge_method
     * @param codeChallenge
     * @param codeChallengeMethod
     */
    static validateCodeChallengeParams(codeChallenge, codeChallengeMethod) {
        if (!codeChallenge || !codeChallengeMethod) {
            throw createClientConfigurationError(pkceParamsMissing);
        }
        else {
            this.validateCodeChallengeMethod(codeChallengeMethod);
        }
    }
    /**
     * Utility to validate code_challenge_method
     * @param codeChallengeMethod
     */
    static validateCodeChallengeMethod(codeChallengeMethod) {
        if ([
            CodeChallengeMethodValues.PLAIN,
            CodeChallengeMethodValues.S256,
        ].indexOf(codeChallengeMethod) < 0) {
            throw createClientConfigurationError(invalidCodeChallengeMethod);
        }
    }
}

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
function instrumentBrokerParams(parameters, correlationId, performanceClient) {
    if (!correlationId) {
        return;
    }
    const clientId = parameters.get(CLIENT_ID$1);
    if (clientId && parameters.has(BROKER_CLIENT_ID)) {
        performanceClient?.addFields({
            embeddedClientId: clientId,
            embeddedRedirectUri: parameters.get(REDIRECT_URI$1),
        }, correlationId);
    }
}
/** @internal */
class RequestParameterBuilder {
    constructor(correlationId, performanceClient) {
        this.parameters = new Map();
        this.performanceClient = performanceClient;
        this.correlationId = correlationId;
    }
    /**
     * add response_type = code
     */
    addResponseTypeCode() {
        this.parameters.set(RESPONSE_TYPE, encodeURIComponent(Constants$1.CODE_RESPONSE_TYPE));
    }
    /**
     * add response_type = token id_token
     */
    addResponseTypeForTokenAndIdToken() {
        this.parameters.set(RESPONSE_TYPE, encodeURIComponent(`${Constants$1.TOKEN_RESPONSE_TYPE} ${Constants$1.ID_TOKEN_RESPONSE_TYPE}`));
    }
    /**
     * add response_mode. defaults to query.
     * @param responseMode
     */
    addResponseMode(responseMode) {
        this.parameters.set(RESPONSE_MODE, encodeURIComponent(responseMode ? responseMode : ResponseMode.QUERY));
    }
    /**
     * Add flag to indicate STS should attempt to use WAM if available
     */
    addNativeBroker() {
        this.parameters.set(NATIVE_BROKER, encodeURIComponent("1"));
    }
    /**
     * add scopes. set addOidcScopes to false to prevent default scopes in non-user scenarios
     * @param scopeSet
     * @param addOidcScopes
     */
    addScopes(scopes, addOidcScopes = true, defaultScopes = OIDC_DEFAULT_SCOPES) {
        // Always add openid to the scopes when adding OIDC scopes
        if (addOidcScopes &&
            !defaultScopes.includes("openid") &&
            !scopes.includes("openid")) {
            defaultScopes.push("openid");
        }
        const requestScopes = addOidcScopes
            ? [...(scopes || []), ...defaultScopes]
            : scopes || [];
        const scopeSet = new ScopeSet(requestScopes);
        this.parameters.set(SCOPE, encodeURIComponent(scopeSet.printScopes()));
    }
    /**
     * add clientId
     * @param clientId
     */
    addClientId(clientId) {
        this.parameters.set(CLIENT_ID$1, encodeURIComponent(clientId));
    }
    /**
     * add redirect_uri
     * @param redirectUri
     */
    addRedirectUri(redirectUri) {
        RequestValidator.validateRedirectUri(redirectUri);
        this.parameters.set(REDIRECT_URI$1, encodeURIComponent(redirectUri));
    }
    /**
     * add post logout redirectUri
     * @param redirectUri
     */
    addPostLogoutRedirectUri(redirectUri) {
        RequestValidator.validateRedirectUri(redirectUri);
        this.parameters.set(POST_LOGOUT_URI, encodeURIComponent(redirectUri));
    }
    /**
     * add id_token_hint to logout request
     * @param idTokenHint
     */
    addIdTokenHint(idTokenHint) {
        this.parameters.set(ID_TOKEN_HINT, encodeURIComponent(idTokenHint));
    }
    /**
     * add domain_hint
     * @param domainHint
     */
    addDomainHint(domainHint) {
        this.parameters.set(DOMAIN_HINT, encodeURIComponent(domainHint));
    }
    /**
     * add login_hint
     * @param loginHint
     */
    addLoginHint(loginHint) {
        this.parameters.set(LOGIN_HINT, encodeURIComponent(loginHint));
    }
    /**
     * Adds the CCS (Cache Credential Service) query parameter for login_hint
     * @param loginHint
     */
    addCcsUpn(loginHint) {
        this.parameters.set(HeaderNames.CCS_HEADER, encodeURIComponent(`UPN:${loginHint}`));
    }
    /**
     * Adds the CCS (Cache Credential Service) query parameter for account object
     * @param loginHint
     */
    addCcsOid(clientInfo) {
        this.parameters.set(HeaderNames.CCS_HEADER, encodeURIComponent(`Oid:${clientInfo.uid}@${clientInfo.utid}`));
    }
    /**
     * add sid
     * @param sid
     */
    addSid(sid) {
        this.parameters.set(SID, encodeURIComponent(sid));
    }
    /**
     * add claims
     * @param claims
     */
    addClaims(claims, clientCapabilities) {
        const mergedClaims = this.addClientCapabilitiesToClaims(claims, clientCapabilities);
        RequestValidator.validateClaims(mergedClaims);
        this.parameters.set(CLAIMS, encodeURIComponent(mergedClaims));
    }
    /**
     * add correlationId
     * @param correlationId
     */
    addCorrelationId(correlationId) {
        this.parameters.set(CLIENT_REQUEST_ID, encodeURIComponent(correlationId));
    }
    /**
     * add library info query params
     * @param libraryInfo
     */
    addLibraryInfo(libraryInfo) {
        // Telemetry Info
        this.parameters.set(X_CLIENT_SKU, libraryInfo.sku);
        this.parameters.set(X_CLIENT_VER, libraryInfo.version);
        if (libraryInfo.os) {
            this.parameters.set(X_CLIENT_OS, libraryInfo.os);
        }
        if (libraryInfo.cpu) {
            this.parameters.set(X_CLIENT_CPU, libraryInfo.cpu);
        }
    }
    /**
     * Add client telemetry parameters
     * @param appTelemetry
     */
    addApplicationTelemetry(appTelemetry) {
        if (appTelemetry?.appName) {
            this.parameters.set(X_APP_NAME, appTelemetry.appName);
        }
        if (appTelemetry?.appVersion) {
            this.parameters.set(X_APP_VER, appTelemetry.appVersion);
        }
    }
    /**
     * add prompt
     * @param prompt
     */
    addPrompt(prompt) {
        RequestValidator.validatePrompt(prompt);
        this.parameters.set(`${PROMPT}`, encodeURIComponent(prompt));
    }
    /**
     * add state
     * @param state
     */
    addState(state) {
        if (state) {
            this.parameters.set(STATE, encodeURIComponent(state));
        }
    }
    /**
     * add nonce
     * @param nonce
     */
    addNonce(nonce) {
        this.parameters.set(NONCE, encodeURIComponent(nonce));
    }
    /**
     * add code_challenge and code_challenge_method
     * - throw if either of them are not passed
     * @param codeChallenge
     * @param codeChallengeMethod
     */
    addCodeChallengeParams(codeChallenge, codeChallengeMethod) {
        RequestValidator.validateCodeChallengeParams(codeChallenge, codeChallengeMethod);
        if (codeChallenge && codeChallengeMethod) {
            this.parameters.set(CODE_CHALLENGE, encodeURIComponent(codeChallenge));
            this.parameters.set(CODE_CHALLENGE_METHOD, encodeURIComponent(codeChallengeMethod));
        }
        else {
            throw createClientConfigurationError(pkceParamsMissing);
        }
    }
    /**
     * add the `authorization_code` passed by the user to exchange for a token
     * @param code
     */
    addAuthorizationCode(code) {
        this.parameters.set(CODE, encodeURIComponent(code));
    }
    /**
     * add the `authorization_code` passed by the user to exchange for a token
     * @param code
     */
    addDeviceCode(code) {
        this.parameters.set(DEVICE_CODE, encodeURIComponent(code));
    }
    /**
     * add the `refreshToken` passed by the user
     * @param refreshToken
     */
    addRefreshToken(refreshToken) {
        this.parameters.set(REFRESH_TOKEN, encodeURIComponent(refreshToken));
    }
    /**
     * add the `code_verifier` passed by the user to exchange for a token
     * @param codeVerifier
     */
    addCodeVerifier(codeVerifier) {
        this.parameters.set(CODE_VERIFIER, encodeURIComponent(codeVerifier));
    }
    /**
     * add client_secret
     * @param clientSecret
     */
    addClientSecret(clientSecret) {
        this.parameters.set(CLIENT_SECRET$1, encodeURIComponent(clientSecret));
    }
    /**
     * add clientAssertion for confidential client flows
     * @param clientAssertion
     */
    addClientAssertion(clientAssertion) {
        if (clientAssertion) {
            this.parameters.set(CLIENT_ASSERTION, encodeURIComponent(clientAssertion));
        }
    }
    /**
     * add clientAssertionType for confidential client flows
     * @param clientAssertionType
     */
    addClientAssertionType(clientAssertionType) {
        if (clientAssertionType) {
            this.parameters.set(CLIENT_ASSERTION_TYPE, encodeURIComponent(clientAssertionType));
        }
    }
    /**
     * add OBO assertion for confidential client flows
     * @param clientAssertion
     */
    addOboAssertion(oboAssertion) {
        this.parameters.set(OBO_ASSERTION, encodeURIComponent(oboAssertion));
    }
    /**
     * add grant type
     * @param grantType
     */
    addRequestTokenUse(tokenUse) {
        this.parameters.set(REQUESTED_TOKEN_USE, encodeURIComponent(tokenUse));
    }
    /**
     * add grant type
     * @param grantType
     */
    addGrantType(grantType) {
        this.parameters.set(GRANT_TYPE, encodeURIComponent(grantType));
    }
    /**
     * add client info
     *
     */
    addClientInfo() {
        this.parameters.set(CLIENT_INFO, "1");
    }
    /**
     * add extraQueryParams
     * @param eQParams
     */
    addExtraQueryParameters(eQParams) {
        Object.entries(eQParams).forEach(([key, value]) => {
            if (!this.parameters.has(key) && value) {
                this.parameters.set(key, value);
            }
        });
    }
    addClientCapabilitiesToClaims(claims, clientCapabilities) {
        let mergedClaims;
        // Parse provided claims into JSON object or initialize empty object
        if (!claims) {
            mergedClaims = {};
        }
        else {
            try {
                mergedClaims = JSON.parse(claims);
            }
            catch (e) {
                throw createClientConfigurationError(invalidClaims);
            }
        }
        if (clientCapabilities && clientCapabilities.length > 0) {
            if (!mergedClaims.hasOwnProperty(ClaimsRequestKeys.ACCESS_TOKEN)) {
                // Add access_token key to claims object
                mergedClaims[ClaimsRequestKeys.ACCESS_TOKEN] = {};
            }
            // Add xms_cc claim with provided clientCapabilities to access_token key
            mergedClaims[ClaimsRequestKeys.ACCESS_TOKEN][ClaimsRequestKeys.XMS_CC] = {
                values: clientCapabilities,
            };
        }
        return JSON.stringify(mergedClaims);
    }
    /**
     * adds `username` for Password Grant flow
     * @param username
     */
    addUsername(username) {
        this.parameters.set(PasswordGrantConstants.username, encodeURIComponent(username));
    }
    /**
     * adds `password` for Password Grant flow
     * @param password
     */
    addPassword(password) {
        this.parameters.set(PasswordGrantConstants.password, encodeURIComponent(password));
    }
    /**
     * add pop_jwk to query params
     * @param cnfString
     */
    addPopToken(cnfString) {
        if (cnfString) {
            this.parameters.set(TOKEN_TYPE, AuthenticationScheme.POP);
            this.parameters.set(REQ_CNF, encodeURIComponent(cnfString));
        }
    }
    /**
     * add SSH JWK and key ID to query params
     */
    addSshJwk(sshJwkString) {
        if (sshJwkString) {
            this.parameters.set(TOKEN_TYPE, AuthenticationScheme.SSH);
            this.parameters.set(REQ_CNF, encodeURIComponent(sshJwkString));
        }
    }
    /**
     * add server telemetry fields
     * @param serverTelemetryManager
     */
    addServerTelemetry(serverTelemetryManager) {
        this.parameters.set(X_CLIENT_CURR_TELEM, serverTelemetryManager.generateCurrentRequestHeaderValue());
        this.parameters.set(X_CLIENT_LAST_TELEM, serverTelemetryManager.generateLastRequestHeaderValue());
    }
    /**
     * Adds parameter that indicates to the server that throttling is supported
     */
    addThrottling() {
        this.parameters.set(X_MS_LIB_CAPABILITY, ThrottlingConstants.X_MS_LIB_CAPABILITY_VALUE);
    }
    /**
     * Adds logout_hint parameter for "silent" logout which prevent server account picker
     */
    addLogoutHint(logoutHint) {
        this.parameters.set(LOGOUT_HINT, encodeURIComponent(logoutHint));
    }
    addBrokerParameters(params) {
        const brokerParams = {};
        brokerParams[BROKER_CLIENT_ID] =
            params.brokerClientId;
        brokerParams[BROKER_REDIRECT_URI] =
            params.brokerRedirectUri;
        this.addExtraQueryParameters(brokerParams);
    }
    /**
     * Utility to create a URL from the params map
     */
    createQueryString() {
        const queryParameterArray = new Array();
        this.parameters.forEach((value, key) => {
            queryParameterArray.push(`${key}=${value}`);
        });
        instrumentBrokerParams(this.parameters, this.correlationId, this.performanceClient);
        return queryParameterArray.join("&");
    }
}

/*! @azure/msal-common v14.16.0 2024-11-05 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
function isOpenIdConfigResponse(response) {
    return (response.hasOwnProperty("authorization_endpoint") &&
        response.hasOwnProperty("token_endpoint") &&
        response.hasOwnProperty("issuer") &&
        response.hasOwnProperty("jwks_uri"));
}

/*! @azure/msal-common v14.16.0 2024-11-05 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
function isCloudInstanceDiscoveryResponse(response) {
    return (response.hasOwnProperty("tenant_discovery_endpoint") &&
        response.hasOwnProperty("metadata"));
}

/*! @azure/msal-common v14.16.0 2024-11-05 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
function isCloudInstanceDiscoveryErrorResponse(response) {
    return (response.hasOwnProperty("error") &&
        response.hasOwnProperty("error_description"));
}

/*! @azure/msal-common v14.16.0 2024-11-05 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Enumeration of operations that are instrumented by have their performance measured by the PerformanceClient.
 *
 * @export
 * @enum {number}
 */
const PerformanceEvents = {
    /**
     * acquireTokenByCode API (msal-browser and msal-node).
     * Used to acquire tokens by trading an authorization code against the token endpoint.
     */
    AcquireTokenByCode: "acquireTokenByCode",
    /**
     * acquireTokenByRefreshToken API (msal-browser and msal-node).
     * Used to renew an access token using a refresh token against the token endpoint.
     */
    AcquireTokenByRefreshToken: "acquireTokenByRefreshToken",
    /**
     * acquireTokenSilent API (msal-browser and msal-node).
     * Used to silently acquire a new access token (from the cache or the network).
     */
    AcquireTokenSilent: "acquireTokenSilent",
    /**
     * acquireTokenSilentAsync (msal-browser).
     * Internal API for acquireTokenSilent.
     */
    AcquireTokenSilentAsync: "acquireTokenSilentAsync",
    /**
     * acquireTokenPopup (msal-browser).
     * Used to acquire a new access token interactively through pop ups
     */
    AcquireTokenPopup: "acquireTokenPopup",
    /**
     * acquireTokenPreRedirect (msal-browser).
     * First part of the redirect flow.
     * Used to acquire a new access token interactively through redirects.
     */
    AcquireTokenPreRedirect: "acquireTokenPreRedirect",
    /**
     * acquireTokenRedirect (msal-browser).
     * Second part of the redirect flow.
     * Used to acquire a new access token interactively through redirects.
     */
    AcquireTokenRedirect: "acquireTokenRedirect",
    /**
     * getPublicKeyThumbprint API in CryptoOpts class (msal-browser).
     * Used to generate a public/private keypair and generate a public key thumbprint for pop requests.
     */
    CryptoOptsGetPublicKeyThumbprint: "cryptoOptsGetPublicKeyThumbprint",
    /**
     * signJwt API in CryptoOpts class (msal-browser).
     * Used to signed a pop token.
     */
    CryptoOptsSignJwt: "cryptoOptsSignJwt",
    /**
     * acquireToken API in the SilentCacheClient class (msal-browser).
     * Used to read access tokens from the cache.
     */
    SilentCacheClientAcquireToken: "silentCacheClientAcquireToken",
    /**
     * acquireToken API in the SilentIframeClient class (msal-browser).
     * Used to acquire a new set of tokens from the authorize endpoint in a hidden iframe.
     */
    SilentIframeClientAcquireToken: "silentIframeClientAcquireToken",
    AwaitConcurrentIframe: "awaitConcurrentIframe",
    /**
     * acquireToken API in SilentRereshClient (msal-browser).
     * Used to acquire a new set of tokens from the token endpoint using a refresh token.
     */
    SilentRefreshClientAcquireToken: "silentRefreshClientAcquireToken",
    /**
     * ssoSilent API (msal-browser).
     * Used to silently acquire an authorization code and set of tokens using a hidden iframe.
     */
    SsoSilent: "ssoSilent",
    /**
     * getDiscoveredAuthority API in StandardInteractionClient class (msal-browser).
     * Used to load authority metadata for a request.
     */
    StandardInteractionClientGetDiscoveredAuthority: "standardInteractionClientGetDiscoveredAuthority",
    /**
     * acquireToken APIs in msal-browser.
     * Used to make an /authorize endpoint call with native brokering enabled.
     */
    FetchAccountIdWithNativeBroker: "fetchAccountIdWithNativeBroker",
    /**
     * acquireToken API in NativeInteractionClient class (msal-browser).
     * Used to acquire a token from Native component when native brokering is enabled.
     */
    NativeInteractionClientAcquireToken: "nativeInteractionClientAcquireToken",
    /**
     * Time spent creating default headers for requests to token endpoint
     */
    BaseClientCreateTokenRequestHeaders: "baseClientCreateTokenRequestHeaders",
    /**
     * Time spent sending/waiting for the response of a request to the token endpoint
     */
    NetworkClientSendPostRequestAsync: "networkClientSendPostRequestAsync",
    RefreshTokenClientExecutePostToTokenEndpoint: "refreshTokenClientExecutePostToTokenEndpoint",
    AuthorizationCodeClientExecutePostToTokenEndpoint: "authorizationCodeClientExecutePostToTokenEndpoint",
    /**
     * Used to measure the time taken for completing embedded-broker handshake (PW-Broker).
     */
    BrokerHandhshake: "brokerHandshake",
    /**
     * acquireTokenByRefreshToken API in BrokerClientApplication (PW-Broker) .
     */
    AcquireTokenByRefreshTokenInBroker: "acquireTokenByRefreshTokenInBroker",
    /**
     * Time taken for token acquisition by broker
     */
    AcquireTokenByBroker: "acquireTokenByBroker",
    /**
     * Time spent on the network for refresh token acquisition
     */
    RefreshTokenClientExecuteTokenRequest: "refreshTokenClientExecuteTokenRequest",
    /**
     * Time taken for acquiring refresh token , records RT size
     */
    RefreshTokenClientAcquireToken: "refreshTokenClientAcquireToken",
    /**
     * Time taken for acquiring cached refresh token
     */
    RefreshTokenClientAcquireTokenWithCachedRefreshToken: "refreshTokenClientAcquireTokenWithCachedRefreshToken",
    /**
     * acquireTokenByRefreshToken API in RefreshTokenClient (msal-common).
     */
    RefreshTokenClientAcquireTokenByRefreshToken: "refreshTokenClientAcquireTokenByRefreshToken",
    /**
     * Helper function to create token request body in RefreshTokenClient (msal-common).
     */
    RefreshTokenClientCreateTokenRequestBody: "refreshTokenClientCreateTokenRequestBody",
    /**
     * acquireTokenFromCache (msal-browser).
     * Internal API for acquiring token from cache
     */
    AcquireTokenFromCache: "acquireTokenFromCache",
    SilentFlowClientAcquireCachedToken: "silentFlowClientAcquireCachedToken",
    SilentFlowClientGenerateResultFromCacheRecord: "silentFlowClientGenerateResultFromCacheRecord",
    /**
     * acquireTokenBySilentIframe (msal-browser).
     * Internal API for acquiring token by silent Iframe
     */
    AcquireTokenBySilentIframe: "acquireTokenBySilentIframe",
    /**
     * Internal API for initializing base request in BaseInteractionClient (msal-browser)
     */
    InitializeBaseRequest: "initializeBaseRequest",
    /**
     * Internal API for initializing silent request in SilentCacheClient (msal-browser)
     */
    InitializeSilentRequest: "initializeSilentRequest",
    InitializeClientApplication: "initializeClientApplication",
    /**
     * Helper function in SilentIframeClient class (msal-browser).
     */
    SilentIframeClientTokenHelper: "silentIframeClientTokenHelper",
    /**
     * SilentHandler
     */
    SilentHandlerInitiateAuthRequest: "silentHandlerInitiateAuthRequest",
    SilentHandlerMonitorIframeForHash: "silentHandlerMonitorIframeForHash",
    SilentHandlerLoadFrame: "silentHandlerLoadFrame",
    SilentHandlerLoadFrameSync: "silentHandlerLoadFrameSync",
    /**
     * Helper functions in StandardInteractionClient class (msal-browser)
     */
    StandardInteractionClientCreateAuthCodeClient: "standardInteractionClientCreateAuthCodeClient",
    StandardInteractionClientGetClientConfiguration: "standardInteractionClientGetClientConfiguration",
    StandardInteractionClientInitializeAuthorizationRequest: "standardInteractionClientInitializeAuthorizationRequest",
    StandardInteractionClientInitializeAuthorizationCodeRequest: "standardInteractionClientInitializeAuthorizationCodeRequest",
    /**
     * getAuthCodeUrl API (msal-browser and msal-node).
     */
    GetAuthCodeUrl: "getAuthCodeUrl",
    /**
     * Functions from InteractionHandler (msal-browser)
     */
    HandleCodeResponseFromServer: "handleCodeResponseFromServer",
    HandleCodeResponse: "handleCodeResponse",
    UpdateTokenEndpointAuthority: "updateTokenEndpointAuthority",
    /**
     * APIs in Authorization Code Client (msal-common)
     */
    AuthClientAcquireToken: "authClientAcquireToken",
    AuthClientExecuteTokenRequest: "authClientExecuteTokenRequest",
    AuthClientCreateTokenRequestBody: "authClientCreateTokenRequestBody",
    AuthClientCreateQueryString: "authClientCreateQueryString",
    /**
     * Generate functions in PopTokenGenerator (msal-common)
     */
    PopTokenGenerateCnf: "popTokenGenerateCnf",
    PopTokenGenerateKid: "popTokenGenerateKid",
    /**
     * handleServerTokenResponse API in ResponseHandler (msal-common)
     */
    HandleServerTokenResponse: "handleServerTokenResponse",
    DeserializeResponse: "deserializeResponse",
    /**
     * Authority functions
     */
    AuthorityFactoryCreateDiscoveredInstance: "authorityFactoryCreateDiscoveredInstance",
    AuthorityResolveEndpointsAsync: "authorityResolveEndpointsAsync",
    AuthorityResolveEndpointsFromLocalSources: "authorityResolveEndpointsFromLocalSources",
    AuthorityGetCloudDiscoveryMetadataFromNetwork: "authorityGetCloudDiscoveryMetadataFromNetwork",
    AuthorityUpdateCloudDiscoveryMetadata: "authorityUpdateCloudDiscoveryMetadata",
    AuthorityGetEndpointMetadataFromNetwork: "authorityGetEndpointMetadataFromNetwork",
    AuthorityUpdateEndpointMetadata: "authorityUpdateEndpointMetadata",
    AuthorityUpdateMetadataWithRegionalInformation: "authorityUpdateMetadataWithRegionalInformation",
    /**
     * Region Discovery functions
     */
    RegionDiscoveryDetectRegion: "regionDiscoveryDetectRegion",
    RegionDiscoveryGetRegionFromIMDS: "regionDiscoveryGetRegionFromIMDS",
    RegionDiscoveryGetCurrentVersion: "regionDiscoveryGetCurrentVersion",
    AcquireTokenByCodeAsync: "acquireTokenByCodeAsync",
    GetEndpointMetadataFromNetwork: "getEndpointMetadataFromNetwork",
    GetCloudDiscoveryMetadataFromNetworkMeasurement: "getCloudDiscoveryMetadataFromNetworkMeasurement",
    HandleRedirectPromiseMeasurement: "handleRedirectPromise",
    HandleNativeRedirectPromiseMeasurement: "handleNativeRedirectPromise",
    UpdateCloudDiscoveryMetadataMeasurement: "updateCloudDiscoveryMetadataMeasurement",
    UsernamePasswordClientAcquireToken: "usernamePasswordClientAcquireToken",
    NativeMessageHandlerHandshake: "nativeMessageHandlerHandshake",
    NativeGenerateAuthResult: "nativeGenerateAuthResult",
    RemoveHiddenIframe: "removeHiddenIframe",
    /**
     * Cache operations
     */
    ClearTokensAndKeysWithClaims: "clearTokensAndKeysWithClaims",
    CacheManagerGetRefreshToken: "cacheManagerGetRefreshToken",
    /**
     * Crypto Operations
     */
    GeneratePkceCodes: "generatePkceCodes",
    GenerateCodeVerifier: "generateCodeVerifier",
    GenerateCodeChallengeFromVerifier: "generateCodeChallengeFromVerifier",
    Sha256Digest: "sha256Digest",
    GetRandomValues: "getRandomValues",
};

/*! @azure/msal-common v14.16.0 2024-11-05 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Wraps a function with a performance measurement.
 * Usage: invoke(functionToCall, performanceClient, "EventName", "correlationId")(...argsToPassToFunction)
 * @param callback
 * @param eventName
 * @param logger
 * @param telemetryClient
 * @param correlationId
 * @returns
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const invoke = (callback, eventName, logger, telemetryClient, correlationId) => {
    return (...args) => {
        logger.trace(`Executing function ${eventName}`);
        const inProgressEvent = telemetryClient?.startMeasurement(eventName, correlationId);
        if (correlationId) {
            // Track number of times this API is called in a single request
            const eventCount = eventName + "CallCount";
            telemetryClient?.incrementFields({ [eventCount]: 1 }, correlationId);
        }
        try {
            const result = callback(...args);
            inProgressEvent?.end({
                success: true,
            });
            logger.trace(`Returning result from ${eventName}`);
            return result;
        }
        catch (e) {
            logger.trace(`Error occurred in ${eventName}`);
            try {
                logger.trace(JSON.stringify(e));
            }
            catch (e) {
                logger.trace("Unable to print error message.");
            }
            inProgressEvent?.end({
                success: false,
            }, e);
            throw e;
        }
    };
};
/**
 * Wraps an async function with a performance measurement.
 * Usage: invokeAsync(functionToCall, performanceClient, "EventName", "correlationId")(...argsToPassToFunction)
 * @param callback
 * @param eventName
 * @param logger
 * @param telemetryClient
 * @param correlationId
 * @returns
 * @internal
 *
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const invokeAsync = (callback, eventName, logger, telemetryClient, correlationId) => {
    return (...args) => {
        logger.trace(`Executing function ${eventName}`);
        const inProgressEvent = telemetryClient?.startMeasurement(eventName, correlationId);
        if (correlationId) {
            // Track number of times this API is called in a single request
            const eventCount = eventName + "CallCount";
            telemetryClient?.incrementFields({ [eventCount]: 1 }, correlationId);
        }
        telemetryClient?.setPreQueueTime(eventName, correlationId);
        return callback(...args)
            .then((response) => {
            logger.trace(`Returning result from ${eventName}`);
            inProgressEvent?.end({
                success: true,
            });
            return response;
        })
            .catch((e) => {
            logger.trace(`Error occurred in ${eventName}`);
            try {
                logger.trace(JSON.stringify(e));
            }
            catch (e) {
                logger.trace("Unable to print error message.");
            }
            inProgressEvent?.end({
                success: false,
            }, e);
            throw e;
        });
    };
};

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class RegionDiscovery {
    constructor(networkInterface, logger, performanceClient, correlationId) {
        this.networkInterface = networkInterface;
        this.logger = logger;
        this.performanceClient = performanceClient;
        this.correlationId = correlationId;
    }
    /**
     * Detect the region from the application's environment.
     *
     * @returns Promise<string | null>
     */
    async detectRegion(environmentRegion, regionDiscoveryMetadata) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.RegionDiscoveryDetectRegion, this.correlationId);
        // Initialize auto detected region with the region from the envrionment
        let autodetectedRegionName = environmentRegion;
        // Check if a region was detected from the environment, if not, attempt to get the region from IMDS
        if (!autodetectedRegionName) {
            const options = RegionDiscovery.IMDS_OPTIONS;
            try {
                const localIMDSVersionResponse = await invokeAsync(this.getRegionFromIMDS.bind(this), PerformanceEvents.RegionDiscoveryGetRegionFromIMDS, this.logger, this.performanceClient, this.correlationId)(Constants$1.IMDS_VERSION, options);
                if (localIMDSVersionResponse.status ===
                    ResponseCodes.httpSuccess) {
                    autodetectedRegionName = localIMDSVersionResponse.body;
                    regionDiscoveryMetadata.region_source =
                        RegionDiscoverySources.IMDS;
                }
                // If the response using the local IMDS version failed, try to fetch the current version of IMDS and retry.
                if (localIMDSVersionResponse.status ===
                    ResponseCodes.httpBadRequest) {
                    const currentIMDSVersion = await invokeAsync(this.getCurrentVersion.bind(this), PerformanceEvents.RegionDiscoveryGetCurrentVersion, this.logger, this.performanceClient, this.correlationId)(options);
                    if (!currentIMDSVersion) {
                        regionDiscoveryMetadata.region_source =
                            RegionDiscoverySources.FAILED_AUTO_DETECTION;
                        return null;
                    }
                    const currentIMDSVersionResponse = await invokeAsync(this.getRegionFromIMDS.bind(this), PerformanceEvents.RegionDiscoveryGetRegionFromIMDS, this.logger, this.performanceClient, this.correlationId)(currentIMDSVersion, options);
                    if (currentIMDSVersionResponse.status ===
                        ResponseCodes.httpSuccess) {
                        autodetectedRegionName =
                            currentIMDSVersionResponse.body;
                        regionDiscoveryMetadata.region_source =
                            RegionDiscoverySources.IMDS;
                    }
                }
            }
            catch (e) {
                regionDiscoveryMetadata.region_source =
                    RegionDiscoverySources.FAILED_AUTO_DETECTION;
                return null;
            }
        }
        else {
            regionDiscoveryMetadata.region_source =
                RegionDiscoverySources.ENVIRONMENT_VARIABLE;
        }
        // If no region was auto detected from the environment or from the IMDS endpoint, mark the attempt as a FAILED_AUTO_DETECTION
        if (!autodetectedRegionName) {
            regionDiscoveryMetadata.region_source =
                RegionDiscoverySources.FAILED_AUTO_DETECTION;
        }
        return autodetectedRegionName || null;
    }
    /**
     * Make the call to the IMDS endpoint
     *
     * @param imdsEndpointUrl
     * @returns Promise<NetworkResponse<string>>
     */
    async getRegionFromIMDS(version, options) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.RegionDiscoveryGetRegionFromIMDS, this.correlationId);
        return this.networkInterface.sendGetRequestAsync(`${Constants$1.IMDS_ENDPOINT}?api-version=${version}&format=text`, options, Constants$1.IMDS_TIMEOUT);
    }
    /**
     * Get the most recent version of the IMDS endpoint available
     *
     * @returns Promise<string | null>
     */
    async getCurrentVersion(options) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.RegionDiscoveryGetCurrentVersion, this.correlationId);
        try {
            const response = await this.networkInterface.sendGetRequestAsync(`${Constants$1.IMDS_ENDPOINT}?format=json`, options);
            // When IMDS endpoint is called without the api version query param, bad request response comes back with latest version.
            if (response.status === ResponseCodes.httpBadRequest &&
                response.body &&
                response.body["newest-versions"] &&
                response.body["newest-versions"].length > 0) {
                return response.body["newest-versions"][0];
            }
            return null;
        }
        catch (e) {
            return null;
        }
    }
}
// Options for the IMDS endpoint request
RegionDiscovery.IMDS_OPTIONS = {
    headers: {
        Metadata: "true",
    },
};

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * The authority class validates the authority URIs used by the user, and retrieves the OpenID Configuration Data from the
 * endpoint. It will store the pertinent config data in this object for use during token calls.
 * @internal
 */
class Authority {
    constructor(authority, networkInterface, cacheManager, authorityOptions, logger, correlationId, performanceClient, managedIdentity) {
        this.canonicalAuthority = authority;
        this._canonicalAuthority.validateAsUri();
        this.networkInterface = networkInterface;
        this.cacheManager = cacheManager;
        this.authorityOptions = authorityOptions;
        this.regionDiscoveryMetadata = {
            region_used: undefined,
            region_source: undefined,
            region_outcome: undefined,
        };
        this.logger = logger;
        this.performanceClient = performanceClient;
        this.correlationId = correlationId;
        this.managedIdentity = managedIdentity || false;
        this.regionDiscovery = new RegionDiscovery(networkInterface, this.logger, this.performanceClient, this.correlationId);
    }
    /**
     * Get {@link AuthorityType}
     * @param authorityUri {@link IUri}
     * @private
     */
    getAuthorityType(authorityUri) {
        // CIAM auth url pattern is being standardized as: <tenant>.ciamlogin.com
        if (authorityUri.HostNameAndPort.endsWith(Constants$1.CIAM_AUTH_URL)) {
            return AuthorityType.Ciam;
        }
        const pathSegments = authorityUri.PathSegments;
        if (pathSegments.length) {
            switch (pathSegments[0].toLowerCase()) {
                case Constants$1.ADFS:
                    return AuthorityType.Adfs;
                case Constants$1.DSTS:
                    return AuthorityType.Dsts;
            }
        }
        return AuthorityType.Default;
    }
    // See above for AuthorityType
    get authorityType() {
        return this.getAuthorityType(this.canonicalAuthorityUrlComponents);
    }
    /**
     * ProtocolMode enum representing the way endpoints are constructed.
     */
    get protocolMode() {
        return this.authorityOptions.protocolMode;
    }
    /**
     * Returns authorityOptions which can be used to reinstantiate a new authority instance
     */
    get options() {
        return this.authorityOptions;
    }
    /**
     * A URL that is the authority set by the developer
     */
    get canonicalAuthority() {
        return this._canonicalAuthority.urlString;
    }
    /**
     * Sets canonical authority.
     */
    set canonicalAuthority(url) {
        this._canonicalAuthority = new UrlString(url);
        this._canonicalAuthority.validateAsUri();
        this._canonicalAuthorityUrlComponents = null;
    }
    /**
     * Get authority components.
     */
    get canonicalAuthorityUrlComponents() {
        if (!this._canonicalAuthorityUrlComponents) {
            this._canonicalAuthorityUrlComponents =
                this._canonicalAuthority.getUrlComponents();
        }
        return this._canonicalAuthorityUrlComponents;
    }
    /**
     * Get hostname and port i.e. login.microsoftonline.com
     */
    get hostnameAndPort() {
        return this.canonicalAuthorityUrlComponents.HostNameAndPort.toLowerCase();
    }
    /**
     * Get tenant for authority.
     */
    get tenant() {
        return this.canonicalAuthorityUrlComponents.PathSegments[0];
    }
    /**
     * OAuth /authorize endpoint for requests
     */
    get authorizationEndpoint() {
        if (this.discoveryComplete()) {
            return this.replacePath(this.metadata.authorization_endpoint);
        }
        else {
            throw createClientAuthError(endpointResolutionError);
        }
    }
    /**
     * OAuth /token endpoint for requests
     */
    get tokenEndpoint() {
        if (this.discoveryComplete()) {
            return this.replacePath(this.metadata.token_endpoint);
        }
        else {
            throw createClientAuthError(endpointResolutionError);
        }
    }
    get deviceCodeEndpoint() {
        if (this.discoveryComplete()) {
            return this.replacePath(this.metadata.token_endpoint.replace("/token", "/devicecode"));
        }
        else {
            throw createClientAuthError(endpointResolutionError);
        }
    }
    /**
     * OAuth logout endpoint for requests
     */
    get endSessionEndpoint() {
        if (this.discoveryComplete()) {
            // ROPC policies may not have end_session_endpoint set
            if (!this.metadata.end_session_endpoint) {
                throw createClientAuthError(endSessionEndpointNotSupported);
            }
            return this.replacePath(this.metadata.end_session_endpoint);
        }
        else {
            throw createClientAuthError(endpointResolutionError);
        }
    }
    /**
     * OAuth issuer for requests
     */
    get selfSignedJwtAudience() {
        if (this.discoveryComplete()) {
            return this.replacePath(this.metadata.issuer);
        }
        else {
            throw createClientAuthError(endpointResolutionError);
        }
    }
    /**
     * Jwks_uri for token signing keys
     */
    get jwksUri() {
        if (this.discoveryComplete()) {
            return this.replacePath(this.metadata.jwks_uri);
        }
        else {
            throw createClientAuthError(endpointResolutionError);
        }
    }
    /**
     * Returns a flag indicating that tenant name can be replaced in authority {@link IUri}
     * @param authorityUri {@link IUri}
     * @private
     */
    canReplaceTenant(authorityUri) {
        return (authorityUri.PathSegments.length === 1 &&
            !Authority.reservedTenantDomains.has(authorityUri.PathSegments[0]) &&
            this.getAuthorityType(authorityUri) === AuthorityType.Default &&
            this.protocolMode === ProtocolMode.AAD);
    }
    /**
     * Replaces tenant in url path with current tenant. Defaults to common.
     * @param urlString
     */
    replaceTenant(urlString) {
        return urlString.replace(/{tenant}|{tenantid}/g, this.tenant);
    }
    /**
     * Replaces path such as tenant or policy with the current tenant or policy.
     * @param urlString
     */
    replacePath(urlString) {
        let endpoint = urlString;
        const cachedAuthorityUrl = new UrlString(this.metadata.canonical_authority);
        const cachedAuthorityUrlComponents = cachedAuthorityUrl.getUrlComponents();
        const cachedAuthorityParts = cachedAuthorityUrlComponents.PathSegments;
        const currentAuthorityParts = this.canonicalAuthorityUrlComponents.PathSegments;
        currentAuthorityParts.forEach((currentPart, index) => {
            let cachedPart = cachedAuthorityParts[index];
            if (index === 0 &&
                this.canReplaceTenant(cachedAuthorityUrlComponents)) {
                const tenantId = new UrlString(this.metadata.authorization_endpoint).getUrlComponents().PathSegments[0];
                /**
                 * Check if AAD canonical authority contains tenant domain name, for example "testdomain.onmicrosoft.com",
                 * by comparing its first path segment to the corresponding authorization endpoint path segment, which is
                 * always resolved with tenant id by OIDC.
                 */
                if (cachedPart !== tenantId) {
                    this.logger.verbose(`Replacing tenant domain name ${cachedPart} with id ${tenantId}`);
                    cachedPart = tenantId;
                }
            }
            if (currentPart !== cachedPart) {
                endpoint = endpoint.replace(`/${cachedPart}/`, `/${currentPart}/`);
            }
        });
        return this.replaceTenant(endpoint);
    }
    /**
     * The default open id configuration endpoint for any canonical authority.
     */
    get defaultOpenIdConfigurationEndpoint() {
        const canonicalAuthorityHost = this.hostnameAndPort;
        if (this.canonicalAuthority.endsWith("v2.0/") ||
            this.authorityType === AuthorityType.Adfs ||
            (this.protocolMode !== ProtocolMode.AAD &&
                !this.isAliasOfKnownMicrosoftAuthority(canonicalAuthorityHost))) {
            return `${this.canonicalAuthority}.well-known/openid-configuration`;
        }
        return `${this.canonicalAuthority}v2.0/.well-known/openid-configuration`;
    }
    /**
     * Boolean that returns whether or not tenant discovery has been completed.
     */
    discoveryComplete() {
        return !!this.metadata;
    }
    /**
     * Perform endpoint discovery to discover aliases, preferred_cache, preferred_network
     * and the /authorize, /token and logout endpoints.
     */
    async resolveEndpointsAsync() {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthorityResolveEndpointsAsync, this.correlationId);
        const metadataEntity = this.getCurrentMetadataEntity();
        const cloudDiscoverySource = await invokeAsync(this.updateCloudDiscoveryMetadata.bind(this), PerformanceEvents.AuthorityUpdateCloudDiscoveryMetadata, this.logger, this.performanceClient, this.correlationId)(metadataEntity);
        this.canonicalAuthority = this.canonicalAuthority.replace(this.hostnameAndPort, metadataEntity.preferred_network);
        const endpointSource = await invokeAsync(this.updateEndpointMetadata.bind(this), PerformanceEvents.AuthorityUpdateEndpointMetadata, this.logger, this.performanceClient, this.correlationId)(metadataEntity);
        this.updateCachedMetadata(metadataEntity, cloudDiscoverySource, {
            source: endpointSource,
        });
        this.performanceClient?.addFields({
            cloudDiscoverySource: cloudDiscoverySource,
            authorityEndpointSource: endpointSource,
        }, this.correlationId);
    }
    /**
     * Returns metadata entity from cache if it exists, otherwiser returns a new metadata entity built
     * from the configured canonical authority
     * @returns
     */
    getCurrentMetadataEntity() {
        let metadataEntity = this.cacheManager.getAuthorityMetadataByAlias(this.hostnameAndPort);
        if (!metadataEntity) {
            metadataEntity = {
                aliases: [],
                preferred_cache: this.hostnameAndPort,
                preferred_network: this.hostnameAndPort,
                canonical_authority: this.canonicalAuthority,
                authorization_endpoint: "",
                token_endpoint: "",
                end_session_endpoint: "",
                issuer: "",
                aliasesFromNetwork: false,
                endpointsFromNetwork: false,
                expiresAt: generateAuthorityMetadataExpiresAt(),
                jwks_uri: "",
            };
        }
        return metadataEntity;
    }
    /**
     * Updates cached metadata based on metadata source and sets the instance's metadata
     * property to the same value
     * @param metadataEntity
     * @param cloudDiscoverySource
     * @param endpointMetadataResult
     */
    updateCachedMetadata(metadataEntity, cloudDiscoverySource, endpointMetadataResult) {
        if (cloudDiscoverySource !== AuthorityMetadataSource.CACHE &&
            endpointMetadataResult?.source !== AuthorityMetadataSource.CACHE) {
            // Reset the expiration time unless both values came from a successful cache lookup
            metadataEntity.expiresAt =
                generateAuthorityMetadataExpiresAt();
            metadataEntity.canonical_authority = this.canonicalAuthority;
        }
        const cacheKey = this.cacheManager.generateAuthorityMetadataCacheKey(metadataEntity.preferred_cache);
        this.cacheManager.setAuthorityMetadata(cacheKey, metadataEntity);
        this.metadata = metadataEntity;
    }
    /**
     * Update AuthorityMetadataEntity with new endpoints and return where the information came from
     * @param metadataEntity
     */
    async updateEndpointMetadata(metadataEntity) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthorityUpdateEndpointMetadata, this.correlationId);
        const localMetadata = this.updateEndpointMetadataFromLocalSources(metadataEntity);
        // Further update may be required for hardcoded metadata if regional metadata is preferred
        if (localMetadata) {
            if (localMetadata.source ===
                AuthorityMetadataSource.HARDCODED_VALUES) {
                // If the user prefers to use an azure region replace the global endpoints with regional information.
                if (this.authorityOptions.azureRegionConfiguration?.azureRegion) {
                    if (localMetadata.metadata) {
                        const hardcodedMetadata = await invokeAsync(this.updateMetadataWithRegionalInformation.bind(this), PerformanceEvents.AuthorityUpdateMetadataWithRegionalInformation, this.logger, this.performanceClient, this.correlationId)(localMetadata.metadata);
                        updateAuthorityEndpointMetadata(metadataEntity, hardcodedMetadata, false);
                        metadataEntity.canonical_authority =
                            this.canonicalAuthority;
                    }
                }
            }
            return localMetadata.source;
        }
        // Get metadata from network if local sources aren't available
        let metadata = await invokeAsync(this.getEndpointMetadataFromNetwork.bind(this), PerformanceEvents.AuthorityGetEndpointMetadataFromNetwork, this.logger, this.performanceClient, this.correlationId)();
        if (metadata) {
            // If the user prefers to use an azure region replace the global endpoints with regional information.
            if (this.authorityOptions.azureRegionConfiguration?.azureRegion) {
                metadata = await invokeAsync(this.updateMetadataWithRegionalInformation.bind(this), PerformanceEvents.AuthorityUpdateMetadataWithRegionalInformation, this.logger, this.performanceClient, this.correlationId)(metadata);
            }
            updateAuthorityEndpointMetadata(metadataEntity, metadata, true);
            return AuthorityMetadataSource.NETWORK;
        }
        else {
            // Metadata could not be obtained from the config, cache, network or hardcoded values
            throw createClientAuthError(openIdConfigError, this.defaultOpenIdConfigurationEndpoint);
        }
    }
    /**
     * Updates endpoint metadata from local sources and returns where the information was retrieved from and the metadata config
     * response if the source is hardcoded metadata
     * @param metadataEntity
     * @returns
     */
    updateEndpointMetadataFromLocalSources(metadataEntity) {
        this.logger.verbose("Attempting to get endpoint metadata from authority configuration");
        const configMetadata = this.getEndpointMetadataFromConfig();
        if (configMetadata) {
            this.logger.verbose("Found endpoint metadata in authority configuration");
            updateAuthorityEndpointMetadata(metadataEntity, configMetadata, false);
            return {
                source: AuthorityMetadataSource.CONFIG,
            };
        }
        this.logger.verbose("Did not find endpoint metadata in the config... Attempting to get endpoint metadata from the hardcoded values.");
        // skipAuthorityMetadataCache is used to bypass hardcoded authority metadata and force a network metadata cache lookup and network metadata request if no cached response is available.
        if (this.authorityOptions.skipAuthorityMetadataCache) {
            this.logger.verbose("Skipping hardcoded metadata cache since skipAuthorityMetadataCache is set to true. Attempting to get endpoint metadata from the network metadata cache.");
        }
        else {
            const hardcodedMetadata = this.getEndpointMetadataFromHardcodedValues();
            if (hardcodedMetadata) {
                updateAuthorityEndpointMetadata(metadataEntity, hardcodedMetadata, false);
                return {
                    source: AuthorityMetadataSource.HARDCODED_VALUES,
                    metadata: hardcodedMetadata,
                };
            }
            else {
                this.logger.verbose("Did not find endpoint metadata in hardcoded values... Attempting to get endpoint metadata from the network metadata cache.");
            }
        }
        // Check cached metadata entity expiration status
        const metadataEntityExpired = isAuthorityMetadataExpired(metadataEntity);
        if (this.isAuthoritySameType(metadataEntity) &&
            metadataEntity.endpointsFromNetwork &&
            !metadataEntityExpired) {
            // No need to update
            this.logger.verbose("Found endpoint metadata in the cache.");
            return { source: AuthorityMetadataSource.CACHE };
        }
        else if (metadataEntityExpired) {
            this.logger.verbose("The metadata entity is expired.");
        }
        return null;
    }
    /**
     * Compares the number of url components after the domain to determine if the cached
     * authority metadata can be used for the requested authority. Protects against same domain different
     * authority such as login.microsoftonline.com/tenant and login.microsoftonline.com/tfp/tenant/policy
     * @param metadataEntity
     */
    isAuthoritySameType(metadataEntity) {
        const cachedAuthorityUrl = new UrlString(metadataEntity.canonical_authority);
        const cachedParts = cachedAuthorityUrl.getUrlComponents().PathSegments;
        return (cachedParts.length ===
            this.canonicalAuthorityUrlComponents.PathSegments.length);
    }
    /**
     * Parse authorityMetadata config option
     */
    getEndpointMetadataFromConfig() {
        if (this.authorityOptions.authorityMetadata) {
            try {
                return JSON.parse(this.authorityOptions.authorityMetadata);
            }
            catch (e) {
                throw createClientConfigurationError(invalidAuthorityMetadata);
            }
        }
        return null;
    }
    /**
     * Gets OAuth endpoints from the given OpenID configuration endpoint.
     *
     * @param hasHardcodedMetadata boolean
     */
    async getEndpointMetadataFromNetwork() {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthorityGetEndpointMetadataFromNetwork, this.correlationId);
        const options = {};
        /*
         * TODO: Add a timeout if the authority exists in our library's
         * hardcoded list of metadata
         */
        const openIdConfigurationEndpoint = this.defaultOpenIdConfigurationEndpoint;
        this.logger.verbose(`Authority.getEndpointMetadataFromNetwork: attempting to retrieve OAuth endpoints from ${openIdConfigurationEndpoint}`);
        try {
            const response = await this.networkInterface.sendGetRequestAsync(openIdConfigurationEndpoint, options);
            const isValidResponse = isOpenIdConfigResponse(response.body);
            if (isValidResponse) {
                return response.body;
            }
            else {
                this.logger.verbose(`Authority.getEndpointMetadataFromNetwork: could not parse response as OpenID configuration`);
                return null;
            }
        }
        catch (e) {
            this.logger.verbose(`Authority.getEndpointMetadataFromNetwork: ${e}`);
            return null;
        }
    }
    /**
     * Get OAuth endpoints for common authorities.
     */
    getEndpointMetadataFromHardcodedValues() {
        if (this.hostnameAndPort in EndpointMetadata) {
            return EndpointMetadata[this.hostnameAndPort];
        }
        return null;
    }
    /**
     * Update the retrieved metadata with regional information.
     * User selected Azure region will be used if configured.
     */
    async updateMetadataWithRegionalInformation(metadata) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthorityUpdateMetadataWithRegionalInformation, this.correlationId);
        const userConfiguredAzureRegion = this.authorityOptions.azureRegionConfiguration?.azureRegion;
        if (userConfiguredAzureRegion) {
            if (userConfiguredAzureRegion !==
                Constants$1.AZURE_REGION_AUTO_DISCOVER_FLAG) {
                this.regionDiscoveryMetadata.region_outcome =
                    RegionDiscoveryOutcomes.CONFIGURED_NO_AUTO_DETECTION;
                this.regionDiscoveryMetadata.region_used =
                    userConfiguredAzureRegion;
                return Authority.replaceWithRegionalInformation(metadata, userConfiguredAzureRegion);
            }
            const autodetectedRegionName = await invokeAsync(this.regionDiscovery.detectRegion.bind(this.regionDiscovery), PerformanceEvents.RegionDiscoveryDetectRegion, this.logger, this.performanceClient, this.correlationId)(this.authorityOptions.azureRegionConfiguration
                ?.environmentRegion, this.regionDiscoveryMetadata);
            if (autodetectedRegionName) {
                this.regionDiscoveryMetadata.region_outcome =
                    RegionDiscoveryOutcomes.AUTO_DETECTION_REQUESTED_SUCCESSFUL;
                this.regionDiscoveryMetadata.region_used =
                    autodetectedRegionName;
                return Authority.replaceWithRegionalInformation(metadata, autodetectedRegionName);
            }
            this.regionDiscoveryMetadata.region_outcome =
                RegionDiscoveryOutcomes.AUTO_DETECTION_REQUESTED_FAILED;
        }
        return metadata;
    }
    /**
     * Updates the AuthorityMetadataEntity with new aliases, preferred_network and preferred_cache
     * and returns where the information was retrieved from
     * @param metadataEntity
     * @returns AuthorityMetadataSource
     */
    async updateCloudDiscoveryMetadata(metadataEntity) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthorityUpdateCloudDiscoveryMetadata, this.correlationId);
        const localMetadataSource = this.updateCloudDiscoveryMetadataFromLocalSources(metadataEntity);
        if (localMetadataSource) {
            return localMetadataSource;
        }
        // Fallback to network as metadata source
        const metadata = await invokeAsync(this.getCloudDiscoveryMetadataFromNetwork.bind(this), PerformanceEvents.AuthorityGetCloudDiscoveryMetadataFromNetwork, this.logger, this.performanceClient, this.correlationId)();
        if (metadata) {
            updateCloudDiscoveryMetadata(metadataEntity, metadata, true);
            return AuthorityMetadataSource.NETWORK;
        }
        // Metadata could not be obtained from the config, cache, network or hardcoded values
        throw createClientConfigurationError(untrustedAuthority);
    }
    updateCloudDiscoveryMetadataFromLocalSources(metadataEntity) {
        this.logger.verbose("Attempting to get cloud discovery metadata  from authority configuration");
        this.logger.verbosePii(`Known Authorities: ${this.authorityOptions.knownAuthorities ||
            Constants$1.NOT_APPLICABLE}`);
        this.logger.verbosePii(`Authority Metadata: ${this.authorityOptions.authorityMetadata ||
            Constants$1.NOT_APPLICABLE}`);
        this.logger.verbosePii(`Canonical Authority: ${metadataEntity.canonical_authority || Constants$1.NOT_APPLICABLE}`);
        const metadata = this.getCloudDiscoveryMetadataFromConfig();
        if (metadata) {
            this.logger.verbose("Found cloud discovery metadata in authority configuration");
            updateCloudDiscoveryMetadata(metadataEntity, metadata, false);
            return AuthorityMetadataSource.CONFIG;
        }
        // If the cached metadata came from config but that config was not passed to this instance, we must go to hardcoded values
        this.logger.verbose("Did not find cloud discovery metadata in the config... Attempting to get cloud discovery metadata from the hardcoded values.");
        if (this.options.skipAuthorityMetadataCache) {
            this.logger.verbose("Skipping hardcoded cloud discovery metadata cache since skipAuthorityMetadataCache is set to true. Attempting to get cloud discovery metadata from the network metadata cache.");
        }
        else {
            const hardcodedMetadata = getCloudDiscoveryMetadataFromHardcodedValues(this.hostnameAndPort);
            if (hardcodedMetadata) {
                this.logger.verbose("Found cloud discovery metadata from hardcoded values.");
                updateCloudDiscoveryMetadata(metadataEntity, hardcodedMetadata, false);
                return AuthorityMetadataSource.HARDCODED_VALUES;
            }
            this.logger.verbose("Did not find cloud discovery metadata in hardcoded values... Attempting to get cloud discovery metadata from the network metadata cache.");
        }
        const metadataEntityExpired = isAuthorityMetadataExpired(metadataEntity);
        if (this.isAuthoritySameType(metadataEntity) &&
            metadataEntity.aliasesFromNetwork &&
            !metadataEntityExpired) {
            this.logger.verbose("Found cloud discovery metadata in the cache.");
            // No need to update
            return AuthorityMetadataSource.CACHE;
        }
        else if (metadataEntityExpired) {
            this.logger.verbose("The metadata entity is expired.");
        }
        return null;
    }
    /**
     * Parse cloudDiscoveryMetadata config or check knownAuthorities
     */
    getCloudDiscoveryMetadataFromConfig() {
        // CIAM does not support cloud discovery metadata
        if (this.authorityType === AuthorityType.Ciam) {
            this.logger.verbose("CIAM authorities do not support cloud discovery metadata, generate the aliases from authority host.");
            return Authority.createCloudDiscoveryMetadataFromHost(this.hostnameAndPort);
        }
        // Check if network response was provided in config
        if (this.authorityOptions.cloudDiscoveryMetadata) {
            this.logger.verbose("The cloud discovery metadata has been provided as a network response, in the config.");
            try {
                this.logger.verbose("Attempting to parse the cloud discovery metadata.");
                const parsedResponse = JSON.parse(this.authorityOptions.cloudDiscoveryMetadata);
                const metadata = getCloudDiscoveryMetadataFromNetworkResponse(parsedResponse.metadata, this.hostnameAndPort);
                this.logger.verbose("Parsed the cloud discovery metadata.");
                if (metadata) {
                    this.logger.verbose("There is returnable metadata attached to the parsed cloud discovery metadata.");
                    return metadata;
                }
                else {
                    this.logger.verbose("There is no metadata attached to the parsed cloud discovery metadata.");
                }
            }
            catch (e) {
                this.logger.verbose("Unable to parse the cloud discovery metadata. Throwing Invalid Cloud Discovery Metadata Error.");
                throw createClientConfigurationError(invalidCloudDiscoveryMetadata);
            }
        }
        // If cloudDiscoveryMetadata is empty or does not contain the host, check knownAuthorities
        if (this.isInKnownAuthorities()) {
            this.logger.verbose("The host is included in knownAuthorities. Creating new cloud discovery metadata from the host.");
            return Authority.createCloudDiscoveryMetadataFromHost(this.hostnameAndPort);
        }
        return null;
    }
    /**
     * Called to get metadata from network if CloudDiscoveryMetadata was not populated by config
     *
     * @param hasHardcodedMetadata boolean
     */
    async getCloudDiscoveryMetadataFromNetwork() {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthorityGetCloudDiscoveryMetadataFromNetwork, this.correlationId);
        const instanceDiscoveryEndpoint = `${Constants$1.AAD_INSTANCE_DISCOVERY_ENDPT}${this.canonicalAuthority}oauth2/v2.0/authorize`;
        const options = {};
        /*
         * TODO: Add a timeout if the authority exists in our library's
         * hardcoded list of metadata
         */
        let match = null;
        try {
            const response = await this.networkInterface.sendGetRequestAsync(instanceDiscoveryEndpoint, options);
            let typedResponseBody;
            let metadata;
            if (isCloudInstanceDiscoveryResponse(response.body)) {
                typedResponseBody =
                    response.body;
                metadata = typedResponseBody.metadata;
                this.logger.verbosePii(`tenant_discovery_endpoint is: ${typedResponseBody.tenant_discovery_endpoint}`);
            }
            else if (isCloudInstanceDiscoveryErrorResponse(response.body)) {
                this.logger.warning(`A CloudInstanceDiscoveryErrorResponse was returned. The cloud instance discovery network request's status code is: ${response.status}`);
                typedResponseBody =
                    response.body;
                if (typedResponseBody.error === Constants$1.INVALID_INSTANCE) {
                    this.logger.error("The CloudInstanceDiscoveryErrorResponse error is invalid_instance.");
                    return null;
                }
                this.logger.warning(`The CloudInstanceDiscoveryErrorResponse error is ${typedResponseBody.error}`);
                this.logger.warning(`The CloudInstanceDiscoveryErrorResponse error description is ${typedResponseBody.error_description}`);
                this.logger.warning("Setting the value of the CloudInstanceDiscoveryMetadata (returned from the network) to []");
                metadata = [];
            }
            else {
                this.logger.error("AAD did not return a CloudInstanceDiscoveryResponse or CloudInstanceDiscoveryErrorResponse");
                return null;
            }
            this.logger.verbose("Attempting to find a match between the developer's authority and the CloudInstanceDiscoveryMetadata returned from the network request.");
            match = getCloudDiscoveryMetadataFromNetworkResponse(metadata, this.hostnameAndPort);
        }
        catch (error) {
            if (error instanceof AuthError) {
                this.logger.error(`There was a network error while attempting to get the cloud discovery instance metadata.\nError: ${error.errorCode}\nError Description: ${error.errorMessage}`);
            }
            else {
                const typedError = error;
                this.logger.error(`A non-MSALJS error was thrown while attempting to get the cloud instance discovery metadata.\nError: ${typedError.name}\nError Description: ${typedError.message}`);
            }
            return null;
        }
        // Custom Domain scenario, host is trusted because Instance Discovery call succeeded
        if (!match) {
            this.logger.warning("The developer's authority was not found within the CloudInstanceDiscoveryMetadata returned from the network request.");
            this.logger.verbose("Creating custom Authority for custom domain scenario.");
            match = Authority.createCloudDiscoveryMetadataFromHost(this.hostnameAndPort);
        }
        return match;
    }
    /**
     * Helper function to determine if this host is included in the knownAuthorities config option
     */
    isInKnownAuthorities() {
        const matches = this.authorityOptions.knownAuthorities.filter((authority) => {
            return (authority &&
                UrlString.getDomainFromUrl(authority).toLowerCase() ===
                    this.hostnameAndPort);
        });
        return matches.length > 0;
    }
    /**
     * helper function to populate the authority based on azureCloudOptions
     * @param authorityString
     * @param azureCloudOptions
     */
    static generateAuthority(authorityString, azureCloudOptions) {
        let authorityAzureCloudInstance;
        if (azureCloudOptions &&
            azureCloudOptions.azureCloudInstance !== AzureCloudInstance.None) {
            const tenant = azureCloudOptions.tenant
                ? azureCloudOptions.tenant
                : Constants$1.DEFAULT_COMMON_TENANT;
            authorityAzureCloudInstance = `${azureCloudOptions.azureCloudInstance}/${tenant}/`;
        }
        return authorityAzureCloudInstance
            ? authorityAzureCloudInstance
            : authorityString;
    }
    /**
     * Creates cloud discovery metadata object from a given host
     * @param host
     */
    static createCloudDiscoveryMetadataFromHost(host) {
        return {
            preferred_network: host,
            preferred_cache: host,
            aliases: [host],
        };
    }
    /**
     * helper function to generate environment from authority object
     */
    getPreferredCache() {
        if (this.managedIdentity) {
            return Constants$1.DEFAULT_AUTHORITY_HOST;
        }
        else if (this.discoveryComplete()) {
            return this.metadata.preferred_cache;
        }
        else {
            throw createClientAuthError(endpointResolutionError);
        }
    }
    /**
     * Returns whether or not the provided host is an alias of this authority instance
     * @param host
     */
    isAlias(host) {
        return this.metadata.aliases.indexOf(host) > -1;
    }
    /**
     * Returns whether or not the provided host is an alias of a known Microsoft authority for purposes of endpoint discovery
     * @param host
     */
    isAliasOfKnownMicrosoftAuthority(host) {
        return InstanceDiscoveryMetadataAliases.has(host);
    }
    /**
     * Checks whether the provided host is that of a public cloud authority
     *
     * @param authority string
     * @returns bool
     */
    static isPublicCloudAuthority(host) {
        return Constants$1.KNOWN_PUBLIC_CLOUDS.indexOf(host) >= 0;
    }
    /**
     * Rebuild the authority string with the region
     *
     * @param host string
     * @param region string
     */
    static buildRegionalAuthorityString(host, region, queryString) {
        // Create and validate a Url string object with the initial authority string
        const authorityUrlInstance = new UrlString(host);
        authorityUrlInstance.validateAsUri();
        const authorityUrlParts = authorityUrlInstance.getUrlComponents();
        let hostNameAndPort = `${region}.${authorityUrlParts.HostNameAndPort}`;
        if (this.isPublicCloudAuthority(authorityUrlParts.HostNameAndPort)) {
            hostNameAndPort = `${region}.${Constants$1.REGIONAL_AUTH_PUBLIC_CLOUD_SUFFIX}`;
        }
        // Include the query string portion of the url
        const url = UrlString.constructAuthorityUriFromObject({
            ...authorityUrlInstance.getUrlComponents(),
            HostNameAndPort: hostNameAndPort,
        }).urlString;
        // Add the query string if a query string was provided
        if (queryString)
            return `${url}?${queryString}`;
        return url;
    }
    /**
     * Replace the endpoints in the metadata object with their regional equivalents.
     *
     * @param metadata OpenIdConfigResponse
     * @param azureRegion string
     */
    static replaceWithRegionalInformation(metadata, azureRegion) {
        const regionalMetadata = { ...metadata };
        regionalMetadata.authorization_endpoint =
            Authority.buildRegionalAuthorityString(regionalMetadata.authorization_endpoint, azureRegion);
        regionalMetadata.token_endpoint =
            Authority.buildRegionalAuthorityString(regionalMetadata.token_endpoint, azureRegion);
        if (regionalMetadata.end_session_endpoint) {
            regionalMetadata.end_session_endpoint =
                Authority.buildRegionalAuthorityString(regionalMetadata.end_session_endpoint, azureRegion);
        }
        return regionalMetadata;
    }
    /**
     * Transform CIAM_AUTHORIY as per the below rules:
     * If no path segments found and it is a CIAM authority (hostname ends with .ciamlogin.com), then transform it
     *
     * NOTE: The transformation path should go away once STS supports CIAM with the format: `tenantIdorDomain.ciamlogin.com`
     * `ciamlogin.com` can also change in the future and we should accommodate the same
     *
     * @param authority
     */
    static transformCIAMAuthority(authority) {
        let ciamAuthority = authority;
        const authorityUrl = new UrlString(authority);
        const authorityUrlComponents = authorityUrl.getUrlComponents();
        // check if transformation is needed
        if (authorityUrlComponents.PathSegments.length === 0 &&
            authorityUrlComponents.HostNameAndPort.endsWith(Constants$1.CIAM_AUTH_URL)) {
            const tenantIdOrDomain = authorityUrlComponents.HostNameAndPort.split(".")[0];
            ciamAuthority = `${ciamAuthority}${tenantIdOrDomain}${Constants$1.AAD_TENANT_DOMAIN_SUFFIX}`;
        }
        return ciamAuthority;
    }
}
// Reserved tenant domain names that will not be replaced with tenant id
Authority.reservedTenantDomains = new Set([
    "{tenant}",
    "{tenantid}",
    AADAuthorityConstants.COMMON,
    AADAuthorityConstants.CONSUMERS,
    AADAuthorityConstants.ORGANIZATIONS,
]);
/**
 * Extract tenantId from authority
 */
function getTenantFromAuthorityString(authority) {
    const authorityUrl = new UrlString(authority);
    const authorityUrlComponents = authorityUrl.getUrlComponents();
    /**
     * For credential matching purposes, tenantId is the last path segment of the authority URL:
     *  AAD Authority - domain/tenantId -> Credentials are cached with realm = tenantId
     *  B2C Authority - domain/{tenantId}?/.../policy -> Credentials are cached with realm = policy
     *  tenantId is downcased because B2C policies can have mixed case but tfp claim is downcased
     *
     * Note that we may not have any path segments in certain OIDC scenarios.
     */
    const tenantId = authorityUrlComponents.PathSegments.slice(-1)[0]?.toLowerCase();
    switch (tenantId) {
        case AADAuthorityConstants.COMMON:
        case AADAuthorityConstants.ORGANIZATIONS:
        case AADAuthorityConstants.CONSUMERS:
            return undefined;
        default:
            return tenantId;
    }
}
function formatAuthorityUri(authorityUri) {
    return authorityUri.endsWith(Constants$1.FORWARD_SLASH)
        ? authorityUri
        : `${authorityUri}${Constants$1.FORWARD_SLASH}`;
}
function buildStaticAuthorityOptions(authOptions) {
    const rawCloudDiscoveryMetadata = authOptions.cloudDiscoveryMetadata;
    let cloudDiscoveryMetadata = undefined;
    if (rawCloudDiscoveryMetadata) {
        try {
            cloudDiscoveryMetadata = JSON.parse(rawCloudDiscoveryMetadata);
        }
        catch (e) {
            throw createClientConfigurationError(invalidCloudDiscoveryMetadata);
        }
    }
    return {
        canonicalAuthority: authOptions.authority
            ? formatAuthorityUri(authOptions.authority)
            : undefined,
        knownAuthorities: authOptions.knownAuthorities,
        cloudDiscoveryMetadata: cloudDiscoveryMetadata,
    };
}

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Create an authority object of the correct type based on the url
 * Performs basic authority validation - checks to see if the authority is of a valid type (i.e. aad, b2c, adfs)
 *
 * Also performs endpoint discovery.
 *
 * @param authorityUri
 * @param networkClient
 * @param protocolMode
 * @internal
 */
async function createDiscoveredInstance(authorityUri, networkClient, cacheManager, authorityOptions, logger, correlationId, performanceClient) {
    performanceClient?.addQueueMeasurement(PerformanceEvents.AuthorityFactoryCreateDiscoveredInstance, correlationId);
    const authorityUriFinal = Authority.transformCIAMAuthority(formatAuthorityUri(authorityUri));
    // Initialize authority and perform discovery endpoint check.
    const acquireTokenAuthority = new Authority(authorityUriFinal, networkClient, cacheManager, authorityOptions, logger, correlationId, performanceClient);
    try {
        await invokeAsync(acquireTokenAuthority.resolveEndpointsAsync.bind(acquireTokenAuthority), PerformanceEvents.AuthorityResolveEndpointsAsync, logger, performanceClient, correlationId)();
        return acquireTokenAuthority;
    }
    catch (e) {
        throw createClientAuthError(endpointResolutionError);
    }
}

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Error thrown when there is an error with the server code, for example, unavailability.
 */
class ServerError extends AuthError {
    constructor(errorCode, errorMessage, subError, errorNo, status) {
        super(errorCode, errorMessage, subError);
        this.name = "ServerError";
        this.errorNo = errorNo;
        this.status = status;
        Object.setPrototypeOf(this, ServerError.prototype);
    }
}

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/** @internal */
class ThrottlingUtils {
    /**
     * Prepares a RequestThumbprint to be stored as a key.
     * @param thumbprint
     */
    static generateThrottlingStorageKey(thumbprint) {
        return `${ThrottlingConstants.THROTTLING_PREFIX}.${JSON.stringify(thumbprint)}`;
    }
    /**
     * Performs necessary throttling checks before a network request.
     * @param cacheManager
     * @param thumbprint
     */
    static preProcess(cacheManager, thumbprint) {
        const key = ThrottlingUtils.generateThrottlingStorageKey(thumbprint);
        const value = cacheManager.getThrottlingCache(key);
        if (value) {
            if (value.throttleTime < Date.now()) {
                cacheManager.removeItem(key);
                return;
            }
            throw new ServerError(value.errorCodes?.join(" ") || Constants$1.EMPTY_STRING, value.errorMessage, value.subError);
        }
    }
    /**
     * Performs necessary throttling checks after a network request.
     * @param cacheManager
     * @param thumbprint
     * @param response
     */
    static postProcess(cacheManager, thumbprint, response) {
        if (ThrottlingUtils.checkResponseStatus(response) ||
            ThrottlingUtils.checkResponseForRetryAfter(response)) {
            const thumbprintValue = {
                throttleTime: ThrottlingUtils.calculateThrottleTime(parseInt(response.headers[HeaderNames.RETRY_AFTER])),
                error: response.body.error,
                errorCodes: response.body.error_codes,
                errorMessage: response.body.error_description,
                subError: response.body.suberror,
            };
            cacheManager.setThrottlingCache(ThrottlingUtils.generateThrottlingStorageKey(thumbprint), thumbprintValue);
        }
    }
    /**
     * Checks a NetworkResponse object's status codes against 429 or 5xx
     * @param response
     */
    static checkResponseStatus(response) {
        return (response.status === 429 ||
            (response.status >= 500 && response.status < 600));
    }
    /**
     * Checks a NetworkResponse object's RetryAfter header
     * @param response
     */
    static checkResponseForRetryAfter(response) {
        if (response.headers) {
            return (response.headers.hasOwnProperty(HeaderNames.RETRY_AFTER) &&
                (response.status < 200 || response.status >= 300));
        }
        return false;
    }
    /**
     * Calculates the Unix-time value for a throttle to expire given throttleTime in seconds.
     * @param throttleTime
     */
    static calculateThrottleTime(throttleTime) {
        const time = throttleTime <= 0 ? 0 : throttleTime;
        const currentSeconds = Date.now() / 1000;
        return Math.floor(Math.min(currentSeconds +
            (time || ThrottlingConstants.DEFAULT_THROTTLE_TIME_SECONDS), currentSeconds +
            ThrottlingConstants.DEFAULT_MAX_THROTTLE_TIME_SECONDS) * 1000);
    }
    static removeThrottle(cacheManager, clientId, request, homeAccountIdentifier) {
        const thumbprint = {
            clientId: clientId,
            authority: request.authority,
            scopes: request.scopes,
            homeAccountIdentifier: homeAccountIdentifier,
            claims: request.claims,
            authenticationScheme: request.authenticationScheme,
            resourceRequestMethod: request.resourceRequestMethod,
            resourceRequestUri: request.resourceRequestUri,
            shrClaims: request.shrClaims,
            sshKid: request.sshKid,
        };
        const key = this.generateThrottlingStorageKey(thumbprint);
        cacheManager.removeItem(key);
    }
}

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Represents network related errors
 */
class NetworkError extends AuthError {
    constructor(error, httpStatus, responseHeaders) {
        super(error.errorCode, error.errorMessage, error.subError);
        Object.setPrototypeOf(this, NetworkError.prototype);
        this.name = "NetworkError";
        this.error = error;
        this.httpStatus = httpStatus;
        this.responseHeaders = responseHeaders;
    }
}

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Base application class which will construct requests to send to and handle responses from the Microsoft STS using the authorization code flow.
 * @internal
 */
class BaseClient {
    constructor(configuration, performanceClient) {
        // Set the configuration
        this.config = buildClientConfiguration(configuration);
        // Initialize the logger
        this.logger = new Logger(this.config.loggerOptions, name$1, version$1);
        // Initialize crypto
        this.cryptoUtils = this.config.cryptoInterface;
        // Initialize storage interface
        this.cacheManager = this.config.storageInterface;
        // Set the network interface
        this.networkClient = this.config.networkInterface;
        // Set TelemetryManager
        this.serverTelemetryManager = this.config.serverTelemetryManager;
        // set Authority
        this.authority = this.config.authOptions.authority;
        // set performance telemetry client
        this.performanceClient = performanceClient;
    }
    /**
     * Creates default headers for requests to token endpoint
     */
    createTokenRequestHeaders(ccsCred) {
        const headers = {};
        headers[HeaderNames.CONTENT_TYPE] = Constants$1.URL_FORM_CONTENT_TYPE;
        if (!this.config.systemOptions.preventCorsPreflight && ccsCred) {
            switch (ccsCred.type) {
                case CcsCredentialType.HOME_ACCOUNT_ID:
                    try {
                        const clientInfo = buildClientInfoFromHomeAccountId(ccsCred.credential);
                        headers[HeaderNames.CCS_HEADER] = `Oid:${clientInfo.uid}@${clientInfo.utid}`;
                    }
                    catch (e) {
                        this.logger.verbose("Could not parse home account ID for CCS Header: " +
                            e);
                    }
                    break;
                case CcsCredentialType.UPN:
                    headers[HeaderNames.CCS_HEADER] = `UPN: ${ccsCred.credential}`;
                    break;
            }
        }
        return headers;
    }
    /**
     * Http post to token endpoint
     * @param tokenEndpoint
     * @param queryString
     * @param headers
     * @param thumbprint
     */
    async executePostToTokenEndpoint(tokenEndpoint, queryString, headers, thumbprint, correlationId, queuedEvent) {
        if (queuedEvent) {
            this.performanceClient?.addQueueMeasurement(queuedEvent, correlationId);
        }
        const response = await this.sendPostRequest(thumbprint, tokenEndpoint, { body: queryString, headers: headers }, correlationId);
        if (this.config.serverTelemetryManager &&
            response.status < 500 &&
            response.status !== 429) {
            // Telemetry data successfully logged by server, clear Telemetry cache
            this.config.serverTelemetryManager.clearTelemetryCache();
        }
        return response;
    }
    /**
     * Wraps sendPostRequestAsync with necessary preflight and postflight logic
     * @param thumbprint - Request thumbprint for throttling
     * @param tokenEndpoint - Endpoint to make the POST to
     * @param options - Body and Headers to include on the POST request
     * @param correlationId - CorrelationId for telemetry
     */
    async sendPostRequest(thumbprint, tokenEndpoint, options, correlationId) {
        ThrottlingUtils.preProcess(this.cacheManager, thumbprint);
        let response;
        try {
            response = await invokeAsync((this.networkClient.sendPostRequestAsync.bind(this.networkClient)), PerformanceEvents.NetworkClientSendPostRequestAsync, this.logger, this.performanceClient, correlationId)(tokenEndpoint, options);
            const responseHeaders = response.headers || {};
            this.performanceClient?.addFields({
                refreshTokenSize: response.body.refresh_token?.length || 0,
                httpVerToken: responseHeaders[HeaderNames.X_MS_HTTP_VERSION] || "",
                requestId: responseHeaders[HeaderNames.X_MS_REQUEST_ID] || "",
            }, correlationId);
        }
        catch (e) {
            if (e instanceof NetworkError) {
                const responseHeaders = e.responseHeaders;
                if (responseHeaders) {
                    this.performanceClient?.addFields({
                        httpVerToken: responseHeaders[HeaderNames.X_MS_HTTP_VERSION] || "",
                        requestId: responseHeaders[HeaderNames.X_MS_REQUEST_ID] ||
                            "",
                        contentTypeHeader: responseHeaders[HeaderNames.CONTENT_TYPE] ||
                            undefined,
                        contentLengthHeader: responseHeaders[HeaderNames.CONTENT_LENGTH] ||
                            undefined,
                        httpStatus: e.httpStatus,
                    }, correlationId);
                }
                throw e.error;
            }
            if (e instanceof AuthError) {
                throw e;
            }
            else {
                throw createClientAuthError(networkError);
            }
        }
        ThrottlingUtils.postProcess(this.cacheManager, thumbprint, response);
        return response;
    }
    /**
     * Updates the authority object of the client. Endpoint discovery must be completed.
     * @param updatedAuthority
     */
    async updateAuthority(cloudInstanceHostname, correlationId) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.UpdateTokenEndpointAuthority, correlationId);
        const cloudInstanceAuthorityUri = `https://${cloudInstanceHostname}/${this.authority.tenant}/`;
        const cloudInstanceAuthority = await createDiscoveredInstance(cloudInstanceAuthorityUri, this.networkClient, this.cacheManager, this.authority.options, this.logger, correlationId, this.performanceClient);
        this.authority = cloudInstanceAuthority;
    }
    /**
     * Creates query string for the /token request
     * @param request
     */
    createTokenQueryParameters(request) {
        const parameterBuilder = new RequestParameterBuilder(request.correlationId, this.performanceClient);
        if (request.embeddedClientId) {
            parameterBuilder.addBrokerParameters({
                brokerClientId: this.config.authOptions.clientId,
                brokerRedirectUri: this.config.authOptions.redirectUri,
            });
        }
        if (request.tokenQueryParameters) {
            parameterBuilder.addExtraQueryParameters(request.tokenQueryParameters);
        }
        parameterBuilder.addCorrelationId(request.correlationId);
        return parameterBuilder.createQueryString();
    }
}

/*! @azure/msal-common v14.16.0 2024-11-05 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
// Codes defined by MSAL
const noTokensFound = "no_tokens_found";
const nativeAccountUnavailable = "native_account_unavailable";
const refreshTokenExpired = "refresh_token_expired";
// Codes potentially returned by server
const interactionRequired = "interaction_required";
const consentRequired = "consent_required";
const loginRequired = "login_required";
const badToken = "bad_token";

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * InteractionRequiredServerErrorMessage contains string constants used by error codes and messages returned by the server indicating interaction is required
 */
const InteractionRequiredServerErrorMessage = [
    interactionRequired,
    consentRequired,
    loginRequired,
    badToken,
];
const InteractionRequiredAuthSubErrorMessage = [
    "message_only",
    "additional_action",
    "basic_action",
    "user_password_expired",
    "consent_required",
    "bad_token",
];
const InteractionRequiredAuthErrorMessages = {
    [noTokensFound]: "No refresh token found in the cache. Please sign-in.",
    [nativeAccountUnavailable]: "The requested account is not available in the native broker. It may have been deleted or logged out. Please sign-in again using an interactive API.",
    [refreshTokenExpired]: "Refresh token has expired.",
    [badToken]: "Identity provider returned bad_token due to an expired or invalid refresh token. Please invoke an interactive API to resolve.",
};
/**
 * Error thrown when user interaction is required.
 */
class InteractionRequiredAuthError extends AuthError {
    constructor(errorCode, errorMessage, subError, timestamp, traceId, correlationId, claims, errorNo) {
        super(errorCode, errorMessage, subError);
        Object.setPrototypeOf(this, InteractionRequiredAuthError.prototype);
        this.timestamp = timestamp || Constants$1.EMPTY_STRING;
        this.traceId = traceId || Constants$1.EMPTY_STRING;
        this.correlationId = correlationId || Constants$1.EMPTY_STRING;
        this.claims = claims || Constants$1.EMPTY_STRING;
        this.name = "InteractionRequiredAuthError";
        this.errorNo = errorNo;
    }
}
/**
 * Helper function used to determine if an error thrown by the server requires interaction to resolve
 * @param errorCode
 * @param errorString
 * @param subError
 */
function isInteractionRequiredError(errorCode, errorString, subError) {
    const isInteractionRequiredErrorCode = !!errorCode &&
        InteractionRequiredServerErrorMessage.indexOf(errorCode) > -1;
    const isInteractionRequiredSubError = !!subError &&
        InteractionRequiredAuthSubErrorMessage.indexOf(subError) > -1;
    const isInteractionRequiredErrorDesc = !!errorString &&
        InteractionRequiredServerErrorMessage.some((irErrorCode) => {
            return errorString.indexOf(irErrorCode) > -1;
        });
    return (isInteractionRequiredErrorCode ||
        isInteractionRequiredErrorDesc ||
        isInteractionRequiredSubError);
}
/**
 * Creates an InteractionRequiredAuthError
 */
function createInteractionRequiredAuthError(errorCode) {
    return new InteractionRequiredAuthError(errorCode, InteractionRequiredAuthErrorMessages[errorCode]);
}

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Class which provides helpers for OAuth 2.0 protocol specific values
 */
class ProtocolUtils {
    /**
     * Appends user state with random guid, or returns random guid.
     * @param userState
     * @param randomGuid
     */
    static setRequestState(cryptoObj, userState, meta) {
        const libraryState = ProtocolUtils.generateLibraryState(cryptoObj, meta);
        return userState
            ? `${libraryState}${Constants$1.RESOURCE_DELIM}${userState}`
            : libraryState;
    }
    /**
     * Generates the state value used by the common library.
     * @param randomGuid
     * @param cryptoObj
     */
    static generateLibraryState(cryptoObj, meta) {
        if (!cryptoObj) {
            throw createClientAuthError(noCryptoObject);
        }
        // Create a state object containing a unique id and the timestamp of the request creation
        const stateObj = {
            id: cryptoObj.createNewGuid(),
        };
        if (meta) {
            stateObj.meta = meta;
        }
        const stateString = JSON.stringify(stateObj);
        return cryptoObj.base64Encode(stateString);
    }
    /**
     * Parses the state into the RequestStateObject, which contains the LibraryState info and the state passed by the user.
     * @param state
     * @param cryptoObj
     */
    static parseRequestState(cryptoObj, state) {
        if (!cryptoObj) {
            throw createClientAuthError(noCryptoObject);
        }
        if (!state) {
            throw createClientAuthError(invalidState);
        }
        try {
            // Split the state between library state and user passed state and decode them separately
            const splitState = state.split(Constants$1.RESOURCE_DELIM);
            const libraryState = splitState[0];
            const userState = splitState.length > 1
                ? splitState.slice(1).join(Constants$1.RESOURCE_DELIM)
                : Constants$1.EMPTY_STRING;
            const libraryStateString = cryptoObj.base64Decode(libraryState);
            const libraryStateObj = JSON.parse(libraryStateString);
            return {
                userRequestState: userState || Constants$1.EMPTY_STRING,
                libraryState: libraryStateObj,
            };
        }
        catch (e) {
            throw createClientAuthError(invalidState);
        }
    }
}

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const KeyLocation = {
    SW: "sw",
    UHW: "uhw",
};
/** @internal */
class PopTokenGenerator {
    constructor(cryptoUtils, performanceClient) {
        this.cryptoUtils = cryptoUtils;
        this.performanceClient = performanceClient;
    }
    /**
     * Generates the req_cnf validated at the RP in the POP protocol for SHR parameters
     * and returns an object containing the keyid, the full req_cnf string and the req_cnf string hash
     * @param request
     * @returns
     */
    async generateCnf(request, logger) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.PopTokenGenerateCnf, request.correlationId);
        const reqCnf = await invokeAsync(this.generateKid.bind(this), PerformanceEvents.PopTokenGenerateCnf, logger, this.performanceClient, request.correlationId)(request);
        const reqCnfString = this.cryptoUtils.base64UrlEncode(JSON.stringify(reqCnf));
        return {
            kid: reqCnf.kid,
            reqCnfString,
        };
    }
    /**
     * Generates key_id for a SHR token request
     * @param request
     * @returns
     */
    async generateKid(request) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.PopTokenGenerateKid, request.correlationId);
        const kidThumbprint = await this.cryptoUtils.getPublicKeyThumbprint(request);
        return {
            kid: kidThumbprint,
            xms_ksl: KeyLocation.SW,
        };
    }
    /**
     * Signs the POP access_token with the local generated key-pair
     * @param accessToken
     * @param request
     * @returns
     */
    async signPopToken(accessToken, keyId, request) {
        return this.signPayload(accessToken, keyId, request);
    }
    /**
     * Utility function to generate the signed JWT for an access_token
     * @param payload
     * @param kid
     * @param request
     * @param claims
     * @returns
     */
    async signPayload(payload, keyId, request, claims) {
        // Deconstruct request to extract SHR parameters
        const { resourceRequestMethod, resourceRequestUri, shrClaims, shrNonce, shrOptions, } = request;
        const resourceUrlString = resourceRequestUri
            ? new UrlString(resourceRequestUri)
            : undefined;
        const resourceUrlComponents = resourceUrlString?.getUrlComponents();
        return this.cryptoUtils.signJwt({
            at: payload,
            ts: nowSeconds(),
            m: resourceRequestMethod?.toUpperCase(),
            u: resourceUrlComponents?.HostNameAndPort,
            nonce: shrNonce || this.cryptoUtils.createNewGuid(),
            p: resourceUrlComponents?.AbsolutePath,
            q: resourceUrlComponents?.QueryString
                ? [[], resourceUrlComponents.QueryString]
                : undefined,
            client_claims: shrClaims || undefined,
            ...claims,
        }, keyId, shrOptions, request.correlationId);
    }
}

/*! @azure/msal-common v14.16.0 2024-11-05 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * This class instance helps track the memory changes facilitating
 * decisions to read from and write to the persistent cache
 */ class TokenCacheContext {
    constructor(tokenCache, hasChanged) {
        this.cache = tokenCache;
        this.hasChanged = hasChanged;
    }
    /**
     * boolean which indicates the changes in cache
     */
    get cacheHasChanged() {
        return this.hasChanged;
    }
    /**
     * function to retrieve the token cache
     */
    get tokenCache() {
        return this.cache;
    }
}

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
function parseServerErrorNo(serverResponse) {
    const errorCodePrefix = "code=";
    const errorCodePrefixIndex = serverResponse.error_uri?.lastIndexOf(errorCodePrefix);
    return errorCodePrefixIndex && errorCodePrefixIndex >= 0
        ? serverResponse.error_uri?.substring(errorCodePrefixIndex + errorCodePrefix.length)
        : undefined;
}
/**
 * Class that handles response parsing.
 * @internal
 */
class ResponseHandler {
    constructor(clientId, cacheStorage, cryptoObj, logger, serializableCache, persistencePlugin, performanceClient) {
        this.clientId = clientId;
        this.cacheStorage = cacheStorage;
        this.cryptoObj = cryptoObj;
        this.logger = logger;
        this.serializableCache = serializableCache;
        this.persistencePlugin = persistencePlugin;
        this.performanceClient = performanceClient;
    }
    /**
     * Function which validates server authorization code response.
     * @param serverResponseHash
     * @param requestState
     * @param cryptoObj
     */
    validateServerAuthorizationCodeResponse(serverResponse, requestState) {
        if (!serverResponse.state || !requestState) {
            throw serverResponse.state
                ? createClientAuthError(stateNotFound, "Cached State")
                : createClientAuthError(stateNotFound, "Server State");
        }
        let decodedServerResponseState;
        let decodedRequestState;
        try {
            decodedServerResponseState = decodeURIComponent(serverResponse.state);
        }
        catch (e) {
            throw createClientAuthError(invalidState, serverResponse.state);
        }
        try {
            decodedRequestState = decodeURIComponent(requestState);
        }
        catch (e) {
            throw createClientAuthError(invalidState, serverResponse.state);
        }
        if (decodedServerResponseState !== decodedRequestState) {
            throw createClientAuthError(stateMismatch);
        }
        // Check for error
        if (serverResponse.error ||
            serverResponse.error_description ||
            serverResponse.suberror) {
            const serverErrorNo = parseServerErrorNo(serverResponse);
            if (isInteractionRequiredError(serverResponse.error, serverResponse.error_description, serverResponse.suberror)) {
                throw new InteractionRequiredAuthError(serverResponse.error || "", serverResponse.error_description, serverResponse.suberror, serverResponse.timestamp || "", serverResponse.trace_id || "", serverResponse.correlation_id || "", serverResponse.claims || "", serverErrorNo);
            }
            throw new ServerError(serverResponse.error || "", serverResponse.error_description, serverResponse.suberror, serverErrorNo);
        }
    }
    /**
     * Function which validates server authorization token response.
     * @param serverResponse
     * @param refreshAccessToken
     */
    validateTokenResponse(serverResponse, refreshAccessToken) {
        // Check for error
        if (serverResponse.error ||
            serverResponse.error_description ||
            serverResponse.suberror) {
            const errString = `Error(s): ${serverResponse.error_codes || Constants$1.NOT_AVAILABLE} - Timestamp: ${serverResponse.timestamp || Constants$1.NOT_AVAILABLE} - Description: ${serverResponse.error_description || Constants$1.NOT_AVAILABLE} - Correlation ID: ${serverResponse.correlation_id || Constants$1.NOT_AVAILABLE} - Trace ID: ${serverResponse.trace_id || Constants$1.NOT_AVAILABLE}`;
            const serverErrorNo = serverResponse.error_codes?.length
                ? serverResponse.error_codes[0]
                : undefined;
            const serverError = new ServerError(serverResponse.error, errString, serverResponse.suberror, serverErrorNo, serverResponse.status);
            // check if 500 error
            if (refreshAccessToken &&
                serverResponse.status &&
                serverResponse.status >= HttpStatus.SERVER_ERROR_RANGE_START &&
                serverResponse.status <= HttpStatus.SERVER_ERROR_RANGE_END) {
                this.logger.warning(`executeTokenRequest:validateTokenResponse - AAD is currently unavailable and the access token is unable to be refreshed.\n${serverError}`);
                // don't throw an exception, but alert the user via a log that the token was unable to be refreshed
                return;
                // check if 400 error
            }
            else if (refreshAccessToken &&
                serverResponse.status &&
                serverResponse.status >= HttpStatus.CLIENT_ERROR_RANGE_START &&
                serverResponse.status <= HttpStatus.CLIENT_ERROR_RANGE_END) {
                this.logger.warning(`executeTokenRequest:validateTokenResponse - AAD is currently available but is unable to refresh the access token.\n${serverError}`);
                // don't throw an exception, but alert the user via a log that the token was unable to be refreshed
                return;
            }
            if (isInteractionRequiredError(serverResponse.error, serverResponse.error_description, serverResponse.suberror)) {
                throw new InteractionRequiredAuthError(serverResponse.error, serverResponse.error_description, serverResponse.suberror, serverResponse.timestamp || Constants$1.EMPTY_STRING, serverResponse.trace_id || Constants$1.EMPTY_STRING, serverResponse.correlation_id || Constants$1.EMPTY_STRING, serverResponse.claims || Constants$1.EMPTY_STRING, serverErrorNo);
            }
            throw serverError;
        }
    }
    /**
     * Returns a constructed token response based on given string. Also manages the cache updates and cleanups.
     * @param serverTokenResponse
     * @param authority
     */
    async handleServerTokenResponse(serverTokenResponse, authority, reqTimestamp, request, authCodePayload, userAssertionHash, handlingRefreshTokenResponse, forceCacheRefreshTokenResponse, serverRequestId) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.HandleServerTokenResponse, serverTokenResponse.correlation_id);
        // create an idToken object (not entity)
        let idTokenClaims;
        if (serverTokenResponse.id_token) {
            idTokenClaims = extractTokenClaims(serverTokenResponse.id_token || Constants$1.EMPTY_STRING, this.cryptoObj.base64Decode);
            // token nonce check (TODO: Add a warning if no nonce is given?)
            if (authCodePayload && authCodePayload.nonce) {
                if (idTokenClaims.nonce !== authCodePayload.nonce) {
                    throw createClientAuthError(nonceMismatch);
                }
            }
            // token max_age check
            if (request.maxAge || request.maxAge === 0) {
                const authTime = idTokenClaims.auth_time;
                if (!authTime) {
                    throw createClientAuthError(authTimeNotFound);
                }
                checkMaxAge(authTime, request.maxAge);
            }
        }
        // generate homeAccountId
        this.homeAccountIdentifier = AccountEntity.generateHomeAccountId(serverTokenResponse.client_info || Constants$1.EMPTY_STRING, authority.authorityType, this.logger, this.cryptoObj, idTokenClaims);
        // save the response tokens
        let requestStateObj;
        if (!!authCodePayload && !!authCodePayload.state) {
            requestStateObj = ProtocolUtils.parseRequestState(this.cryptoObj, authCodePayload.state);
        }
        // Add keyId from request to serverTokenResponse if defined
        serverTokenResponse.key_id =
            serverTokenResponse.key_id || request.sshKid || undefined;
        const cacheRecord = this.generateCacheRecord(serverTokenResponse, authority, reqTimestamp, request, idTokenClaims, userAssertionHash, authCodePayload);
        let cacheContext;
        try {
            if (this.persistencePlugin && this.serializableCache) {
                this.logger.verbose("Persistence enabled, calling beforeCacheAccess");
                cacheContext = new TokenCacheContext(this.serializableCache, true);
                await this.persistencePlugin.beforeCacheAccess(cacheContext);
            }
            /*
             * When saving a refreshed tokens to the cache, it is expected that the account that was used is present in the cache.
             * If not present, we should return null, as it's the case that another application called removeAccount in between
             * the calls to getAllAccounts and acquireTokenSilent. We should not overwrite that removal, unless explicitly flagged by
             * the developer, as in the case of refresh token flow used in ADAL Node to MSAL Node migration.
             */
            if (handlingRefreshTokenResponse &&
                !forceCacheRefreshTokenResponse &&
                cacheRecord.account) {
                const key = cacheRecord.account.generateAccountKey();
                const account = this.cacheStorage.getAccount(key, this.logger);
                if (!account) {
                    this.logger.warning("Account used to refresh tokens not in persistence, refreshed tokens will not be stored in the cache");
                    return await ResponseHandler.generateAuthenticationResult(this.cryptoObj, authority, cacheRecord, false, request, idTokenClaims, requestStateObj, undefined, serverRequestId);
                }
            }
            await this.cacheStorage.saveCacheRecord(cacheRecord, request.storeInCache, request.correlationId);
        }
        finally {
            if (this.persistencePlugin &&
                this.serializableCache &&
                cacheContext) {
                this.logger.verbose("Persistence enabled, calling afterCacheAccess");
                await this.persistencePlugin.afterCacheAccess(cacheContext);
            }
        }
        return ResponseHandler.generateAuthenticationResult(this.cryptoObj, authority, cacheRecord, false, request, idTokenClaims, requestStateObj, serverTokenResponse, serverRequestId);
    }
    /**
     * Generates CacheRecord
     * @param serverTokenResponse
     * @param idTokenObj
     * @param authority
     */
    generateCacheRecord(serverTokenResponse, authority, reqTimestamp, request, idTokenClaims, userAssertionHash, authCodePayload) {
        const env = authority.getPreferredCache();
        if (!env) {
            throw createClientAuthError(invalidCacheEnvironment);
        }
        const claimsTenantId = getTenantIdFromIdTokenClaims(idTokenClaims);
        // IdToken: non AAD scenarios can have empty realm
        let cachedIdToken;
        let cachedAccount;
        if (serverTokenResponse.id_token && !!idTokenClaims) {
            cachedIdToken = createIdTokenEntity(this.homeAccountIdentifier, env, serverTokenResponse.id_token, this.clientId, claimsTenantId || "");
            cachedAccount = buildAccountToCache(this.cacheStorage, authority, this.homeAccountIdentifier, this.cryptoObj.base64Decode, idTokenClaims, serverTokenResponse.client_info, env, claimsTenantId, authCodePayload, undefined, // nativeAccountId
            this.logger);
        }
        // AccessToken
        let cachedAccessToken = null;
        if (serverTokenResponse.access_token) {
            // If scopes not returned in server response, use request scopes
            const responseScopes = serverTokenResponse.scope
                ? ScopeSet.fromString(serverTokenResponse.scope)
                : new ScopeSet(request.scopes || []);
            /*
             * Use timestamp calculated before request
             * Server may return timestamps as strings, parse to numbers if so.
             */
            const expiresIn = (typeof serverTokenResponse.expires_in === "string"
                ? parseInt(serverTokenResponse.expires_in, 10)
                : serverTokenResponse.expires_in) || 0;
            const extExpiresIn = (typeof serverTokenResponse.ext_expires_in === "string"
                ? parseInt(serverTokenResponse.ext_expires_in, 10)
                : serverTokenResponse.ext_expires_in) || 0;
            const refreshIn = (typeof serverTokenResponse.refresh_in === "string"
                ? parseInt(serverTokenResponse.refresh_in, 10)
                : serverTokenResponse.refresh_in) || undefined;
            const tokenExpirationSeconds = reqTimestamp + expiresIn;
            const extendedTokenExpirationSeconds = tokenExpirationSeconds + extExpiresIn;
            const refreshOnSeconds = refreshIn && refreshIn > 0
                ? reqTimestamp + refreshIn
                : undefined;
            // non AAD scenarios can have empty realm
            cachedAccessToken = createAccessTokenEntity(this.homeAccountIdentifier, env, serverTokenResponse.access_token, this.clientId, claimsTenantId || authority.tenant || "", responseScopes.printScopes(), tokenExpirationSeconds, extendedTokenExpirationSeconds, this.cryptoObj.base64Decode, refreshOnSeconds, serverTokenResponse.token_type, userAssertionHash, serverTokenResponse.key_id, request.claims, request.requestedClaimsHash);
        }
        // refreshToken
        let cachedRefreshToken = null;
        if (serverTokenResponse.refresh_token) {
            let rtExpiresOn;
            if (serverTokenResponse.refresh_token_expires_in) {
                const rtExpiresIn = typeof serverTokenResponse.refresh_token_expires_in ===
                    "string"
                    ? parseInt(serverTokenResponse.refresh_token_expires_in, 10)
                    : serverTokenResponse.refresh_token_expires_in;
                rtExpiresOn = reqTimestamp + rtExpiresIn;
            }
            cachedRefreshToken = createRefreshTokenEntity(this.homeAccountIdentifier, env, serverTokenResponse.refresh_token, this.clientId, serverTokenResponse.foci, userAssertionHash, rtExpiresOn);
        }
        // appMetadata
        let cachedAppMetadata = null;
        if (serverTokenResponse.foci) {
            cachedAppMetadata = {
                clientId: this.clientId,
                environment: env,
                familyId: serverTokenResponse.foci,
            };
        }
        return {
            account: cachedAccount,
            idToken: cachedIdToken,
            accessToken: cachedAccessToken,
            refreshToken: cachedRefreshToken,
            appMetadata: cachedAppMetadata,
        };
    }
    /**
     * Creates an @AuthenticationResult from @CacheRecord , @IdToken , and a boolean that states whether or not the result is from cache.
     *
     * Optionally takes a state string that is set as-is in the response.
     *
     * @param cacheRecord
     * @param idTokenObj
     * @param fromTokenCache
     * @param stateString
     */
    static async generateAuthenticationResult(cryptoObj, authority, cacheRecord, fromTokenCache, request, idTokenClaims, requestState, serverTokenResponse, requestId) {
        let accessToken = Constants$1.EMPTY_STRING;
        let responseScopes = [];
        let expiresOn = null;
        let extExpiresOn;
        let refreshOn;
        let familyId = Constants$1.EMPTY_STRING;
        if (cacheRecord.accessToken) {
            /*
             * if the request object has `popKid` property, `signPopToken` will be set to false and
             * the token will be returned unsigned
             */
            if (cacheRecord.accessToken.tokenType ===
                AuthenticationScheme.POP &&
                !request.popKid) {
                const popTokenGenerator = new PopTokenGenerator(cryptoObj);
                const { secret, keyId } = cacheRecord.accessToken;
                if (!keyId) {
                    throw createClientAuthError(keyIdMissing);
                }
                accessToken = await popTokenGenerator.signPopToken(secret, keyId, request);
            }
            else {
                accessToken = cacheRecord.accessToken.secret;
            }
            responseScopes = ScopeSet.fromString(cacheRecord.accessToken.target).asArray();
            expiresOn = new Date(Number(cacheRecord.accessToken.expiresOn) * 1000);
            extExpiresOn = new Date(Number(cacheRecord.accessToken.extendedExpiresOn) * 1000);
            if (cacheRecord.accessToken.refreshOn) {
                refreshOn = new Date(Number(cacheRecord.accessToken.refreshOn) * 1000);
            }
        }
        if (cacheRecord.appMetadata) {
            familyId =
                cacheRecord.appMetadata.familyId === THE_FAMILY_ID
                    ? THE_FAMILY_ID
                    : "";
        }
        const uid = idTokenClaims?.oid || idTokenClaims?.sub || "";
        const tid = idTokenClaims?.tid || "";
        // for hybrid + native bridge enablement, send back the native account Id
        if (serverTokenResponse?.spa_accountid && !!cacheRecord.account) {
            cacheRecord.account.nativeAccountId =
                serverTokenResponse?.spa_accountid;
        }
        const accountInfo = cacheRecord.account
            ? updateAccountTenantProfileData(cacheRecord.account.getAccountInfo(), undefined, // tenantProfile optional
            idTokenClaims, cacheRecord.idToken?.secret)
            : null;
        return {
            authority: authority.canonicalAuthority,
            uniqueId: uid,
            tenantId: tid,
            scopes: responseScopes,
            account: accountInfo,
            idToken: cacheRecord?.idToken?.secret || "",
            idTokenClaims: idTokenClaims || {},
            accessToken: accessToken,
            fromCache: fromTokenCache,
            expiresOn: expiresOn,
            extExpiresOn: extExpiresOn,
            refreshOn: refreshOn,
            correlationId: request.correlationId,
            requestId: requestId || Constants$1.EMPTY_STRING,
            familyId: familyId,
            tokenType: cacheRecord.accessToken?.tokenType || Constants$1.EMPTY_STRING,
            state: requestState
                ? requestState.userRequestState
                : Constants$1.EMPTY_STRING,
            cloudGraphHostName: cacheRecord.account?.cloudGraphHostName ||
                Constants$1.EMPTY_STRING,
            msGraphHost: cacheRecord.account?.msGraphHost || Constants$1.EMPTY_STRING,
            code: serverTokenResponse?.spa_code,
            fromNativeBroker: false,
        };
    }
}
function buildAccountToCache(cacheStorage, authority, homeAccountId, base64Decode, idTokenClaims, clientInfo, environment, claimsTenantId, authCodePayload, nativeAccountId, logger) {
    logger?.verbose("setCachedAccount called");
    // Check if base account is already cached
    const accountKeys = cacheStorage.getAccountKeys();
    const baseAccountKey = accountKeys.find((accountKey) => {
        return accountKey.startsWith(homeAccountId);
    });
    let cachedAccount = null;
    if (baseAccountKey) {
        cachedAccount = cacheStorage.getAccount(baseAccountKey, logger);
    }
    const baseAccount = cachedAccount ||
        AccountEntity.createAccount({
            homeAccountId,
            idTokenClaims,
            clientInfo,
            environment,
            cloudGraphHostName: authCodePayload?.cloud_graph_host_name,
            msGraphHost: authCodePayload?.msgraph_host,
            nativeAccountId: nativeAccountId,
        }, authority, base64Decode);
    const tenantProfiles = baseAccount.tenantProfiles || [];
    const tenantId = claimsTenantId || baseAccount.realm;
    if (tenantId &&
        !tenantProfiles.find((tenantProfile) => {
            return tenantProfile.tenantId === tenantId;
        })) {
        const newTenantProfile = buildTenantProfile(homeAccountId, baseAccount.localAccountId, tenantId, idTokenClaims);
        tenantProfiles.push(newTenantProfile);
    }
    baseAccount.tenantProfiles = tenantProfiles;
    return baseAccount;
}

/*! @azure/msal-common v14.16.0 2024-11-05 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
async function getClientAssertion(clientAssertion, clientId, tokenEndpoint) {
    if (typeof clientAssertion === "string") {
        return clientAssertion;
    }
    else {
        const config = {
            clientId: clientId,
            tokenEndpoint: tokenEndpoint,
        };
        return clientAssertion(config);
    }
}

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Oauth2.0 Authorization Code client
 * @internal
 */
class AuthorizationCodeClient extends BaseClient {
    constructor(configuration, performanceClient) {
        super(configuration, performanceClient);
        // Flag to indicate if client is for hybrid spa auth code redemption
        this.includeRedirectUri = true;
        this.oidcDefaultScopes =
            this.config.authOptions.authority.options.OIDCOptions?.defaultScopes;
    }
    /**
     * Creates the URL of the authorization request letting the user input credentials and consent to the
     * application. The URL target the /authorize endpoint of the authority configured in the
     * application object.
     *
     * Once the user inputs their credentials and consents, the authority will send a response to the redirect URI
     * sent in the request and should contain an authorization code, which can then be used to acquire tokens via
     * acquireToken(AuthorizationCodeRequest)
     * @param request
     */
    async getAuthCodeUrl(request) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.GetAuthCodeUrl, request.correlationId);
        const queryString = await invokeAsync(this.createAuthCodeUrlQueryString.bind(this), PerformanceEvents.AuthClientCreateQueryString, this.logger, this.performanceClient, request.correlationId)(request);
        return UrlString.appendQueryString(this.authority.authorizationEndpoint, queryString);
    }
    /**
     * API to acquire a token in exchange of 'authorization_code` acquired by the user in the first leg of the
     * authorization_code_grant
     * @param request
     */
    async acquireToken(request, authCodePayload) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthClientAcquireToken, request.correlationId);
        if (!request.code) {
            throw createClientAuthError(requestCannotBeMade);
        }
        const reqTimestamp = nowSeconds();
        const response = await invokeAsync(this.executeTokenRequest.bind(this), PerformanceEvents.AuthClientExecuteTokenRequest, this.logger, this.performanceClient, request.correlationId)(this.authority, request);
        // Retrieve requestId from response headers
        const requestId = response.headers?.[HeaderNames.X_MS_REQUEST_ID];
        const responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin, this.performanceClient);
        // Validate response. This function throws a server error if an error is returned by the server.
        responseHandler.validateTokenResponse(response.body);
        return invokeAsync(responseHandler.handleServerTokenResponse.bind(responseHandler), PerformanceEvents.HandleServerTokenResponse, this.logger, this.performanceClient, request.correlationId)(response.body, this.authority, reqTimestamp, request, authCodePayload, undefined, undefined, undefined, requestId);
    }
    /**
     * Handles the hash fragment response from public client code request. Returns a code response used by
     * the client to exchange for a token in acquireToken.
     * @param hashFragment
     */
    handleFragmentResponse(serverParams, cachedState) {
        // Handle responses.
        const responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, null, null);
        // Get code response
        responseHandler.validateServerAuthorizationCodeResponse(serverParams, cachedState);
        // throw when there is no auth code in the response
        if (!serverParams.code) {
            throw createClientAuthError(authorizationCodeMissingFromServerResponse);
        }
        return serverParams;
    }
    /**
     * Used to log out the current user, and redirect the user to the postLogoutRedirectUri.
     * Default behaviour is to redirect the user to `window.location.href`.
     * @param authorityUri
     */
    getLogoutUri(logoutRequest) {
        // Throw error if logoutRequest is null/undefined
        if (!logoutRequest) {
            throw createClientConfigurationError(logoutRequestEmpty);
        }
        const queryString = this.createLogoutUrlQueryString(logoutRequest);
        // Construct logout URI
        return UrlString.appendQueryString(this.authority.endSessionEndpoint, queryString);
    }
    /**
     * Executes POST request to token endpoint
     * @param authority
     * @param request
     */
    async executeTokenRequest(authority, request) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthClientExecuteTokenRequest, request.correlationId);
        const queryParametersString = this.createTokenQueryParameters(request);
        const endpoint = UrlString.appendQueryString(authority.tokenEndpoint, queryParametersString);
        const requestBody = await invokeAsync(this.createTokenRequestBody.bind(this), PerformanceEvents.AuthClientCreateTokenRequestBody, this.logger, this.performanceClient, request.correlationId)(request);
        let ccsCredential = undefined;
        if (request.clientInfo) {
            try {
                const clientInfo = buildClientInfo(request.clientInfo, this.cryptoUtils.base64Decode);
                ccsCredential = {
                    credential: `${clientInfo.uid}${Separators.CLIENT_INFO_SEPARATOR}${clientInfo.utid}`,
                    type: CcsCredentialType.HOME_ACCOUNT_ID,
                };
            }
            catch (e) {
                this.logger.verbose("Could not parse client info for CCS Header: " + e);
            }
        }
        const headers = this.createTokenRequestHeaders(ccsCredential || request.ccsCredential);
        const thumbprint = {
            clientId: request.tokenBodyParameters?.clientId ||
                this.config.authOptions.clientId,
            authority: authority.canonicalAuthority,
            scopes: request.scopes,
            claims: request.claims,
            authenticationScheme: request.authenticationScheme,
            resourceRequestMethod: request.resourceRequestMethod,
            resourceRequestUri: request.resourceRequestUri,
            shrClaims: request.shrClaims,
            sshKid: request.sshKid,
        };
        return invokeAsync(this.executePostToTokenEndpoint.bind(this), PerformanceEvents.AuthorizationCodeClientExecutePostToTokenEndpoint, this.logger, this.performanceClient, request.correlationId)(endpoint, requestBody, headers, thumbprint, request.correlationId, PerformanceEvents.AuthorizationCodeClientExecutePostToTokenEndpoint);
    }
    /**
     * Generates a map for all the params to be sent to the service
     * @param request
     */
    async createTokenRequestBody(request) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthClientCreateTokenRequestBody, request.correlationId);
        const parameterBuilder = new RequestParameterBuilder(request.correlationId, this.performanceClient);
        parameterBuilder.addClientId(request.embeddedClientId ||
            request.tokenBodyParameters?.[CLIENT_ID$1] ||
            this.config.authOptions.clientId);
        /*
         * For hybrid spa flow, there will be a code but no verifier
         * In this scenario, don't include redirect uri as auth code will not be bound to redirect URI
         */
        if (!this.includeRedirectUri) {
            // Just validate
            RequestValidator.validateRedirectUri(request.redirectUri);
        }
        else {
            // Validate and include redirect uri
            parameterBuilder.addRedirectUri(request.redirectUri);
        }
        // Add scope array, parameter builder will add default scopes and dedupe
        parameterBuilder.addScopes(request.scopes, true, this.oidcDefaultScopes);
        // add code: user set, not validated
        parameterBuilder.addAuthorizationCode(request.code);
        // Add library metadata
        parameterBuilder.addLibraryInfo(this.config.libraryInfo);
        parameterBuilder.addApplicationTelemetry(this.config.telemetry.application);
        parameterBuilder.addThrottling();
        if (this.serverTelemetryManager && !isOidcProtocolMode(this.config)) {
            parameterBuilder.addServerTelemetry(this.serverTelemetryManager);
        }
        // add code_verifier if passed
        if (request.codeVerifier) {
            parameterBuilder.addCodeVerifier(request.codeVerifier);
        }
        if (this.config.clientCredentials.clientSecret) {
            parameterBuilder.addClientSecret(this.config.clientCredentials.clientSecret);
        }
        if (this.config.clientCredentials.clientAssertion) {
            const clientAssertion = this.config.clientCredentials.clientAssertion;
            parameterBuilder.addClientAssertion(await getClientAssertion(clientAssertion.assertion, this.config.authOptions.clientId, request.resourceRequestUri));
            parameterBuilder.addClientAssertionType(clientAssertion.assertionType);
        }
        parameterBuilder.addGrantType(GrantType.AUTHORIZATION_CODE_GRANT);
        parameterBuilder.addClientInfo();
        if (request.authenticationScheme === AuthenticationScheme.POP) {
            const popTokenGenerator = new PopTokenGenerator(this.cryptoUtils, this.performanceClient);
            let reqCnfData;
            if (!request.popKid) {
                const generatedReqCnfData = await invokeAsync(popTokenGenerator.generateCnf.bind(popTokenGenerator), PerformanceEvents.PopTokenGenerateCnf, this.logger, this.performanceClient, request.correlationId)(request, this.logger);
                reqCnfData = generatedReqCnfData.reqCnfString;
            }
            else {
                reqCnfData = this.cryptoUtils.encodeKid(request.popKid);
            }
            // SPA PoP requires full Base64Url encoded req_cnf string (unhashed)
            parameterBuilder.addPopToken(reqCnfData);
        }
        else if (request.authenticationScheme === AuthenticationScheme.SSH) {
            if (request.sshJwk) {
                parameterBuilder.addSshJwk(request.sshJwk);
            }
            else {
                throw createClientConfigurationError(missingSshJwk);
            }
        }
        if (!StringUtils.isEmptyObj(request.claims) ||
            (this.config.authOptions.clientCapabilities &&
                this.config.authOptions.clientCapabilities.length > 0)) {
            parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
        }
        let ccsCred = undefined;
        if (request.clientInfo) {
            try {
                const clientInfo = buildClientInfo(request.clientInfo, this.cryptoUtils.base64Decode);
                ccsCred = {
                    credential: `${clientInfo.uid}${Separators.CLIENT_INFO_SEPARATOR}${clientInfo.utid}`,
                    type: CcsCredentialType.HOME_ACCOUNT_ID,
                };
            }
            catch (e) {
                this.logger.verbose("Could not parse client info for CCS Header: " + e);
            }
        }
        else {
            ccsCred = request.ccsCredential;
        }
        // Adds these as parameters in the request instead of headers to prevent CORS preflight request
        if (this.config.systemOptions.preventCorsPreflight && ccsCred) {
            switch (ccsCred.type) {
                case CcsCredentialType.HOME_ACCOUNT_ID:
                    try {
                        const clientInfo = buildClientInfoFromHomeAccountId(ccsCred.credential);
                        parameterBuilder.addCcsOid(clientInfo);
                    }
                    catch (e) {
                        this.logger.verbose("Could not parse home account ID for CCS Header: " +
                            e);
                    }
                    break;
                case CcsCredentialType.UPN:
                    parameterBuilder.addCcsUpn(ccsCred.credential);
                    break;
            }
        }
        if (request.embeddedClientId) {
            parameterBuilder.addBrokerParameters({
                brokerClientId: this.config.authOptions.clientId,
                brokerRedirectUri: this.config.authOptions.redirectUri,
            });
        }
        if (request.tokenBodyParameters) {
            parameterBuilder.addExtraQueryParameters(request.tokenBodyParameters);
        }
        // Add hybrid spa parameters if not already provided
        if (request.enableSpaAuthorizationCode &&
            (!request.tokenBodyParameters ||
                !request.tokenBodyParameters[RETURN_SPA_CODE])) {
            parameterBuilder.addExtraQueryParameters({
                [RETURN_SPA_CODE]: "1",
            });
        }
        return parameterBuilder.createQueryString();
    }
    /**
     * This API validates the `AuthorizationCodeUrlRequest` and creates a URL
     * @param request
     */
    async createAuthCodeUrlQueryString(request) {
        // generate the correlationId if not set by the user and add
        const correlationId = request.correlationId ||
            this.config.cryptoInterface.createNewGuid();
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthClientCreateQueryString, correlationId);
        const parameterBuilder = new RequestParameterBuilder(correlationId, this.performanceClient);
        parameterBuilder.addClientId(request.embeddedClientId ||
            request.extraQueryParameters?.[CLIENT_ID$1] ||
            this.config.authOptions.clientId);
        const requestScopes = [
            ...(request.scopes || []),
            ...(request.extraScopesToConsent || []),
        ];
        parameterBuilder.addScopes(requestScopes, true, this.oidcDefaultScopes);
        // validate the redirectUri (to be a non null value)
        parameterBuilder.addRedirectUri(request.redirectUri);
        parameterBuilder.addCorrelationId(correlationId);
        // add response_mode. If not passed in it defaults to query.
        parameterBuilder.addResponseMode(request.responseMode);
        // add response_type = code
        parameterBuilder.addResponseTypeCode();
        // add library info parameters
        parameterBuilder.addLibraryInfo(this.config.libraryInfo);
        if (!isOidcProtocolMode(this.config)) {
            parameterBuilder.addApplicationTelemetry(this.config.telemetry.application);
        }
        // add client_info=1
        parameterBuilder.addClientInfo();
        if (request.codeChallenge && request.codeChallengeMethod) {
            parameterBuilder.addCodeChallengeParams(request.codeChallenge, request.codeChallengeMethod);
        }
        if (request.prompt) {
            parameterBuilder.addPrompt(request.prompt);
        }
        if (request.domainHint) {
            parameterBuilder.addDomainHint(request.domainHint);
        }
        // Add sid or loginHint with preference for login_hint claim (in request) -> sid -> loginHint (upn/email) -> username of AccountInfo object
        if (request.prompt !== PromptValue.SELECT_ACCOUNT) {
            // AAD will throw if prompt=select_account is passed with an account hint
            if (request.sid && request.prompt === PromptValue.NONE) {
                // SessionID is only used in silent calls
                this.logger.verbose("createAuthCodeUrlQueryString: Prompt is none, adding sid from request");
                parameterBuilder.addSid(request.sid);
            }
            else if (request.account) {
                const accountSid = this.extractAccountSid(request.account);
                let accountLoginHintClaim = this.extractLoginHint(request.account);
                if (accountLoginHintClaim && request.domainHint) {
                    this.logger.warning(`AuthorizationCodeClient.createAuthCodeUrlQueryString: "domainHint" param is set, skipping opaque "login_hint" claim. Please consider not passing domainHint`);
                    accountLoginHintClaim = null;
                }
                // If login_hint claim is present, use it over sid/username
                if (accountLoginHintClaim) {
                    this.logger.verbose("createAuthCodeUrlQueryString: login_hint claim present on account");
                    parameterBuilder.addLoginHint(accountLoginHintClaim);
                    try {
                        const clientInfo = buildClientInfoFromHomeAccountId(request.account.homeAccountId);
                        parameterBuilder.addCcsOid(clientInfo);
                    }
                    catch (e) {
                        this.logger.verbose("createAuthCodeUrlQueryString: Could not parse home account ID for CCS Header");
                    }
                }
                else if (accountSid && request.prompt === PromptValue.NONE) {
                    /*
                     * If account and loginHint are provided, we will check account first for sid before adding loginHint
                     * SessionId is only used in silent calls
                     */
                    this.logger.verbose("createAuthCodeUrlQueryString: Prompt is none, adding sid from account");
                    parameterBuilder.addSid(accountSid);
                    try {
                        const clientInfo = buildClientInfoFromHomeAccountId(request.account.homeAccountId);
                        parameterBuilder.addCcsOid(clientInfo);
                    }
                    catch (e) {
                        this.logger.verbose("createAuthCodeUrlQueryString: Could not parse home account ID for CCS Header");
                    }
                }
                else if (request.loginHint) {
                    this.logger.verbose("createAuthCodeUrlQueryString: Adding login_hint from request");
                    parameterBuilder.addLoginHint(request.loginHint);
                    parameterBuilder.addCcsUpn(request.loginHint);
                }
                else if (request.account.username) {
                    // Fallback to account username if provided
                    this.logger.verbose("createAuthCodeUrlQueryString: Adding login_hint from account");
                    parameterBuilder.addLoginHint(request.account.username);
                    try {
                        const clientInfo = buildClientInfoFromHomeAccountId(request.account.homeAccountId);
                        parameterBuilder.addCcsOid(clientInfo);
                    }
                    catch (e) {
                        this.logger.verbose("createAuthCodeUrlQueryString: Could not parse home account ID for CCS Header");
                    }
                }
            }
            else if (request.loginHint) {
                this.logger.verbose("createAuthCodeUrlQueryString: No account, adding login_hint from request");
                parameterBuilder.addLoginHint(request.loginHint);
                parameterBuilder.addCcsUpn(request.loginHint);
            }
        }
        else {
            this.logger.verbose("createAuthCodeUrlQueryString: Prompt is select_account, ignoring account hints");
        }
        if (request.nonce) {
            parameterBuilder.addNonce(request.nonce);
        }
        if (request.state) {
            parameterBuilder.addState(request.state);
        }
        if (request.claims ||
            (this.config.authOptions.clientCapabilities &&
                this.config.authOptions.clientCapabilities.length > 0)) {
            parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
        }
        if (request.embeddedClientId) {
            parameterBuilder.addBrokerParameters({
                brokerClientId: this.config.authOptions.clientId,
                brokerRedirectUri: this.config.authOptions.redirectUri,
            });
        }
        this.addExtraQueryParams(request, parameterBuilder);
        if (request.nativeBroker) {
            // signal ests that this is a WAM call
            parameterBuilder.addNativeBroker();
            // pass the req_cnf for POP
            if (request.authenticationScheme === AuthenticationScheme.POP) {
                const popTokenGenerator = new PopTokenGenerator(this.cryptoUtils);
                // req_cnf is always sent as a string for SPAs
                let reqCnfData;
                if (!request.popKid) {
                    const generatedReqCnfData = await invokeAsync(popTokenGenerator.generateCnf.bind(popTokenGenerator), PerformanceEvents.PopTokenGenerateCnf, this.logger, this.performanceClient, request.correlationId)(request, this.logger);
                    reqCnfData = generatedReqCnfData.reqCnfString;
                }
                else {
                    reqCnfData = this.cryptoUtils.encodeKid(request.popKid);
                }
                parameterBuilder.addPopToken(reqCnfData);
            }
        }
        return parameterBuilder.createQueryString();
    }
    /**
     * This API validates the `EndSessionRequest` and creates a URL
     * @param request
     */
    createLogoutUrlQueryString(request) {
        const parameterBuilder = new RequestParameterBuilder(request.correlationId, this.performanceClient);
        if (request.postLogoutRedirectUri) {
            parameterBuilder.addPostLogoutRedirectUri(request.postLogoutRedirectUri);
        }
        if (request.correlationId) {
            parameterBuilder.addCorrelationId(request.correlationId);
        }
        if (request.idTokenHint) {
            parameterBuilder.addIdTokenHint(request.idTokenHint);
        }
        if (request.state) {
            parameterBuilder.addState(request.state);
        }
        if (request.logoutHint) {
            parameterBuilder.addLogoutHint(request.logoutHint);
        }
        this.addExtraQueryParams(request, parameterBuilder);
        return parameterBuilder.createQueryString();
    }
    addExtraQueryParams(request, parameterBuilder) {
        const hasRequestInstanceAware = request.extraQueryParameters &&
            request.extraQueryParameters.hasOwnProperty("instance_aware");
        // Set instance_aware flag if config auth param is set
        if (!hasRequestInstanceAware && this.config.authOptions.instanceAware) {
            request.extraQueryParameters = request.extraQueryParameters || {};
            request.extraQueryParameters["instance_aware"] = "true";
        }
        if (request.extraQueryParameters) {
            parameterBuilder.addExtraQueryParameters(request.extraQueryParameters);
        }
    }
    /**
     * Helper to get sid from account. Returns null if idTokenClaims are not present or sid is not present.
     * @param account
     */
    extractAccountSid(account) {
        return account.idTokenClaims?.sid || null;
    }
    extractLoginHint(account) {
        return account.idTokenClaims?.login_hint || null;
    }
}

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const DEFAULT_REFRESH_TOKEN_EXPIRATION_OFFSET_SECONDS = 300; // 5 Minutes
/**
 * OAuth2.0 refresh token client
 * @internal
 */
class RefreshTokenClient extends BaseClient {
    constructor(configuration, performanceClient) {
        super(configuration, performanceClient);
    }
    async acquireToken(request) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.RefreshTokenClientAcquireToken, request.correlationId);
        const reqTimestamp = nowSeconds();
        const response = await invokeAsync(this.executeTokenRequest.bind(this), PerformanceEvents.RefreshTokenClientExecuteTokenRequest, this.logger, this.performanceClient, request.correlationId)(request, this.authority);
        // Retrieve requestId from response headers
        const requestId = response.headers?.[HeaderNames.X_MS_REQUEST_ID];
        const responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin);
        responseHandler.validateTokenResponse(response.body);
        return invokeAsync(responseHandler.handleServerTokenResponse.bind(responseHandler), PerformanceEvents.HandleServerTokenResponse, this.logger, this.performanceClient, request.correlationId)(response.body, this.authority, reqTimestamp, request, undefined, undefined, true, request.forceCache, requestId);
    }
    /**
     * Gets cached refresh token and attaches to request, then calls acquireToken API
     * @param request
     */
    async acquireTokenByRefreshToken(request) {
        // Cannot renew token if no request object is given.
        if (!request) {
            throw createClientConfigurationError(tokenRequestEmpty);
        }
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.RefreshTokenClientAcquireTokenByRefreshToken, request.correlationId);
        // We currently do not support silent flow for account === null use cases; This will be revisited for confidential flow usecases
        if (!request.account) {
            throw createClientAuthError(noAccountInSilentRequest);
        }
        // try checking if FOCI is enabled for the given application
        const isFOCI = this.cacheManager.isAppMetadataFOCI(request.account.environment);
        // if the app is part of the family, retrive a Family refresh token if present and make a refreshTokenRequest
        if (isFOCI) {
            try {
                return await invokeAsync(this.acquireTokenWithCachedRefreshToken.bind(this), PerformanceEvents.RefreshTokenClientAcquireTokenWithCachedRefreshToken, this.logger, this.performanceClient, request.correlationId)(request, true);
            }
            catch (e) {
                const noFamilyRTInCache = e instanceof InteractionRequiredAuthError &&
                    e.errorCode ===
                        noTokensFound;
                const clientMismatchErrorWithFamilyRT = e instanceof ServerError &&
                    e.errorCode === Errors.INVALID_GRANT_ERROR &&
                    e.subError === Errors.CLIENT_MISMATCH_ERROR;
                // if family Refresh Token (FRT) cache acquisition fails or if client_mismatch error is seen with FRT, reattempt with application Refresh Token (ART)
                if (noFamilyRTInCache || clientMismatchErrorWithFamilyRT) {
                    return invokeAsync(this.acquireTokenWithCachedRefreshToken.bind(this), PerformanceEvents.RefreshTokenClientAcquireTokenWithCachedRefreshToken, this.logger, this.performanceClient, request.correlationId)(request, false);
                    // throw in all other cases
                }
                else {
                    throw e;
                }
            }
        }
        // fall back to application refresh token acquisition
        return invokeAsync(this.acquireTokenWithCachedRefreshToken.bind(this), PerformanceEvents.RefreshTokenClientAcquireTokenWithCachedRefreshToken, this.logger, this.performanceClient, request.correlationId)(request, false);
    }
    /**
     * makes a network call to acquire tokens by exchanging RefreshToken available in userCache; throws if refresh token is not cached
     * @param request
     */
    async acquireTokenWithCachedRefreshToken(request, foci) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.RefreshTokenClientAcquireTokenWithCachedRefreshToken, request.correlationId);
        // fetches family RT or application RT based on FOCI value
        const refreshToken = invoke(this.cacheManager.getRefreshToken.bind(this.cacheManager), PerformanceEvents.CacheManagerGetRefreshToken, this.logger, this.performanceClient, request.correlationId)(request.account, foci, undefined, this.performanceClient, request.correlationId);
        if (!refreshToken) {
            throw createInteractionRequiredAuthError(noTokensFound);
        }
        if (refreshToken.expiresOn &&
            isTokenExpired(refreshToken.expiresOn, request.refreshTokenExpirationOffsetSeconds ||
                DEFAULT_REFRESH_TOKEN_EXPIRATION_OFFSET_SECONDS)) {
            throw createInteractionRequiredAuthError(refreshTokenExpired);
        }
        // attach cached RT size to the current measurement
        const refreshTokenRequest = {
            ...request,
            refreshToken: refreshToken.secret,
            authenticationScheme: request.authenticationScheme || AuthenticationScheme.BEARER,
            ccsCredential: {
                credential: request.account.homeAccountId,
                type: CcsCredentialType.HOME_ACCOUNT_ID,
            },
        };
        try {
            return await invokeAsync(this.acquireToken.bind(this), PerformanceEvents.RefreshTokenClientAcquireToken, this.logger, this.performanceClient, request.correlationId)(refreshTokenRequest);
        }
        catch (e) {
            if (e instanceof InteractionRequiredAuthError &&
                e.subError === badToken) {
                // Remove bad refresh token from cache
                this.logger.verbose("acquireTokenWithRefreshToken: bad refresh token, removing from cache");
                const badRefreshTokenKey = generateCredentialKey(refreshToken);
                this.cacheManager.removeRefreshToken(badRefreshTokenKey);
            }
            throw e;
        }
    }
    /**
     * Constructs the network message and makes a NW call to the underlying secure token service
     * @param request
     * @param authority
     */
    async executeTokenRequest(request, authority) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.RefreshTokenClientExecuteTokenRequest, request.correlationId);
        const queryParametersString = this.createTokenQueryParameters(request);
        const endpoint = UrlString.appendQueryString(authority.tokenEndpoint, queryParametersString);
        const requestBody = await invokeAsync(this.createTokenRequestBody.bind(this), PerformanceEvents.RefreshTokenClientCreateTokenRequestBody, this.logger, this.performanceClient, request.correlationId)(request);
        const headers = this.createTokenRequestHeaders(request.ccsCredential);
        const thumbprint = {
            clientId: request.tokenBodyParameters?.clientId ||
                this.config.authOptions.clientId,
            authority: authority.canonicalAuthority,
            scopes: request.scopes,
            claims: request.claims,
            authenticationScheme: request.authenticationScheme,
            resourceRequestMethod: request.resourceRequestMethod,
            resourceRequestUri: request.resourceRequestUri,
            shrClaims: request.shrClaims,
            sshKid: request.sshKid,
        };
        return invokeAsync(this.executePostToTokenEndpoint.bind(this), PerformanceEvents.RefreshTokenClientExecutePostToTokenEndpoint, this.logger, this.performanceClient, request.correlationId)(endpoint, requestBody, headers, thumbprint, request.correlationId, PerformanceEvents.RefreshTokenClientExecutePostToTokenEndpoint);
    }
    /**
     * Helper function to create the token request body
     * @param request
     */
    async createTokenRequestBody(request) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.RefreshTokenClientCreateTokenRequestBody, request.correlationId);
        const correlationId = request.correlationId;
        const parameterBuilder = new RequestParameterBuilder(correlationId, this.performanceClient);
        parameterBuilder.addClientId(request.embeddedClientId ||
            request.tokenBodyParameters?.[CLIENT_ID$1] ||
            this.config.authOptions.clientId);
        if (request.redirectUri) {
            parameterBuilder.addRedirectUri(request.redirectUri);
        }
        parameterBuilder.addScopes(request.scopes, true, this.config.authOptions.authority.options.OIDCOptions?.defaultScopes);
        parameterBuilder.addGrantType(GrantType.REFRESH_TOKEN_GRANT);
        parameterBuilder.addClientInfo();
        parameterBuilder.addLibraryInfo(this.config.libraryInfo);
        parameterBuilder.addApplicationTelemetry(this.config.telemetry.application);
        parameterBuilder.addThrottling();
        if (this.serverTelemetryManager && !isOidcProtocolMode(this.config)) {
            parameterBuilder.addServerTelemetry(this.serverTelemetryManager);
        }
        parameterBuilder.addRefreshToken(request.refreshToken);
        if (this.config.clientCredentials.clientSecret) {
            parameterBuilder.addClientSecret(this.config.clientCredentials.clientSecret);
        }
        if (this.config.clientCredentials.clientAssertion) {
            const clientAssertion = this.config.clientCredentials.clientAssertion;
            parameterBuilder.addClientAssertion(await getClientAssertion(clientAssertion.assertion, this.config.authOptions.clientId, request.resourceRequestUri));
            parameterBuilder.addClientAssertionType(clientAssertion.assertionType);
        }
        if (request.authenticationScheme === AuthenticationScheme.POP) {
            const popTokenGenerator = new PopTokenGenerator(this.cryptoUtils, this.performanceClient);
            let reqCnfData;
            if (!request.popKid) {
                const generatedReqCnfData = await invokeAsync(popTokenGenerator.generateCnf.bind(popTokenGenerator), PerformanceEvents.PopTokenGenerateCnf, this.logger, this.performanceClient, request.correlationId)(request, this.logger);
                reqCnfData = generatedReqCnfData.reqCnfString;
            }
            else {
                reqCnfData = this.cryptoUtils.encodeKid(request.popKid);
            }
            // SPA PoP requires full Base64Url encoded req_cnf string (unhashed)
            parameterBuilder.addPopToken(reqCnfData);
        }
        else if (request.authenticationScheme === AuthenticationScheme.SSH) {
            if (request.sshJwk) {
                parameterBuilder.addSshJwk(request.sshJwk);
            }
            else {
                throw createClientConfigurationError(missingSshJwk);
            }
        }
        if (!StringUtils.isEmptyObj(request.claims) ||
            (this.config.authOptions.clientCapabilities &&
                this.config.authOptions.clientCapabilities.length > 0)) {
            parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
        }
        if (this.config.systemOptions.preventCorsPreflight &&
            request.ccsCredential) {
            switch (request.ccsCredential.type) {
                case CcsCredentialType.HOME_ACCOUNT_ID:
                    try {
                        const clientInfo = buildClientInfoFromHomeAccountId(request.ccsCredential.credential);
                        parameterBuilder.addCcsOid(clientInfo);
                    }
                    catch (e) {
                        this.logger.verbose("Could not parse home account ID for CCS Header: " +
                            e);
                    }
                    break;
                case CcsCredentialType.UPN:
                    parameterBuilder.addCcsUpn(request.ccsCredential.credential);
                    break;
            }
        }
        if (request.embeddedClientId) {
            parameterBuilder.addBrokerParameters({
                brokerClientId: this.config.authOptions.clientId,
                brokerRedirectUri: this.config.authOptions.redirectUri,
            });
        }
        if (request.tokenBodyParameters) {
            parameterBuilder.addExtraQueryParameters(request.tokenBodyParameters);
        }
        return parameterBuilder.createQueryString();
    }
}

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/** @internal */
class SilentFlowClient extends BaseClient {
    constructor(configuration, performanceClient) {
        super(configuration, performanceClient);
    }
    /**
     * Retrieves a token from cache if it is still valid, or uses the cached refresh token to renew
     * the given token and returns the renewed token
     * @param request
     */
    async acquireToken(request) {
        try {
            const [authResponse, cacheOutcome] = await this.acquireCachedToken({
                ...request,
                scopes: request.scopes?.length
                    ? request.scopes
                    : [...OIDC_DEFAULT_SCOPES],
            });
            // if the token is not expired but must be refreshed; get a new one in the background
            if (cacheOutcome === CacheOutcome.PROACTIVELY_REFRESHED) {
                this.logger.info("SilentFlowClient:acquireCachedToken - Cached access token's refreshOn property has been exceeded'. It's not expired, but must be refreshed.");
                // refresh the access token in the background
                const refreshTokenClient = new RefreshTokenClient(this.config, this.performanceClient);
                refreshTokenClient
                    .acquireTokenByRefreshToken(request)
                    .catch(() => {
                    // do nothing, this is running in the background and no action is to be taken upon success or failure
                });
            }
            // return the cached token
            return authResponse;
        }
        catch (e) {
            if (e instanceof ClientAuthError &&
                e.errorCode === tokenRefreshRequired) {
                const refreshTokenClient = new RefreshTokenClient(this.config, this.performanceClient);
                return refreshTokenClient.acquireTokenByRefreshToken(request);
            }
            else {
                throw e;
            }
        }
    }
    /**
     * Retrieves token from cache or throws an error if it must be refreshed.
     * @param request
     */
    async acquireCachedToken(request) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.SilentFlowClientAcquireCachedToken, request.correlationId);
        let lastCacheOutcome = CacheOutcome.NOT_APPLICABLE;
        if (request.forceRefresh ||
            (!this.config.cacheOptions.claimsBasedCachingEnabled &&
                !StringUtils.isEmptyObj(request.claims))) {
            // Must refresh due to present force_refresh flag.
            this.setCacheOutcome(CacheOutcome.FORCE_REFRESH_OR_CLAIMS, request.correlationId);
            throw createClientAuthError(tokenRefreshRequired);
        }
        // We currently do not support silent flow for account === null use cases; This will be revisited for confidential flow usecases
        if (!request.account) {
            throw createClientAuthError(noAccountInSilentRequest);
        }
        const requestTenantId = request.account.tenantId ||
            getTenantFromAuthorityString(request.authority);
        const tokenKeys = this.cacheManager.getTokenKeys();
        const cachedAccessToken = this.cacheManager.getAccessToken(request.account, request, tokenKeys, requestTenantId, this.performanceClient, request.correlationId);
        if (!cachedAccessToken) {
            // must refresh due to non-existent access_token
            this.setCacheOutcome(CacheOutcome.NO_CACHED_ACCESS_TOKEN, request.correlationId);
            throw createClientAuthError(tokenRefreshRequired);
        }
        else if (wasClockTurnedBack(cachedAccessToken.cachedAt) ||
            isTokenExpired(cachedAccessToken.expiresOn, this.config.systemOptions.tokenRenewalOffsetSeconds)) {
            // must refresh due to the expires_in value
            this.setCacheOutcome(CacheOutcome.CACHED_ACCESS_TOKEN_EXPIRED, request.correlationId);
            throw createClientAuthError(tokenRefreshRequired);
        }
        else if (cachedAccessToken.refreshOn &&
            isTokenExpired(cachedAccessToken.refreshOn, 0)) {
            // must refresh (in the background) due to the refresh_in value
            lastCacheOutcome = CacheOutcome.PROACTIVELY_REFRESHED;
            // don't throw ClientAuthError.createRefreshRequiredError(), return cached token instead
        }
        const environment = request.authority || this.authority.getPreferredCache();
        const cacheRecord = {
            account: this.cacheManager.readAccountFromCache(request.account),
            accessToken: cachedAccessToken,
            idToken: this.cacheManager.getIdToken(request.account, tokenKeys, requestTenantId, this.performanceClient, request.correlationId),
            refreshToken: null,
            appMetadata: this.cacheManager.readAppMetadataFromCache(environment),
        };
        this.setCacheOutcome(lastCacheOutcome, request.correlationId);
        if (this.config.serverTelemetryManager) {
            this.config.serverTelemetryManager.incrementCacheHits();
        }
        return [
            await invokeAsync(this.generateResultFromCacheRecord.bind(this), PerformanceEvents.SilentFlowClientGenerateResultFromCacheRecord, this.logger, this.performanceClient, request.correlationId)(cacheRecord, request),
            lastCacheOutcome,
        ];
    }
    setCacheOutcome(cacheOutcome, correlationId) {
        this.serverTelemetryManager?.setCacheOutcome(cacheOutcome);
        this.performanceClient?.addFields({
            cacheOutcome: cacheOutcome,
        }, correlationId);
        if (cacheOutcome !== CacheOutcome.NOT_APPLICABLE) {
            this.logger.info(`Token refresh is required due to cache outcome: ${cacheOutcome}`);
        }
    }
    /**
     * Helper function to build response object from the CacheRecord
     * @param cacheRecord
     */
    async generateResultFromCacheRecord(cacheRecord, request) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.SilentFlowClientGenerateResultFromCacheRecord, request.correlationId);
        let idTokenClaims;
        if (cacheRecord.idToken) {
            idTokenClaims = extractTokenClaims(cacheRecord.idToken.secret, this.config.cryptoInterface.base64Decode);
        }
        // token max_age check
        if (request.maxAge || request.maxAge === 0) {
            const authTime = idTokenClaims?.auth_time;
            if (!authTime) {
                throw createClientAuthError(authTimeNotFound);
            }
            checkMaxAge(authTime, request.maxAge);
        }
        return ResponseHandler.generateAuthenticationResult(this.cryptoUtils, this.authority, cacheRecord, true, request, idTokenClaims);
    }
}

/*! @azure/msal-common v14.16.0 2024-11-05 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const skuGroupSeparator = ",";
const skuValueSeparator = "|";
function makeExtraSkuString(params) {
    const { skus, libraryName, libraryVersion, extensionName, extensionVersion, } = params;
    const skuMap = new Map([
        [0, [libraryName, libraryVersion]],
        [2, [extensionName, extensionVersion]],
    ]);
    let skuArr = [];
    if (skus?.length) {
        skuArr = skus.split(skuGroupSeparator);
        // Ignore invalid input sku param
        if (skuArr.length < 4) {
            return skus;
        }
    }
    else {
        skuArr = Array.from({ length: 4 }, () => skuValueSeparator);
    }
    skuMap.forEach((value, key) => {
        if (value.length === 2 && value[0]?.length && value[1]?.length) {
            setSku({
                skuArr,
                index: key,
                skuName: value[0],
                skuVersion: value[1],
            });
        }
    });
    return skuArr.join(skuGroupSeparator);
}
function setSku(params) {
    const { skuArr, index, skuName, skuVersion } = params;
    if (index >= skuArr.length) {
        return;
    }
    skuArr[index] = [skuName, skuVersion].join(skuValueSeparator);
}
/** @internal */
class ServerTelemetryManager {
    constructor(telemetryRequest, cacheManager) {
        this.cacheOutcome = CacheOutcome.NOT_APPLICABLE;
        this.cacheManager = cacheManager;
        this.apiId = telemetryRequest.apiId;
        this.correlationId = telemetryRequest.correlationId;
        this.wrapperSKU = telemetryRequest.wrapperSKU || Constants$1.EMPTY_STRING;
        this.wrapperVer = telemetryRequest.wrapperVer || Constants$1.EMPTY_STRING;
        this.telemetryCacheKey =
            SERVER_TELEM_CONSTANTS.CACHE_KEY +
                Separators.CACHE_KEY_SEPARATOR +
                telemetryRequest.clientId;
    }
    /**
     * API to add MSER Telemetry to request
     */
    generateCurrentRequestHeaderValue() {
        const request = `${this.apiId}${SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR}${this.cacheOutcome}`;
        const platformFieldsArr = [this.wrapperSKU, this.wrapperVer];
        const nativeBrokerErrorCode = this.getNativeBrokerErrorCode();
        if (nativeBrokerErrorCode?.length) {
            platformFieldsArr.push(`broker_error=${nativeBrokerErrorCode}`);
        }
        const platformFields = platformFieldsArr.join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        const regionDiscoveryFields = this.getRegionDiscoveryFields();
        const requestWithRegionDiscoveryFields = [
            request,
            regionDiscoveryFields,
        ].join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        return [
            SERVER_TELEM_CONSTANTS.SCHEMA_VERSION,
            requestWithRegionDiscoveryFields,
            platformFields,
        ].join(SERVER_TELEM_CONSTANTS.CATEGORY_SEPARATOR);
    }
    /**
     * API to add MSER Telemetry for the last failed request
     */
    generateLastRequestHeaderValue() {
        const lastRequests = this.getLastRequests();
        const maxErrors = ServerTelemetryManager.maxErrorsToSend(lastRequests);
        const failedRequests = lastRequests.failedRequests
            .slice(0, 2 * maxErrors)
            .join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        const errors = lastRequests.errors
            .slice(0, maxErrors)
            .join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        const errorCount = lastRequests.errors.length;
        // Indicate whether this header contains all data or partial data
        const overflow = maxErrors < errorCount
            ? SERVER_TELEM_CONSTANTS.OVERFLOW_TRUE
            : SERVER_TELEM_CONSTANTS.OVERFLOW_FALSE;
        const platformFields = [errorCount, overflow].join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        return [
            SERVER_TELEM_CONSTANTS.SCHEMA_VERSION,
            lastRequests.cacheHits,
            failedRequests,
            errors,
            platformFields,
        ].join(SERVER_TELEM_CONSTANTS.CATEGORY_SEPARATOR);
    }
    /**
     * API to cache token failures for MSER data capture
     * @param error
     */
    cacheFailedRequest(error) {
        const lastRequests = this.getLastRequests();
        if (lastRequests.errors.length >=
            SERVER_TELEM_CONSTANTS.MAX_CACHED_ERRORS) {
            // Remove a cached error to make room, first in first out
            lastRequests.failedRequests.shift(); // apiId
            lastRequests.failedRequests.shift(); // correlationId
            lastRequests.errors.shift();
        }
        lastRequests.failedRequests.push(this.apiId, this.correlationId);
        if (error instanceof Error && !!error && error.toString()) {
            if (error instanceof AuthError) {
                if (error.subError) {
                    lastRequests.errors.push(error.subError);
                }
                else if (error.errorCode) {
                    lastRequests.errors.push(error.errorCode);
                }
                else {
                    lastRequests.errors.push(error.toString());
                }
            }
            else {
                lastRequests.errors.push(error.toString());
            }
        }
        else {
            lastRequests.errors.push(SERVER_TELEM_CONSTANTS.UNKNOWN_ERROR);
        }
        this.cacheManager.setServerTelemetry(this.telemetryCacheKey, lastRequests);
        return;
    }
    /**
     * Update server telemetry cache entry by incrementing cache hit counter
     */
    incrementCacheHits() {
        const lastRequests = this.getLastRequests();
        lastRequests.cacheHits += 1;
        this.cacheManager.setServerTelemetry(this.telemetryCacheKey, lastRequests);
        return lastRequests.cacheHits;
    }
    /**
     * Get the server telemetry entity from cache or initialize a new one
     */
    getLastRequests() {
        const initialValue = {
            failedRequests: [],
            errors: [],
            cacheHits: 0,
        };
        const lastRequests = this.cacheManager.getServerTelemetry(this.telemetryCacheKey);
        return lastRequests || initialValue;
    }
    /**
     * Remove server telemetry cache entry
     */
    clearTelemetryCache() {
        const lastRequests = this.getLastRequests();
        const numErrorsFlushed = ServerTelemetryManager.maxErrorsToSend(lastRequests);
        const errorCount = lastRequests.errors.length;
        if (numErrorsFlushed === errorCount) {
            // All errors were sent on last request, clear Telemetry cache
            this.cacheManager.removeItem(this.telemetryCacheKey);
        }
        else {
            // Partial data was flushed to server, construct a new telemetry cache item with errors that were not flushed
            const serverTelemEntity = {
                failedRequests: lastRequests.failedRequests.slice(numErrorsFlushed * 2),
                errors: lastRequests.errors.slice(numErrorsFlushed),
                cacheHits: 0,
            };
            this.cacheManager.setServerTelemetry(this.telemetryCacheKey, serverTelemEntity);
        }
    }
    /**
     * Returns the maximum number of errors that can be flushed to the server in the next network request
     * @param serverTelemetryEntity
     */
    static maxErrorsToSend(serverTelemetryEntity) {
        let i;
        let maxErrors = 0;
        let dataSize = 0;
        const errorCount = serverTelemetryEntity.errors.length;
        for (i = 0; i < errorCount; i++) {
            // failedRequests parameter contains pairs of apiId and correlationId, multiply index by 2 to preserve pairs
            const apiId = serverTelemetryEntity.failedRequests[2 * i] ||
                Constants$1.EMPTY_STRING;
            const correlationId = serverTelemetryEntity.failedRequests[2 * i + 1] ||
                Constants$1.EMPTY_STRING;
            const errorCode = serverTelemetryEntity.errors[i] || Constants$1.EMPTY_STRING;
            // Count number of characters that would be added to header, each character is 1 byte. Add 3 at the end to account for separators
            dataSize +=
                apiId.toString().length +
                    correlationId.toString().length +
                    errorCode.length +
                    3;
            if (dataSize < SERVER_TELEM_CONSTANTS.MAX_LAST_HEADER_BYTES) {
                // Adding this entry to the header would still keep header size below the limit
                maxErrors += 1;
            }
            else {
                break;
            }
        }
        return maxErrors;
    }
    /**
     * Get the region discovery fields
     *
     * @returns string
     */
    getRegionDiscoveryFields() {
        const regionDiscoveryFields = [];
        regionDiscoveryFields.push(this.regionUsed || Constants$1.EMPTY_STRING);
        regionDiscoveryFields.push(this.regionSource || Constants$1.EMPTY_STRING);
        regionDiscoveryFields.push(this.regionOutcome || Constants$1.EMPTY_STRING);
        return regionDiscoveryFields.join(",");
    }
    /**
     * Update the region discovery metadata
     *
     * @param regionDiscoveryMetadata
     * @returns void
     */
    updateRegionDiscoveryMetadata(regionDiscoveryMetadata) {
        this.regionUsed = regionDiscoveryMetadata.region_used;
        this.regionSource = regionDiscoveryMetadata.region_source;
        this.regionOutcome = regionDiscoveryMetadata.region_outcome;
    }
    /**
     * Set cache outcome
     */
    setCacheOutcome(cacheOutcome) {
        this.cacheOutcome = cacheOutcome;
    }
    setNativeBrokerErrorCode(errorCode) {
        const lastRequests = this.getLastRequests();
        lastRequests.nativeBrokerErrorCode = errorCode;
        this.cacheManager.setServerTelemetry(this.telemetryCacheKey, lastRequests);
    }
    getNativeBrokerErrorCode() {
        return this.getLastRequests().nativeBrokerErrorCode;
    }
    clearNativeBrokerErrorCode() {
        const lastRequests = this.getLastRequests();
        delete lastRequests.nativeBrokerErrorCode;
        this.cacheManager.setServerTelemetry(this.telemetryCacheKey, lastRequests);
    }
    static makeExtraSkuString(params) {
        return makeExtraSkuString(params);
    }
}

/*! @azure/msal-node v2.16.2 2024-11-19 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * This class deserializes cache entities read from the file into in-memory object types defined internally
 * @internal
 */
class Deserializer {
    /**
     * Parse the JSON blob in memory and deserialize the content
     * @param cachedJson - JSON blob cache
     */
    static deserializeJSONBlob(jsonFile) {
        const deserializedCache = !jsonFile ? {} : JSON.parse(jsonFile);
        return deserializedCache;
    }
    /**
     * Deserializes accounts to AccountEntity objects
     * @param accounts - accounts of type SerializedAccountEntity
     */
    static deserializeAccounts(accounts) {
        const accountObjects = {};
        if (accounts) {
            Object.keys(accounts).map(function (key) {
                const serializedAcc = accounts[key];
                const mappedAcc = {
                    homeAccountId: serializedAcc.home_account_id,
                    environment: serializedAcc.environment,
                    realm: serializedAcc.realm,
                    localAccountId: serializedAcc.local_account_id,
                    username: serializedAcc.username,
                    authorityType: serializedAcc.authority_type,
                    name: serializedAcc.name,
                    clientInfo: serializedAcc.client_info,
                    lastModificationTime: serializedAcc.last_modification_time,
                    lastModificationApp: serializedAcc.last_modification_app,
                    tenantProfiles: serializedAcc.tenantProfiles?.map((serializedTenantProfile) => {
                        return JSON.parse(serializedTenantProfile);
                    }),
                };
                const account = new AccountEntity();
                CacheManager.toObject(account, mappedAcc);
                accountObjects[key] = account;
            });
        }
        return accountObjects;
    }
    /**
     * Deserializes id tokens to IdTokenEntity objects
     * @param idTokens - credentials of type SerializedIdTokenEntity
     */
    static deserializeIdTokens(idTokens) {
        const idObjects = {};
        if (idTokens) {
            Object.keys(idTokens).map(function (key) {
                const serializedIdT = idTokens[key];
                const idToken = {
                    homeAccountId: serializedIdT.home_account_id,
                    environment: serializedIdT.environment,
                    credentialType: serializedIdT.credential_type,
                    clientId: serializedIdT.client_id,
                    secret: serializedIdT.secret,
                    realm: serializedIdT.realm,
                };
                idObjects[key] = idToken;
            });
        }
        return idObjects;
    }
    /**
     * Deserializes access tokens to AccessTokenEntity objects
     * @param accessTokens - access tokens of type SerializedAccessTokenEntity
     */
    static deserializeAccessTokens(accessTokens) {
        const atObjects = {};
        if (accessTokens) {
            Object.keys(accessTokens).map(function (key) {
                const serializedAT = accessTokens[key];
                const accessToken = {
                    homeAccountId: serializedAT.home_account_id,
                    environment: serializedAT.environment,
                    credentialType: serializedAT.credential_type,
                    clientId: serializedAT.client_id,
                    secret: serializedAT.secret,
                    realm: serializedAT.realm,
                    target: serializedAT.target,
                    cachedAt: serializedAT.cached_at,
                    expiresOn: serializedAT.expires_on,
                    extendedExpiresOn: serializedAT.extended_expires_on,
                    refreshOn: serializedAT.refresh_on,
                    keyId: serializedAT.key_id,
                    tokenType: serializedAT.token_type,
                    requestedClaims: serializedAT.requestedClaims,
                    requestedClaimsHash: serializedAT.requestedClaimsHash,
                    userAssertionHash: serializedAT.userAssertionHash,
                };
                atObjects[key] = accessToken;
            });
        }
        return atObjects;
    }
    /**
     * Deserializes refresh tokens to RefreshTokenEntity objects
     * @param refreshTokens - refresh tokens of type SerializedRefreshTokenEntity
     */
    static deserializeRefreshTokens(refreshTokens) {
        const rtObjects = {};
        if (refreshTokens) {
            Object.keys(refreshTokens).map(function (key) {
                const serializedRT = refreshTokens[key];
                const refreshToken = {
                    homeAccountId: serializedRT.home_account_id,
                    environment: serializedRT.environment,
                    credentialType: serializedRT.credential_type,
                    clientId: serializedRT.client_id,
                    secret: serializedRT.secret,
                    familyId: serializedRT.family_id,
                    target: serializedRT.target,
                    realm: serializedRT.realm,
                };
                rtObjects[key] = refreshToken;
            });
        }
        return rtObjects;
    }
    /**
     * Deserializes appMetadata to AppMetaData objects
     * @param appMetadata - app metadata of type SerializedAppMetadataEntity
     */
    static deserializeAppMetadata(appMetadata) {
        const appMetadataObjects = {};
        if (appMetadata) {
            Object.keys(appMetadata).map(function (key) {
                const serializedAmdt = appMetadata[key];
                appMetadataObjects[key] = {
                    clientId: serializedAmdt.client_id,
                    environment: serializedAmdt.environment,
                    familyId: serializedAmdt.family_id,
                };
            });
        }
        return appMetadataObjects;
    }
    /**
     * Deserialize an inMemory Cache
     * @param jsonCache - JSON blob cache
     */
    static deserializeAllCache(jsonCache) {
        return {
            accounts: jsonCache.Account
                ? this.deserializeAccounts(jsonCache.Account)
                : {},
            idTokens: jsonCache.IdToken
                ? this.deserializeIdTokens(jsonCache.IdToken)
                : {},
            accessTokens: jsonCache.AccessToken
                ? this.deserializeAccessTokens(jsonCache.AccessToken)
                : {},
            refreshTokens: jsonCache.RefreshToken
                ? this.deserializeRefreshTokens(jsonCache.RefreshToken)
                : {},
            appMetadata: jsonCache.AppMetadata
                ? this.deserializeAppMetadata(jsonCache.AppMetadata)
                : {},
        };
    }
}

/*! @azure/msal-node v2.16.2 2024-11-19 */
/**
 * http methods
 */
const HttpMethod = {
    GET: "get",
    POST: "post",
};
const ProxyStatus = {
    SUCCESS: HttpStatus.SUCCESS,
    SUCCESS_RANGE_START: HttpStatus.SUCCESS_RANGE_START,
    SUCCESS_RANGE_END: HttpStatus.SUCCESS_RANGE_END,
    SERVER_ERROR: HttpStatus.SERVER_ERROR,
};
/**
 * Constants used for region discovery
 */
const REGION_ENVIRONMENT_VARIABLE = "REGION_NAME";
const MSAL_FORCE_REGION = "MSAL_FORCE_REGION";
/**
 * Constant used for PKCE
 */
const RANDOM_OCTET_SIZE = 32;
/**
 * Constants used in PKCE
 */
const Hash = {
    SHA256: "sha256",
};
/**
 * Constants for encoding schemes
 */
const CharSet = {
    CV_CHARSET: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",
};
/**
 * Constants
 */
const Constants = {
    MSAL_SKU: "msal.js.node",
    JWT_BEARER_ASSERTION_TYPE: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
    AUTHORIZATION_PENDING: "authorization_pending",
    HTTP_PROTOCOL: "http://",
    LOCALHOST: "localhost",
};
/**
 * API Codes for Telemetry purposes.
 * Before adding a new code you must claim it in the MSAL Telemetry tracker as these number spaces are shared across all MSALs
 * 0-99 Silent Flow
 * 600-699 Device Code Flow
 * 800-899 Auth Code Flow
 */
const ApiId = {
    acquireTokenSilent: 62,
    acquireTokenByUsernamePassword: 371,
    acquireTokenByDeviceCode: 671,
    acquireTokenByClientCredential: 771,
    acquireTokenByCode: 871,
    acquireTokenByRefreshToken: 872,
};
/**
 * JWT  constants
 */
const JwtConstants = {
    ALGORITHM: "alg",
    RSA_256: "RS256",
    PSS_256: "PS256",
    X5T_256: "x5t#S256",
    X5T: "x5t",
    X5C: "x5c",
    AUDIENCE: "aud",
    EXPIRATION_TIME: "exp",
    ISSUER: "iss",
    SUBJECT: "sub",
    NOT_BEFORE: "nbf",
    JWT_ID: "jti",
};

/*! @azure/msal-node v2.16.2 2024-11-19 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class NetworkUtils {
    static getNetworkResponse(headers, body, statusCode) {
        return {
            headers: headers,
            body: body,
            status: statusCode,
        };
    }
    /*
     * Utility function that converts a URL object into an ordinary options object as expected by the
     * http.request and https.request APIs.
     * https://github.com/nodejs/node/blob/main/lib/internal/url.js#L1090
     */
    static urlToHttpOptions(url) {
        const options = {
            protocol: url.protocol,
            hostname: url.hostname && url.hostname.startsWith("[")
                ? url.hostname.slice(1, -1)
                : url.hostname,
            hash: url.hash,
            search: url.search,
            pathname: url.pathname,
            path: `${url.pathname || ""}${url.search || ""}`,
            href: url.href,
        };
        if (url.port !== "") {
            options.port = Number(url.port);
        }
        if (url.username || url.password) {
            options.auth = `${decodeURIComponent(url.username)}:${decodeURIComponent(url.password)}`;
        }
        return options;
    }
}

/*! @azure/msal-node v2.16.2 2024-11-19 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * This class implements the API for network requests.
 */
class HttpClient {
    constructor(proxyUrl, customAgentOptions) {
        this.proxyUrl = proxyUrl || "";
        this.customAgentOptions = customAgentOptions || {};
    }
    /**
     * Http Get request
     * @param url
     * @param options
     */
    async sendGetRequestAsync(url, options, timeout) {
        if (this.proxyUrl) {
            return networkRequestViaProxy(url, this.proxyUrl, HttpMethod.GET, options, this.customAgentOptions, timeout);
        }
        else {
            return networkRequestViaHttps(url, HttpMethod.GET, options, this.customAgentOptions, timeout);
        }
    }
    /**
     * Http Post request
     * @param url
     * @param options
     */
    async sendPostRequestAsync(url, options) {
        if (this.proxyUrl) {
            return networkRequestViaProxy(url, this.proxyUrl, HttpMethod.POST, options, this.customAgentOptions);
        }
        else {
            return networkRequestViaHttps(url, HttpMethod.POST, options, this.customAgentOptions);
        }
    }
}
const networkRequestViaProxy = (destinationUrlString, proxyUrlString, httpMethod, options, agentOptions, timeout) => {
    const destinationUrl = new URL(destinationUrlString);
    const proxyUrl = new URL(proxyUrlString);
    // "method: connect" must be used to establish a connection to the proxy
    const headers = options?.headers || {};
    const tunnelRequestOptions = {
        host: proxyUrl.hostname,
        port: proxyUrl.port,
        method: "CONNECT",
        path: destinationUrl.hostname,
        headers: headers,
    };
    if (agentOptions && Object.keys(agentOptions).length) {
        tunnelRequestOptions.agent = new http.Agent(agentOptions);
    }
    // compose a request string for the socket
    let postRequestStringContent = "";
    if (httpMethod === HttpMethod.POST) {
        const body = options?.body || "";
        postRequestStringContent =
            "Content-Type: application/x-www-form-urlencoded\r\n" +
                `Content-Length: ${body.length}\r\n` +
                `\r\n${body}`;
    }
    else {
        // optional timeout is only for get requests (regionDiscovery, for example)
        if (timeout) {
            tunnelRequestOptions.timeout = timeout;
        }
    }
    const outgoingRequestString = `${httpMethod.toUpperCase()} ${destinationUrl.href} HTTP/1.1\r\n` +
        `Host: ${destinationUrl.host}\r\n` +
        "Connection: close\r\n" +
        postRequestStringContent +
        "\r\n";
    return new Promise((resolve, reject) => {
        const request = http.request(tunnelRequestOptions);
        if (timeout) {
            request.on("timeout", () => {
                request.destroy();
                reject(new Error("Request time out"));
            });
        }
        request.end();
        // establish connection to the proxy
        request.on("connect", (response, socket) => {
            const proxyStatusCode = response?.statusCode || ProxyStatus.SERVER_ERROR;
            if (proxyStatusCode < ProxyStatus.SUCCESS_RANGE_START ||
                proxyStatusCode > ProxyStatus.SUCCESS_RANGE_END) {
                request.destroy();
                socket.destroy();
                reject(new Error(`Error connecting to proxy. Http status code: ${response.statusCode}. Http status message: ${response?.statusMessage || "Unknown"}`));
            }
            // make a request over an HTTP tunnel
            socket.write(outgoingRequestString);
            const data = [];
            socket.on("data", (chunk) => {
                data.push(chunk);
            });
            socket.on("end", () => {
                // combine all received buffer streams into one buffer, and then into a string
                const dataString = Buffer.concat([...data]).toString();
                // separate each line into it's own entry in an arry
                const dataStringArray = dataString.split("\r\n");
                // the first entry will contain the statusCode and statusMessage
                const httpStatusCode = parseInt(dataStringArray[0].split(" ")[1]);
                // remove "HTTP/1.1" and the status code to get the status message
                const statusMessage = dataStringArray[0]
                    .split(" ")
                    .slice(2)
                    .join(" ");
                // the last entry will contain the body
                const body = dataStringArray[dataStringArray.length - 1];
                // everything in between the first and last entries are the headers
                const headersArray = dataStringArray.slice(1, dataStringArray.length - 2);
                // build an object out of all the headers
                const entries = new Map();
                headersArray.forEach((header) => {
                    /**
                     * the header might look like "Content-Length: 1531", but that is just a string
                     * it needs to be converted to a key/value pair
                     * split the string at the first instance of ":"
                     * there may be more than one ":" if the value of the header is supposed to be a JSON object
                     */
                    const headerKeyValue = header.split(new RegExp(/:\s(.*)/s));
                    const headerKey = headerKeyValue[0];
                    let headerValue = headerKeyValue[1];
                    // check if the value of the header is supposed to be a JSON object
                    try {
                        const object = JSON.parse(headerValue);
                        // if it is, then convert it from a string to a JSON object
                        if (object && typeof object === "object") {
                            headerValue = object;
                        }
                    }
                    catch (e) {
                        // otherwise, leave it as a string
                    }
                    entries.set(headerKey, headerValue);
                });
                const headers = Object.fromEntries(entries);
                const parsedHeaders = headers;
                const networkResponse = NetworkUtils.getNetworkResponse(parsedHeaders, parseBody(httpStatusCode, statusMessage, parsedHeaders, body), httpStatusCode);
                if ((httpStatusCode < HttpStatus.SUCCESS_RANGE_START ||
                    httpStatusCode > HttpStatus.SUCCESS_RANGE_END) &&
                    // do not destroy the request for the device code flow
                    networkResponse.body["error"] !==
                        Constants.AUTHORIZATION_PENDING) {
                    request.destroy();
                }
                resolve(networkResponse);
            });
            socket.on("error", (chunk) => {
                request.destroy();
                socket.destroy();
                reject(new Error(chunk.toString()));
            });
        });
        request.on("error", (chunk) => {
            request.destroy();
            reject(new Error(chunk.toString()));
        });
    });
};
const networkRequestViaHttps = (urlString, httpMethod, options, agentOptions, timeout) => {
    const isPostRequest = httpMethod === HttpMethod.POST;
    const body = options?.body || "";
    const url = new URL(urlString);
    const headers = options?.headers || {};
    const customOptions = {
        method: httpMethod,
        headers: headers,
        ...NetworkUtils.urlToHttpOptions(url),
    };
    if (agentOptions && Object.keys(agentOptions).length) {
        customOptions.agent = new https.Agent(agentOptions);
    }
    if (isPostRequest) {
        // needed for post request to work
        customOptions.headers = {
            ...customOptions.headers,
            "Content-Length": body.length,
        };
    }
    else {
        // optional timeout is only for get requests (regionDiscovery, for example)
        if (timeout) {
            customOptions.timeout = timeout;
        }
    }
    return new Promise((resolve, reject) => {
        let request;
        // managed identity sources use http instead of https
        if (customOptions.protocol === "http:") {
            request = http.request(customOptions);
        }
        else {
            request = https.request(customOptions);
        }
        if (isPostRequest) {
            request.write(body);
        }
        if (timeout) {
            request.on("timeout", () => {
                request.destroy();
                reject(new Error("Request time out"));
            });
        }
        request.end();
        request.on("response", (response) => {
            const headers = response.headers;
            const statusCode = response.statusCode;
            const statusMessage = response.statusMessage;
            const data = [];
            response.on("data", (chunk) => {
                data.push(chunk);
            });
            response.on("end", () => {
                // combine all received buffer streams into one buffer, and then into a string
                const body = Buffer.concat([...data]).toString();
                const parsedHeaders = headers;
                const networkResponse = NetworkUtils.getNetworkResponse(parsedHeaders, parseBody(statusCode, statusMessage, parsedHeaders, body), statusCode);
                if ((statusCode < HttpStatus.SUCCESS_RANGE_START ||
                    statusCode > HttpStatus.SUCCESS_RANGE_END) &&
                    // do not destroy the request for the device code flow
                    networkResponse.body["error"] !==
                        Constants.AUTHORIZATION_PENDING) {
                    request.destroy();
                }
                resolve(networkResponse);
            });
        });
        request.on("error", (chunk) => {
            request.destroy();
            reject(new Error(chunk.toString()));
        });
    });
};
/**
 * Check if extra parsing is needed on the repsonse from the server
 * @param statusCode {number} the status code of the response from the server
 * @param statusMessage {string | undefined} the status message of the response from the server
 * @param headers {Record<string, string>} the headers of the response from the server
 * @param body {string} the body from the response of the server
 * @returns {Object} JSON parsed body or error object
 */
const parseBody = (statusCode, statusMessage, headers, body) => {
    /*
     * Informational responses (100 – 199)
     * Successful responses (200 – 299)
     * Redirection messages (300 – 399)
     * Client error responses (400 – 499)
     * Server error responses (500 – 599)
     */
    let parsedBody;
    try {
        parsedBody = JSON.parse(body);
    }
    catch (error) {
        let errorType;
        let errorDescriptionHelper;
        if (statusCode >= HttpStatus.CLIENT_ERROR_RANGE_START &&
            statusCode <= HttpStatus.CLIENT_ERROR_RANGE_END) {
            errorType = "client_error";
            errorDescriptionHelper = "A client";
        }
        else if (statusCode >= HttpStatus.SERVER_ERROR_RANGE_START &&
            statusCode <= HttpStatus.SERVER_ERROR_RANGE_END) {
            errorType = "server_error";
            errorDescriptionHelper = "A server";
        }
        else {
            errorType = "unknown_error";
            errorDescriptionHelper = "An unknown";
        }
        parsedBody = {
            error: errorType,
            error_description: `${errorDescriptionHelper} error occured.\nHttp status code: ${statusCode}\nHttp status message: ${statusMessage || "Unknown"}\nHeaders: ${JSON.stringify(headers)}`,
        };
    }
    return parsedBody;
};

/*! @azure/msal-node v2.16.2 2024-11-19 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * NodeAuthErrorMessage class containing string constants used by error codes and messages.
 */
const NodeAuthErrorMessage = {
    invalidLoopbackAddressType: {
        code: "invalid_loopback_server_address_type",
        desc: "Loopback server address is not type string. This is unexpected.",
    },
    unableToLoadRedirectUri: {
        code: "unable_to_load_redirectUrl",
        desc: "Loopback server callback was invoked without a url. This is unexpected.",
    },
    noAuthCodeInResponse: {
        code: "no_auth_code_in_response",
        desc: "No auth code found in the server response. Please check your network trace to determine what happened.",
    },
    noLoopbackServerExists: {
        code: "no_loopback_server_exists",
        desc: "No loopback server exists yet.",
    },
    loopbackServerAlreadyExists: {
        code: "loopback_server_already_exists",
        desc: "Loopback server already exists. Cannot create another.",
    },
    loopbackServerTimeout: {
        code: "loopback_server_timeout",
        desc: "Timed out waiting for auth code listener to be registered.",
    },
    stateNotFoundError: {
        code: "state_not_found",
        desc: "State not found. Please verify that the request originated from msal.",
    },
    thumbprintMissing: {
        code: "thumbprint_missing_from_client_certificate",
        desc: "Client certificate does not contain a SHA-1 or SHA-256 thumbprint.",
    },
};
class NodeAuthError extends AuthError {
    constructor(errorCode, errorMessage) {
        super(errorCode, errorMessage);
        this.name = "NodeAuthError";
    }
    /**
     * Creates an error thrown if loopback server address is of type string.
     */
    static createInvalidLoopbackAddressTypeError() {
        return new NodeAuthError(NodeAuthErrorMessage.invalidLoopbackAddressType.code, `${NodeAuthErrorMessage.invalidLoopbackAddressType.desc}`);
    }
    /**
     * Creates an error thrown if the loopback server is unable to get a url.
     */
    static createUnableToLoadRedirectUrlError() {
        return new NodeAuthError(NodeAuthErrorMessage.unableToLoadRedirectUri.code, `${NodeAuthErrorMessage.unableToLoadRedirectUri.desc}`);
    }
    /**
     * Creates an error thrown if the server response does not contain an auth code.
     */
    static createNoAuthCodeInResponseError() {
        return new NodeAuthError(NodeAuthErrorMessage.noAuthCodeInResponse.code, `${NodeAuthErrorMessage.noAuthCodeInResponse.desc}`);
    }
    /**
     * Creates an error thrown if the loopback server has not been spun up yet.
     */
    static createNoLoopbackServerExistsError() {
        return new NodeAuthError(NodeAuthErrorMessage.noLoopbackServerExists.code, `${NodeAuthErrorMessage.noLoopbackServerExists.desc}`);
    }
    /**
     * Creates an error thrown if a loopback server already exists when attempting to create another one.
     */
    static createLoopbackServerAlreadyExistsError() {
        return new NodeAuthError(NodeAuthErrorMessage.loopbackServerAlreadyExists.code, `${NodeAuthErrorMessage.loopbackServerAlreadyExists.desc}`);
    }
    /**
     * Creates an error thrown if the loopback server times out registering the auth code listener.
     */
    static createLoopbackServerTimeoutError() {
        return new NodeAuthError(NodeAuthErrorMessage.loopbackServerTimeout.code, `${NodeAuthErrorMessage.loopbackServerTimeout.desc}`);
    }
    /**
     * Creates an error thrown when the state is not present.
     */
    static createStateNotFoundError() {
        return new NodeAuthError(NodeAuthErrorMessage.stateNotFoundError.code, NodeAuthErrorMessage.stateNotFoundError.desc);
    }
    /**
     * Creates an error thrown when client certificate was provided, but neither the SHA-1 or SHA-256 thumbprints were provided
     */
    static createThumbprintMissingError() {
        return new NodeAuthError(NodeAuthErrorMessage.thumbprintMissing.code, NodeAuthErrorMessage.thumbprintMissing.desc);
    }
}

/*! @azure/msal-node v2.16.2 2024-11-19 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const DEFAULT_AUTH_OPTIONS = {
    clientId: Constants$1.EMPTY_STRING,
    authority: Constants$1.DEFAULT_AUTHORITY,
    clientSecret: Constants$1.EMPTY_STRING,
    clientAssertion: Constants$1.EMPTY_STRING,
    clientCertificate: {
        thumbprint: Constants$1.EMPTY_STRING,
        thumbprintSha256: Constants$1.EMPTY_STRING,
        privateKey: Constants$1.EMPTY_STRING,
        x5c: Constants$1.EMPTY_STRING,
    },
    knownAuthorities: [],
    cloudDiscoveryMetadata: Constants$1.EMPTY_STRING,
    authorityMetadata: Constants$1.EMPTY_STRING,
    clientCapabilities: [],
    protocolMode: ProtocolMode.AAD,
    azureCloudOptions: {
        azureCloudInstance: AzureCloudInstance.None,
        tenant: Constants$1.EMPTY_STRING,
    },
    skipAuthorityMetadataCache: false,
};
const DEFAULT_CACHE_OPTIONS = {
    claimsBasedCachingEnabled: false,
};
const DEFAULT_LOGGER_OPTIONS = {
    loggerCallback: () => {
        // allow users to not set logger call back
    },
    piiLoggingEnabled: false,
    logLevel: LogLevel.Info,
};
const DEFAULT_SYSTEM_OPTIONS = {
    loggerOptions: DEFAULT_LOGGER_OPTIONS,
    networkClient: new HttpClient(),
    proxyUrl: Constants$1.EMPTY_STRING,
    customAgentOptions: {},
    disableInternalRetries: false,
};
const DEFAULT_TELEMETRY_OPTIONS = {
    application: {
        appName: Constants$1.EMPTY_STRING,
        appVersion: Constants$1.EMPTY_STRING,
    },
};
/**
 * Sets the default options when not explicitly configured from app developer
 *
 * @param auth - Authentication options
 * @param cache - Cache options
 * @param system - System options
 * @param telemetry - Telemetry options
 *
 * @returns Configuration
 * @internal
 */
function buildAppConfiguration({ auth, broker, cache, system, telemetry, }) {
    const systemOptions = {
        ...DEFAULT_SYSTEM_OPTIONS,
        networkClient: new HttpClient(system?.proxyUrl, system?.customAgentOptions),
        loggerOptions: system?.loggerOptions || DEFAULT_LOGGER_OPTIONS,
        disableInternalRetries: system?.disableInternalRetries || false,
    };
    // if client certificate was provided, ensure that at least one of the SHA-1 or SHA-256 thumbprints were provided
    if (!!auth.clientCertificate &&
        !!!auth.clientCertificate.thumbprint &&
        !!!auth.clientCertificate.thumbprintSha256) {
        throw NodeAuthError.createStateNotFoundError();
    }
    return {
        auth: { ...DEFAULT_AUTH_OPTIONS, ...auth },
        broker: { ...broker },
        cache: { ...DEFAULT_CACHE_OPTIONS, ...cache },
        system: { ...systemOptions, ...system },
        telemetry: { ...DEFAULT_TELEMETRY_OPTIONS, ...telemetry },
    };
}

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate

let poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    crypto.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }

  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

function v4(options, buf, offset) {
  options = options || {};
  const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return stringify(rnds);
}

/*! @azure/msal-node v2.16.2 2024-11-19 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class GuidGenerator {
    /**
     *
     * RFC4122: The version 4 UUID is meant for generating UUIDs from truly-random or pseudo-random numbers.
     * uuidv4 generates guids from cryprtographically-string random
     */
    generateGuid() {
        return v4();
    }
    /**
     * verifies if a string is  GUID
     * @param guid
     */
    isGuid(guid) {
        const regexGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return regexGuid.test(guid);
    }
}

/*! @azure/msal-node v2.16.2 2024-11-19 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class EncodingUtils {
    /**
     * 'utf8': Multibyte encoded Unicode characters. Many web pages and other document formats use UTF-8.
     * 'base64': Base64 encoding.
     *
     * @param str text
     */
    static base64Encode(str, encoding) {
        return Buffer.from(str, encoding).toString("base64");
    }
    /**
     * encode a URL
     * @param str
     */
    static base64EncodeUrl(str, encoding) {
        return EncodingUtils.base64Encode(str, encoding)
            .replace(/=/g, Constants$1.EMPTY_STRING)
            .replace(/\+/g, "-")
            .replace(/\//g, "_");
    }
    /**
     * 'utf8': Multibyte encoded Unicode characters. Many web pages and other document formats use UTF-8.
     * 'base64': Base64 encoding.
     *
     * @param base64Str Base64 encoded text
     */
    static base64Decode(base64Str) {
        return Buffer.from(base64Str, "base64").toString("utf8");
    }
    /**
     * @param base64Str Base64 encoded Url
     */
    static base64DecodeUrl(base64Str) {
        let str = base64Str.replace(/-/g, "+").replace(/_/g, "/");
        while (str.length % 4) {
            str += "=";
        }
        return EncodingUtils.base64Decode(str);
    }
}

/*! @azure/msal-node v2.16.2 2024-11-19 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class HashUtils {
    /**
     * generate 'SHA256' hash
     * @param buffer
     */
    sha256(buffer) {
        return crypto.createHash(Hash.SHA256).update(buffer).digest();
    }
}

/*! @azure/msal-node v2.16.2 2024-11-19 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * https://tools.ietf.org/html/rfc7636#page-8
 */
class PkceGenerator {
    constructor() {
        this.hashUtils = new HashUtils();
    }
    /**
     * generates the codeVerfier and the challenge from the codeVerfier
     * reference: https://tools.ietf.org/html/rfc7636#section-4.1 and https://tools.ietf.org/html/rfc7636#section-4.2
     */
    async generatePkceCodes() {
        const verifier = this.generateCodeVerifier();
        const challenge = this.generateCodeChallengeFromVerifier(verifier);
        return { verifier, challenge };
    }
    /**
     * generates the codeVerfier; reference: https://tools.ietf.org/html/rfc7636#section-4.1
     */
    generateCodeVerifier() {
        const charArr = [];
        const maxNumber = 256 - (256 % CharSet.CV_CHARSET.length);
        while (charArr.length <= RANDOM_OCTET_SIZE) {
            const byte = crypto.randomBytes(1)[0];
            if (byte >= maxNumber) {
                /*
                 * Ignore this number to maintain randomness.
                 * Including it would result in an unequal distribution of characters after doing the modulo
                 */
                continue;
            }
            const index = byte % CharSet.CV_CHARSET.length;
            charArr.push(CharSet.CV_CHARSET[index]);
        }
        const verifier = charArr.join(Constants$1.EMPTY_STRING);
        return EncodingUtils.base64EncodeUrl(verifier);
    }
    /**
     * generate the challenge from the codeVerfier; reference: https://tools.ietf.org/html/rfc7636#section-4.2
     * @param codeVerifier
     */
    generateCodeChallengeFromVerifier(codeVerifier) {
        return EncodingUtils.base64EncodeUrl(this.hashUtils.sha256(codeVerifier).toString("base64"), "base64");
    }
}

/*! @azure/msal-node v2.16.2 2024-11-19 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * This class implements MSAL node's crypto interface, which allows it to perform base64 encoding and decoding, generating cryptographically random GUIDs and
 * implementing Proof Key for Code Exchange specs for the OAuth Authorization Code Flow using PKCE (rfc here: https://tools.ietf.org/html/rfc7636).
 * @public
 */
class CryptoProvider {
    constructor() {
        // Browser crypto needs to be validated first before any other classes can be set.
        this.pkceGenerator = new PkceGenerator();
        this.guidGenerator = new GuidGenerator();
        this.hashUtils = new HashUtils();
    }
    /**
     * base64 URL safe encoded string
     */
    base64UrlEncode() {
        throw new Error("Method not implemented.");
    }
    /**
     * Stringifies and base64Url encodes input public key
     * @param inputKid - public key id
     * @returns Base64Url encoded public key
     */
    encodeKid() {
        throw new Error("Method not implemented.");
    }
    /**
     * Creates a new random GUID - used to populate state and nonce.
     * @returns string (GUID)
     */
    createNewGuid() {
        return this.guidGenerator.generateGuid();
    }
    /**
     * Encodes input string to base64.
     * @param input - string to be encoded
     */
    base64Encode(input) {
        return EncodingUtils.base64Encode(input);
    }
    /**
     * Decodes input string from base64.
     * @param input - string to be decoded
     */
    base64Decode(input) {
        return EncodingUtils.base64Decode(input);
    }
    /**
     * Generates PKCE codes used in Authorization Code Flow.
     */
    generatePkceCodes() {
        return this.pkceGenerator.generatePkceCodes();
    }
    /**
     * Generates a keypair, stores it and returns a thumbprint - not yet implemented for node
     */
    getPublicKeyThumbprint() {
        throw new Error("Method not implemented.");
    }
    /**
     * Removes cryptographic keypair from key store matching the keyId passed in
     * @param kid - public key id
     */
    removeTokenBindingKey() {
        throw new Error("Method not implemented.");
    }
    /**
     * Removes all cryptographic keys from Keystore
     */
    clearKeystore() {
        throw new Error("Method not implemented.");
    }
    /**
     * Signs the given object as a jwt payload with private key retrieved by given kid - currently not implemented for node
     */
    signJwt() {
        throw new Error("Method not implemented.");
    }
    /**
     * Returns the SHA-256 hash of an input string
     */
    async hashString(plainText) {
        return EncodingUtils.base64EncodeUrl(this.hashUtils.sha256(plainText).toString("base64"), "base64");
    }
}

/*! @azure/msal-node v2.16.2 2024-11-19 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * This class implements Storage for node, reading cache from user specified storage location or an  extension library
 * @public
 */
class NodeStorage extends CacheManager {
    constructor(logger, clientId, cryptoImpl, staticAuthorityOptions) {
        super(clientId, cryptoImpl, logger, staticAuthorityOptions);
        this.cache = {};
        this.changeEmitters = [];
        this.logger = logger;
    }
    /**
     * Queue up callbacks
     * @param func - a callback function for cache change indication
     */
    registerChangeEmitter(func) {
        this.changeEmitters.push(func);
    }
    /**
     * Invoke the callback when cache changes
     */
    emitChange() {
        this.changeEmitters.forEach((func) => func.call(null));
    }
    /**
     * Converts cacheKVStore to InMemoryCache
     * @param cache - key value store
     */
    cacheToInMemoryCache(cache) {
        const inMemoryCache = {
            accounts: {},
            idTokens: {},
            accessTokens: {},
            refreshTokens: {},
            appMetadata: {},
        };
        for (const key in cache) {
            const value = cache[key];
            if (typeof value !== "object") {
                continue;
            }
            if (value instanceof AccountEntity) {
                inMemoryCache.accounts[key] = value;
            }
            else if (isIdTokenEntity(value)) {
                inMemoryCache.idTokens[key] = value;
            }
            else if (isAccessTokenEntity(value)) {
                inMemoryCache.accessTokens[key] = value;
            }
            else if (isRefreshTokenEntity(value)) {
                inMemoryCache.refreshTokens[key] = value;
            }
            else if (isAppMetadataEntity(key, value)) {
                inMemoryCache.appMetadata[key] = value;
            }
            else {
                continue;
            }
        }
        return inMemoryCache;
    }
    /**
     * converts inMemoryCache to CacheKVStore
     * @param inMemoryCache - kvstore map for inmemory
     */
    inMemoryCacheToCache(inMemoryCache) {
        // convert in memory cache to a flat Key-Value map
        let cache = this.getCache();
        cache = {
            ...cache,
            ...inMemoryCache.accounts,
            ...inMemoryCache.idTokens,
            ...inMemoryCache.accessTokens,
            ...inMemoryCache.refreshTokens,
            ...inMemoryCache.appMetadata,
        };
        // convert in memory cache to a flat Key-Value map
        return cache;
    }
    /**
     * gets the current in memory cache for the client
     */
    getInMemoryCache() {
        this.logger.trace("Getting in-memory cache");
        // convert the cache key value store to inMemoryCache
        const inMemoryCache = this.cacheToInMemoryCache(this.getCache());
        return inMemoryCache;
    }
    /**
     * sets the current in memory cache for the client
     * @param inMemoryCache - key value map in memory
     */
    setInMemoryCache(inMemoryCache) {
        this.logger.trace("Setting in-memory cache");
        // convert and append the inMemoryCache to cacheKVStore
        const cache = this.inMemoryCacheToCache(inMemoryCache);
        this.setCache(cache);
        this.emitChange();
    }
    /**
     * get the current cache key-value store
     */
    getCache() {
        this.logger.trace("Getting cache key-value store");
        return this.cache;
    }
    /**
     * sets the current cache (key value store)
     * @param cacheMap - key value map
     */
    setCache(cache) {
        this.logger.trace("Setting cache key value store");
        this.cache = cache;
        // mark change in cache
        this.emitChange();
    }
    /**
     * Gets cache item with given key.
     * @param key - lookup key for the cache entry
     */
    getItem(key) {
        this.logger.tracePii(`Item key: ${key}`);
        // read cache
        const cache = this.getCache();
        return cache[key];
    }
    /**
     * Gets cache item with given key-value
     * @param key - lookup key for the cache entry
     * @param value - value of the cache entry
     */
    setItem(key, value) {
        this.logger.tracePii(`Item key: ${key}`);
        // read cache
        const cache = this.getCache();
        cache[key] = value;
        // write to cache
        this.setCache(cache);
    }
    getAccountKeys() {
        const inMemoryCache = this.getInMemoryCache();
        const accountKeys = Object.keys(inMemoryCache.accounts);
        return accountKeys;
    }
    getTokenKeys() {
        const inMemoryCache = this.getInMemoryCache();
        const tokenKeys = {
            idToken: Object.keys(inMemoryCache.idTokens),
            accessToken: Object.keys(inMemoryCache.accessTokens),
            refreshToken: Object.keys(inMemoryCache.refreshTokens),
        };
        return tokenKeys;
    }
    /**
     * fetch the account entity
     * @param accountKey - lookup key to fetch cache type AccountEntity
     */
    getAccount(accountKey) {
        const accountEntity = this.getCachedAccountEntity(accountKey);
        if (accountEntity && AccountEntity.isAccountEntity(accountEntity)) {
            return this.updateOutdatedCachedAccount(accountKey, accountEntity);
        }
        return null;
    }
    /**
     * Reads account from cache, builds it into an account entity and returns it.
     * @param accountKey - lookup key to fetch cache type AccountEntity
     * @returns
     */
    getCachedAccountEntity(accountKey) {
        const cachedAccount = this.getItem(accountKey);
        return cachedAccount
            ? Object.assign(new AccountEntity(), this.getItem(accountKey))
            : null;
    }
    /**
     * set account entity
     * @param account - cache value to be set of type AccountEntity
     */
    setAccount(account) {
        const accountKey = account.generateAccountKey();
        this.setItem(accountKey, account);
    }
    /**
     * fetch the idToken credential
     * @param idTokenKey - lookup key to fetch cache type IdTokenEntity
     */
    getIdTokenCredential(idTokenKey) {
        const idToken = this.getItem(idTokenKey);
        if (isIdTokenEntity(idToken)) {
            return idToken;
        }
        return null;
    }
    /**
     * set idToken credential
     * @param idToken - cache value to be set of type IdTokenEntity
     */
    setIdTokenCredential(idToken) {
        const idTokenKey = generateCredentialKey(idToken);
        this.setItem(idTokenKey, idToken);
    }
    /**
     * fetch the accessToken credential
     * @param accessTokenKey - lookup key to fetch cache type AccessTokenEntity
     */
    getAccessTokenCredential(accessTokenKey) {
        const accessToken = this.getItem(accessTokenKey);
        if (isAccessTokenEntity(accessToken)) {
            return accessToken;
        }
        return null;
    }
    /**
     * set accessToken credential
     * @param accessToken -  cache value to be set of type AccessTokenEntity
     */
    setAccessTokenCredential(accessToken) {
        const accessTokenKey = generateCredentialKey(accessToken);
        this.setItem(accessTokenKey, accessToken);
    }
    /**
     * fetch the refreshToken credential
     * @param refreshTokenKey - lookup key to fetch cache type RefreshTokenEntity
     */
    getRefreshTokenCredential(refreshTokenKey) {
        const refreshToken = this.getItem(refreshTokenKey);
        if (isRefreshTokenEntity(refreshToken)) {
            return refreshToken;
        }
        return null;
    }
    /**
     * set refreshToken credential
     * @param refreshToken - cache value to be set of type RefreshTokenEntity
     */
    setRefreshTokenCredential(refreshToken) {
        const refreshTokenKey = generateCredentialKey(refreshToken);
        this.setItem(refreshTokenKey, refreshToken);
    }
    /**
     * fetch appMetadata entity from the platform cache
     * @param appMetadataKey - lookup key to fetch cache type AppMetadataEntity
     */
    getAppMetadata(appMetadataKey) {
        const appMetadata = this.getItem(appMetadataKey);
        if (isAppMetadataEntity(appMetadataKey, appMetadata)) {
            return appMetadata;
        }
        return null;
    }
    /**
     * set appMetadata entity to the platform cache
     * @param appMetadata - cache value to be set of type AppMetadataEntity
     */
    setAppMetadata(appMetadata) {
        const appMetadataKey = generateAppMetadataKey(appMetadata);
        this.setItem(appMetadataKey, appMetadata);
    }
    /**
     * fetch server telemetry entity from the platform cache
     * @param serverTelemetrykey - lookup key to fetch cache type ServerTelemetryEntity
     */
    getServerTelemetry(serverTelemetrykey) {
        const serverTelemetryEntity = this.getItem(serverTelemetrykey);
        if (serverTelemetryEntity &&
            isServerTelemetryEntity(serverTelemetrykey, serverTelemetryEntity)) {
            return serverTelemetryEntity;
        }
        return null;
    }
    /**
     * set server telemetry entity to the platform cache
     * @param serverTelemetryKey - lookup key to fetch cache type ServerTelemetryEntity
     * @param serverTelemetry - cache value to be set of type ServerTelemetryEntity
     */
    setServerTelemetry(serverTelemetryKey, serverTelemetry) {
        this.setItem(serverTelemetryKey, serverTelemetry);
    }
    /**
     * fetch authority metadata entity from the platform cache
     * @param key - lookup key to fetch cache type AuthorityMetadataEntity
     */
    getAuthorityMetadata(key) {
        const authorityMetadataEntity = this.getItem(key);
        if (authorityMetadataEntity &&
            isAuthorityMetadataEntity(key, authorityMetadataEntity)) {
            return authorityMetadataEntity;
        }
        return null;
    }
    /**
     * Get all authority metadata keys
     */
    getAuthorityMetadataKeys() {
        return this.getKeys().filter((key) => {
            return this.isAuthorityMetadata(key);
        });
    }
    /**
     * set authority metadata entity to the platform cache
     * @param key - lookup key to fetch cache type AuthorityMetadataEntity
     * @param metadata - cache value to be set of type AuthorityMetadataEntity
     */
    setAuthorityMetadata(key, metadata) {
        this.setItem(key, metadata);
    }
    /**
     * fetch throttling entity from the platform cache
     * @param throttlingCacheKey - lookup key to fetch cache type ThrottlingEntity
     */
    getThrottlingCache(throttlingCacheKey) {
        const throttlingCache = this.getItem(throttlingCacheKey);
        if (throttlingCache &&
            isThrottlingEntity(throttlingCacheKey, throttlingCache)) {
            return throttlingCache;
        }
        return null;
    }
    /**
     * set throttling entity to the platform cache
     * @param throttlingCacheKey - lookup key to fetch cache type ThrottlingEntity
     * @param throttlingCache - cache value to be set of type ThrottlingEntity
     */
    setThrottlingCache(throttlingCacheKey, throttlingCache) {
        this.setItem(throttlingCacheKey, throttlingCache);
    }
    /**
     * Removes the cache item from memory with the given key.
     * @param key - lookup key to remove a cache entity
     * @param inMemory - key value map of the cache
     */
    removeItem(key) {
        this.logger.tracePii(`Item key: ${key}`);
        // read inMemoryCache
        let result = false;
        const cache = this.getCache();
        if (!!cache[key]) {
            delete cache[key];
            result = true;
        }
        // write to the cache after removal
        if (result) {
            this.setCache(cache);
            this.emitChange();
        }
        return result;
    }
    /**
     * Remove account entity from the platform cache if it's outdated
     * @param accountKey - lookup key to fetch cache type AccountEntity
     */
    removeOutdatedAccount(accountKey) {
        this.removeItem(accountKey);
    }
    /**
     * Checks whether key is in cache.
     * @param key - look up key for a cache entity
     */
    containsKey(key) {
        return this.getKeys().includes(key);
    }
    /**
     * Gets all keys in window.
     */
    getKeys() {
        this.logger.trace("Retrieving all cache keys");
        // read cache
        const cache = this.getCache();
        return [...Object.keys(cache)];
    }
    /**
     * Clears all cache entries created by MSAL (except tokens).
     */
    clear() {
        this.logger.trace("Clearing cache entries created by MSAL");
        // read inMemoryCache
        const cacheKeys = this.getKeys();
        // delete each element
        cacheKeys.forEach((key) => {
            this.removeItem(key);
        });
        this.emitChange();
    }
    /**
     * Initialize in memory cache from an exisiting cache vault
     * @param cache - blob formatted cache (JSON)
     */
    static generateInMemoryCache(cache) {
        return Deserializer.deserializeAllCache(Deserializer.deserializeJSONBlob(cache));
    }
    /**
     * retrieves the final JSON
     * @param inMemoryCache - itemised cache read from the JSON
     */
    static generateJsonCache(inMemoryCache) {
        return Serializer.serializeAllCache(inMemoryCache);
    }
    /**
     * Updates a credential's cache key if the current cache key is outdated
     */
    updateCredentialCacheKey(currentCacheKey, credential) {
        const updatedCacheKey = generateCredentialKey(credential);
        if (currentCacheKey !== updatedCacheKey) {
            const cacheItem = this.getItem(currentCacheKey);
            if (cacheItem) {
                this.removeItem(currentCacheKey);
                this.setItem(updatedCacheKey, cacheItem);
                this.logger.verbose(`Updated an outdated ${credential.credentialType} cache key`);
                return updatedCacheKey;
            }
            else {
                this.logger.error(`Attempted to update an outdated ${credential.credentialType} cache key but no item matching the outdated key was found in storage`);
            }
        }
        return currentCacheKey;
    }
}

/*! @azure/msal-node v2.16.2 2024-11-19 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const defaultSerializedCache = {
    Account: {},
    IdToken: {},
    AccessToken: {},
    RefreshToken: {},
    AppMetadata: {},
};
/**
 * In-memory token cache manager
 * @public
 */
class TokenCache {
    constructor(storage, logger, cachePlugin) {
        this.cacheHasChanged = false;
        this.storage = storage;
        this.storage.registerChangeEmitter(this.handleChangeEvent.bind(this));
        if (cachePlugin) {
            this.persistence = cachePlugin;
        }
        this.logger = logger;
    }
    /**
     * Set to true if cache state has changed since last time serialize or writeToPersistence was called
     */
    hasChanged() {
        return this.cacheHasChanged;
    }
    /**
     * Serializes in memory cache to JSON
     */
    serialize() {
        this.logger.trace("Serializing in-memory cache");
        let finalState = Serializer.serializeAllCache(this.storage.getInMemoryCache());
        // if cacheSnapshot not null or empty, merge
        if (this.cacheSnapshot) {
            this.logger.trace("Reading cache snapshot from disk");
            finalState = this.mergeState(JSON.parse(this.cacheSnapshot), finalState);
        }
        else {
            this.logger.trace("No cache snapshot to merge");
        }
        this.cacheHasChanged = false;
        return JSON.stringify(finalState);
    }
    /**
     * Deserializes JSON to in-memory cache. JSON should be in MSAL cache schema format
     * @param cache - blob formatted cache
     */
    deserialize(cache) {
        this.logger.trace("Deserializing JSON to in-memory cache");
        this.cacheSnapshot = cache;
        if (this.cacheSnapshot) {
            this.logger.trace("Reading cache snapshot from disk");
            const deserializedCache = Deserializer.deserializeAllCache(this.overlayDefaults(JSON.parse(this.cacheSnapshot)));
            this.storage.setInMemoryCache(deserializedCache);
        }
        else {
            this.logger.trace("No cache snapshot to deserialize");
        }
    }
    /**
     * Fetches the cache key-value map
     */
    getKVStore() {
        return this.storage.getCache();
    }
    /**
     * API that retrieves all accounts currently in cache to the user
     */
    async getAllAccounts() {
        this.logger.trace("getAllAccounts called");
        let cacheContext;
        try {
            if (this.persistence) {
                cacheContext = new TokenCacheContext(this, false);
                await this.persistence.beforeCacheAccess(cacheContext);
            }
            return this.storage.getAllAccounts();
        }
        finally {
            if (this.persistence && cacheContext) {
                await this.persistence.afterCacheAccess(cacheContext);
            }
        }
    }
    /**
     * Returns the signed in account matching homeAccountId.
     * (the account object is created at the time of successful login)
     * or null when no matching account is found
     * @param homeAccountId - unique identifier for an account (uid.utid)
     */
    async getAccountByHomeId(homeAccountId) {
        const allAccounts = await this.getAllAccounts();
        if (homeAccountId && allAccounts && allAccounts.length) {
            return (allAccounts.filter((accountObj) => accountObj.homeAccountId === homeAccountId)[0] || null);
        }
        else {
            return null;
        }
    }
    /**
     * Returns the signed in account matching localAccountId.
     * (the account object is created at the time of successful login)
     * or null when no matching account is found
     * @param localAccountId - unique identifier of an account (sub/obj when homeAccountId cannot be populated)
     */
    async getAccountByLocalId(localAccountId) {
        const allAccounts = await this.getAllAccounts();
        if (localAccountId && allAccounts && allAccounts.length) {
            return (allAccounts.filter((accountObj) => accountObj.localAccountId === localAccountId)[0] || null);
        }
        else {
            return null;
        }
    }
    /**
     * API to remove a specific account and the relevant data from cache
     * @param account - AccountInfo passed by the user
     */
    async removeAccount(account) {
        this.logger.trace("removeAccount called");
        let cacheContext;
        try {
            if (this.persistence) {
                cacheContext = new TokenCacheContext(this, true);
                await this.persistence.beforeCacheAccess(cacheContext);
            }
            await this.storage.removeAccount(AccountEntity.generateAccountCacheKey(account));
        }
        finally {
            if (this.persistence && cacheContext) {
                await this.persistence.afterCacheAccess(cacheContext);
            }
        }
    }
    /**
     * Called when the cache has changed state.
     */
    handleChangeEvent() {
        this.cacheHasChanged = true;
    }
    /**
     * Merge in memory cache with the cache snapshot.
     * @param oldState - cache before changes
     * @param currentState - current cache state in the library
     */
    mergeState(oldState, currentState) {
        this.logger.trace("Merging in-memory cache with cache snapshot");
        const stateAfterRemoval = this.mergeRemovals(oldState, currentState);
        return this.mergeUpdates(stateAfterRemoval, currentState);
    }
    /**
     * Deep update of oldState based on newState values
     * @param oldState - cache before changes
     * @param newState - updated cache
     */
    mergeUpdates(oldState, newState) {
        Object.keys(newState).forEach((newKey) => {
            const newValue = newState[newKey];
            // if oldState does not contain value but newValue does, add it
            if (!oldState.hasOwnProperty(newKey)) {
                if (newValue !== null) {
                    oldState[newKey] = newValue;
                }
            }
            else {
                // both oldState and newState contain the key, do deep update
                const newValueNotNull = newValue !== null;
                const newValueIsObject = typeof newValue === "object";
                const newValueIsNotArray = !Array.isArray(newValue);
                const oldStateNotUndefinedOrNull = typeof oldState[newKey] !== "undefined" &&
                    oldState[newKey] !== null;
                if (newValueNotNull &&
                    newValueIsObject &&
                    newValueIsNotArray &&
                    oldStateNotUndefinedOrNull) {
                    this.mergeUpdates(oldState[newKey], newValue);
                }
                else {
                    oldState[newKey] = newValue;
                }
            }
        });
        return oldState;
    }
    /**
     * Removes entities in oldState that the were removed from newState. If there are any unknown values in root of
     * oldState that are not recognized, they are left untouched.
     * @param oldState - cache before changes
     * @param newState - updated cache
     */
    mergeRemovals(oldState, newState) {
        this.logger.trace("Remove updated entries in cache");
        const accounts = oldState.Account
            ? this.mergeRemovalsDict(oldState.Account, newState.Account)
            : oldState.Account;
        const accessTokens = oldState.AccessToken
            ? this.mergeRemovalsDict(oldState.AccessToken, newState.AccessToken)
            : oldState.AccessToken;
        const refreshTokens = oldState.RefreshToken
            ? this.mergeRemovalsDict(oldState.RefreshToken, newState.RefreshToken)
            : oldState.RefreshToken;
        const idTokens = oldState.IdToken
            ? this.mergeRemovalsDict(oldState.IdToken, newState.IdToken)
            : oldState.IdToken;
        const appMetadata = oldState.AppMetadata
            ? this.mergeRemovalsDict(oldState.AppMetadata, newState.AppMetadata)
            : oldState.AppMetadata;
        return {
            ...oldState,
            Account: accounts,
            AccessToken: accessTokens,
            RefreshToken: refreshTokens,
            IdToken: idTokens,
            AppMetadata: appMetadata,
        };
    }
    /**
     * Helper to merge new cache with the old one
     * @param oldState - cache before changes
     * @param newState - updated cache
     */
    mergeRemovalsDict(oldState, newState) {
        const finalState = { ...oldState };
        Object.keys(oldState).forEach((oldKey) => {
            if (!newState || !newState.hasOwnProperty(oldKey)) {
                delete finalState[oldKey];
            }
        });
        return finalState;
    }
    /**
     * Helper to overlay as a part of cache merge
     * @param passedInCache - cache read from the blob
     */
    overlayDefaults(passedInCache) {
        this.logger.trace("Overlaying input cache with the default cache");
        return {
            Account: {
                ...defaultSerializedCache.Account,
                ...passedInCache.Account,
            },
            IdToken: {
                ...defaultSerializedCache.IdToken,
                ...passedInCache.IdToken,
            },
            AccessToken: {
                ...defaultSerializedCache.AccessToken,
                ...passedInCache.AccessToken,
            },
            RefreshToken: {
                ...defaultSerializedCache.RefreshToken,
                ...passedInCache.RefreshToken,
            },
            AppMetadata: {
                ...defaultSerializedCache.AppMetadata,
                ...passedInCache.AppMetadata,
            },
        };
    }
}

var jws = {};

var safeBuffer = {exports: {}};

/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */

var hasRequiredSafeBuffer;

function requireSafeBuffer () {
	if (hasRequiredSafeBuffer) return safeBuffer.exports;
	hasRequiredSafeBuffer = 1;
	(function (module, exports) {
		/* eslint-disable node/no-deprecated-api */
		var buffer = require$$0;
		var Buffer = buffer.Buffer;

		// alternative to using Object.keys for old browsers
		function copyProps (src, dst) {
		  for (var key in src) {
		    dst[key] = src[key];
		  }
		}
		if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
		  module.exports = buffer;
		} else {
		  // Copy properties from require('buffer')
		  copyProps(buffer, exports);
		  exports.Buffer = SafeBuffer;
		}

		function SafeBuffer (arg, encodingOrOffset, length) {
		  return Buffer(arg, encodingOrOffset, length)
		}

		SafeBuffer.prototype = Object.create(Buffer.prototype);

		// Copy static methods from Buffer
		copyProps(Buffer, SafeBuffer);

		SafeBuffer.from = function (arg, encodingOrOffset, length) {
		  if (typeof arg === 'number') {
		    throw new TypeError('Argument must not be a number')
		  }
		  return Buffer(arg, encodingOrOffset, length)
		};

		SafeBuffer.alloc = function (size, fill, encoding) {
		  if (typeof size !== 'number') {
		    throw new TypeError('Argument must be a number')
		  }
		  var buf = Buffer(size);
		  if (fill !== undefined) {
		    if (typeof encoding === 'string') {
		      buf.fill(fill, encoding);
		    } else {
		      buf.fill(fill);
		    }
		  } else {
		    buf.fill(0);
		  }
		  return buf
		};

		SafeBuffer.allocUnsafe = function (size) {
		  if (typeof size !== 'number') {
		    throw new TypeError('Argument must be a number')
		  }
		  return Buffer(size)
		};

		SafeBuffer.allocUnsafeSlow = function (size) {
		  if (typeof size !== 'number') {
		    throw new TypeError('Argument must be a number')
		  }
		  return buffer.SlowBuffer(size)
		}; 
	} (safeBuffer, safeBuffer.exports));
	return safeBuffer.exports;
}

/*global module, process*/

var dataStream;
var hasRequiredDataStream;

function requireDataStream () {
	if (hasRequiredDataStream) return dataStream;
	hasRequiredDataStream = 1;
	var Buffer = requireSafeBuffer().Buffer;
	var Stream = require$$3;
	var util = require$$5;

	function DataStream(data) {
	  this.buffer = null;
	  this.writable = true;
	  this.readable = true;

	  // No input
	  if (!data) {
	    this.buffer = Buffer.alloc(0);
	    return this;
	  }

	  // Stream
	  if (typeof data.pipe === 'function') {
	    this.buffer = Buffer.alloc(0);
	    data.pipe(this);
	    return this;
	  }

	  // Buffer or String
	  // or Object (assumedly a passworded key)
	  if (data.length || typeof data === 'object') {
	    this.buffer = data;
	    this.writable = false;
	    process.nextTick(function () {
	      this.emit('end', data);
	      this.readable = false;
	      this.emit('close');
	    }.bind(this));
	    return this;
	  }

	  throw new TypeError('Unexpected data type ('+ typeof data + ')');
	}
	util.inherits(DataStream, Stream);

	DataStream.prototype.write = function write(data) {
	  this.buffer = Buffer.concat([this.buffer, Buffer.from(data)]);
	  this.emit('data', data);
	};

	DataStream.prototype.end = function end(data) {
	  if (data)
	    this.write(data);
	  this.emit('end', data);
	  this.emit('close');
	  this.writable = false;
	  this.readable = false;
	};

	dataStream = DataStream;
	return dataStream;
}

/*jshint node:true */

var bufferEqualConstantTime;
var hasRequiredBufferEqualConstantTime;

function requireBufferEqualConstantTime () {
	if (hasRequiredBufferEqualConstantTime) return bufferEqualConstantTime;
	hasRequiredBufferEqualConstantTime = 1;
	var Buffer = require$$0.Buffer; // browserify
	var SlowBuffer = require$$0.SlowBuffer;

	bufferEqualConstantTime = bufferEq;

	function bufferEq(a, b) {

	  // shortcutting on type is necessary for correctness
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    return false;
	  }

	  // buffer sizes should be well-known information, so despite this
	  // shortcutting, it doesn't leak any information about the *contents* of the
	  // buffers.
	  if (a.length !== b.length) {
	    return false;
	  }

	  var c = 0;
	  for (var i = 0; i < a.length; i++) {
	    /*jshint bitwise:false */
	    c |= a[i] ^ b[i]; // XOR
	  }
	  return c === 0;
	}

	bufferEq.install = function() {
	  Buffer.prototype.equal = SlowBuffer.prototype.equal = function equal(that) {
	    return bufferEq(this, that);
	  };
	};

	var origBufEqual = Buffer.prototype.equal;
	var origSlowBufEqual = SlowBuffer.prototype.equal;
	bufferEq.restore = function() {
	  Buffer.prototype.equal = origBufEqual;
	  SlowBuffer.prototype.equal = origSlowBufEqual;
	};
	return bufferEqualConstantTime;
}

var paramBytesForAlg_1;
var hasRequiredParamBytesForAlg;

function requireParamBytesForAlg () {
	if (hasRequiredParamBytesForAlg) return paramBytesForAlg_1;
	hasRequiredParamBytesForAlg = 1;

	function getParamSize(keySize) {
		var result = ((keySize / 8) | 0) + (keySize % 8 === 0 ? 0 : 1);
		return result;
	}

	var paramBytesForAlg = {
		ES256: getParamSize(256),
		ES384: getParamSize(384),
		ES512: getParamSize(521)
	};

	function getParamBytesForAlg(alg) {
		var paramBytes = paramBytesForAlg[alg];
		if (paramBytes) {
			return paramBytes;
		}

		throw new Error('Unknown algorithm "' + alg + '"');
	}

	paramBytesForAlg_1 = getParamBytesForAlg;
	return paramBytesForAlg_1;
}

var ecdsaSigFormatter;
var hasRequiredEcdsaSigFormatter;

function requireEcdsaSigFormatter () {
	if (hasRequiredEcdsaSigFormatter) return ecdsaSigFormatter;
	hasRequiredEcdsaSigFormatter = 1;

	var Buffer = requireSafeBuffer().Buffer;

	var getParamBytesForAlg = requireParamBytesForAlg();

	var MAX_OCTET = 0x80,
		CLASS_UNIVERSAL = 0,
		PRIMITIVE_BIT = 0x20,
		TAG_SEQ = 0x10,
		TAG_INT = 0x02,
		ENCODED_TAG_SEQ = (TAG_SEQ | PRIMITIVE_BIT) | (CLASS_UNIVERSAL << 6),
		ENCODED_TAG_INT = TAG_INT | (CLASS_UNIVERSAL << 6);

	function base64Url(base64) {
		return base64
			.replace(/=/g, '')
			.replace(/\+/g, '-')
			.replace(/\//g, '_');
	}

	function signatureAsBuffer(signature) {
		if (Buffer.isBuffer(signature)) {
			return signature;
		} else if ('string' === typeof signature) {
			return Buffer.from(signature, 'base64');
		}

		throw new TypeError('ECDSA signature must be a Base64 string or a Buffer');
	}

	function derToJose(signature, alg) {
		signature = signatureAsBuffer(signature);
		var paramBytes = getParamBytesForAlg(alg);

		// the DER encoded param should at most be the param size, plus a padding
		// zero, since due to being a signed integer
		var maxEncodedParamLength = paramBytes + 1;

		var inputLength = signature.length;

		var offset = 0;
		if (signature[offset++] !== ENCODED_TAG_SEQ) {
			throw new Error('Could not find expected "seq"');
		}

		var seqLength = signature[offset++];
		if (seqLength === (MAX_OCTET | 1)) {
			seqLength = signature[offset++];
		}

		if (inputLength - offset < seqLength) {
			throw new Error('"seq" specified length of "' + seqLength + '", only "' + (inputLength - offset) + '" remaining');
		}

		if (signature[offset++] !== ENCODED_TAG_INT) {
			throw new Error('Could not find expected "int" for "r"');
		}

		var rLength = signature[offset++];

		if (inputLength - offset - 2 < rLength) {
			throw new Error('"r" specified length of "' + rLength + '", only "' + (inputLength - offset - 2) + '" available');
		}

		if (maxEncodedParamLength < rLength) {
			throw new Error('"r" specified length of "' + rLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
		}

		var rOffset = offset;
		offset += rLength;

		if (signature[offset++] !== ENCODED_TAG_INT) {
			throw new Error('Could not find expected "int" for "s"');
		}

		var sLength = signature[offset++];

		if (inputLength - offset !== sLength) {
			throw new Error('"s" specified length of "' + sLength + '", expected "' + (inputLength - offset) + '"');
		}

		if (maxEncodedParamLength < sLength) {
			throw new Error('"s" specified length of "' + sLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
		}

		var sOffset = offset;
		offset += sLength;

		if (offset !== inputLength) {
			throw new Error('Expected to consume entire buffer, but "' + (inputLength - offset) + '" bytes remain');
		}

		var rPadding = paramBytes - rLength,
			sPadding = paramBytes - sLength;

		var dst = Buffer.allocUnsafe(rPadding + rLength + sPadding + sLength);

		for (offset = 0; offset < rPadding; ++offset) {
			dst[offset] = 0;
		}
		signature.copy(dst, offset, rOffset + Math.max(-rPadding, 0), rOffset + rLength);

		offset = paramBytes;

		for (var o = offset; offset < o + sPadding; ++offset) {
			dst[offset] = 0;
		}
		signature.copy(dst, offset, sOffset + Math.max(-sPadding, 0), sOffset + sLength);

		dst = dst.toString('base64');
		dst = base64Url(dst);

		return dst;
	}

	function countPadding(buf, start, stop) {
		var padding = 0;
		while (start + padding < stop && buf[start + padding] === 0) {
			++padding;
		}

		var needsSign = buf[start + padding] >= MAX_OCTET;
		if (needsSign) {
			--padding;
		}

		return padding;
	}

	function joseToDer(signature, alg) {
		signature = signatureAsBuffer(signature);
		var paramBytes = getParamBytesForAlg(alg);

		var signatureBytes = signature.length;
		if (signatureBytes !== paramBytes * 2) {
			throw new TypeError('"' + alg + '" signatures must be "' + paramBytes * 2 + '" bytes, saw "' + signatureBytes + '"');
		}

		var rPadding = countPadding(signature, 0, paramBytes);
		var sPadding = countPadding(signature, paramBytes, signature.length);
		var rLength = paramBytes - rPadding;
		var sLength = paramBytes - sPadding;

		var rsBytes = 1 + 1 + rLength + 1 + 1 + sLength;

		var shortLength = rsBytes < MAX_OCTET;

		var dst = Buffer.allocUnsafe((shortLength ? 2 : 3) + rsBytes);

		var offset = 0;
		dst[offset++] = ENCODED_TAG_SEQ;
		if (shortLength) {
			// Bit 8 has value "0"
			// bits 7-1 give the length.
			dst[offset++] = rsBytes;
		} else {
			// Bit 8 of first octet has value "1"
			// bits 7-1 give the number of additional length octets.
			dst[offset++] = MAX_OCTET	| 1;
			// length, base 256
			dst[offset++] = rsBytes & 0xff;
		}
		dst[offset++] = ENCODED_TAG_INT;
		dst[offset++] = rLength;
		if (rPadding < 0) {
			dst[offset++] = 0;
			offset += signature.copy(dst, offset, 0, paramBytes);
		} else {
			offset += signature.copy(dst, offset, rPadding, paramBytes);
		}
		dst[offset++] = ENCODED_TAG_INT;
		dst[offset++] = sLength;
		if (sPadding < 0) {
			dst[offset++] = 0;
			signature.copy(dst, offset, paramBytes);
		} else {
			signature.copy(dst, offset, paramBytes + sPadding);
		}

		return dst;
	}

	ecdsaSigFormatter = {
		derToJose: derToJose,
		joseToDer: joseToDer
	};
	return ecdsaSigFormatter;
}

var jwa;
var hasRequiredJwa;

function requireJwa () {
	if (hasRequiredJwa) return jwa;
	hasRequiredJwa = 1;
	var bufferEqual = requireBufferEqualConstantTime();
	var Buffer = requireSafeBuffer().Buffer;
	var crypto$1 = crypto;
	var formatEcdsa = requireEcdsaSigFormatter();
	var util = require$$5;

	var MSG_INVALID_ALGORITHM = '"%s" is not a valid algorithm.\n  Supported algorithms are:\n  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512" and "none".';
	var MSG_INVALID_SECRET = 'secret must be a string or buffer';
	var MSG_INVALID_VERIFIER_KEY = 'key must be a string or a buffer';
	var MSG_INVALID_SIGNER_KEY = 'key must be a string, a buffer or an object';

	var supportsKeyObjects = typeof crypto$1.createPublicKey === 'function';
	if (supportsKeyObjects) {
	  MSG_INVALID_VERIFIER_KEY += ' or a KeyObject';
	  MSG_INVALID_SECRET += 'or a KeyObject';
	}

	function checkIsPublicKey(key) {
	  if (Buffer.isBuffer(key)) {
	    return;
	  }

	  if (typeof key === 'string') {
	    return;
	  }

	  if (!supportsKeyObjects) {
	    throw typeError(MSG_INVALID_VERIFIER_KEY);
	  }

	  if (typeof key !== 'object') {
	    throw typeError(MSG_INVALID_VERIFIER_KEY);
	  }

	  if (typeof key.type !== 'string') {
	    throw typeError(MSG_INVALID_VERIFIER_KEY);
	  }

	  if (typeof key.asymmetricKeyType !== 'string') {
	    throw typeError(MSG_INVALID_VERIFIER_KEY);
	  }

	  if (typeof key.export !== 'function') {
	    throw typeError(MSG_INVALID_VERIFIER_KEY);
	  }
	}
	function checkIsPrivateKey(key) {
	  if (Buffer.isBuffer(key)) {
	    return;
	  }

	  if (typeof key === 'string') {
	    return;
	  }

	  if (typeof key === 'object') {
	    return;
	  }

	  throw typeError(MSG_INVALID_SIGNER_KEY);
	}
	function checkIsSecretKey(key) {
	  if (Buffer.isBuffer(key)) {
	    return;
	  }

	  if (typeof key === 'string') {
	    return key;
	  }

	  if (!supportsKeyObjects) {
	    throw typeError(MSG_INVALID_SECRET);
	  }

	  if (typeof key !== 'object') {
	    throw typeError(MSG_INVALID_SECRET);
	  }

	  if (key.type !== 'secret') {
	    throw typeError(MSG_INVALID_SECRET);
	  }

	  if (typeof key.export !== 'function') {
	    throw typeError(MSG_INVALID_SECRET);
	  }
	}

	function fromBase64(base64) {
	  return base64
	    .replace(/=/g, '')
	    .replace(/\+/g, '-')
	    .replace(/\//g, '_');
	}

	function toBase64(base64url) {
	  base64url = base64url.toString();

	  var padding = 4 - base64url.length % 4;
	  if (padding !== 4) {
	    for (var i = 0; i < padding; ++i) {
	      base64url += '=';
	    }
	  }

	  return base64url
	    .replace(/\-/g, '+')
	    .replace(/_/g, '/');
	}

	function typeError(template) {
	  var args = [].slice.call(arguments, 1);
	  var errMsg = util.format.bind(util, template).apply(null, args);
	  return new TypeError(errMsg);
	}

	function bufferOrString(obj) {
	  return Buffer.isBuffer(obj) || typeof obj === 'string';
	}

	function normalizeInput(thing) {
	  if (!bufferOrString(thing))
	    thing = JSON.stringify(thing);
	  return thing;
	}

	function createHmacSigner(bits) {
	  return function sign(thing, secret) {
	    checkIsSecretKey(secret);
	    thing = normalizeInput(thing);
	    var hmac = crypto$1.createHmac('sha' + bits, secret);
	    var sig = (hmac.update(thing), hmac.digest('base64'));
	    return fromBase64(sig);
	  }
	}

	function createHmacVerifier(bits) {
	  return function verify(thing, signature, secret) {
	    var computedSig = createHmacSigner(bits)(thing, secret);
	    return bufferEqual(Buffer.from(signature), Buffer.from(computedSig));
	  }
	}

	function createKeySigner(bits) {
	 return function sign(thing, privateKey) {
	    checkIsPrivateKey(privateKey);
	    thing = normalizeInput(thing);
	    // Even though we are specifying "RSA" here, this works with ECDSA
	    // keys as well.
	    var signer = crypto$1.createSign('RSA-SHA' + bits);
	    var sig = (signer.update(thing), signer.sign(privateKey, 'base64'));
	    return fromBase64(sig);
	  }
	}

	function createKeyVerifier(bits) {
	  return function verify(thing, signature, publicKey) {
	    checkIsPublicKey(publicKey);
	    thing = normalizeInput(thing);
	    signature = toBase64(signature);
	    var verifier = crypto$1.createVerify('RSA-SHA' + bits);
	    verifier.update(thing);
	    return verifier.verify(publicKey, signature, 'base64');
	  }
	}

	function createPSSKeySigner(bits) {
	  return function sign(thing, privateKey) {
	    checkIsPrivateKey(privateKey);
	    thing = normalizeInput(thing);
	    var signer = crypto$1.createSign('RSA-SHA' + bits);
	    var sig = (signer.update(thing), signer.sign({
	      key: privateKey,
	      padding: crypto$1.constants.RSA_PKCS1_PSS_PADDING,
	      saltLength: crypto$1.constants.RSA_PSS_SALTLEN_DIGEST
	    }, 'base64'));
	    return fromBase64(sig);
	  }
	}

	function createPSSKeyVerifier(bits) {
	  return function verify(thing, signature, publicKey) {
	    checkIsPublicKey(publicKey);
	    thing = normalizeInput(thing);
	    signature = toBase64(signature);
	    var verifier = crypto$1.createVerify('RSA-SHA' + bits);
	    verifier.update(thing);
	    return verifier.verify({
	      key: publicKey,
	      padding: crypto$1.constants.RSA_PKCS1_PSS_PADDING,
	      saltLength: crypto$1.constants.RSA_PSS_SALTLEN_DIGEST
	    }, signature, 'base64');
	  }
	}

	function createECDSASigner(bits) {
	  var inner = createKeySigner(bits);
	  return function sign() {
	    var signature = inner.apply(null, arguments);
	    signature = formatEcdsa.derToJose(signature, 'ES' + bits);
	    return signature;
	  };
	}

	function createECDSAVerifer(bits) {
	  var inner = createKeyVerifier(bits);
	  return function verify(thing, signature, publicKey) {
	    signature = formatEcdsa.joseToDer(signature, 'ES' + bits).toString('base64');
	    var result = inner(thing, signature, publicKey);
	    return result;
	  };
	}

	function createNoneSigner() {
	  return function sign() {
	    return '';
	  }
	}

	function createNoneVerifier() {
	  return function verify(thing, signature) {
	    return signature === '';
	  }
	}

	jwa = function jwa(algorithm) {
	  var signerFactories = {
	    hs: createHmacSigner,
	    rs: createKeySigner,
	    ps: createPSSKeySigner,
	    es: createECDSASigner,
	    none: createNoneSigner,
	  };
	  var verifierFactories = {
	    hs: createHmacVerifier,
	    rs: createKeyVerifier,
	    ps: createPSSKeyVerifier,
	    es: createECDSAVerifer,
	    none: createNoneVerifier,
	  };
	  var match = algorithm.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/i);
	  if (!match)
	    throw typeError(MSG_INVALID_ALGORITHM, algorithm);
	  var algo = (match[1] || match[3]).toLowerCase();
	  var bits = match[2];

	  return {
	    sign: signerFactories[algo](bits),
	    verify: verifierFactories[algo](bits),
	  }
	};
	return jwa;
}

/*global module*/

var tostring;
var hasRequiredTostring;

function requireTostring () {
	if (hasRequiredTostring) return tostring;
	hasRequiredTostring = 1;
	var Buffer = require$$0.Buffer;

	tostring = function toString(obj) {
	  if (typeof obj === 'string')
	    return obj;
	  if (typeof obj === 'number' || Buffer.isBuffer(obj))
	    return obj.toString();
	  return JSON.stringify(obj);
	};
	return tostring;
}

/*global module*/

var signStream;
var hasRequiredSignStream;

function requireSignStream () {
	if (hasRequiredSignStream) return signStream;
	hasRequiredSignStream = 1;
	var Buffer = requireSafeBuffer().Buffer;
	var DataStream = requireDataStream();
	var jwa = requireJwa();
	var Stream = require$$3;
	var toString = requireTostring();
	var util = require$$5;

	function base64url(string, encoding) {
	  return Buffer
	    .from(string, encoding)
	    .toString('base64')
	    .replace(/=/g, '')
	    .replace(/\+/g, '-')
	    .replace(/\//g, '_');
	}

	function jwsSecuredInput(header, payload, encoding) {
	  encoding = encoding || 'utf8';
	  var encodedHeader = base64url(toString(header), 'binary');
	  var encodedPayload = base64url(toString(payload), encoding);
	  return util.format('%s.%s', encodedHeader, encodedPayload);
	}

	function jwsSign(opts) {
	  var header = opts.header;
	  var payload = opts.payload;
	  var secretOrKey = opts.secret || opts.privateKey;
	  var encoding = opts.encoding;
	  var algo = jwa(header.alg);
	  var securedInput = jwsSecuredInput(header, payload, encoding);
	  var signature = algo.sign(securedInput, secretOrKey);
	  return util.format('%s.%s', securedInput, signature);
	}

	function SignStream(opts) {
	  var secret = opts.secret||opts.privateKey||opts.key;
	  var secretStream = new DataStream(secret);
	  this.readable = true;
	  this.header = opts.header;
	  this.encoding = opts.encoding;
	  this.secret = this.privateKey = this.key = secretStream;
	  this.payload = new DataStream(opts.payload);
	  this.secret.once('close', function () {
	    if (!this.payload.writable && this.readable)
	      this.sign();
	  }.bind(this));

	  this.payload.once('close', function () {
	    if (!this.secret.writable && this.readable)
	      this.sign();
	  }.bind(this));
	}
	util.inherits(SignStream, Stream);

	SignStream.prototype.sign = function sign() {
	  try {
	    var signature = jwsSign({
	      header: this.header,
	      payload: this.payload.buffer,
	      secret: this.secret.buffer,
	      encoding: this.encoding
	    });
	    this.emit('done', signature);
	    this.emit('data', signature);
	    this.emit('end');
	    this.readable = false;
	    return signature;
	  } catch (e) {
	    this.readable = false;
	    this.emit('error', e);
	    this.emit('close');
	  }
	};

	SignStream.sign = jwsSign;

	signStream = SignStream;
	return signStream;
}

/*global module*/

var verifyStream;
var hasRequiredVerifyStream;

function requireVerifyStream () {
	if (hasRequiredVerifyStream) return verifyStream;
	hasRequiredVerifyStream = 1;
	var Buffer = requireSafeBuffer().Buffer;
	var DataStream = requireDataStream();
	var jwa = requireJwa();
	var Stream = require$$3;
	var toString = requireTostring();
	var util = require$$5;
	var JWS_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;

	function isObject(thing) {
	  return Object.prototype.toString.call(thing) === '[object Object]';
	}

	function safeJsonParse(thing) {
	  if (isObject(thing))
	    return thing;
	  try { return JSON.parse(thing); }
	  catch (e) { return undefined; }
	}

	function headerFromJWS(jwsSig) {
	  var encodedHeader = jwsSig.split('.', 1)[0];
	  return safeJsonParse(Buffer.from(encodedHeader, 'base64').toString('binary'));
	}

	function securedInputFromJWS(jwsSig) {
	  return jwsSig.split('.', 2).join('.');
	}

	function signatureFromJWS(jwsSig) {
	  return jwsSig.split('.')[2];
	}

	function payloadFromJWS(jwsSig, encoding) {
	  encoding = encoding || 'utf8';
	  var payload = jwsSig.split('.')[1];
	  return Buffer.from(payload, 'base64').toString(encoding);
	}

	function isValidJws(string) {
	  return JWS_REGEX.test(string) && !!headerFromJWS(string);
	}

	function jwsVerify(jwsSig, algorithm, secretOrKey) {
	  if (!algorithm) {
	    var err = new Error("Missing algorithm parameter for jws.verify");
	    err.code = "MISSING_ALGORITHM";
	    throw err;
	  }
	  jwsSig = toString(jwsSig);
	  var signature = signatureFromJWS(jwsSig);
	  var securedInput = securedInputFromJWS(jwsSig);
	  var algo = jwa(algorithm);
	  return algo.verify(securedInput, signature, secretOrKey);
	}

	function jwsDecode(jwsSig, opts) {
	  opts = opts || {};
	  jwsSig = toString(jwsSig);

	  if (!isValidJws(jwsSig))
	    return null;

	  var header = headerFromJWS(jwsSig);

	  if (!header)
	    return null;

	  var payload = payloadFromJWS(jwsSig);
	  if (header.typ === 'JWT' || opts.json)
	    payload = JSON.parse(payload, opts.encoding);

	  return {
	    header: header,
	    payload: payload,
	    signature: signatureFromJWS(jwsSig)
	  };
	}

	function VerifyStream(opts) {
	  opts = opts || {};
	  var secretOrKey = opts.secret||opts.publicKey||opts.key;
	  var secretStream = new DataStream(secretOrKey);
	  this.readable = true;
	  this.algorithm = opts.algorithm;
	  this.encoding = opts.encoding;
	  this.secret = this.publicKey = this.key = secretStream;
	  this.signature = new DataStream(opts.signature);
	  this.secret.once('close', function () {
	    if (!this.signature.writable && this.readable)
	      this.verify();
	  }.bind(this));

	  this.signature.once('close', function () {
	    if (!this.secret.writable && this.readable)
	      this.verify();
	  }.bind(this));
	}
	util.inherits(VerifyStream, Stream);
	VerifyStream.prototype.verify = function verify() {
	  try {
	    var valid = jwsVerify(this.signature.buffer, this.algorithm, this.key.buffer);
	    var obj = jwsDecode(this.signature.buffer, this.encoding);
	    this.emit('done', valid, obj);
	    this.emit('data', valid);
	    this.emit('end');
	    this.readable = false;
	    return valid;
	  } catch (e) {
	    this.readable = false;
	    this.emit('error', e);
	    this.emit('close');
	  }
	};

	VerifyStream.decode = jwsDecode;
	VerifyStream.isValid = isValidJws;
	VerifyStream.verify = jwsVerify;

	verifyStream = VerifyStream;
	return verifyStream;
}

/*global exports*/

var hasRequiredJws;

function requireJws () {
	if (hasRequiredJws) return jws;
	hasRequiredJws = 1;
	var SignStream = requireSignStream();
	var VerifyStream = requireVerifyStream();

	var ALGORITHMS = [
	  'HS256', 'HS384', 'HS512',
	  'RS256', 'RS384', 'RS512',
	  'PS256', 'PS384', 'PS512',
	  'ES256', 'ES384', 'ES512'
	];

	jws.ALGORITHMS = ALGORITHMS;
	jws.sign = SignStream.sign;
	jws.verify = VerifyStream.verify;
	jws.decode = VerifyStream.decode;
	jws.isValid = VerifyStream.isValid;
	jws.createSign = function createSign(opts) {
	  return new SignStream(opts);
	};
	jws.createVerify = function createVerify(opts) {
	  return new VerifyStream(opts);
	};
	return jws;
}

var decode;
var hasRequiredDecode;

function requireDecode () {
	if (hasRequiredDecode) return decode;
	hasRequiredDecode = 1;
	var jws = requireJws();

	decode = function (jwt, options) {
	  options = options || {};
	  var decoded = jws.decode(jwt, options);
	  if (!decoded) { return null; }
	  var payload = decoded.payload;

	  //try parse the payload
	  if(typeof payload === 'string') {
	    try {
	      var obj = JSON.parse(payload);
	      if(obj !== null && typeof obj === 'object') {
	        payload = obj;
	      }
	    } catch (e) { }
	  }

	  //return header if `complete` option is enabled.  header includes claims
	  //such as `kid` and `alg` used to select the key within a JWKS needed to
	  //verify the signature
	  if (options.complete === true) {
	    return {
	      header: decoded.header,
	      payload: payload,
	      signature: decoded.signature
	    };
	  }
	  return payload;
	};
	return decode;
}

var JsonWebTokenError_1;
var hasRequiredJsonWebTokenError;

function requireJsonWebTokenError () {
	if (hasRequiredJsonWebTokenError) return JsonWebTokenError_1;
	hasRequiredJsonWebTokenError = 1;
	var JsonWebTokenError = function (message, error) {
	  Error.call(this, message);
	  if(Error.captureStackTrace) {
	    Error.captureStackTrace(this, this.constructor);
	  }
	  this.name = 'JsonWebTokenError';
	  this.message = message;
	  if (error) this.inner = error;
	};

	JsonWebTokenError.prototype = Object.create(Error.prototype);
	JsonWebTokenError.prototype.constructor = JsonWebTokenError;

	JsonWebTokenError_1 = JsonWebTokenError;
	return JsonWebTokenError_1;
}

var NotBeforeError_1;
var hasRequiredNotBeforeError;

function requireNotBeforeError () {
	if (hasRequiredNotBeforeError) return NotBeforeError_1;
	hasRequiredNotBeforeError = 1;
	var JsonWebTokenError = requireJsonWebTokenError();

	var NotBeforeError = function (message, date) {
	  JsonWebTokenError.call(this, message);
	  this.name = 'NotBeforeError';
	  this.date = date;
	};

	NotBeforeError.prototype = Object.create(JsonWebTokenError.prototype);

	NotBeforeError.prototype.constructor = NotBeforeError;

	NotBeforeError_1 = NotBeforeError;
	return NotBeforeError_1;
}

var TokenExpiredError_1;
var hasRequiredTokenExpiredError;

function requireTokenExpiredError () {
	if (hasRequiredTokenExpiredError) return TokenExpiredError_1;
	hasRequiredTokenExpiredError = 1;
	var JsonWebTokenError = requireJsonWebTokenError();

	var TokenExpiredError = function (message, expiredAt) {
	  JsonWebTokenError.call(this, message);
	  this.name = 'TokenExpiredError';
	  this.expiredAt = expiredAt;
	};

	TokenExpiredError.prototype = Object.create(JsonWebTokenError.prototype);

	TokenExpiredError.prototype.constructor = TokenExpiredError;

	TokenExpiredError_1 = TokenExpiredError;
	return TokenExpiredError_1;
}

/**
 * Helpers.
 */

var ms;
var hasRequiredMs;

function requireMs () {
	if (hasRequiredMs) return ms;
	hasRequiredMs = 1;
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var w = d * 7;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} [options]
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */

	ms = function(val, options) {
	  options = options || {};
	  var type = typeof val;
	  if (type === 'string' && val.length > 0) {
	    return parse(val);
	  } else if (type === 'number' && isFinite(val)) {
	    return options.long ? fmtLong(val) : fmtShort(val);
	  }
	  throw new Error(
	    'val is not a non-empty string or a valid number. val=' +
	      JSON.stringify(val)
	  );
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = String(str);
	  if (str.length > 100) {
	    return;
	  }
	  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
	    str
	  );
	  if (!match) {
	    return;
	  }
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'weeks':
	    case 'week':
	    case 'w':
	      return n * w;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	    default:
	      return undefined;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtShort(ms) {
	  var msAbs = Math.abs(ms);
	  if (msAbs >= d) {
	    return Math.round(ms / d) + 'd';
	  }
	  if (msAbs >= h) {
	    return Math.round(ms / h) + 'h';
	  }
	  if (msAbs >= m) {
	    return Math.round(ms / m) + 'm';
	  }
	  if (msAbs >= s) {
	    return Math.round(ms / s) + 's';
	  }
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtLong(ms) {
	  var msAbs = Math.abs(ms);
	  if (msAbs >= d) {
	    return plural(ms, msAbs, d, 'day');
	  }
	  if (msAbs >= h) {
	    return plural(ms, msAbs, h, 'hour');
	  }
	  if (msAbs >= m) {
	    return plural(ms, msAbs, m, 'minute');
	  }
	  if (msAbs >= s) {
	    return plural(ms, msAbs, s, 'second');
	  }
	  return ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, msAbs, n, name) {
	  var isPlural = msAbs >= n * 1.5;
	  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
	}
	return ms;
}

var timespan;
var hasRequiredTimespan;

function requireTimespan () {
	if (hasRequiredTimespan) return timespan;
	hasRequiredTimespan = 1;
	var ms = requireMs();

	timespan = function (time, iat) {
	  var timestamp = iat || Math.floor(Date.now() / 1000);

	  if (typeof time === 'string') {
	    var milliseconds = ms(time);
	    if (typeof milliseconds === 'undefined') {
	      return;
	    }
	    return Math.floor(timestamp + milliseconds / 1000);
	  } else if (typeof time === 'number') {
	    return timestamp + time;
	  } else {
	    return;
	  }

	};
	return timespan;
}

var re = {exports: {}};

var constants;
var hasRequiredConstants;

function requireConstants () {
	if (hasRequiredConstants) return constants;
	hasRequiredConstants = 1;
	// Note: this is the semver.org version of the spec that it implements
	// Not necessarily the package version of this code.
	const SEMVER_SPEC_VERSION = '2.0.0';

	const MAX_LENGTH = 256;
	const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
	/* istanbul ignore next */ 9007199254740991;

	// Max safe segment length for coercion.
	const MAX_SAFE_COMPONENT_LENGTH = 16;

	// Max safe length for a build identifier. The max length minus 6 characters for
	// the shortest version with a build 0.0.0+BUILD.
	const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;

	const RELEASE_TYPES = [
	  'major',
	  'premajor',
	  'minor',
	  'preminor',
	  'patch',
	  'prepatch',
	  'prerelease',
	];

	constants = {
	  MAX_LENGTH,
	  MAX_SAFE_COMPONENT_LENGTH,
	  MAX_SAFE_BUILD_LENGTH,
	  MAX_SAFE_INTEGER,
	  RELEASE_TYPES,
	  SEMVER_SPEC_VERSION,
	  FLAG_INCLUDE_PRERELEASE: 0b001,
	  FLAG_LOOSE: 0b010,
	};
	return constants;
}

var debug_1;
var hasRequiredDebug;

function requireDebug () {
	if (hasRequiredDebug) return debug_1;
	hasRequiredDebug = 1;
	const debug = (
	  typeof process === 'object' &&
	  process.env &&
	  process.env.NODE_DEBUG &&
	  /\bsemver\b/i.test(process.env.NODE_DEBUG)
	) ? (...args) => console.error('SEMVER', ...args)
	  : () => {};

	debug_1 = debug;
	return debug_1;
}

var hasRequiredRe;

function requireRe () {
	if (hasRequiredRe) return re.exports;
	hasRequiredRe = 1;
	(function (module, exports) {
		const {
		  MAX_SAFE_COMPONENT_LENGTH,
		  MAX_SAFE_BUILD_LENGTH,
		  MAX_LENGTH,
		} = requireConstants();
		const debug = requireDebug();
		exports = module.exports = {};

		// The actual regexps go on exports.re
		const re = exports.re = [];
		const safeRe = exports.safeRe = [];
		const src = exports.src = [];
		const t = exports.t = {};
		let R = 0;

		const LETTERDASHNUMBER = '[a-zA-Z0-9-]';

		// Replace some greedy regex tokens to prevent regex dos issues. These regex are
		// used internally via the safeRe object since all inputs in this library get
		// normalized first to trim and collapse all extra whitespace. The original
		// regexes are exported for userland consumption and lower level usage. A
		// future breaking change could export the safer regex only with a note that
		// all input should have extra whitespace removed.
		const safeRegexReplacements = [
		  ['\\s', 1],
		  ['\\d', MAX_LENGTH],
		  [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH],
		];

		const makeSafeRegex = (value) => {
		  for (const [token, max] of safeRegexReplacements) {
		    value = value
		      .split(`${token}*`).join(`${token}{0,${max}}`)
		      .split(`${token}+`).join(`${token}{1,${max}}`);
		  }
		  return value
		};

		const createToken = (name, value, isGlobal) => {
		  const safe = makeSafeRegex(value);
		  const index = R++;
		  debug(name, index, value);
		  t[name] = index;
		  src[index] = value;
		  re[index] = new RegExp(value, isGlobal ? 'g' : undefined);
		  safeRe[index] = new RegExp(safe, isGlobal ? 'g' : undefined);
		};

		// The following Regular Expressions can be used for tokenizing,
		// validating, and parsing SemVer version strings.

		// ## Numeric Identifier
		// A single `0`, or a non-zero digit followed by zero or more digits.

		createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*');
		createToken('NUMERICIDENTIFIERLOOSE', '\\d+');

		// ## Non-numeric Identifier
		// Zero or more digits, followed by a letter or hyphen, and then zero or
		// more letters, digits, or hyphens.

		createToken('NONNUMERICIDENTIFIER', `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);

		// ## Main Version
		// Three dot-separated numeric identifiers.

		createToken('MAINVERSION', `(${src[t.NUMERICIDENTIFIER]})\\.` +
		                   `(${src[t.NUMERICIDENTIFIER]})\\.` +
		                   `(${src[t.NUMERICIDENTIFIER]})`);

		createToken('MAINVERSIONLOOSE', `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
		                        `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
		                        `(${src[t.NUMERICIDENTIFIERLOOSE]})`);

		// ## Pre-release Version Identifier
		// A numeric identifier, or a non-numeric identifier.

		createToken('PRERELEASEIDENTIFIER', `(?:${src[t.NUMERICIDENTIFIER]
		}|${src[t.NONNUMERICIDENTIFIER]})`);

		createToken('PRERELEASEIDENTIFIERLOOSE', `(?:${src[t.NUMERICIDENTIFIERLOOSE]
		}|${src[t.NONNUMERICIDENTIFIER]})`);

		// ## Pre-release Version
		// Hyphen, followed by one or more dot-separated pre-release version
		// identifiers.

		createToken('PRERELEASE', `(?:-(${src[t.PRERELEASEIDENTIFIER]
		}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);

		createToken('PRERELEASELOOSE', `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]
		}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);

		// ## Build Metadata Identifier
		// Any combination of digits, letters, or hyphens.

		createToken('BUILDIDENTIFIER', `${LETTERDASHNUMBER}+`);

		// ## Build Metadata
		// Plus sign, followed by one or more period-separated build metadata
		// identifiers.

		createToken('BUILD', `(?:\\+(${src[t.BUILDIDENTIFIER]
		}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);

		// ## Full Version String
		// A main version, followed optionally by a pre-release version and
		// build metadata.

		// Note that the only major, minor, patch, and pre-release sections of
		// the version string are capturing groups.  The build metadata is not a
		// capturing group, because it should not ever be used in version
		// comparison.

		createToken('FULLPLAIN', `v?${src[t.MAINVERSION]
		}${src[t.PRERELEASE]}?${
		  src[t.BUILD]}?`);

		createToken('FULL', `^${src[t.FULLPLAIN]}$`);

		// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
		// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
		// common in the npm registry.
		createToken('LOOSEPLAIN', `[v=\\s]*${src[t.MAINVERSIONLOOSE]
		}${src[t.PRERELEASELOOSE]}?${
		  src[t.BUILD]}?`);

		createToken('LOOSE', `^${src[t.LOOSEPLAIN]}$`);

		createToken('GTLT', '((?:<|>)?=?)');

		// Something like "2.*" or "1.2.x".
		// Note that "x.x" is a valid xRange identifer, meaning "any version"
		// Only the first item is strictly required.
		createToken('XRANGEIDENTIFIERLOOSE', `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
		createToken('XRANGEIDENTIFIER', `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);

		createToken('XRANGEPLAIN', `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` +
		                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
		                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
		                   `(?:${src[t.PRERELEASE]})?${
		                     src[t.BUILD]}?` +
		                   `)?)?`);

		createToken('XRANGEPLAINLOOSE', `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` +
		                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
		                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
		                        `(?:${src[t.PRERELEASELOOSE]})?${
		                          src[t.BUILD]}?` +
		                        `)?)?`);

		createToken('XRANGE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
		createToken('XRANGELOOSE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);

		// Coercion.
		// Extract anything that could conceivably be a part of a valid semver
		createToken('COERCEPLAIN', `${'(^|[^\\d])' +
		              '(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})` +
		              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
		              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
		createToken('COERCE', `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
		createToken('COERCEFULL', src[t.COERCEPLAIN] +
		              `(?:${src[t.PRERELEASE]})?` +
		              `(?:${src[t.BUILD]})?` +
		              `(?:$|[^\\d])`);
		createToken('COERCERTL', src[t.COERCE], true);
		createToken('COERCERTLFULL', src[t.COERCEFULL], true);

		// Tilde ranges.
		// Meaning is "reasonably at or greater than"
		createToken('LONETILDE', '(?:~>?)');

		createToken('TILDETRIM', `(\\s*)${src[t.LONETILDE]}\\s+`, true);
		exports.tildeTrimReplace = '$1~';

		createToken('TILDE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
		createToken('TILDELOOSE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);

		// Caret ranges.
		// Meaning is "at least and backwards compatible with"
		createToken('LONECARET', '(?:\\^)');

		createToken('CARETTRIM', `(\\s*)${src[t.LONECARET]}\\s+`, true);
		exports.caretTrimReplace = '$1^';

		createToken('CARET', `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
		createToken('CARETLOOSE', `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);

		// A simple gt/lt/eq thing, or just "" to indicate "any version"
		createToken('COMPARATORLOOSE', `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
		createToken('COMPARATOR', `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);

		// An expression to strip any whitespace between the gtlt and the thing
		// it modifies, so that `> 1.2.3` ==> `>1.2.3`
		createToken('COMPARATORTRIM', `(\\s*)${src[t.GTLT]
		}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
		exports.comparatorTrimReplace = '$1$2$3';

		// Something like `1.2.3 - 1.2.4`
		// Note that these all use the loose form, because they'll be
		// checked against either the strict or loose comparator form
		// later.
		createToken('HYPHENRANGE', `^\\s*(${src[t.XRANGEPLAIN]})` +
		                   `\\s+-\\s+` +
		                   `(${src[t.XRANGEPLAIN]})` +
		                   `\\s*$`);

		createToken('HYPHENRANGELOOSE', `^\\s*(${src[t.XRANGEPLAINLOOSE]})` +
		                        `\\s+-\\s+` +
		                        `(${src[t.XRANGEPLAINLOOSE]})` +
		                        `\\s*$`);

		// Star ranges basically just allow anything at all.
		createToken('STAR', '(<|>)?=?\\s*\\*');
		// >=0.0.0 is like a star
		createToken('GTE0', '^\\s*>=\\s*0\\.0\\.0\\s*$');
		createToken('GTE0PRE', '^\\s*>=\\s*0\\.0\\.0-0\\s*$'); 
	} (re, re.exports));
	return re.exports;
}

var parseOptions_1;
var hasRequiredParseOptions;

function requireParseOptions () {
	if (hasRequiredParseOptions) return parseOptions_1;
	hasRequiredParseOptions = 1;
	// parse out just the options we care about
	const looseOption = Object.freeze({ loose: true });
	const emptyOpts = Object.freeze({ });
	const parseOptions = options => {
	  if (!options) {
	    return emptyOpts
	  }

	  if (typeof options !== 'object') {
	    return looseOption
	  }

	  return options
	};
	parseOptions_1 = parseOptions;
	return parseOptions_1;
}

var identifiers;
var hasRequiredIdentifiers;

function requireIdentifiers () {
	if (hasRequiredIdentifiers) return identifiers;
	hasRequiredIdentifiers = 1;
	const numeric = /^[0-9]+$/;
	const compareIdentifiers = (a, b) => {
	  const anum = numeric.test(a);
	  const bnum = numeric.test(b);

	  if (anum && bnum) {
	    a = +a;
	    b = +b;
	  }

	  return a === b ? 0
	    : (anum && !bnum) ? -1
	    : (bnum && !anum) ? 1
	    : a < b ? -1
	    : 1
	};

	const rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);

	identifiers = {
	  compareIdentifiers,
	  rcompareIdentifiers,
	};
	return identifiers;
}

var semver$1;
var hasRequiredSemver$1;

function requireSemver$1 () {
	if (hasRequiredSemver$1) return semver$1;
	hasRequiredSemver$1 = 1;
	const debug = requireDebug();
	const { MAX_LENGTH, MAX_SAFE_INTEGER } = requireConstants();
	const { safeRe: re, t } = requireRe();

	const parseOptions = requireParseOptions();
	const { compareIdentifiers } = requireIdentifiers();
	class SemVer {
	  constructor (version, options) {
	    options = parseOptions(options);

	    if (version instanceof SemVer) {
	      if (version.loose === !!options.loose &&
	          version.includePrerelease === !!options.includePrerelease) {
	        return version
	      } else {
	        version = version.version;
	      }
	    } else if (typeof version !== 'string') {
	      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`)
	    }

	    if (version.length > MAX_LENGTH) {
	      throw new TypeError(
	        `version is longer than ${MAX_LENGTH} characters`
	      )
	    }

	    debug('SemVer', version, options);
	    this.options = options;
	    this.loose = !!options.loose;
	    // this isn't actually relevant for versions, but keep it so that we
	    // don't run into trouble passing this.options around.
	    this.includePrerelease = !!options.includePrerelease;

	    const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);

	    if (!m) {
	      throw new TypeError(`Invalid Version: ${version}`)
	    }

	    this.raw = version;

	    // these are actually numbers
	    this.major = +m[1];
	    this.minor = +m[2];
	    this.patch = +m[3];

	    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
	      throw new TypeError('Invalid major version')
	    }

	    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
	      throw new TypeError('Invalid minor version')
	    }

	    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
	      throw new TypeError('Invalid patch version')
	    }

	    // numberify any prerelease numeric ids
	    if (!m[4]) {
	      this.prerelease = [];
	    } else {
	      this.prerelease = m[4].split('.').map((id) => {
	        if (/^[0-9]+$/.test(id)) {
	          const num = +id;
	          if (num >= 0 && num < MAX_SAFE_INTEGER) {
	            return num
	          }
	        }
	        return id
	      });
	    }

	    this.build = m[5] ? m[5].split('.') : [];
	    this.format();
	  }

	  format () {
	    this.version = `${this.major}.${this.minor}.${this.patch}`;
	    if (this.prerelease.length) {
	      this.version += `-${this.prerelease.join('.')}`;
	    }
	    return this.version
	  }

	  toString () {
	    return this.version
	  }

	  compare (other) {
	    debug('SemVer.compare', this.version, this.options, other);
	    if (!(other instanceof SemVer)) {
	      if (typeof other === 'string' && other === this.version) {
	        return 0
	      }
	      other = new SemVer(other, this.options);
	    }

	    if (other.version === this.version) {
	      return 0
	    }

	    return this.compareMain(other) || this.comparePre(other)
	  }

	  compareMain (other) {
	    if (!(other instanceof SemVer)) {
	      other = new SemVer(other, this.options);
	    }

	    return (
	      compareIdentifiers(this.major, other.major) ||
	      compareIdentifiers(this.minor, other.minor) ||
	      compareIdentifiers(this.patch, other.patch)
	    )
	  }

	  comparePre (other) {
	    if (!(other instanceof SemVer)) {
	      other = new SemVer(other, this.options);
	    }

	    // NOT having a prerelease is > having one
	    if (this.prerelease.length && !other.prerelease.length) {
	      return -1
	    } else if (!this.prerelease.length && other.prerelease.length) {
	      return 1
	    } else if (!this.prerelease.length && !other.prerelease.length) {
	      return 0
	    }

	    let i = 0;
	    do {
	      const a = this.prerelease[i];
	      const b = other.prerelease[i];
	      debug('prerelease compare', i, a, b);
	      if (a === undefined && b === undefined) {
	        return 0
	      } else if (b === undefined) {
	        return 1
	      } else if (a === undefined) {
	        return -1
	      } else if (a === b) {
	        continue
	      } else {
	        return compareIdentifiers(a, b)
	      }
	    } while (++i)
	  }

	  compareBuild (other) {
	    if (!(other instanceof SemVer)) {
	      other = new SemVer(other, this.options);
	    }

	    let i = 0;
	    do {
	      const a = this.build[i];
	      const b = other.build[i];
	      debug('prerelease compare', i, a, b);
	      if (a === undefined && b === undefined) {
	        return 0
	      } else if (b === undefined) {
	        return 1
	      } else if (a === undefined) {
	        return -1
	      } else if (a === b) {
	        continue
	      } else {
	        return compareIdentifiers(a, b)
	      }
	    } while (++i)
	  }

	  // preminor will bump the version up to the next minor release, and immediately
	  // down to pre-release. premajor and prepatch work the same way.
	  inc (release, identifier, identifierBase) {
	    switch (release) {
	      case 'premajor':
	        this.prerelease.length = 0;
	        this.patch = 0;
	        this.minor = 0;
	        this.major++;
	        this.inc('pre', identifier, identifierBase);
	        break
	      case 'preminor':
	        this.prerelease.length = 0;
	        this.patch = 0;
	        this.minor++;
	        this.inc('pre', identifier, identifierBase);
	        break
	      case 'prepatch':
	        // If this is already a prerelease, it will bump to the next version
	        // drop any prereleases that might already exist, since they are not
	        // relevant at this point.
	        this.prerelease.length = 0;
	        this.inc('patch', identifier, identifierBase);
	        this.inc('pre', identifier, identifierBase);
	        break
	      // If the input is a non-prerelease version, this acts the same as
	      // prepatch.
	      case 'prerelease':
	        if (this.prerelease.length === 0) {
	          this.inc('patch', identifier, identifierBase);
	        }
	        this.inc('pre', identifier, identifierBase);
	        break

	      case 'major':
	        // If this is a pre-major version, bump up to the same major version.
	        // Otherwise increment major.
	        // 1.0.0-5 bumps to 1.0.0
	        // 1.1.0 bumps to 2.0.0
	        if (
	          this.minor !== 0 ||
	          this.patch !== 0 ||
	          this.prerelease.length === 0
	        ) {
	          this.major++;
	        }
	        this.minor = 0;
	        this.patch = 0;
	        this.prerelease = [];
	        break
	      case 'minor':
	        // If this is a pre-minor version, bump up to the same minor version.
	        // Otherwise increment minor.
	        // 1.2.0-5 bumps to 1.2.0
	        // 1.2.1 bumps to 1.3.0
	        if (this.patch !== 0 || this.prerelease.length === 0) {
	          this.minor++;
	        }
	        this.patch = 0;
	        this.prerelease = [];
	        break
	      case 'patch':
	        // If this is not a pre-release version, it will increment the patch.
	        // If it is a pre-release it will bump up to the same patch version.
	        // 1.2.0-5 patches to 1.2.0
	        // 1.2.0 patches to 1.2.1
	        if (this.prerelease.length === 0) {
	          this.patch++;
	        }
	        this.prerelease = [];
	        break
	      // This probably shouldn't be used publicly.
	      // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
	      case 'pre': {
	        const base = Number(identifierBase) ? 1 : 0;

	        if (!identifier && identifierBase === false) {
	          throw new Error('invalid increment argument: identifier is empty')
	        }

	        if (this.prerelease.length === 0) {
	          this.prerelease = [base];
	        } else {
	          let i = this.prerelease.length;
	          while (--i >= 0) {
	            if (typeof this.prerelease[i] === 'number') {
	              this.prerelease[i]++;
	              i = -2;
	            }
	          }
	          if (i === -1) {
	            // didn't increment anything
	            if (identifier === this.prerelease.join('.') && identifierBase === false) {
	              throw new Error('invalid increment argument: identifier already exists')
	            }
	            this.prerelease.push(base);
	          }
	        }
	        if (identifier) {
	          // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
	          // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
	          let prerelease = [identifier, base];
	          if (identifierBase === false) {
	            prerelease = [identifier];
	          }
	          if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
	            if (isNaN(this.prerelease[1])) {
	              this.prerelease = prerelease;
	            }
	          } else {
	            this.prerelease = prerelease;
	          }
	        }
	        break
	      }
	      default:
	        throw new Error(`invalid increment argument: ${release}`)
	    }
	    this.raw = this.format();
	    if (this.build.length) {
	      this.raw += `+${this.build.join('.')}`;
	    }
	    return this
	  }
	}

	semver$1 = SemVer;
	return semver$1;
}

var parse_1;
var hasRequiredParse;

function requireParse () {
	if (hasRequiredParse) return parse_1;
	hasRequiredParse = 1;
	const SemVer = requireSemver$1();
	const parse = (version, options, throwErrors = false) => {
	  if (version instanceof SemVer) {
	    return version
	  }
	  try {
	    return new SemVer(version, options)
	  } catch (er) {
	    if (!throwErrors) {
	      return null
	    }
	    throw er
	  }
	};

	parse_1 = parse;
	return parse_1;
}

var valid_1;
var hasRequiredValid$1;

function requireValid$1 () {
	if (hasRequiredValid$1) return valid_1;
	hasRequiredValid$1 = 1;
	const parse = requireParse();
	const valid = (version, options) => {
	  const v = parse(version, options);
	  return v ? v.version : null
	};
	valid_1 = valid;
	return valid_1;
}

var clean_1;
var hasRequiredClean;

function requireClean () {
	if (hasRequiredClean) return clean_1;
	hasRequiredClean = 1;
	const parse = requireParse();
	const clean = (version, options) => {
	  const s = parse(version.trim().replace(/^[=v]+/, ''), options);
	  return s ? s.version : null
	};
	clean_1 = clean;
	return clean_1;
}

var inc_1;
var hasRequiredInc;

function requireInc () {
	if (hasRequiredInc) return inc_1;
	hasRequiredInc = 1;
	const SemVer = requireSemver$1();

	const inc = (version, release, options, identifier, identifierBase) => {
	  if (typeof (options) === 'string') {
	    identifierBase = identifier;
	    identifier = options;
	    options = undefined;
	  }

	  try {
	    return new SemVer(
	      version instanceof SemVer ? version.version : version,
	      options
	    ).inc(release, identifier, identifierBase).version
	  } catch (er) {
	    return null
	  }
	};
	inc_1 = inc;
	return inc_1;
}

var diff_1;
var hasRequiredDiff;

function requireDiff () {
	if (hasRequiredDiff) return diff_1;
	hasRequiredDiff = 1;
	const parse = requireParse();

	const diff = (version1, version2) => {
	  const v1 = parse(version1, null, true);
	  const v2 = parse(version2, null, true);
	  const comparison = v1.compare(v2);

	  if (comparison === 0) {
	    return null
	  }

	  const v1Higher = comparison > 0;
	  const highVersion = v1Higher ? v1 : v2;
	  const lowVersion = v1Higher ? v2 : v1;
	  const highHasPre = !!highVersion.prerelease.length;
	  const lowHasPre = !!lowVersion.prerelease.length;

	  if (lowHasPre && !highHasPre) {
	    // Going from prerelease -> no prerelease requires some special casing

	    // If the low version has only a major, then it will always be a major
	    // Some examples:
	    // 1.0.0-1 -> 1.0.0
	    // 1.0.0-1 -> 1.1.1
	    // 1.0.0-1 -> 2.0.0
	    if (!lowVersion.patch && !lowVersion.minor) {
	      return 'major'
	    }

	    // Otherwise it can be determined by checking the high version

	    if (highVersion.patch) {
	      // anything higher than a patch bump would result in the wrong version
	      return 'patch'
	    }

	    if (highVersion.minor) {
	      // anything higher than a minor bump would result in the wrong version
	      return 'minor'
	    }

	    // bumping major/minor/patch all have same result
	    return 'major'
	  }

	  // add the `pre` prefix if we are going to a prerelease version
	  const prefix = highHasPre ? 'pre' : '';

	  if (v1.major !== v2.major) {
	    return prefix + 'major'
	  }

	  if (v1.minor !== v2.minor) {
	    return prefix + 'minor'
	  }

	  if (v1.patch !== v2.patch) {
	    return prefix + 'patch'
	  }

	  // high and low are preleases
	  return 'prerelease'
	};

	diff_1 = diff;
	return diff_1;
}

var major_1;
var hasRequiredMajor;

function requireMajor () {
	if (hasRequiredMajor) return major_1;
	hasRequiredMajor = 1;
	const SemVer = requireSemver$1();
	const major = (a, loose) => new SemVer(a, loose).major;
	major_1 = major;
	return major_1;
}

var minor_1;
var hasRequiredMinor;

function requireMinor () {
	if (hasRequiredMinor) return minor_1;
	hasRequiredMinor = 1;
	const SemVer = requireSemver$1();
	const minor = (a, loose) => new SemVer(a, loose).minor;
	minor_1 = minor;
	return minor_1;
}

var patch_1;
var hasRequiredPatch;

function requirePatch () {
	if (hasRequiredPatch) return patch_1;
	hasRequiredPatch = 1;
	const SemVer = requireSemver$1();
	const patch = (a, loose) => new SemVer(a, loose).patch;
	patch_1 = patch;
	return patch_1;
}

var prerelease_1;
var hasRequiredPrerelease;

function requirePrerelease () {
	if (hasRequiredPrerelease) return prerelease_1;
	hasRequiredPrerelease = 1;
	const parse = requireParse();
	const prerelease = (version, options) => {
	  const parsed = parse(version, options);
	  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
	};
	prerelease_1 = prerelease;
	return prerelease_1;
}

var compare_1;
var hasRequiredCompare;

function requireCompare () {
	if (hasRequiredCompare) return compare_1;
	hasRequiredCompare = 1;
	const SemVer = requireSemver$1();
	const compare = (a, b, loose) =>
	  new SemVer(a, loose).compare(new SemVer(b, loose));

	compare_1 = compare;
	return compare_1;
}

var rcompare_1;
var hasRequiredRcompare;

function requireRcompare () {
	if (hasRequiredRcompare) return rcompare_1;
	hasRequiredRcompare = 1;
	const compare = requireCompare();
	const rcompare = (a, b, loose) => compare(b, a, loose);
	rcompare_1 = rcompare;
	return rcompare_1;
}

var compareLoose_1;
var hasRequiredCompareLoose;

function requireCompareLoose () {
	if (hasRequiredCompareLoose) return compareLoose_1;
	hasRequiredCompareLoose = 1;
	const compare = requireCompare();
	const compareLoose = (a, b) => compare(a, b, true);
	compareLoose_1 = compareLoose;
	return compareLoose_1;
}

var compareBuild_1;
var hasRequiredCompareBuild;

function requireCompareBuild () {
	if (hasRequiredCompareBuild) return compareBuild_1;
	hasRequiredCompareBuild = 1;
	const SemVer = requireSemver$1();
	const compareBuild = (a, b, loose) => {
	  const versionA = new SemVer(a, loose);
	  const versionB = new SemVer(b, loose);
	  return versionA.compare(versionB) || versionA.compareBuild(versionB)
	};
	compareBuild_1 = compareBuild;
	return compareBuild_1;
}

var sort_1;
var hasRequiredSort;

function requireSort () {
	if (hasRequiredSort) return sort_1;
	hasRequiredSort = 1;
	const compareBuild = requireCompareBuild();
	const sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
	sort_1 = sort;
	return sort_1;
}

var rsort_1;
var hasRequiredRsort;

function requireRsort () {
	if (hasRequiredRsort) return rsort_1;
	hasRequiredRsort = 1;
	const compareBuild = requireCompareBuild();
	const rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
	rsort_1 = rsort;
	return rsort_1;
}

var gt_1;
var hasRequiredGt;

function requireGt () {
	if (hasRequiredGt) return gt_1;
	hasRequiredGt = 1;
	const compare = requireCompare();
	const gt = (a, b, loose) => compare(a, b, loose) > 0;
	gt_1 = gt;
	return gt_1;
}

var lt_1;
var hasRequiredLt;

function requireLt () {
	if (hasRequiredLt) return lt_1;
	hasRequiredLt = 1;
	const compare = requireCompare();
	const lt = (a, b, loose) => compare(a, b, loose) < 0;
	lt_1 = lt;
	return lt_1;
}

var eq_1;
var hasRequiredEq;

function requireEq () {
	if (hasRequiredEq) return eq_1;
	hasRequiredEq = 1;
	const compare = requireCompare();
	const eq = (a, b, loose) => compare(a, b, loose) === 0;
	eq_1 = eq;
	return eq_1;
}

var neq_1;
var hasRequiredNeq;

function requireNeq () {
	if (hasRequiredNeq) return neq_1;
	hasRequiredNeq = 1;
	const compare = requireCompare();
	const neq = (a, b, loose) => compare(a, b, loose) !== 0;
	neq_1 = neq;
	return neq_1;
}

var gte_1;
var hasRequiredGte;

function requireGte () {
	if (hasRequiredGte) return gte_1;
	hasRequiredGte = 1;
	const compare = requireCompare();
	const gte = (a, b, loose) => compare(a, b, loose) >= 0;
	gte_1 = gte;
	return gte_1;
}

var lte_1;
var hasRequiredLte;

function requireLte () {
	if (hasRequiredLte) return lte_1;
	hasRequiredLte = 1;
	const compare = requireCompare();
	const lte = (a, b, loose) => compare(a, b, loose) <= 0;
	lte_1 = lte;
	return lte_1;
}

var cmp_1;
var hasRequiredCmp;

function requireCmp () {
	if (hasRequiredCmp) return cmp_1;
	hasRequiredCmp = 1;
	const eq = requireEq();
	const neq = requireNeq();
	const gt = requireGt();
	const gte = requireGte();
	const lt = requireLt();
	const lte = requireLte();

	const cmp = (a, op, b, loose) => {
	  switch (op) {
	    case '===':
	      if (typeof a === 'object') {
	        a = a.version;
	      }
	      if (typeof b === 'object') {
	        b = b.version;
	      }
	      return a === b

	    case '!==':
	      if (typeof a === 'object') {
	        a = a.version;
	      }
	      if (typeof b === 'object') {
	        b = b.version;
	      }
	      return a !== b

	    case '':
	    case '=':
	    case '==':
	      return eq(a, b, loose)

	    case '!=':
	      return neq(a, b, loose)

	    case '>':
	      return gt(a, b, loose)

	    case '>=':
	      return gte(a, b, loose)

	    case '<':
	      return lt(a, b, loose)

	    case '<=':
	      return lte(a, b, loose)

	    default:
	      throw new TypeError(`Invalid operator: ${op}`)
	  }
	};
	cmp_1 = cmp;
	return cmp_1;
}

var coerce_1;
var hasRequiredCoerce;

function requireCoerce () {
	if (hasRequiredCoerce) return coerce_1;
	hasRequiredCoerce = 1;
	const SemVer = requireSemver$1();
	const parse = requireParse();
	const { safeRe: re, t } = requireRe();

	const coerce = (version, options) => {
	  if (version instanceof SemVer) {
	    return version
	  }

	  if (typeof version === 'number') {
	    version = String(version);
	  }

	  if (typeof version !== 'string') {
	    return null
	  }

	  options = options || {};

	  let match = null;
	  if (!options.rtl) {
	    match = version.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE]);
	  } else {
	    // Find the right-most coercible string that does not share
	    // a terminus with a more left-ward coercible string.
	    // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
	    // With includePrerelease option set, '1.2.3.4-rc' wants to coerce '2.3.4-rc', not '2.3.4'
	    //
	    // Walk through the string checking with a /g regexp
	    // Manually set the index so as to pick up overlapping matches.
	    // Stop when we get a match that ends at the string end, since no
	    // coercible string can be more right-ward without the same terminus.
	    const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL];
	    let next;
	    while ((next = coerceRtlRegex.exec(version)) &&
	        (!match || match.index + match[0].length !== version.length)
	    ) {
	      if (!match ||
	            next.index + next[0].length !== match.index + match[0].length) {
	        match = next;
	      }
	      coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
	    }
	    // leave it in a clean state
	    coerceRtlRegex.lastIndex = -1;
	  }

	  if (match === null) {
	    return null
	  }

	  const major = match[2];
	  const minor = match[3] || '0';
	  const patch = match[4] || '0';
	  const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : '';
	  const build = options.includePrerelease && match[6] ? `+${match[6]}` : '';

	  return parse(`${major}.${minor}.${patch}${prerelease}${build}`, options)
	};
	coerce_1 = coerce;
	return coerce_1;
}

var iterator;
var hasRequiredIterator;

function requireIterator () {
	if (hasRequiredIterator) return iterator;
	hasRequiredIterator = 1;
	iterator = function (Yallist) {
	  Yallist.prototype[Symbol.iterator] = function* () {
	    for (let walker = this.head; walker; walker = walker.next) {
	      yield walker.value;
	    }
	  };
	};
	return iterator;
}

var yallist;
var hasRequiredYallist;

function requireYallist () {
	if (hasRequiredYallist) return yallist;
	hasRequiredYallist = 1;
	yallist = Yallist;

	Yallist.Node = Node;
	Yallist.create = Yallist;

	function Yallist (list) {
	  var self = this;
	  if (!(self instanceof Yallist)) {
	    self = new Yallist();
	  }

	  self.tail = null;
	  self.head = null;
	  self.length = 0;

	  if (list && typeof list.forEach === 'function') {
	    list.forEach(function (item) {
	      self.push(item);
	    });
	  } else if (arguments.length > 0) {
	    for (var i = 0, l = arguments.length; i < l; i++) {
	      self.push(arguments[i]);
	    }
	  }

	  return self
	}

	Yallist.prototype.removeNode = function (node) {
	  if (node.list !== this) {
	    throw new Error('removing node which does not belong to this list')
	  }

	  var next = node.next;
	  var prev = node.prev;

	  if (next) {
	    next.prev = prev;
	  }

	  if (prev) {
	    prev.next = next;
	  }

	  if (node === this.head) {
	    this.head = next;
	  }
	  if (node === this.tail) {
	    this.tail = prev;
	  }

	  node.list.length--;
	  node.next = null;
	  node.prev = null;
	  node.list = null;

	  return next
	};

	Yallist.prototype.unshiftNode = function (node) {
	  if (node === this.head) {
	    return
	  }

	  if (node.list) {
	    node.list.removeNode(node);
	  }

	  var head = this.head;
	  node.list = this;
	  node.next = head;
	  if (head) {
	    head.prev = node;
	  }

	  this.head = node;
	  if (!this.tail) {
	    this.tail = node;
	  }
	  this.length++;
	};

	Yallist.prototype.pushNode = function (node) {
	  if (node === this.tail) {
	    return
	  }

	  if (node.list) {
	    node.list.removeNode(node);
	  }

	  var tail = this.tail;
	  node.list = this;
	  node.prev = tail;
	  if (tail) {
	    tail.next = node;
	  }

	  this.tail = node;
	  if (!this.head) {
	    this.head = node;
	  }
	  this.length++;
	};

	Yallist.prototype.push = function () {
	  for (var i = 0, l = arguments.length; i < l; i++) {
	    push(this, arguments[i]);
	  }
	  return this.length
	};

	Yallist.prototype.unshift = function () {
	  for (var i = 0, l = arguments.length; i < l; i++) {
	    unshift(this, arguments[i]);
	  }
	  return this.length
	};

	Yallist.prototype.pop = function () {
	  if (!this.tail) {
	    return undefined
	  }

	  var res = this.tail.value;
	  this.tail = this.tail.prev;
	  if (this.tail) {
	    this.tail.next = null;
	  } else {
	    this.head = null;
	  }
	  this.length--;
	  return res
	};

	Yallist.prototype.shift = function () {
	  if (!this.head) {
	    return undefined
	  }

	  var res = this.head.value;
	  this.head = this.head.next;
	  if (this.head) {
	    this.head.prev = null;
	  } else {
	    this.tail = null;
	  }
	  this.length--;
	  return res
	};

	Yallist.prototype.forEach = function (fn, thisp) {
	  thisp = thisp || this;
	  for (var walker = this.head, i = 0; walker !== null; i++) {
	    fn.call(thisp, walker.value, i, this);
	    walker = walker.next;
	  }
	};

	Yallist.prototype.forEachReverse = function (fn, thisp) {
	  thisp = thisp || this;
	  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
	    fn.call(thisp, walker.value, i, this);
	    walker = walker.prev;
	  }
	};

	Yallist.prototype.get = function (n) {
	  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
	    // abort out of the list early if we hit a cycle
	    walker = walker.next;
	  }
	  if (i === n && walker !== null) {
	    return walker.value
	  }
	};

	Yallist.prototype.getReverse = function (n) {
	  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
	    // abort out of the list early if we hit a cycle
	    walker = walker.prev;
	  }
	  if (i === n && walker !== null) {
	    return walker.value
	  }
	};

	Yallist.prototype.map = function (fn, thisp) {
	  thisp = thisp || this;
	  var res = new Yallist();
	  for (var walker = this.head; walker !== null;) {
	    res.push(fn.call(thisp, walker.value, this));
	    walker = walker.next;
	  }
	  return res
	};

	Yallist.prototype.mapReverse = function (fn, thisp) {
	  thisp = thisp || this;
	  var res = new Yallist();
	  for (var walker = this.tail; walker !== null;) {
	    res.push(fn.call(thisp, walker.value, this));
	    walker = walker.prev;
	  }
	  return res
	};

	Yallist.prototype.reduce = function (fn, initial) {
	  var acc;
	  var walker = this.head;
	  if (arguments.length > 1) {
	    acc = initial;
	  } else if (this.head) {
	    walker = this.head.next;
	    acc = this.head.value;
	  } else {
	    throw new TypeError('Reduce of empty list with no initial value')
	  }

	  for (var i = 0; walker !== null; i++) {
	    acc = fn(acc, walker.value, i);
	    walker = walker.next;
	  }

	  return acc
	};

	Yallist.prototype.reduceReverse = function (fn, initial) {
	  var acc;
	  var walker = this.tail;
	  if (arguments.length > 1) {
	    acc = initial;
	  } else if (this.tail) {
	    walker = this.tail.prev;
	    acc = this.tail.value;
	  } else {
	    throw new TypeError('Reduce of empty list with no initial value')
	  }

	  for (var i = this.length - 1; walker !== null; i--) {
	    acc = fn(acc, walker.value, i);
	    walker = walker.prev;
	  }

	  return acc
	};

	Yallist.prototype.toArray = function () {
	  var arr = new Array(this.length);
	  for (var i = 0, walker = this.head; walker !== null; i++) {
	    arr[i] = walker.value;
	    walker = walker.next;
	  }
	  return arr
	};

	Yallist.prototype.toArrayReverse = function () {
	  var arr = new Array(this.length);
	  for (var i = 0, walker = this.tail; walker !== null; i++) {
	    arr[i] = walker.value;
	    walker = walker.prev;
	  }
	  return arr
	};

	Yallist.prototype.slice = function (from, to) {
	  to = to || this.length;
	  if (to < 0) {
	    to += this.length;
	  }
	  from = from || 0;
	  if (from < 0) {
	    from += this.length;
	  }
	  var ret = new Yallist();
	  if (to < from || to < 0) {
	    return ret
	  }
	  if (from < 0) {
	    from = 0;
	  }
	  if (to > this.length) {
	    to = this.length;
	  }
	  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
	    walker = walker.next;
	  }
	  for (; walker !== null && i < to; i++, walker = walker.next) {
	    ret.push(walker.value);
	  }
	  return ret
	};

	Yallist.prototype.sliceReverse = function (from, to) {
	  to = to || this.length;
	  if (to < 0) {
	    to += this.length;
	  }
	  from = from || 0;
	  if (from < 0) {
	    from += this.length;
	  }
	  var ret = new Yallist();
	  if (to < from || to < 0) {
	    return ret
	  }
	  if (from < 0) {
	    from = 0;
	  }
	  if (to > this.length) {
	    to = this.length;
	  }
	  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
	    walker = walker.prev;
	  }
	  for (; walker !== null && i > from; i--, walker = walker.prev) {
	    ret.push(walker.value);
	  }
	  return ret
	};

	Yallist.prototype.splice = function (start, deleteCount, ...nodes) {
	  if (start > this.length) {
	    start = this.length - 1;
	  }
	  if (start < 0) {
	    start = this.length + start;
	  }

	  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
	    walker = walker.next;
	  }

	  var ret = [];
	  for (var i = 0; walker && i < deleteCount; i++) {
	    ret.push(walker.value);
	    walker = this.removeNode(walker);
	  }
	  if (walker === null) {
	    walker = this.tail;
	  }

	  if (walker !== this.head && walker !== this.tail) {
	    walker = walker.prev;
	  }

	  for (var i = 0; i < nodes.length; i++) {
	    walker = insert(this, walker, nodes[i]);
	  }
	  return ret;
	};

	Yallist.prototype.reverse = function () {
	  var head = this.head;
	  var tail = this.tail;
	  for (var walker = head; walker !== null; walker = walker.prev) {
	    var p = walker.prev;
	    walker.prev = walker.next;
	    walker.next = p;
	  }
	  this.head = tail;
	  this.tail = head;
	  return this
	};

	function insert (self, node, value) {
	  var inserted = node === self.head ?
	    new Node(value, null, node, self) :
	    new Node(value, node, node.next, self);

	  if (inserted.next === null) {
	    self.tail = inserted;
	  }
	  if (inserted.prev === null) {
	    self.head = inserted;
	  }

	  self.length++;

	  return inserted
	}

	function push (self, item) {
	  self.tail = new Node(item, self.tail, null, self);
	  if (!self.head) {
	    self.head = self.tail;
	  }
	  self.length++;
	}

	function unshift (self, item) {
	  self.head = new Node(item, null, self.head, self);
	  if (!self.tail) {
	    self.tail = self.head;
	  }
	  self.length++;
	}

	function Node (value, prev, next, list) {
	  if (!(this instanceof Node)) {
	    return new Node(value, prev, next, list)
	  }

	  this.list = list;
	  this.value = value;

	  if (prev) {
	    prev.next = this;
	    this.prev = prev;
	  } else {
	    this.prev = null;
	  }

	  if (next) {
	    next.prev = this;
	    this.next = next;
	  } else {
	    this.next = null;
	  }
	}

	try {
	  // add if support for Symbol.iterator is present
	  requireIterator()(Yallist);
	} catch (er) {}
	return yallist;
}

var lruCache;
var hasRequiredLruCache;

function requireLruCache () {
	if (hasRequiredLruCache) return lruCache;
	hasRequiredLruCache = 1;

	// A linked list to keep track of recently-used-ness
	const Yallist = requireYallist();

	const MAX = Symbol('max');
	const LENGTH = Symbol('length');
	const LENGTH_CALCULATOR = Symbol('lengthCalculator');
	const ALLOW_STALE = Symbol('allowStale');
	const MAX_AGE = Symbol('maxAge');
	const DISPOSE = Symbol('dispose');
	const NO_DISPOSE_ON_SET = Symbol('noDisposeOnSet');
	const LRU_LIST = Symbol('lruList');
	const CACHE = Symbol('cache');
	const UPDATE_AGE_ON_GET = Symbol('updateAgeOnGet');

	const naiveLength = () => 1;

	// lruList is a yallist where the head is the youngest
	// item, and the tail is the oldest.  the list contains the Hit
	// objects as the entries.
	// Each Hit object has a reference to its Yallist.Node.  This
	// never changes.
	//
	// cache is a Map (or PseudoMap) that matches the keys to
	// the Yallist.Node object.
	class LRUCache {
	  constructor (options) {
	    if (typeof options === 'number')
	      options = { max: options };

	    if (!options)
	      options = {};

	    if (options.max && (typeof options.max !== 'number' || options.max < 0))
	      throw new TypeError('max must be a non-negative number')
	    // Kind of weird to have a default max of Infinity, but oh well.
	    this[MAX] = options.max || Infinity;

	    const lc = options.length || naiveLength;
	    this[LENGTH_CALCULATOR] = (typeof lc !== 'function') ? naiveLength : lc;
	    this[ALLOW_STALE] = options.stale || false;
	    if (options.maxAge && typeof options.maxAge !== 'number')
	      throw new TypeError('maxAge must be a number')
	    this[MAX_AGE] = options.maxAge || 0;
	    this[DISPOSE] = options.dispose;
	    this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
	    this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
	    this.reset();
	  }

	  // resize the cache when the max changes.
	  set max (mL) {
	    if (typeof mL !== 'number' || mL < 0)
	      throw new TypeError('max must be a non-negative number')

	    this[MAX] = mL || Infinity;
	    trim(this);
	  }
	  get max () {
	    return this[MAX]
	  }

	  set allowStale (allowStale) {
	    this[ALLOW_STALE] = !!allowStale;
	  }
	  get allowStale () {
	    return this[ALLOW_STALE]
	  }

	  set maxAge (mA) {
	    if (typeof mA !== 'number')
	      throw new TypeError('maxAge must be a non-negative number')

	    this[MAX_AGE] = mA;
	    trim(this);
	  }
	  get maxAge () {
	    return this[MAX_AGE]
	  }

	  // resize the cache when the lengthCalculator changes.
	  set lengthCalculator (lC) {
	    if (typeof lC !== 'function')
	      lC = naiveLength;

	    if (lC !== this[LENGTH_CALCULATOR]) {
	      this[LENGTH_CALCULATOR] = lC;
	      this[LENGTH] = 0;
	      this[LRU_LIST].forEach(hit => {
	        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
	        this[LENGTH] += hit.length;
	      });
	    }
	    trim(this);
	  }
	  get lengthCalculator () { return this[LENGTH_CALCULATOR] }

	  get length () { return this[LENGTH] }
	  get itemCount () { return this[LRU_LIST].length }

	  rforEach (fn, thisp) {
	    thisp = thisp || this;
	    for (let walker = this[LRU_LIST].tail; walker !== null;) {
	      const prev = walker.prev;
	      forEachStep(this, fn, walker, thisp);
	      walker = prev;
	    }
	  }

	  forEach (fn, thisp) {
	    thisp = thisp || this;
	    for (let walker = this[LRU_LIST].head; walker !== null;) {
	      const next = walker.next;
	      forEachStep(this, fn, walker, thisp);
	      walker = next;
	    }
	  }

	  keys () {
	    return this[LRU_LIST].toArray().map(k => k.key)
	  }

	  values () {
	    return this[LRU_LIST].toArray().map(k => k.value)
	  }

	  reset () {
	    if (this[DISPOSE] &&
	        this[LRU_LIST] &&
	        this[LRU_LIST].length) {
	      this[LRU_LIST].forEach(hit => this[DISPOSE](hit.key, hit.value));
	    }

	    this[CACHE] = new Map(); // hash of items by key
	    this[LRU_LIST] = new Yallist(); // list of items in order of use recency
	    this[LENGTH] = 0; // length of items in the list
	  }

	  dump () {
	    return this[LRU_LIST].map(hit =>
	      isStale(this, hit) ? false : {
	        k: hit.key,
	        v: hit.value,
	        e: hit.now + (hit.maxAge || 0)
	      }).toArray().filter(h => h)
	  }

	  dumpLru () {
	    return this[LRU_LIST]
	  }

	  set (key, value, maxAge) {
	    maxAge = maxAge || this[MAX_AGE];

	    if (maxAge && typeof maxAge !== 'number')
	      throw new TypeError('maxAge must be a number')

	    const now = maxAge ? Date.now() : 0;
	    const len = this[LENGTH_CALCULATOR](value, key);

	    if (this[CACHE].has(key)) {
	      if (len > this[MAX]) {
	        del(this, this[CACHE].get(key));
	        return false
	      }

	      const node = this[CACHE].get(key);
	      const item = node.value;

	      // dispose of the old one before overwriting
	      // split out into 2 ifs for better coverage tracking
	      if (this[DISPOSE]) {
	        if (!this[NO_DISPOSE_ON_SET])
	          this[DISPOSE](key, item.value);
	      }

	      item.now = now;
	      item.maxAge = maxAge;
	      item.value = value;
	      this[LENGTH] += len - item.length;
	      item.length = len;
	      this.get(key);
	      trim(this);
	      return true
	    }

	    const hit = new Entry(key, value, len, now, maxAge);

	    // oversized objects fall out of cache automatically.
	    if (hit.length > this[MAX]) {
	      if (this[DISPOSE])
	        this[DISPOSE](key, value);

	      return false
	    }

	    this[LENGTH] += hit.length;
	    this[LRU_LIST].unshift(hit);
	    this[CACHE].set(key, this[LRU_LIST].head);
	    trim(this);
	    return true
	  }

	  has (key) {
	    if (!this[CACHE].has(key)) return false
	    const hit = this[CACHE].get(key).value;
	    return !isStale(this, hit)
	  }

	  get (key) {
	    return get(this, key, true)
	  }

	  peek (key) {
	    return get(this, key, false)
	  }

	  pop () {
	    const node = this[LRU_LIST].tail;
	    if (!node)
	      return null

	    del(this, node);
	    return node.value
	  }

	  del (key) {
	    del(this, this[CACHE].get(key));
	  }

	  load (arr) {
	    // reset the cache
	    this.reset();

	    const now = Date.now();
	    // A previous serialized cache has the most recent items first
	    for (let l = arr.length - 1; l >= 0; l--) {
	      const hit = arr[l];
	      const expiresAt = hit.e || 0;
	      if (expiresAt === 0)
	        // the item was created without expiration in a non aged cache
	        this.set(hit.k, hit.v);
	      else {
	        const maxAge = expiresAt - now;
	        // dont add already expired items
	        if (maxAge > 0) {
	          this.set(hit.k, hit.v, maxAge);
	        }
	      }
	    }
	  }

	  prune () {
	    this[CACHE].forEach((value, key) => get(this, key, false));
	  }
	}

	const get = (self, key, doUse) => {
	  const node = self[CACHE].get(key);
	  if (node) {
	    const hit = node.value;
	    if (isStale(self, hit)) {
	      del(self, node);
	      if (!self[ALLOW_STALE])
	        return undefined
	    } else {
	      if (doUse) {
	        if (self[UPDATE_AGE_ON_GET])
	          node.value.now = Date.now();
	        self[LRU_LIST].unshiftNode(node);
	      }
	    }
	    return hit.value
	  }
	};

	const isStale = (self, hit) => {
	  if (!hit || (!hit.maxAge && !self[MAX_AGE]))
	    return false

	  const diff = Date.now() - hit.now;
	  return hit.maxAge ? diff > hit.maxAge
	    : self[MAX_AGE] && (diff > self[MAX_AGE])
	};

	const trim = self => {
	  if (self[LENGTH] > self[MAX]) {
	    for (let walker = self[LRU_LIST].tail;
	      self[LENGTH] > self[MAX] && walker !== null;) {
	      // We know that we're about to delete this one, and also
	      // what the next least recently used key will be, so just
	      // go ahead and set it now.
	      const prev = walker.prev;
	      del(self, walker);
	      walker = prev;
	    }
	  }
	};

	const del = (self, node) => {
	  if (node) {
	    const hit = node.value;
	    if (self[DISPOSE])
	      self[DISPOSE](hit.key, hit.value);

	    self[LENGTH] -= hit.length;
	    self[CACHE].delete(hit.key);
	    self[LRU_LIST].removeNode(node);
	  }
	};

	class Entry {
	  constructor (key, value, length, now, maxAge) {
	    this.key = key;
	    this.value = value;
	    this.length = length;
	    this.now = now;
	    this.maxAge = maxAge || 0;
	  }
	}

	const forEachStep = (self, fn, node, thisp) => {
	  let hit = node.value;
	  if (isStale(self, hit)) {
	    del(self, node);
	    if (!self[ALLOW_STALE])
	      hit = undefined;
	  }
	  if (hit)
	    fn.call(thisp, hit.value, hit.key, self);
	};

	lruCache = LRUCache;
	return lruCache;
}

var range;
var hasRequiredRange;

function requireRange () {
	if (hasRequiredRange) return range;
	hasRequiredRange = 1;
	// hoisted class for cyclic dependency
	class Range {
	  constructor (range, options) {
	    options = parseOptions(options);

	    if (range instanceof Range) {
	      if (
	        range.loose === !!options.loose &&
	        range.includePrerelease === !!options.includePrerelease
	      ) {
	        return range
	      } else {
	        return new Range(range.raw, options)
	      }
	    }

	    if (range instanceof Comparator) {
	      // just put it in the set and return
	      this.raw = range.value;
	      this.set = [[range]];
	      this.format();
	      return this
	    }

	    this.options = options;
	    this.loose = !!options.loose;
	    this.includePrerelease = !!options.includePrerelease;

	    // First reduce all whitespace as much as possible so we do not have to rely
	    // on potentially slow regexes like \s*. This is then stored and used for
	    // future error messages as well.
	    this.raw = range
	      .trim()
	      .split(/\s+/)
	      .join(' ');

	    // First, split on ||
	    this.set = this.raw
	      .split('||')
	      // map the range to a 2d array of comparators
	      .map(r => this.parseRange(r.trim()))
	      // throw out any comparator lists that are empty
	      // this generally means that it was not a valid range, which is allowed
	      // in loose mode, but will still throw if the WHOLE range is invalid.
	      .filter(c => c.length);

	    if (!this.set.length) {
	      throw new TypeError(`Invalid SemVer Range: ${this.raw}`)
	    }

	    // if we have any that are not the null set, throw out null sets.
	    if (this.set.length > 1) {
	      // keep the first one, in case they're all null sets
	      const first = this.set[0];
	      this.set = this.set.filter(c => !isNullSet(c[0]));
	      if (this.set.length === 0) {
	        this.set = [first];
	      } else if (this.set.length > 1) {
	        // if we have any that are *, then the range is just *
	        for (const c of this.set) {
	          if (c.length === 1 && isAny(c[0])) {
	            this.set = [c];
	            break
	          }
	        }
	      }
	    }

	    this.format();
	  }

	  format () {
	    this.range = this.set
	      .map((comps) => comps.join(' ').trim())
	      .join('||')
	      .trim();
	    return this.range
	  }

	  toString () {
	    return this.range
	  }

	  parseRange (range) {
	    // memoize range parsing for performance.
	    // this is a very hot path, and fully deterministic.
	    const memoOpts =
	      (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) |
	      (this.options.loose && FLAG_LOOSE);
	    const memoKey = memoOpts + ':' + range;
	    const cached = cache.get(memoKey);
	    if (cached) {
	      return cached
	    }

	    const loose = this.options.loose;
	    // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
	    const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
	    range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
	    debug('hyphen replace', range);

	    // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
	    range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
	    debug('comparator trim', range);

	    // `~ 1.2.3` => `~1.2.3`
	    range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
	    debug('tilde trim', range);

	    // `^ 1.2.3` => `^1.2.3`
	    range = range.replace(re[t.CARETTRIM], caretTrimReplace);
	    debug('caret trim', range);

	    // At this point, the range is completely trimmed and
	    // ready to be split into comparators.

	    let rangeList = range
	      .split(' ')
	      .map(comp => parseComparator(comp, this.options))
	      .join(' ')
	      .split(/\s+/)
	      // >=0.0.0 is equivalent to *
	      .map(comp => replaceGTE0(comp, this.options));

	    if (loose) {
	      // in loose mode, throw out any that are not valid comparators
	      rangeList = rangeList.filter(comp => {
	        debug('loose invalid filter', comp, this.options);
	        return !!comp.match(re[t.COMPARATORLOOSE])
	      });
	    }
	    debug('range list', rangeList);

	    // if any comparators are the null set, then replace with JUST null set
	    // if more than one comparator, remove any * comparators
	    // also, don't include the same comparator more than once
	    const rangeMap = new Map();
	    const comparators = rangeList.map(comp => new Comparator(comp, this.options));
	    for (const comp of comparators) {
	      if (isNullSet(comp)) {
	        return [comp]
	      }
	      rangeMap.set(comp.value, comp);
	    }
	    if (rangeMap.size > 1 && rangeMap.has('')) {
	      rangeMap.delete('');
	    }

	    const result = [...rangeMap.values()];
	    cache.set(memoKey, result);
	    return result
	  }

	  intersects (range, options) {
	    if (!(range instanceof Range)) {
	      throw new TypeError('a Range is required')
	    }

	    return this.set.some((thisComparators) => {
	      return (
	        isSatisfiable(thisComparators, options) &&
	        range.set.some((rangeComparators) => {
	          return (
	            isSatisfiable(rangeComparators, options) &&
	            thisComparators.every((thisComparator) => {
	              return rangeComparators.every((rangeComparator) => {
	                return thisComparator.intersects(rangeComparator, options)
	              })
	            })
	          )
	        })
	      )
	    })
	  }

	  // if ANY of the sets match ALL of its comparators, then pass
	  test (version) {
	    if (!version) {
	      return false
	    }

	    if (typeof version === 'string') {
	      try {
	        version = new SemVer(version, this.options);
	      } catch (er) {
	        return false
	      }
	    }

	    for (let i = 0; i < this.set.length; i++) {
	      if (testSet(this.set[i], version, this.options)) {
	        return true
	      }
	    }
	    return false
	  }
	}

	range = Range;

	const LRU = requireLruCache();
	const cache = new LRU({ max: 1000 });

	const parseOptions = requireParseOptions();
	const Comparator = requireComparator();
	const debug = requireDebug();
	const SemVer = requireSemver$1();
	const {
	  safeRe: re,
	  t,
	  comparatorTrimReplace,
	  tildeTrimReplace,
	  caretTrimReplace,
	} = requireRe();
	const { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = requireConstants();

	const isNullSet = c => c.value === '<0.0.0-0';
	const isAny = c => c.value === '';

	// take a set of comparators and determine whether there
	// exists a version which can satisfy it
	const isSatisfiable = (comparators, options) => {
	  let result = true;
	  const remainingComparators = comparators.slice();
	  let testComparator = remainingComparators.pop();

	  while (result && remainingComparators.length) {
	    result = remainingComparators.every((otherComparator) => {
	      return testComparator.intersects(otherComparator, options)
	    });

	    testComparator = remainingComparators.pop();
	  }

	  return result
	};

	// comprised of xranges, tildes, stars, and gtlt's at this point.
	// already replaced the hyphen ranges
	// turn into a set of JUST comparators.
	const parseComparator = (comp, options) => {
	  debug('comp', comp, options);
	  comp = replaceCarets(comp, options);
	  debug('caret', comp);
	  comp = replaceTildes(comp, options);
	  debug('tildes', comp);
	  comp = replaceXRanges(comp, options);
	  debug('xrange', comp);
	  comp = replaceStars(comp, options);
	  debug('stars', comp);
	  return comp
	};

	const isX = id => !id || id.toLowerCase() === 'x' || id === '*';

	// ~, ~> --> * (any, kinda silly)
	// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
	// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
	// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
	// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
	// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0
	// ~0.0.1 --> >=0.0.1 <0.1.0-0
	const replaceTildes = (comp, options) => {
	  return comp
	    .trim()
	    .split(/\s+/)
	    .map((c) => replaceTilde(c, options))
	    .join(' ')
	};

	const replaceTilde = (comp, options) => {
	  const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
	  return comp.replace(r, (_, M, m, p, pr) => {
	    debug('tilde', comp, _, M, m, p, pr);
	    let ret;

	    if (isX(M)) {
	      ret = '';
	    } else if (isX(m)) {
	      ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
	    } else if (isX(p)) {
	      // ~1.2 == >=1.2.0 <1.3.0-0
	      ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
	    } else if (pr) {
	      debug('replaceTilde pr', pr);
	      ret = `>=${M}.${m}.${p}-${pr
	      } <${M}.${+m + 1}.0-0`;
	    } else {
	      // ~1.2.3 == >=1.2.3 <1.3.0-0
	      ret = `>=${M}.${m}.${p
	      } <${M}.${+m + 1}.0-0`;
	    }

	    debug('tilde return', ret);
	    return ret
	  })
	};

	// ^ --> * (any, kinda silly)
	// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
	// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
	// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
	// ^1.2.3 --> >=1.2.3 <2.0.0-0
	// ^1.2.0 --> >=1.2.0 <2.0.0-0
	// ^0.0.1 --> >=0.0.1 <0.0.2-0
	// ^0.1.0 --> >=0.1.0 <0.2.0-0
	const replaceCarets = (comp, options) => {
	  return comp
	    .trim()
	    .split(/\s+/)
	    .map((c) => replaceCaret(c, options))
	    .join(' ')
	};

	const replaceCaret = (comp, options) => {
	  debug('caret', comp, options);
	  const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
	  const z = options.includePrerelease ? '-0' : '';
	  return comp.replace(r, (_, M, m, p, pr) => {
	    debug('caret', comp, _, M, m, p, pr);
	    let ret;

	    if (isX(M)) {
	      ret = '';
	    } else if (isX(m)) {
	      ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
	    } else if (isX(p)) {
	      if (M === '0') {
	        ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
	      } else {
	        ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
	      }
	    } else if (pr) {
	      debug('replaceCaret pr', pr);
	      if (M === '0') {
	        if (m === '0') {
	          ret = `>=${M}.${m}.${p}-${pr
	          } <${M}.${m}.${+p + 1}-0`;
	        } else {
	          ret = `>=${M}.${m}.${p}-${pr
	          } <${M}.${+m + 1}.0-0`;
	        }
	      } else {
	        ret = `>=${M}.${m}.${p}-${pr
	        } <${+M + 1}.0.0-0`;
	      }
	    } else {
	      debug('no pr');
	      if (M === '0') {
	        if (m === '0') {
	          ret = `>=${M}.${m}.${p
	          }${z} <${M}.${m}.${+p + 1}-0`;
	        } else {
	          ret = `>=${M}.${m}.${p
	          }${z} <${M}.${+m + 1}.0-0`;
	        }
	      } else {
	        ret = `>=${M}.${m}.${p
	        } <${+M + 1}.0.0-0`;
	      }
	    }

	    debug('caret return', ret);
	    return ret
	  })
	};

	const replaceXRanges = (comp, options) => {
	  debug('replaceXRanges', comp, options);
	  return comp
	    .split(/\s+/)
	    .map((c) => replaceXRange(c, options))
	    .join(' ')
	};

	const replaceXRange = (comp, options) => {
	  comp = comp.trim();
	  const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
	  return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
	    debug('xRange', comp, ret, gtlt, M, m, p, pr);
	    const xM = isX(M);
	    const xm = xM || isX(m);
	    const xp = xm || isX(p);
	    const anyX = xp;

	    if (gtlt === '=' && anyX) {
	      gtlt = '';
	    }

	    // if we're including prereleases in the match, then we need
	    // to fix this to -0, the lowest possible prerelease value
	    pr = options.includePrerelease ? '-0' : '';

	    if (xM) {
	      if (gtlt === '>' || gtlt === '<') {
	        // nothing is allowed
	        ret = '<0.0.0-0';
	      } else {
	        // nothing is forbidden
	        ret = '*';
	      }
	    } else if (gtlt && anyX) {
	      // we know patch is an x, because we have any x at all.
	      // replace X with 0
	      if (xm) {
	        m = 0;
	      }
	      p = 0;

	      if (gtlt === '>') {
	        // >1 => >=2.0.0
	        // >1.2 => >=1.3.0
	        gtlt = '>=';
	        if (xm) {
	          M = +M + 1;
	          m = 0;
	          p = 0;
	        } else {
	          m = +m + 1;
	          p = 0;
	        }
	      } else if (gtlt === '<=') {
	        // <=0.7.x is actually <0.8.0, since any 0.7.x should
	        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
	        gtlt = '<';
	        if (xm) {
	          M = +M + 1;
	        } else {
	          m = +m + 1;
	        }
	      }

	      if (gtlt === '<') {
	        pr = '-0';
	      }

	      ret = `${gtlt + M}.${m}.${p}${pr}`;
	    } else if (xm) {
	      ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
	    } else if (xp) {
	      ret = `>=${M}.${m}.0${pr
	      } <${M}.${+m + 1}.0-0`;
	    }

	    debug('xRange return', ret);

	    return ret
	  })
	};

	// Because * is AND-ed with everything else in the comparator,
	// and '' means "any version", just remove the *s entirely.
	const replaceStars = (comp, options) => {
	  debug('replaceStars', comp, options);
	  // Looseness is ignored here.  star is always as loose as it gets!
	  return comp
	    .trim()
	    .replace(re[t.STAR], '')
	};

	const replaceGTE0 = (comp, options) => {
	  debug('replaceGTE0', comp, options);
	  return comp
	    .trim()
	    .replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], '')
	};

	// This function is passed to string.replace(re[t.HYPHENRANGE])
	// M, m, patch, prerelease, build
	// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
	// 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
	// 1.2 - 3.4 => >=1.2.0 <3.5.0-0
	const hyphenReplace = incPr => ($0,
	  from, fM, fm, fp, fpr, fb,
	  to, tM, tm, tp, tpr, tb) => {
	  if (isX(fM)) {
	    from = '';
	  } else if (isX(fm)) {
	    from = `>=${fM}.0.0${incPr ? '-0' : ''}`;
	  } else if (isX(fp)) {
	    from = `>=${fM}.${fm}.0${incPr ? '-0' : ''}`;
	  } else if (fpr) {
	    from = `>=${from}`;
	  } else {
	    from = `>=${from}${incPr ? '-0' : ''}`;
	  }

	  if (isX(tM)) {
	    to = '';
	  } else if (isX(tm)) {
	    to = `<${+tM + 1}.0.0-0`;
	  } else if (isX(tp)) {
	    to = `<${tM}.${+tm + 1}.0-0`;
	  } else if (tpr) {
	    to = `<=${tM}.${tm}.${tp}-${tpr}`;
	  } else if (incPr) {
	    to = `<${tM}.${tm}.${+tp + 1}-0`;
	  } else {
	    to = `<=${to}`;
	  }

	  return `${from} ${to}`.trim()
	};

	const testSet = (set, version, options) => {
	  for (let i = 0; i < set.length; i++) {
	    if (!set[i].test(version)) {
	      return false
	    }
	  }

	  if (version.prerelease.length && !options.includePrerelease) {
	    // Find the set of versions that are allowed to have prereleases
	    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
	    // That should allow `1.2.3-pr.2` to pass.
	    // However, `1.2.4-alpha.notready` should NOT be allowed,
	    // even though it's within the range set by the comparators.
	    for (let i = 0; i < set.length; i++) {
	      debug(set[i].semver);
	      if (set[i].semver === Comparator.ANY) {
	        continue
	      }

	      if (set[i].semver.prerelease.length > 0) {
	        const allowed = set[i].semver;
	        if (allowed.major === version.major &&
	            allowed.minor === version.minor &&
	            allowed.patch === version.patch) {
	          return true
	        }
	      }
	    }

	    // Version has a -pre, but it's not one of the ones we like.
	    return false
	  }

	  return true
	};
	return range;
}

var comparator;
var hasRequiredComparator;

function requireComparator () {
	if (hasRequiredComparator) return comparator;
	hasRequiredComparator = 1;
	const ANY = Symbol('SemVer ANY');
	// hoisted class for cyclic dependency
	class Comparator {
	  static get ANY () {
	    return ANY
	  }

	  constructor (comp, options) {
	    options = parseOptions(options);

	    if (comp instanceof Comparator) {
	      if (comp.loose === !!options.loose) {
	        return comp
	      } else {
	        comp = comp.value;
	      }
	    }

	    comp = comp.trim().split(/\s+/).join(' ');
	    debug('comparator', comp, options);
	    this.options = options;
	    this.loose = !!options.loose;
	    this.parse(comp);

	    if (this.semver === ANY) {
	      this.value = '';
	    } else {
	      this.value = this.operator + this.semver.version;
	    }

	    debug('comp', this);
	  }

	  parse (comp) {
	    const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
	    const m = comp.match(r);

	    if (!m) {
	      throw new TypeError(`Invalid comparator: ${comp}`)
	    }

	    this.operator = m[1] !== undefined ? m[1] : '';
	    if (this.operator === '=') {
	      this.operator = '';
	    }

	    // if it literally is just '>' or '' then allow anything.
	    if (!m[2]) {
	      this.semver = ANY;
	    } else {
	      this.semver = new SemVer(m[2], this.options.loose);
	    }
	  }

	  toString () {
	    return this.value
	  }

	  test (version) {
	    debug('Comparator.test', version, this.options.loose);

	    if (this.semver === ANY || version === ANY) {
	      return true
	    }

	    if (typeof version === 'string') {
	      try {
	        version = new SemVer(version, this.options);
	      } catch (er) {
	        return false
	      }
	    }

	    return cmp(version, this.operator, this.semver, this.options)
	  }

	  intersects (comp, options) {
	    if (!(comp instanceof Comparator)) {
	      throw new TypeError('a Comparator is required')
	    }

	    if (this.operator === '') {
	      if (this.value === '') {
	        return true
	      }
	      return new Range(comp.value, options).test(this.value)
	    } else if (comp.operator === '') {
	      if (comp.value === '') {
	        return true
	      }
	      return new Range(this.value, options).test(comp.semver)
	    }

	    options = parseOptions(options);

	    // Special cases where nothing can possibly be lower
	    if (options.includePrerelease &&
	      (this.value === '<0.0.0-0' || comp.value === '<0.0.0-0')) {
	      return false
	    }
	    if (!options.includePrerelease &&
	      (this.value.startsWith('<0.0.0') || comp.value.startsWith('<0.0.0'))) {
	      return false
	    }

	    // Same direction increasing (> or >=)
	    if (this.operator.startsWith('>') && comp.operator.startsWith('>')) {
	      return true
	    }
	    // Same direction decreasing (< or <=)
	    if (this.operator.startsWith('<') && comp.operator.startsWith('<')) {
	      return true
	    }
	    // same SemVer and both sides are inclusive (<= or >=)
	    if (
	      (this.semver.version === comp.semver.version) &&
	      this.operator.includes('=') && comp.operator.includes('=')) {
	      return true
	    }
	    // opposite directions less than
	    if (cmp(this.semver, '<', comp.semver, options) &&
	      this.operator.startsWith('>') && comp.operator.startsWith('<')) {
	      return true
	    }
	    // opposite directions greater than
	    if (cmp(this.semver, '>', comp.semver, options) &&
	      this.operator.startsWith('<') && comp.operator.startsWith('>')) {
	      return true
	    }
	    return false
	  }
	}

	comparator = Comparator;

	const parseOptions = requireParseOptions();
	const { safeRe: re, t } = requireRe();
	const cmp = requireCmp();
	const debug = requireDebug();
	const SemVer = requireSemver$1();
	const Range = requireRange();
	return comparator;
}

var satisfies_1;
var hasRequiredSatisfies;

function requireSatisfies () {
	if (hasRequiredSatisfies) return satisfies_1;
	hasRequiredSatisfies = 1;
	const Range = requireRange();
	const satisfies = (version, range, options) => {
	  try {
	    range = new Range(range, options);
	  } catch (er) {
	    return false
	  }
	  return range.test(version)
	};
	satisfies_1 = satisfies;
	return satisfies_1;
}

var toComparators_1;
var hasRequiredToComparators;

function requireToComparators () {
	if (hasRequiredToComparators) return toComparators_1;
	hasRequiredToComparators = 1;
	const Range = requireRange();

	// Mostly just for testing and legacy API reasons
	const toComparators = (range, options) =>
	  new Range(range, options).set
	    .map(comp => comp.map(c => c.value).join(' ').trim().split(' '));

	toComparators_1 = toComparators;
	return toComparators_1;
}

var maxSatisfying_1;
var hasRequiredMaxSatisfying;

function requireMaxSatisfying () {
	if (hasRequiredMaxSatisfying) return maxSatisfying_1;
	hasRequiredMaxSatisfying = 1;
	const SemVer = requireSemver$1();
	const Range = requireRange();

	const maxSatisfying = (versions, range, options) => {
	  let max = null;
	  let maxSV = null;
	  let rangeObj = null;
	  try {
	    rangeObj = new Range(range, options);
	  } catch (er) {
	    return null
	  }
	  versions.forEach((v) => {
	    if (rangeObj.test(v)) {
	      // satisfies(v, range, options)
	      if (!max || maxSV.compare(v) === -1) {
	        // compare(max, v, true)
	        max = v;
	        maxSV = new SemVer(max, options);
	      }
	    }
	  });
	  return max
	};
	maxSatisfying_1 = maxSatisfying;
	return maxSatisfying_1;
}

var minSatisfying_1;
var hasRequiredMinSatisfying;

function requireMinSatisfying () {
	if (hasRequiredMinSatisfying) return minSatisfying_1;
	hasRequiredMinSatisfying = 1;
	const SemVer = requireSemver$1();
	const Range = requireRange();
	const minSatisfying = (versions, range, options) => {
	  let min = null;
	  let minSV = null;
	  let rangeObj = null;
	  try {
	    rangeObj = new Range(range, options);
	  } catch (er) {
	    return null
	  }
	  versions.forEach((v) => {
	    if (rangeObj.test(v)) {
	      // satisfies(v, range, options)
	      if (!min || minSV.compare(v) === 1) {
	        // compare(min, v, true)
	        min = v;
	        minSV = new SemVer(min, options);
	      }
	    }
	  });
	  return min
	};
	minSatisfying_1 = minSatisfying;
	return minSatisfying_1;
}

var minVersion_1;
var hasRequiredMinVersion;

function requireMinVersion () {
	if (hasRequiredMinVersion) return minVersion_1;
	hasRequiredMinVersion = 1;
	const SemVer = requireSemver$1();
	const Range = requireRange();
	const gt = requireGt();

	const minVersion = (range, loose) => {
	  range = new Range(range, loose);

	  let minver = new SemVer('0.0.0');
	  if (range.test(minver)) {
	    return minver
	  }

	  minver = new SemVer('0.0.0-0');
	  if (range.test(minver)) {
	    return minver
	  }

	  minver = null;
	  for (let i = 0; i < range.set.length; ++i) {
	    const comparators = range.set[i];

	    let setMin = null;
	    comparators.forEach((comparator) => {
	      // Clone to avoid manipulating the comparator's semver object.
	      const compver = new SemVer(comparator.semver.version);
	      switch (comparator.operator) {
	        case '>':
	          if (compver.prerelease.length === 0) {
	            compver.patch++;
	          } else {
	            compver.prerelease.push(0);
	          }
	          compver.raw = compver.format();
	          /* fallthrough */
	        case '':
	        case '>=':
	          if (!setMin || gt(compver, setMin)) {
	            setMin = compver;
	          }
	          break
	        case '<':
	        case '<=':
	          /* Ignore maximum versions */
	          break
	        /* istanbul ignore next */
	        default:
	          throw new Error(`Unexpected operation: ${comparator.operator}`)
	      }
	    });
	    if (setMin && (!minver || gt(minver, setMin))) {
	      minver = setMin;
	    }
	  }

	  if (minver && range.test(minver)) {
	    return minver
	  }

	  return null
	};
	minVersion_1 = minVersion;
	return minVersion_1;
}

var valid;
var hasRequiredValid;

function requireValid () {
	if (hasRequiredValid) return valid;
	hasRequiredValid = 1;
	const Range = requireRange();
	const validRange = (range, options) => {
	  try {
	    // Return '*' instead of '' so that truthiness works.
	    // This will throw if it's invalid anyway
	    return new Range(range, options).range || '*'
	  } catch (er) {
	    return null
	  }
	};
	valid = validRange;
	return valid;
}

var outside_1;
var hasRequiredOutside;

function requireOutside () {
	if (hasRequiredOutside) return outside_1;
	hasRequiredOutside = 1;
	const SemVer = requireSemver$1();
	const Comparator = requireComparator();
	const { ANY } = Comparator;
	const Range = requireRange();
	const satisfies = requireSatisfies();
	const gt = requireGt();
	const lt = requireLt();
	const lte = requireLte();
	const gte = requireGte();

	const outside = (version, range, hilo, options) => {
	  version = new SemVer(version, options);
	  range = new Range(range, options);

	  let gtfn, ltefn, ltfn, comp, ecomp;
	  switch (hilo) {
	    case '>':
	      gtfn = gt;
	      ltefn = lte;
	      ltfn = lt;
	      comp = '>';
	      ecomp = '>=';
	      break
	    case '<':
	      gtfn = lt;
	      ltefn = gte;
	      ltfn = gt;
	      comp = '<';
	      ecomp = '<=';
	      break
	    default:
	      throw new TypeError('Must provide a hilo val of "<" or ">"')
	  }

	  // If it satisfies the range it is not outside
	  if (satisfies(version, range, options)) {
	    return false
	  }

	  // From now on, variable terms are as if we're in "gtr" mode.
	  // but note that everything is flipped for the "ltr" function.

	  for (let i = 0; i < range.set.length; ++i) {
	    const comparators = range.set[i];

	    let high = null;
	    let low = null;

	    comparators.forEach((comparator) => {
	      if (comparator.semver === ANY) {
	        comparator = new Comparator('>=0.0.0');
	      }
	      high = high || comparator;
	      low = low || comparator;
	      if (gtfn(comparator.semver, high.semver, options)) {
	        high = comparator;
	      } else if (ltfn(comparator.semver, low.semver, options)) {
	        low = comparator;
	      }
	    });

	    // If the edge version comparator has a operator then our version
	    // isn't outside it
	    if (high.operator === comp || high.operator === ecomp) {
	      return false
	    }

	    // If the lowest version comparator has an operator and our version
	    // is less than it then it isn't higher than the range
	    if ((!low.operator || low.operator === comp) &&
	        ltefn(version, low.semver)) {
	      return false
	    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
	      return false
	    }
	  }
	  return true
	};

	outside_1 = outside;
	return outside_1;
}

var gtr_1;
var hasRequiredGtr;

function requireGtr () {
	if (hasRequiredGtr) return gtr_1;
	hasRequiredGtr = 1;
	// Determine if version is greater than all the versions possible in the range.
	const outside = requireOutside();
	const gtr = (version, range, options) => outside(version, range, '>', options);
	gtr_1 = gtr;
	return gtr_1;
}

var ltr_1;
var hasRequiredLtr;

function requireLtr () {
	if (hasRequiredLtr) return ltr_1;
	hasRequiredLtr = 1;
	const outside = requireOutside();
	// Determine if version is less than all the versions possible in the range
	const ltr = (version, range, options) => outside(version, range, '<', options);
	ltr_1 = ltr;
	return ltr_1;
}

var intersects_1;
var hasRequiredIntersects;

function requireIntersects () {
	if (hasRequiredIntersects) return intersects_1;
	hasRequiredIntersects = 1;
	const Range = requireRange();
	const intersects = (r1, r2, options) => {
	  r1 = new Range(r1, options);
	  r2 = new Range(r2, options);
	  return r1.intersects(r2, options)
	};
	intersects_1 = intersects;
	return intersects_1;
}

var simplify;
var hasRequiredSimplify;

function requireSimplify () {
	if (hasRequiredSimplify) return simplify;
	hasRequiredSimplify = 1;
	// given a set of versions and a range, create a "simplified" range
	// that includes the same versions that the original range does
	// If the original range is shorter than the simplified one, return that.
	const satisfies = requireSatisfies();
	const compare = requireCompare();
	simplify = (versions, range, options) => {
	  const set = [];
	  let first = null;
	  let prev = null;
	  const v = versions.sort((a, b) => compare(a, b, options));
	  for (const version of v) {
	    const included = satisfies(version, range, options);
	    if (included) {
	      prev = version;
	      if (!first) {
	        first = version;
	      }
	    } else {
	      if (prev) {
	        set.push([first, prev]);
	      }
	      prev = null;
	      first = null;
	    }
	  }
	  if (first) {
	    set.push([first, null]);
	  }

	  const ranges = [];
	  for (const [min, max] of set) {
	    if (min === max) {
	      ranges.push(min);
	    } else if (!max && min === v[0]) {
	      ranges.push('*');
	    } else if (!max) {
	      ranges.push(`>=${min}`);
	    } else if (min === v[0]) {
	      ranges.push(`<=${max}`);
	    } else {
	      ranges.push(`${min} - ${max}`);
	    }
	  }
	  const simplified = ranges.join(' || ');
	  const original = typeof range.raw === 'string' ? range.raw : String(range);
	  return simplified.length < original.length ? simplified : range
	};
	return simplify;
}

var subset_1;
var hasRequiredSubset;

function requireSubset () {
	if (hasRequiredSubset) return subset_1;
	hasRequiredSubset = 1;
	const Range = requireRange();
	const Comparator = requireComparator();
	const { ANY } = Comparator;
	const satisfies = requireSatisfies();
	const compare = requireCompare();

	// Complex range `r1 || r2 || ...` is a subset of `R1 || R2 || ...` iff:
	// - Every simple range `r1, r2, ...` is a null set, OR
	// - Every simple range `r1, r2, ...` which is not a null set is a subset of
	//   some `R1, R2, ...`
	//
	// Simple range `c1 c2 ...` is a subset of simple range `C1 C2 ...` iff:
	// - If c is only the ANY comparator
	//   - If C is only the ANY comparator, return true
	//   - Else if in prerelease mode, return false
	//   - else replace c with `[>=0.0.0]`
	// - If C is only the ANY comparator
	//   - if in prerelease mode, return true
	//   - else replace C with `[>=0.0.0]`
	// - Let EQ be the set of = comparators in c
	// - If EQ is more than one, return true (null set)
	// - Let GT be the highest > or >= comparator in c
	// - Let LT be the lowest < or <= comparator in c
	// - If GT and LT, and GT.semver > LT.semver, return true (null set)
	// - If any C is a = range, and GT or LT are set, return false
	// - If EQ
	//   - If GT, and EQ does not satisfy GT, return true (null set)
	//   - If LT, and EQ does not satisfy LT, return true (null set)
	//   - If EQ satisfies every C, return true
	//   - Else return false
	// - If GT
	//   - If GT.semver is lower than any > or >= comp in C, return false
	//   - If GT is >=, and GT.semver does not satisfy every C, return false
	//   - If GT.semver has a prerelease, and not in prerelease mode
	//     - If no C has a prerelease and the GT.semver tuple, return false
	// - If LT
	//   - If LT.semver is greater than any < or <= comp in C, return false
	//   - If LT is <=, and LT.semver does not satisfy every C, return false
	//   - If GT.semver has a prerelease, and not in prerelease mode
	//     - If no C has a prerelease and the LT.semver tuple, return false
	// - Else return true

	const subset = (sub, dom, options = {}) => {
	  if (sub === dom) {
	    return true
	  }

	  sub = new Range(sub, options);
	  dom = new Range(dom, options);
	  let sawNonNull = false;

	  OUTER: for (const simpleSub of sub.set) {
	    for (const simpleDom of dom.set) {
	      const isSub = simpleSubset(simpleSub, simpleDom, options);
	      sawNonNull = sawNonNull || isSub !== null;
	      if (isSub) {
	        continue OUTER
	      }
	    }
	    // the null set is a subset of everything, but null simple ranges in
	    // a complex range should be ignored.  so if we saw a non-null range,
	    // then we know this isn't a subset, but if EVERY simple range was null,
	    // then it is a subset.
	    if (sawNonNull) {
	      return false
	    }
	  }
	  return true
	};

	const minimumVersionWithPreRelease = [new Comparator('>=0.0.0-0')];
	const minimumVersion = [new Comparator('>=0.0.0')];

	const simpleSubset = (sub, dom, options) => {
	  if (sub === dom) {
	    return true
	  }

	  if (sub.length === 1 && sub[0].semver === ANY) {
	    if (dom.length === 1 && dom[0].semver === ANY) {
	      return true
	    } else if (options.includePrerelease) {
	      sub = minimumVersionWithPreRelease;
	    } else {
	      sub = minimumVersion;
	    }
	  }

	  if (dom.length === 1 && dom[0].semver === ANY) {
	    if (options.includePrerelease) {
	      return true
	    } else {
	      dom = minimumVersion;
	    }
	  }

	  const eqSet = new Set();
	  let gt, lt;
	  for (const c of sub) {
	    if (c.operator === '>' || c.operator === '>=') {
	      gt = higherGT(gt, c, options);
	    } else if (c.operator === '<' || c.operator === '<=') {
	      lt = lowerLT(lt, c, options);
	    } else {
	      eqSet.add(c.semver);
	    }
	  }

	  if (eqSet.size > 1) {
	    return null
	  }

	  let gtltComp;
	  if (gt && lt) {
	    gtltComp = compare(gt.semver, lt.semver, options);
	    if (gtltComp > 0) {
	      return null
	    } else if (gtltComp === 0 && (gt.operator !== '>=' || lt.operator !== '<=')) {
	      return null
	    }
	  }

	  // will iterate one or zero times
	  for (const eq of eqSet) {
	    if (gt && !satisfies(eq, String(gt), options)) {
	      return null
	    }

	    if (lt && !satisfies(eq, String(lt), options)) {
	      return null
	    }

	    for (const c of dom) {
	      if (!satisfies(eq, String(c), options)) {
	        return false
	      }
	    }

	    return true
	  }

	  let higher, lower;
	  let hasDomLT, hasDomGT;
	  // if the subset has a prerelease, we need a comparator in the superset
	  // with the same tuple and a prerelease, or it's not a subset
	  let needDomLTPre = lt &&
	    !options.includePrerelease &&
	    lt.semver.prerelease.length ? lt.semver : false;
	  let needDomGTPre = gt &&
	    !options.includePrerelease &&
	    gt.semver.prerelease.length ? gt.semver : false;
	  // exception: <1.2.3-0 is the same as <1.2.3
	  if (needDomLTPre && needDomLTPre.prerelease.length === 1 &&
	      lt.operator === '<' && needDomLTPre.prerelease[0] === 0) {
	    needDomLTPre = false;
	  }

	  for (const c of dom) {
	    hasDomGT = hasDomGT || c.operator === '>' || c.operator === '>=';
	    hasDomLT = hasDomLT || c.operator === '<' || c.operator === '<=';
	    if (gt) {
	      if (needDomGTPre) {
	        if (c.semver.prerelease && c.semver.prerelease.length &&
	            c.semver.major === needDomGTPre.major &&
	            c.semver.minor === needDomGTPre.minor &&
	            c.semver.patch === needDomGTPre.patch) {
	          needDomGTPre = false;
	        }
	      }
	      if (c.operator === '>' || c.operator === '>=') {
	        higher = higherGT(gt, c, options);
	        if (higher === c && higher !== gt) {
	          return false
	        }
	      } else if (gt.operator === '>=' && !satisfies(gt.semver, String(c), options)) {
	        return false
	      }
	    }
	    if (lt) {
	      if (needDomLTPre) {
	        if (c.semver.prerelease && c.semver.prerelease.length &&
	            c.semver.major === needDomLTPre.major &&
	            c.semver.minor === needDomLTPre.minor &&
	            c.semver.patch === needDomLTPre.patch) {
	          needDomLTPre = false;
	        }
	      }
	      if (c.operator === '<' || c.operator === '<=') {
	        lower = lowerLT(lt, c, options);
	        if (lower === c && lower !== lt) {
	          return false
	        }
	      } else if (lt.operator === '<=' && !satisfies(lt.semver, String(c), options)) {
	        return false
	      }
	    }
	    if (!c.operator && (lt || gt) && gtltComp !== 0) {
	      return false
	    }
	  }

	  // if there was a < or >, and nothing in the dom, then must be false
	  // UNLESS it was limited by another range in the other direction.
	  // Eg, >1.0.0 <1.0.1 is still a subset of <2.0.0
	  if (gt && hasDomLT && !lt && gtltComp !== 0) {
	    return false
	  }

	  if (lt && hasDomGT && !gt && gtltComp !== 0) {
	    return false
	  }

	  // we needed a prerelease range in a specific tuple, but didn't get one
	  // then this isn't a subset.  eg >=1.2.3-pre is not a subset of >=1.0.0,
	  // because it includes prereleases in the 1.2.3 tuple
	  if (needDomGTPre || needDomLTPre) {
	    return false
	  }

	  return true
	};

	// >=1.2.3 is lower than >1.2.3
	const higherGT = (a, b, options) => {
	  if (!a) {
	    return b
	  }
	  const comp = compare(a.semver, b.semver, options);
	  return comp > 0 ? a
	    : comp < 0 ? b
	    : b.operator === '>' && a.operator === '>=' ? b
	    : a
	};

	// <=1.2.3 is higher than <1.2.3
	const lowerLT = (a, b, options) => {
	  if (!a) {
	    return b
	  }
	  const comp = compare(a.semver, b.semver, options);
	  return comp < 0 ? a
	    : comp > 0 ? b
	    : b.operator === '<' && a.operator === '<=' ? b
	    : a
	};

	subset_1 = subset;
	return subset_1;
}

var semver;
var hasRequiredSemver;

function requireSemver () {
	if (hasRequiredSemver) return semver;
	hasRequiredSemver = 1;
	// just pre-load all the stuff that index.js lazily exports
	const internalRe = requireRe();
	const constants = requireConstants();
	const SemVer = requireSemver$1();
	const identifiers = requireIdentifiers();
	const parse = requireParse();
	const valid = requireValid$1();
	const clean = requireClean();
	const inc = requireInc();
	const diff = requireDiff();
	const major = requireMajor();
	const minor = requireMinor();
	const patch = requirePatch();
	const prerelease = requirePrerelease();
	const compare = requireCompare();
	const rcompare = requireRcompare();
	const compareLoose = requireCompareLoose();
	const compareBuild = requireCompareBuild();
	const sort = requireSort();
	const rsort = requireRsort();
	const gt = requireGt();
	const lt = requireLt();
	const eq = requireEq();
	const neq = requireNeq();
	const gte = requireGte();
	const lte = requireLte();
	const cmp = requireCmp();
	const coerce = requireCoerce();
	const Comparator = requireComparator();
	const Range = requireRange();
	const satisfies = requireSatisfies();
	const toComparators = requireToComparators();
	const maxSatisfying = requireMaxSatisfying();
	const minSatisfying = requireMinSatisfying();
	const minVersion = requireMinVersion();
	const validRange = requireValid();
	const outside = requireOutside();
	const gtr = requireGtr();
	const ltr = requireLtr();
	const intersects = requireIntersects();
	const simplifyRange = requireSimplify();
	const subset = requireSubset();
	semver = {
	  parse,
	  valid,
	  clean,
	  inc,
	  diff,
	  major,
	  minor,
	  patch,
	  prerelease,
	  compare,
	  rcompare,
	  compareLoose,
	  compareBuild,
	  sort,
	  rsort,
	  gt,
	  lt,
	  eq,
	  neq,
	  gte,
	  lte,
	  cmp,
	  coerce,
	  Comparator,
	  Range,
	  satisfies,
	  toComparators,
	  maxSatisfying,
	  minSatisfying,
	  minVersion,
	  validRange,
	  outside,
	  gtr,
	  ltr,
	  intersects,
	  simplifyRange,
	  subset,
	  SemVer,
	  re: internalRe.re,
	  src: internalRe.src,
	  tokens: internalRe.t,
	  SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
	  RELEASE_TYPES: constants.RELEASE_TYPES,
	  compareIdentifiers: identifiers.compareIdentifiers,
	  rcompareIdentifiers: identifiers.rcompareIdentifiers,
	};
	return semver;
}

var asymmetricKeyDetailsSupported;
var hasRequiredAsymmetricKeyDetailsSupported;

function requireAsymmetricKeyDetailsSupported () {
	if (hasRequiredAsymmetricKeyDetailsSupported) return asymmetricKeyDetailsSupported;
	hasRequiredAsymmetricKeyDetailsSupported = 1;
	const semver = requireSemver();

	asymmetricKeyDetailsSupported = semver.satisfies(process.version, '>=15.7.0');
	return asymmetricKeyDetailsSupported;
}

var rsaPssKeyDetailsSupported;
var hasRequiredRsaPssKeyDetailsSupported;

function requireRsaPssKeyDetailsSupported () {
	if (hasRequiredRsaPssKeyDetailsSupported) return rsaPssKeyDetailsSupported;
	hasRequiredRsaPssKeyDetailsSupported = 1;
	const semver = requireSemver();

	rsaPssKeyDetailsSupported = semver.satisfies(process.version, '>=16.9.0');
	return rsaPssKeyDetailsSupported;
}

var validateAsymmetricKey;
var hasRequiredValidateAsymmetricKey;

function requireValidateAsymmetricKey () {
	if (hasRequiredValidateAsymmetricKey) return validateAsymmetricKey;
	hasRequiredValidateAsymmetricKey = 1;
	const ASYMMETRIC_KEY_DETAILS_SUPPORTED = requireAsymmetricKeyDetailsSupported();
	const RSA_PSS_KEY_DETAILS_SUPPORTED = requireRsaPssKeyDetailsSupported();

	const allowedAlgorithmsForKeys = {
	  'ec': ['ES256', 'ES384', 'ES512'],
	  'rsa': ['RS256', 'PS256', 'RS384', 'PS384', 'RS512', 'PS512'],
	  'rsa-pss': ['PS256', 'PS384', 'PS512']
	};

	const allowedCurves = {
	  ES256: 'prime256v1',
	  ES384: 'secp384r1',
	  ES512: 'secp521r1',
	};

	validateAsymmetricKey = function(algorithm, key) {
	  if (!algorithm || !key) return;

	  const keyType = key.asymmetricKeyType;
	  if (!keyType) return;

	  const allowedAlgorithms = allowedAlgorithmsForKeys[keyType];

	  if (!allowedAlgorithms) {
	    throw new Error(`Unknown key type "${keyType}".`);
	  }

	  if (!allowedAlgorithms.includes(algorithm)) {
	    throw new Error(`"alg" parameter for "${keyType}" key type must be one of: ${allowedAlgorithms.join(', ')}.`)
	  }

	  /*
	   * Ignore the next block from test coverage because it gets executed
	   * conditionally depending on the Node version. Not ignoring it would
	   * prevent us from reaching the target % of coverage for versions of
	   * Node under 15.7.0.
	   */
	  /* istanbul ignore next */
	  if (ASYMMETRIC_KEY_DETAILS_SUPPORTED) {
	    switch (keyType) {
	    case 'ec':
	      const keyCurve = key.asymmetricKeyDetails.namedCurve;
	      const allowedCurve = allowedCurves[algorithm];

	      if (keyCurve !== allowedCurve) {
	        throw new Error(`"alg" parameter "${algorithm}" requires curve "${allowedCurve}".`);
	      }
	      break;

	    case 'rsa-pss':
	      if (RSA_PSS_KEY_DETAILS_SUPPORTED) {
	        const length = parseInt(algorithm.slice(-3), 10);
	        const { hashAlgorithm, mgf1HashAlgorithm, saltLength } = key.asymmetricKeyDetails;

	        if (hashAlgorithm !== `sha${length}` || mgf1HashAlgorithm !== hashAlgorithm) {
	          throw new Error(`Invalid key for this operation, its RSA-PSS parameters do not meet the requirements of "alg" ${algorithm}.`);
	        }

	        if (saltLength !== undefined && saltLength > length >> 3) {
	          throw new Error(`Invalid key for this operation, its RSA-PSS parameter saltLength does not meet the requirements of "alg" ${algorithm}.`)
	        }
	      }
	      break;
	    }
	  }
	};
	return validateAsymmetricKey;
}

var psSupported;
var hasRequiredPsSupported;

function requirePsSupported () {
	if (hasRequiredPsSupported) return psSupported;
	hasRequiredPsSupported = 1;
	var semver = requireSemver();

	psSupported = semver.satisfies(process.version, '^6.12.0 || >=8.0.0');
	return psSupported;
}

var verify;
var hasRequiredVerify;

function requireVerify () {
	if (hasRequiredVerify) return verify;
	hasRequiredVerify = 1;
	const JsonWebTokenError = requireJsonWebTokenError();
	const NotBeforeError = requireNotBeforeError();
	const TokenExpiredError = requireTokenExpiredError();
	const decode = requireDecode();
	const timespan = requireTimespan();
	const validateAsymmetricKey = requireValidateAsymmetricKey();
	const PS_SUPPORTED = requirePsSupported();
	const jws = requireJws();
	const {KeyObject, createSecretKey, createPublicKey} = crypto;

	const PUB_KEY_ALGS = ['RS256', 'RS384', 'RS512'];
	const EC_KEY_ALGS = ['ES256', 'ES384', 'ES512'];
	const RSA_KEY_ALGS = ['RS256', 'RS384', 'RS512'];
	const HS_ALGS = ['HS256', 'HS384', 'HS512'];

	if (PS_SUPPORTED) {
	  PUB_KEY_ALGS.splice(PUB_KEY_ALGS.length, 0, 'PS256', 'PS384', 'PS512');
	  RSA_KEY_ALGS.splice(RSA_KEY_ALGS.length, 0, 'PS256', 'PS384', 'PS512');
	}

	verify = function (jwtString, secretOrPublicKey, options, callback) {
	  if ((typeof options === 'function') && !callback) {
	    callback = options;
	    options = {};
	  }

	  if (!options) {
	    options = {};
	  }

	  //clone this object since we are going to mutate it.
	  options = Object.assign({}, options);

	  let done;

	  if (callback) {
	    done = callback;
	  } else {
	    done = function(err, data) {
	      if (err) throw err;
	      return data;
	    };
	  }

	  if (options.clockTimestamp && typeof options.clockTimestamp !== 'number') {
	    return done(new JsonWebTokenError('clockTimestamp must be a number'));
	  }

	  if (options.nonce !== undefined && (typeof options.nonce !== 'string' || options.nonce.trim() === '')) {
	    return done(new JsonWebTokenError('nonce must be a non-empty string'));
	  }

	  if (options.allowInvalidAsymmetricKeyTypes !== undefined && typeof options.allowInvalidAsymmetricKeyTypes !== 'boolean') {
	    return done(new JsonWebTokenError('allowInvalidAsymmetricKeyTypes must be a boolean'));
	  }

	  const clockTimestamp = options.clockTimestamp || Math.floor(Date.now() / 1000);

	  if (!jwtString){
	    return done(new JsonWebTokenError('jwt must be provided'));
	  }

	  if (typeof jwtString !== 'string') {
	    return done(new JsonWebTokenError('jwt must be a string'));
	  }

	  const parts = jwtString.split('.');

	  if (parts.length !== 3){
	    return done(new JsonWebTokenError('jwt malformed'));
	  }

	  let decodedToken;

	  try {
	    decodedToken = decode(jwtString, { complete: true });
	  } catch(err) {
	    return done(err);
	  }

	  if (!decodedToken) {
	    return done(new JsonWebTokenError('invalid token'));
	  }

	  const header = decodedToken.header;
	  let getSecret;

	  if(typeof secretOrPublicKey === 'function') {
	    if(!callback) {
	      return done(new JsonWebTokenError('verify must be called asynchronous if secret or public key is provided as a callback'));
	    }

	    getSecret = secretOrPublicKey;
	  }
	  else {
	    getSecret = function(header, secretCallback) {
	      return secretCallback(null, secretOrPublicKey);
	    };
	  }

	  return getSecret(header, function(err, secretOrPublicKey) {
	    if(err) {
	      return done(new JsonWebTokenError('error in secret or public key callback: ' + err.message));
	    }

	    const hasSignature = parts[2].trim() !== '';

	    if (!hasSignature && secretOrPublicKey){
	      return done(new JsonWebTokenError('jwt signature is required'));
	    }

	    if (hasSignature && !secretOrPublicKey) {
	      return done(new JsonWebTokenError('secret or public key must be provided'));
	    }

	    if (!hasSignature && !options.algorithms) {
	      return done(new JsonWebTokenError('please specify "none" in "algorithms" to verify unsigned tokens'));
	    }

	    if (secretOrPublicKey != null && !(secretOrPublicKey instanceof KeyObject)) {
	      try {
	        secretOrPublicKey = createPublicKey(secretOrPublicKey);
	      } catch (_) {
	        try {
	          secretOrPublicKey = createSecretKey(typeof secretOrPublicKey === 'string' ? Buffer.from(secretOrPublicKey) : secretOrPublicKey);
	        } catch (_) {
	          return done(new JsonWebTokenError('secretOrPublicKey is not valid key material'))
	        }
	      }
	    }

	    if (!options.algorithms) {
	      if (secretOrPublicKey.type === 'secret') {
	        options.algorithms = HS_ALGS;
	      } else if (['rsa', 'rsa-pss'].includes(secretOrPublicKey.asymmetricKeyType)) {
	        options.algorithms = RSA_KEY_ALGS;
	      } else if (secretOrPublicKey.asymmetricKeyType === 'ec') {
	        options.algorithms = EC_KEY_ALGS;
	      } else {
	        options.algorithms = PUB_KEY_ALGS;
	      }
	    }

	    if (options.algorithms.indexOf(decodedToken.header.alg) === -1) {
	      return done(new JsonWebTokenError('invalid algorithm'));
	    }

	    if (header.alg.startsWith('HS') && secretOrPublicKey.type !== 'secret') {
	      return done(new JsonWebTokenError((`secretOrPublicKey must be a symmetric key when using ${header.alg}`)))
	    } else if (/^(?:RS|PS|ES)/.test(header.alg) && secretOrPublicKey.type !== 'public') {
	      return done(new JsonWebTokenError((`secretOrPublicKey must be an asymmetric key when using ${header.alg}`)))
	    }

	    if (!options.allowInvalidAsymmetricKeyTypes) {
	      try {
	        validateAsymmetricKey(header.alg, secretOrPublicKey);
	      } catch (e) {
	        return done(e);
	      }
	    }

	    let valid;

	    try {
	      valid = jws.verify(jwtString, decodedToken.header.alg, secretOrPublicKey);
	    } catch (e) {
	      return done(e);
	    }

	    if (!valid) {
	      return done(new JsonWebTokenError('invalid signature'));
	    }

	    const payload = decodedToken.payload;

	    if (typeof payload.nbf !== 'undefined' && !options.ignoreNotBefore) {
	      if (typeof payload.nbf !== 'number') {
	        return done(new JsonWebTokenError('invalid nbf value'));
	      }
	      if (payload.nbf > clockTimestamp + (options.clockTolerance || 0)) {
	        return done(new NotBeforeError('jwt not active', new Date(payload.nbf * 1000)));
	      }
	    }

	    if (typeof payload.exp !== 'undefined' && !options.ignoreExpiration) {
	      if (typeof payload.exp !== 'number') {
	        return done(new JsonWebTokenError('invalid exp value'));
	      }
	      if (clockTimestamp >= payload.exp + (options.clockTolerance || 0)) {
	        return done(new TokenExpiredError('jwt expired', new Date(payload.exp * 1000)));
	      }
	    }

	    if (options.audience) {
	      const audiences = Array.isArray(options.audience) ? options.audience : [options.audience];
	      const target = Array.isArray(payload.aud) ? payload.aud : [payload.aud];

	      const match = target.some(function (targetAudience) {
	        return audiences.some(function (audience) {
	          return audience instanceof RegExp ? audience.test(targetAudience) : audience === targetAudience;
	        });
	      });

	      if (!match) {
	        return done(new JsonWebTokenError('jwt audience invalid. expected: ' + audiences.join(' or ')));
	      }
	    }

	    if (options.issuer) {
	      const invalid_issuer =
	              (typeof options.issuer === 'string' && payload.iss !== options.issuer) ||
	              (Array.isArray(options.issuer) && options.issuer.indexOf(payload.iss) === -1);

	      if (invalid_issuer) {
	        return done(new JsonWebTokenError('jwt issuer invalid. expected: ' + options.issuer));
	      }
	    }

	    if (options.subject) {
	      if (payload.sub !== options.subject) {
	        return done(new JsonWebTokenError('jwt subject invalid. expected: ' + options.subject));
	      }
	    }

	    if (options.jwtid) {
	      if (payload.jti !== options.jwtid) {
	        return done(new JsonWebTokenError('jwt jwtid invalid. expected: ' + options.jwtid));
	      }
	    }

	    if (options.nonce) {
	      if (payload.nonce !== options.nonce) {
	        return done(new JsonWebTokenError('jwt nonce invalid. expected: ' + options.nonce));
	      }
	    }

	    if (options.maxAge) {
	      if (typeof payload.iat !== 'number') {
	        return done(new JsonWebTokenError('iat required when maxAge is specified'));
	      }

	      const maxAgeTimestamp = timespan(options.maxAge, payload.iat);
	      if (typeof maxAgeTimestamp === 'undefined') {
	        return done(new JsonWebTokenError('"maxAge" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
	      }
	      if (clockTimestamp >= maxAgeTimestamp + (options.clockTolerance || 0)) {
	        return done(new TokenExpiredError('maxAge exceeded', new Date(maxAgeTimestamp * 1000)));
	      }
	    }

	    if (options.complete === true) {
	      const signature = decodedToken.signature;

	      return done(null, {
	        header: header,
	        payload: payload,
	        signature: signature
	      });
	    }

	    return done(null, payload);
	  });
	};
	return verify;
}

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

var lodash_includes;
var hasRequiredLodash_includes;

function requireLodash_includes () {
	if (hasRequiredLodash_includes) return lodash_includes;
	hasRequiredLodash_includes = 1;
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_SAFE_INTEGER = 9007199254740991,
	    MAX_INTEGER = 1.7976931348623157e+308,
	    NAN = 0 / 0;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 1 : -1);

	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}

	/**
	 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  if (value !== value) {
	    return baseFindIndex(array, baseIsNaN, fromIndex);
	  }
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	/**
	 * The base implementation of `_.isNaN` without support for number objects.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	 */
	function baseIsNaN(value) {
	  return value !== value;
	}

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	/**
	 * The base implementation of `_.values` and `_.valuesIn` which creates an
	 * array of `object` property values corresponding to the property names
	 * of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the array of property values.
	 */
	function baseValues(object, props) {
	  return arrayMap(props, function(key) {
	    return object[key];
	  });
	}

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object),
	    nativeMax = Math.max;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  // Safari 9 makes `arguments.length` enumerable in strict mode.
	  var result = (isArray(value) || isArguments(value))
	    ? baseTimes(value.length, String)
	    : [];

	  var length = result.length,
	      skipIndexes = !!length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	/**
	 * Checks if `value` is in `collection`. If `collection` is a string, it's
	 * checked for a substring of `value`, otherwise
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * is used for equality comparisons. If `fromIndex` is negative, it's used as
	 * the offset from the end of `collection`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
	 * @returns {boolean} Returns `true` if `value` is found, else `false`.
	 * @example
	 *
	 * _.includes([1, 2, 3], 1);
	 * // => true
	 *
	 * _.includes([1, 2, 3], 1, 2);
	 * // => false
	 *
	 * _.includes({ 'a': 1, 'b': 2 }, 1);
	 * // => true
	 *
	 * _.includes('abcd', 'bc');
	 * // => true
	 */
	function includes(collection, value, fromIndex, guard) {
	  collection = isArrayLike(collection) ? collection : values(collection);
	  fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

	  var length = collection.length;
	  if (fromIndex < 0) {
	    fromIndex = nativeMax(length + fromIndex, 0);
	  }
	  return isString(collection)
	    ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
	    : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
	}

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a finite number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.12.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted number.
	 * @example
	 *
	 * _.toFinite(3.2);
	 * // => 3.2
	 *
	 * _.toFinite(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toFinite(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toFinite('3.2');
	 * // => 3.2
	 */
	function toFinite(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  return value === value ? value : 0;
	}

	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3.2);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3.2');
	 * // => 3
	 */
	function toInteger(value) {
	  var result = toFinite(value),
	      remainder = result % 1;

	  return result === result ? (remainder ? result - remainder : result) : 0;
	}

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	/**
	 * Creates an array of the own enumerable string keyed property values of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property values.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.values(new Foo);
	 * // => [1, 2] (iteration order is not guaranteed)
	 *
	 * _.values('hi');
	 * // => ['h', 'i']
	 */
	function values(object) {
	  return object ? baseValues(object, keys(object)) : [];
	}

	lodash_includes = includes;
	return lodash_includes;
}

/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

var lodash_isboolean;
var hasRequiredLodash_isboolean;

function requireLodash_isboolean () {
	if (hasRequiredLodash_isboolean) return lodash_isboolean;
	hasRequiredLodash_isboolean = 1;
	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a boolean primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isBoolean(false);
	 * // => true
	 *
	 * _.isBoolean(null);
	 * // => false
	 */
	function isBoolean(value) {
	  return value === true || value === false ||
	    (isObjectLike(value) && objectToString.call(value) == boolTag);
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	lodash_isboolean = isBoolean;
	return lodash_isboolean;
}

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

var lodash_isinteger;
var hasRequiredLodash_isinteger;

function requireLodash_isinteger () {
	if (hasRequiredLodash_isinteger) return lodash_isinteger;
	hasRequiredLodash_isinteger = 1;
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308,
	    NAN = 0 / 0;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is an integer.
	 *
	 * **Note:** This method is based on
	 * [`Number.isInteger`](https://mdn.io/Number/isInteger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
	 * @example
	 *
	 * _.isInteger(3);
	 * // => true
	 *
	 * _.isInteger(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isInteger(Infinity);
	 * // => false
	 *
	 * _.isInteger('3');
	 * // => false
	 */
	function isInteger(value) {
	  return typeof value == 'number' && value == toInteger(value);
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a finite number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.12.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted number.
	 * @example
	 *
	 * _.toFinite(3.2);
	 * // => 3.2
	 *
	 * _.toFinite(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toFinite(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toFinite('3.2');
	 * // => 3.2
	 */
	function toFinite(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  return value === value ? value : 0;
	}

	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3.2);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3.2');
	 * // => 3
	 */
	function toInteger(value) {
	  var result = toFinite(value),
	      remainder = result % 1;

	  return result === result ? (remainder ? result - remainder : result) : 0;
	}

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	lodash_isinteger = isInteger;
	return lodash_isinteger;
}

/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

var lodash_isnumber;
var hasRequiredLodash_isnumber;

function requireLodash_isnumber () {
	if (hasRequiredLodash_isnumber) return lodash_isnumber;
	hasRequiredLodash_isnumber = 1;
	/** `Object#toString` result references. */
	var numberTag = '[object Number]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Number` primitive or object.
	 *
	 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
	 * as numbers, use the `_.isFinite` method.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isNumber(3);
	 * // => true
	 *
	 * _.isNumber(Number.MIN_VALUE);
	 * // => true
	 *
	 * _.isNumber(Infinity);
	 * // => true
	 *
	 * _.isNumber('3');
	 * // => false
	 */
	function isNumber(value) {
	  return typeof value == 'number' ||
	    (isObjectLike(value) && objectToString.call(value) == numberTag);
	}

	lodash_isnumber = isNumber;
	return lodash_isnumber;
}

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

var lodash_isplainobject;
var hasRequiredLodash_isplainobject;

function requireLodash_isplainobject () {
	if (hasRequiredLodash_isplainobject) return lodash_isplainobject;
	hasRequiredLodash_isplainobject = 1;
	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) ||
	      objectToString.call(value) != objectTag || isHostObject(value)) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}

	lodash_isplainobject = isPlainObject;
	return lodash_isplainobject;
}

/**
 * lodash 4.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

var lodash_isstring;
var hasRequiredLodash_isstring;

function requireLodash_isstring () {
	if (hasRequiredLodash_isstring) return lodash_isstring;
	hasRequiredLodash_isstring = 1;
	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}

	lodash_isstring = isString;
	return lodash_isstring;
}

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

var lodash_once;
var hasRequiredLodash_once;

function requireLodash_once () {
	if (hasRequiredLodash_once) return lodash_once;
	hasRequiredLodash_once = 1;
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308,
	    NAN = 0 / 0;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Creates a function that invokes `func`, with the `this` binding and arguments
	 * of the created function, while it's called less than `n` times. Subsequent
	 * calls to the created function return the result of the last `func` invocation.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Function
	 * @param {number} n The number of calls at which `func` is no longer invoked.
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new restricted function.
	 * @example
	 *
	 * jQuery(element).on('click', _.before(5, addContactToList));
	 * // => Allows adding up to 4 contacts to the list.
	 */
	function before(n, func) {
	  var result;
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  n = toInteger(n);
	  return function() {
	    if (--n > 0) {
	      result = func.apply(this, arguments);
	    }
	    if (n <= 1) {
	      func = undefined;
	    }
	    return result;
	  };
	}

	/**
	 * Creates a function that is restricted to invoking `func` once. Repeat calls
	 * to the function return the value of the first invocation. The `func` is
	 * invoked with the `this` binding and arguments of the created function.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new restricted function.
	 * @example
	 *
	 * var initialize = _.once(createApplication);
	 * initialize();
	 * initialize();
	 * // => `createApplication` is invoked once
	 */
	function once(func) {
	  return before(2, func);
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a finite number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.12.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted number.
	 * @example
	 *
	 * _.toFinite(3.2);
	 * // => 3.2
	 *
	 * _.toFinite(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toFinite(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toFinite('3.2');
	 * // => 3.2
	 */
	function toFinite(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  return value === value ? value : 0;
	}

	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3.2);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3.2');
	 * // => 3
	 */
	function toInteger(value) {
	  var result = toFinite(value),
	      remainder = result % 1;

	  return result === result ? (remainder ? result - remainder : result) : 0;
	}

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	lodash_once = once;
	return lodash_once;
}

var sign;
var hasRequiredSign;

function requireSign () {
	if (hasRequiredSign) return sign;
	hasRequiredSign = 1;
	const timespan = requireTimespan();
	const PS_SUPPORTED = requirePsSupported();
	const validateAsymmetricKey = requireValidateAsymmetricKey();
	const jws = requireJws();
	const includes = requireLodash_includes();
	const isBoolean = requireLodash_isboolean();
	const isInteger = requireLodash_isinteger();
	const isNumber = requireLodash_isnumber();
	const isPlainObject = requireLodash_isplainobject();
	const isString = requireLodash_isstring();
	const once = requireLodash_once();
	const { KeyObject, createSecretKey, createPrivateKey } = crypto;

	const SUPPORTED_ALGS = ['RS256', 'RS384', 'RS512', 'ES256', 'ES384', 'ES512', 'HS256', 'HS384', 'HS512', 'none'];
	if (PS_SUPPORTED) {
	  SUPPORTED_ALGS.splice(3, 0, 'PS256', 'PS384', 'PS512');
	}

	const sign_options_schema = {
	  expiresIn: { isValid: function(value) { return isInteger(value) || (isString(value) && value); }, message: '"expiresIn" should be a number of seconds or string representing a timespan' },
	  notBefore: { isValid: function(value) { return isInteger(value) || (isString(value) && value); }, message: '"notBefore" should be a number of seconds or string representing a timespan' },
	  audience: { isValid: function(value) { return isString(value) || Array.isArray(value); }, message: '"audience" must be a string or array' },
	  algorithm: { isValid: includes.bind(null, SUPPORTED_ALGS), message: '"algorithm" must be a valid string enum value' },
	  header: { isValid: isPlainObject, message: '"header" must be an object' },
	  encoding: { isValid: isString, message: '"encoding" must be a string' },
	  issuer: { isValid: isString, message: '"issuer" must be a string' },
	  subject: { isValid: isString, message: '"subject" must be a string' },
	  jwtid: { isValid: isString, message: '"jwtid" must be a string' },
	  noTimestamp: { isValid: isBoolean, message: '"noTimestamp" must be a boolean' },
	  keyid: { isValid: isString, message: '"keyid" must be a string' },
	  mutatePayload: { isValid: isBoolean, message: '"mutatePayload" must be a boolean' },
	  allowInsecureKeySizes: { isValid: isBoolean, message: '"allowInsecureKeySizes" must be a boolean'},
	  allowInvalidAsymmetricKeyTypes: { isValid: isBoolean, message: '"allowInvalidAsymmetricKeyTypes" must be a boolean'}
	};

	const registered_claims_schema = {
	  iat: { isValid: isNumber, message: '"iat" should be a number of seconds' },
	  exp: { isValid: isNumber, message: '"exp" should be a number of seconds' },
	  nbf: { isValid: isNumber, message: '"nbf" should be a number of seconds' }
	};

	function validate(schema, allowUnknown, object, parameterName) {
	  if (!isPlainObject(object)) {
	    throw new Error('Expected "' + parameterName + '" to be a plain object.');
	  }
	  Object.keys(object)
	    .forEach(function(key) {
	      const validator = schema[key];
	      if (!validator) {
	        if (!allowUnknown) {
	          throw new Error('"' + key + '" is not allowed in "' + parameterName + '"');
	        }
	        return;
	      }
	      if (!validator.isValid(object[key])) {
	        throw new Error(validator.message);
	      }
	    });
	}

	function validateOptions(options) {
	  return validate(sign_options_schema, false, options, 'options');
	}

	function validatePayload(payload) {
	  return validate(registered_claims_schema, true, payload, 'payload');
	}

	const options_to_payload = {
	  'audience': 'aud',
	  'issuer': 'iss',
	  'subject': 'sub',
	  'jwtid': 'jti'
	};

	const options_for_objects = [
	  'expiresIn',
	  'notBefore',
	  'noTimestamp',
	  'audience',
	  'issuer',
	  'subject',
	  'jwtid',
	];

	sign = function (payload, secretOrPrivateKey, options, callback) {
	  if (typeof options === 'function') {
	    callback = options;
	    options = {};
	  } else {
	    options = options || {};
	  }

	  const isObjectPayload = typeof payload === 'object' &&
	                        !Buffer.isBuffer(payload);

	  const header = Object.assign({
	    alg: options.algorithm || 'HS256',
	    typ: isObjectPayload ? 'JWT' : undefined,
	    kid: options.keyid
	  }, options.header);

	  function failure(err) {
	    if (callback) {
	      return callback(err);
	    }
	    throw err;
	  }

	  if (!secretOrPrivateKey && options.algorithm !== 'none') {
	    return failure(new Error('secretOrPrivateKey must have a value'));
	  }

	  if (secretOrPrivateKey != null && !(secretOrPrivateKey instanceof KeyObject)) {
	    try {
	      secretOrPrivateKey = createPrivateKey(secretOrPrivateKey);
	    } catch (_) {
	      try {
	        secretOrPrivateKey = createSecretKey(typeof secretOrPrivateKey === 'string' ? Buffer.from(secretOrPrivateKey) : secretOrPrivateKey);
	      } catch (_) {
	        return failure(new Error('secretOrPrivateKey is not valid key material'));
	      }
	    }
	  }

	  if (header.alg.startsWith('HS') && secretOrPrivateKey.type !== 'secret') {
	    return failure(new Error((`secretOrPrivateKey must be a symmetric key when using ${header.alg}`)))
	  } else if (/^(?:RS|PS|ES)/.test(header.alg)) {
	    if (secretOrPrivateKey.type !== 'private') {
	      return failure(new Error((`secretOrPrivateKey must be an asymmetric key when using ${header.alg}`)))
	    }
	    if (!options.allowInsecureKeySizes &&
	      !header.alg.startsWith('ES') &&
	      secretOrPrivateKey.asymmetricKeyDetails !== undefined && //KeyObject.asymmetricKeyDetails is supported in Node 15+
	      secretOrPrivateKey.asymmetricKeyDetails.modulusLength < 2048) {
	      return failure(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`));
	    }
	  }

	  if (typeof payload === 'undefined') {
	    return failure(new Error('payload is required'));
	  } else if (isObjectPayload) {
	    try {
	      validatePayload(payload);
	    }
	    catch (error) {
	      return failure(error);
	    }
	    if (!options.mutatePayload) {
	      payload = Object.assign({},payload);
	    }
	  } else {
	    const invalid_options = options_for_objects.filter(function (opt) {
	      return typeof options[opt] !== 'undefined';
	    });

	    if (invalid_options.length > 0) {
	      return failure(new Error('invalid ' + invalid_options.join(',') + ' option for ' + (typeof payload ) + ' payload'));
	    }
	  }

	  if (typeof payload.exp !== 'undefined' && typeof options.expiresIn !== 'undefined') {
	    return failure(new Error('Bad "options.expiresIn" option the payload already has an "exp" property.'));
	  }

	  if (typeof payload.nbf !== 'undefined' && typeof options.notBefore !== 'undefined') {
	    return failure(new Error('Bad "options.notBefore" option the payload already has an "nbf" property.'));
	  }

	  try {
	    validateOptions(options);
	  }
	  catch (error) {
	    return failure(error);
	  }

	  if (!options.allowInvalidAsymmetricKeyTypes) {
	    try {
	      validateAsymmetricKey(header.alg, secretOrPrivateKey);
	    } catch (error) {
	      return failure(error);
	    }
	  }

	  const timestamp = payload.iat || Math.floor(Date.now() / 1000);

	  if (options.noTimestamp) {
	    delete payload.iat;
	  } else if (isObjectPayload) {
	    payload.iat = timestamp;
	  }

	  if (typeof options.notBefore !== 'undefined') {
	    try {
	      payload.nbf = timespan(options.notBefore, timestamp);
	    }
	    catch (err) {
	      return failure(err);
	    }
	    if (typeof payload.nbf === 'undefined') {
	      return failure(new Error('"notBefore" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
	    }
	  }

	  if (typeof options.expiresIn !== 'undefined' && typeof payload === 'object') {
	    try {
	      payload.exp = timespan(options.expiresIn, timestamp);
	    }
	    catch (err) {
	      return failure(err);
	    }
	    if (typeof payload.exp === 'undefined') {
	      return failure(new Error('"expiresIn" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
	    }
	  }

	  Object.keys(options_to_payload).forEach(function (key) {
	    const claim = options_to_payload[key];
	    if (typeof options[key] !== 'undefined') {
	      if (typeof payload[claim] !== 'undefined') {
	        return failure(new Error('Bad "options.' + key + '" option. The payload already has an "' + claim + '" property.'));
	      }
	      payload[claim] = options[key];
	    }
	  });

	  const encoding = options.encoding || 'utf8';

	  if (typeof callback === 'function') {
	    callback = callback && once(callback);

	    jws.createSign({
	      header: header,
	      privateKey: secretOrPrivateKey,
	      payload: payload,
	      encoding: encoding
	    }).once('error', callback)
	      .once('done', function (signature) {
	        // TODO: Remove in favor of the modulus length check before signing once node 15+ is the minimum supported version
	        if(!options.allowInsecureKeySizes && /^(?:RS|PS)/.test(header.alg) && signature.length < 256) {
	          return callback(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`))
	        }
	        callback(null, signature);
	      });
	  } else {
	    let signature = jws.sign({header: header, payload: payload, secret: secretOrPrivateKey, encoding: encoding});
	    // TODO: Remove in favor of the modulus length check before signing once node 15+ is the minimum supported version
	    if(!options.allowInsecureKeySizes && /^(?:RS|PS)/.test(header.alg) && signature.length < 256) {
	      throw new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`)
	    }
	    return signature
	  }
	};
	return sign;
}

var jsonwebtoken;
var hasRequiredJsonwebtoken;

function requireJsonwebtoken () {
	if (hasRequiredJsonwebtoken) return jsonwebtoken;
	hasRequiredJsonwebtoken = 1;
	jsonwebtoken = {
	  decode: requireDecode(),
	  verify: requireVerify(),
	  sign: requireSign(),
	  JsonWebTokenError: requireJsonWebTokenError(),
	  NotBeforeError: requireNotBeforeError(),
	  TokenExpiredError: requireTokenExpiredError(),
	};
	return jsonwebtoken;
}

var jsonwebtokenExports = requireJsonwebtoken();
var jwt = /*@__PURE__*/getDefaultExportFromCjs(jsonwebtokenExports);

/*! @azure/msal-node v2.16.2 2024-11-19 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Client assertion of type jwt-bearer used in confidential client flows
 * @public
 */
class ClientAssertion {
    /**
     * Initialize the ClientAssertion class from the clientAssertion passed by the user
     * @param assertion - refer https://tools.ietf.org/html/rfc7521
     */
    static fromAssertion(assertion) {
        const clientAssertion = new ClientAssertion();
        clientAssertion.jwt = assertion;
        return clientAssertion;
    }
    /**
     * @deprecated Use fromCertificateWithSha256Thumbprint instead, with a SHA-256 thumprint
     * Initialize the ClientAssertion class from the certificate passed by the user
     * @param thumbprint - identifier of a certificate
     * @param privateKey - secret key
     * @param publicCertificate - electronic document provided to prove the ownership of the public key
     */
    static fromCertificate(thumbprint, privateKey, publicCertificate) {
        const clientAssertion = new ClientAssertion();
        clientAssertion.privateKey = privateKey;
        clientAssertion.thumbprint = thumbprint;
        clientAssertion.useSha256 = false;
        if (publicCertificate) {
            clientAssertion.publicCertificate =
                this.parseCertificate(publicCertificate);
        }
        return clientAssertion;
    }
    /**
     * Initialize the ClientAssertion class from the certificate passed by the user
     * @param thumbprint - identifier of a certificate
     * @param privateKey - secret key
     * @param publicCertificate - electronic document provided to prove the ownership of the public key
     */
    static fromCertificateWithSha256Thumbprint(thumbprint, privateKey, publicCertificate) {
        const clientAssertion = new ClientAssertion();
        clientAssertion.privateKey = privateKey;
        clientAssertion.thumbprint = thumbprint;
        clientAssertion.useSha256 = true;
        if (publicCertificate) {
            clientAssertion.publicCertificate =
                this.parseCertificate(publicCertificate);
        }
        return clientAssertion;
    }
    /**
     * Update JWT for certificate based clientAssertion, if passed by the user, uses it as is
     * @param cryptoProvider - library's crypto helper
     * @param issuer - iss claim
     * @param jwtAudience - aud claim
     */
    getJwt(cryptoProvider, issuer, jwtAudience) {
        // if assertion was created from certificate, check if jwt is expired and create new one.
        if (this.privateKey && this.thumbprint) {
            if (this.jwt &&
                !this.isExpired() &&
                issuer === this.issuer &&
                jwtAudience === this.jwtAudience) {
                return this.jwt;
            }
            return this.createJwt(cryptoProvider, issuer, jwtAudience);
        }
        /*
         * if assertion was created by caller, then we just append it. It is up to the caller to
         * ensure that it contains necessary claims and that it is not expired.
         */
        if (this.jwt) {
            return this.jwt;
        }
        throw createClientAuthError(invalidAssertion);
    }
    /**
     * JWT format and required claims specified: https://tools.ietf.org/html/rfc7523#section-3
     */
    createJwt(cryptoProvider, issuer, jwtAudience) {
        this.issuer = issuer;
        this.jwtAudience = jwtAudience;
        const issuedAt = nowSeconds();
        this.expirationTime = issuedAt + 600;
        const algorithm = this.useSha256
            ? JwtConstants.PSS_256
            : JwtConstants.RSA_256;
        const header = {
            alg: algorithm,
        };
        const thumbprintHeader = this.useSha256
            ? JwtConstants.X5T_256
            : JwtConstants.X5T;
        Object.assign(header, {
            [thumbprintHeader]: EncodingUtils.base64EncodeUrl(this.thumbprint, "hex"),
        });
        if (this.publicCertificate) {
            Object.assign(header, {
                [JwtConstants.X5C]: this.publicCertificate,
            });
        }
        const payload = {
            [JwtConstants.AUDIENCE]: this.jwtAudience,
            [JwtConstants.EXPIRATION_TIME]: this.expirationTime,
            [JwtConstants.ISSUER]: this.issuer,
            [JwtConstants.SUBJECT]: this.issuer,
            [JwtConstants.NOT_BEFORE]: issuedAt,
            [JwtConstants.JWT_ID]: cryptoProvider.createNewGuid(),
        };
        this.jwt = jwt.sign(payload, this.privateKey, { header });
        return this.jwt;
    }
    /**
     * Utility API to check expiration
     */
    isExpired() {
        return this.expirationTime < nowSeconds();
    }
    /**
     * Extracts the raw certs from a given certificate string and returns them in an array.
     * @param publicCertificate - electronic document provided to prove the ownership of the public key
     */
    static parseCertificate(publicCertificate) {
        /**
         * This is regex to identify the certs in a given certificate string.
         * We want to look for the contents between the BEGIN and END certificate strings, without the associated newlines.
         * The information in parens "(.+?)" is the capture group to represent the cert we want isolated.
         * "." means any string character, "+" means match 1 or more times, and "?" means the shortest match.
         * The "g" at the end of the regex means search the string globally, and the "s" enables the "." to match newlines.
         */
        const regexToFindCerts = /-----BEGIN CERTIFICATE-----\r*\n(.+?)\r*\n-----END CERTIFICATE-----/gs;
        const certs = [];
        let matches;
        while ((matches = regexToFindCerts.exec(publicCertificate)) !== null) {
            // matches[1] represents the first parens capture group in the regex.
            certs.push(matches[1].replace(/\r*\n/g, Constants$1.EMPTY_STRING));
        }
        return certs;
    }
}

/*! @azure/msal-node v2.16.2 2024-11-19 */
/* eslint-disable header/header */
const name = "@azure/msal-node";
const version = "2.16.2";

/*! @azure/msal-node v2.16.2 2024-11-19 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Oauth2.0 Password grant client
 * Note: We are only supporting public clients for password grant and for purely testing purposes
 * @public
 */
class UsernamePasswordClient extends BaseClient {
    constructor(configuration) {
        super(configuration);
    }
    /**
     * API to acquire a token by passing the username and password to the service in exchage of credentials
     * password_grant
     * @param request - CommonUsernamePasswordRequest
     */
    async acquireToken(request) {
        this.logger.info("in acquireToken call in username-password client");
        const reqTimestamp = nowSeconds();
        const response = await this.executeTokenRequest(this.authority, request);
        const responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin);
        // Validate response. This function throws a server error if an error is returned by the server.
        responseHandler.validateTokenResponse(response.body);
        const tokenResponse = responseHandler.handleServerTokenResponse(response.body, this.authority, reqTimestamp, request);
        return tokenResponse;
    }
    /**
     * Executes POST request to token endpoint
     * @param authority - authority object
     * @param request - CommonUsernamePasswordRequest provided by the developer
     */
    async executeTokenRequest(authority, request) {
        const queryParametersString = this.createTokenQueryParameters(request);
        const endpoint = UrlString.appendQueryString(authority.tokenEndpoint, queryParametersString);
        const requestBody = await this.createTokenRequestBody(request);
        const headers = this.createTokenRequestHeaders({
            credential: request.username,
            type: CcsCredentialType.UPN,
        });
        const thumbprint = {
            clientId: this.config.authOptions.clientId,
            authority: authority.canonicalAuthority,
            scopes: request.scopes,
            claims: request.claims,
            authenticationScheme: request.authenticationScheme,
            resourceRequestMethod: request.resourceRequestMethod,
            resourceRequestUri: request.resourceRequestUri,
            shrClaims: request.shrClaims,
            sshKid: request.sshKid,
        };
        return this.executePostToTokenEndpoint(endpoint, requestBody, headers, thumbprint, request.correlationId);
    }
    /**
     * Generates a map for all the params to be sent to the service
     * @param request - CommonUsernamePasswordRequest provided by the developer
     */
    async createTokenRequestBody(request) {
        const parameterBuilder = new RequestParameterBuilder();
        parameterBuilder.addClientId(this.config.authOptions.clientId);
        parameterBuilder.addUsername(request.username);
        parameterBuilder.addPassword(request.password);
        parameterBuilder.addScopes(request.scopes);
        parameterBuilder.addResponseTypeForTokenAndIdToken();
        parameterBuilder.addGrantType(GrantType.RESOURCE_OWNER_PASSWORD_GRANT);
        parameterBuilder.addClientInfo();
        parameterBuilder.addLibraryInfo(this.config.libraryInfo);
        parameterBuilder.addApplicationTelemetry(this.config.telemetry.application);
        parameterBuilder.addThrottling();
        if (this.serverTelemetryManager) {
            parameterBuilder.addServerTelemetry(this.serverTelemetryManager);
        }
        const correlationId = request.correlationId ||
            this.config.cryptoInterface.createNewGuid();
        parameterBuilder.addCorrelationId(correlationId);
        if (this.config.clientCredentials.clientSecret) {
            parameterBuilder.addClientSecret(this.config.clientCredentials.clientSecret);
        }
        const clientAssertion = this.config.clientCredentials.clientAssertion;
        if (clientAssertion) {
            parameterBuilder.addClientAssertion(await getClientAssertion(clientAssertion.assertion, this.config.authOptions.clientId, request.resourceRequestUri));
            parameterBuilder.addClientAssertionType(clientAssertion.assertionType);
        }
        if (!StringUtils.isEmptyObj(request.claims) ||
            (this.config.authOptions.clientCapabilities &&
                this.config.authOptions.clientCapabilities.length > 0)) {
            parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
        }
        if (this.config.systemOptions.preventCorsPreflight &&
            request.username) {
            parameterBuilder.addCcsUpn(request.username);
        }
        return parameterBuilder.createQueryString();
    }
}

/*! @azure/msal-node v2.16.2 2024-11-19 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Base abstract class for all ClientApplications - public and confidential
 * @public
 */
class ClientApplication {
    /**
     * Constructor for the ClientApplication
     */
    constructor(configuration) {
        this.config = buildAppConfiguration(configuration);
        this.cryptoProvider = new CryptoProvider();
        this.logger = new Logger(this.config.system.loggerOptions, name, version);
        this.storage = new NodeStorage(this.logger, this.config.auth.clientId, this.cryptoProvider, buildStaticAuthorityOptions(this.config.auth));
        this.tokenCache = new TokenCache(this.storage, this.logger, this.config.cache.cachePlugin);
    }
    /**
     * Creates the URL of the authorization request, letting the user input credentials and consent to the
     * application. The URL targets the /authorize endpoint of the authority configured in the
     * application object.
     *
     * Once the user inputs their credentials and consents, the authority will send a response to the redirect URI
     * sent in the request and should contain an authorization code, which can then be used to acquire tokens via
     * `acquireTokenByCode(AuthorizationCodeRequest)`.
     */
    async getAuthCodeUrl(request) {
        this.logger.info("getAuthCodeUrl called", request.correlationId);
        const validRequest = {
            ...request,
            ...(await this.initializeBaseRequest(request)),
            responseMode: request.responseMode || ResponseMode.QUERY,
            authenticationScheme: AuthenticationScheme.BEARER,
        };
        const authClientConfig = await this.buildOauthClientConfiguration(validRequest.authority, validRequest.correlationId, validRequest.redirectUri, undefined, undefined, request.azureCloudOptions);
        const authorizationCodeClient = new AuthorizationCodeClient(authClientConfig);
        this.logger.verbose("Auth code client created", validRequest.correlationId);
        return authorizationCodeClient.getAuthCodeUrl(validRequest);
    }
    /**
     * Acquires a token by exchanging the Authorization Code received from the first step of OAuth2.0
     * Authorization Code flow.
     *
     * `getAuthCodeUrl(AuthorizationCodeUrlRequest)` can be used to create the URL for the first step of OAuth2.0
     * Authorization Code flow. Ensure that values for redirectUri and scopes in AuthorizationCodeUrlRequest and
     * AuthorizationCodeRequest are the same.
     */
    async acquireTokenByCode(request, authCodePayLoad) {
        this.logger.info("acquireTokenByCode called");
        if (request.state && authCodePayLoad) {
            this.logger.info("acquireTokenByCode - validating state");
            this.validateState(request.state, authCodePayLoad.state || "");
            // eslint-disable-next-line no-param-reassign
            authCodePayLoad = { ...authCodePayLoad, state: "" };
        }
        const validRequest = {
            ...request,
            ...(await this.initializeBaseRequest(request)),
            authenticationScheme: AuthenticationScheme.BEARER,
        };
        const serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.acquireTokenByCode, validRequest.correlationId);
        try {
            const authClientConfig = await this.buildOauthClientConfiguration(validRequest.authority, validRequest.correlationId, validRequest.redirectUri, serverTelemetryManager, undefined, request.azureCloudOptions);
            const authorizationCodeClient = new AuthorizationCodeClient(authClientConfig);
            this.logger.verbose("Auth code client created", validRequest.correlationId);
            return await authorizationCodeClient.acquireToken(validRequest, authCodePayLoad);
        }
        catch (e) {
            if (e instanceof AuthError) {
                e.setCorrelationId(validRequest.correlationId);
            }
            serverTelemetryManager.cacheFailedRequest(e);
            throw e;
        }
    }
    /**
     * Acquires a token by exchanging the refresh token provided for a new set of tokens.
     *
     * This API is provided only for scenarios where you would like to migrate from ADAL to MSAL. Otherwise, it is
     * recommended that you use `acquireTokenSilent()` for silent scenarios. When using `acquireTokenSilent()`, MSAL will
     * handle the caching and refreshing of tokens automatically.
     */
    async acquireTokenByRefreshToken(request) {
        this.logger.info("acquireTokenByRefreshToken called", request.correlationId);
        const validRequest = {
            ...request,
            ...(await this.initializeBaseRequest(request)),
            authenticationScheme: AuthenticationScheme.BEARER,
        };
        const serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.acquireTokenByRefreshToken, validRequest.correlationId);
        try {
            const refreshTokenClientConfig = await this.buildOauthClientConfiguration(validRequest.authority, validRequest.correlationId, validRequest.redirectUri || "", serverTelemetryManager, undefined, request.azureCloudOptions);
            const refreshTokenClient = new RefreshTokenClient(refreshTokenClientConfig);
            this.logger.verbose("Refresh token client created", validRequest.correlationId);
            return await refreshTokenClient.acquireToken(validRequest);
        }
        catch (e) {
            if (e instanceof AuthError) {
                e.setCorrelationId(validRequest.correlationId);
            }
            serverTelemetryManager.cacheFailedRequest(e);
            throw e;
        }
    }
    /**
     * Acquires a token silently when a user specifies the account the token is requested for.
     *
     * This API expects the user to provide an account object and looks into the cache to retrieve the token if present.
     * There is also an optional "forceRefresh" boolean the user can send to bypass the cache for access_token and id_token.
     * In case the refresh_token is expired or not found, an error is thrown
     * and the guidance is for the user to call any interactive token acquisition API (eg: `acquireTokenByCode()`).
     */
    async acquireTokenSilent(request) {
        const validRequest = {
            ...request,
            ...(await this.initializeBaseRequest(request)),
            forceRefresh: request.forceRefresh || false,
        };
        const serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.acquireTokenSilent, validRequest.correlationId, validRequest.forceRefresh);
        try {
            const silentFlowClientConfig = await this.buildOauthClientConfiguration(validRequest.authority, validRequest.correlationId, validRequest.redirectUri || "", serverTelemetryManager, undefined, request.azureCloudOptions);
            const silentFlowClient = new SilentFlowClient(silentFlowClientConfig);
            this.logger.verbose("Silent flow client created", validRequest.correlationId);
            return await silentFlowClient.acquireToken(validRequest);
        }
        catch (e) {
            if (e instanceof AuthError) {
                e.setCorrelationId(validRequest.correlationId);
            }
            serverTelemetryManager.cacheFailedRequest(e);
            throw e;
        }
    }
    /**
     * Acquires tokens with password grant by exchanging client applications username and password for credentials
     *
     * The latest OAuth 2.0 Security Best Current Practice disallows the password grant entirely.
     * More details on this recommendation at https://tools.ietf.org/html/draft-ietf-oauth-security-topics-13#section-3.4
     * Microsoft's documentation and recommendations are at:
     * https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-authentication-flows#usernamepassword
     *
     * @param request - UsenamePasswordRequest
     */
    async acquireTokenByUsernamePassword(request) {
        this.logger.info("acquireTokenByUsernamePassword called", request.correlationId);
        const validRequest = {
            ...request,
            ...(await this.initializeBaseRequest(request)),
        };
        const serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.acquireTokenByUsernamePassword, validRequest.correlationId);
        try {
            const usernamePasswordClientConfig = await this.buildOauthClientConfiguration(validRequest.authority, validRequest.correlationId, "", serverTelemetryManager, undefined, request.azureCloudOptions);
            const usernamePasswordClient = new UsernamePasswordClient(usernamePasswordClientConfig);
            this.logger.verbose("Username password client created", validRequest.correlationId);
            return await usernamePasswordClient.acquireToken(validRequest);
        }
        catch (e) {
            if (e instanceof AuthError) {
                e.setCorrelationId(validRequest.correlationId);
            }
            serverTelemetryManager.cacheFailedRequest(e);
            throw e;
        }
    }
    /**
     * Gets the token cache for the application.
     */
    getTokenCache() {
        this.logger.info("getTokenCache called");
        return this.tokenCache;
    }
    /**
     * Validates OIDC state by comparing the user cached state with the state received from the server.
     *
     * This API is provided for scenarios where you would use OAuth2.0 state parameter to mitigate against
     * CSRF attacks.
     * For more information about state, visit https://datatracker.ietf.org/doc/html/rfc6819#section-3.6.
     * @param state - Unique GUID generated by the user that is cached by the user and sent to the server during the first leg of the flow
     * @param cachedState - This string is sent back by the server with the authorization code
     */
    validateState(state, cachedState) {
        if (!state) {
            throw NodeAuthError.createStateNotFoundError();
        }
        if (state !== cachedState) {
            throw createClientAuthError(stateMismatch);
        }
    }
    /**
     * Returns the logger instance
     */
    getLogger() {
        return this.logger;
    }
    /**
     * Replaces the default logger set in configurations with new Logger with new configurations
     * @param logger - Logger instance
     */
    setLogger(logger) {
        this.logger = logger;
    }
    /**
     * Builds the common configuration to be passed to the common component based on the platform configurarion
     * @param authority - user passed authority in configuration
     * @param serverTelemetryManager - initializes servertelemetry if passed
     */
    async buildOauthClientConfiguration(authority, requestCorrelationId, redirectUri, serverTelemetryManager, azureRegionConfiguration, azureCloudOptions) {
        this.logger.verbose("buildOauthClientConfiguration called", requestCorrelationId);
        // precedence - azureCloudInstance + tenant >> authority and request  >> config
        const userAzureCloudOptions = azureCloudOptions
            ? azureCloudOptions
            : this.config.auth.azureCloudOptions;
        // using null assertion operator as we ensure that all config values have default values in buildConfiguration()
        const discoveredAuthority = await this.createAuthority(authority, requestCorrelationId, azureRegionConfiguration, userAzureCloudOptions);
        this.logger.info(`Building oauth client configuration with the following authority: ${discoveredAuthority.tokenEndpoint}.`, requestCorrelationId);
        serverTelemetryManager?.updateRegionDiscoveryMetadata(discoveredAuthority.regionDiscoveryMetadata);
        const clientConfiguration = {
            authOptions: {
                clientId: this.config.auth.clientId,
                authority: discoveredAuthority,
                clientCapabilities: this.config.auth.clientCapabilities,
                redirectUri,
            },
            loggerOptions: {
                logLevel: this.config.system.loggerOptions.logLevel,
                loggerCallback: this.config.system.loggerOptions.loggerCallback,
                piiLoggingEnabled: this.config.system.loggerOptions.piiLoggingEnabled,
                correlationId: requestCorrelationId,
            },
            cacheOptions: {
                claimsBasedCachingEnabled: this.config.cache.claimsBasedCachingEnabled,
            },
            cryptoInterface: this.cryptoProvider,
            networkInterface: this.config.system.networkClient,
            storageInterface: this.storage,
            serverTelemetryManager: serverTelemetryManager,
            clientCredentials: {
                clientSecret: this.clientSecret,
                clientAssertion: await this.getClientAssertion(discoveredAuthority),
            },
            libraryInfo: {
                sku: Constants.MSAL_SKU,
                version: version,
                cpu: process.arch || Constants$1.EMPTY_STRING,
                os: process.platform || Constants$1.EMPTY_STRING,
            },
            telemetry: this.config.telemetry,
            persistencePlugin: this.config.cache.cachePlugin,
            serializableCache: this.tokenCache,
        };
        return clientConfiguration;
    }
    async getClientAssertion(authority) {
        if (this.developerProvidedClientAssertion) {
            this.clientAssertion = ClientAssertion.fromAssertion(await getClientAssertion(this.developerProvidedClientAssertion, this.config.auth.clientId, authority.tokenEndpoint));
        }
        return (this.clientAssertion && {
            assertion: this.clientAssertion.getJwt(this.cryptoProvider, this.config.auth.clientId, authority.tokenEndpoint),
            assertionType: Constants.JWT_BEARER_ASSERTION_TYPE,
        });
    }
    /**
     * Generates a request with the default scopes & generates a correlationId.
     * @param authRequest - BaseAuthRequest for initialization
     */
    async initializeBaseRequest(authRequest) {
        this.logger.verbose("initializeRequestScopes called", authRequest.correlationId);
        // Default authenticationScheme to Bearer, log that POP isn't supported yet
        if (authRequest.authenticationScheme &&
            authRequest.authenticationScheme === AuthenticationScheme.POP) {
            this.logger.verbose("Authentication Scheme 'pop' is not supported yet, setting Authentication Scheme to 'Bearer' for request", authRequest.correlationId);
        }
        authRequest.authenticationScheme = AuthenticationScheme.BEARER;
        // Set requested claims hash if claims-based caching is enabled and claims were requested
        if (this.config.cache.claimsBasedCachingEnabled &&
            authRequest.claims &&
            // Checks for empty stringified object "{}" which doesn't qualify as requested claims
            !StringUtils.isEmptyObj(authRequest.claims)) {
            authRequest.requestedClaimsHash =
                await this.cryptoProvider.hashString(authRequest.claims);
        }
        return {
            ...authRequest,
            scopes: [
                ...((authRequest && authRequest.scopes) || []),
                ...OIDC_DEFAULT_SCOPES,
            ],
            correlationId: (authRequest && authRequest.correlationId) ||
                this.cryptoProvider.createNewGuid(),
            authority: authRequest.authority || this.config.auth.authority,
        };
    }
    /**
     * Initializes the server telemetry payload
     * @param apiId - Id for a specific request
     * @param correlationId - GUID
     * @param forceRefresh - boolean to indicate network call
     */
    initializeServerTelemetryManager(apiId, correlationId, forceRefresh) {
        const telemetryPayload = {
            clientId: this.config.auth.clientId,
            correlationId: correlationId,
            apiId: apiId,
            forceRefresh: forceRefresh || false,
        };
        return new ServerTelemetryManager(telemetryPayload, this.storage);
    }
    /**
     * Create authority instance. If authority not passed in request, default to authority set on the application
     * object. If no authority set in application object, then default to common authority.
     * @param authorityString - authority from user configuration
     */
    async createAuthority(authorityString, requestCorrelationId, azureRegionConfiguration, azureCloudOptions) {
        this.logger.verbose("createAuthority called", requestCorrelationId);
        // build authority string based on auth params - azureCloudInstance is prioritized if provided
        const authorityUrl = Authority.generateAuthority(authorityString, azureCloudOptions);
        const authorityOptions = {
            protocolMode: this.config.auth.protocolMode,
            knownAuthorities: this.config.auth.knownAuthorities,
            cloudDiscoveryMetadata: this.config.auth.cloudDiscoveryMetadata,
            authorityMetadata: this.config.auth.authorityMetadata,
            azureRegionConfiguration,
            skipAuthorityMetadataCache: this.config.auth.skipAuthorityMetadataCache,
        };
        return createDiscoveredInstance(authorityUrl, this.config.system.networkClient, this.storage, authorityOptions, this.logger, requestCorrelationId);
    }
    /**
     * Clear the cache
     */
    clearCache() {
        this.storage.clear();
    }
}

/*! @azure/msal-node v2.16.2 2024-11-19 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * OAuth2.0 client credential grant
 * @public
 */
class ClientCredentialClient extends BaseClient {
    constructor(configuration, appTokenProvider) {
        super(configuration);
        this.appTokenProvider = appTokenProvider;
    }
    /**
     * Public API to acquire a token with ClientCredential Flow for Confidential clients
     * @param request - CommonClientCredentialRequest provided by the developer
     */
    async acquireToken(request) {
        if (request.skipCache || request.claims) {
            return this.executeTokenRequest(request, this.authority);
        }
        const [cachedAuthenticationResult, lastCacheOutcome] = await this.getCachedAuthenticationResult(request, this.config, this.cryptoUtils, this.authority, this.cacheManager, this.serverTelemetryManager);
        if (cachedAuthenticationResult) {
            // if the token is not expired but must be refreshed; get a new one in the background
            if (lastCacheOutcome === CacheOutcome.PROACTIVELY_REFRESHED) {
                this.logger.info("ClientCredentialClient:getCachedAuthenticationResult - Cached access token's refreshOn property has been exceeded'. It's not expired, but must be refreshed.");
                // refresh the access token in the background
                const refreshAccessToken = true;
                await this.executeTokenRequest(request, this.authority, refreshAccessToken);
            }
            // return the cached token
            return cachedAuthenticationResult;
        }
        else {
            return this.executeTokenRequest(request, this.authority);
        }
    }
    /**
     * looks up cache if the tokens are cached already
     */
    async getCachedAuthenticationResult(request, config, cryptoUtils, authority, cacheManager, serverTelemetryManager) {
        const clientConfiguration = config;
        const managedIdentityConfiguration = config;
        let lastCacheOutcome = CacheOutcome.NOT_APPLICABLE;
        // read the user-supplied cache into memory, if applicable
        let cacheContext;
        if (clientConfiguration.serializableCache &&
            clientConfiguration.persistencePlugin) {
            cacheContext = new TokenCacheContext(clientConfiguration.serializableCache, false);
            await clientConfiguration.persistencePlugin.beforeCacheAccess(cacheContext);
        }
        const cachedAccessToken = this.readAccessTokenFromCache(authority, managedIdentityConfiguration.managedIdentityId?.id ||
            clientConfiguration.authOptions.clientId, new ScopeSet(request.scopes || []), cacheManager);
        if (clientConfiguration.serializableCache &&
            clientConfiguration.persistencePlugin &&
            cacheContext) {
            await clientConfiguration.persistencePlugin.afterCacheAccess(cacheContext);
        }
        // must refresh due to non-existent access_token
        if (!cachedAccessToken) {
            serverTelemetryManager?.setCacheOutcome(CacheOutcome.NO_CACHED_ACCESS_TOKEN);
            return [null, CacheOutcome.NO_CACHED_ACCESS_TOKEN];
        }
        // must refresh due to the expires_in value
        if (isTokenExpired(cachedAccessToken.expiresOn, clientConfiguration.systemOptions?.tokenRenewalOffsetSeconds ||
            DEFAULT_TOKEN_RENEWAL_OFFSET_SEC)) {
            serverTelemetryManager?.setCacheOutcome(CacheOutcome.CACHED_ACCESS_TOKEN_EXPIRED);
            return [null, CacheOutcome.CACHED_ACCESS_TOKEN_EXPIRED];
        }
        // must refresh (in the background) due to the refresh_in value
        if (cachedAccessToken.refreshOn &&
            isTokenExpired(cachedAccessToken.refreshOn.toString(), 0)) {
            lastCacheOutcome = CacheOutcome.PROACTIVELY_REFRESHED;
            serverTelemetryManager?.setCacheOutcome(CacheOutcome.PROACTIVELY_REFRESHED);
        }
        return [
            await ResponseHandler.generateAuthenticationResult(cryptoUtils, authority, {
                account: null,
                idToken: null,
                accessToken: cachedAccessToken,
                refreshToken: null,
                appMetadata: null,
            }, true, request),
            lastCacheOutcome,
        ];
    }
    /**
     * Reads access token from the cache
     */
    readAccessTokenFromCache(authority, id, scopeSet, cacheManager) {
        const accessTokenFilter = {
            homeAccountId: Constants$1.EMPTY_STRING,
            environment: authority.canonicalAuthorityUrlComponents.HostNameAndPort,
            credentialType: CredentialType.ACCESS_TOKEN,
            clientId: id,
            realm: authority.tenant,
            target: ScopeSet.createSearchScopes(scopeSet.asArray()),
        };
        const accessTokens = cacheManager.getAccessTokensByFilter(accessTokenFilter);
        if (accessTokens.length < 1) {
            return null;
        }
        else if (accessTokens.length > 1) {
            throw createClientAuthError(multipleMatchingTokens);
        }
        return accessTokens[0];
    }
    /**
     * Makes a network call to request the token from the service
     * @param request - CommonClientCredentialRequest provided by the developer
     * @param authority - authority object
     */
    async executeTokenRequest(request, authority, refreshAccessToken) {
        let serverTokenResponse;
        let reqTimestamp;
        if (this.appTokenProvider) {
            this.logger.info("Using appTokenProvider extensibility.");
            const appTokenPropviderParameters = {
                correlationId: request.correlationId,
                tenantId: this.config.authOptions.authority.tenant,
                scopes: request.scopes,
                claims: request.claims,
            };
            reqTimestamp = nowSeconds();
            const appTokenProviderResult = await this.appTokenProvider(appTokenPropviderParameters);
            serverTokenResponse = {
                access_token: appTokenProviderResult.accessToken,
                expires_in: appTokenProviderResult.expiresInSeconds,
                refresh_in: appTokenProviderResult.refreshInSeconds,
                token_type: AuthenticationScheme.BEARER,
            };
        }
        else {
            const queryParametersString = this.createTokenQueryParameters(request);
            const endpoint = UrlString.appendQueryString(authority.tokenEndpoint, queryParametersString);
            const requestBody = await this.createTokenRequestBody(request);
            const headers = this.createTokenRequestHeaders();
            const thumbprint = {
                clientId: this.config.authOptions.clientId,
                authority: request.authority,
                scopes: request.scopes,
                claims: request.claims,
                authenticationScheme: request.authenticationScheme,
                resourceRequestMethod: request.resourceRequestMethod,
                resourceRequestUri: request.resourceRequestUri,
                shrClaims: request.shrClaims,
                sshKid: request.sshKid,
            };
            this.logger.info("Sending token request to endpoint: " + authority.tokenEndpoint);
            reqTimestamp = nowSeconds();
            const response = await this.executePostToTokenEndpoint(endpoint, requestBody, headers, thumbprint, request.correlationId);
            serverTokenResponse = response.body;
            serverTokenResponse.status = response.status;
        }
        const responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin);
        responseHandler.validateTokenResponse(serverTokenResponse, refreshAccessToken);
        const tokenResponse = await responseHandler.handleServerTokenResponse(serverTokenResponse, this.authority, reqTimestamp, request);
        return tokenResponse;
    }
    /**
     * generate the request to the server in the acceptable format
     * @param request - CommonClientCredentialRequest provided by the developer
     */
    async createTokenRequestBody(request) {
        const parameterBuilder = new RequestParameterBuilder();
        parameterBuilder.addClientId(this.config.authOptions.clientId);
        parameterBuilder.addScopes(request.scopes, false);
        parameterBuilder.addGrantType(GrantType.CLIENT_CREDENTIALS_GRANT);
        parameterBuilder.addLibraryInfo(this.config.libraryInfo);
        parameterBuilder.addApplicationTelemetry(this.config.telemetry.application);
        parameterBuilder.addThrottling();
        if (this.serverTelemetryManager) {
            parameterBuilder.addServerTelemetry(this.serverTelemetryManager);
        }
        const correlationId = request.correlationId ||
            this.config.cryptoInterface.createNewGuid();
        parameterBuilder.addCorrelationId(correlationId);
        if (this.config.clientCredentials.clientSecret) {
            parameterBuilder.addClientSecret(this.config.clientCredentials.clientSecret);
        }
        // Use clientAssertion from request, fallback to client assertion in base configuration
        const clientAssertion = request.clientAssertion ||
            this.config.clientCredentials.clientAssertion;
        if (clientAssertion) {
            parameterBuilder.addClientAssertion(await getClientAssertion(clientAssertion.assertion, this.config.authOptions.clientId, request.resourceRequestUri));
            parameterBuilder.addClientAssertionType(clientAssertion.assertionType);
        }
        if (!StringUtils.isEmptyObj(request.claims) ||
            (this.config.authOptions.clientCapabilities &&
                this.config.authOptions.clientCapabilities.length > 0)) {
            parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
        }
        return parameterBuilder.createQueryString();
    }
}

/*! @azure/msal-node v2.16.2 2024-11-19 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * On-Behalf-Of client
 * @public
 */
class OnBehalfOfClient extends BaseClient {
    constructor(configuration) {
        super(configuration);
    }
    /**
     * Public API to acquire tokens with on behalf of flow
     * @param request - developer provided CommonOnBehalfOfRequest
     */
    async acquireToken(request) {
        this.scopeSet = new ScopeSet(request.scopes || []);
        // generate the user_assertion_hash for OBOAssertion
        this.userAssertionHash = await this.cryptoUtils.hashString(request.oboAssertion);
        if (request.skipCache || request.claims) {
            return this.executeTokenRequest(request, this.authority, this.userAssertionHash);
        }
        try {
            return await this.getCachedAuthenticationResult(request);
        }
        catch (e) {
            // Any failure falls back to interactive request, once we implement distributed cache, we plan to handle `createRefreshRequiredError` to refresh using the RT
            return await this.executeTokenRequest(request, this.authority, this.userAssertionHash);
        }
    }
    /**
     * look up cache for tokens
     * Find idtoken in the cache
     * Find accessToken based on user assertion and account info in the cache
     * Please note we are not yet supported OBO tokens refreshed with long lived RT. User will have to send a new assertion if the current access token expires
     * This is to prevent security issues when the assertion changes over time, however, longlived RT helps retaining the session
     * @param request - developer provided CommonOnBehalfOfRequest
     */
    async getCachedAuthenticationResult(request) {
        // look in the cache for the access_token which matches the incoming_assertion
        const cachedAccessToken = this.readAccessTokenFromCacheForOBO(this.config.authOptions.clientId, request);
        if (!cachedAccessToken) {
            // Must refresh due to non-existent access_token.
            this.serverTelemetryManager?.setCacheOutcome(CacheOutcome.NO_CACHED_ACCESS_TOKEN);
            this.logger.info("SilentFlowClient:acquireCachedToken - No access token found in cache for the given properties.");
            throw createClientAuthError(tokenRefreshRequired);
        }
        else if (isTokenExpired(cachedAccessToken.expiresOn, this.config.systemOptions.tokenRenewalOffsetSeconds)) {
            // Access token expired, will need to renewed
            this.serverTelemetryManager?.setCacheOutcome(CacheOutcome.CACHED_ACCESS_TOKEN_EXPIRED);
            this.logger.info(`OnbehalfofFlow:getCachedAuthenticationResult - Cached access token is expired or will expire within ${this.config.systemOptions.tokenRenewalOffsetSeconds} seconds.`);
            throw createClientAuthError(tokenRefreshRequired);
        }
        // fetch the idToken from cache
        const cachedIdToken = this.readIdTokenFromCacheForOBO(cachedAccessToken.homeAccountId);
        let idTokenClaims;
        let cachedAccount = null;
        if (cachedIdToken) {
            idTokenClaims = extractTokenClaims(cachedIdToken.secret, EncodingUtils.base64Decode);
            const localAccountId = idTokenClaims.oid || idTokenClaims.sub;
            const accountInfo = {
                homeAccountId: cachedIdToken.homeAccountId,
                environment: cachedIdToken.environment,
                tenantId: cachedIdToken.realm,
                username: Constants$1.EMPTY_STRING,
                localAccountId: localAccountId || Constants$1.EMPTY_STRING,
            };
            cachedAccount = this.cacheManager.readAccountFromCache(accountInfo);
        }
        // increment telemetry cache hit counter
        if (this.config.serverTelemetryManager) {
            this.config.serverTelemetryManager.incrementCacheHits();
        }
        return ResponseHandler.generateAuthenticationResult(this.cryptoUtils, this.authority, {
            account: cachedAccount,
            accessToken: cachedAccessToken,
            idToken: cachedIdToken,
            refreshToken: null,
            appMetadata: null,
        }, true, request, idTokenClaims);
    }
    /**
     * read idtoken from cache, this is a specific implementation for OBO as the requirements differ from a generic lookup in the cacheManager
     * Certain use cases of OBO flow do not expect an idToken in the cache/or from the service
     * @param atHomeAccountId - account id
     */
    readIdTokenFromCacheForOBO(atHomeAccountId) {
        const idTokenFilter = {
            homeAccountId: atHomeAccountId,
            environment: this.authority.canonicalAuthorityUrlComponents.HostNameAndPort,
            credentialType: CredentialType.ID_TOKEN,
            clientId: this.config.authOptions.clientId,
            realm: this.authority.tenant,
        };
        const idTokenMap = this.cacheManager.getIdTokensByFilter(idTokenFilter);
        // When acquiring a token on behalf of an application, there might not be an id token in the cache
        if (Object.values(idTokenMap).length < 1) {
            return null;
        }
        return Object.values(idTokenMap)[0];
    }
    /**
     * Fetches the cached access token based on incoming assertion
     * @param clientId - client id
     * @param request - developer provided CommonOnBehalfOfRequest
     */
    readAccessTokenFromCacheForOBO(clientId, request) {
        const authScheme = request.authenticationScheme || AuthenticationScheme.BEARER;
        /*
         * Distinguish between Bearer and PoP/SSH token cache types
         * Cast to lowercase to handle "bearer" from ADFS
         */
        const credentialType = authScheme &&
            authScheme.toLowerCase() !==
                AuthenticationScheme.BEARER.toLowerCase()
            ? CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME
            : CredentialType.ACCESS_TOKEN;
        const accessTokenFilter = {
            credentialType: credentialType,
            clientId,
            target: ScopeSet.createSearchScopes(this.scopeSet.asArray()),
            tokenType: authScheme,
            keyId: request.sshKid,
            requestedClaimsHash: request.requestedClaimsHash,
            userAssertionHash: this.userAssertionHash,
        };
        const accessTokens = this.cacheManager.getAccessTokensByFilter(accessTokenFilter);
        const numAccessTokens = accessTokens.length;
        if (numAccessTokens < 1) {
            return null;
        }
        else if (numAccessTokens > 1) {
            throw createClientAuthError(multipleMatchingTokens);
        }
        return accessTokens[0];
    }
    /**
     * Make a network call to the server requesting credentials
     * @param request - developer provided CommonOnBehalfOfRequest
     * @param authority - authority object
     */
    async executeTokenRequest(request, authority, userAssertionHash) {
        const queryParametersString = this.createTokenQueryParameters(request);
        const endpoint = UrlString.appendQueryString(authority.tokenEndpoint, queryParametersString);
        const requestBody = await this.createTokenRequestBody(request);
        const headers = this.createTokenRequestHeaders();
        const thumbprint = {
            clientId: this.config.authOptions.clientId,
            authority: request.authority,
            scopes: request.scopes,
            claims: request.claims,
            authenticationScheme: request.authenticationScheme,
            resourceRequestMethod: request.resourceRequestMethod,
            resourceRequestUri: request.resourceRequestUri,
            shrClaims: request.shrClaims,
            sshKid: request.sshKid,
        };
        const reqTimestamp = nowSeconds();
        const response = await this.executePostToTokenEndpoint(endpoint, requestBody, headers, thumbprint, request.correlationId);
        const responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin);
        responseHandler.validateTokenResponse(response.body);
        const tokenResponse = await responseHandler.handleServerTokenResponse(response.body, this.authority, reqTimestamp, request, undefined, userAssertionHash);
        return tokenResponse;
    }
    /**
     * generate a server request in accepable format
     * @param request - developer provided CommonOnBehalfOfRequest
     */
    async createTokenRequestBody(request) {
        const parameterBuilder = new RequestParameterBuilder();
        parameterBuilder.addClientId(this.config.authOptions.clientId);
        parameterBuilder.addScopes(request.scopes);
        parameterBuilder.addGrantType(GrantType.JWT_BEARER);
        parameterBuilder.addClientInfo();
        parameterBuilder.addLibraryInfo(this.config.libraryInfo);
        parameterBuilder.addApplicationTelemetry(this.config.telemetry.application);
        parameterBuilder.addThrottling();
        if (this.serverTelemetryManager) {
            parameterBuilder.addServerTelemetry(this.serverTelemetryManager);
        }
        const correlationId = request.correlationId ||
            this.config.cryptoInterface.createNewGuid();
        parameterBuilder.addCorrelationId(correlationId);
        parameterBuilder.addRequestTokenUse(ON_BEHALF_OF);
        parameterBuilder.addOboAssertion(request.oboAssertion);
        if (this.config.clientCredentials.clientSecret) {
            parameterBuilder.addClientSecret(this.config.clientCredentials.clientSecret);
        }
        const clientAssertion = this.config.clientCredentials.clientAssertion;
        if (clientAssertion) {
            parameterBuilder.addClientAssertion(await getClientAssertion(clientAssertion.assertion, this.config.authOptions.clientId, request.resourceRequestUri));
            parameterBuilder.addClientAssertionType(clientAssertion.assertionType);
        }
        if (request.claims ||
            (this.config.authOptions.clientCapabilities &&
                this.config.authOptions.clientCapabilities.length > 0)) {
            parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
        }
        return parameterBuilder.createQueryString();
    }
}

/*! @azure/msal-node v2.16.2 2024-11-19 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
// AADAuthorityConstants
/**
 *  This class is to be used to acquire tokens for confidential client applications (webApp, webAPI). Confidential client applications
 *  will configure application secrets, client certificates/assertions as applicable
 * @public
 */
class ConfidentialClientApplication extends ClientApplication {
    /**
     * Constructor for the ConfidentialClientApplication
     *
     * Required attributes in the Configuration object are:
     * - clientID: the application ID of your application. You can obtain one by registering your application with our application registration portal
     * - authority: the authority URL for your application.
     * - client credential: Must set either client secret, certificate, or assertion for confidential clients. You can obtain a client secret from the application registration portal.
     *
     * In Azure AD, authority is a URL indicating of the form https://login.microsoftonline.com/\{Enter_the_Tenant_Info_Here\}.
     * If your application supports Accounts in one organizational directory, replace "Enter_the_Tenant_Info_Here" value with the Tenant Id or Tenant name (for example, contoso.microsoft.com).
     * If your application supports Accounts in any organizational directory, replace "Enter_the_Tenant_Info_Here" value with organizations.
     * If your application supports Accounts in any organizational directory and personal Microsoft accounts, replace "Enter_the_Tenant_Info_Here" value with common.
     * To restrict support to Personal Microsoft accounts only, replace "Enter_the_Tenant_Info_Here" value with consumers.
     *
     * In Azure B2C, authority is of the form https://\{instance\}/tfp/\{tenant\}/\{policyName\}/
     * Full B2C functionality will be available in this library in future versions.
     *
     * @param Configuration - configuration object for the MSAL ConfidentialClientApplication instance
     */
    constructor(configuration) {
        super(configuration);
        this.setClientCredential();
        this.appTokenProvider = undefined;
    }
    /**
     * This extensibility point only works for the client_credential flow, i.e. acquireTokenByClientCredential and
     * is meant for Azure SDK to enhance Managed Identity support.
     *
     * @param IAppTokenProvider  - Extensibility interface, which allows the app developer to return a token from a custom source.
     */
    SetAppTokenProvider(provider) {
        this.appTokenProvider = provider;
    }
    /**
     * Acquires tokens from the authority for the application (not for an end user).
     */
    async acquireTokenByClientCredential(request) {
        this.logger.info("acquireTokenByClientCredential called", request.correlationId);
        // If there is a client assertion present in the request, it overrides the one present in the client configuration
        let clientAssertion;
        if (request.clientAssertion) {
            clientAssertion = {
                assertion: await getClientAssertion(request.clientAssertion, this.config.auth.clientId
                // tokenEndpoint will be undefined. resourceRequestUri is omitted in ClientCredentialRequest
                ),
                assertionType: Constants.JWT_BEARER_ASSERTION_TYPE,
            };
        }
        const baseRequest = await this.initializeBaseRequest(request);
        // valid base request should not contain oidc scopes in this grant type
        const validBaseRequest = {
            ...baseRequest,
            scopes: baseRequest.scopes.filter((scope) => !OIDC_DEFAULT_SCOPES.includes(scope)),
        };
        const validRequest = {
            ...request,
            ...validBaseRequest,
            clientAssertion,
        };
        /*
         * valid request should not have "common" or "organizations" in lieu of the tenant_id in the authority in the auth configuration
         * example authority: "https://login.microsoftonline.com/TenantId",
         */
        const authority = new UrlString(validRequest.authority);
        const tenantId = authority.getUrlComponents().PathSegments[0];
        if (Object.values(AADAuthorityConstants).includes(tenantId)) {
            throw createClientAuthError(missingTenantIdError);
        }
        /*
         * if this env variable is set, and the developer provided region isn't defined and isn't "DisableMsalForceRegion",
         * MSAL shall opt-in to ESTS-R with the value of this variable
         */
        const ENV_MSAL_FORCE_REGION = process.env[MSAL_FORCE_REGION];
        let region;
        if (validRequest.azureRegion !== "DisableMsalForceRegion") {
            if (!validRequest.azureRegion && ENV_MSAL_FORCE_REGION) {
                region = ENV_MSAL_FORCE_REGION;
            }
            else {
                region = validRequest.azureRegion;
            }
        }
        const azureRegionConfiguration = {
            azureRegion: region,
            environmentRegion: process.env[REGION_ENVIRONMENT_VARIABLE],
        };
        const serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.acquireTokenByClientCredential, validRequest.correlationId, validRequest.skipCache);
        try {
            const clientCredentialConfig = await this.buildOauthClientConfiguration(validRequest.authority, validRequest.correlationId, "", serverTelemetryManager, azureRegionConfiguration, request.azureCloudOptions);
            const clientCredentialClient = new ClientCredentialClient(clientCredentialConfig, this.appTokenProvider);
            this.logger.verbose("Client credential client created", validRequest.correlationId);
            return await clientCredentialClient.acquireToken(validRequest);
        }
        catch (e) {
            if (e instanceof AuthError) {
                e.setCorrelationId(validRequest.correlationId);
            }
            serverTelemetryManager.cacheFailedRequest(e);
            throw e;
        }
    }
    /**
     * Acquires tokens from the authority for the application.
     *
     * Used in scenarios where the current app is a middle-tier service which was called with a token
     * representing an end user. The current app can use the token (oboAssertion) to request another
     * token to access downstream web API, on behalf of that user.
     *
     * The current middle-tier app has no user interaction to obtain consent.
     * See how to gain consent upfront for your middle-tier app from this article.
     * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow#gaining-consent-for-the-middle-tier-application
     */
    async acquireTokenOnBehalfOf(request) {
        this.logger.info("acquireTokenOnBehalfOf called", request.correlationId);
        const validRequest = {
            ...request,
            ...(await this.initializeBaseRequest(request)),
        };
        try {
            const onBehalfOfConfig = await this.buildOauthClientConfiguration(validRequest.authority, validRequest.correlationId, "", undefined, undefined, request.azureCloudOptions);
            const oboClient = new OnBehalfOfClient(onBehalfOfConfig);
            this.logger.verbose("On behalf of client created", validRequest.correlationId);
            return await oboClient.acquireToken(validRequest);
        }
        catch (e) {
            if (e instanceof AuthError) {
                e.setCorrelationId(validRequest.correlationId);
            }
            throw e;
        }
    }
    setClientCredential() {
        const clientSecretNotEmpty = !!this.config.auth.clientSecret;
        const clientAssertionNotEmpty = !!this.config.auth.clientAssertion;
        const certificateNotEmpty = (!!this.config.auth.clientCertificate?.thumbprint ||
            !!this.config.auth.clientCertificate?.thumbprintSha256) &&
            !!this.config.auth.clientCertificate?.privateKey;
        /*
         * If app developer configures this callback, they don't need a credential
         * i.e. AzureSDK can get token from Managed Identity without a cert / secret
         */
        if (this.appTokenProvider) {
            return;
        }
        // Check that at most one credential is set on the application
        if ((clientSecretNotEmpty && clientAssertionNotEmpty) ||
            (clientAssertionNotEmpty && certificateNotEmpty) ||
            (clientSecretNotEmpty && certificateNotEmpty)) {
            throw createClientAuthError(invalidClientCredential);
        }
        if (this.config.auth.clientSecret) {
            this.clientSecret = this.config.auth.clientSecret;
            return;
        }
        if (this.config.auth.clientAssertion) {
            this.developerProvidedClientAssertion =
                this.config.auth.clientAssertion;
            return;
        }
        if (!certificateNotEmpty) {
            throw createClientAuthError(invalidClientCredential);
        }
        else {
            this.clientAssertion = !!this.config.auth.clientCertificate
                .thumbprintSha256
                ? ClientAssertion.fromCertificateWithSha256Thumbprint(this.config.auth.clientCertificate.thumbprintSha256, this.config.auth.clientCertificate.privateKey, this.config.auth.clientCertificate.x5c)
                : ClientAssertion.fromCertificate(
                // guaranteed to be a string, due to prior error checking in this function
                this.config.auth.clientCertificate.thumbprint, this.config.auth.clientCertificate.privateKey, this.config.auth.clientCertificate.x5c);
        }
    }
}

/*! @azure/msal-node v2.16.2 2024-11-19 */
({
    win32: `${process.env["ProgramData"]}\\AzureConnectedMachineAgent\\Tokens\\`,
    linux: "/var/opt/azcmagent/tokens/",
});
({
    win32: `${process.env["ProgramFiles"]}\\AzureConnectedMachineAgent\\himds.exe`,
    linux: "/opt/azcmagent/bin/himds",
});

const dev = DEV;
const CLOUD_INSTANCE = "https://login.microsoftonline.com/";
const TENANT_ID = "2b197efa-8e1b-4680-b263-8e237889b5b3";
const CLIENT_ID = "6bb0b1c4-c7cc-498c-86cb-3ee0b71d03a0";
const CLIENT_SECRET = "nKd8Q~5mRS6dDL~rVjDrKLazChW9eIPnyfGTxdh9";
const REDIRECT_URI = "https://webapp_flagfrenzy.at/callback";
const msalConfig = {
  auth: {
    clientId: CLIENT_ID,
    authority: CLOUD_INSTANCE + TENANT_ID,
    clientSecret: CLIENT_SECRET
  }
};
const msalInstance = new ConfidentialClientApplication(msalConfig);
const cryptoProvider = new CryptoProvider();
const cookiesConfig = {
  httpOnly: true,
  path: "/",
  secure: !dev
};
const redirectToAuthCodeUrl = async (event) => {
  const { verifier, challenge } = await cryptoProvider.generatePkceCodes();
  const pkceCodes = {
    challengeMethod: "S256",
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
    event.cookies.set("pkceVerifier", verifier, cookiesConfig);
    event.cookies.set("csrfToken", csrfToken, cookiesConfig);
    return authCodeUrl;
  } catch (err) {
    console.log(err);
  }
};
const getUserInfo = async (accessToken) => {
  const url = "https://graph.microsoft.com/v1.0/me";
  const headers = {
    "Authorization": `Bearer ${accessToken}`
  };
  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      console.log(await response.text());
      throw new Error(`Failed to fetch user info: ${response.status}`);
    }
    let jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user info");
  }
};
const getTokens = async (event) => {
  const state = event.url.searchParams.get("state");
  if (state) {
    const decodedState = JSON.parse(cryptoProvider.base64Decode(state));
    const csrfToken = event.cookies.get("csrfToken");
    if (decodedState.csrfToken === csrfToken) {
      const code = event.url.searchParams.get("code");
      const error = event.url.searchParams.get("error");
      if (code) {
        const authCodeRequest = {
          redirectUri: REDIRECT_URI,
          code,
          scopes: [],
          codeVerifier: event.cookies.get("pkceVerifier")
        };
        try {
          const tokenResponse = await msalInstance.acquireTokenByCode(authCodeRequest);
          event.cookies.set("accessToken", tokenResponse.accessToken, cookiesConfig);
          console.log("Access Token:", tokenResponse.accessToken);
          const userInfo = await getUserInfo(tokenResponse.accessToken);
          console.log("User Info:", userInfo);
          return decodedState.redirectTo || "/";
        } catch (err) {
          console.log(err);
          throw new Error("Token acquisition failed");
        }
      } else if (error) {
        throw new Error(error);
      }
    } else {
      throw new Error("CSRF token mismatch");
    }
  } else {
    throw new Error("State parameter missing");
  }
  return null;
};
const getLogoutUri = () => {
  return `${msalConfig.auth.authority}/oauth2/v2.0/logout`;
};

export { getTokens as a, getLogoutUri as b, getUserInfo as g, redirectToAuthCodeUrl as r };
//# sourceMappingURL=services-CO3_SkFM.js.map
