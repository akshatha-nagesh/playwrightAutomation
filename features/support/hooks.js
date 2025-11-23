const { PageObjectManager } = require('../../pageObjects/pageObjectManager')
const playwright = require('@playwright/test');
const { Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber')

Before({tags:"@foo"},async function () {

    const browser = await playwright.chromium.launch({ headless: false })
    const context = await browser.newContext();
    this.page = await context.newPage();

    this.PageObjectManager = new PageObjectManager(this.page);//this acts as world constructor used globally
})

BeforeStep(function(){

})

AfterStep({tags:"@foo"},async function({result}){

    if(result.status === Status.FAILED)
    {
        await this.page.screenshot({path:'screenshot1.png'});
    }
})
After(function () {
    console.log("Iam a last to execute")
})