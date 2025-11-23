const { test, expect } = require('@playwright/test');

//npm init -y
//npm install -D @playwright/test
//npx playwright install  
//mkdir tests
//cd tests
// npm init playwright  
//npx playwright test tests/Excercise2.spec.js
//npx playwright test tests/Excercise2.spec.js --debug
//npx playwright test 
//npx playwright show-report
//npx playwright test --headed
//npm playwright test --ui
//npx playwright test tests/ExcercisePage.spec.js --config playwright.config1.js --project chrome  
// {for running in particular browser if ntg given then runs in both browser}
// npx playwright test --grep @web //to run tagged testcases  --to run tagged testcases
/**npx playwright test  --config playwright.config1.js --project chrome --reporter=line --reporter=allure-playwright
npx allure-commandline generate ./allure-results --clean **/
//ORR follow below steps for allure report
//1) npm install --save-dev allure-commandline
//2) npx playwright test tests/ExcercisePage.spec.js 
//3) npx allure generate ./allure-results --clean
//4) npx allure open
//to delete old report--> npx allure generate --clean --output allure-report
//jenkins setup
//java -jar jenkins.war -httpPort=9090 
//uname-averneka/Akshatha@123
//for cucmber
//npm install @cucumber/cucumber
//npx cucumber-js

test.skip('@Web First test', async ({ browser }) => {
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

test("Drop down value", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    const uname = page.locator('input#username');
    const pwd = page.locator('input#password');
    const submitbtn = page.locator('input[name="signin"]');
    const dropdown = page.locator('select.form-control');
    const radiobutton = page.locator('input[value="user"]+ .checkmark');
    const checkbox = page.locator('input[id="terms"]');

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

test("Child window", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const uname = page.locator('input#username');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all(
        /* instead of await below we use promise so the steps which are dependent/async/parallele before proceeding next step.
         if multiple page the use [newPAge1,newPage2]..  */
        [context.waitForEvent('page'),//listner to check if any new page is opened
        documentLink.click(), //new page is opened
        ])

    const textInNewPage = await newPage.locator(".red").textContent();
    const arrayText = textInNewPage.split("@");
    const domain = arrayText[1].split(" ")[0]
    console.log(domain);


    await uname.fill(domain); // page is used bcoz we want to work on parent page
    // await page.pause()
    console.log(await uname.inputValue()); // to fetch value that was added dynamically unlike previous using textContetnt()

})
//traces.playwright.dev is used to open traces and dig in each actions using before and after also we can see screenshots (which we download from report)






