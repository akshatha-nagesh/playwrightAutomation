const { expect, test } = require('@playwright/test')

class OrderReviewPage {

    constructor(page) {
        this.page = page;
        this.country = page.locator("[placeholder*='Country']")
        this.dropdown = page.locator(".ta-results")
        this.emailId = page.locator(".user__name [type='text']").first()
        this.submit = page.locator(".action__submit")
        this.orderConfirmationText = page.locator(".hero-primary")
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted")
        this.orderCart = page.locator("button[routerlink*='myorders']")
        this.OrderTable = page.locator("tbody")
    }

    async searchCountryAndSelect(countryCode, countryName) {
        await this.country.type(countryCode, { delay: 100 });
        await this.dropdown.waitFor()
        const optionsCount = await this.dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; i++) {
            const text = await this.dropdown.locator("button").nth(i).textContent();
            if (text.trim() === countryName) {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }
    }

    async submitAndGetOrderId() {
        await this.page.getByText("PLACE ORDER").click();

        await expect(this.page.getByText("Thankyou for the order.")).toBeVisible();

        const orderId = await this.page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        return orderId;

    }

    async NavigateToOrders() {
        this.orderCart.click()
        await this.OrderTable.first().waitFor();
    }

}
module.exports = { OrderReviewPage }