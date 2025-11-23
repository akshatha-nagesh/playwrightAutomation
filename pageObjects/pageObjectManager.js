const { DashboardPage } = require('../pageObjects/DashboardPage')
const { LoginPage } = require('../pageObjects/loginPage')
const { CartPage } = require('./cartPage')
const { OrderReviewPage } = require('./OrderReviewPage')
const { OrderHistoryPage } = require('./OrderHistoryPage')


class PageObjectManager {
    constructor(page) {
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.dashboardPage = new DashboardPage(this.page)
        this.cartPage = new CartPage(this.page)
        this.OrderReviewPage = new OrderReviewPage(this.page)
        this.orderHistoryPage = new OrderHistoryPage(this.page)
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashBoardPage() {
        return this.dashboardPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getOrderREviewPage() {
        return this.OrderReviewPage;
    }

    getOrderHistoryPage() {
        return this.orderHistoryPage;
    }

}
module.exports = { PageObjectManager }