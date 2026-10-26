"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePage = void 0;
class HomePage {
    page;
    constructor(page) {
        this.page = page;
    }
    async goto() {
        await this.page.goto('https://condo-agora.vercel.app');
    }
    async getTitle() {
        return this.page.title();
    }
    async clickLogin() {
        await this.page.click('text=Iniciar Sesión');
    }
}
exports.HomePage = HomePage;
