const { test, expect } = require('@playwright/test');

test.skip('First test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = (await context).newPage();
    // await page.goto("https://rahulshettyacademy.com/loginpagePractise/",     {waitUntil:'domcontentloaded',timeout:60000});
    await page.goto("https://google.com");
    console.log((await page).title());
});

test('second test', async ({ page }) => {   // page fixture is used to get default page and browser
    await page.goto("https://google.com");
    //verify ttitle
    console.log((await page).title());
    await expect(page).toHaveTitle("Google")
});

test('Browser Content test', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    const uname = page.locator('input#username');
    const pwd = page.locator('input#password');
    const submitbtn = page.locator('input[name="signin"]');

    await uname.fill("rahulshetty");
    await pwd.fill("learning");
    await submitbtn.click();
    console.log(await page.locator('[style*="display: block"]').textContent());
    await expect(page.locator('[style*="display: block"]')).toContainText("Incorrect username/password.");

    //to wipe off exisitng content
    await uname.fill("");
    await uname.fill("rahulshettyacademy");
    await submitbtn.click();

    // await page.waitForLoadState('networkidle');// OR use below if it returns empty

    await page.locator("div .card-body a").first().waitFor();//first being used bcoz waitFor() doesnt know for which element it has to wait for

    const cardTitles = page.locator("div .card-body a")
    console.log(await cardTitles.nth(0).textContent()); //first() alos can be used and we have last()
    console.log(await cardTitles.last().textContent());
    const allTitles = await cardTitles.allTextContents(); // to get all, but if no data is loaded itreturns empty

    console.log(allTitles);


})

test.only("Drop down value", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    const uname = page.locator('input#username');
    const pwd = page.locator('input#password');
    const submitbtn = page.locator('input[name="signin"]');
    const dropdown = page.locator('select.form-control');
    const radiobutton = page.locator('input[value="user"]+ .checkmark');
    const checkbox=page.locator('input[id="terms"]');

    await uname.fill("rahulshettyacademy");
    await pwd.fill("learning");

    //dropdown
    await dropdown.selectOption("consult");

    //radiobutton
    await radiobutton.click();
    await page.locator('#okayBtn').click();
    // await page.pause(); // to pause the execution  and it dipalys playwright inspector

    //assertion (ischecked) 
    console.log(await radiobutton.isChecked());
    await expect(radiobutton).toBeChecked();
  
    //checkbox
    await checkbox.check();
    expect(await checkbox).toBeChecked()
    expect(await checkbox.isChecked()).toBeTruthy()
    //touncheck
    await checkbox.uncheck();
    //assertion
    expect(await checkbox.isChecked()).toBeFalsy()

    await submitbtn.click();

})






