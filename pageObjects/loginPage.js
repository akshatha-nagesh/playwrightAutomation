class LoginPage {
    constructor(page) {
        this.page = page;
        this.username = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.signInButton = page.locator("#login");
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }
    async validLogin(email, passsword) {
        await this.username.fill(email);
        await this.password.fill(passsword);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = { LoginPage };