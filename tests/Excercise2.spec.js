const { test, expect } = require('@playwright/test');

test('Using Special Locators', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    console.log(await page.title());
    /**getbyLabel works only when u have label tag/select , but not where it its input tag
     * <label> pwd 
     * <input type="pawd"/>
     * </label> OR both should be assciated using for tag in both lines **/
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").click()
    await page.getByLabel("Gender").selectOption("Male")
    await page.pause();

    // input fields which has plaeholder attribute only
    await page.getByPlaceholder("Password").fill("Akshatha")

    // Role is used where any clickable action is there
    await page.getByRole("button", { name: 'Submit' }).click();

    const bool = await page.getByText("Success! The Form has been submitted successfully!.").isVisible()
    console.log(bool)

    await page.getByRole("link", { name: "Shop" }).click();

    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole('button', { name: 'Add' }).click()
    await page.pause()


})

test.only("validate more cases", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    // await page.getByRole("Button", { name: "Alert" }).click()
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click()
    await page.locator("#mousehover").hover()

    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible").click()
    const textCheck = await framePage.locator(".text h2").textContent()
    console.log(textCheck.split(" ")[1]);
    /*await page.goto("http://google.com")
    await page.goBack();
    await page.goForward();*/
})