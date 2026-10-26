import {Page} from "@playwright/test";

export class HomePage {
    constructor(private page: Page) {}

    async goto() {
        await this.page.goto('https://condo-agora.vercel.app');
    }

    async getTitle() {
        return this.page.title();
    }

    async clickLogin(){
        await this.page.click('text=Iniciar Sesión');
    }
}