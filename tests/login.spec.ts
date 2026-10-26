import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Condo Ágora - Login Suite', () => {
  test('Login page shows WhatsApp, Email, and Google options', async ({ page, context }) => {
    const login = new LoginPage(page, context);
    await login.goto();

    // Verificar que los botones están visibles
    await expect(page.locator('text=Whatsapp')).toBeVisible();
    await expect(page.locator('text=Email')).toBeVisible();
    await expect(page.locator('text=Ingresar con Google')).toBeVisible();
  });

  test.skip('Login with WhatsApp (feature not ready)', async ({ page, context }) => {
    const login = new LoginPage(page, context);
    await login.goto();
    await login.loginWithWhatsApp();
    // TODO: implementar cuando el feature esté listo
  });

  test('Login with Google (happy path)', async ({ page, context }) => {
    const login = new LoginPage(page, context);
    await login.goto();

    // Intentar login con Google
    await login.loginWithGoogle('testuser@gmail.com', 'password123'); // credenciales de prueba

    // Validar que el dashboard aparece tras login
    await expect(page.locator('text=Dashboard')).toBeVisible();
  });

  test('Login with Google - invalid credentials', async ({ page, context }) => {
    const login = new LoginPage(page, context);
    await login.goto();

    // Intentar login con credenciales inválidas
    await login.loginWithGoogle('wrong@gmail.com', 'badpassword');

    // Validar que aparece mensaje de error
    await expect(login.getErrorMessage()).toBeVisible();
  });
});
