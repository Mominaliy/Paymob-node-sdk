# Paymob NodeJS SDK
nodejs library for (Paymob)[https://pakistan.paymob.com/portal2/en/login]

## Installation

### With Yarn

```
yarn add paymob-node-sdk
```

### With NPM

```
npm install paymob-node-sdk
```

## Usage

Import and initialize the Paymob client

```javascript
const { Paymob } = require('paymob')

const paymob = new Paymob({
    apiKey:'Your API Key',
    region:'pakistan',
    iframeId:123456
})
```
### Initialization

| Parameter |  Type  |               Description                     | Required |
| --------- | ------ | --------------------------------------------- | -------- |
| `apiKey`  | String | API Key from your Paymob Dashboard settings.  |    Yes   |
| `region`  | String | `pakistan`, `accept`, `uae`, `oman`, `ksa`    |    Yes   |
| `iframeId`| Number | IFrame Id from your Paymob Dashboard Iframes. |    Yes   |

### Get Token

```javascript
const token = await paymob.getToken()
```

### Create Payment

```javascript

const billingData = {
            first_name: "John",
            last_name: "Doe",
            email: "john.doe@example.com",
            phone_number: "+923001234567",
            apartment: "NA", 
            floor: "NA", 
            street: "NA", 
            building: "NA", 
            shipping_method: "NA", 
            postal_code: "NA", 
            city: "NA", 
            country: "NA", 
            state: "NA"
        };

const payment = await paymob.processPayment(token, billingData, amount,currency, integrationid);
```
#### Parameters for Create Payment

|    Parameter   |  Type  |                              Description                          | Required |
| -------------- | ------ | ----------------------------------------------------------------- | -------- |
| `token`        | String | token from `paymob.getToken()`                                    |    Yes   |
| `billingData`  | Object | The billing data related to the customer related to this payment. |    Yes   |
| `amount`       | Number | The price of the order in cents                                   |    Yes   |
| `currency`     | String | The currency related to this payment.                             |    Yes   |
| `integrationid`| String | Your Integration ID from Payment Integrations                     |    Yes   |

The `payment` object returned by `processPayment` contains a `URL` and `Payment Keys`. URL can be used to redirect user to that URL. Payment Keys can be used in Iframe.

### Get Transaction Details

```javascript
const transactionDetails = await paymob.getTransactionDetails(token, transactionId)

```

#### Parameters for Transaction Details

|    Parameter     |  Type  |                          Description                  | Required |
| ---------------- | ------ | ----------------------------------------------------- | -------- |
| `token`          | String | token from `paymob.getToken()`                        |    Yes   |
| `transactionId`  | Number | Transaction Id from `Callback` or `Paymob Dashboard`. |    Yes   |

the transactionsDetails will return the following response
```javascript
{
    "type":"TRANSACTION",
    "obj":{
      "id":78,
      "pending": "false",
      "amount_cents":100,
      "success":"true",
      "is_auth": "false",
      "is_capture": "false",
      "is_standalone_payment":"true",
      "is_voided": "false",
      "is_refunded": "false",
      "is_3d_secure": "false",
      "integration_id":1,
      "profile_id":1,
      "has_parent_transaction": "true",
      "order":{
          "id":94,
          "created_at":"2016-12-26T06:49:16.651010Z",
          "delivery_needed": "false",
          "merchant":{
            "id":1,
            "created_at":"2016-11-17T15:02:53.646620Z",
            "phones":[
              "011111111111",
              "012324151432"
            ],
            "company_emails":[
              "brendon42@cummings-windler.biz",
              "jim50@sipes-kunze.com"
            ],
            "company_name":"Wuckert, Zieme and Dach",
            "state":"Oklahoma",
            "country":"Oman",
            "city":"Port Arvillachester",
            "postal_code":"83372",
            "street":"Walker Ramp"
          },
          "collector": "null",
          "amount_cents":100,
          "shipping_data":{
              "id":73,
              "first_name":"Clifford",
              "last_name":"Nicolas",
              "street":"Ethan Land",
              "building":"8028",
              "floor":"42",
              "apartment":"803",
              "city":"Jaskolskiburgh",
              "state":"Utah",
              "country":"CR",
              "email":"claudette09@exa.com",
              "phone_number":"+86(8)9135210486",
              "postal_code":"01898",
              "extra_description":"",
              "shipping_method":"UNK",
              "order_id":94,
              "order":94
          },
          "currency":"PKR",
          "is_payment_locked":"true",
          "merchant_order_id": "null",
          "wallet_notification": "null",
          "paid_amount_cents":0,
          "items":[]
      },
      "created_at":"2016-12-26T06:49:16.680871Z",
      "transaction_processed_callback_responses":[],
      "currency":"PKR",
      "source_data":{
          "sub_type":"MasterCard",
          "pan":"2346",
          "type":"card"
      },
      "data":{
          "merchant_txn_ref":"1_6b30848c28c455de9bcb0c693e9f85a3",
          "card_num": "null",
          "avs_result_code":"Unsupported",
          "order_info":"claudette09@exa.com",
          "merchant":"TEST290510EGP",
          "avs_acq_response_code":"Unsupported",
          "transaction_no":"2000004112",
          "batch_no":"20161226",
          "message":"Approved",
          "txn_response_code":"0",
          "secure_hash":"DF6CF1D9CFF09F9C6AE1EC86F6ED4BFE4E5BAE8CE7705ED05E61A264839FEA7A",
          "card_type":"MC",
          "receipt_no":"636117634097",
          "created_at":"2016-12-26T06:49:19.593479",
          "currency":"PKR",
          "klass":"VPCPayment",
          "authorize_id":"634097",
          "amount":"100",
          "acq_response_code":"00",
          "command":"pay",
          "gateway_integration_pk":1
      },
      "payment_key_claims":{
          "exp":1482770369,
          "currency":"PKR",
          "amount_cents":100,
          "user_id":2,
          "integration_id":1,
          "shipping_data":{
              "state":"Utah",
              "country":"CR",
              "first_name":"Clifford",
              "last_name":"Nicolas",
              "postal_code":"01898",
              "floor":"42",
              "city":"Jaskolskiburgh",
              "street":"Ethan Land",
              "building":"8028",
              "phone_number":"+86(8)9135210486",
              "extra_description":"",
              "shipping_method":"PKG",
              "apartment":"803",
              "email":"claudette09@exa.com"
          }
      },
      "error_occured": "false",
      "owner":2,
      "parent_transaction": "false"
    }
}
```

