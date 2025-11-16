const { test, expect } = require('@playwright/test');

test('Browser Content test', async ({ browser }) => {
    
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    console.log(await page.title());

    const uname = page.locator('input#userEmail');
    const pwd=page.locator('input#userPassword');
    const submitbtn=page.locator('#login');

    await uname.fill("akshathanv7@gmail.com");
    await pwd.fill("Akshatha@123");
    await submitbtn.click();

    await page.waitForLoadState('networkidle');  // this will help to wait till all network calls are made so all data is loaded in UI
    
    const titles=page.locator("div .card-body b");
    console.log(await titles.allTextContents());

})