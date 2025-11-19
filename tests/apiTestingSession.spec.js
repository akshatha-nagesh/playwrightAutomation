const { test, expect } = require('@playwright/test');
let webContext;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill("akshathanv7@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Akshatha@123");
    await page.getByRole('button', { name: "Login" }).click();
    await page.waitForLoadState('networkidle');
    // NOTE: one context can multiple pages, hence session cookie are always context(opned browser) level
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' })




})



test('Using Session-Client App login', async () => {
    //js file- Login js, DashboardPage

    const productName = 'ZARA COAT 3';
    //using session details
    const page = await webContext.newPage()

    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for (let i = 0; i < count; i++) {
        const text = await products.nth(i).locator('b').textContent();
        if (text === productName) {
            // add to cart
            //await page.pause()
            await products.nth(i).locator("text= Add To Cart").click()

            break;
        }
    }
    await page.pause();
    const cart = page.locator('[routerlink*="cart"]');
    await cart.click();

    await page.locator("div li").first().waitFor()
    //await page.pause();

    //await page.locator('.cartSection').locator("text=ZARA COAT 3");
    const isVisble = await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
    expect(isVisble).toBeTruthy();
    // await page.pause();

    await page.locator('button').locator("text=Checkout").click();
    //await page.pause();

    const dynamicDropDown = page.locator('.form-group [placeholder="Select Country"]')
    const dropdowns = page.locator('section .list-group')
    const options = dropdowns.locator('button')

    await dynamicDropDown.pressSequentially("ind", { delay: 150 });
    await dropdowns.waitFor();
    const optionsCount = await options.count();
    for (let i = 0; i < optionsCount; i++) {
        const text = await options.nth(i).textContent();
        if (text === " India") {
            await options.nth(i).click();
            break;
        }
    }
    //await page.pause();
    await page.locator('.action__submit').click();
    //await page.pause();

    await page.locator("h1:has-text('Thankyou for the order')").isVisible() // OR
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");// if exact text

    //await page.pause();

    const orderId = await page.locator("tr label").last().textContent()
    console.log(orderId)

    await page.locator('[routerlink="/dashboard/myorders"]').first().click()
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr")

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        // await console.log(text)
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click()
            //await page.pause()

            console.log("Order found");
            break;
        }
    }
    await page.pause();
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy()

})

test('Second TC Using Session-Client App login', async () => {
    //js file- Login js, DashboardPage

    const productName = 'ZARA COAT 3';
    //using session details
    const page = await webContext.newPage()

    await page.goto("https://rahulshettyacademy.com/client");
    await page.waitForLoadState("networkidle")
    const products = page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
})