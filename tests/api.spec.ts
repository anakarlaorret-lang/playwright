import { expect, test } from './fixtures';
import testData from '../utils/testData.json';

test('PST-005 returns API health and version metadata', async ({
  apiRequest,
}) => {
  const response = await apiRequest.get('/status');

  expect(response.status()).toBe(200);
  await expect(response).toBeOK();
  const body: unknown = await response.json();
  expect(body).toMatchObject({
    app_name: 'Toolshop',
    environment: expect.any(String),
    version: expect.any(String),
  });
});

test('PST-006 returns products with identifiers, names, and numeric prices', async ({
  apiRequest,
}) => {
  const response = await apiRequest.get('/products?page=1');

  expect(response.status()).toBe(200);
  const body: unknown = await response.json();
  expect(body).toMatchObject({
    data: expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        price: expect.any(Number),
      }),
    ]),
  });
});

test('PST-007 returns categories with identifiers and names', async ({
  apiRequest,
}) => {
  const response = await apiRequest.get('/categories');

  expect(response.status()).toBe(200);
  const body: unknown = await response.json();
  expect(body).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
      }),
    ])
  );
});

test('PST-010 rejects invalid credentials without issuing a token', async ({
  apiRequest,
}) => {
  const response = await apiRequest.post('/users/login', {
    data: {
      email: testData.invalidLogin.email,
      password: testData.invalidLogin.password,
    },
  });

  expect(response.status()).toBe(401);
  const body: unknown = await response.json();
  expect(body).not.toHaveProperty('access_token');
});

test('PST-003 authenticates the customer and reads the protected profile', async ({
  customerSession,
}) => {
  const response = await customerSession.api.get('/users/me');

  expect(response.status()).toBe(200);
  const profile: unknown = await response.json();
  expect(profile).toMatchObject({ email: testData.accounts.customer.email });
  expect(customerSession.role).toBe(testData.accounts.customer.role);
});

test('PST-004 authenticates the admin and reads the protected profile', async ({
  adminSession,
}) => {
  const response = await adminSession.api.get('/users/me');

  expect(response.status()).toBe(200);
  const profile: unknown = await response.json();
  expect(profile).toMatchObject({ email: testData.accounts.admin.email });
  expect(adminSession.role).toBe(testData.accounts.admin.role);
});
