# My Retail
My Retail is a full-stack app created as a case study. It is a Proof-of-Concept for a products API, which will aggregate product data from multiple sources and return it as JSON to the caller.

### Public View
##### Product Screen
![Product Screen][product]

[product]: https://github.com/shijunarayan/my-retail-poc/blob/main/images/public_product_view.jpg "Product Screen"

## Getting Started
- Clone this repo: `git@github.com:shijunarayan/my-retail-poc.git`
- cd into **my-retail-poc** directory
- Run
  ```javascript
  npm install && npm run install-client
  ```
- To start both the client and server at once run
  ```javascript
  npm run dev
  ```

## Application Overview

### Functionalities / Capabilities
- Public view for products with prices
- Register a new account using email id. *(Please use valid email. Will be handy if you need to reset password)*
- Login
- Reset Password - *(Need a valid email id)*
- Admin product view*
- Update product price(s)*
- Search for a product by Product id*
- Save the search result with updated product price*

**Note:** *These actions requires you to register and login

### API Routes
| Endpoint | Http Method | Auth | Body | Response |
|---|---|---|---|---|
|`/status`|GET|None|None|200 OK|
|`/api/auth/register`|POST|None|`{ email, password}`|Auth Token|
|`/api/auth/login`|POST|None|`{ email, password}`|Auth Token|
|`/api/auth/forgotpassword`|POST|None|`{ email }`|200 OK|
|`/api/auth/resetpassword/:resetToken`|PUT|None|`{ password }`|200 OK|
|`/api/product/getAllProducts`|GET|None|None|List of Products with prices from internal source|
|`/api/product/getProductByID/:id`|GET|None|None|Product **merged with external** and internal if any|
|`/api/product/updateProductPrice/:id`|PUT|Auth Token|`{ productId, value, currencyCode }`|List of Products with prices from internal source|
|`/api/product/bulkUpdateProductPrice`|POST|Auth Token|List of `{ productId, value, currencyCode }`|List of Products with prices from internal source|
|`/api/product/saveProductPrice`|POST|Auth Token|`{ productId, value, currencyCode }`|updated product price|
|`/api/product/saveProductPrices`|POST|Auth Token|List of `{ productId, value, currencyCode }`|updated product prices|
|`/api/product/getCurrencyCodes`|GET|Auth Token|None|List of available currency codes|
|`/api/product/addCurrencyCode`|POST|Auth Token|`{ currencyCode }`|Newly added currency code|
|`/api/product/addCurrencyCodes`|POST|Auth Token|List of `{ currencyCode }`|Newly added currency codes|

#### Currency Code Data Structure
```
{
  "currencyCode": {
    "symbol": "$",
    "name": "US Dollar",
    "symbol_native": "$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "USD",
    "name_plural": "US dollars"
  }
}
```

#### Product pricing data structure
```
{
    "productId": 54456119,
    "value": 2.25,
    "currencyCode": "USD"
}
```

### Authentication
##### Login Screen
![Login Screen][login]

##### Register Screen
![Register Screen][register]

##### Forgot Password Screen
![Forgot Password Screen][forgotPassword]

##### Reset Password Screen
![Reset Password Screen][resetPassword]

##### Restricted Access
![Restricted Access][restricted]

##### 404 Not Found
![404 Not Found][notFound]

[login]: https://github.com/shijunarayan/my-retail-poc/blob/main/images/login.jpg "Login Screen"

[register]: https://github.com/shijunarayan/my-retail-poc/blob/main/images/register.jpg "Register Screen"

[forgotPassword]: https://github.com/shijunarayan/my-retail-poc/blob/main/images/forgot_password.jpg "Forgot Password Screen"

[resetPassword]: https://github.com/shijunarayan/my-retail-poc/blob/main/images/reset_password.jpg "Reset Password Screen"

[restricted]: https://github.com/shijunarayan/my-retail-poc/blob/main/images/access_restricted.jpg "Restricted Access Screen"

[notFound]: https://github.com/shijunarayan/my-retail-poc/blob/main/images/not_found.jpg "Not Found Screen"


### Private View

##### Product Edit Screen
![Product Edit Screen][productEdit]

##### Product Search Screen
![Product Search Screen][productSearch]

[productEdit]: https://github.com/shijunarayan/my-retail-poc/blob/main/images/private_product_view.jpg "Product Edit Screen"

[productSearch]: https://github.com/shijunarayan/my-retail-poc/blob/main/images/search_product.jpg "Product Search Screen"