Feature: Ecommerce Validation
    ##npx cucumber-js --tags "@Ecommerce" --exit
    ##npx cucumber-js  --format html:cucumber-report.html --exit
    @Ecommerce
    @validations
    @foo
    Scenario: Placing the Order
        Given Login to UI with "akshathanv7@gmail.com" and "Akshatha@123"
        When Add "ZARA COAT 3" to cart
        Then Verify "ZARA COAT 3" is displayed in the cart
        Then Enter valid details and place the order
        Then Verify order is present in the order