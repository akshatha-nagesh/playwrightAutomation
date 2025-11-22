class LoginPage{
    constructor(page)
    {
        this.page=page;
        this.signInButton=page.locator("#login");
        this.username=page.locator('#userEmail');
        this.password=page.locator('#userPassword');

    }

     async goTo(){
       await  this.page.goto("https://rahulshettyacademy.com/client");
    }
    async validLogin(email,passsword)
    {
        await  this.username.fill(email);
        await this.password.fill(passsword);
        await  this.signInButton.click();
    }
}
module.exports={LoginPage};