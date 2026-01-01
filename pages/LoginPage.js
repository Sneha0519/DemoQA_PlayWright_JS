export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('#userName');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login');
        this.logoutButton = page.locator('button:has-text("Log out")');
        this.userNameValue = page.locator('#userName-value');
    }

    async navigate() {
        await this.page.goto('https://demoqa.com/login');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForTimeout(2000);
    }

    async getLoggedInUsername() {
        return await this.userNameValue.textContent();
    }

    async logout() {
        await this.logoutButton.click();
    }
}
