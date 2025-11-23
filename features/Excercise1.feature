Feature: Excercise1 validations
@validations
@foo
Scenario Outline: Placing the order
    Given Login to UI with <username> and <password>
    Examples:
        | username | password |
        | "akshathavernekar159@gmail.com" |"Akshatha@123"|
        | "akshathanv7@gmail.com" |"Akshatha@123"|
     
