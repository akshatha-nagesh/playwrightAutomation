const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/loginPage')
const { DashboardPage } = require('../pageObjects/DashboardPage')
const { PageObjectManager } = require('../pageObjects/pageObjectManager')
//convert json->string->js object
const Data=JSON.parse(JSON.stringify(require('../Data/placeOrderExcercisePage.json')))

for(const data of Data)
{
test(`@Webst Client App login ${data.productName}`, async ({ page }) => {
    //js file- Login js, DashboardPage

    const poManager = new PageObjectManager(page);
    const products = page.locator(".card-body");

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo()
    await loginPage.validLogin(data.username, data.password)

    const dashboardPage = poManager.getDashBoardPage();
    await dashboardPage.searchProduct(data.productName)
    await dashboardPage.navigateToCart()

    const CartPage = poManager.getCartPage();
    await CartPage.verifyProductIsDisplayed(data.productName);
    await CartPage.Checkout();

    const OrderReviewPage = poManager.getOrderREviewPage()
    await OrderReviewPage.searchCountryAndSelect("ind", "India");
    const orderIds = await OrderReviewPage.submitAndGetOrderId()
    console.log(orderIds)
    await OrderReviewPage.NavigateToOrders()

    const OrderHistoryPage = poManager.getOrderHistoryPage()
    await OrderHistoryPage.searchOrderAndSelect(orderIds)
    expect(orderIds.includes(await OrderHistoryPage.getOrderId())).toBeTruthy();

})
}