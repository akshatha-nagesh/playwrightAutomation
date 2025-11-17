const { test, expect } = require('@playwright/test');

test('Calendar test', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    console.log(await page.title());

    const month="6";
    const date="15";
    const year="2027";

    await page.locator("div .react-date-picker__wrapper").click();
    await page.locator(".react-calendar__navigation__label__labelText").click()
    await page.locator(".react-calendar__navigation__label__labelText").click()
    await page.getByText(year).click()
    await page.locator('.react-calendar__year-view__months__month').nth(Number(month-1)).click()
    await page.locator('.react-calendar__month-view__days__day').nth(Number(date)).click()
})