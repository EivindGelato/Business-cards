const fs = require('fs');
const path = require('path');
const async = require('async');

const printApi = require("print-api")
const print = printApi('0E4OaqeFBW3djipN01sLY9YMDN433hUP1WwPxUmF', { test: false });
let example = print.example();

var count = require('./count.json');

console.log('Hello')

var files = {
	// au: "https://www.dropbox.com/s/thmtov9cwi7qsw1/Australia.pdf?dl=1",
	// at: "https://www.dropbox.com/s/2ccot2k03oqt2is/Austria.pdf?dl=1",
	// be: "https://www.dropbox.com/s/jt2w7j2nvsv3xdh/Belgium.pdf?dl=1",
	// br: "https://www.dropbox.com/s/l8yp0r098dnh7li/Brazil.pdf?dl=1",
	// ca: "https://www.dropbox.com/s/uxn0pray8feydlr/Canada.pdf?dl=1",
	// cl: "https://www.dropbox.com/s/soxinahx822jptb/Chile.pdf?dl=1",
	// cn: "https://www.dropbox.com/s/emiri69wcvk8aqz/China.pdf?dl=1",
	// cz: "https://www.dropbox.com/s/dxne9oxalj4f63r/Czech.pdf?dl=1",
	// dk: "https://www.dropbox.com/s/72edvmwzh3nafhl/Denmark.pdf?dl=1",
	// fr: "https://www.dropbox.com/s/fw387qqhv1qntw0/France.pdf?dl=1",
	// de: "https://www.dropbox.com/s/0g2098xmte3dvev/Germany.pdf?dl=1",
	// in: "https://www.dropbox.com/s/e4gq9zze8xoaskr/India.pdf?dl=1",
	// ie: "https://www.dropbox.com/s/hq0esb6bk2cz5a6/Ireland.pdf?dl=1",
	// it: "https://www.dropbox.com/s/17h6e3xoug9oeah/Italy.pdf?dl=1",
	// nl: "https://www.dropbox.com/s/5z1wycejc2rk92r/Netherlands.pdf?dl=1",
	// nz: "https://www.dropbox.com/s/yhgzq6mqqi1wd51/NewZealand.pdf?dl=1",
	// no: "https://www.dropbox.com/s/9xftg7ou84h5lz7/Norway.pdf?dl=1",
	// pt: "https://www.dropbox.com/s/wym8zeitvze9twg/Portugal.pdf?dl=1",
	// ru: "https://www.dropbox.com/s/fqqtiynj0j48ur7/Russia.pdf?dl=1",
	// si: "https://www.dropbox.com/s/bktwdp6qw2qmlc2/Singapore.pdf?dl=1",
	// kr: "https://www.dropbox.com/s/57ae68w8kmdghbr/SouthKorea.pdf?dl=1",
	// es: "https://www.dropbox.com/s/tstuh8yihtrevkz/Spain.pdf?dl=1",
	// se: "https://www.dropbox.com/s/6ekoj7l31prmms5/Sweden.pdf?dl=1",
	// ch: "https://www.dropbox.com/s/mvukzuijgrt3xwe/Switzerland.pdf?dl=1",
	// ue: "https://www.dropbox.com/s/e2mgb8m2pcraucq/UnitedArabEmirates.pdf?dl=1",
	// gb: "https://www.dropbox.com/s/nilxjjt6sjl6gx9/UnitedKingdom.pdf?dl=1",
	// us: "https://www.dropbox.com/s/qjsyyqxi38tbimr/UnitedStates.pdf?dl=1"
}


