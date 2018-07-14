import moment from 'moment'

export class DeliveryInfo {
  constructor(deliveries) {
    this.deliveries = deliveries || [];
    this.days_past = null; //how many days worth of deliveries are we keeping?
    this.filtered_deliveries = []; //deliveries after applying days_past cutoff
  }
  getTopCustomers(days_past, customer_limit) {
    //filter out deliveries older than days_past of days_past has changed from this.days_past
    if(this.days_past !== days_past) {
      this.days_past = days_past;
      this.filtered_deliveries = this.filterDeliveries(this.deliveries, days_past);
    }
    //Count customer deliveries.
    let customers = {};
    for(let delivery of this.filtered_deliveries) {
      if(typeof customers[delivery.customer.id] === "undefined") {
        customers[delivery.customer.id] = {
          name: delivery.customer.name,
          count: 1
        };
      }
      else customers[delivery.customer.id].count++;
    }
    const sorted_customers = [];
    for(let id of Object.keys(customers)){
      sorted_customers.push(customers[id]);
    }
    //Sort from highest to lowest based on delivery count.
    sorted_customers.sort((a,b)=>b.count-a.count);

    //Return customers up to the customer_limit.
    return sorted_customers.slice(0, customer_limit);
  }

  
  filterDeliveries(deliveries, days_past) {
    const cutoff_date = moment().subtract(30, 'days');
    const filtered = [];
    for(let delivery of deliveries) {
      if(cutoff_date.isBefore(delivery.date)) {
        filtered.push(delivery);
      }
    }
    return filtered;
  }
}
