
/*
* Note: I used Mockaroo to generate fake data. (https://mockaroo.com/)
* Caveat with this dataset:
* 1. customer name is random in relation to id.
* (since we are using id for our calculations, this will not matter)
* 2. Dates are in ISO 8601 with UTC timezone.
*/
import { DELIVERIES } from './deliverydata';
import { DeliveryInfo } from './statistics';

const LIMIT = 30;
const DAYS = 30;

const deliveryinfo = new DeliveryInfo(DELIVERIES);
const top30Customers = deliveryinfo.getTopCustomers(DAYS, LIMIT);

console.log(top30Customers);

document.getElementById("app").innerHTML = `
<h1>Hello Parcel!</h1>
<div>
  Look
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>
  for more info about Parcel.
</div>
`;