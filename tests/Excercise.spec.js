const { test, expect } = require('@playwright/test');

test('Browser Content test', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    console.log(await page.title());

    const uname = page.locator('input#userEmail');
    const pwd = page.locator('input#userPassword');
    const submitbtn = page.locator('#login');

    await uname.fill("akshathanv7@gmail.com");
    await pwd.fill("Akshatha@123");
    await submitbtn.click();

    await page.waitForLoadState('networkidle');  // this will help to wait till all network calls are made so all data is loaded in UI

    const titles = page.locator("div .card-body b");
    console.log(await titles.allTextContents());


    const products = page.locator("div .card-body");
    const productName = 'ZARA COAT 3';
    const length = await products.count()
    for (let i = 0; i <= length; i++) {
        const text = await products.nth(i).locator('b').textContent();
        if (text === productName) {
            // add to cart
            //await page.pause()
            await products.nth(i).locator("text= Add To Cart").click()

            break;
        }
    }
    //await page.pause();
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

    await page.pause();

    const orderId = await page.locator("tr label").last().textContent()
    console.log(orderId)

    //tr [scope="row"]
    await page.locator('[routerlink="/dashboard/myorders"]').first().click()
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr")

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
       // await console.log(text)
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click()
            await page.pause()

            console.log("Order found");
            break;
        }
    }
    await page.pause();

})