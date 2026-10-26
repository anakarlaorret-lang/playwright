"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPage = void 0;
class LoginPage {
    page;
    context;
    constructor(page, context) {
        this.page = page;
        this.context = context;
    }
    async goto() {
        await this.page.goto('https://www.saucedemo.com/ ');
    }
    async login(username, password) {
        // Fill in the username and password fields
        await this.page.fill('#user-name', username);
        await this.page.fill('#password', password);
        await this.page.click('#login-button');
    }
    async getErrorMessage() {
        return this.page.locator('[data-test="error"]');
    }
}
exports.LoginPage = LoginPage;
