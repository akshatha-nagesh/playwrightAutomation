const { When, Then, Given, setDefaultTimeout } = require('@cucumber/cucumber'); setDefaultTimeout(100 * 1000);
const { test, expect } = require('@playwright/test');
const { PageObjectManager } = require('../../pageObjects/pageObjectManager')
const playwright = require('@playwright/test');

Given('Login to UI with {string} and {string}', async function (username, password) {


    const products = this.page.locator(".card-body");

    const loginPage = this.PageObjectManager.getLoginPage();
    await loginPage.goTo()
    await loginPage.validLogin(username, password)

})

When('Add {string} to cart', async function (productName) {

    this.dashboardPage = this.PageObjectManager.getDashBoardPage();
    await this.dashboardPage.searchProduct(productName)
    await this.dashboardPage.navigateToCart()

})

Then('Verify {string} is displayed in the cart', async function (productName) {
    const CartPage = this.PageObjectManager.getCartPage();
    await CartPage.verifyProductIsDisplayed(productName);
    await CartPage.Checkout();

})

Then('Enter valid details and place the order', async function () {
    const OrderReviewPage = this.PageObjectManager.getOrderREviewPage()
    await OrderReviewPage.searchCountryAndSelect("ind", "India");
    this.orderIds = await OrderReviewPage.submitAndGetOrderId()
    console.log(this.orderIds)
    await OrderReviewPage.NavigateToOrders()

})

Then('Verify order is present in the order', async function () {
    const OrderHistoryPage = this.PageObjectManager.getOrderHistoryPage()
    await OrderHistoryPage.searchOrderAndSelect(this.orderIds)
    expect(this.orderIds.includes(await OrderHistoryPage.getOrderId())).toBeTruthy();

})