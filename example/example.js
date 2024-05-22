const Paymob = require('paymob-node-sdk')

async function main() {
   console.log(Paymob)
    const apiKey = 'Your API Key'
    const paymob = new Paymob(apiKey, 'pakistan', 'Your Iframe')
     try{
        const token = await paymob.getToken();
        console.log("Token:", token)
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

        const paymentDetails = await paymob.processPayment(token, billingData, 1000,'PKR',"integration id");
        console.log('URL and Payment Keys:', paymentDetails);

     }
     catch(error){
        throw error
     }
}

main()