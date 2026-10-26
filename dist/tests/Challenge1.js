"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const register_1 = require("@datafactory/register");
const messages_page_1 = require("@pages/account/messages.page");
const login_page_1 = require("@pages/login.page");
(0, test_1.test)("customer reply to a message", async ({ context, page }) => {
    const timestamp = Date.now();
    const email = `customer${timestamp}@example.com`;
    const password = 'password123';
    const dropdownOption = "Customer Support";
    const message = "This is a test message sent at ${new Date(timestamp).toLocaleString()}";
    const messageUserAuthFile = ".auth/messageUser.json";
    await test_1.test.step("create a new user", async () => {
        const loginPage = new login_page_1.LoginPage(page);
        await loginPage.goto();
        await (0, register_1.registerUser)(email, password);
        await 
        //validate the user is logged in by checking the nav menu contains the user's name
        await (0, test_1.expect)(page.locator('[data-test="nav-menu"]')).toContainText("Test User");
        //save the token and userId to a file for later use
        await context.storageState({ path: messageUserAuthFile });
    });
    // Reply to the message
    const messagesPage = new messages_page_1.MessagesPage(page);
    await messagesPage.goto();
    await messagesPage.replyToMessage(message.id, "This is a reply to the message.");
});
