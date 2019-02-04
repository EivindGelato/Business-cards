#! /usr/bin/env node
const fs = require('fs');
const path = require('path');

const printApi = require("print-api")
const print = printApi('0E4OaqeFBW3djipN01sLY9YMDN433hUP1WwPxUmF', { test: false });
let example = print.example();

var count = require('./count.json');

require('node-json-color-stringify');


// Get a print quote
var order = [{ 
order: 
   { orderReferenceId: parseFloat(1456+''+count.count),
     customerReferenceId: parseFloat(1556+''+count.count),
     currencyIsoCode: 'USD' 
 },
  recipient: {
        "countryIsoCode": "SE",
        "addressLine1": "Snarøyveien 30C",
        "addressLine2": "Varemottak Bygg J",
        "city": "Fornebu",
        "postcode": "1360",
        "firstName": "Frecipient",
        "lastName": "Receiverson",
        "email": "email@company.com",
        "phone": "+15558901321"
    },
  product: 
   { itemReferenceId: parseFloat(1656+''+count.count),
     productUid: "cards_pf_bc_pt_350-gsm-coated-silk_cl_4-0_ct_glossy-lamination_ver_variable",
     pdfUrl: "https://www.dropbox.com/s/4851ph8r4xkz6x2/Variable-BusinessCard.pdf?dl=1",
     quantity: 5 } }]


fs.writeFileSync(path.join(__dirname, '/orders/order-'+1456+''+count.count+'.json'), JSON.stringify(order[0], null, 4))

console.log('==========================================================')
console.log('EXAMPLE REQUEST')
console.log(JSON.colorStringify(order[0], null, 2));


print.quote(order[0]).then((a)=>{    
console.log('==========================================================')
console.log('QUOTE RESPONSE WITH PROMISES')
    console.log(JSON.colorStringify(a.body, null, 2));

    fs.writeFileSync(path.join(__dirname, '/orders/promise-'+1456+''+count.count+'.json'), JSON.stringify(a.body, null, 4))

  
  
   print.order(a.body.production.shipments[0].promiseUid).then((a)=>{
      fs.writeFileSync(path.join(__dirname, '/orders/response-'+1456+''+count.count+'.json'), JSON.stringify(a.body, null, 4))
      count.count++;
      fs.writeFileSync(path.join(__dirname, 'count.json'), JSON.stringify(count, null, 4))
      console.log('==========================================================')
      console.log('ORDER PLACED')

      console.log(JSON.colorStringify(a.body, null, 2));
   }).catch(console.error) 


}).catch(console.error)



setInterval(()=>{
  print.status('1456'+''+(count.count-1)).then((a)=>{
    fs.writeFileSync(path.join(__dirname, '/orders/status-'+8411+''+count.count+'.json'), JSON.stringify(a.body, null, 4))
    console.log('==========================================================')
    console.log('ORDER STATUS')

    console.log(JSON.colorStringify(a.body, null, 2));
  }).catch(console.error)  
},3000)
