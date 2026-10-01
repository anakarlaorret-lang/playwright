import { test, expect, Page } from '@playwright/test';
import { registerUser } from '@datafactory/register';
import { createMessage } from '@datafactory/messages';
import { MessagesPage } from '@pages/account/messages.page';
import { ContactPage } from '@pages/contact/contact.page';
import { LoginPage } from '@pages/login.page';

test("customer reply to a message", async ({ context, page }) => {
  const timestamp = Date.now();
  const email = `customer${timestamp}@example.com`;
  const password = 'password123';
  const dropdownOption = "Customer Support";
  const message = "This is a test message sent at ${new Date(timestamp).toLocaleString()}";
  const messageUserAuthFile = ".auth/messageUser.json";

  await test.step("create a new user", async () => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await registerUser(email, password);
    await

    //validate the user is logged in by checking the nav menu contains the user's name
    await expect(page.locator('[data-test="nav-menu"]')).toContainText("Test User");

    //save the token and userId to a file for later use
    await context.storageState({ path: messageUserAuthFile });

  });

  

  // Reply to the message
  const messagesPage = new MessagesPage(page);
  await messagesPage.goto();
  await messagesPage.replyToMessage(message.id, "This is a reply to the message.");
});