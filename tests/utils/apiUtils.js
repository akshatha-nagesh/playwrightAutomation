class ApiUtils {

    constructor(apiContext,payload) {
        this.apiContext = apiContext;
        this.payload=payload;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            { data:this.payload }
        );
       // expect((await loginResponse).ok()).toBeTruthy//200 status code , so OK checks that
        const loginResponseJson = await loginResponse.json()
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }

    async createOrder(orderPayload) {
        let response={};
       response.token= await this.getToken()
        const orderReponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    'Authorization':  response.token,
                    'content-type': 'application/json'
                },
            }
        )
        const orderREsponseJson = await orderReponse.json()
        const orderID = orderREsponseJson.orders[0];
        response.orderID=orderID;
        console.log(orderID)
       // return orderID;
       return response
    }
}
module.exports={ApiUtils};