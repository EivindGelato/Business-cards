#! /usr/bin/env node
const fs = require('fs');
const path = require('path');

const printApi = require("print-api")
const print = printApi('open-api-gelato-live-cc5976f6-f003-4b72-8fa1-7ec6b5f974e8:63d442a9-2ad7-430f-bbe8-fca9f91ae1cc', { test: false });
let example = print.example();

var count = require('./count.json');

require('node-json-color-stringify');


// Get a print quote
var order = [{ 
order: 
   { orderReferenceId: parseFloat(109887+''+count.count),
     customerReferenceId: parseFloat(109887+''+count.count),
     currencyIsoCode: 'USD' 
 },
 "recipient": {
        "countryIsoCode": "NO",
        "addressLine1": "Snarøyveien 30",
        "addressLine2": "Varemottak - c/o Gelato",
        "city": "Fornebu",
        "postcode": "1360",
        "stateCode": "",
        "firstName": "Julie",
        "lastName": "Ryland",
        "email": "julie.ryland@gelato.com",
        "phone": "+4748111975"
    },
  products: 
   [{ 
       itemReferenceId: parseFloat(109887+''+count.count),
       "productUid": "cards_pf_bc_pt_350-gsm-coated-silk_cl_4-4_ct_glossy-lamination_ver_variable",
       //"productUid": "cards_pf_bc_pt_130-lb-cover-coated-silk_cl_4-4_ct_glossy-protection_ver_variable",
       pdfUrl: "https://www.dropbox.com/s/putl06vaxd4j1n7/B-C-Julie.pdf?dl=1",
       quantity: 278 
     }] 
 }]

 /*

Sarah-Ann Ferguson,Network Strategy Manager,+44 7784777947,sarah-ann.ferguson@gelato.com
 

Saket Somani
Gelato Print Services India Pvt Ltd
703, Tower A, 7th Floor
Marathon Futurex,
N M Joshi Marg
Lower Parel (East)
Mumbai 400 013
Contact: +91 98195 43818
 */


fs.writeFileSync(path.join(__dirname, '/orders/order-'+109887+''+count.count+'.json'), JSON.stringify(order[0], null, 4))

console.log('==========================================================')
console.log('EXAMPLE REQUEST')
console.log(JSON.colorStringify(order[0], null, 2));


print.quote(order[0]).then((a)=>{    
console.log('==========================================================')
console.log('QUOTE RESPONSE WITH PROMISES')
    console.log(JSON.colorStringify(a.body, null, 2));

    fs.writeFileSync(path.join(__dirname, '/orders/promise-'+109887+''+count.count+'.json'), JSON.stringify(a.body, null, 4))

  
   console.log('a.body.production.shipments[3].promiseUid', a.body.production.shipments[3].promiseUid);
    print.order(a.body.production.shipments[3].promiseUid).then((a)=>{
       fs.writeFileSync(path.join(__dirname, '/orders/response-'+109887+''+count.count+'.json'), JSON.stringify(a.body, null, 4))
       count.count++;
       fs.writeFileSync(path.join(__dirname, 'count.json'), JSON.stringify(count, null, 4))
       console.log('==========================================================')
       console.log('ORDER PLACED')

       console.log(JSON.colorStringify(a.body, null, 2));
    }).catch(console.error) 


}).catch(console.error)

setInterval(()=>{
  print.status('109887'+''+(count.count-1)).then((a)=>{
    fs.writeFileSync(path.join(__dirname, '/orders/status-'+109887+''+count.count+'.json'), JSON.stringify(a.body, null, 4))
    console.log('==========================================================')
    console.log('ORDER STATUS')

    console.log(JSON.colorStringify(a.body, null, 2));
  }).catch(console.error)  
},3000)
