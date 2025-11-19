const { test, expect, request } = require('@playwright/test');
const { json } = require('stream/consumers');
const { ApiUtils } = require('./utils/apiUtils')
const payload = { userEmail: "akshathanv7@gmail.com", userPassword: "Akshatha@123" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "68a961459320a140fe1ca57a" }] };
// let token;
// let orderID;
let response;
test.beforeAll(async () => {

    //login API
    const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
    const apiUtils = new ApiUtils(apiContext, payload)
    response = await apiUtils.createOrder(orderPayload)
    /* const loginResponse = await apiContext.post(
         "https://rahulshettyacademy.com/api/ecom/auth/login",
         { data: payload }
     );
     expect((await loginResponse).ok()).toBeTruthy//200 status code , so OK checks that
     const loginResponseJson = await loginResponse.json()
     token = loginResponseJson.token;
     console.log(token);*/

    //Order Placement API 
    // Below value are from network tab
    //https://rahulshettyacademy.com/api/ecom/order/create-order
    //authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTE4NjE3ZjUwMDhmNmE5MDkyMGM4N2QiLCJ1c2VyRW1haWwiOiJha3NoYXRoYW52N0BnbWFpbC5jb20iLCJ1c2VyTW9iaWxlIjo3MDE5MzUxNjk3LCJ1c2VyUm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzYzNDkyMjY0LCJleHAiOjE3OTUwNDk4NjR9.jttzghqP9GsdQ0MyuG6alkdkALro_vO4J7MXuKwNPRA
    //{orders: [{country: "India", productOrderedId: "68a961459320a140fe1ca57a"}]}

    /*const orderResponse = await apiContext.post(
        "https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers: {
                'Authorization': token,
                'content-type': 'application/json'
            },
        }
    )
    const orderREsponseJson = await orderResponse.json()
    orderID = orderREsponseJson.orders[0];
    console.log(orderID) */
});

test.beforeEach(() => {

})

//verify order is created successfully 
test('ApiTesting login', async ({ page }) => {
    //js file- Login js, DashboardPage


    /* 
    const email = "anshika@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
     await page.getByPlaceholder("email@example.com").fill(email);
     await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
     await page.getByRole('button', { name: "Login" }).click();
     await page.waitForLoadState('networkidle'); */

   /* const apiUtil = new ApiUtils(apiContext, payload);
    const orderID = createOrder(orderPayload)*/


    await page.addInitScript(value => {          //insert js script to store token in local storgae
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");  // it will directly take to dashboard page instead of login

    /*await page.locator(".card-body b").first().waitFor();

    await page.locator(".card-body").filter({ hasText: "ZARA COAT 3" })
        .getByRole("button", { name: "Add to Cart" }).click();

    await page.getByRole("listitem").getByRole('button', { name: "Cart" }).click();

    //await page.pause();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

    await page.getByRole("button", { name: "Checkout" }).click();

    await page.getByPlaceholder("Select Country").pressSequentially("ind");

    await page.getByRole("button", { name: "India" }).nth(1).click();
    await page.getByText("PLACE ORDER").click();*/

    await page.locator('[routerlink="/dashboard/myorders"]').first().click()
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr")

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        // await console.log(text)
        if (response.orderID.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click()
            await page.pause()

            console.log("Order found");
            break;
        }
    }
    //await page.pause()

})