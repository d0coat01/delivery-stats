
/*
* Note: I used Mockaroo to generate fake data. (https://mockaroo.com/)
* Caveat with this dataset:
* 1. customer name is random in relation to id.
* (since we are using id for our calculations, this will not matter)
* 2. Dates are in ISO 8601 with UTC timezone.
*/
import { DELIVERIES } from './deliverydata';
import { DeliveryInfo } from './statistics';
import $ from "jquery";

const LIMIT = 30;
const DAYS = 30;

const deliveryinfo = new DeliveryInfo(DELIVERIES);
const top30Customers = deliveryinfo.getTopCustomers(DAYS, LIMIT);
console.log(top30Customers);

const $customerListElem = $("#customers");
for(let customer of top30Customers) {
  const $listItem = $("<li>" + customer.name + ", " + customer.count + "</li>");
  $customerListElem.append($listItem);
}

