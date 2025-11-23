const { test, expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.CartProducts = page.locator("div li").first();
        this.productText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorder']");
        this.checkout = page.locator("text=checkout");
    }

    async verifyProductIsDisplayed(productName) {
        await this.CartProducts.waitFor();
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();


    }

    async Checkout() {
        await this.checkout.click();

    }

    getProductLocator(productName) {
        return this.page.locator("h3:has-text('" + productName + "')");
    }

}
module.exports = { CartPage }