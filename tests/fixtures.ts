import {
  APIRequestContext,
  expect,
  request,
  test as base,
} from '@playwright/test';
import testData from '../utils/testData.json';
import { environment } from '../utils/environment';

type DemoAccount = (typeof testData.accounts)[keyof typeof testData.accounts];

interface ApiFixtures {
  apiRequest: APIRequestContext;
  customerSession: AuthenticatedApiSession;
  adminSession: AuthenticatedApiSession;
}

interface AuthenticatedApiSession {
  api: APIRequestContext;
  role: string;
}

interface TokenResponse {
  access_token: string;
}

function isTokenResponse(value: unknown): value is TokenResponse {
  return (
    typeof value === 'object' &&
    value !== null &&
    'access_token' in value &&
    typeof value.access_token === 'string' &&
    value.access_token.length > 0
  );
}

function readTokenRole(token: string): string {
  const payload = token.split('.')[1];
  if (!payload) {
    throw new Error('Toolshop API access token is not a JWT.');
  }

  let claims: unknown;
  try {
    claims = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
  } catch (error) {
    throw new Error('Toolshop API access token contains an invalid payload.', {
      cause: error,
    });
  }

  if (
    typeof claims !== 'object' ||
    claims === null ||
    !('role' in claims) ||
    typeof claims.role !== 'string'
  ) {
    throw new Error('Toolshop API access token did not contain a role claim.');
  }

  return claims.role;
}

async function createAuthenticatedApi(
  account: DemoAccount
): Promise<AuthenticatedApiSession> {
  const loginContext = await request.newContext({
    baseURL: environment.apiBaseURL,
    extraHTTPHeaders: { Accept: 'application/json' },
  });

  try {
    const response = await loginContext.post('/users/login', {
      data: { email: account.email, password: account.password },
    });

    if (!response.ok()) {
      throw new Error(
        `Toolshop API login failed with status ${response.status()}.`
      );
    }

    const body: unknown = await response.json();
    if (!isTokenResponse(body)) {
      throw new Error('Toolshop API login response did not contain an access token.');
    }

    const role = readTokenRole(body.access_token);
    const api = await request.newContext({
      baseURL: environment.apiBaseURL,
      extraHTTPHeaders: {
        Accept: 'application/json',
        Authorization: `Bearer ${body.access_token}`,
      },
    });

    return { api, role };
  } finally {
    await loginContext.dispose();
  }
}

export const test = base.extend<ApiFixtures>({
  apiRequest: async ({}, use) => {
    const context = await request.newContext({
      baseURL: environment.apiBaseURL,
      extraHTTPHeaders: { Accept: 'application/json' },
    });

    try {
      await use(context);
    } finally {
      await context.dispose();
    }
  },
  customerSession: async ({}, use) => {
    const session = await createAuthenticatedApi(testData.accounts.customer);

    try {
      await use(session);
    } finally {
      await session.api.dispose();
    }
  },
  adminSession: async ({}, use) => {
    const session = await createAuthenticatedApi(testData.accounts.admin);

    try {
      await use(session);
    } finally {
      await session.api.dispose();
    }
  },
});

export { expect };