var recipients = [
{
	"countryIsoCode": "NO",
	"addressLine1": "Snarøyveien 30C",
	"addressLine2": "Gelato AS",
	"city": "Fornebu",
	"postcode": "1360",
	"firstName": "Eivind",
	"lastName": "Ingebrigtsen",
	"email": "eivind@gelato.com",
	"phone": "+4793685138"
},
{
	"countryIsoCode": "GB",
	"addressLine1": "10 Bloomsbury Way",
	"addressLine2": "Holborn, Gelato Ltd",
	"city": "London",
	"postcode": "WC1A 2SL",
	"firstName": "Adar",
	"lastName": "Cohen",
	"email": "adar@gelato.com",
	"phone": "+447739425464"
}
];
var BRICC = {
	cn: {
		"countryIsoCode": "CN",
		"addressLine1": "上海市徐汇区复兴中路1237号4楼",
		"addressLine2": "歌莱图 中国 4/F 1237 Fuxing Zhong Lu",
		"city": "上海",
		"stateCode" : "SHG",
		"postcode": "200031",
		"firstName": "Mattias",
		"lastName": "Erlandsson",
		"email": "mattias@gelato.com",
		"phone": "+8613564750359"
	},
	br: {
		"countryIsoCode": "BR",
		"addressLine1": "Av. Paulista, 2202 - Bela Vista",
		"addressLine2": "Gelato Brasil",
		"city": "São Paulo",
		"stateCode" : "SP",
		"postcode": "01310-300",
		"firstName": "Rodrigo",
		"lastName": "Lopez",
		"email": "rodrigo@gelato.com",
		"phone": "+551182786853"
	},
	ru: {
		"countryIsoCode": "RU",
		"addressLine1": "Novaya Ploshchad 6",
		"addressLine2": "ООО Желато Рус",
		"city": "Moscow",
		"postcode": "109012",
		"firstName": "Alexander",
		"lastName": "Kadyaev",
		"email": "alex.k@gelato.com",
		"phone": "+79170145736"
	},
	in: {
		"countryIsoCode": "IN",
		"addressLine1": "A-802 Dextrus,Parinee Crescenzo,G",
		"addressLine2": "Block BKC, Bandra Kurla Complex",
		"city": "Mumbai",
		"stateCode" : "MH",
		"postcode": "400051",
		"firstName": "Saket",
		"lastName": "Somani",
		"email": "saket@gelato.com",
		"phone": "+91 9819543818"
	},
	cl: {
		"countryIsoCode": "CL",
		"addressLine1": "Santa Maria 5888",
		"addressLine2": "Vitacura",
		"city": "Santiago",
		"stateCode" : "VITA",
		"postcode": "0000",
		"firstName": "Alejandra",
		"lastName": "Duran",
		"email": "alejandra@gelato.com",
		"phone": "+56962189618"
	}
}




const placeOrder = (recipient, file, cb)=>{
	var order = { 
		order: { 
			orderReferenceId: parseFloat(8411+''+count.count),
			customerReferenceId: parseFloat(8511+''+count.count),
			currencyIsoCode: 'NOK' 
		},
		recipient: recipient,
		product: { 
			itemReferenceId: parseFloat(8611+''+count.count),
			productUid: 'cards_pf_dl_pt_130-lb-cover-coated-silk_cl_4-4_ver_variable',
			pdfUrl: file,
			quantity: 5 
		} 
	}
	fs.writeFileSync(path.join(__dirname, '/orders/order-'+8411+''+count.count+'.json'), JSON.stringify(order[0], null, 4))

	print.quote(order).then((a)=>{
		console.log('====================================================================================================');
		//console.log(order, a.headers, a.body)
		console.log('Going to → ', order.recipient);
		console.log('Promise → ', a.body.production.shipments.length);
		console.log('====================================================================================================');
		fs.writeFileSync(path.join(__dirname, '/orders/promise-'+8411+''+count.count+'.json'), JSON.stringify(a.body, null, 4))
//		cb();
		print.order(a.body.production.shipments[0].promiseUid).then((a)=>{
			fs.writeFileSync(path.join(__dirname, '/orders/response-'+8411+''+count.count+'.json'), JSON.stringify(a.body, null, 4))
			count.count++;
			fs.writeFileSync(path.join(__dirname, 'count.json'), JSON.stringify(count, null, 4))
			console.log(a.body);
		 	cb();
		}).catch(console.error) 
	}).catch(console.error)
}

async.forEachOfLimit(files, 1, (item, key, callback)=>{
	console.log('file', key);
	if(!BRICC[key]){
		async.forEachOfLimit(recipients, 1, (i,k,c)=>{
			placeOrder(i, item, c);
		},(err)=>{
			callback();
		})		
	}else{
		console.log('BRICC', key);
		placeOrder(BRICC[key], item, callback);
	}
}, (err)=>{
	console.log('Done', files.length);
})









